import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'; // 打印redux日志的中间件

import reducers from './reducers'; //Import the reducer

// Connect our store to the reducers
export default createStore(
  reducers,
  compose(applyMiddleware(thunk, createLogger))
);
