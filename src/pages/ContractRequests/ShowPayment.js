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
  InputNumber, Tag, Modal,
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
@connect(({ universal, loading }) => ({
  universal,
  loadingperiodYear: loading.effects['universal/getperiodYear'],
  loadingperiodSection: loading.effects['universal/getperiodSection'],
  loadingorganization: loading.effects['universal/getorganization'],
  loadingmedicalType: loading.effects['universal/getmedicalType'],
  loadingpaymentRequestType: loading.effects['universal/getpaymentRequestType'],
}))
class ShowPayment extends Component {
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
      this.props.dispatch({
        type: 'universal/getobject',
        payload: {
          "entity": "paymentRequest",
          "id": this.props.id
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


  render() {
    let title = "Заявка"
    let periodYear = null;
    let getObjectData = {}
      getObjectData =  this.props.universal.getObjectData ? this.props.universal.getObjectData : {};
      title = "Заявка №" + getObjectData.number + " от "+getObjectData.documentDate;
      periodYear = getObjectData.periodYear ? getObjectData.periodYear.id :null;

    const { form, dispatch } = this.props;
    const { getFieldDecorator } = form;

    return (
      <PageHeaderWrapper title={title}>
        <Card
          headStyle={{ padding: 0 }}
          style={{padding:'10px'}}
          className={styles.headPanel}
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
                            <p>{getObjectData ? (getObjectData.periodYear ? getObjectData.periodYear.id: null) : null}</p>
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Вид заявки">
                            <p>{getObjectData ? (getObjectData.paymentRequestType ? getObjectData.paymentRequestType.id : null) : null}</p>
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Номер">
                          <p>{getObjectData ? getObjectData.number  : null}</p>
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Дата">
                            <p>{ getObjectData ? getObjectData.documentDate : null}</p>,
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Комментарий">
                            <p>{getObjectData ? getObjectData.descr  : null}</p>,
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Подразделение">
                            <p>{getObjectData ? (getObjectData.division ? getObjectData.division.id : null ) : null}</p>
                        </Form.Item>
                      </div>
                    </Card>
                  </TabPane>
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

export default ShowPayment ;



