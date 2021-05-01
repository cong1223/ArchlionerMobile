import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Avatar, ListItem } from 'react-native-elements';
import common from '../../../styles/common';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../styles/variable';

const Mine = props => {
  const { navigation } = props;
  const list = [
    {
      title: '通讯录',
      iconName: 'contacts'
    },
    {
      title: '帮助与反馈',
      iconName: 'feedback'
    },
    {
      title: '关于营造狮',
      iconName: 'info-outline'
    },
    {
      title: '分享应用',
      iconName: 'share'
    },
    {
      title: '退出登录',
      iconName: 'logout',
      toPage: 'Login'
    }
  ];

  const handleClickListItem = item => {
    navigation.navigate(item.toPage);
  };

  return (
    <View style={common.container}>
      <View style={styles.userInfoContainer}>
        <Avatar
          size="large"
          rounded
          icon={{ name: 'user', type: 'font-awesome' }}
          overlayContainerStyle={{ backgroundColor: 'yellow' }}
          containerStyle={styles.avatar}
        />
        <Text style={styles.userName}>小聪忙</Text>
        <Text style={styles.curEnterpriseName}>
          中国美术学院风景建筑设计研究院
        </Text>
        <Text style={styles.changeEntBtn}>切换企业</Text>
      </View>
      <View>
        {list.map((item, index) => (
          <ListItem
            key={index}
            bottomDivider
            topDivider={!index}
            onPress={() => handleClickListItem(item)}
          >
            <MaterialIcons
              name={item.iconName}
              size={20}
              color={colors.themeColor}
            />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </View>
  );
};

export default Mine;
