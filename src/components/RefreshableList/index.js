import React from 'react';
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
      onEndReachedThreshold={0.2}
      onMomentumScrollBegin={() => {
        setEndReachedCalled(false);
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
