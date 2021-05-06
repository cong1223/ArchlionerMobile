import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Avatar, ListItem } from 'react-native-elements';
import common from '../../../styles/common';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../styles/variable';
import keys from '../../../config/keys';
import Storage from '../../../utils/storage';
import { useSelector } from 'react-redux';

const Mine = props => {
  const { navigation } = props;
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const enterpriseList = useSelector(
    state => state.userReducer.enterpriseVoList
  );
  const curEnterprise = useMemo(() => {
    return enterpriseList.find(
      enterprise => enterprise.enterpriseId === userInfo.curEnterpriseId
    );
  }, [userInfo, enterpriseList]);
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
    Storage.delete(keys.LOGIN_PARAMS).then(res => {
      navigation.navigate(item.toPage);
    });
  };

  return (
    <View style={common.container}>
      <View style={styles.userInfoContainer}>
        {userInfo.avatar ? (
          <Avatar
            size="large"
            rounded
            icon={{ name: 'user', type: 'font-awesome' }}
            source={{
              uri: userInfo.avatar
            }}
            containerStyle={styles.avatar}
          />
        ) : (
          <Avatar
            size="large"
            rounded
            icon={{ name: 'user', type: 'font-awesome' }}
            overlayContainerStyle={{ backgroundColor: '#BDBDBD' }}
            containerStyle={styles.avatar}
          />
        )}
        <Text style={styles.userName}>{userInfo.realname}</Text>
        <Text style={styles.curEnterpriseName}>
          {curEnterprise.enterpriseName}
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
