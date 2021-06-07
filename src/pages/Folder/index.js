import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import common from '../../styles/common';
import { ListItem, SearchBar } from 'react-native-elements';
import RefreshableList from '../../components/RefreshableList';
import ImagePreview from '../../components/ImagePreview';
import useCallbackState from '../../hooks/useCallbackState';
import { fileExt2Icon } from '../../utils/file';
import UserService from '../../services/UserService';
import ProjectService from '../../services/ProjectService';
import { WToast } from 'react-native-smart-tip';

const Folder = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useCallbackState(1);
  const [total, setTotal] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [images, setImages] = useState([]);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum
  ] = useState(true);
  const navigation = useNavigation();
  const imagePreview = useRef();
  const route = useRoute();
  // 设置自定义header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerTitleLeft}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={'#fff'} />
          <Text style={styles.headerTitleBackText}>{route.params.resName}</Text>
        </TouchableOpacity>
      ),
      headerTitle: () => null
    });
  }, [navigation]);
  const handleClickListItem = item => {
    if (item.isFolder === '1') {
      navigation.push('Folder', item);
    } else {
      ProjectService.getPreviewUrl(null, item.fid).then(res => {
        let fileExt;
        if (!res.previewUrl) {
          WToast.show({
            data: '文件打开失败',
            position: WToast.position.CENTER
          });
          return;
        }
        if (res.previewUrl.lastIndexOf('/jpeg/') !== -1) {
          fileExt = 'jpeg';
        } else if (res.previewUrl.lastIndexOf('/png/') !== -1) {
          fileExt = 'png';
        }
        const previewUrl = res.previewUrl + `400/transform1.${fileExt}`;
        setImages([{ url: previewUrl }]);
        imagePreview.current.open();
      });
    }
  };
  const renderItem = ({ item, index, separators }) => {
    return (
      <ListItem
        bottomDivider
        key={item.resId}
        onPress={() => handleClickListItem(item)}
      >
        <Image source={fileExt2Icon(item.isFolder, item.fileExt)} />
        <ListItem.Content>
          <Text style={styles.listItemTitle}>{item.resName}</Text>
          <Text style={styles.listItemSubTitle}>{item.updateTime}</Text>
        </ListItem.Content>
        {item.isFolder === '1' ? <ListItem.Chevron /> : null}
      </ListItem>
    );
  };
  const handleRefresh = () => {
    setRefreshing(true);
    if (page === 1) {
      setTimeout(() => {
        getData();
      }, 1500);
    } else {
      setPage(1);
    }
  };
  const handleLoadMore = distanceFromEnd => {
    if (!onEndReachedCalledDuringMomentum) {
      if (total > dataList.length) {
        setPage(prevPage => prevPage + 1);
        setLoadMore(true);
      }
      setOnEndReachedCalledDuringMomentum(true);
    }
  };
  const getData = (pageNum = 1) => {
    UserService.getPersonResList(route.params.perResId, pageNum)
      .then(res => {
        if (res && res.resList && res.resList.total) {
          setTotal(res.resList.total);
          if (page === 1) {
            setDataList(res.resList.list);
          } else {
            setDataList(dataList.concat(res.resList.list));
          }
        } else {
          setTotal(0);
          setDataList([]);
        }
        console.log('网盘列表', dataList);
      })
      .finally(() => {
        setRefreshing(false);
        setLoadMore(false);
      });
  };
  useEffect(() => {
    setRefreshing(true);
    setTimeout(() => {
      getData(page);
    }, 1500);
  }, [page]);
  return (
    <View style={common.container}>
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputStyle={styles.searchInput}
        inputContainerStyle={styles.searchInputContainer}
        lightTheme={true}
        placeholder="搜索当前文件夹内文件"
      />
      <RefreshableList
        style={styles.refreshableListContainer}
        loadMore={loadMore}
        data={dataList}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        keyExtractor={item => item.perResId}
        setEndReachedCalled={() => setOnEndReachedCalledDuringMomentum(false)}
      />
      <ImagePreview ref={imagePreview} images={images} />
    </View>
  );
};

export default Folder;
