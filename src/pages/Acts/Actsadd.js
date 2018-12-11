import React, { Component } from 'react';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card, Spin, Badge, Icon, InputNumber} from 'antd';
import styles from './style.less';
import LinkModal from '@/components/LinkModal';

const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import SmartGridView from '@/components/SmartGridView';
import { Tab } from '../../components/Login';
import ActModal from './ActModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'dva/index';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Link from 'umi/link';
import DogovorModal from '../CounterAgent/Modals/DogovorModal';


const TabPane = Tabs.TabPane;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};




@Form.create()
@connect(({ universal, loading }) => ({
  universal,
  loadingperiodYear: loading.effects['universal/getperiodYear'],
  loadingperiodSection: loading.effects['universal/getperiodSection'],
  loadingorganization: loading.effects['universal/getorganization'],
  loadingmedicalType: loading.effects['universal/getmedicalType'],
  loadingsave: loading.effects['universal/saveobject'],
}))
class Actsadd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          'title': 'Код',
          'dataIndex': 'code',
          'isVisible': 'true',
        },
        {
          'title': 'Вид деятельности',
          'dataIndex': 'activity',
          'isVisible': 'true',
        },
        {
          title: 'Вычет аванса (₸)',
          dataIndex: 'prepaid',
          isVisible: true,
        },
        {
          title: 'Итого к оплате (₸)',
          dataIndex: 'total',
          isVisible: true,
        }
      ],
      fcolumn: [
        {
          title: 'Принято к оплате (₸)',
          dataIndex: 'accept_payment',
          isVisible: true,
          order: 2,
          width: 200,
          key: 'accept_payment',
          className: 'action_column',
          isVisible: true,
          onCell: record => {
            return {
              onClick: () => {

              },
            };
          },
          render: (e) => (
            <InputNumber
              style={{width:'100%'}}
              step={0.01}
              onChange={(d)=>{
                this.onChangePayment(e, d)
              }}
            />
          ),
        },
        {
          title: 'Предъявлено к оплате (₸)',
          order: 3,
          width: 200,
          key: 'operation',
          className: 'action_column',
          isVisible: true,
          onCell: record => {
            return {
              onClick: () => {

              },
            };
          },
          render: (e) => (
            <InputNumber
              style={{width:'100%'}}
              step={0.01}
              onChange={(d)=>{
                /*console.log(d.target.value);*/
                this.onChangeSumma(e, d)
              }}
            />
          ),
        }
      ],
      data: [
        {
          key: 1, id:"123qwe111", code: '123456', activity: 'Медицинское учереждение', present_payment: 10456, accept_payment:10456, prepaid:2500, total:10456
        },
        {
          key: 2, id:"123qwe222", code: '123456', activity: 'Медицинское учереждение', present_payment: 10456, accept_payment:10456, prepaid:2500, total:10456
        },
        {
          key: 3, id:"123qwe333", code: '123456', activity: 'Медицинское учереждение', present_payment: 10456, accept_payment:10456, prepaid:2500, total:10456
        },
      ],
      ContractSelect: [],
      selectedRowKeys: [],
      modal:false,
      ContractSumms:[],
      Contractpayment:[],
      ShowClear: true,
      DogovorModal: {
        visible: false,
        record: null
      }
    }
  }
  deleteContract=()=>{
    /*this.setState({
      data: this.state.data.filter((item) => {
        /!*this.state.ContractTable.filter((select)=>{
          select.key==item.key
        })*!/
      })
    })*/
  }
  componentDidMount() {
  const { dispatch, match } = this.props;
  const DicArr=[
    'periodYear',
    'periodSection',
    'divisions',
    'medicalType',
  ]
  DicArr.forEach(function(item) {
    dispatch({
      type: 'universal/get'+item,
      payload: {
          "start":0,
          "length":1000,
          "entity":item
      },
    });
  })
}

  onChangeSumma=(e, d)=>{
  }

  onChangePayment=(e, d)=>{
   /* console.log(e.id);
    console.log(d);*/
    /*this.setState({
      Contractpayment:[
        ...this.state.Contractpayment.filter((item)=>{item.id != e.id}),
        {
          id: e.id,
          summ: d
        }
      ]
    })*/
  }
  render() {
    const rowSelection = {

    };
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
    };
    return (
    <PageHeaderWrapper title={formatMessage({ id: 'app.module.acts.title.add' })}>
      {this.state.DogovorModal.visible && <DogovorModal
        onSelect={(record) => {
          this.setState({ DogovorModal: { visible: false, record: record } });
          console.log(this.state.DogovorModal.record)
        }}
        hide={() => this.setState({ DogovorModal: { visible: false } })
        }/>}
      <Card
        headStyle={{ padding: 0 }}
        style={{padding:'10px'}}
        className={styles.headPanel}
        extra={[<Button
          htmlType="submit"
          style={{float:'left'}}
          onClick={(e)=>{

            this.props.form.validateFields(
              (err, values) => {
                if (!err) {

                  if (this.state.DogovorModal.record) {
                   values.contract = {
                     id: this.state.DogovorModal.record.id
                   }
                   console.log(values);

                  }
                  dispatch({
                    type: 'universal/saveobject',
                    payload: {
                      "entity": "act",
                      "alias": null,
                      "data":
                        {
                          ...values,
                          documentDate: values.documentDate.format("DD.MM.YYYY"),
                          protocol: null,
                          contract: {
                            id: this.props.location.state.data.id
                          },
                          "actItems": [
                            {
                              "activity": {
                                "id": "32576777-c4a9-41c9-86c4-393bb29072ef"
                              },
                              "contractItem": {
                                "id": "ebbef7c1-25cf-4341-bbe2-cb0c6d391372"
                              },
                              "protocolItem": null,
                              "actItemValues": [
                                {
                                  "valueSum": 0,
                                  "sumRequested": 0,
                                  "sumAdvanceTakeout": 0,
                                  "value": 1,
                                  "valueRequested": 0,
                                  "currencyType": {
                                    "id": "5cd4e565-10da-4b79-8578-ffdd5a0d8270"
                                  },
                                  "measureUnit": {
                                    "id": "be88fc85-e565-43cd-a14a-7cdd46828f4c"
                                  },
                                  "protocolItem": null
                                }
                              ]
                            }
                          ]
                        }
                    },
                  }).then(()=>{
                    //console.log(this.props.universal.saveanswer);
                    this.props.tomain();
                  });
                }
                else {}
              },
            );
          }
          }>
          Сохранить
        </Button>,
          <div style={{float:'left'}}>
          {this.state.ShowClear &&
          <Button
            style={{margin: '0px 0px 10px 10px'}} onClick={() => {
            this.props.form.resetFields();
          }}>
            Очистить
          </Button>}
        </div>
        ]}
        bordered={false}
        bodyStyle={{ padding: 0 }}>
        <Spin spinning={this.props.loadingperiodYear && this.props.loadingperiodSection && this.props.loadingorganization && this.props.loadingmedicalType && this.props.loadingsave}>
          <Row style={{marginTop:'5px'}}>
            <Form layout="horizontal" hideRequiredMark>
              <Tabs
                className={styles.stepFormText}
                type={'card'}
                defaultActiveKey="form"
                onChange={(e)=>{
                  if (e==='form'){
                    this.setState({
                      ShowClear: true
                    })
                  }
                  else {
                    this.setState({
                      ShowClear: false
                    })
                  }
                }}
                tabPosition={'left'}>
                <TabPane
                  tab="Титульная часть"
                  key="form"
                  >
                  <Card style={{marginLeft: '-10px'}}>
                    <div style={{margin:'10px 0', maxWidth:'70%'}}>
                      {this.props.location.state && <Form.Item {...formItemLayout} label="Номер">
                         {this.props.location.state &&
                         <Link
                           to={'/contract/contracts/acts/add/viewcontract?id='+this.props.location.state.data.id}
                         >Договор №{this.props.location.state.data.number}</Link>}

                      </Form.Item>}
                      {!this.props.location.state &&
                      <Form.Item {...formItemLayout} label="Родительский договор">
                        {getFieldDecorator('contract.id', {
                          rules: [{
                            validator: (rule, value, callback) => {
                              if (value !== null && value) {
                                if (value.value !== null) {
                                  callback();
                                  return;
                                } else {
                                  callback('не заполнено');
                                }
                              }
                              callback('не заполнено');
                            },
                          }],
                        })(
                          <LinkModal
                            data={this.state.DogovorModal.record}
                            onTarget={(record) => {
                                  console.log(record);
                            }}
                            onDelete={() => {
                              this.setState({ DogovorModal: { visible: false, record: null } });
                            }}
                            onClick={() => {
                              this.setState({ DogovorModal: { visible: true } });
                            }}>
                          </LinkModal>)}
                      </Form.Item>}
                      <Form.Item {...formItemLayout} label="Номер">
                        {getFieldDecorator('number', {
                          initialValue: null,
                          rules: [{ required: true, message: 'не заполнено'}],
                        })(
                          <Input style={{width:'50%'}}/>
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Дата">
                        {getFieldDecorator('documentDate', {
                          initialValue: null,
                          rules: [{ type: 'object', required: false, message: 'не заполнено' }],
                        })(
                          <DatePicker
                            format={'DD.MM.YYYY'}
                            style={{width:'50%'}}
                            placeholder="Выберите дату"
                          />
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Отчетный период: год">
                        {getFieldDecorator('periodYear.id', {
                          initialValue: null,
                          rules: [{ required: false, message: 'не заполнено' }],
                        })(
                          <Select
                            allowClear
                            style={{width:'50%'}}
                          >
                            {this.props.universal.periodYear.content && this.props.universal.periodYear.content.map((item) => {
                                    return <Select.Option key={item.id}>{item.year}</Select.Option>;
                                })}
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Отчетный период: месяц">
                        {getFieldDecorator('periodSection.id', {
                          initialValue: null,
                          rules: [{ required: false, message: 'не заполнено' }],
                        })(
                          <Select
                            allowClear
                            style={{width:'50%'}}
                          >
                            {this.props.universal.periodSection.content && this.props.universal.periodSection.content.map((item) => {
                              return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                            })}
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Подразделение">
                        {getFieldDecorator('divisions.id', {
                          initialValue: null,
                          rules: [{ required: false, message: 'не заполнено' }],
                        })(
                          <Select
                            allowClear
                          >
                            {this.props.universal.divisions.content && this.props.universal.divisions.content.map((item) => {
                              return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>;
                            })}
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Примечание">
                        {getFieldDecorator('descr', {
                          initialValue: null,
                          rules: [{ required: false, message: 'не заполнено' }],
                        })(
                          <TextArea rows={4}/>,
                        )}
                      </Form.Item>
                    </div>
                  </Card>
                </TabPane>
                <TabPane
                  tab="Спецификация"
                  key="specifications"
                  >
                  <Card style={{marginLeft: '-10px'}}>
                    <SmartGridView
                      name={'specform'}
                      scroll={{ x: 'auto' }}
                      searchButton={false}
                      fixedBody={true}
                      rowKey={'id'}
                      loading={false}
                      fixedHeader={false}
                      hideRefreshBtn={true}
                      hideFilterBtn={true}
                      rowSelection={true}
                      showExportBtn={true}
                      hidePagination={true}
                      columns={this.state.columns}
                      actionColumns={this.state.fcolumn}
                      sorted={true}
                      onSort={(column) => {}}
                      showTotal={true}
                      addonButtons={[]}
                      actionExport={() => {}}
                      onSelectRow={(record, index) => {
                        //console.log(record)
                      }}
                      dataSource={{
                        total: this.state.data.length,
                        pageSize: this.state.data.length,
                        page: 1,
                        data: this.state.data,
                      }}
                      onShowSizeChange={(pageNumber, pageSize) => {}}
                      onRefresh={() => {

                      }}
                      onSearch={() => {

                      }}
                    />
                  </Card>
                </TabPane>
              </Tabs>
            </Form>
          </Row>
        </Spin>
      </Card>
    </PageHeaderWrapper>

  );
  }
}

export default Actsadd;
