import BaseConstant from './abstract/BaseConstant';
class WorkFlowConstants {
  /*
   * 审批周期
   */
  static ValidTime = class ValidTime extends BaseConstant {
    static WEEK = new BaseConstant('WEEK', '0', '7天');
    static HALF_MONTH = new BaseConstant('HALF_MONTH', '1', '14天');
    static MONTH = new BaseConstant('MONTH', '2', '1个月');
    static QUARTER = new BaseConstant('QUARTER', '3', '3个月');
  };

  /*
   * 流程状态
   */
  static FlowStatus = class FlowStatus extends BaseConstant {
    static ARC_WORKFLOW_NOT_LAUNCH = new BaseConstant(
      'ARC_WORKFLOW_NOT_LAUNCH',
      '0',
      '审批未开始',
      '审批流程未开始'
    );
    static ARC_WORKFLOW_IN_PROGRESS = new BaseConstant(
      'ARC_WORKFLOW_IN_PROGRESS',
      '1',
      '进行中',
      '正在审批'
    );
    static ARC_WORKFLOW_RECALL = new BaseConstant(
      'ARC_WORKFLOW_RECALL',
      '2',
      '已撤回',
      '撤回'
    );
    static ARC_WORKFLOW_SHALL_NOT_PASS = new BaseConstant(
      'NOT_PASS',
      '3',
      '已拒绝'
    );
    static ARC_WORKFLOW_PASS = new BaseConstant(
      'ARC_WORKFLOW_PASS',
      '4',
      '已通过',
      '使用中'
    );
    // static ARC_FORCE_RECALL = new BaseConstant("ARC_FORCE_RECALL", '5', "强制收回");
    static OTHERS_PASS = new BaseConstant('OTHERS_PASS', '6', '其他人通过');
    static WITH_DRAW = new BaseConstant(
      'WITH_DRAW',
      '9',
      '已收回',
      '审批正常结束'
    );
    static DONE_SIGN = new BaseConstant(
      'DONE_SIGN',
      '7',
      '已签章',
      'pc端已签章'
    );
  };

  /*
   * 审批类型
   */
  static ApprovalType = class ApprovalType extends BaseConstant {
    static BORROW = new BaseConstant('BORROW', '0', '借阅');
    static DESTROY = new BaseConstant('DESTROY', '2', '销毁');
    static PUBLISH = new BaseConstant('PUBLISH', '3', '出版');
  };

  /*
   * 模块类型
   */
  static ModuleType = class moduleType extends BaseConstant {
    static SIGNATURE = new BaseConstant('SIGNATURE', '1', '项目签章');
    static ARCHIVE = new BaseConstant('ARCHIVE', '2', '档案借阅');
    static PUBLISH = new BaseConstant('PUBLISH', '3', '文件出版');
    static DESTROY = new BaseConstant('DESTROY', '4', '销毁档案');
  };

  /*
  审批列表类型(可以废弃,用ActionType代替)
   */
  static ApprovalListType = class ApprovalType extends BaseConstant {
    static TODO = new BaseConstant('待我审批', '1');
    static LAUNCH = new BaseConstant('我发起的', '2');
    static DONE = new BaseConstant('我已审批', '3');
  };

  /*
  新版流程,操作类型
   */
  static ActionType = class ActionType extends BaseConstant {
    static PENDING_OPERATION_4_USER = new BaseConstant(
      'PENDING_OPERATION_4_USER',
      '0',
      '待我审批'
    );
    static OPERATED_BY_USER = new BaseConstant(
      'OPERATED_BY_USER',
      '2',
      '我已审批'
    );
    static LAUNCH_BY_USER = new BaseConstant('LAUNCH_BY_USER', '1', '我发起的');
    static WORKFLOW_COMPLETE = new BaseConstant(
      'WORKFLOW_COMPLETE',
      '4',
      '流程已经结束'
    );
  };
}
export default WorkFlowConstants;
