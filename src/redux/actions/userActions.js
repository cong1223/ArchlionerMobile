import actionTypes from '../actionTypes';
import UserService from '../../services/UserService';
const setAccountInfo = accountInfo => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_ACCOUNT_INFO,
      accountInfo
    });
    return UserService.getUserInfo().then(res => {
      dispatch({
        type: actionTypes.SET_USER_INFO,
        userInfo: res
      });
    });
  };
};

export { setAccountInfo };
