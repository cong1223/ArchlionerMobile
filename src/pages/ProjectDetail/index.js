import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { ButtonGroup, Header } from 'react-native-elements';
import common from '../../styles/common';
import SideMenu from './SideMenu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Drawer from '../../components/Drawer';
import ProjectFileList from './ProjectFileList';
import ProjectWorkflow from './ProjectWorkflow';

const ProjectDetail = props => {
  const route = useRoute();
  console.log('路由参数', route.params);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation();
  const drawerRef = useRef();
  const updateIndex = index => {
    setSelectedIndex(index);
  };
  return (
    <View style={[common.container]}>
      <Header
        leftComponent={
          <View>
            <TouchableOpacity onPress={navigation.goBack}>
              <Ionicons name="arrow-back" size={24} color={'#fff'} />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={
          <View>
            <TouchableOpacity
              onPress={() => drawerRef.current.toggleSideMenu()}
            >
              <Ionicons name="menu" size={24} color={'#fff'} />
            </TouchableOpacity>
          </View>
        }
      />
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
