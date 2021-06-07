import BaseService from './abstract/BaseService';
import WorkFlowConstants from '../const/WorkFlowConstants';
import { fileExt2Icon } from '../utils/file';

/**
 * 流程相关
 */
class WorkFlowService extends BaseService {
  /**
   * 获取我发起的流程列表
   * @param moduleType: 模块类型（1--签章；2--档案；3--出版模块；4--销毁档案模块）
   * @param pageSize
   * @param pageNum
   * @returns {Promise<T>}
   */
  async getLaunchAct(moduleType, pageNum = 1, pageSize = 20) {
    const params = {
      moduleType,
      pageSize,
      pageNum
    };
    const result = await super.output(
      this.get(this.baseUrl + '/newApproval/getLaunchAct', params),
      true
    );
    if (result && result.list && result.list.length) {
      result.list.forEach(item => {
        item.updateTimeFormat = this.dayjs(item.updateTime).format(
          'YYYY-MM-DD HH:mm:ss'
        );
        item.createTimeFormat = this.dayjs(item.createTime).format(
          'YYYY-MM-DD HH:mm:ss'
        );
        item.img = require('@/assets/img/workflow.png');
      });
    }
    return result;
  }

  /**
   * 获取待我审批列表
   * @param moduleType: 模块类型（1--签章；2--档案；3--出版模块；4--销毁档案模块）
   * @param pageSize
   * @param pageNum
   * @returns {Promise<T>}
   */
  async getTodoList(moduleType, pageNum = 1, pageSize = 20) {
    const params = {
      moduleType,
      pageSize,
      pageNum
    };
    const result = await super.output(
      this.get(this.baseUrl + '/newApproval/getTodoList', params),
      true
    );
    if (result && result.list && result.list.length) {
      result.list.forEach(item => {
        item.updateTimeFormat = this.dayjs(item.updateTime).format(
          'YYYY-MM-DD HH:mm:ss'
        );
        item.createTimeFormat = this.dayjs(item.createTime).format(
          'YYYY-MM-DD HH:mm:ss'
        );
        item.img = require('@/assets/img/workflow.png');
      });
    }
    return result;
  }

  /**
   * 获取我已审批列表
   * @param moduleType: 模块类型（1--签章；2--档案；3--出版模块；4--销毁档案模块）
   * @param pageSize
   * @param pageNum
   * @returns {Promise<T>}
   */
  async getDoneAct(moduleType, pageNum = 1, pageSize = 20) {
    const params = {
      moduleType,
      pageSize,
      pageNum
    };
    const result = await super.output(
      this.get(this.baseUrl + '/newApproval/getDoneAct', params),
      true
    );
    if (result && result.list && result.list.length) {
      result.list.forEach(item => {
        item.updateTimeFormat = this.dayjs(item.updateTime).format(
          'YYYY-MM-DD HH:mm:ss'
        );
        item.createTimeFormat = this.dayjs(item.createTime).format(
          'YYYY-MM-DD HH:mm:ss'
        );
        item.img = require('@/assets/img/workflow.png');
      });
    }
    return result;
  }

  /**
   * 获取审批详情(新版)
   * @param actId: 流程id
   * @returns {Promise<T>}
   */
  async getActDetail(actId) {
    const result = await super.output(
      this.get(this.baseUrl + '/newApproval/getActDetail', { actId })
    );
    result.actInfoVO.createTime = this.dayjs(
      result.actInfoVO.createTime
    ).format('YYYY-MM-DD HH:mm:ss');
    result.actInfoVO.updateTime = this.dayjs(
      result.actInfoVO.updateTime
    ).format('YYYY-MM-DD HH:mm:ss');
    if (result.additionInfo && result.additionInfo.deliveryTime) {
      result.additionInfo.deliveryTime = this.dayjs(
        result.additionInfo.deliveryTime
      ).format('YYYY-MM-DD');
    }
    result.actInfoVO.statusText = WorkFlowConstants.FlowStatus.getCnameByValue(
      result.actInfoVO.status
    );
    result.actInfoVO.shortName = result.actInfoVO.launchManInfo.realname
      ? result.actInfoVO.launchManInfo.realname.slice(-2)
      : '';
    if (result.actTaskList.length) {
      result.actTaskList.forEach(item => {
        item.updateTime = item.updateTime
          ? this.dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
          : '';
        item.statusText = WorkFlowConstants.FlowStatus.getCnameByValue(
          item.status
        );
        item.shortName = item.taskUserInfo.realname
          ? item.taskUserInfo.realname.slice(-2)
          : '';
      });
    }
    return result;
  }

  /**
   * 获取流程文件
   * @param actId
   * @returns {Promise<T>}
   */
  async getActResList(actId) {
    const result = await super.output(
      this.get(this.baseUrl + '/newApproval/getActResList', { actId })
    );
    if (result && result.length) {
      result.forEach(file => {
        file.icon = fileExt2Icon('0', file.fileExt);
        file.createTime = this.dayjs(file.createTime).format(
          'YYYY-MM-DD HH:mm:ss'
        );
      });
    }
    return result;
  }
}
export default new WorkFlowService();
