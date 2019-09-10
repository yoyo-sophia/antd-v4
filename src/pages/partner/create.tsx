import React, { Component, Fragment } from 'react';
import {
  Card,
  Col,
  Row,
  Collapse,
  Form,
  Input,
  Select,
  Button,
  Divider,
  Modal,
  message,
} from 'antd';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import StandardTable, { StandardTableColumnProps } from '../../components/StandardTable';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

message.config({
  maxCount: 1
});

const Option = Select.Option;
const { Panel } = Collapse;

// 类型接口
interface AdvancedFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  submitting: boolean;
}

@connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['partner/create'],
}))


class Create extends Component<AdvancedFormProps> {

  state = {
    isActive: false,
    benefitData: {
      list: [],
      pagination: {},
    },// 返利价格数据
    // 编辑返利比例相关参数
    modalVisible: false,
    rowInfo: {
      index: 0,
      total: 0,
      benefit: 0,
    },
    lastBenefitValue: 0,
  };

  columns: StandardTableColumnProps[] = [
    {
      title: '订单总额',
      dataIndex: 'total',
    }, {
      title: '返利比例',
      dataIndex: 'benefit',
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => (
        <Fragment>
          <a onClick={ () => this.editBenefitData(record, true) }>编辑</a>
          <Divider type="vertical"/>
          <a onClick={ () => this.deleteBenefitData(record) }>删除</a>
        </Fragment>
      ),
    },
  ];


  // 编辑区间数据
  editBenefitData = (record, flag) => {
    this.state.rowInfo = record;
    this.state.lastBenefitValue = record.total;
    this.setState({
      modalVisible: !!flag
    })
  };

  // 删除区间数据
  deleteBenefitData = (record) => {
    const { benefitData } = this.state;
    const confirm = Modal.confirm({
      title: '删除',
      content: '是否删除此区间及其以下所有区间？',
      onOk() {
        this.setState({
          benefitData: benefitData.list.splice(record.index, benefitData.list.length)
        });
        confirm.destroy();
      },
    })
  };

