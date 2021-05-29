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
    return super.output(this.get(this.baseUrl + '/userInfo/user'));
  }

  /**
   * 获取个人网盘文件列表
   * @param parentId
   * @param pageNum
   * @param pageSize
   * @returns {Promise<unknown>}
   */
  async getPersonResList(parentId, pageNum = 1, pageSize = 20) {
    const params = {
      parentId,
      pageNum,
      pageSize
    };
    const result = await super.output(
      this.get(this.baseUrl + '/perRes/getPersonResList', params),
      true
    );
    if (result && result.resList && result.resList.total) {
      result.resList.list.forEach(item => {
        if (item.updateTime) {
          item.updateTime = this.dayjs(item.updateTime).format(
            'YYYY-MM-DD HH:mm:ss'
          );
        }
      });
    }
    return result;
  }
}

export default new UserService();
