import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  DatePicker,
  Table,
  Row,
  Col,
  Tabs,
  Card,
  Spin,
  Badge,
  Icon,
  InputNumber,
} from 'antd';
import styles from './style.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import SmartGridView from '@/components/SmartGridView';
import { Tab } from '../../components/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'dva/index';
import ActModal from '../Acts/ActModal';


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
  loadingpaymentRequestType: loading.effects['universal/getpaymentRequestType'],
}))
class ContractRequestsadd extends Component {
  constructor(props) {
    super(props);
    this.state = {

      actcolumns: [
        {
          title: 'Отчетный период(Год)',
          dataIndex: 'act_period_year',
          isVisible: true,
        },
        {
          title: 'Отчетный период(Месяц)',
          dataIndex: 'act_period_month',
          isVisible: true,
        },
        {
          title: 'БИН',
          dataIndex: 'bin',
          isVisible: true,
        },
        {
          title: 'Контрагент',
          dataIndex: 'counteragent',
          isVisible: true,
        },
        {
          title: 'Договор',
          dataIndex: 'contract_id',
          isVisible: true,
        },
        {
          title: 'Номер',
          dataIndex: 'number',
          isVisible: true,
        },
        {
          title: 'Дата',
          dataIndex: 'act_date',
          isVisible: true,
        },
        {
          title: 'Оплата',
          dataIndex: 'payment',
          isVisible: true,
        },
        {
          title: 'Подразделение',
          dataIndex: 'podr',
          isVisible: true,
        },
      ],
      actdata: [
        {
          id: '1',
          act_period_year: 'test',
          act_period_month: 'test',
          bin: 'test',
          counteragent: 'test',
          contract_id: 'test',
          number: '1516512',
          act_date: '02.12.2018',
          payment: '05.12.2018',
          podr: '06.12.2018',
        }, {
          id: '2',
          act_period_year: 'test',
          act_period_month: 'test',
          bin: 'test',
          counteragent: 'test',
          contract_id: 'test',
          number: '1516512',
          act_date: '02.12.2018',
          payment: '05.12.2018',
          podr: '06.12.2018',
          newContract: false,
        },
      ],
      contractcolumns: [
        {
          title: 'Отчетный период',
          dataIndex: 'report_period',
          isVisible: true,
        },
        {
          title: 'БИН',
          dataIndex: 'bin',
          isVisible: true,
        },
        {
          title: 'Контрагент',
          dataIndex: 'counteragent',
          isVisible: true,
        },
        {
          title: 'Вид договора',
          dataIndex: 'contract_Type',
          isVisible: true,
        },
        {
          title: 'Номер',
          dataIndex: 'number',
          isVisible: true,
        },
        {
          title: 'Дата',
          dataIndex: 'data',
          isVisible: true,
        },
        {
          title: 'Период с',
          dataIndex: 'periodStart',
          isVisible: true,
        },
        {
          title: 'Период по',
          dataIndex: 'periodEnd',
          isVisible: true,
        },
        {
          title: 'Подразделение',
          dataIndex: 'podr',
          isVisible: true,
        },
        {
          title: 'Статус',
          dataIndex: 'status',
          isVisible: true,
        },
      ],
      contractdata: [
        {
          id: '1',
          report_period: 'test',
          bin: 'test',
          counteragent: 'test',
          contract_Type: 'test',
          number: 'test',
          data: '1516512',
          periodStart: '02.12.2018',
          periodEnd: '05.12.2018',
          podr: '06.12.2018',
          status: 'lorem ipsum dolor sit amet',
        }, {
          id: '2',
          report_period: 'test',
          bin: 'test',
          counteragent: 'test',
          contract_Type: 'test',
          number: 'test',
          data: '1516512',
          periodStart: '02.12.2018',
          periodEnd: '05.12.2018',
          podr: '06.12.2018',
          status: 'lorem ipsum dolor sit amet',
          newContract: false,
        },
      ],
      speccolumns: [
        {
          title: 'БИН',
          dataIndex: 'bin',
          isVisible: true,
        },
        {
          title: 'Контрагент',
          dataIndex: 'activity',
          isVisible: true,
        },
        {
          title: 'Код',
          dataIndex: 'prepaid',
          isVisible: true,
        },
        {
          title: 'Вид деятельности',
          dataIndex: 'total',
          isVisible: true,
        },
        {
          title: 'Сумма (тг)',
          dataIndex: 'total',
          isVisible: true,
        },
      ],
      specfcolumn: [],
      specdata: [
        {
          key: 1,
          id: '123qwe111',
          code: '123456',
          activity: 'Медицинское учереждение',
          present_payment: 10456,
          accept_payment: 10456,
          prepaid: 2500,
          total: 10456,
        },
        {
          key: 2,
          id: '123qwe222',
          code: '123456',
          activity: 'Медицинское учереждение',
          present_payment: 10456,
          accept_payment: 10456,
          prepaid: 2500,
          total: 10456,
        },
        {
          key: 3,
          id: '123qwe333',
          code: '123456',
          activity: 'Медицинское учереждение',
          present_payment: 10456,
          accept_payment: 10456,
          prepaid: 2500,
          total: 10456,
        },
      ],
      ContractSelect: [],
      selectedRowKeys: [],
      modal: false,
      ContractSumms: [],
      Contractpayment: [],
      ShowClear: true,
      data:[]
    };
  }
  deleteContract = () => {
    /*this.setState({
      data: this.state.data.filter((item) => {
        /!*this.state.ContractTable.filter((select)=>{
          select.key==item.key
        })*!/
      })
    })*/
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const DicArr = [
      'periodYear',
      'periodSection',
      'divisions',
      'medicalType',
      'paymentRequestType',
    ];
    DicArr.forEach(function(item) {
      dispatch({
        type: 'universal/get' + item,
        payload: {
          'start': 0,
          'length': 1000,
          'entity': item,
        },
      });
    });
  }

