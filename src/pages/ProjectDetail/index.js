import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Header } from 'react-native-elements';
import common from '../../styles/common';
import Modal from 'react-native-modal';
import SideMenu from './SideMenu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProjectDetail = props => {
  const { route } = props;
  console.log('路由参数', route.params);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const callParentScreenFunction = () => {
    setVisible(false);
  };
  const toggleSideMenu = () => {
    setVisible(!visible);
  };
  return (
    <View style={common.container}>
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
            <TouchableOpacity onPress={toggleSideMenu}>
              <Ionicons name="menu" size={24} color={'#fff'} />
            </TouchableOpacity>
          </View>
        }
      />
      <Modal
        isVisible={visible}
        onBackdropPress={toggleSideMenu} // Android back press
        onSwipeComplete={toggleSideMenu} // Swipe to discard
        animationIn="slideInLeft" // Has others, we want slide in from the left
        animationOut="slideOutLeft" // When discarding the drawer
        swipeDirection="left" // Discard the drawer with swipe to left
        useNativeDriver // Faster animation
        hideModalContentWhileAnimating // Better performance, try with/without
        propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal)
        style={styles.sideMenuStyle}
      >
        <SideMenu />
      </Modal>
    </View>
  );
};

export default ProjectDetail;
