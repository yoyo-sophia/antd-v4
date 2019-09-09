import { TableListPagination, anyArray } from '@/commonInterface/table.list';

// 更新或创建代理商代理商相关参数
export interface PartnersParams {
  nickname: string,
  password: string,
  mobile: number,
  realName: string, // 真事姓名
  need_auth: boolean, // 是否需要实名
  isMustPlan: boolean, // 是否可购买空卡
  authority: boolean, // 是否显示套餐
  cardPrice: boolean, // 空卡价格
  partnerType: string, // 用户类型
  discount: number, // 折扣
  partnerFare: number, // 提现费率
  maxDebt: number, // 最大负债
  planIds: string, // 初始套餐ID
  partnerGroup: string, // 分组
  defaultPrice: string, // C端用户充值状态
  couponRefundType: string // 卡券退款至
}

// 创建代理商所需的参数
export interface CreatePartnerParams {
  PartnersParams: Partial<PartnersParams>
}

// 更新代理商所需的参数
export interface UpdatePartnerParams {
  PartnersParams: Partial<PartnersParams>
}

// 代理商列表-简版
export interface simpleList {
  rows: anyArray,
  pagination: Partial<TableListPagination>
}

// 代理商-全版
export interface partnerList {
  rows: anyArray,
  pagination: Partial<TableListPagination>
}
