import React, { Component } from 'react';
import {
  Card,
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
  Modal,
  Input,
  DatePicker,
  LocaleProvider,
  Select,
  Checkbox,
  Divider,
  Spin,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import ModalGridView from '@/components/ModalGridView';
import GridFilter from '@/components/GridFilter';
import SmartGridView from '@/components/SmartGridView';
import { connect } from 'dva';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons/index';
import { getAuthority } from '../../utils/authority';
import ModalGraphView from '../../components/ModalGraphView';
import { Animated } from 'react-animated-css';
import componentLocal from '../../locales/components/componentLocal';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const { RangePicker } = DatePicker;

function hasRole(roles) {
  let userRoles = getAuthority();
  return !userRoles.some(r => roles.indexOf(r) >= 0);
}


@connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects['universal/mainviewtable'],
}))
class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowModal: false,
      btnhide: false,
      ShowGraph: false,
      modalVisible: false,
      updateModalVisible: false,
      expandForm: false,
      selectedRows: [],
      searchButton: false,
      formValues: {},
      stepFormValues: {},
      fcolumn: [
        {
          title: formatMessage({ id: 'menu.mainview.paylists' }),
          order: 0,
          key: 'operation',
          className: 'action_column',
          isVisible: true,
          onCell: record => {
            return {
              onClick: () => {
                this.toggleItems(record);
              },
            };
          },
          render: () => (
            <Button size={'small'}>
              <Icon type="database" theme="outlined"/>
            </Button>
          ),
        },
        {
          title: formatMessage({ id: 'menu.mainview.mt102' }),
          order: 1,
          key: 'mt102',
          className: 'action_column',
          // to do hide for don't admin
          isVisible: !hasRole(['ADMIN']),
          onCell: record => {
            return {
              onClick: () => {
                /*const { dispatch } = this.props;
                dispatch({
                  type: 'universal2/getmt102',
                  payload: {},
                });*/
                //this.toggleItems(record);
              },
            };
          },
          render: () => (
            <Button size={'small'}>
              <a href="/api/refund/getfile" download>
                <Icon><FontAwesomeIcon icon={faFileAlt}/></Icon>
              </a>
            </Button>
          ),
        },
        {
          title: formatMessage({ id: 'menu.mainview.fio' }),
          order: 3,
          key: 'fio',
          isVisible: true,
          width: 150,
          render: (item) => {
            //console.log(i);
            return item.personSurname + ' ' + item.personFirstname + ' ' + item.personPatronname;
          },
        }, {
          'title': 'Статус заявки на возврат',
          isVisible: true,
          'dataIndex': 'dappRefundStatusId.nameRu',
          order: 7,
          render: (record, value) => <a style={{ color: value.isRefundConfirm === 'True' ? 'green' : 'red' }}
                                        href="#">{value.dappRefundStatusId.nameRu}</a>,
        }],
      columns: [{
        'title': 'Номер заявки',
        'isVisible': true,
        'dataIndex': 'applicationId.appNumber',
      }, {
        'title': 'Дата заявления плательщика',
        'isVisible': true,
        'dataIndex': 'appPayerDate',
      }, {
        'title': 'Дата заявки',
        'isVisible': true,
        'dataIndex': 'applicationId.appDate',
      }, {
        'title': 'Дата поступления заявления в Фонд',
        'isVisible': true,
        'dataIndex': 'receiptAppdateToFsms',
      }, {
        'title': 'Дата поступления',
        'isVisible': true,
        'dataIndex': 'entryDate',
      }, {
        'title': 'Крайняя дата исполнения заявки',
        'isVisible': true,
        'dataIndex': 'appEndDate',
      },
        {
          'title': 'Сумма возврата',
          'isVisible': true,
          'dataIndex': 'refundPayAmount',

        },
        {
          'title': 'Референс ГК',
          'isVisible': true,
          'dataIndex': 'gcvpReference',
        }, {
          'title': 'Номер плат-го поручения ГК',
          'isVisible': true,
          'dataIndex': 'gcvpOrderNum',
        }, { 'title': 'Дата плат-го поручения ГК', 'dataIndex': 'gcvpOrderDate' }, {
          'title': 'Причина возврата',
          'dataIndex': 'drefundReasonId.nameRu',
        }, { 'title': 'ИИН Потребителя', 'dataIndex': 'personIin' }, {
          'title': 'КНП',
          'dataIndex': 'applicationId.dknpId.id',
        }, {
          'title': 'Номер платежного поручения',
          'dataIndex': 'applicationId.payOrderNum',
        }, {
          'title': 'Дата платежного поручения',
          'dataIndex': 'applicationId.payOrderDate',
        }, { 'title': 'Сумма отчислений', 'dataIndex': 'payAmount' }, {
          'title': 'Дата последнего взноса',
          'dataIndex': 'lastPayDate',
        }, {
          'title': 'Дата осуществления возврата',
          'dataIndex': 'refundDate',
        }, {
          'title': 'Кол-во отчислений и (или) взносов за последние 12 календарных месяцев',
          'dataIndex': 'lastMedcarePayCount',
        }, { 'title': 'Статус страхования', 'dataIndex': 'medinsStatus' }, {
          'title': 'Референс',
          'dataIndex': 'applicationId.reference',
        }, { 'title': 'Причина отказа', 'dataIndex': 'ddenyReasonId.nameRu' }, {
          'title': 'Отчет об отказе',
          'dataIndex': 'refundStatus',
        }, { 'title': 'Осталось дней', 'dataIndex': 'daysLeft' }, {
          'title': 'Дата изменения статуса заявки',
          'dataIndex': 'changeDate',
        }, { 'title': 'Период', 'dataIndex': 'payPeriod' }, {
          'title': 'Веб-сервис (сообщение) ',
          'dataIndex': 'wsStatusMessage',
        }],
      dataSource: [],
      isHidden: true,
      searchercont: 0,
      selectedRowKeys: [],
      tablecont: 24,
      filterForm: [],
      xsize: 'auto',

      pagingConfig: {
        'start': 0,
        'length': 15,
        'src': {
          'searched': false,
          'data': {},
        },
      },
    };
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/clear',
      payload: {
        table: 'requests',
      },
    });
  }

  loadMainGridData = () => {

    const { dispatch } = this.props;

    dispatch({
      type: 'universal/mainviewtable',
      payload: this.state.pagingConfig,
    });


  };

  componentDidMount() {
    this.loadMainGridData();

    const { dispatch } = this.props;

    /*dispatch({
      type: 'universal/mainviewtable',
      payload: this.state.pagingConfig,
    });*/
    /*dispatch({
      type: 'universal/mainviewcolumn',
      payload: {},
    });*/
    /*.then(()=> {
    console.log(this.props);
    this.props.universal.columns.concat(this.state.columns);
  });*/
    /*  dispatch({
        type: 'universal/rpmuTable',
        payload: {},
      });*/
  }

  onShowSizeChange = (current, pageSize) => {
    const max = current * pageSize;
    const min = max - pageSize;
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/mainviewtable',
      payload: {
        ...this.state.pagingConfig,
        start: current,
        length: pageSize,
      },
    });
  };

  showModal = () => {
    this.setState({
      ShowModal: true,
    });
  };

  showGraphic = () => {
    this.setState({
      ShowGraph: true,
    });
  };

  toggleSearcher() {
    this.setState({
      searchButton: true,
      isHidden: false,
      searchercont: 7,
      tablecont: 17,
    });
  }

  toggleItems() {
    this.setState({
      searchButton: false,
      isHidden: false,
      searchercont: 8,
      tablecont: 16,
    });
  }

  hideleft() {
    if (!this.state.isHidden) {
      this.setState({
        isHidden: true,
        searchButton: false,
        searchercont: 0,
        tablecont: 24,
      });
    }
  }

  selectTable = (selectedRowKeys) => {
    console.log("test")
    this.setState({ selectedRowKeys });
  };

  clearFilter = () => {

    this.setState({
      pagingConfig: {
        'start': 0,
        'length': 15,
        'src': {
          'searched': false,
          'data': {},
        },
      },
    }, () => {
      this.loadMainGridData();
    });
  };

  setFilter = (filters) => {

    this.setState({
      pagingConfig: {
        'start': 0,
        'length': 15,
        'src': {
          'searched': true,
          'data': filters,
        },
      },
    }, () => {
      this.loadMainGridData();
    });


  };

  stateFilter = () => {
    return [
      {
        name: 'test',
        label: 'selectlist',
        type: 'selectlist',
      },
      {
        name: 'appNumber',
        label: formatMessage({ id: 'menu.filter.numberrequest' }),
        type: 'text',
      },
      {
        name: 'iin',
        label: formatMessage({ id: 'menu.filter.iin' }),
        type: 'text',
      },
      {
        name: 'refund_status',
        label: formatMessage({ id: 'menu.filter.refundstatus' }),
        type: 'multibox',
      },
      {
        name: 'lastDate',
        label: formatMessage({ id: 'menu.filter.lastdate' }),
        type: 'betweenDate',
      },
      {
        name: 'payerDate',
        label: formatMessage({ id: 'menu.filter.payerdate' }),
        type: 'betweenDate',
      },
      {
        name: 'RefundComeDate',
        label: formatMessage({ id: 'menu.filter.RefundComeDate' }),
        type: 'betweenDate',
      },
      {
        name: 'RefundFundDate',
        label: formatMessage({ id: 'menu.filter.RefundFundDate' }),
        type: 'betweenDate',
      },
      {
        name: 'RefusalDate',
        label: formatMessage({ id: 'menu.filter.RefusalDate' }),
        type: 'betweenDate',
      },
      {
        name: 'knp',
        label: formatMessage({ id: 'menu.filter.knp' }),
        type: 'multibox',
        hint: true,
      },
      {
        name: 'refund_reason',
        label: formatMessage({ id: 'menu.filter.RefundReason' }),
        type: 'combobox',
      },
      {
        name: 'refund_deny_reason',
        label: formatMessage({ id: 'menu.filter.RefusalReason' }),
        type: 'combobox',
      },
    ];
  };

  rpmuColumn = () => {
    return [
      {
        title: formatMessage({ id: 'menu.mainview.rpmuName' }),
        key: 'lastname',
        width: 100,
        render: (text, record) => (<div>
            {text.lastname + ' ' + text.firstname + ' ' + text.secondname}
            <br/>
            {'(ИИН: ' + text.iin + ', ДР: ' + text.birthdate + ')'}
          </div>
        ),
      },
      {
        title: formatMessage({ id: 'menu.mainview.paymentsum' }),
        dataIndex: 'paymentsum',
        key: 'paymentsum',
        width: 80,
      },
      {
        title: formatMessage({ id: 'menu.mainview.paymentperiod' }),
        dataIndex: 'paymentperiod',
        key: 'paymentperiod',
        width: 70,
      },
      {
        title: formatMessage({ id: 'menu.mainview.knp' }),
        dataIndex: 'knp',
        key: 'knp',
        width: 50,
      },
      {
        title: formatMessage({ id: 'menu.mainview.reference' }),
        dataIndex: 'reference',
        key: 'reference',
        width: 70,
      },
    ];
  };


  setStatusRecord = (statusCode, statusText) => {
    const { selectedRowKeys } = this.state;
    const { dispatch } = this.props;

    if (selectedRowKeys.length === 0) return false;

    confirm({
      title: 'Подтверждение',
      content: 'Вы действительно хотите ' + statusText.toLowerCase() + ' возврат? ',
      okText: 'Да',
      cancelText: 'Нет',
      onOk: () => {
        dispatch({
          type: 'universal/changeRefundStatus',
          payload: {
            'status': statusCode,
            'denyReasonId': null,
            'refundList': selectedRowKeys.map((valueId) => ({ id: valueId })),
          },
        }).then(() => {
          this.setState({
            selectedRowKeys: [],
          }, () => {
            this.loadMainGridData();
          });
        });
      },
      onCancel: () => {
        this.setState({
          selectedRowKeys: [],
        });
      },
    });

  };

  AppRefundStatusAuto = () => {
    const { dispatch } = this.props;
    if (this.state.selectedRowKeys.length > 0) {

      dispatch({
        type: 'universal/AppRefundStatusAuto',
        payload: {
          'refundList': this.state.selectedRowKeys.map((valueId) => ({ id: valueId }))
        },
      }).then(() => {
        this.loadMainGridData();
      });
    }
  };

  checkStatus  = (selectedRowKeys) => {
    this.setState({
      btnhide: false,
    });
    if (selectedRowKeys.length>0){
      selectedRowKeys.map(select=>{
        if([this.props.universal.table.content.find(item=>item.id===select)].map(item=> item.dappRefundStatusId.code ==='00007' || item.dappRefundStatusId.code ==='00008')[0]) {
          this.setState({
            btnhide: true,
          });
        }
      })
    }
    this.setState({
      selectedRowKeys: selectedRowKeys,
    });
  }


  render() {

    const dateFormat = 'DD.MM.YYYY';

    const { universal } = this.props;

    const rpmuColumns = this.rpmuColumn();

    const DataDiv = () => (
      <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
        <Card
          style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
          bodyStyle={{ padding: 0 }}
          type="inner"
          title="Платежи РПМУ"
          extra={<Icon style={{ 'cursor': 'pointer' }} onClick={event => this.hideleft()}><FontAwesomeIcon
            icon={faTimes}/></Icon>}
        >
          <LocaleProvider locale={componentLocal}><Table
            size={'small'}
            columns={rpmuColumns}
            dataSource={universal.rpmu.content}
            rowClassName={(record) => {

              if (record.refundExist) {
                console.log(record.refundExist);
                return 'greenRow';
              }
            }
            }
            scroll={{ x: 1100 }}/>
          </LocaleProvider>
        </Card>
      </Animated>);

    const GridFilterData = this.stateFilter();


    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.mainview' })}>
        <ModalGraphView visible={this.state.ShowGraph}
                        resetshow={(e) => {
                          this.setState({ ShowGraph: false });
                        }}
                        dataSource={universal.mainmodal}/>

        {this.state.ShowModal && <ModalGridView visible={this.state.ShowModal}
                                                resetshow={(e) => {
                                                  this.setState({ ShowModal: false });
                                                }}
                                                filter={this.state.pagingConfig}/>}

        <Card bodyStyle={{ padding: 5 }}>
          <Row>
            <Col sm={24} md={this.state.searchercont}>
              <div>

                {this.state.searchercont === 7 &&
                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                  <Card
                    style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
                    type="inner"
                    title={formatMessage({ id: 'system.filter' })}
                    headStyle={{
                      padding: '0 14px',
                    }}
                    extra={<Icon style={{ 'cursor': 'pointer' }} onClick={event => this.hideleft()}><FontAwesomeIcon
                      icon={faTimes}/></Icon>}
                  >

                    <GridFilter
                      clearFilter={() => {
                        this.clearFilter();
                      }}
                      applyFilter={(filters) => {
                        this.setFilter(filters);
                      }}
                      filterForm={GridFilterData}
                      dateFormat={dateFormat}/>


                  </Card>
                </Animated>}

                {this.state.searchercont === 8 &&
                <DataDiv/>
                }

              </div>
            </Col>
            <Col sm={24} md={this.state.tablecont}>
              {/*<Card style={{ borderRadius: '5px', marginBottom: '10px' }} bodyStyle={{ padding: 0 }} bordered={true}>*/}
              <Spin tip={formatMessage({ id: 'system.loading' })} spinning={this.props.loadingData}>
                <SmartGridView
                  name={'RefundsPageColumns'}
                  scroll={{ x: this.state.xsize }}
                  selectedRowCheckBox={true}
                  searchButton={this.state.searchButton}
                  selectedRowKeys={this.state.selectedRowKeys}
                  rowKey={'id'}
                  loading={this.props.loadingData}
                  rowSelection={true}
                  actionColumns={this.state.fcolumn}
                  columns={this.state.columns}
                  sorted={true}
                  showTotal={true}
                  dataSource={{
                    total: universal.table.totalElements,
                    pageSize: this.state.pagingConfig.length,
                    page: this.state.pagingConfig.start + 1,
                    data: universal.table.content,
                  }}
                  addonButtons={[
                    <Button onClick={() => this.setStatusRecord(1, formatMessage({ id: 'menu.mainview.approveBtn' }))}
                            disabled={hasRole(['FSMS1', 'FSMS2', 'ADMIN']) || this.state.btnhide}
                            key={'odobrit'} className={'btn-success'}
                    >
                      {formatMessage({ id: 'menu.mainview.approveBtn' })} {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
                    </Button>,

                    <Button onClick={() => this.setStatusRecord(2, formatMessage({ id: 'menu.mainview.cancelBtn' }))}
                            disabled={hasRole(['FSMS1', 'FSMS2', 'ADMIN']) || this.state.btnhide}
                            key={'cancel'}
                            className={'btn-danger'}>
                      {formatMessage({ id: 'menu.mainview.cancelBtn' })} {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
                    </Button>,

                    <Button onClick={() => this.setStatusRecord(3, formatMessage({ id: 'menu.mainview.saveBtn' }))}
                            disabled={hasRole(['FSMS1', 'FSMS2', 'ADMIN']) || this.state.btnhide}
                            key={'save'}>{formatMessage({ id: 'menu.mainview.saveBtn' })} {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}</Button>,
                    <Button onClick={() => this.setStatusRecord(4, formatMessage({ id: 'menu.mainview.performBtn' }))}
                            disabled={hasRole(['FSMS2', 'ADMIN']) || this.state.btnhide}
                            key={'run'}>{formatMessage({ id: 'menu.mainview.performBtn' })} {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}</Button>,

                    <Dropdown key={'dropdown'} trigger={['click']} overlay={<Menu>
                      <Menu.Item disabled={hasRole(['FSMS2', 'ADMIN'])} key="1"
                                 onClick={this.AppRefundStatusAuto}>
                        {formatMessage({ id: 'menu.mainview.verifyRPMUBtn' })} {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
                      </Menu.Item>
                      <Menu.Item key="2">
                        {formatMessage({ id: 'menu.mainview.excelBtn' })}
                      </Menu.Item>
                      <Menu.Item disabled={hasRole(['FSMS2', 'ADMIN'])} key="3">
                        {formatMessage({ id: 'menu.mainview.setDateBtn' })}
                      </Menu.Item>
                      <Menu.Item disabled={hasRole(['ADMIN', 'FSMS2'])} key="4" onClick={() => {
                        this.showModal();
                      }}>
                        {formatMessage({ id: 'menu.mainview.mt102Btn' })}
                      </Menu.Item>
                      <Menu.Item disabled={hasRole(['ADMIN'])} key="5">
                        {formatMessage({ id: 'menu.mainview.xmlBtn' })}
                      </Menu.Item>
                      <Menu.Item disabled={hasRole(['ADMIN'])} key="6" onClick={() => {
                        this.showGraphic();
                      }}>
                        {formatMessage({ id: 'menu.mainview.infographBtn' })}
                      </Menu.Item>
                    </Menu>}>
                      <Button disabled={hasRole(['FSMS2', 'ADMIN'])}
                              key={'action'}>{formatMessage({ id: 'menu.mainview.actionBtn' })} <Icon
                        type="down"/></Button>
                    </Dropdown>,
                  ]}

                  onShowSizeChange={(pageNumber, pageSize) => {
                    this.onShowSizeChange(pageNumber, pageSize);
                  }}
                  onSelectCell={(cellIndex, cell) => {

                  }}
                  onSelectRow={() => {

                  }}
                  onFilter={(filters) => {

                  }}
                  onRefresh={() => {
                    this.loadMainGridData();
                  }}
                  onSearch={() => {
                    this.toggleSearcher();
                  }}
                  onSelectCheckboxChange={(selectedRowKeys) => {
                    this.checkStatus(selectedRowKeys);
                  }}
                />
                <br/>
              </Spin>
              {/*</Card>*/}
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default MainView;
