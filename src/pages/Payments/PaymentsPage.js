import React, { Component } from 'react';
import {
  Card,
  Tabs,
  Table,
  Icon,
  Menu,
  Dropdown,
  Button,
  Label,
  Pagination,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Checkbox,
  Spin,
  Divider,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GridFilter from '@/components/GridFilter';
import { faTimes } from '@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SmartGridView from '@/components/SmartGridView';

import paymentsData from './paymentsData';
import moment from 'moment/moment';
import classNames from 'classnames';
import { connect } from 'dva/index';
import { Animated } from 'react-animated-css';
import Searcher from '../SearchPhysical/Searcher';
import SearcherJur from '../SearchPhysical/SearcherJur';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const dateFormat = 'YYYY/MM/DD';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const EditableContext = React.createContext();

@connect(({ universal, loading }) => {
  return {
    universal,
    loadingData: loading.effects['universal/paymentsData'],
  };
})
export default class PaymentsPage extends Component {
  constructor(props) {
    super(props);

    this.selectedRecord = {};

    this.state = {

      selectedRowKeys: [],
      searching: false,
      activeKey: 'searcher',
      testcolumns: [],
      testdata: [],
      dataSource: [],
      count: 0,
      filterContainer: 0,
      sortedInfo: {},

      parameters: {
        start: 0,
        length: 15,
        entity: 'mt100',
        filter: {},
        sort: [],
      },
      //"knpList":["c7889895-0075-4bc2-89e8-939507dd4fc6"]
      filterForm: [],
      filterFormmt102: [],
      staticolumn: [
        {
          'title': 'Референс',
          'dataIndex': 'reference',
          'isVisible': 'true',
        }, {
          'title': 'Дата платежа',
          'dataIndex': 'paymentDate',
          'isVisible': 'true',
        }, {
          'title': 'Сумма',
          'dataIndex': 'totalAmount',
          'isVisible': 'true',
        }, {
          'title': 'КНП',
          'dataIndex': 'knp',
          'isVisible': 'true',
        }, {
          'title': 'Отправитель (Наименование)',
          'dataIndex': 'senderCompanyName',
          'isVisible': 'true',
        }, {
          'title': 'Отправитель (БИН)',
          'dataIndex': 'senderBin',
        }, {
          'title': 'Отправитель (БИК)',
          'dataIndex': 'senderBankBik',
        }
        , {
          'title': 'Получатель (Наименование)',
          'dataIndex': 'recipientName',
        }
        , {
          'title': 'Получатель (БИН)',
          'dataIndex': 'recipientBin',
        }, {
          'title': 'Получатель (БИК)',
          'dataIndex': 'recipientBankBik',
        }, {
          'title': 'Получатель (Счет)',
          'dataIndex': 'recipientAccount',
        }, {
          'title': 'Дата поступления информации',
          'dataIndex': 'createdOn',
        }],
      staticmt102columns: [
        {
          'title': 'Референс',
          'dataIndex': 'reference',
          'isVisible': 'true',
        }, {
          'title': 'Дата платежа',
          'dataIndex': 'paymentdate',
          'isVisible': 'true',
        }, {
          'title': 'КНП',
          'dataIndex': 'knp',
          'isVisible': 'true',
        }, {
          'title': 'Сумма',
          'dataIndex': 'paymentsum',
          'isVisible': 'true',
        }, {
          'title': 'Фамилия',
          'dataIndex': 'lastname',
          'isVisible': 'true',
        }, {
          'title': 'Имя',
          'dataIndex': 'firstname',
          'isVisible': 'true',
        }, {
          'title': 'Отчество',
          'dataIndex': 'secondname',
          'isVisible': 'true',
        },  {
          'title': 'Регион',
          'dataIndex': 'region',
          'isVisible': 'true',
        }, {
          'title': 'Дата рождения',
          'dataIndex': 'birthdate',
          'isVisible': 'true',
        }, {
          'title': 'ИИН',
          'dataIndex': 'iin',
          'isVisible': 'true',
        }, {
          'title': 'Период',
          'dataIndex': 'paymentperiod',
          'isVisible': 'true',
        }],

      staticdata: [
        {
          'id': '8F14E584-A899-484C-B054-010FB4DACA2B',
          'reference': 'GCVP-00038594868',
          'paymentDate': '17.05.2018',
          'totalAmount': 4545.00,
          'knp': '123',
          'senderCompanyName': 'НАО Государственная корпорация "Правительство для граждан"',
          'senderBin': '160440007161',
          'senderBankBik': 'GCVPKZ2A   ',
          'recipientBankBik': 'NBRKKZKX   ',
          'recipientAccount': 'KZ33125KZT1001313313',
          'recipientName': 'АО "Фонд социального медицинского страхования"',
          'recipientBin': '160940025485',
          'createdOn': '17.05.2018 16:11',
          'modifiedOn': '17.05.2018 16:12',
          'countOfDocuments': 'Пеня за несвоевременное перечисление отчислений на обязательное социальное медицинское страхование. Кол-во потребителей =5130 Кол-во документов =458',
        },
        {
          'id': '5E464004-2B10-4768-BFB0-009DF17F8532',
          'reference': 'GCVP-00038261913',
          'paymentDate': '03.04.2018',
          'totalAmount': 4.00,
          'knp': '122',
          'senderCompanyName': 'НАО Государственная корпорация "Правительство для граждан"',
          'senderBin': '160440007161',
          'senderBankBik': 'GCVPKZ2A   ',
          'recipientBankBik': 'NBRKKZKX   ',
          'recipientAccount': 'KZ33125KZT1001313313',
          'recipientName': 'АО "Фонд социального медицинского страхования"',
          'recipientBin': '160940025485',
          'createdOn': '03.04.2018 18:14',
          'modifiedOn': '03.04.2018 18:15',
          'countOfDocuments': 'Взносы на обязательное социальное медицинское страхование. Кол-во потребителей =8 Кол-во документов =8',
        },
        {
          'id': '154E051C-FAFB-4FC5-AEF0-00ABE9E5FAAE',
          'reference': 'GCVP-00037925493',
          'paymentDate': '14.02.2018',
          'totalAmount': 3.00,
          'knp': '121',
          'senderCompanyName': 'НАО Государственная корпорация "Правительство для граждан"',
          'senderBin': '160440007161',
          'senderBankBik': 'GCVPKZ2A   ',
          'recipientBankBik': 'NBRKKZKX   ',
          'recipientAccount': 'KZ33125KZT1001313313',
          'recipientName': 'АО "Фонд социального медицинского страхования"',
          'recipientBin': '160940025485',
          'createdOn': '14.02.2018 13:13',
          'modifiedOn': '14.02.2018 13:14',
          'countOfDocuments': 'Отчисления на обязательное социальное медицинское страхование. Кол-во потребителей =2258 Кол-во документов =117',
        },
        {
          'id': 'AF2D217E-5300-4947-810B-006D857DDCB1',
          'reference': 'GCVP-00037699948',
          'paymentDate': '12.01.2018',
          'totalAmount': 5.00,
          'knp': '122',
          'senderCompanyName': 'НАО Государственная корпорация "Правительство для граждан"',
          'senderBin': '160440007161',
          'senderBankBik': 'GCVPKZ2A   ',
          'recipientBankBik': 'NBRKKZKX   ',
          'recipientAccount': 'KZ33125KZT1001313313',
          'recipientName': 'АО "Фонд социального медицинского страхования"',
          'recipientBin': '160940025485',
          'createdOn': '12.01.2018 14:20',
          'modifiedOn': '12.01.2018 14:20',
          'countOfDocuments': 'Взносы на обязательное социальное медицинское страхование. Кол-во потребителей =91 Кол-во документов =27',
        },
        {
          'id': 'A8D7918F-30CF-45EE-8543-000E017B5AF5',
          'reference': 'GCVP-00037684462',
          'paymentDate': '10.01.2018',
          'totalAmount': 55.00,
          'knp': '122',
          'senderCompanyName': 'НАО Государственная корпорация "Правительство для граждан"',
          'senderBin': '160440007161',
          'senderBankBik': 'GCVPKZ2A   ',
          'recipientBankBik': 'NBRKKZKX   ',
          'recipientAccount': 'KZ33125KZT1001313313',
          'recipientName': 'АО "Фонд социального медицинского страхования"',
          'recipientBin': '160940025485',
          'createdOn': '10.01.2018 18:16',
          'modifiedOn': '10.01.2018 18:16',
          'countOfDocuments': 'Взносы на обязательное социальное медицинское страхование. Кол-во потребителей =863 Кол-во документов =186',
        },
        {
          'id': '4BCE3164-D6CD-4A9F-9116-0009A8D36067',
          'reference': 'GCVP-00037323064',
          'paymentDate': '30.11.2017',
          'totalAmount': 45456.00,
          'knp': '123',
          'senderCompanyName': 'НАО Государственная корпорация "Правительство для граждан"',
          'senderBin': '160440007161',
          'senderBankBik': 'GCVPKZ2A   ',
          'recipientBankBik': 'NBRKKZKX   ',
          'recipientAccount': 'KZ33125KZT1001313313',
          'recipientName': 'АО "Фонд социального медицинского страхования"',
          'recipientBin': '160940025485',
          'createdOn': '30.11.2017 11:28',
          'modifiedOn': '30.11.2017 11:28',
          'countOfDocuments': 'Пеня за несвоевременное перечисление отчислений на обязательное социальное медицинское страхование. Кол-во потребителей =4996 Кол-во документов =719',
        },
        {
          'id': '88A60117-4755-4D57-972A-00EDC9ACEDDF',
          'reference': 'GCVP-00037072032',
          'paymentDate': '26.10.2017',
          'totalAmount': 4545.00,
          'knp': '123',
          'senderCompanyName': 'НАО Государственная корпорация "Правительство для граждан"',
          'senderBin': '160440007161',
          'senderBankBik': 'GCVPKZ2A   ',
          'recipientBankBik': 'NBRKKZKX   ',
          'recipientAccount': 'KZ33125KZT1001313313',
          'recipientName': 'АО "Фонд социального медицинского страхования"',
          'recipientBin': '160940025485',
          'createdOn': '26.10.2017 13:47',
          'modifiedOn': '26.10.2017 13:47',
          'countOfDocuments': 'Пеня за несвоевременное перечисление отчислений на обязательное социальное медицинское страхование. Кол-во потребителей =2287 Кол-во документов =393',
        },
        {
          'id': '3C19E588-3F01-45C2-89DF-00AFF1B918DB',
          'reference': 'GCVP-00036665289',
          'paymentDate': '06.09.2017',
          'totalAmount': 45.00,
          'knp': '123',
          'senderCompanyName': 'НАО Государственная корпорация "Правительство для граждан"',
          'senderBin': '160440007161',
          'senderBankBik': 'GCVPKZ2A   ',
          'recipientBankBik': 'NBRKKZKX   ',
          'recipientAccount': 'KZ33125KZT1001313313',
          'recipientName': 'АО "Фонд социального медицинского страхования"',
          'recipientBin': '160940025485',
          'createdOn': '06.09.2017 11:51',
          'modifiedOn': '06.09.2017 11:52',
          'countOfDocuments': 'Пеня за несвоевременное перечисление отчислений на обязательное социальное медицинское страхование. Кол-во потребителей =4119 Кол-во документов =191',
        },
      ],
    };


  }

  componentWillUnmount() {
    const { dispatch } = this.props;
  }

  componentDidMount() {

    this.loadGridData();

    this.setState({

      filterForm: [
        {
          name: 'reference',
          label: formatMessage({ id: 'menu.mainview.reference' }),
          type: 'text',
        },
        {
          name: 'paymentDate',
          label: formatMessage({ id: 'menu.filter.payment.create_date' }),
          type: 'betweenDate',
        },
        /*{
          name: 'totalAmount',
          label: formatMessage({ id: 'menu.mainview.paymentsum' }),
          type: 'text',
        },*/
        {
          name: 'knp',
          label: formatMessage({ id: 'menu.filter.knp' }),
          type: 'multibox',
        },
        {
          name: 'senderCompanyName',
          label: 'Отправитель (Наименование)',
          type: 'text',
        },
        {
          name: 'senderBin',
          label: 'Отправитель (БИН)',
          type: 'text',
          withMax: 12,
        },
        {
          name: 'senderBankBik',
          label: 'Отправитель (БИК)',
          type: 'text',
          withMax: 8,
        },
        // {
        //   name: 'recipientName',
        //   label: 'Получатель (Наименование)',
        //   type: 'text',
        // },
        // {
        //   name: 'recipientBin',
        //   label: 'Получатель (БИН)',
        //   type: 'text',
        //   withMax: 12,
        // },
        // {
        //   name: 'recipientBankBik',
        //   label: 'Получатель (БИК)',
        //   type: 'text',
        //   withMax: 8,
        // },
        {
          name: 'recipientAccount',
          label: 'Получатель (Счет)',
          type: 'text',
        },
        {
          label: 'Дата создания',
          name: 'createdOn',
          type: 'betweenDate',
        },
      ],
      filterFormmt102: [
        {
          label: 'Референс',
          name: 'reference',
          type: 'text',
        }, {
          label: 'Дата платежа',
          name: 'paymentdate',
          type: 'betweenDate',
        }, {
          label: 'КНП',
          name: 'knp',
          type: 'multibox',
        },
        /*{
          label: 'Сумма',
          name: 'paymentsum',
          type: 'text',
        },*/
        {
          label: 'Фамилия',
          name: 'lastname',
          type: 'text',
        }, {
          label: 'Имя',
          name: 'firstname',
          type: 'text',
        }, {
          label: 'Отчество',
          name: 'secondname',
          type: 'text',
        },
        {
          label: 'Регион',
          name: 'region',
          type: 'text',
        },
        {
          label: 'Дата рождения',
          name: 'birthdate',
          type: 'betweenDate',
        }, {
          label: 'ИИН',
          name: 'iin',
          type: 'text',
          withMax: 12,
        }, {
          label: 'Период',
          name: 'paymentperiod',
          type: 'betweenDate',
        },
        /*{
          label: 'Дата платежа',
          name: 'createdon',
          type: 'betweenDate',
        },*/
      ],
    });

  }

  clearFilter = () => {
    this.setState({
      sortedInfo: {},
      parameters: {
        start: 0,
        length: 15,
        entity: this.state.parameters.entity,
        filter: {},
        sort: [],
      },
    }, () => {
      this.loadGridData();
    });
  };

  applyFilter = (filter) => {
    this.setState({
      sortedInfo: {},
      parameters: {
        ...this.state.parameters,
        filter: { ...filter },
        sort: [],
      },
    }, () => {
      this.loadGridData();
    });
  };

  onShowSizeChange = (current, pageSize) => {

    const { dispatch } = this.props;

    this.setState(prevState => ({
      parameters: {
        ...prevState.parameters,
        start: current,
        length: pageSize,
      },
    }), () => dispatch({
      type: 'universal/paymentsData',
      payload: {
        ...this.state.parameters,
        start: current,
        length: pageSize,
      },
    }));

  };

  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      filterContainer: filterContainer == 6 ? 0 : 6,
    }));
  };

  loadGridData = () => {
    const { dispatch } = this.props;
    let sortField = this.state.sortedInfo;
    dispatch({
      type: 'universal/paymentsData',
      payload: this.state.parameters,
    });
  };

  tabchange = (e, tabFilter = {}) => {
    this.setState({
      activeKey: e,
    });
    //test commit

    if (e !== 'searcher' && e !== 'searcherJur') {
      this.setState({
        sortedInfo: {},
        parameters: {
          start: 0,
          length: 15,
          entity: e,
          filter: Object.keys(tabFilter).length > 0 ? tabFilter : {},
          sort: [],
        },
      }, () => this.loadGridData());
    }

  };

  exportToExcel = () => {

    let authToken = localStorage.getItem('token');


    fetch('/api/refund/exportToExcel',
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + authToken,
        },
        method: 'post',
        body: JSON.stringify({
          'entityClass': this.state.parameters.entity,
          'src': {
            'searched': true,
            'data': this.state.parameters.filter,
          },
          'columns': this.state.parameters.entity == 'mt100' ? JSON.parse(localStorage.getItem('paymentspagemt100columns')).filter(item=>item.isVisible==="true") : JSON.parse(localStorage.getItem('paymentspagemt102columns')).filter(item=>item.isVisible==="true"),
        }),
      })
      .then(response => response.blob())
      .then(responseBlob => {

        var reader = new FileReader();
        reader.addEventListener('loadend', function() {
          var blob = new Blob([reader.result], { type: 'application/vnd.ms-excel' }); // pass a useful mime type here
          var url = URL.createObjectURL(blob);
          window.open(url, '_self');
        });
        reader.readAsArrayBuffer(responseBlob);

        /* let blob = new Blob([responseBlob], { type: responseBlob.type }),
           url = window.URL.createObjectURL(blob);
         window.open(url, '_self');*/
      });

  };

  render() {

    const { paymentsData } = this.props.universal;
    const dataStore = this.state.staticdata;
    const columns = this.state.staticolumn;

    let addonButtons = [];
    let extraButtons = [<span key={'total-count'} style={{
      color: '#002140',
      fontSize: '12px',
      paddingLeft: '10px',
    }}>{formatMessage({ id: 'system.totalAmount' })}: {paymentsData.totalSum ? paymentsData.totalSum.totalAmount ? paymentsData.totalSum.totalAmount : paymentsData.totalSum.paymentsum : 0} /</span>];

    if (this.state.parameters.entity === 'mt100') {
      addonButtons
        .unshift(<Button
          // disabled={Object.keys(this.selectedRecord).length === 0}
          key={'mt100paymentBtn'}
          onClick={() => {
            if (Object.keys(this.selectedRecord).length !== 0)
              this.tabchange('mt102', {
                'mt100Id': this.selectedRecord.id,
              });
          }}>
          Платежи МТ102</Button>);
    }

    const DataDiv = ({ mtcolumns, tablename }) => (
      <Spin tip="" spinning={this.props.loadingData}>
        <SmartGridView
          name={tablename}
          scroll={{ x: 'auto' }}
          fixedBody={true}
//
          showTotal={true}
          selectedRowCheckBox={true}
          searchButton={false}
          selectedRowKeys={this.state.selectedRowKeys}
          rowKey={'id'}
          loading={this.props.loadingData}
          fixedHeader={true}
          rowSelection={true}
          rowClassName={(record) => {
            console.log(record.id);
              if (record.id==='73709a55-19d2-4f59-9ac1-0001e4dc43be' || record.id==='ac0af469-1fa6-4e58-b47c-00101b3fa264') {
                return 'redRow';
              }
            }
          }
          columns={mtcolumns}
          sorted={true}
          sortedInfo={this.state.sortedInfo}
          showExportBtn={true}
          dataSource={{
            total: paymentsData.totalElements,
            pageSize: paymentsData.size,
            page: this.state.parameters.start + 1,
            data: paymentsData.content,
          }}
          onSort={(column) => {

            if (Object.keys(column).length === 0) {
              this.setState(prevState => ({
                parameters: {
                  ...prevState.parameters,
                  sort: [],
                },
                sortedInfo: {},
              }), () => {
                this.loadGridData();
              });
              return;
            }

            this.setState(prevState => ({
              sortedInfo: column,
              parameters: {
                ...prevState.parameters,
                sort: [{ field: column.field, 'desc': column.order === 'descend' }],
              },
            }), () => {
              this.loadGridData();
            });
          }}
          actionExport={() => this.exportToExcel()}
          extraButtons={extraButtons}
          addonButtons={addonButtons}
          onSelectRow={(record, index) => {
            this.selectedRecord = record;
          }}
          onShowSizeChange={(pageNumber, pageSize) => this.onShowSizeChange(pageNumber, pageSize)}
          onRefresh={() => {
            this.loadGridData();
          }}
          onSearch={() => {
            this.filterPanelState();
          }}
          onSelectCheckboxChange={(selectedRowKeys) => {
            this.setState({
              selectedRowKeys: selectedRowKeys,
            });
          }}
        />
      </Spin>
    );

    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.rpmu.payments' })}>
        <Card bodyStyle={{ padding: 5 }}>
          <Tabs
            activeKey={this.state.activeKey}
            onChange={this.tabchange}>
            <TabPane tab={formatMessage({ id: 'menu.payments.searchbtn' })} key="searcher">
              <Searcher
                searchbyiin={(iin) => {
                  this.setState({
                    sortedInfo: {},
                    parameters: {
                      ...this.state.parameters,
                      'entity': 'mt102',
                      'filter': { 'iin': iin },
                      'sort': [],
                    },
                  }, () => {
                    this.loadGridData();
                    this.setState({
                      activeKey: 'mt102',
                    });
                  });
                }}
                persontitle={'report.param.personinform'}
                item={'Physic'}
              />
            </TabPane>

            <TabPane tab={formatMessage({ id: 'menu.payments.searchbtnJur' })} key="searcherJur">
              <SearcherJur
                searchbyiin={(iin) => {
                  /*this.setState({
                    sortedInfo: {},
                    parameters: {
                      ...this.state.parameters,
                      'entity': 'mt102',
                      'filter': { 'iin': iin },
                      'sort': [],
                    },
                  }, () => {
                    this.loadGridData();
                    this.setState({
                      activeKey: 'mt102',
                    });
                  });*/
                }}
                persontitle={'report.param.personinformJur'}
                item={'Juridic'}
              />
            </TabPane>

            <TabPane tab={formatMessage({ id: 'menu.payments.payment100' })} key="mt100">
              <Row>
                <Col sm={24} md={this.state.filterContainer}>
                  <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                    <Card
                      headStyle={{
                        padding: '0 14px',
                      }}
                      style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
                      type="inner"
                      title={formatMessage({ id: 'system.filter' })}
                      extra={<Icon style={{ 'cursor': 'pointer' }} onClick={this.filterPanelState}><FontAwesomeIcon
                        icon={faTimes}/></Icon>}>
                      <GridFilter
                        clearFilter={this.clearFilter}
                        applyFilter={(filter) => this.applyFilter(filter)} key={'1'}
                        filterForm={this.state.filterForm}
                        dateFormat={dateFormat}/>
                    </Card>
                  </Animated>

                </Col>
                <Col sm={24} md={this.state.filterContainer != 6 ? 24 : 18}>
                  <DataDiv
                    mtcolumns={this.state.staticolumn}
                    tablename={'paymentspagemt100columns'}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tab={formatMessage({ id: 'menu.payments.payment102' })} key="mt102">
              <Row>
                <Col sm={24} md={this.state.filterContainer}>
                  <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                    <Card
                      style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
                      type="inner"
                      title={formatMessage({ id: 'system.filter' })}
                      extra={<Icon style={{ 'cursor': 'pointer' }} onClick={this.filterPanelState}><FontAwesomeIcon
                        icon={faTimes}/></Icon>}>
                      <GridFilter
                        clearFilter={this.clearFilter}
                        applyFilter={(filter) => this.applyFilter(filter)}
                        key={'2'}
                        filterForm={this.state.filterFormmt102}
                        dateFormat={dateFormat}/>
                    </Card>
                  </Animated>
                </Col>
                <Col sm={24} md={this.state.filterContainer != 6 ? 24 : 18}>
                  <DataDiv
                    mtcolumns={this.state.staticmt102columns}
                    tablename={'paymentspagemt102columns'}
                  />
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Card>
        <br/>
      </PageHeaderWrapper>
    );
  }
}
