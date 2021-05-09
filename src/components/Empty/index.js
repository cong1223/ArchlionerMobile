import React from 'react';
import { Text, View, Image } from 'react-native';
import common from '../../styles/common';
import styles from './styles';

const Empty = props => {
  return (
    <View style={[common.container, styles.emptyContainer]}>
      <Image
        style={styles.emptyImage}
        resizeMode="cover"
        source={require('../../assets/img/empty.png')}
      />
      <Text style={styles.emptyTipWord}>空空如也~</Text>
    </View>
  );
};

export default Empty;
