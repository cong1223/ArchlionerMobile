import React, { useLayoutEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { ButtonGroup, Header } from 'react-native-elements';
import common from '../../styles/common';
import SideMenu from './SideMenu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import Drawer from '../../components/Drawer';
import ProjectFileList from './ProjectFileList';
import ProjectWorkflow from './ProjectWorkflow';

const ProjectDetail = () => {
  const route = useRoute();
  console.log('路由参数', route.params);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation();
  const drawerRef = useRef();
  const updateIndex = index => {
    setSelectedIndex(index);
  };
  // 设置自定义header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => drawerRef.current.toggleSideMenu()}>
          <Ionicons name="menu" size={24} color={'#fff'} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text style={common.headerTitleText}>{route.params.name}</Text>
      )
    });
  }, [navigation]);
  return (
    <View style={common.container}>
      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={['文件', '流程中心']}
        containerStyle={styles.buttonGroup}
        textStyle={styles.buttonGroupText}
      />
      {selectedIndex === 0 ? <ProjectFileList /> : <ProjectWorkflow />}
      <Drawer ref={drawerRef}>
        <SideMenu />
      </Drawer>
    </View>
  );
};

export default ProjectDetail;
