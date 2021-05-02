import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const Project = () => {
  const handleLogin = e => {
    console.log('嘻嘻嘻爱', e);
  };
  return (
    <View style={styles.container}>
      <Text>项目中心</Text>
    </View>
  );
};

export default Project;
