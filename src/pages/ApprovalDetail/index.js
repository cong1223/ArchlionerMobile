import React, { useEffect, useMemo, useState } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import common from '../../styles/common';
import styles from './styles';
import { Avatar } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import ProjectService from '../../services/ProjectService';
import { timeAgo } from '@/utils/date';
import WorkFlowConstants from '../../const/WorkFlowConstants';

const ApprovalDetail = props => {
  const route = useRoute();
  const { detail, actionType } = route.params;
  const [actDetailData, setActDetailData] = useState({});
  useEffect(() => {
    console.log(detail);
    ProjectService.getApprovalDetail(detail.id, detail.formId).then(res => {
      console.log('流程详情', res);
      setActDetailData(res);
    });
  }, [detail]);
  return (
    <View style={[common.container, styles.container]}>
      <View style={styles.detailCardContainer}>
        <View style={styles.baseInfoContainer}>
          <Text style={styles.actNameText}>{detail.actName}</Text>
          <View style={styles.descItemBox}>
            <Text style={[styles.descText, common.mr8]}>所属项目:</Text>
            <Text style={styles.descText}>{detail.projectName}</Text>
          </View>
          <View style={styles.descItemBox}>
            <Text style={[styles.descText, common.mr8]}>审批备注:</Text>
            <Text style={styles.descText}>
              {(actDetailData.actInfo && actDetailData.actInfo.remarks) || '无'}
            </Text>
          </View>
          <View
            style={[styles.userInfoContainer, common.flexBetween, common.mt8]}
          >
            <View style={common.alignCenter}>
              <Avatar
                rounded
                titleStyle={styles.avatarTitleText}
                overlayContainerStyle={styles.avatarOverlayContainer}
                title={
                  actDetailData.launchMan &&
                  actDetailData.launchMan.realName.substr(0, 2)
                }
              />
              <Text style={styles.userInfoNameText}>
                {actDetailData.launchMan && actDetailData.launchMan.realName}
              </Text>
            </View>
            <Text style={styles.userInfoTimeAgo}>
              {timeAgo(
                actDetailData.actInfo && actDetailData.actInfo.updateTime
              )}
            </Text>
          </View>
        </View>
        <TouchableHighlight onPress={() => {}}>
          <View style={[styles.listItem, common.flexBetween]}>
            <View style={[styles.statusContainer, common.center]}>
              <Text style={styles.statusText}>状态</Text>
            </View>
            <View style={common.alignCenter}>
              <Text
                style={styles.chevronText}
              >{`${WorkFlowConstants.FlowStatus.getCnameByValue(
                actDetailData.actInfo && actDetailData.actInfo.status
              )}-${
                actDetailData.actInfo && actDetailData.actInfo.userName
              }`}</Text>
              <Text style={[common.iconStyle, { color: '#bfbfbf' }]}>
                {'\ue73a'}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
      <TouchableHighlight onPress={() => {}}>
        <View
          style={[styles.listItem, styles.fileListItem, common.flexBetween]}
        >
          <Text>审批文件</Text>
          <Text style={[common.iconStyle, { color: '#bfbfbf' }]}>{'\ue73a'}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default ApprovalDetail;
