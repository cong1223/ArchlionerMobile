import BaseService from './abstract/BaseService';

/**
 * 用户相关
 */
class UserService extends BaseService {
  /**
   * 登录
   * @param username: 账号
   * @param password: 密码
   */
  login(username, password) {
    return super.output(
      this.post(this.baseUrl + 'sys/login', { username, password })
    );
  }
  getUserInfo() {
    return super.output(this.get(this.baseUrl + 'userInfo/user'));
  }
}

export default new UserService();
