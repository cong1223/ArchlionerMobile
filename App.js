// react-navigation 文档明确表示要把这个依赖(react-native-gesture-handler)放在入口文件的第一行
// https://reactnavigation.org/docs/getting-started
/**
 * To finalize installation of react-native-gesture-handler, add the following at the top (make sure it's at the top and there's nothing else before it) of your entry file, such as index.js or App.js:
 */
import 'react-native-gesture-handler';
import React from 'react';
import type { Node } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WRootToastApp } from 'react-native-smart-tip';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <WRootToastApp>
          <RootNavigator />
        </WRootToastApp>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
