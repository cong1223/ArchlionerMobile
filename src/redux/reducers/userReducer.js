import actionTypes from '../actionTypes';
import Storage from '../../utils/storage';
import keys from '../../config/keys';

const init = {
  userInfo: {},
  userId: '',
  enterpriseId: '',
  vipLevel: {},
  token: '',
  enterpriseVoList: []
};
export default (state = init, action) => {
  switch (action.type) {
    case actionTypes.SET_ACCOUNT_INFO:
      const {
        userInfo,
        enterpriseVoList,
        vipLevel,
        token
      } = action.accountInfo;
      Storage.setItem(keys.X_ACCESS_TOKEN, token);
      Storage.setItem(keys.ENTERPRISE_ID, userInfo.curEnterpriseId);
      return {
        ...state,
        userInfo,
        enterpriseVoList,
        vipLevel,
        token,
        userId: userInfo.id,
        enterpriseId: userInfo.curEnterpriseId
      };
    case actionTypes.SET_USER_INFO:
      const { user } = action.userInfo;
      return {
        ...state,
        userInfo: user
      };
    default:
      return state;
  }
};
