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
  InputNumber, Tag,
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
import ActModals from '../Acts/ActModals';
import moment from 'moment';
import DogovorModal from '../CounterAgent/Modals/DogovorModal';
import ContractModal from '../Acts/ContractModal';
import TabPageStyle from '../CounterAgent/TabPages/TabPages.less';


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
          title: 'Учетный период(год)',
          dataIndex: 'periodYear.year',
          isVisible: true,
        },
        {
          title: 'Учетный период(месяц)',
          dataIndex: 'periodSection.name',
          isVisible: true,
        },
        {
          title: 'Подразделение',
          dataIndex: 'division',
          isVisible: true,
        },
        {
          title: 'Номер',
          dataIndex: 'number',
          isVisible: true,
        },
        {
          title: 'Дата',
          dataIndex: 'documentDate',
          isVisible: true,
        },
        {
          title: 'Сумма',
          dataIndex: 'documentSum',
          isVisible: true,
        },
      ],
      actfcolumns: [
        {
          title: 'Контрагент',
          dataIndex: 'contract.contragent',
          isVisible: true,
          width : 550,
          order: 3,
          key: 'contract.contragent',
          className: 'action_column',
          render: (item) => {
            if (item){
              return item.bin+"  "+item.organization;
            }
          },
        },
        {
          title: 'Договор',
          dataIndex: 'contract',
          order: 4,
          width: 500,
          key: 'contract',
          className: 'action_column',
          isVisible: true,
          render: (item) => {
            if (item){
              return item.contractType+" №"+item.number+" от "+item.documentDate;
            }
          },
        },
        {
          title: 'Протокол',
          dataIndex: 'protocol',
          order: 5,
          width: 200,
          key: 'operation',
          className: 'action_column',
          isVisible: true,
          render: (e) => {
            if (e)
            {
              return "№"+e.number+" от "+e.documentDate;
            }
          },
        }
      ],
      contractcolumns: [
        {
          title: 'Подразделение',
          dataIndex: 'division',
          isVisible: true,
        },
        {
          title: 'Учетный период: год',
          dataIndex: 'periodYear',
          isVisible: true,
        },
        {
          title: 'Контрагент',
          dataIndex: 'contragent.organization',
          isVisible: true,
          width: 360,
        },
        {
          title: 'Вид договора',
          dataIndex: 'contractType',
          isVisible: true,
        },
        {
          title: 'Номер',
          dataIndex: 'number',
          isVisible: true,
        },
        {
          title: 'Дата',
          dataIndex: 'documentDate',
          isVisible: true,
        },
        {
          title: 'Дата начала',
          dataIndex: 'dateBegin',
          isVisible: true,
        },
        {
          title: 'Дата окончания',
          dataIndex: 'dateEnd',
          isVisible: true,
        },
        {
          title: 'Сумма',
          dataIndex: 'documentSum',
          isVisible: true,
        },
        {
          title: 'Статус',
          dataIndex: 'documentStatus.statusName',
          isVisible: true,
        },
        {
          title: 'Файлы',
          dataIndex: 'documentAttachmentsCount',
          isVisible: true,
        },
      ],
      contractfcolumn: [
        {
          order: 12,
          title: 'Протокол распределения объемов',
          dataIndex: 'planProtocol',
          isVisible: true,
          render: (text, record) => {
            if (record && record.planProtocol) {
              return <span style={{
                color: '#1890ff',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}>№{record.planProtocol.number} от {record.planProtocol.documentDate}</span>;
            }
          },
        },
        {
          title: 'Родительский договор',
          order: 11,
          dataIndex: 'parentContract.number',
          isVisible: true,
          render: (text, record) => {
            if (record && record.parentContract) {
              return <span style={{
                color: '#1890ff',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}>{record.parentContract.contractType} №{record.parentContract.number} от {record.parentContract.documentDate}</span>;
            }
            //***
            ////<parentContract.contractType> №<parentContract.number> от <parentContract.documentDate>
          },
        },
        {
          title: 'Заявка на объемы',
          dataIndex: 'proposal',
          isVisible: true,
          order: 13,
          render: (text, record) => {
            if (record && record.proposal) {
              return <span style={{
                color: '#1890ff',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}>№{record.proposal.number} от {record.proposal.documentDate}</span>;
            }
          },
        },
      ],
      speccolumns: [
        {
          'title': 'Код',
          'dataIndex': 'activity.code',
          'isVisible': 'true',
        },
        {
          'title': 'Вид деятельности',
          'dataIndex': 'activity.name',
          'isVisible': 'true',
          'width': '400'
        },
        {
          title: 'Способ оплаты',
          dataIndex: 'activity.paymentType.shortname',
          isVisible: true,
        },
        {
          title: 'Количество предъявленное',
          dataIndex: 'valueRequested',
          isVisible: true,
        },
        {
          title: 'Количество принятое',
          dataIndex: 'value',
          isVisible: true,
        },
        {
          title: 'Тариф, т',
          dataIndex: '',
          isVisible: true,
        },
        {
          title: 'Сумма предъявленная, т',
          dataIndex: 'sumRequested',
          isVisible: true,
        },
        {
          title: 'Сумма принятая, т',
          dataIndex: 'valueSum',
          isVisible: true,
        },
        {
          title: 'Сумма вычета аванса, т',
          dataIndex: 'sumAdvanceTakeout',
          isVisible: true,
        },
      ],
      specfcolumn: [{
        title: 'Единица учета',
        dataIndex: 'measureUnit.nameRu',
        order: 3,
        isVisible: true,
        width: 300,
        render: (text, index) => {
          if (index.key === 'total') {
            return '';
          }
          return (<Tag color="blue">{text}</Tag>)
        }
      }],
      specdata: [],
      contractData: [],
      actData: [],
      selectedRowKeys: [],
      ShowClear: true,
      ContractModal: false,
      ActModal: false,
      activities: [],
      loadData: false
    };
  }
  componentDidMount() {
    this.setState({
      loadData: true
    })
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
    this.loadData();
  }
  loadData=()=>{
    const { dispatch } = this.props;
    if (this.props.location.state) {
      if (this.props.location.state.type==='act'){
        this.setState({
          actData: this.props.location.state.data
        },()=> {
          this.props.location.state.data.forEach((item) => {
            dispatch({
              type: 'universal/getobject',
              payload: {
                "entity": "act",
                "alias": null,
                "id": item.id
              }
            }).then(() => {
              this.setState({
                loadData: false,
                specdata: this.props.universal.getObjectData._actItemValues ? this.state.specdata.concat(this.props.universal.getObjectData._actItemValues) : []
              },()=>{
                if (this.state.specdata.length>0) {
                  this.setState({
                    specdata: this.state.specdata.concat([{
                      key: 'total',
                      activity: {
                        code: "Итого:"
                      },
                      sumAdvanceTakeout: this.calculateRow('sumAdvanceTakeout', this.state.specdata),
                      sumRequested: this.calculateRow('sumRequested', this.state.specdata),
                      value: this.calculateRow('value', this.state.specdata),
                      valueRequested: this.calculateRow('valueRequested', this.state.specdata),
                      valueSum: this.calculateRow('valueSum', this.state.specdata),
                    }])
                  })
                }
              })
            })
          });
        });
      }
      if (this.props.location.state.type==='contract'){
        this.setState({
          contractData: this.props.location.state.data
        },()=>{
        this.props.location.state.data.forEach((item)=> {
          dispatch({
            type: 'universal/getobject',
            payload: {
              "entity": "contract",
              "alias": null,
              "id": item.id
            }
          }).then(()=>{
              this.setState({
                loadData: false,
                specdata: this.props.universal.getObjectData._contractItemValue ? this.state.specdata.concat(this.props.universal.getObjectData._contractItemValue) : []
              },()=>{
                if (this.state.specdata.length>0) {
                  this.setState({
                    specdata: this.state.specdata.concat([{
                      key: 'total',
                      activity: {
                        code: "Итого:"
                      },
                      sumAdvanceTakeout: this.calculateRow('sumAdvanceTakeout', this.state.specdata),
                      sumRequested: this.calculateRow('sumRequested', this.state.specdata),
                      value: this.calculateRow('value', this.state.specdata),
                      valueRequested: this.calculateRow('valueRequested', this.state.specdata),
                      valueSum: this.calculateRow('valueSum', this.state.specdata),
                    }])
                  })
                }
              })
          })
        });
        })
      }
    }
    else {
      this.props.dispatch({
        type: 'universal/getobject',
        payload: {
          "entity": "paymentRequest",
          "id": this.props.location.query.id
        }
      }).then(()=>{
        this.setState({
          loadData: false,
          specdata: this.props.universal.getObjectData._paymentRequestItemValues ? this.state.specdata.concat(this.props.universal.getObjectData._paymentRequestItemValues) : []
        },()=>{
          if (this.state.specdata.length>0) {
            this.setState({
              specdata: this.state.specdata.concat([{
                key: 'total',
                activity: {
                  code: "Итого:"
                },
                sumAdvanceTakeout: this.calculateRow('sumAdvanceTakeout', this.state.specdata),
                sumRequested: this.calculateRow('sumRequested', this.state.specdata),
                value: this.calculateRow('value', this.state.specdata),
                valueRequested: this.calculateRow('valueRequested', this.state.specdata),
                valueSum: this.calculateRow('valueSum', this.state.specdata),
              }])
            })
          }
        })
      })
    }

  }
  calculateRow=(name, data)=>{
    let count=0;
    data.forEach((item)=> {
      if (!isNaN(item[name]))
      {
        count=count+item[name];
      }
    })
    return count;
  }

  changeSpec=()=>{
    const { dispatch } = this.props;
    this.setState({
      specdata:[]
    },()=>{
      if (this.props.location.state.type==='act'){
        this.state.actData.forEach((item) => {
          dispatch({
            type: 'universal/getobject',
            payload: {
              "entity": "act",
              "alias": null,
              "id": item.id
            }
          }).then(() => {
            this.setState({
              specdata: this.props.universal.getObjectData._actItemValues ? this.state.specdata.concat(this.props.universal.getObjectData._actItemValues) : []
            })
          })
        });
      }
      if (this.props.location.state.type==='contract'){

        this.state.contractData.forEach((item)=> {
          dispatch({
            type: 'universal/getobject',
            payload: {
              "entity": "contract",
              "alias": null,
              "id": item.id
            }
          }).then(()=>{
            this.setState({
              specdata: this.props.universal.getObjectData._contractItemValue ? this.state.specdata.concat(this.props.universal.getObjectData._contractItemValue) : []
            })
          })
        });
      }
    })
  }

  render() {

    let getObjectData = {}
      if (!this.props.location.state){
        getObjectData =  this.props.universal.getObjectData ? this.props.universal.getObjectData : {};
      }

    const { form, dispatch } = this.props;
    const { getFieldDecorator } = form;

    return (
      <PageHeaderWrapper title={formatMessage({ id: 'app.module.contractrequests.title.add' })}>
        {this.state.ActModal &&
        <ActModal
          onSelect={(records) => {
            console.log(records);
            this.setState({
              ActModal: false,
              actData: records
            },()=>{
              this.changeSpec();
            })
          }}
          hide={() => this.setState({
            ActModal: false
          })
          }/>}
        {this.state.ContractModal &&
        <ContractModal
          onSelect={(records) => {
            console.log(records);
            this.setState({
              ContractModal: false,
              contractData: records
            },()=>{
              this.changeSpec()
            })
          }}
          hide={() => this.setState({
            ContractModal: false
          })
          }/>}
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
                    let uniqueItemData = {};
                    this.state.specdata.forEach((item) => {
                      if (!uniqueItemData[item.activity.id]) {
                        uniqueItemData[item.activity.id] = {
                          activity: item.activity,
                          Values: [],
                        };
                      }
                      uniqueItemData[item.activity.id].Values.push(item);
                    });
                    let data = {
                      ...values,
                      documentDate: values.documentDate ? values.documentDate.format("DD.MM.YYYY") : "",
                      "documentSigneds": [],
                      "documentAttacments": [],
                      "paymentRequestItems": []
                    }

                    /*data.paymentRequestItems = [
                      {
                        "activity": {
                          "id": "32576777-c4a9-41c9-86c4-393bb29072ef"
                        },
                        "paymentRequestItemValues": [
                          {
                            "valueSum": 15,
                            "sumRequested": 0,
                            "sumAdvanceTakeout": 0,
                            "value": 1,
                            "currencyType": {
                              "id": "5cd4e565-10da-4b79-8578-ffdd5a0d8270"
                            },
                            "measureUnit": {
                              "id": "be88fc85-e565-43cd-a14a-7cdd46828f4c"
                            }
                          }
                        ]
                      }
                    ]*/
                     if (this.props.location.state.type==='contract') {
                       Object.keys(uniqueItemData).map((itemKey)=>(itemKey)).forEach((item)=>{
                         data.paymentRequestItems.push({
                           activity: {
                             id: item
                           },
                           paymentRequestItemValues: this.state.specdata.map(x => {
                             if (x.activity.id === item){
                               return {
                                 "valueSum": x.valueSum,
                                 "sumRequested": x.sumRequested,
                                 "sumAdvanceTakeout": x.sumAdvanceTakeout,
                                 "value": x.value,
                                 "measureUnit": {
                                   "id":  x.measureUnit.id
                                 }

                               }
                             }
                           }),
                         })
                       })
                      data.sourceContracts = this.state.contractData
                    }
                    if (this.props.location.state.type==='act') {
                      Object.keys(uniqueItemData).map((itemKey)=>(itemKey)).forEach((item)=>{
                        data.paymentRequestItems.push({
                          activity: {
                            id: item
                          },
                          paymentRequestItemValues: this.state.specdata.map(x => {
                            if (x.activity.id === item){
                              return {
                                "valueSum": x.valueSum,
                                "sumRequested": x.sumRequested,
                                "sumAdvanceTakeout": x.sumAdvanceTakeout,
                                "value": x.value,
                                "measureUnit": {
                                  "id":  x.measureUnit.id
                                }

                              }
                            }
                          }),
                        })
                      })
                      data.sourceActs = this.state.actData
                      data.periodSection = {id: this.state.actData[0].periodSection.id};
                    }


                      this.setState({
                        loadData:true
                      })
                    dispatch({
                      type: 'universal/saveobject',
                      payload:{
                        "entity": "paymentRequest",
                        "data": data
                      },
                    }).then(()=>{
                      this.setState({
                        loadData:false
                      })
                    });

                  }
                  else {

                  }
                },
              );
              //this.props.tomain();
              /*this.props.history.push({
                pathname: '/contract/acts/table',
                state: {
                  data:this.state.selectedRowKeys
                },
              });*/
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
          <Spin spinning={this.state.loadData}>
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
                  tabPosition={'left'}
                >
                  <TabPane tab="Титульная часть" key="form">
                    <Card style={{ marginLeft: '-10px' }}>
                      <div style={{ margin: '10px 0', maxWidth: '70%' }}>
                        <Form.Item {...formItemLayout} label="Учетный период: год">
                          {getFieldDecorator('periodYear.id', {
                            initialValue: getObjectData ? (getObjectData.periodYear ? getObjectData.periodYear.id : null) : null,
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
                        <Form.Item {...formItemLayout} label="Вид заявки">
                          {getFieldDecorator('paymentRequestType.id', {
                            initialValue: getObjectData ? (getObjectData.paymentRequestType ? getObjectData.paymentRequestType.id : null) : null,
                            rules: [{ required: false, message: 'не заполнено' }],
                          })(
                            <Select
                              allowClear
                            >
                              {this.props.universal.paymentRequestType.content && this.props.universal.paymentRequestType.content.map((item) => {
                                return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                              })}
                            </Select>,
                          )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Номер">
                          {getFieldDecorator('number', {
                            initialValue: getObjectData ? getObjectData.number  : null,
                            rules: [{ required: false, message: 'не заполнено' }],
                          })(<Input/>)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Дата">
                          {getFieldDecorator('documentDate', {
                            initialValue:  getObjectData ?(getObjectData.documentDate ? moment(getObjectData.documentDate, 'DD.MM.YYYY'): null) : null,
                            rules: [{ required: false, message: 'не заполнено' }],
                          })(
                            <DatePicker
                              format={'DD.MM.YYYY'}
                              style={{ width: '50%' }}
                              placeholder="Выберите дату"/>,
                          )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Комментарий">
                          {getFieldDecorator('descr', {
                            initialValue: getObjectData ? getObjectData.descr  : null,
                            rules: [{ required: false, message: 'не заполнено' }],
                          })(
                            <TextArea rows={4}/>,
                          )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Подразделение">
                          {getFieldDecorator('division.id', {
                            initialValue: getObjectData ? (getObjectData.division ? getObjectData.division.id : null ) : null,
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
                      </div>
                    </Card>
                  </TabPane>
                  {(this.props.location.state ? (this.props.location.state.type === 'act' ? true : false) : false) &&
                  <TabPane tab="Акты"
                           key="acts"
                  >
                    <Card style={{ marginLeft: '-10px' }}>

                        <SmartGridView
                          name={'paymentAct'}
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
                          columns={this.state.actcolumns}
                          actionColumns={this.state.actfcolumns}
                          sorted={true}
                          showTotal={true}
                          addonButtons={[<Button
                            onClick={() => {
                              this.setState({
                                ActModal: true
                              })
                            }}
                            key={'select_button'}
                            style={{ margin: '0px 0px 10px 5px' }}>Выбрать</Button>]}
                          dataSource={{
                            total: this.state.actData.length,
                            pageSize: this.state.actData.length,
                            page: 1,
                            data: this.state.actData,
                          }}
                        />

                    </Card>
                  </TabPane>
                  }
                  {(this.props.location.state ? (this.props.location.state.type === 'contract' ? true : false) : false) &&
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
                        columns={this.state.contractcolumns}
                        actionColumns={this.state.contractfcolumn}
                        showTotal={true}
                        addonButtons={[<Button
                          onClick={() => {
                            this.setState({
                              ContractModal: true
                            })
                          }}
                          key={'select_button'}
                          style={{ margin: '0px 0px 10px 5px' }}>Выбрать</Button>]}
                        dataSource={{
                          total: this.state.contractData.length,
                          pageSize: this.state.contractData.length,
                          page: 1,
                          data: this.state.contractData,
                        }}
                      />
                    </Card>
                  </TabPane>
                  }
                  <TabPane tab="Спецификация"
                           key="specifications"
                  >
                    <Card style={{ marginLeft: '-10px' }}>
                      <div className={TabPageStyle.SpesPage}>
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
                          dataSource={{
                            total: this.state.specdata.length,
                            pageSize: this.state.specdata.length,
                            page: 1,
                            data: this.state.specdata,
                          }}
                        />
                      </div>
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

export default ContractRequestsadd ;


/*console.log(Object.keys(uniqueItemData).map((itemKey)=>(uniqueItemData[itemKey]))[0].activity);

     console.log(Object.keys(uniqueItemData).map((itemKey)=>(uniqueItemData[itemKey].activity)));*/
/**/

/*Object.keys(uniqueItemData).map((itemKey)=>(itemKey)).forEach((item)=> {
  console.log(item);
})*/
//console.log(Array.from(new Set(this.state.specdata.map(item => item.activity))));
/*let payload = {
  "entity": "paymentRequest",
  "data":
    {
      ...values,
      documentDate: values.documentDate.format("DD.MM.YYYY"),
      "documentSigneds": [],
      "documentAttacments": [],
      "paymentRequestItems": []
    }
};



dispatch({
  type: 'universal/saveobject',
  payload: payload,
}).then(()=>{

});*/
