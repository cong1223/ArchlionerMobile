import React, { useLayoutEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { ButtonGroup } from 'react-native-elements';
import common from '../../styles/common';
import SideMenu from './SideMenu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Drawer from '../../components/Drawer';
import ProjectFileList from './ProjectFileList';
import ProjectWorkflow from './ProjectWorkflow';

const ProjectDetail = () => {
  const route = useRoute();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const fileStackRef = useRef([]);
  const navigation = useNavigation();
  const drawerRef = useRef();
  const projectFileList = useRef();
  const updateIndex = index => {
    setSelectedIndex(index);
  };
  // 自定义返回键事件
  const handlePressBackIcon = () => {
    if (!fileStackRef.current.length) {
      navigation.goBack();
    } else {
      projectFileList.current.backPrevFileStack();
    }
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
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={handlePressBackIcon}>
          <Ionicons name="arrow-back" size={24} color={'#fff'} />
        </TouchableOpacity>
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
      {selectedIndex === 0 ? (
        <ProjectFileList ref={projectFileList} fileStackRef={fileStackRef} />
      ) : (
        <ProjectWorkflow projectId={route.params.id} />
      )}
      <Drawer ref={drawerRef}>
        <SideMenu {...route.params} />
      </Drawer>
    </View>
  );
};

export default ProjectDetail;
