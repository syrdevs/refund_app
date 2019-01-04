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
import saveAs from 'file-saver';
import SignModal from '../../components/SignModal';
import Graphic from './Graphic';


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
class ShowAct extends Component {
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
      actid:null,
      loadFile: false,
      loadData: false,
      loadDic: false,
      ShowSign: false

    }
  }

  componentDidMount() {
    console.log("test")
    const { dispatch } = this.props;


    this.loadData();

  };
  loadData=()=>{
    this.setState({
      loadData: true
    },()=>{
      /*if (this.props.location.query.contractId ) {
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
              loadData:false
            })
          })
        }
        else {
          this.setState({
            loadData: false
          })
        }
      }*/

        this.props.dispatch({
          type: 'universal/getobject',
          payload: {
            "entity": "act",
            "alias": null,
            "id": this.props.actid //'this.props.location.query.id'
          },
        }).then(()=>{
          this.setState({
            actid: this.props.universal.getObjectData.id,
            filearr: this.props.universal.getObjectData.documentAttachments ? this.props.universal.getObjectData.documentAttachments.map((item, index)=> ({"uid": index,"name": item.name,"status": 'done'})) : [],
            loadData:false
          })
        })

    })

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
      },
    ];
    const data = this.props.universal.getObjectData ? (this.props.universal.getObjectData.documentAttachments ? this.props.universal.getObjectData.documentAttachments : []) : []
    const {getObjectData} =  this.props.universal;
    console.log(getObjectData);
    const tablecolumns = [{
      title: 'Наименование',
      dataIndex: 'name',
      render: (text) => <div style={{color: 'black'}}>{text}</div>,
      width: 100,

    }, {
      title: 'Значения',
      dataIndex: 'value',
      key: 'value',
      width: 150,
    }
    ];
    const  tabledata = [{
      key:1,
      name: 'Подразделение',
      value: getObjectData ? (getObjectData.contract ? getObjectData.contract.division ? getObjectData.contract.division.name : null : null) : null,
    }, {
      key:2,
      name: 'Контрагент',
      value: getObjectData ? (getObjectData.contract ? getObjectData.contract.contragent.organization : "") : "",
    },  {
      key:3,
      name: 'Учетный период: год',
      value: getObjectData ? (getObjectData.periodYear ? getObjectData.periodYear.year : null) : null,
    }, {
      key:4,
      name: ' Учетный период: месяц',
      value: getObjectData ? (getObjectData.periodSection ? getObjectData.periodSection.nameRu : null) : null,
    }, {
      key:5,
      name: 'Договор',
      value: getObjectData ? (getObjectData.contract ? getObjectData.contract.contractType+" №"+getObjectData.contract.number+" от "+getObjectData.contract.documentDate : ""): "",
    }, {
      key:6,
      name: 'Протокол исполнения договора',
      value: "",
    }, {
      key:7,
      name: 'Номер',
      value: getObjectData ? getObjectData.number : null ,
    }, {
      key:8,
      name: 'Дата',
      value: getObjectData ? getObjectData.documentDate : null ,
    }, {
      key:8,
      name: 'Комментарий',
      value: getObjectData ? getObjectData.descr : null ,
    }
    ];

    return (<Spin spinning={this.state.loadData && this.props.universal.loadingsave && this.state.loadFile}>
          <Card
            headStyle={{ padding: 0 }}
            style={{padding:'10px'}}
            className={styles.headPanel}
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
                        <Table
                          columns={tablecolumns}
                          dataSource={tabledata}
                          pagination={{ pageSize: 50, position: 'none' }}
                          showHeader={false}
                          size={'default'}
                        />
                      </div>
                    </Card>












                  </TabPane>
                  <TabPane
                    tab="Спецификация"
                    key="specifications"
                  >
                    <Card style={{marginLeft: '-10px'}}>
                      <SmartGridView
                        name={'specactform'}
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
                          total: getObjectData ? (getObjectData._actItemValues ? getObjectData._actItemValues.length: 0) :0,
                          pageSize: getObjectData ? (getObjectData._actItemValues ? getObjectData._actItemValues.length : 15) :15,
                          page: 1,
                          data: getObjectData ? getObjectData._actItemValues  :[] ,
                        }}
                        onShowSizeChange={(pageNumber, pageSize) => {}}
                        onRefresh={() => {

                        }}
                        onSearch={() => {

                        }}
                      />
                    </Card>
                  </TabPane>
                  {this.state.actid &&
                  <TabPane
                    tab="Приложения"
                    key="attachment"
                  >
                    <Card style={{marginLeft: '-10px'}}>
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
        </Spin>);
  }
}

export default ShowAct;
/*
<PageHeaderWrapper title={formatMessage({ id: 'app.module.acts.title.add' })}>
</PageHeaderWrapper>*/
