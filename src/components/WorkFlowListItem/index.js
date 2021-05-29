import React, { useMemo } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import styles from './styles';
import { Avatar, ListItem } from 'react-native-elements';
import { timeAgo } from '@/utils/date';

const WorkFlowListItem = props => {
  const { data, handleClickItem } = props;
  const avatarTittle = useMemo(() => {
    if (data.userName && data.userName.length > 1) {
      return data.userName.substr(0, 2);
    } else if (data.realname && data.realname.length > 1) {
      return data.realname.substr(0, 2);
    } else {
      return '';
    }
  });
  return (
    <TouchableHighlight onPress={() => handleClickItem(data)}>
      <View style={styles.container}>
        <Text style={styles.actNameText}>{data.actName}</Text>
        <ListItem disabled bottomDivider>
          <Avatar
            rounded
            titleStyle={styles.avatarTitleText}
            overlayContainerStyle={styles.avatarOverlayContainer}
            title={avatarTittle}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.listItemTitle}>
              {data.userName || data.realname}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.listItemSubTitle}>
              {data.projectName}
            </ListItem.Subtitle>
          </ListItem.Content>
          <Text style={styles.listItemSubTitle}>
            {timeAgo(data.createTime)}
          </Text>
        </ListItem>
      </View>
    </TouchableHighlight>
  );
};

export default WorkFlowListItem;
