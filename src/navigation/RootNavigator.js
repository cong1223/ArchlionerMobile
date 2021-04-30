import React from 'react';
// 引入三个创建底部导航tab需要的依赖
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// 引入icon库
import Ionicons from 'react-native-vector-icons/Ionicons';
import Project from '../pages/Project';
import Workflow from '../pages/Workflow';
import Logo from '../components/Logo';
import Mine from '../pages/Mine';
import Disk from '../pages/Disk';

function BottomTab() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case '项目中心':
              iconName = 'ios-home';
              break;
            case '流程中心':
              iconName = 'ios-list';
              break;
            case '我的网盘':
              iconName = 'ios-list';
              break;
            case '我的':
              iconName = 'ios-list';
              break;
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: '#23b8ff',
        inactiveTintColor: '#999'
      }}
    >
      <Tab.Screen name="项目中心" component={Project} />
      <Tab.Screen name="流程中心" component={Workflow} />
      <Tab.Screen name="我的网盘" component={Disk} />
      <Tab.Screen name="我的" component={Mine} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tab"
          component={BottomTab}
          options={{
            headerTitle: () => <Logo />
          }}
        />
        {/*<Stack.Screen*/}
        {/*  name="Detail"*/}
        {/*  component={DetailPage}*/}
        {/*  options={{*/}
        {/*    headerTitle: () => <Logo />,*/}
        {/*    headerBackTitle: '返回',*/}
        {/*  }}*/}
        {/*/>*/}
        {/*配置更多其他的页面*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RootNavigator;