  render() {
    const title = { fontSize: '12px' };
    const addonbuttons = [<Button
      onClick={() => {
        this.setState({
          ActModal: true
        })
      }}
      key={'select_button'}
      style={{ margin: '0px 0px 10px 5px' }}>Выбрать</Button>]

    if (this.state.actdata.length>0) {
      addonbuttons.push([ <Button
        onClick={() => {
          this.setState({
            actdata:[]
          })
        }}
        key={'delete_button'}
        style={{ margin: '0px 0px 10px 5px' }}>Очистить</Button>])
    }
    const rowSelection = {};
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
    };
    return (
      <PageHeaderWrapper title={formatMessage({ id: 'app.module.contractrequests.title.add' })}>
        {this.state.ActModal &&
        <ActModal
          onCancel={() => this.setState({ ActModal: false })}
          addAct={(rows)=>{
            console.log(rows);
            this.setState({
              actdata: rows,
              ActModal: false
            })
          }}
        />}
        <Card
          headStyle={{ padding: 0 }}
          style={{padding:'10px'}}
          className={styles.headPanel}
          extra={[<Button
            htmlType="submit"
            style={{float:'left'}}
            onClick={() => {

              this.props.form.validateFields(
                (err, values) => {
                  if (!err) {
                    //this.props.tomain();
                    /*console.log(JSON.stringify({
                      "entity": "paymentRequest",
                      "data":
                        {
                          ...values,
                          documentDate: values.documentDate.format("DD.MM.YYYY"),
                          "paymentRequestItems": [
                            {
                              "contractItem": {
                                "id": "ebbef7c1-25cf-4341-bbe2-cb0c6d391372"
                              },
                              "actItem": {
                                "id": "95e6bfc3-d1d7-4e06-83da-c36287fc4356"
                              },
                              "activity": {
                                "id": "32576777-c4a9-41c9-86c4-393bb29072ef"
                              },
                              "paymentRequestItemValues": [
                                {
                                  "valueSum": 0,
                                  "sumRequested": 0,
                                  "sumAdvanceTakeout": 0,
                                  "value": 1,
                                  "currencyType": {
                                    "id": "5cd4e565-10da-4b79-8578-ffdd5a0d8270"
                                  },
                                  "measureUnit": {
                                    "id": "be88fc85-e565-43cd-a14a-7cdd46828f4c"
                                  },
                                  "actItemValue": {
                                    "id": "700db686-c0f3-4f19-ac07-1a839b1767e3"
                                  }
                                }
                              ]
                            }
                          ]
                        }
                    }));*/
                    dispatch({
                      type: 'universal/saveobject',
                      payload: {
                        "entity": "paymentRequest",
                        "data":
                          {
                            ...values,
                            documentDate: values.documentDate.format("DD.MM.YYYY"),
                            "documentSigneds": [],
                            "documentAttacments": [],
                            "paymentRequestItems": [
                              {
                                "contractItem": {
                                  "id": "ebbef7c1-25cf-4341-bbe2-cb0c6d391372"
                                },
                                "actItem": {
                                  "id": "95e6bfc3-d1d7-4e06-83da-c36287fc4356"
                                },
                                "activity": {
                                  "id": "32576777-c4a9-41c9-86c4-393bb29072ef"
                                },
                                "paymentRequestItemValues": [
                                  {
                                    "valueSum": 0,
                                    "sumRequested": 0,
                                    "sumAdvanceTakeout": 0,
                                    "value": 1,
                                    "currencyType": {
                                      "id": "5cd4e565-10da-4b79-8578-ffdd5a0d8270"
                                    },
                                    "measureUnit": {
                                      "id": "be88fc85-e565-43cd-a14a-7cdd46828f4c"
                                    },
                                    "actItemValue": {
                                      "id": "700db686-c0f3-4f19-ac07-1a839b1767e3"
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                      },
                    }).then(()=>{
                      console.log(this.props.universal.saveanswer);
                      //this.props.tomain();
                      this.props.history.push({
                        pathname: '/contract/acts/table',
                        state: {
                          data:this.state.selectedRowKeys
                        },
                      });
                    });
                  }
                  else {

                  }
                },
              );
            }}
          >
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
            </div>]}
          bordered={false}
          bodyStyle={{ padding: 0 }}>
            <Spin
          spinning={this.props.loadingperiodYear && this.props.loadingperiodSection && this.props.loadingorganization && this.props.loadingmedicalType}>
          <Row style={{ marginTop: '5px' }}>
            <Form layout="horizontal" hideRequiredMark>
              <Tabs
                type={'card'}
                className={styles.stepFormText}
                defaultActiveKey="form"
                onChange={(e) => {
                  if (e === 'form') {
                    this.setState({
                      ShowClear: true,
                    });
                  }
                  else {
                    this.setState({
                      ShowClear: false,
                    });
                  }
                }}
                tabPosition={'left'}>
                <TabPane tab="Титульная часть" key="form">
                  <Card style={{ marginLeft: '-10px' }}>
                    <div style={{ margin: '10px 0', maxWidth: '70%' }}>
                      <Form.Item {...formItemLayout} label="Вид заявки">
                        {getFieldDecorator('paymentRequestType.id', {
                          initialValue: '',
                          rules: [{ required: false, message: 'не заполнено' }],
                        })(
                          <Select
                            allowClear
                            style={{ width: '50%' }}
                          >
                            {this.props.universal.paymentRequestType.content && this.props.universal.paymentRequestType.content.map((item) => {
                              return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                            })}
                          </Select>,
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Номер">
                        {getFieldDecorator('number', {
                          initialValue: '',
                          rules: [{ required: false, message: 'не заполнено' }],
                        })(<Input/>)}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Дата">

                        {getFieldDecorator('documentDate', {
                          initialValue: '',
                          rules: [{ required: false, message: 'не заполнено' }],
                        })(
                          <DatePicker
                            format={'DD.MM.YYYY'}
                            style={{ width: '50%' }}
                            placeholder="Выберите дату"/>,
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Отчетный период: год">
                        {getFieldDecorator('periodYear.id', {
                          initialValue: '',
                          rules: [{ required: false, message: 'не заполнено' }],
                        })(
                          <Select
                            allowClear
                            style={{ width: '50%' }}
                          >
                            {this.props.universal.periodYear.content && this.props.universal.periodYear.content.map((item) => {
                              return <Select.Option key={item.id}>{item.year}</Select.Option>;
                            })}
                          </Select>,
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Отчетный период: месяц">
                        {getFieldDecorator('periodSection.id', {
                          initialValue: '',
                          rules: [{ required: false, message: 'не заполнено' }],
                        })(
                          <Select
                            allowClear
                            style={{ width: '50%' }}
                          >
                            {this.props.universal.periodSection.content && this.props.universal.periodSection.content.map((item) => {
                              return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                            })}
                          </Select>,
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Подразделение">
                        {getFieldDecorator('divisions.id', {
                          initialValue: '',
                          rules: [{ required: false, message: 'не заполнено' }],
                        })(
                          <Select
                            allowClear
                          >
                            {this.props.universal.divisions.content && this.props.universal.divisions.content.map((item) => {
                              return <Select.Option key={item.id}>{item.name}</Select.Option>;
                            })}
                          </Select>,
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Примечание">
                        {getFieldDecorator('descr', {
                          initialValue: '',
                          rules: [{ required: false, message: 'не заполнено' }],
                        })(
                          <TextArea rows={4}/>,
                        )}
                      </Form.Item>
                    </div>
                  </Card>
                </TabPane>

                {this.props.location.state.type === "act" &&
                <TabPane tab="Акты"
                         key="acts"
                >
                  <Card style={{ marginLeft: '-10px' }}>
                    {/*<Button onClick={() => {
                              this.setState({
                                ActModal: true
                              })
                            }}
                            style={{ marginBottom: 16 }}>
                      Добавить
                    </Button>
                    <Button
                        onClick={() => {
                            this.setState({
                              actdata:[]
                            })
                          }}
                        style={{ marginBottom: 16, marginLeft: 5 }}>
                      Очистить
                    </Button>*/}

                    <SmartGridView
                      name={'actform'}
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
                      showTotal={true}
                      hidePagination={true}
                      columns={this.props.location.state.columns}
                      actionColumns={[]}
                      sorted={true}
                      onSort={(column) => {
                      }}
                      showTotal={true}
                      addonButtons={addonbuttons}
                      actionExport={() => {
                      }}
                      onSelectRow={(record, index) => {
                        //console.log(record)
                      }}
                      dataSource={{
                        total: this.props.location.state.data.length,
                        pageSize: this.props.location.state.data.length,
                        page: 1,
                        data: this.props.location.state.data,
                      }}
                      onShowSizeChange={(pageNumber, pageSize) => {
                      }}
                      onRefresh={() => {

                      }}
                      onSearch={() => {

                      }}
                    />
                  </Card>
                </TabPane>
                }
                {this.props.location.state.type === "contract" &&
                <TabPane tab="Договоры"
                         key="contracts"
                >
                  <Card style={{ marginLeft: '-10px' }}>
                    <SmartGridView
                      name={'contractform'}
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
                      showTotal={true}
                      hidePagination={true}
                      columns={this.props.location.state.columns}
                      actionColumns={[]}
                      sorted={true}
                      onSort={(column) => {
                      }}
                      showTotal={true}
                      addonButtons={[]}
                      actionExport={() => {
                      }}
                      onSelectRow={(record, index) => {
                        //console.log(record)
                      }}
                      dataSource={{
                        total: this.props.location.state.data.length,
                        pageSize: this.props.location.state.data.length,
                        page: 1,
                        data: this.props.location.state.data,
                      }}
                      onShowSizeChange={(pageNumber, pageSize) => {
                      }}
                      onRefresh={() => {

                      }}
                      onSearch={() => {

                      }}
                    />
                  </Card>
                </TabPane>
                }

                <TabPane tab="Спецификация"
                         key="specifications"
                >
                  <Card style={{ marginLeft: '-10px' }}>
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
                      showTotal={true}
                      hidePagination={true}
                      columns={this.state.speccolumns}
                      actionColumns={this.state.specfcolumn}
                      sorted={true}
                      onSort={(column) => {
                      }}
                      showTotal={true}
                      addonButtons={[]}
                      actionExport={() => {
                      }}
                      onSelectRow={(record, index) => {
                        //console.log(record)
                      }}
                      dataSource={{
                        total: this.state.specdata.length,
                        pageSize: this.state.specdata.length,
                        page: 1,
                        data: this.state.specdata,
                      }}
                      onShowSizeChange={(pageNumber, pageSize) => {
                      }}
                      onRefresh={() => {

                      }}
                      onSearch={() => {

                      }}
                    />
                  </Card>
                </TabPane>
                <TabPane tab="Проводки"
                         key="provods"
                >
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

export default ContractRequestsadd;
