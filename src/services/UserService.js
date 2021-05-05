import BaseService from './abstract/BaseService';

/**
 * 日志相关
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
}

export default new UserService();
