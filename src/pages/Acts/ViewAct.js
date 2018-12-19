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
  Modal, Tag,
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
import saveAs from 'file-saver';
import SignModal from '../../components/SignModal';
import Graphic from './Graphic';
import TabPageStyle from '../CounterAgent/TabPages/TabPages.less';
import DropDownAction from '@/components/DropDownAction/';
import reduxRouter from 'umi/router';


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
 // loadinggetattachmentType: loading.effects['universal/getattachmentType'] && loading.effects['universal/getmedicalType'] && loading.effects['universal/getorganization'] & loading.effects['universal/getperiodSection'] && loading.effects['universal/getperiodYear']),
  loadingdeleteObject: loading.effects['universal/deleteObject'],
  loadingcreateActForContract: loading.effects['universal/createActForContract'],
  loadinggetobject: loading.effects['universal/getobject'],
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
      fcolumn: [{
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
      actid:null,
      loadFile: false,
      loadData: false,
      loadDic: false,
      ShowSign: false,
      isContractAct: false,
      specdata: []

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
    DicArr.forEach(function(item, index) {
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

    if (e) {
      if (this.props.location.query.contractId) {
        /*console.log(JSON.stringify({
          "contractId": this.props.location.query.contractId,
          "periodSectionId": e
        }));*/

        this.setState({
          periodSectionId: e,
          loadData: true,
          isContractAct: true,
        }, () => {
          this.props.dispatch({
            type: 'universal/createActForContract',
            payload: {
              "contractId": this.props.location.query.contractId,
              "periodSectionId": e
            },
          }).then(() => {
            this.setState({
              filearr: this.props.universal.getObjectData.documentAttachments ? this.props.universal.getObjectData.documentAttachments.map((item, index) => ({
                "uid": index,
                "name": item.name,
                "status": 'done'
              })) : [],
              loadData: false,
              specdata: this.props.universal.getObjectData._actItemValues ? this.props.universal.getObjectData._actItemValues : []
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
        })

      }
    }
    else {
      this.props.universal.getObjectData=null
    }
  }
  loadData=()=>{
    this.setState({
      loadData: true
    },()=>{
      if (this.props.location.query.contractId ) {
        if (this.state.periodSectionId) {
          console.log("test")
          this.props.dispatch({
            type: 'universal/createActForContract',
            payload: {
              "contractId": this.props.location.query.contractId,
              "periodSectionId": this.state.periodSectionId
            },
          }).then(()=>{
            this.setState({
              filearr: this.props.universal.getObjectData.documentAttachments ? this.props.universal.getObjectData.documentAttachments.map((item, index)=> ({"uid": index,"name": item.name,"status": 'done'})) : [],
              loadData:false,
              specdata: this.props.universal.getObjectData._actItemValues ? this.props.universal.getObjectData._actItemValues : []
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
        else {
          this.setState({
            loadData: false
          })
        }
      }
      else {
        this.props.dispatch({
          type: 'universal/getobject',
          payload: {
            "entity": "act",
            "alias": null,
            "id": this.props.location.query.id
          },
        }).then(()=>{
          this.setState({
            isContractAct: true,
            actid: this.props.universal.getObjectData.id,
            filearr: this.props.universal.getObjectData.documentAttachments ? this.props.universal.getObjectData.documentAttachments.map((item, index)=> ({"uid": index,"name": item.name,"status": 'done'})) : [],
            loadData:false,
            specdata: this.props.universal.getObjectData._actItemValues ? this.props.universal.getObjectData._actItemValues : []
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
    })

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

  uploadFile = (data) => {
    this.props.form.validateFields(
      (err, values) => {
        if (data.file.status === 'done') {
          let authToken = localStorage.getItem('token');
          const formData = new FormData();
          formData.append("entity", "act")
          formData.append("path", "documentAttachments")
          formData.append("id", this.state.actid)
          formData.append("filedata", JSON.stringify({
            "entity": "documentAttachment",
            "alias": null,
            "data": {
              "fileDescription": values.fileDescription,
              "attachmentType": { "id": this.state.selectedAttachment ? this.state.selectedAttachment : "cb751382-b9a9-41eb-848c-c9d332f45427" }
            }
          }))
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
                //throw new Error("Bad response from server");
              }
              return response.json();
            })
            .then(()=>{
              this.loadData();
            });
        }


      })


  };
  removeFile = (file) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/deleteObject',
      payload: {
        "entity":"documentAttachment",
        "id":file.id
      },
    }).then(() =>{

      this.loadData()
    });
  };
  downloadFile = (file) => {
    let authToken = localStorage.getItem('token');

    fetch('/api/uicommand/downloadFile',
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + authToken,
        },
        method: 'post',
        body: JSON.stringify(
          {
            "entity":"documentAttachment",
            "id":file.id
          }
        )
      })
      .then(response => {
        if (response.ok) {
          return response.blob().then(blob => {
            let disposition = response.headers.get('content-disposition');
            return {
              fileName: this.getFileNameByContentDisposition(disposition),
              raw: blob,
            };
          });
        }
      })
      .then(data => {
        if (data) {
          saveAs(data.raw, data.fileName);
        }
      });
  }
  getFileNameByContentDisposition=(contentDisposition)=>{
      var filename = "";
      if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }
      return filename;
  };
  saveAct=()=>{
    this.props.form.validateFields(
      (err, values) => {
        if (!err) {
          let data = this.props.universal.getObjectData;
          data.actItems.forEach((item, index, array)=>{
            if (data.actItems[index].actItemValues) {
              data.actItems[index].actItemValues.forEach((it, i , arr)=>{
                data.actItems[index].actItemValues[i].valueSum= this.props.universal.getObjectData.actItems[index].actItemValues[i].valueSum ? this.props.universal.getObjectData.actItems[index].actItemValues[i].valueSum : 0
                data.actItems[index].actItemValues[i].sumRequested= this.props.universal.getObjectData.actItems[index].actItemValues[i].sumRequested ? this.props.universal.getObjectData.actItems[index].actItemValues[i].sumRequested : 0
                data.actItems[index].actItemValues[i].sumAdvanceTakeout= this.props.universal.getObjectData.actItems[index].actItemValues[i].sumAdvanceTakeout ? this.props.universal.getObjectData.actItems[index].actItemValues[i].sumAdvanceTakeout : 0
                data.actItems[index].actItemValues[i].value= this.props.universal.getObjectData.actItems[index].actItemValues[i].value ? this.props.universal.getObjectData.actItems[index].actItemValues[i].value : 0
                data.actItems[index].actItemValues[i].valueRequested= this.props.universal.getObjectData.actItems[index].actItemValues[i].valueRequested ? this.props.universal.getObjectData.actItems[index].actItemValues[i].valueRequested : 0
                data.actItems[index].actItemValues[i].protocolItem= this.props.universal.getObjectData.actItems[index].actItemValues[i].protocolItem ? this.props.universal.getObjectData.actItems[index].actItemValues[i].protocolItem : 0
                if (data.actItems[index].actItemValues[i].currencyType){
                  data.actItems[index].actItemValues[i].currencyType= this.props.universal.getObjectData.actItems[index].actItemValues[i].currencyType ? this.props.universal.getObjectData.actItems[index].actItemValues[i].currencyType : {}
                }
                if (data.actItems[index].actItemValues[i].measureUnit) {
                  data.actItems[index].actItemValues[i].measureUnit = this.props.universal.getObjectData.actItems[index].actItemValues[i].measureUnit ? this.props.universal.getObjectData.actItems[index].actItemValues[i].measureUnit : {}
                }
              })
            }
          })
            if (this.state.actid) {
              this.props.dispatch({
                type: 'universal/saveobject',
                payload: {
                  "entity": "act",
                  "alias": null,
                  "data":
                    {
                      ...data,
                      ...values,
                      documentDate: values.documentDate ? values.documentDate.format("DD.MM.YYYY"): null,
                      protocol: null,
                      "contract": {
                        "id": data.contract.id
                      },
                      "actItems": data.actItems,
                      "id": this.state.actid
                    },
                },
              }).then(()=>{
                console.log(this.props.universal.saveanswer);
                if (!this.props.universal.saveanswer.Message) {
                  Modal.info({
                    title: 'Информация',
                    content: 'Сведения сохранены',
                  });
                }
                this.loadData();
                //this.props.tomain();
              });
            }
            else {
      this.props.dispatch({
        type: 'universal/saveobject',
        payload: {
          "entity": "act",
          "alias": null,
          "data":
            {
              ...data,
              ...values,
              documentDate: values.documentDate ? values.documentDate.format("DD.MM.YYYY"): null,
              protocol: null,
              "contract": {
                "id": data.contract.id
              },
              "actItems": data.actItems
            },
        },
      })
        .then(()=>{
          console.log(this.props.universal)
        this.setState({
          actid:  this.props.universal.saveanswer ? this.props.universal.saveanswer.id : null
        },()=>{
          if (!this.props.universal.saveanswer.Message) {
            Modal.info({
              title: 'Информация',
              content: 'Сведения сохранены',
            });
          }
          this.loadData();
        })
        //console.log(this.props.universal.saveanswer);
        //this.props.tomain();
      });
    }
        }
      },
    );
  }




  render() {

    const columns = [
      {
      title: 'Документ',
      dataIndex: 'attachmentType.nameRu',
        width: '30%',
    }, {
      title: 'Коментарий',
      dataIndex: 'fileDescription',
      width: '50%',
    },{
        title: 'Файл',
        width: '10%',
        render: ((item) => {return <a onClick={()=>{this.downloadFile(item)}}>{item.name}</a>;}),
    },{
        title: 'Действие',
        width: '10%',
        render: ((item) => {return <a onClick={()=>{this.removeFile(item)}}>Удалить</a>;}),
      }
    ];
    const data = this.props.universal.getObjectData ? (this.props.universal.getObjectData.documentAttachments ? this.props.universal.getObjectData.documentAttachments : []) : []
    let uploadProps = {
      defaultFileList: this.props.universal.getObjectData ? (this.props.universal.getObjectData.documentAttachments ? this.props.universal.getObjectData.documentAttachments.map((file) => ({
          uid: file.id,
          name: file.name,
        })) : []) : [],
      onPreview: (file) => {
        this.downloadFile(file);
      },
      onRemove: (file) => {
          this.removeFile(file);
      },
      onChange: this.uploadFile,
  };
    let title = "Акт выполненных работ"

    const { form } = this.props;
    //const {getObjectData} =  this.props.universal;
    let getObjectData = {}
    if (this.state.isContractAct){
      getObjectData =  this.props.universal.getObjectData ? this.props.universal.getObjectData : {};
      if (!this.props.location.query.contractId){
        title = "Акт выполненных работ №" + getObjectData.number + " от "+getObjectData.documentDate
      }
    }


    const { getFieldDecorator } = form;

    return (
      <PageHeaderWrapper title={title}>
        {this.state.DogovorModal.visible && <DogovorModal
          onSelect={(record) => {
            this.setState({ DogovorModal: { visible: false, record: record } });
            console.log(this.state.DogovorModal.record)
          }}
          hide={() => this.setState({ DogovorModal: { visible: false } })
          }/>}

        {this.state.ShowSign &&
         <SignModal
           getKey={(e)=> {
             this.setState({
               ShowSign: false
             },()=>{

               console.log(e);
             })
           }}
         />}



        <Spin spinning={this.state.loadData && this.props.universal.loadingsave && this.state.loadFile}>
        <Card
          headStyle={{ padding: 0 }}
          style={{padding:'10px'}}
          className={styles.headPanel}
          extra={[<Button
            htmlType="submit"
            style={{float:'left'}}
            onClick={(e)=>{
              this.saveAct();
            }
            }>
            Сохранить
          </Button>,
            <div style={{float:'left'}}>
              <Button
                style={{margin: '0px 0px 10px 10px'}} onClick={() => {
                if (this.props.location.query.contractId ){
                  reduxRouter.push('/contract/contracts/table');
                }
                else {
                  reduxRouter.push('/contract/acts/table');
                }
              }}>
                Закрыть
              </Button>
              {this.state.ShowClear &&
              <Button
                style={{margin: '0px 0px 10px 10px'}} onClick={() => {
                this.props.form.resetFields();
              }}>
                Очистить
              </Button>}
            </div>,
            <DropDownAction
              disabled={!this.props.location.query.id}
              contractId={this.props.location.query.id}
              entity={'act'}
              type={2}/>
          ]}
          bordered={false}
          bodyStyle={{ padding: 0 }}>
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
                          {/*{getFieldDecorator('division.id', {
                            initialValue: getObjectData ? (getObjectData.contract ? getObjectData.contract.division ? getObjectData.contract.division.id : null : null) : null,
                            rules: [{ required: false, message: 'не заполнено' }],
                          })(
                            <Select
                              allowClear
                              disabled
                            >
                              {this.props.universal.divisions.content && this.props.universal.divisions.content.map((item) => {
                                return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>;
                              })}
                               </Select>
                          )}
                              */}
                              <p>{getObjectData ? (getObjectData.contract ? getObjectData.contract.division ? getObjectData.contract.division.name : null : null) : null}</p>
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Контрагент">
                          <p>{getObjectData ? (getObjectData.contract ? (getObjectData.contract.contragent ? getObjectData.contract.contragent.organization : null) : "") : ""}</p>
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Учетный период: год">
                          {getFieldDecorator('periodYear.id', {
                            initialValue: getObjectData ? (getObjectData.periodYear ? getObjectData.periodYear.id : null) : null,
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
                            initialValue: getObjectData ? (getObjectData.periodSection ? getObjectData.periodSection.id : null) : null,
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
                          <p>{getObjectData ? (getObjectData.contract ? getObjectData.contract.contractType+" №"+getObjectData.contract.number+" от "+getObjectData.contract.documentDate : ""): ""}</p>
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Протокол исполнения договора">
                          {/*<p>Протокол 1</p>*/}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Номер">
                          {getFieldDecorator('number', {
                            initialValue: getObjectData ? getObjectData.number : null,
                            rules: [{ required: false, message: 'не заполнено'}],
                          })(
                            <Input style={{width:'50%'}}/>
                          )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Дата">
                          {getFieldDecorator('documentDate', {
                            initialValue:getObjectData ? (getObjectData.documentDate ? moment(getObjectData.documentDate, 'DD.MM.YYYY') : null ) : null,
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
                            total: this.state.specdata.length,
                            pageSize: this.state.specdata.length,
                            page: 1,
                            data: this.state.specdata ,
                          }}
                          onShowSizeChange={(pageNumber, pageSize) => {}}
                          onRefresh={() => {

                          }}
                          onSearch={() => {

                          }}
                        />
                      </div>
                    </Card>
                  </TabPane>
                  {this.state.actid &&
                  <TabPane
                    tab="Приложения"
                    key="attachment"
                  >
                    <Card style={{marginLeft: '-10px'}}>
                      <Row>
                        <div style={{margin:'10px 0', maxWidth:'70%'}}>
                          <Form.Item {...formItemLayout} label="Документ">
                            {getFieldDecorator('fileDoc', {
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
                          <Form.Item {...formItemLayout} label="Файл">
                            {getFieldDecorator('file', {
                              initialValue: null,
                              rules: [{ required: false, message: 'не заполнено'}],
                            })(
                              <Upload
                                {...uploadProps}
                                showUploadList={false}
                                name="logo"
                              >
                                <Button>
                                  <Icon type="upload" /> Загрузить
                                </Button>
                              </Upload>
                            )}
                          </Form.Item>
                        </div>
                      </Row>
                      <Row>
                        <Table
                          columns={columns}
                          dataSource={data}
                          pagination={{ position: 'none' }}
                          showHeader={false}
                        />
                      </Row>

                    </Card>
                  </TabPane>}
                </Tabs>
              </Form>
            </Row>
        </Card>
        </Spin>
      </PageHeaderWrapper>

    );
  }
}

export default ViewAct;
