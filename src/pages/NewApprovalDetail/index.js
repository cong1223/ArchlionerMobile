import React, { useEffect, useMemo, useState } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import common from '../../styles/common';
import styles from './styles';
import { Avatar } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { timeAgo } from '@/utils/date';
import WorkFlowConstants from '../../const/WorkFlowConstants';
import WorkFlowService from '../../services/WorkFlowService';

const ApprovalDetail = props => {
  const route = useRoute();
  const { detail, actionType } = route.params;
  const [actDetailData, setActDetailData] = useState({});
  useEffect(() => {
    console.log(detail, actionType);
    WorkFlowService.getActDetail(detail.id).then(res => {
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
            <Text style={[styles.descLabelText, common.mr8]}>审批备注:</Text>
            <Text style={styles.descText} numberOfLines={1}>
              {(actDetailData.actInfoVO && actDetailData.actInfoVO.remarks) ||
                '无'}
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
                  actDetailData.actInfoVO &&
                  actDetailData.actInfoVO.launchManInfo &&
                  actDetailData.actInfoVO.launchManInfo.realname.substr(0, 2)
                }
              />
              <Text style={styles.userInfoNameText}>
                {actDetailData.actInfoVO &&
                  actDetailData.actInfoVO.launchManInfo &&
                  actDetailData.actInfoVO.launchManInfo.realname}
              </Text>
            </View>
            <Text style={styles.userInfoTimeAgo}>
              {timeAgo(
                actDetailData.actInfoVO &&
                  new Date(actDetailData.actInfoVO.updateTime).getTime()
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
                actDetailData.actInfoVO && actDetailData.actInfoVO.status
              )}`}</Text>
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
          <Text style={[common.iconStyle, { color: '#bfbfbf' }]}>
            {'\ue73a'}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default ApprovalDetail;