  handleSubmit = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        dispatch({
          type: 'formAdvancedForm/submitAdvancedForm',
          payload: values,
        });
      }
    });
  };

  // 编辑区间比例
  // 提交数据
  handleEditBenefit = () => {
    // const { form } = this.props;
    // const { rowInfo } = this.state;
    // const { getFieldsValue } = form;
    // let benefitData = this.state.benefitData;
    // form.validateFields(err => {
    //   if (!err.benefitDiscount) {
    //     const values = getFieldsValue();
    //     benefitData[rowInfo[index]].benefit = values.benefit;
    //     this.setState({
    //       benefitData
    //     })
    //   }
    // })
  };

  render() {
    const { benefitData, modalVisible } = this.state;
    const { form: { getFieldDecorator }, submitting } = this.props;
    // form layout
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return (
      <PageHeaderWrapper
        title="创建"
      >
        <Card>
          <Form { ...formItemLayout } onSubmit={ this.handleSubmit }>
            <Row>
              <Col xl={ 12 } lg={ 12 } md={ 12 } sm={ 24 } xs={ 24 }>
                <Form.Item label="昵称">
                  {
                    getFieldDecorator('nickname', {
                      rules: [
                        {
                          required: true,
                          message: '请输入昵称'
                        }
                      ]
                    })(
                      <Input placeholder="请输入昵称"/>
                    )
                  }
                </Form.Item>

                <Form.Item label="手机号码">
                  {
                    getFieldDecorator('phone', {
                      rules: [
                        {
                          required: true,
                          message: '请输入手机号码'
                        }
                      ]
                    })(
                      <Input placeholder="请输入手机号码"/>
                    )
                  }
                </Form.Item>

                <Form.Item label="真实姓名">
                  {
                    getFieldDecorator('name', {
                      rules: [
                        {
                          required: true,
                          message: '请输入真实姓名'
                        }
                      ]
                    })(
                      <Input placeholder="请输入真实姓名"/>
                    )
                  }
                </Form.Item>

                <Form.Item label="代理商分组">
                  {
                    getFieldDecorator('partnerGroup', {
                      initialValue: -1,
                      rules: [
                        {
                          required: true,
                          message: '请输入代理商分组'
                        }
                      ]
                    })(
                      <Select>
                        <Option value={ -1 }>无分组</Option>
                      </Select>
                    )
                  }
                </Form.Item>
              </Col>
              <Col xl={ 12 } lg={ 12 } md={ 12 } sm={ 24 } xs={ 24 }>
                <StandardTable
                  selectedRows={ [] }
                  data={ benefitData }
                  columns={ this.columns }
                />
              </Col>
            </Row>

            <Row>
              <Col span={ 24 }>
                <Collapse bordered={ false }>
                  <Panel header="套餐设置" key="1">
                    { 1 }
                  </Panel>
                  <Panel header="高级设置" key="2">
                    <Row>
                      <Col xl={ 12 } lg={ 12 } md={ 12 } sm={ 24 } xs={ 24 }>
                        <Form.Item label="实名方式">
                          {
                            getFieldDecorator('realNameType', {
                              initialValue: 1,
                              rules: [
                                {
                                  required: true,
                                  message: '请选择实名方式'
                                }
                              ]
                            })(
                              <Select>
                                <Option value={ 1 }>个人实名</Option>
                                <Option value={ 1 }>企业实名</Option>
                              </Select>
                            )
                          }
                        </Form.Item>

                        <Form.Item label="隐藏性">
                          {
                            getFieldDecorator('showLastPlan', {
                              initialValue: 1,
                              rules: [
                                {
                                  required: true,
                                  message: '请选择是否隐藏父套餐'
                                }
                              ]
                            })(
                              <Select>
                                <Option value={ 1 }>隐藏父套餐</Option>
                                <Option value={ 1 }>显示父套餐</Option>
                              </Select>
                            )
                          }
                        </Form.Item>

                        <Form.Item label="行业组">
                          {
                            getFieldDecorator('showLastPlan', {
                              initialValue: 1,
                              rules: [
                                {
                                  required: true,
                                  message: '请选择是否隐藏父套餐'
                                }
                              ]
                            })(
                              <Select>
                                <Option value={ 1 }>行业组（自动创建套餐）</Option>
                                <Option value={ 2 }>分销商（手动创建套餐）</Option>
                              </Select>
                            )
                          }
                        </Form.Item>

                        <Form.Item label="提现费率">
                          {
                            getFieldDecorator('withdrawFare', {
                              initialValue: 0,
                            })(
                              <Input placeholder={ '请输入提现费率' }/>
                            )
                          }
                        </Form.Item>

                        <Form.Item label="C端套餐价格">
                          {
                            getFieldDecorator('showLastPlan', {
                              initialValue: 1,
                              rules: [
                                {
                                  required: true,
                                  message: '请选择C端套餐价格'
                                }
                              ]
                            })(
                              <Select>
                                <Option value={ 1 }>含钻石优先</Option>
                                <Option value={ 2 }>原价优先</Option>
                                <Option value={ 3 }>隐藏原价</Option>
                                <Option value={ 4 }>隐藏充值</Option>
                              </Select>
                            )
                          }
                        </Form.Item>

                      </Col>
                      <Col xl={ 12 } lg={ 12 } md={ 12 } sm={ 24 } xs={ 24 }>
                        <Form.Item label="购买空卡">
                          {
                            getFieldDecorator('buyCard', {
                              initialValue: 1,
                              rules: [
                                {
                                  required: true,
                                  message: '请选择C端套餐价格'
                                }
                              ]
                            })(
                              <Select>
                                <Option value={ 1 }>是</Option>
                                <Option value={ 2 }>否</Option>
                              </Select>
                            )
                          }
                        </Form.Item>

                        <Form.Item label="购买单价">
                          {
                            getFieldDecorator('cardPrice', {
                              initialValue: 0,
                              rules: [
                                {
                                  required: true,
                                  message: '请选择C端套餐价格'
                                }
                              ]
                            })(
                              <Input placeholder="请输入卡单价"/>
                            )
                          }
                        </Form.Item>

                        <Form.Item label="购券折扣">
                          {
                            getFieldDecorator('couponDiscount', {
                              initialValue: 70,
                            })(
                              <Input placeholder="请输入券折扣"/>
                            )
                          }
                        </Form.Item>

                        <Form.Item label="最大欠款">
                          {
                            getFieldDecorator('maxDebt', {
                              initialValue: 5000,
                            })(
                              <Input placeholder="请输入最大欠款数"/>
                            )
                          }
                        </Form.Item>

                      </Col>
                    </Row>

                  </Panel>
                </Collapse>
              </Col>
            </Row>

            <Button loading={ submitting } style={ { marginTop: 25 } } type="primary" htmlType="submit">提交</Button>
          </Form>

          {/*弹窗*/ }
          <Modal
            visible={ modalVisible }
            destroyOnClose
            maskClosable={ false }
            title="编辑"
            onOk={ () => this.handleEditBenefit }
          >
            <Form>
              <Form.Item>
                {
                  getFieldDecorator('total', {
                    rules: [
                      {
                        required: true,
                        message: '请输入总金额'
                      }
                    ]
                  })(
                    <Input placeholder="请输入总金额"/>
                  )
                }
              </Form.Item>
              <Form.Item>
                {
                  getFieldDecorator('benefitDiscount', {
                    rules: [
                      {
                        required: true,
                        message: '请输入折扣比'
                      }
                    ]
                  })(
                    <Input placeholder="请输入折扣比"/>
                  )
                }
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default Form.create<AdvancedFormProps>()(Create);
