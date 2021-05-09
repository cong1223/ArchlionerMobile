import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  TouchableHighlight,
  Text,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import { SearchBar } from 'react-native-elements';
import common from '../../../styles/common';
import { colors } from '../../../styles/variable';
import ProjectService from '../../../services/ProjectService';
import useCallbackState from '../../../hooks/useCallbackState';
import { debounce } from 'lodash';
import Empty from '../../../components/Empty';

const Project = props => {
  const { navigation } = props;
  const [keyword, setKeyword] = useCallbackState('');
  // 缓存输入框的值,保证函数组件刷新后还能获取到最新的值
  const keywordRef = useRef(keyword);
  keywordRef.current = keyword;
  const [projectList, setProjectList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useCallbackState(1);
  const [total, setTotal] = useState(0);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum
  ] = useState(true);
  const handleInputClear = () => {
    setPage(1);
    setKeyword('', () => {
      getData();
    });
  };
  const handleInputDelay = useCallback(
    debounce(() => {
      getData();
    }, 500),
    []
  );
  const handleInput = val => {
    setKeyword(val);
    setPage(1);
    handleInputDelay();
  };
  const renderItem = ({ item, index, separators }) => {
    return (
      <TouchableHighlight
        onPress={() => navigation.navigate('ProjectDetail', item)}
      >
        <View style={styles.listItem}>
          <Text
            style={[
              common.iconStyle,
              { color: colors.themeColor, fontSize: 80 }
            ]}
          >
            {'\ue74f'}
          </Text>
          <Text style={styles.projectName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.createTimeText}>{item.updateTime}</Text>
        </View>
      </TouchableHighlight>
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
      if (total > projectList.length) {
        setPage(prevPage => prevPage + 1);
        setLoadMore(true);
      }
      setOnEndReachedCalledDuringMomentum(true);
    }
  };
  const renderFooter = () => {
    return loadMore ? (
      <View style={styles.footer}>
        <ActivityIndicator />
        <Text>正在加载更多数据...</Text>
      </View>
    ) : (
      <></>
    );
  };
  const getData = (pageNum = 1) => {
    ProjectService.getProjectList(pageNum, 10, { keyword: keywordRef.current })
      .then(res => {
        if (res && res.pageInfo && res.pageInfo.total) {
          setTotal(res.pageInfo.total);
          if (page === 1) {
            setProjectList(res.pageInfo.list);
          } else {
            setProjectList(projectList.concat(res.pageInfo.list));
          }
        } else {
          setTotal(0);
          setProjectList([]);
        }
        console.log('项目列表', projectList);
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
        onSubmitEditing={() => getData()}
        onClear={() => handleInputClear()}
        onChangeText={handleInput}
        value={keyword}
      />
      <FlatList
        style={{ flexGrow: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={projectList}
        numColumns="2"
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        onMomentumScrollBegin={() => {
          setOnEndReachedCalledDuringMomentum(false);
        }}
        ListEmptyComponent={() => <Empty />}
        ItemSeparatorComponent={
          // eslint-disable-next-line no-undef
          Platform.OS !== 'android' &&
          (({ highlighted }) => (
            <View
              style={[styles.separator, highlighted && { marginLeft: 0 }]}
            />
          ))
        }
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default Project;
