import BaseService from './abstract/BaseService';
import Storage from '../utils/storage';
import keys from '../config/keys';
import { deleteEmptyProperty } from '../utils/obj';

/**
 * 项目中心相关
 */
class ProjectService extends BaseService {
  /**
   * 获取项目列表
   * @param enterpriseId: 企业id
   * @param pageNum
   * @param pageSize
   * @param conditions : {
   *   keyword: 关键字,
   *   isCreator: 是否是创建者(0--是;1--否)
   * }
   * @returns {Promise<T>}
   */
  async getProjectList(pageNum = 1, pageSize = 10, conditions = {}) {
    let params = {
      enterpriseId: await Storage.getItem(keys.ENTERPRISE_ID),
      pageSize,
      pageNum
    };
    conditions = deleteEmptyProperty(conditions);
    Object.assign(params, conditions);
    params = deleteEmptyProperty(params);
    const result = await super.output(
      this.get(this.baseUrl + '/v2/proInfo/getProList', params),
      true
    );
    if (result && result.pageInfo && result.pageInfo.total) {
      result.pageInfo.list.forEach(item => {
        item.updateTime = this.dayjs(item.updateTime).format('MM-DD HH:mm');
      });
    }
    return result;
  }
}
export default new ProjectService();
