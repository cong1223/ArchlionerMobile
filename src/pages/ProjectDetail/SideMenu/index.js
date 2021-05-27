import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import styles from './styles';
import { ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';
import ProjectService from '../../../services/ProjectService';
import common from '../../../styles/common';
const SideMenu = props => {
  const { name, id } = props;
  const [projectDetail, setProjectDetail] = useState({});
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
      label: '所属企业',
      value: curEnterprise.enterpriseName
    },
    {
      label: '项目名称',
      value: name
    },
    {
      label: '项目公告',
      value: '',
      linkedText: '填写'
    },
    {
      label: '项目成员',
      value: '',
      linkedText:
        projectDetail.proUserList && projectDetail.proUserList.length + '人'
    }
  ];
  useEffect(() => {
    if (id) {
      ProjectService.getProDetailInfo(id).then(detail => {
        console.log('项目详情', detail);
        setProjectDetail(detail);
      });
    }
  }, [id]);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {list.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <Text>{item.label}</Text>
            <ListItem.Content />
            {item.linkedText ? (
              <View style={common.center}>
                <Text style={styles.listItemText}>{item.linkedText}</Text>
                <ListItem.Chevron />
              </View>
            ) : (
              <Text style={styles.listItemText}>{item.value}</Text>
            )}
          </ListItem>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default SideMenu;
