import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MyTheme from '../styles/myTheme';
import { useTheme } from '@react-navigation/native';
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
import ProjectDetail from '../pages/ProjectDetail';
import common from '../styles/common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ApprovalDetail from '../pages/ApprovalDetail';
import NewApprovalDetail from '../pages/NewApprovalDetail';
import Folder from '../pages/Folder';

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
  const { colors } = useTheme();
  return (
    <NavigationContainer theme={MyTheme}>
      {/*screenOptions配置页面导航的默认参数*/}
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={({ navigation }) => {
          return {
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTitleStyle: {
              color: '#FFFF'
            },
            headerBackTitleStyle: {
              color: '#FFFF'
            },
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <TouchableOpacity onPress={navigation.goBack}>
                <Ionicons name="chevron-back" size={24} color={'#fff'} />
              </TouchableOpacity>
            ),
            headerLeftContainerStyle: {
              paddingLeft: 10
            },
            headerRightContainerStyle: {
              paddingRight: 10
            }
          };
        }}
      >
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
        {/*登录页面*/}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ header: () => null }}
        />
        {/*项目中心详情页*/}
        {/*如果不需要header的话 => 设置options={{ header: () => null }}*/}
        <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
        {/*审批详情页*/}
        <Stack.Screen
          name="ApprovalDetail"
          component={ApprovalDetail}
          options={({ route }) => {
            return {
              headerTitle: <Text>审批详情</Text>
            };
          }}
        />
        {/*新版流程中心审批详情*/}
        <Stack.Screen
          name="NewApprovalDetail"
          component={NewApprovalDetail}
          options={({ route }) => {
            return {
              headerTitle: <Text>新版流程审批详情</Text>
            };
          }}
        />
        {/*通用文件夹页面*/}
        <Stack.Screen name="Folder" component={Folder} />
        {/*配置更多其他的页面*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RootNavigator;
