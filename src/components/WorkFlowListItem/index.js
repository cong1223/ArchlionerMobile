import React, { useMemo } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import styles from './styles';
import { Avatar, ListItem } from 'react-native-elements';
import { timeAgo } from '@/utils/date';

const WorkFlowListItem = props => {
  const { data, handleClickItem, isFromProject = false } = props;
  const avatarTittle = useMemo(() => {
    if (isFromProject) {
      if (data.userName && data.userName.length > 1) {
        return data.userName.substr(0, 2);
      } else if (data.realname && data.realname.length > 1) {
        return data.realname.substr(0, 2);
      } else {
        return '';
      }
    } else {
      if (data.launchManInfo && data.launchManInfo.realname) {
        return data.launchManInfo.realname.length > 2
          ? data.launchManInfo.realname.substr(0, 2)
          : data.launchManInfo.realname;
      }
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
              {isFromProject
                ? data.userName || data.realname
                : data.launchManInfo.realname}
            </ListItem.Title>
            <Text style={styles.listItemSubTitle} numberOfLines={1}>
              {isFromProject ? data.projectName : data.remarks}
            </Text>
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
