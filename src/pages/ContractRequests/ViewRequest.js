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

const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import SmartGridView from '@/components/SmartGridView';
import { Tab } from '../../components/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'dva/index';


const TabPane = Tabs.TabPane;

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
      formcolumn:[{
        title: 'Наименование',
        dataIndex: 'name',
        render: (text) => <div style={{ color: 'black' }}>{text}</div>,
        width: 100,

      }, {
        title: 'Значения',
        dataIndex: 'value',
        key: 'value',
        width: 150,
      }],
      formdata:[
        {
          name: 'Вид заявки',
          value: "123456",
          key: 1,
        },
        {
          name: 'Номер',
          value: "01.01.2019",
          key: 2,
        },
        {
          name: 'Дата',
          value: "2019",
          key: 3,
        },
        {
          name: 'Отчетный период: год',
          value: "2019",
          key: 4,
        },
        {
          name: 'Отчетный период: месяц',
          value: "Январь",
          key: 5,
        },
        {
          name: 'Подразделение',
          value: "ТОО ТМИ",
          key: 6,
        },
        {
          name: 'Примечание',
          value: "Lorem ipsum dolor.",
          key: 7,
        }
      ]
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
    /*const DicArr = [
      'periodYear',
      'periodSection',
      'organization',
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
    });*/
  }

  showModal = () => {
    this.setState({
      modal: true,
    });
  };
  CancelModal = () => {
    this.setState({
      modal: false,
    });
  };


  render() {
    const title = { fontSize: '12px' };
    const rowSelection = {};
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    return (<Card
      headStyle={{ padding: 0 }}
      style={{padding:'10px'}}
      className={styles.headPanel}
      bordered={false}
      bodyStyle={{ padding: 0 }}><Spin
      spinning={this.props.loadingperiodYear && this.props.loadingperiodSection && this.props.loadingorganization && this.props.loadingmedicalType}>
      <Row style={{ marginTop: '5px' }}>
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
                  <Table
                    columns={this.state.formcolumn}
                    dataSource={this.state.formdata}
                    pagination={{ position: 'none' }}
                    showHeader={false}
                  />
              </Card>
            </TabPane>
            <TabPane tab="Акты"
                     key="acts"
            >
              <Card style={{ marginLeft: '-10px' }}>
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
                  columns={this.state.actcolumns}
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
                    total: this.state.actdata.length,
                    pageSize: this.state.actdata.length,
                    page: 1,
                    data: this.state.actdata,
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
                    total: this.state.contractdata.length,
                    pageSize: this.state.contractdata.length,
                    page: 1,
                    data: this.state.contractdata,
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
      </Row>
    </Spin></Card>);
  }
}

export default ContractRequestsadd;
