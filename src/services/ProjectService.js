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
   * 获取项目文件列表
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
    pageSize = 15,
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
    const result = await super.output(
      this.get(this.baseUrl + '/v2/proRes/getProResList', params),
      true
    );
    if (result && result.resList && result.resList.total) {
      result.resList.list.forEach(item => {
        item.updateTime = this.dayjs(item.updateTime).format(
          'YYYY-MM-DD HH:mm'
        );
      });
    }
    return result;
  }

  /**
   * 搜索项目资源
   * @param projectId: 项目id
   * @param keyword: 关键字
   * @param pageNum:
   * @param pageSize:
   * @param enterpriseId: 企业id
   * @returns {Promise<T>}
   */
  async searchProRes(projectId, keyword, pageNum = 1, pageSize = 20) {
    const params = {
      projectId,
      keyword,
      enterpriseId: await Storage.getItem(keys.ENTERPRISE_ID),
      pageNum,
      pageSize
    };
    return super.output(
      this.get(this.baseUrl + '/v2/proRes/searchProRes', params)
    );
  }

  /**
   * 获取项目详情信息
   * @param projectId: 项目id
   * @returns {Promise<T>}
   */
  getProDetailInfo(projectId) {
    return super.output(
      this.get(this.baseUrl + '/v2/proInfo/getProDetailInfo', { projectId })
    );
  }

  /**
   * 项目中心流程待我审批列表
   * @param projectId
   * @param pageNum
   * @param pageSize
   * @returns {Promise | Promise<unknown>}
   */
  getApprovalListForMe(projectId, pageNum = 1, pageSize = 20) {
    const params = {
      projectId,
      pageNum,
      pageSize
    };
    return super.output(
      this.get(this.baseUrl + '/ApprovalCenter/getApprovalListForMe', params),
      true
    );
  }

  /**
   * 项目中心流程我发起的
   * @param projectId
   * @param pageNum
   * @param pageSize
   * @returns {Promise | Promise<unknown>}
   */
  getLaunchByMe(projectId, pageNum = 1, pageSize = 20) {
    const params = {
      projectId,
      pageNum,
      pageSize
    };
    return super.output(
      this.get(this.baseUrl + '/ApprovalCenter/getLaunchByMe', params),
      true
    );
  }

  /**
   * 项目中心流程我已审批
   * @param projectId
   * @param pageNum
   * @param pageSize
   * @returns {Promise | Promise<unknown>}
   */
  getApprovedList(projectId, pageNum = 1, pageSize = 20) {
    const params = {
      projectId,
      pageNum,
      pageSize
    };
    return super.output(
      this.get(this.baseUrl + '/ApprovalCenter/getApprovedList', params),
      true
    );
  }

  /**
   * 获取文件预览地址
   * @param recordId
   * @returns {Promise<unknown>}
   */
  getPreviewUrl(recordId, fid = null) {
    const params = {};
    if (recordId) params.recordId = recordId;
    if (fid) params.fid = fid;
    return super.output(
      this.get(this.baseUrl + '/v2/record/getPreviewUrl', params)
    );
  }

  /**
   * 项目中心的流程(与新版的流程中心获取审批详情接口不同!!!)
   * @param actId
   * @param formId
   * @returns {Promise<unknown>}
   */
  getApprovalDetail(actId, formId) {
    const params = {
      actId,
      formId
    };
    return super.output(
      this.get(this.baseUrl + '/ApprovalCenter/getApprovalDetail', params)
    );
  }
}
export default new ProjectService();
