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
    this.state = {
      selectedRowKeys: [],
      testcolumns: [],
      testdata: [],
      dataSource: [],
      count: 0,
      filterContainer: 0,
      parameters: {
        start: 0,
        length: 20,
        entity: 'mt100',
        filter: {},
      },
      //"knpList":["c7889895-0075-4bc2-89e8-939507dd4fc6"]
      filterForm: [],
      filterFormmt102: [],
      staticolumn: [{
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
          'title': 'Дата создания',
          'dataIndex': 'createdOn',
        }],
      staticmt102columns: [{
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
      }, {
        'title': 'Дата платежа',
        'dataIndex': 'createdon',
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
    /*dispatch({
      type: 'universal2/clear',
      payload: {
        table: 'requests',
      },
    });*/
  }

  componentDidMount() {

    const { dispatch } = this.props;
    /*dispatch({
      type: 'universal2/columns',
      payload: {
        table: 'payment',
      },
    });*/
    dispatch({
      type: 'universal/paymentsData',
      payload: this.state.parameters,
    }).then(() => {

    });


    /*const children = [];
    for (let i = 10; i < 36; i++) {
      children.push({
        id: i,
        name: 'a' + i,
      });
    }*/
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
        {
          name: 'totalAmount',
          label: formatMessage({ id: 'menu.mainview.paymentsum' }),
          type: 'text',
        },
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
        {
          name: 'recipientName',
          label: 'Получатель (Наименование)',
          type: 'text',
        },
        {
          name: 'recipientBin',
          label: 'Получатель (БИН)',
          type: 'text',
          withMax: 12,
        },
        {
          name: 'recipientBankBik',
          label: 'Получатель (БИК)',
          type: 'text',
          withMax: 8,
        },
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
        }, {
          label: 'Сумма',
          name: 'paymentsum',
          type: 'text',
        }, {
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
        }, {
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
        }, {
          label: 'Дата платежа',
          name: 'createdon',
          type: 'betweenDate',
        },
      ],
    });

  }

  clearFilter() {
    console.log('clearead');
  }


  onShowSizeChange = (current, pageSize) => {

    const max = current * pageSize;
    const min = max - pageSize;

    /*const { dispatch } = this.props;
    dispatch({
      type: 'universal2/data',
      payload: {
        table: 'payment',
      },
    });*/

  };

  handleSelectColumn(column, e) {
    let local_helper = this.StorageHelper();
    const { columns } = this.props.universal2;
    let filteredColumn = columns.map(function(item) {
      if (item.dataIndex === column.dataIndex) {
        item.isVisible = item.isVisible === 'true' ? 'false' : 'true';
      }
      return item;
    });

    local_helper.set('paymentColumns', filteredColumn, true);

    this.setState({
      columns: filteredColumn,
    });
  }

  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      filterContainer: filterContainer == 6 ? 0 : 6,
    }));
  };

  StorageHelper() {
    return {
      clear: function(name) {
        localStorage.setItem(name, null);
      },
      set: function(name, value, isReplace = true) {

        if (isReplace) {
          localStorage.setItem(name, typeof value === 'string' ? value : JSON.stringify(value));
        } else {
          if (!localStorage.getItem(name)) {
            localStorage.setItem(name, typeof value === 'string' ? value : JSON.stringify(value));
          }
        }

      },
      get: function(name) {
        let result = localStorage.getItem(name);

        if (result) {
          return JSON.parse(result);
        }

        return false;
      },
    };
  }

  tabchange = (e) => {
    const { dispatch } = this.props;
    this.setState({
      parameters: {
        ...this.state.parameters,
        entity: e,
      },
    }, () => {
      dispatch({
        type: 'universal/paymentsData',
        payload: this.state.parameters,
      });
    });

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
          'columns': this.state.parameters.entity=="mt100"?this.state.staticolumn:this.state.staticmt102columns,
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

    /* let local_helper = this.StorageHelper();
     let StorageColumns = local_helper.get('paymentColumns');
     local_helper.set('paymentColumns', columns, StorageColumns.length === 0 && columns.length !== 0);
     let _columns = local_helper.get('paymentColumns');

     _columns.forEach((column) => {
       column.width = 150;
       column.sorter = (a, b) => a[column.dataIndex].length - b[column.dataIndex].length;
     });

     const menu = (
       <Menu>
         <Menu.Item>
           <div>Выберите столбцов:</div>
         </Menu.Item>
         {_columns.map(function(column, index) {
           return (
             <Menu.Item key={index.toString()}>
               <Checkbox
                 onChange={this.handleSelectColumn.bind(this, column)}
                 checked={column.isVisible === 'true'}>
                 {column.title}
               </Checkbox>
             </Menu.Item>
           );
         }, this)}
       </Menu>
     );

     let lastActiveRow = false;
     const SelectableRow = ({ form, index, ...props }) => {

       const trRef = React.createRef();

       return (<EditableContext.Provider value={form}>
         <tr {...props} ref={trRef} onClick={(e) => {

           if (lastActiveRow) {
             lastActiveRow.style.backgroundColor = '';
           }

           lastActiveRow = trRef.current;
           lastActiveRow.style.backgroundColor = '#e6f7ff';

         }}/>
       </EditableContext.Provider>);
     };*/

    const DataDiv = ({ mtcolumns, tablename }) => (
      <Spin tip="" spinning={this.props.loadingData}>
        {/* <Spin tip="" spinning={false}>*/}

        {/*<div>
            <Button type={this.state.filterContainer != 6 ? 'default ' : ''} onClick={this.filterPanelState}
                    style={{ margin: '10px 0 10px 15px' }} size="small"><Icon type="search" theme="outlined"/></Button>

            <Button style={{ margin: '10px 0 10px 15px' }} size="small"><Icon type="redo"
                                                                              theme="outlined"/>Обновить</Button>
            <Button style={{ margin: '10px 15px 10px 15px', float: 'right' }} size="small"><Icon type="export"
                                                                                                 theme="outlined"/>Выгрузка
              в
              Excel</Button>
            <div style={{ margin: '10px 15px 10px 15px', float: 'right' }}>
              <Dropdown trigger={['click']} overlay={menu} placement="bottomRight">
                <Button size={'small'}>
                  <Icon type="setting" theme="outlined"/>
                </Button>
              </Dropdown>
            </div>
          </div>*/}

        <SmartGridView
          name={tablename}
          scroll={{ x: 'auto' }}
          fixedBody={true}
          showTotal={true}
          selectedRowCheckBox={true}
          searchButton={false}
          selectedRowKeys={this.state.selectedRowKeys}
          rowKey={'id'}
          loading={this.props.loadingData}
          fixedHeader={true}
          rowSelection={true}
          columns={mtcolumns}
          sorted={true}
          showExportBtn={true}
          dataSource={{
            total: paymentsData.totalElements,
            pageSize: this.state.parameters.length,
            page: this.state.parameters.start + 1,
            data: paymentsData.content,
          }}
          actionExport={() => this.exportToExcel()}
          addonButtons={[<span style={{
            color: '#002140',
            fontSize: '12px',
            paddingLeft: '10px',
          }}>{formatMessage({ id: 'system.totalAmount' })}: 54658.00</span>]}
          onShowSizeChange={(pageNumber, pageSize) => {
            console.log(pageNumber, pageSize);
            const { dispatch } = this.props;
            this.setState({
              parameters: {
                ...this.state.parameters,
                page: pageNumber,
                pageSize: pageSize,
              },
            }, () => {
              dispatch({
                type: 'universal/paymentsData',
                payload: this.state.parameters,
              });
            });
          }}
          onSelectCell={(cellIndex, cell) => {

          }}
          onSelectRow={() => {

          }}
          onFilter={(filters) => {

          }}
          onRefresh={() => {
            console.log('refresh');
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
        {/*<Table components={{
            body: {
              row: SelectableRow,
            },
          }} bordered={true} size={'small'} columns={_columns.filter(column => column.isVisible === 'true')}
                 dataSource={dataStore}
                 scroll={{ y: 360 }} pagination={false}
          />
          <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Pagination
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              showSizeChanger
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onShowSizeChange}
              defaultCurrent={1}
              total={50}
            />
          </Row>*/}
      </Spin>
    );


    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.rpmu.payments' })}>
        <Card bodyStyle={{ padding: 5 }}>
          <Tabs onChange={this.tabchange}>
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
                        icon={faTimes}/></Icon>}
                    >
                      <GridFilter clearFilter={this.clearFilter} applyFilter={(filter) => {
                        const { dispatch } = this.props;
                        this.setState({
                          parameters: {
                            ...this.state.parameters,
                            filter: {
                              ...filter,
                            },
                          },
                        }, () => {
                          console.log(this.state.parameters);
                          dispatch({
                            type: 'universal/paymentsData',
                            payload: this.state.parameters,
                          });
                        });
                      }} key={'1'}
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
                      <GridFilter clearFilter={this.clearFilter} applyFilter={(filter) => {
                        const { dispatch } = this.props;
                        this.setState({
                          parameters: {
                            ...this.state.parameters,
                            filter: {
                              ...filter,
                            },
                          },
                        }, () => {
                          console.log(this.state.parameters);
                          dispatch({
                            type: 'universal/paymentsData',
                            payload: this.state.parameters,
                          });
                        });
                      }} key={'2'}
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
