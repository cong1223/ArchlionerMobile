import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Header } from 'react-native-elements';
import common from '../../styles/common';

const ProjectDetail = props => {
  const { route } = props;
  console.log('路由参数', route.params);
  return (
    <View style={common.container}>
      <Header
        leftComponent={{ icon: 'arrow-back', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'menu', color: '#fff' }}
      />
    </View>
  );
};

export default ProjectDetail;
