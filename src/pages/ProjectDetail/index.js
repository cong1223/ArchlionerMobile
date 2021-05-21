import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import styles from './styles';
import { ButtonGroup, Header, SearchBar } from 'react-native-elements';
import common from '../../styles/common';
import SideMenu from './SideMenu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Drawer from '../../components/Drawer';
import RefreshableList from '../../components/RefreshableList';
import { colors } from '../../styles/variable';
import useCallbackState from '../../hooks/useCallbackState';
import ProjectService from '../../services/ProjectService';
import { fileExt2Icon } from '../../utils/file';

const ProjectDetail = props => {
  const route = useRoute();
  console.log('路由参数', route.params);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const navigation = useNavigation();
  const drawerRef = useRef();
  const [page, setPage] = useCallbackState(1);
  const [total, setTotal] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum
  ] = useState(true);
  const updateIndex = index => {
    setSelectedIndex(index);
  };
  const renderItem = ({ item, index, separators }) => {
    // return (
    //
    // );
  };
  const handleRefresh = () => {
    // setRefreshing(true);
    // if (page === 1) {
    //   setTimeout(() => {
    //     getData();
    //   }, 1500);
    // } else {
    //   setPage(1);
    // }
  };
  const handleLoadMore = () => {
    // if (!onEndReachedCalledDuringMomentum) {
    //   if (total > projectList.length) {
    //     setPage(prevPage => prevPage + 1);
    //     setLoadMore(true);
    //   }
    //   setOnEndReachedCalledDuringMomentum(true);
    // }
  };
  useEffect(() => {
    getData();
  }, []);
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
  return (
    <View style={common.container}>
      <Header
        leftComponent={
          <View>
            <TouchableOpacity onPress={navigation.goBack}>
              <Ionicons name="arrow-back" size={24} color={'#fff'} />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={
          <View>
            <TouchableOpacity
              onPress={() => drawerRef.current.toggleSideMenu()}
            >
              <Ionicons name="menu" size={24} color={'#fff'} />
            </TouchableOpacity>
          </View>
        }
      />
      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={['文件', '流程中心']}
        containerStyle={styles.buttonGroup}
        textStyle={styles.buttonGroupText}
      />
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputStyle={styles.searchInput}
        inputContainerStyle={styles.searchInputContainer}
        lightTheme={true}
        placeholder="搜索"
      />
      <Image source={fileExt2Icon('0', 'dwf')} />
      {/*<RefreshableList*/}
      {/*  loadMore={loadMore}*/}
      {/*  data={projectList}*/}
      {/*  renderItem={renderItem}*/}
      {/*  refreshing={refreshing}*/}
      {/*  onRefresh={handleRefresh}*/}
      {/*  onEndReached={handleLoadMore}*/}
      {/*  setEndReachedCalled={() => setOnEndReachedCalledDuringMomentum(false)}*/}
      {/*/>*/}
      <Drawer ref={drawerRef}>
        <SideMenu />
      </Drawer>
    </View>
  );
};

export default ProjectDetail;
