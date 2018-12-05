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
import saveAs from 'file-saver';

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
        },
        {
          'title': 'Статус загрузки',
          'dataIndex': 'mt102LoadStatus.text',
        },
        {
          'title': 'Статус загрузки (сообщение)',
          'dataIndex': 'mt102LoadDescription',
        }, {
          'title': 'Количество МТ102',
          'dataIndex': 'mt102Count',
        },
      ],
      staticmt100funcColuns: [
        /*{
          title: 'Статус загрузки',
          key: 'mt102LoadStatus',
          order: 13,
          isVisible: true,
          width: 150,
          render: (item) => {
            return item.mt102LoadStatus===0 ? formatMessage({ id: 'menu.payments.status0' }): item.mt102LoadStatus===1? formatMessage({ id: 'menu.payments.status1' }): formatMessage({ id: 'menu.payments.status2' });
          },
        },*/
        //'menu.payments.status0'
        /*{
          title: 'Статус загрузки (сообщение)',
          key: 'mt102LoadDescription',
          order: 14,
          isVisible: true,
          width: 150,
          render: (item) => {
            return item.mt102LoadStatus=== 2 ? item.mt102LoadDescription===1: '';
          },
        },
        {
          title: 'Количество МТ102',
          key: 'mt102Count',
          order: 15,
          isVisible: true,
          width: 150,
          render: (item) => {
            return item.mt102Count;
          },
        },*/
      ],
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
        }, {
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
          'title': 'Отправитель (БИН)',
          'dataIndex': 'senderBin',
          'isVisible': 'true',
        }, {
          'title': 'Отправитель (Наименование)',
          'dataIndex': 'senderName',
          'isVisible': 'true',
        }, {
          'title': 'Выберите период',
          'dataIndex': 'paymentperiod',
          'isVisible': 'true',
        }],

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
        },
        {
          label: 'Отправитель (БИН)',
          name: 'senderBin',
          type: 'text',
        },
        {
          label: 'Отправитель (Наименование)',
          name: 'senderName',
          type: 'text',
        },
        {
          label: 'ИИН',
          name: 'iin',
          type: 'text',
          withMax: 12,
        }, {
          label: 'Период',
          name: 'paymentperiod',
          type: 'monthPicker',
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
          'fileName': this.state.parameters.entity === 'mt100' ? formatMessage({ id: 'menu.payments.payment100' }) : formatMessage({ id: 'menu.payments.payment102' }),
          'src': {
            'searched': true,
            'data': this.state.parameters.filter,
          },
          'columns': this.state.parameters.entity == 'mt100' ? JSON.parse(localStorage.getItem('paymentspagemt100columns')).filter(item => item.isVisible === 'true') : JSON.parse(localStorage.getItem('paymentspagemt102columns')).filter(item => item.isVisible === 'true'),
        }),
      })
    // .then(response => response.blob())
    // .then(responseBlob => {
    //
    //   var reader = new FileReader();
    //   reader.addEventListener('loadend', function() {
    //     var blob = new Blob([reader.result], { type: 'application/vnd.ms-excel' }); // pass a useful mime type here
    //     var url = URL.createObjectURL(blob);
    //     window.open(url, '_self');
    //   });
    //   reader.readAsArrayBuffer(responseBlob);
    //
    //   /* let blob = new Blob([responseBlob], { type: responseBlob.type }),
    //      url = window.URL.createObjectURL(blob);
    //    window.open(url, '_self');*/
    // });
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
          saveAs(data.raw, moment().format('DDMMYYYY') + data.fileName);
        }
      });

  };
  getFileNameByContentDisposition = (contentDisposition) => {
    let regex = /filename[^;=\n]*=(UTF-8(['"]*))?(.*)/;
    let matches = regex.exec(contentDisposition);
    let filename;
    let filenames;
    if (matches != null && matches[3]) {
      filename = matches[3].replace(/['"]/g, '');
      let match = regex.exec(filename);
      if (match != null && match[3]) {
        filenames = match[3].replace(/['"]/g, '').replace('utf-8', '');
      }
    }
    return decodeURI(filenames);
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

    /*const DataDiv = ({ mtcolumns, tablename }) => (
      <Spin tip="" spinning={this.props.loadingData}>
        <SmartGridView
          name={tablename}
          scroll={{ x: 'auto' }}
          fixedBody={true}
          actionColumns={tablename === 'paymentspagemt100columns' ? this.state.staticmt100funcColuns : []}
          showTotal={true}
          selectedRowCheckBox={true}
          searchButton={false}
          selectedRowKeys={this.state.selectedRowKeys}
          rowKey={'id'}
          loading={this.props.loadingData}
          fixedHeader={true}
          rowSelection={true}
          rowClassName={(record) => {
            if (record.isRefunded) {
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
    );*/

    const DataDiv = ({ mtcolumns, tablename }) => (
      <Spin tip="" spinning={this.props.loadingData}>
        {tablename === 'paymentspagemt100columns' ?
          <SmartGridView
            name={tablename}
            scroll={{ x: 'auto' }}
            fixedBody={true}
            actionColumns={tablename === 'paymentspagemt100columns' ? this.state.staticmt100funcColuns : []}
            showTotal={true}
            selectedRowCheckBox={true}
            searchButton={false}
            selectedRowKeys={this.state.selectedRowKeys}
            rowKey={'id'}
            loading={this.props.loadingData}
            fixedHeader={true}
            rowSelection={true}
            /*rowClassName={(record) => {
              if (record.isRefunded) {
                return 'redRow';
              }
            }
            }*/
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
          :
          <SmartGridView
            name={tablename}
            scroll={{ x: 'auto' }}
            fixedBody={true}
            actionColumns={tablename === 'paymentspagemt100columns' ? this.state.staticmt100funcColuns : []}
            showTotal={true}
            selectedRowCheckBox={true}
            searchButton={false}
            selectedRowKeys={this.state.selectedRowKeys}
            rowKey={'id'}
            loading={this.props.loadingData}
            fixedHeader={true}
            rowSelection={true}
            rowClassName={(record) => {
              if (record.isRefunded) {
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
        }
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
                searchbybin={(bin) => {
                  this.setState({
                    sortedInfo: {},
                    parameters: {
                      ...this.state.parameters,
                      'entity': 'mt100',
                      'filter': { 'senderBin': bin },
                      'sort': [],
                    },
                  }, () => {
                    this.loadGridData();
                    this.setState({
                      activeKey: 'mt100',
                    });
                  });
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
