import React, { useEffect, useState } from 'react';
import { Text, View, Image, SafeAreaView, SafeAreaViewComponent } from 'react-native';
import styles from './styles';
import { ListItem, SearchBar } from 'react-native-elements';
import { fileExt2Icon } from '../../../utils/file';
import RefreshableList from '../../../components/RefreshableList';
import useCallbackState from '../../../hooks/useCallbackState';
import ProjectService from '../../../services/ProjectService';
import { useRoute } from '@react-navigation/native';
import { screenSize } from '../../../utils/tools';

const ProjectFileList = props => {
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useCallbackState(1);
  const [total, setTotal] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum
  ] = useState(true);
  const renderItem = ({ item, index, separators }) => {
    return (
      <ListItem bottomDivider key={item.resId}>
        <Image source={fileExt2Icon(item.isFolder, item.fileExt)} />
        <ListItem.Content>
          <Text style={styles.listItemTitle}>{item.resName}</Text>
          <Text style={styles.listItemSubTitle}>
            {`${item.updateBy} ${item.updateTime}更新`}
          </Text>
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
  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum) {
      if (total > dataList.length) {
        setPage(prevPage => prevPage + 1);
        setLoadMore(true);
      }
      setOnEndReachedCalledDuringMomentum(true);
    }
  };
  const getData = (pageNum = 1) => {
    ProjectService.getProResList(route.params.id, 0, page, 10)
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
      })
      .finally(() => {
        setRefreshing(false);
        setLoadMore(false);
      });
  };
  useEffect(() => {
    console.log('文件列表', dataList);
  }, [dataList]);
  useEffect(() => {
    setRefreshing(true);
    setTimeout(() => {
      getData(page);
    }, 1500);
  }, [page]);
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputStyle={styles.searchInput}
        inputContainerStyle={styles.searchInputContainer}
        lightTheme={true}
        placeholder="搜索"
      />
      <RefreshableList
        loadMore={loadMore}
        data={dataList}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        keyExtractor={item => item.resId}
        setEndReachedCalled={() => setOnEndReachedCalledDuringMomentum(false)}
      />
    </SafeAreaView>
  );
};

export default ProjectFileList;
