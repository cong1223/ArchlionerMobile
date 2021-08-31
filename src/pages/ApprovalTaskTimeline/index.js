import React, { useState, useRef, useEffect } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import Timeline from 'react-native-timeline-flatlist';

const ApprovalTaskTimeline = props => {
  const route = useRoute();
  const { actTaskList } = route.params;
  const [data, setData] = useState([]);
  return (
    <Timeline
      circleSize={20}
      circleColor="rgb(45,156,219)"
      lineColor="rgb(45,156,219)"
      timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
      timeStyle={{
        textAlign: 'center',
        backgroundColor: '#ff9797',
        color: 'white',
        padding: 5,
        borderRadius: 13
      }}
      descriptionStyle={{ color: 'gray' }}
      options={{
        style: { paddingTop: 5 }
      }}
    />
  );
};

export default ApprovalTaskTimeline;
