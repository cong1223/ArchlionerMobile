import React from 'react';
import { Text, View, Image } from 'react-native';
import common from '@/styles/common';
import styles from './styles';
import { fileExt2Icon } from '../../../utils/file';

const ProjectWorkflow = props => {
  return (
    <View style={common.container}>
      <Image source={fileExt2Icon('0', 'pdf')} />
    </View>
  );
};

export default ProjectWorkflow;
