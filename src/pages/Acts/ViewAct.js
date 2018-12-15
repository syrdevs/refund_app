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
  Upload,
  Modal,
} from 'antd';
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
import moment from 'moment';


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
@connect(({ universal, act, loading }) => ({
  universal,
  act,
  loadingperiodYear: loading.effects['universal/getperiodYear'],
  loadingperiodSection: loading.effects['universal/getperiodSection'],
  loadingorganization: loading.effects['universal/getorganization'],
  loadingmedicalType: loading.effects['universal/getmedicalType'],
  loadingattachmentType: loading.effects['universal/getattachmentType'],
  loadingsave: loading.effects['universal/saveobject'],
}))
class ViewAct extends Component {
  constructor(props) {
    super(props);
    this.state = {

      columns: [
        {
          'title': 'Код',
          'dataIndex': 'activity.code',
          'isVisible': 'true',
        },
        {
          'title': 'Вид деятельности',
          'dataIndex': 'activity.name',
          'isVisible': 'true',
        },
        {
          title: 'Способ оплаты',
          dataIndex: 'activity.paymentType',
          isVisible: true,
        },
        {
          title: 'Единица учета',
          dataIndex: 'measureUnit.shortname',
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
      fcolumn: [],
      data: [
        {
          measureUnit: {shortName: "Test"},
          activity: {
            paymentType: "Test1",
            code: 'АПП.ПСМП',
            name: 'Первичная медико-санитарная медицинская помощь',
          },
          valueRequested: "testvalueRequested",
          value: "testvalue",
          sumRequested: "testsumRequested",
          valueSum: "testvalueSum",
          sumAdvanceTakeout: "testsumAdvanceTakeout",
        },
        {
          measureUnit: {shortName: "Test"},
          activity: {
            paymentType: "Test1",
            code: 'АПП.ПСМП',
            name: 'Первичная медико-санитарная медицинская помощь',
          },
          valueRequested: "testvalueRequested",
          value: "testvalue",
          sumRequested: "testsumRequested",
          valueSum: "testvalueSum",
          sumAdvanceTakeout: "testsumAdvanceTakeout",
        },
        {
          measureUnit: {shortName: "Test"},
          activity: {
            paymentType: "Test1",
            code: 'АПП.ПСМП',
            name: 'Первичная медико-санитарная медицинская помощь',
          },
          valueRequested: "testvalueRequested",
          value: "testvalue",
          sumRequested: "testsumRequested",
          valueSum: "testvalueSum",
          sumAdvanceTakeout: "testsumAdvanceTakeout",
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
      },
      filecolumns: [
        {
          'title': 'Файл',
          'dataIndex': 'name',
          'isVisible': 'true',
        },
        {
          'title': 'Тип',
          'dataIndex': 'attachmentType.nameRu',
          'isVisible': 'true',
        },
      ],
      filearr: [],
      selectedAttachment:null,
      fileDesc: null,
      actid:null
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
      'attachmentType'
    ]
    DicArr.forEach(function(item) {
      dispatch({
        type: 'universal/get'+item,
        payload: {
          "start":0,
          "length":1000,
          "entity":item
        },
      })
    })



    this.loadData();

  };
  getData=(e)=>{
    if (this.props.location.query.contractId ) {
      /*console.log(JSON.stringify({
        "contractId": this.props.location.query.contractId,
        "periodSectionId": e
      }));*/

      this.setState({
        periodSectionId: e
      },()=>{
        /*this.props.dispatch({
        type: 'universal/createActForContract',
        payload: {
          "contractId": this.props.location.query.contractId,
          "periodSectionId": e
        },
      }).then(()=>{
        this.setState({
          filearr: this.props.universal.getObjectData.documentAttachments ? this.props.universal.getObjectData.documentAttachments.map((item, index)=> ({"uid": index,"name": item.name,"status": 'done'})) : []
        })
      })*/
      })

    }
  }

  loadData=()=>{
    if (this.props.location.query.contractId ) {
      this.props.dispatch({
        type: 'universal/createActForContract',
        payload: {
          "contractId": this.props.location.query.contractId,
          "periodSectionId": this.state.periodSectionId
        },
      }).then(()=>{
        this.setState({
          filearr: this.props.universal.getObjectData.documentAttachments ? this.props.universal.getObjectData.documentAttachments.map((item, index)=> ({"uid": index,"name": item.name,"status": 'done'})) : []
        })
      })
    }
    else {
      {
        this.props.dispatch({
          type: 'universal/getobject',
          payload: {
            "entity": "act",
            "alias": null,
            "id": this.props.location.query.id
          },
        })
      }
    }
  }

  uploadFile = (data) => {
    console.log(data);
    const { dispatch } = this.props;

    if (data.file.status === 'done') {
     let authToken = localStorage.getItem('token');
      const formData = new FormData();
      formData.append("entity", "act")
      formData.append("path", "documentAttachments")
      formData.append("id", this.state.actid)
      if (this.state.selectedAttachment & this.state.fileDesc) {
        formData.append("filedata", JSON.stringify({
          "entity": "documentAttachment",
          "alias": null,
          "data": {
            "fileDescription": this.state.fileDesc,
            "attachmentType": { "id": this.state.selectedAttachment }
          }
        }))
      }
      formData.append("content", data.file.originFileObj)

      const options = {
        headers: {
            Authorization: 'Bearer ' + authToken,
        },
        method: 'POST',
        body: formData
      };

      fetch('/api/uicommand/uploadFile', options)
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(function(data) {
        this.loadData();
        });
    }
  };


  removeFile = (file) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'universal/deleteObject',
      payload: {
        "entity":"documentAttachment",
        "id":file.uid
        },
    }).then(() => this.loadData());
  };

