import React from 'react';
import { Text } from 'react-native';
// 引入三个创建底部导航tab需要的依赖
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// 引入icon库
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Project from '../pages/tabs/Project';
import Workflow from '../pages/tabs/Workflow';
import Mine from '../pages/tabs/Mine';
import Disk from '../pages/tabs/Disk';
import Login from '../pages/Login';
import common from '../styles/common';

function BottomTab() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconUnicode;
          switch (route.name) {
            case '项目中心':
              iconUnicode = '\ue783';
              break;
            case '流程中心':
              iconUnicode = '\ue788';
              break;
            case '我的网盘':
              iconUnicode = '\ue78a';
              break;
            case '我的':
              iconUnicode = '\ue778';
              break;
          }
          return (
            <Text style={[common.iconStyle, { color: color, fontSize: size }]}>
              {iconUnicode}
            </Text>
          );
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
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Tab"
          component={BottomTab}
          options={({ route }) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '项目中心';
            return {
              headerTitle: <Text>{routeName}</Text>,
              headerBack: false
            };
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ header: () => null }}
        />
        {/*配置更多其他的页面*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RootNavigator;
