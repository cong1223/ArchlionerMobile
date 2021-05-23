import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import styles from './styles';
import Empty from '../Empty';

const RefreshableList = props => {
  const { setEndReachedCalled, loadMore } = props;
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
  return (
    <FlatList
      {...props}
      contentContainerStyle={props.data.length ? null : { flexGrow: 1 }}
      onEndReachedThreshold={0.2}
      onMomentumScrollBegin={() => {
        // 有些页面遇到第一次加载就触发loadMore的情况,如首页项目中心,遇到此情况需要传递setEndReachedCalled函数控制触发条件
        setEndReachedCalled ? setEndReachedCalled(false) : null;
      }}
      ListEmptyComponent={() => <Empty />}
      ItemSeparatorComponent={
        // eslint-disable-next-line no-undef
        Platform.OS !== 'android' &&
        (({ highlighted }) => (
          <View style={[styles.separator, highlighted && { marginLeft: 0 }]} />
        ))
      }
      ListFooterComponent={renderFooter}
    />
  );
};

export default RefreshableList;
