import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import common from '@/styles/common';
import styles from './styles';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { screenSize } from '../../../utils/tools';
import { useTheme } from '@react-navigation/native';
import ProjectService from '../../../services/ProjectService';
import WorkFlowConstants from '../../../const/WorkFlowConstants';
import WorkFlowList from './WorkFlowList';
import useCallbackState from '../../../hooks/useCallbackState';

const ProjectWorkflow = props => {
  const { projectId } = props;
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);
  const [actionType, setActionType] = useState('0');
  const [routes] = React.useState([
    {
      key: 'todo',
      title: '待我审批',
      actionType: WorkFlowConstants.ActionType.PENDING_OPERATION_4_USER.value()
    },
    {
      key: 'launch',
      title: '我发起的',
      actionType: WorkFlowConstants.ActionType.LAUNCH_BY_USER.value()
    },
    {
      key: 'done',
      title: '我已审批',
      actionType: WorkFlowConstants.ActionType.OPERATED_BY_USER.value()
    }
  ]);
  const renderScene = ({ route }) => {
    return <WorkFlowList actionType={route.actionType} projectId={projectId} />;
  };
  const renderTabBar = props => (
    <TabBar
      {...props}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color: focused ? colors.primary : colors.text }}>
          {route.title}
        </Text>
      )}
      indicatorStyle={styles.tabBarIndicator}
      style={styles.tabBarContainer}
    />
  );
  const _renderLazyPlaceholder = ({ route }) => (
    <LazyPlaceholder route={route} />
  );
  const LazyPlaceholder = ({ route }) => (
    <View style={styles.scene}>
      <Text>Loading {route.title}…</Text>
    </View>
  );
  return (
    <View style={common.container}>
      <TabView
        lazy
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderLazyPlaceholder={_renderLazyPlaceholder}
        initialLayout={{ width: screenSize.width }}
      />
    </View>
  );
};

export default ProjectWorkflow;
