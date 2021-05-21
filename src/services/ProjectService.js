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

  /**
   * 获取项目列表
   * @param projectId: 项目id
   * @param parentId: 父级id
   * @param pageSize:
   * @param pageNum:
   * @param isFolder: 是否只要文件夹（0--否；1--是）
   * @param desc: 0-正序;1--倒叙
   * @param order: 	排序字段(name,time,size)
   * @returns {Promise<T>}
   */
  async getProResList(
    projectId,
    parentId = 0,
    pageNum = 1,
    pageSize = 10,
    isFolder = 0,
    desc,
    order
  ) {
    let params = {
      projectId,
      parentId,
      enterpriseId: await Storage.getItem(keys.ENTERPRISE_ID),
      pageSize,
      pageNum,
      isFolder,
      desc,
      order
    };
    params = deleteEmptyProperty(params);
    return super.output(
      this.get(this.baseUrl + '/v2/proRes/getProResList', params)
    );
  }
}
export default new ProjectService();
