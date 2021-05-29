import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import { ListItem, SearchBar } from 'react-native-elements';
import { fileExt2Icon } from '../../../utils/file';
import RefreshableList from '../../../components/RefreshableList';
import useCallbackState from '../../../hooks/useCallbackState';
import ProjectService from '../../../services/ProjectService';
import { useRoute } from '@react-navigation/native';

const ProjectFileList = forwardRef((props, ref) => {
  const route = useRoute();
  const { fileStackRef } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useCallbackState(1);
  const [total, setTotal] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [parentId, setParentId] = useCallbackState(0);
  // 暴露给父组件调用的方法
  useImperativeHandle(ref, () => ({
    backPrevFileStack: () => {
      fileStackRef.current = fileStackRef.current.slice(0, -1);
      const parentFolderId = fileStackRef.current.length
        ? fileStackRef.current.slice(-1)[0]
        : 0;
      setParentId(parentFolderId);
      setPage(1);
      getData(1, parentFolderId);
    }
  }));
  const handleClickListItem = item => {
    if (item.isFolder === '1') {
      setPage(1);
      setParentId(item.resId, val => {
        fileStackRef.current = [...fileStackRef.current, item.resId];
        getData(1, val);
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
    if (total > dataList.length) {
      setPage(prevPage => prevPage + 1);
      setLoadMore(true);
    }
  };
  const getData = (pageNum = 1, pid = parentId) => {
    ProjectService.getProResList(route.params.id, pid, page)
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
    setRefreshing(true);
    setTimeout(() => {
      getData(page);
    }, 1500);
  }, [page]);
  return (
    <View style={styles.container}>
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
      />
    </View>
  );
});

export default ProjectFileList;
