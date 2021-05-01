import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const Project = () => {
  return (
    <View style={styles.container}>
      <Text>项目中心</Text>
      <Text style={styles.iconStyle}>{'\ue7ad'}</Text>
    </View>
  );
};


export default Project;