  render() {





    let uploadProps = {
      defaultFileList: this.props.universal.getObjectData.documentAttachments ? this.props.universal.getObjectData.documentAttachments.map((file) => ({
          uid: file.id,
          name: file.name,
        })) : [],
      onRemove: (file) => {
        if (this.props.universal.files.length === 1 && this.props.dataSource.value !== null) {
          Modal.error({
            title: 'Внимание',
            content: 'Файл не может быть удален. Пожалуйста, удалите сначала дату',
          });
          return false;
        } else {
          this.removeFile(file);
        }
      },
      onChange: this.uploadFile,
  };

    const { form, dispatch, data } = this.props;
    const {getObjectData} =  this.props.universal;
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
              console.log(this.props)
              /*this.props.form.validateFields(
                (err, values) => {
                  if (!err) {
                    console.log(values);
                   /!* if (this.state.DogovorModal.record) {
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
                    });*!/
                  }
                  else {}
                },
              );*/
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
                        {this.props.location.state && <div>
                          {this.props.location.state &&
                          <Link
                            to={'/contract/contracts/acts/add/viewcontract?id='+this.props.location.state.data.id}
                          >Договор №{this.props.location.state.data.number}</Link>}

                        </div>}
                        <Form.Item {...formItemLayout} label="Подразделение">
                          {getFieldDecorator('divisions.id', {
                            initialValue: getObjectData.contract ? getObjectData.contract.division.id : null,
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
                        <Form.Item {...formItemLayout} label="Контрагент">
                          <p>{getObjectData.contract ? getObjectData.contract.contragent.organization : ""}</p>
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Учетный период: год">
                          {getFieldDecorator('periodYear.id', {
                            initialValue: getObjectData.periodYear ? getObjectData.periodYear.id : null,
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
                        <Form.Item {...formItemLayout} label="Учетный период: месяц">
                          {getFieldDecorator('periodSection.id', {
                            initialValue: getObjectData.periodSection ? getObjectData.periodSection.id : null,
                            rules: [{ required: false, message: 'не заполнено' }],
                          })(
                            <Select
                              allowClear
                              style={{width:'50%'}}
                              onChange={(e)=>{this.getData(e)}}
                            >
                              {this.props.universal.periodSection.content && this.props.universal.periodSection.content.map((item) => {
                                return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                              })}
                            </Select>
                          )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Договор">
                          <p>{getObjectData.contract ? getObjectData.contract.contractType+" №"+getObjectData.contract.number+" от "+getObjectData.contract.documentDate : ""}</p>
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Протокол исполнения договора">
                          {/*<p>Протокол 1</p>*/}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Номер">
                          {getFieldDecorator('number', {
                            initialValue: getObjectData.number,
                            rules: [{ required: false, message: 'не заполнено'}],
                          })(
                            <Input style={{width:'50%'}}/>
                          )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Дата">
                          {getFieldDecorator('documentDate', {
                            initialValue:getObjectData ? moment(getObjectData.documentDate, 'DD.MM.YYYY') : null,
                            rules: [{ required: false, message: 'не заполнено' }],
                          })(
                            <DatePicker
                              format={'DD.MM.YYYY'}
                              style={{width:'50%'}}
                              placeholder="Выберите дату"
                            />
                          )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Комментарий">
                          {getFieldDecorator('descr', {
                            initialValue: null,
                            rules: [{ required: false, message: 'не заполнено' }],
                          })(
                            <TextArea rows={4}/>,
                          )}
                        </Form.Item>
                        {/*{!this.props.location.state &&
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
                      </Form.Item>}*/}
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
                          total: getObjectData.actItemValues ? getObjectData.actItemValues.length: 0,
                          pageSize: getObjectData.actItemValues ? getObjectData.actItemValues.length : 15,
                          page: 1,
                          data: getObjectData.actItemValues ,
                        }}
                        onShowSizeChange={(pageNumber, pageSize) => {}}
                        onRefresh={() => {

                        }}
                        onSearch={() => {

                        }}
                      />
                    </Card>
                  </TabPane>
                  <TabPane
                    tab="Приложения"
                    key="attachment"
                  >
                    <Card style={{marginLeft: '-10px'}}>
                      <div style={{margin:'10px 0', maxWidth:'70%'}}>
                        <Form.Item {...formItemLayout} label="Документ">
                          {getFieldDecorator('attachmentType.Name', {
                            initialValue: null,
                            rules: [{ required: false, message: 'не заполнено'}],
                          })(
                            <Select
                              allowClear
                              onChange={(e)=>{
                                this.setState({
                                  selectedAttachment:e
                                })
                              }}
                            >
                              {this.props.universal.attachmentType.content && this.props.universal.attachmentType.content.map((item) => {
                                return <Select.Option key={item.id} value={item.id}>{item.nameRu}</Select.Option>;
                              })}
                            </Select>
                          )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Комментарий">
                          {getFieldDecorator('fileDescription', {
                            initialValue: null,
                            rules: [{ required: false, message: 'не заполнено'}],
                          })(
                            <TextArea rows={4} onChange={(e)=>{
                              this.setState({
                                fileDesc: e
                              })
                            }}/>,
                          )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Тип файла">
                          {getFieldDecorator('fileDescription', {
                            initialValue: null,
                            rules: [{ required: false, message: 'не заполнено'}],
                          })(
                            <Upload
                              {...uploadProps}
                              name="logo"
                            >
                              <Button>
                                <Icon type="upload" /> Загрузить
                              </Button>
                            </Upload>
                          )}
                        </Form.Item>
                      </div>
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

export default ViewAct;
