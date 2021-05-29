import React, { memo, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import common from '@/styles/common';
import RefreshableList from '../../../../components/RefreshableList';
import WorkFlowConstants from '../../../../const/WorkFlowConstants';
import ProjectService from '../../../../services/ProjectService';
import WorkFlowListItem from '../../../../components/WorkFlowListItem';
import { useNavigation } from '@react-navigation/native';

const WorkFlowList = memo(props => {
  const navigation = useNavigation();
  const { actionType, projectId } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [dataList, setDataList] = useState([]);
  const handleClickListItem = useCallback(item => {
    navigation.navigate('ApprovalDetail', {
      detail: item,
      actionType
    });
  }, []);
  const renderItem = ({ item, index, separators }) => {
    return (
      <WorkFlowListItem data={item} handleClickItem={handleClickListItem} />
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
  const getData = () => {
    switch (actionType) {
      case WorkFlowConstants.ActionType.PENDING_OPERATION_4_USER.value():
        ProjectService.getApprovalListForMe(projectId, page)
          .then(res => {
            console.log('待我审批', res.list);
            if (res && res.total) {
              setTotal(res.total);
              if (page === 1) {
                setDataList(res.list);
              } else {
                setDataList(dataList.concat(res.list));
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
        break;
      case WorkFlowConstants.ActionType.LAUNCH_BY_USER.value():
        ProjectService.getLaunchByMe(projectId, page)
          .then(res => {
            console.log('我发起的', res.list);
            if (res && res.total) {
              setTotal(res.total);
              if (page === 1) {
                setDataList(res.list);
              } else {
                setDataList(dataList.concat(res.list));
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
        break;
      case WorkFlowConstants.ActionType.OPERATED_BY_USER.value():
        ProjectService.getApprovedList(projectId, page)
          .then(res => {
            console.log('我已审批', res.list);
            if (res && res.total) {
              setTotal(res.total);
              if (page === 1) {
                setDataList(res.list);
              } else {
                setDataList(dataList.concat(res.list));
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
        break;
    }
  };
  useEffect(() => {
    setRefreshing(true);
    setTimeout(() => {
      getData(page);
    }, 1500);
  }, [page]);
  return (
    <View style={common.container}>
      <RefreshableList
        loadMore={loadMore}
        data={dataList}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        keyExtractor={item => item.id}
      />
    </View>
  );
});

export default WorkFlowList;
