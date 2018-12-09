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
  Upload,
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
import ModalChangeDateRefund from '@/components/ModalChangeDateRefund';
import { connect } from 'dva';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons/index';
import { getAuthority } from '../../utils/authority';
import ModalGraphView from '../../components/ModalGraphView';
import { Animated } from 'react-animated-css';
import componentLocal from '../../locales/components/componentLocal';
import ImportXMLModal from './ImportXMLModal';
import saveAs from 'file-saver';


const FormItem = Form.Item;
const confirm = Modal.confirm;
const { RangePicker } = DatePicker;

function hasRole(roles) {
  let userRoles = getAuthority();
  return !userRoles.some(r => roles.indexOf(r) >= 0);
}


@connect(({ universal, references, loading }) => ({
  universal,
  references,
  loadingData: loading.effects['universal/mainviewtable'],
  rpmuLoading: loading.effects['universal/rpmuTable'],
}))
class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {

      ImportXMLModal: {
        visible: false,
      },

      ModalChangeDateRefund: false,

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
                this.loadRpmuData(record.id);
              },
            };
          },
          render: () => (
            <Button size={'small'}>
              <Icon type="database" theme="outlined"/>
            </Button>
          ),
        },
        /*{
          title: formatMessage({ id: 'menu.mainview.mt102' }),
          order: 1,
          key: 'mt102',
          className: 'action_column',
          // to do hide for don't admin
          isVisible: !hasRole(['ADMIN']),
          onCell: record => {
            return {
              onClick: () => {
                /!*const { dispatch } = this.props;
                dispatch({
                  type: 'universal2/getmt102',
                  payload: {},
                });*!/
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
        },*/
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
          render: (record, value) => <a
            style={{ color: this.setColor(value.isRefundConfirm) }}//value.isRefundConfirm ? 'green' : 'red' }}
            href="#">{value.dappRefundStatusId.nameRu}</a>,
        }],
      columns: [
        {
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
          'title': 'Дата исполнения заявки',
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
          'dataIndex': 'applicationId.dknpId.code',
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

      rpmu: {
        pagingConfig: {
          'start': 0,
          'length': 15,
          'src': {
            'searched': false,
            'data': {},
          },
        },
      },

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
    /*.then(() => {
    if (this.props.universal.table.totalElements===undefined)
    {
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
    }
  });*/
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
  setColor = (value) => {
    if (value) {
      return 'green';
    }
    else if (value === undefined) {
      return 'black';
    }
    else {
      return 'red';
    }
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
    console.log('test');
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

    /*   {
         name: 'test',
         label: 'selectlist',
         type: 'selectlist',
       },*/
    return [
      {
        name: 'appNumber',
        label: formatMessage({ id: 'menu.filter.numberrequest' }),
        type: 'text',
      },
      {
        name: 'personIin',
        label: formatMessage({ id: 'menu.filter.iin' }),
        type: 'text',
      },
      {
        name: 'dappRefundStatus',
        label: formatMessage({ id: 'menu.filter.refundstatus' }),
        type: 'multibox',
      },
      {
        name: 'appEndDate',
        label: formatMessage({ id: 'menu.filter.lastdate' }),
        type: 'betweenDate',
      },
      {
        name: 'appPayerDate',
        label: formatMessage({ id: 'menu.filter.payerdate' }),
        type: 'betweenDate',
      },
      {
        name: 'refundEntryDate',
        label: formatMessage({ id: 'menu.filter.RefundComeDate' }),
        type: 'betweenDate',
      },
      {
        name: 'refundEntryDate',
        label: formatMessage({ id: 'menu.filter.RefundFundDate' }),
        nullBtn: true,
        type: 'betweenDate',
      },
      {
        name: 'refundDate',
        label: formatMessage({ id: 'menu.filter.RefusalDate' }),
        nullBtn: true,
        type: 'betweenDate',
      },
      {
        name: 'knp',
        label: formatMessage({ id: 'menu.filter.knp' }),
        type: 'multibox',
        hint: true,
      },
      {
        name: 'drefundReason',
        label: formatMessage({ id: 'menu.filter.RefundReason' }),
        type: 'combobox',
      },
      {
        name: 'ddenyReason',
        label: formatMessage({ id: 'menu.filter.RefusalReason' }),
        type: 'combobox',
      },
    ];
  };

  rpmuColumn = () => {
    return [
      {
        title: formatMessage({ id: 'menu.mainview.paymentsum' }),
        dataIndex: 'paymentsum',
        key: 'paymentsum',
        isVisible: true,
        width: 80,
      },
      {
        title: formatMessage({ id: 'menu.mainview.paymentperiod' }),
        dataIndex: 'paymentperiod',
        isVisible: true,
        key: 'paymentperiod',
        width: 70,
      },
      {
        title: formatMessage({ id: 'menu.mainview.knp' }),
        dataIndex: 'knp',
        key: 'knp',
        isVisible: true,
        width: 50,
      },
      {
        title: formatMessage({ id: 'menu.mainview.reference' }),
        dataIndex: 'reference',
        key: 'reference',
        isVisible: true,
        width: 70,
      },
    ];
  };

  setStatusRecord = (statusCode, statusText) => {
    const { selectedRowKeys } = this.state;
    const { dispatch } = this.props;

    let content;
    let statusId = false;

    if (selectedRowKeys.length === 0) return false;

    if (statusCode === 2) {

      // to do status component

      dispatch({
        type: 'references/load',
        code: 'ddenyReason',
      }).then(() => {
        content = (<div style={{ marginTop: 10 }}><span>{formatMessage({ id: 'menu.filter.RefusalReason' })}:</span>
          <Select
            style={{ width: '100%' }}
            placeholder=""
            onChange={(value) => {
              statusId = value;
            }}
          >
            <Select.Option key={null}>{<div style={{ height: 20 }}></div>}</Select.Option>
            {this.props.references['ddenyReason'] && this.props.references['ddenyReason'].map((item) => {
              return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
            })}
          </Select></div>);

        confirm({
          title: 'Подтверждение',
          content: content,
          okText: 'Да',
          cancelText: 'Нет',
          onOk: () => {
            dispatch({
              type: 'universal/changeRefundStatus',
              payload: {
                'status': statusCode,
                'denyReasonId': statusId ? { id: statusId } : null,
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

      });

    } else {
      content = 'Вы действительно хотите ' + statusText.toLowerCase() + ' возврат? ';
      confirm({
        title: 'Подтверждение',
        content: content,
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
    }


  };

  AppRefundStatusAuto = () => {
    const { dispatch } = this.props;
    if (this.state.selectedRowKeys.length > 0) {

      dispatch({
        type: 'universal/AppRefundStatusAuto',
        payload: {
          'refundList': this.state.selectedRowKeys.map((valueId) => ({ id: valueId })),
        },
      }).then(() => {
        this.loadMainGridData();
      });
    }
  };

  disableBtnIsReceiptDateNull = () => {


    if (this.state.selectedRowKeys.length > 0) {
      let nullableDateRecords = this.state.selectedRowKeys
        .map((selectKey) => this.props.universal.table.content.find(item => item.id === selectKey))
        .filter((itemRecord) => itemRecord.applicationId.receiptAppdateToFsms === null);

      return nullableDateRecords.length > 0;
    }
    return false;
  };

  checkStatus = (selectedRowKeys) => {
    this.setState({
      btnhide: false,
    });
    if (selectedRowKeys.length > 0) {
      selectedRowKeys.map(select => {

        if ([this.props.universal.table.content.find(item => item.id === select)].map(item => item.dappRefundStatusId.code === '00007' || item.dappRefundStatusId.code === '00008')[0]) {
          this.setState({
            btnhide: true,
          });
        }
      });
    }
    this.setState({
      selectedRowKeys: selectedRowKeys,
    });
  };

  refundsReceiver = () => {
    confirm({
      title: 'Подтверждение',
      content: 'Вы действительно хотите получить заявки на возврат?',
      okText: 'Да',
      cancelText: 'Нет',
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'universal/receiversRefund',
          payload: {
            'id': 'e6c16d0c-72cb-450d-a813-af5bbd399d91',
            'parameters': [
              {
                'name': 'Код статуса',
                'value': '00010',
              },
              {
                'name': 'Количество',
                'value': 5,
              },
            ],
          },
        }).then(() => this.loadMainGridData());
      },
      onCancel: () => {

      },
    });
  };

  btnIsDisabled = (isRole, args) => {
    return !isRole ? args.filter((eq) => (eq)).length > 0 : true;
  };
  loadRpmuData = (recordId) => {

    const { dispatch } = this.props;

    dispatch({
      type: 'universal/rpmuTable',
      payload: {
        'start': 0,
        'length': 30,
        'refundId': {
          'id': recordId,
        },
      },
    });
  };


  exportToExcel = () => {

    let authToken = localStorage.getItem('token');
    let columns = JSON.parse(localStorage.getItem('RefundsPageColumns'));

    fetch('/api/refund/exportToExcel',
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + authToken,
        },
        method: 'post',
        body: JSON.stringify({
          'entityClass': 'Refund',
          'fileName': formatMessage({ id: 'menu.refunds' }),
          'src': {
            'searched': true,
            'data': this.state.pagingConfig.src.data,
          },
          'columns': [{
            'title': 'Статус заявки на возврат',
            'dataIndex': 'dappRefundStatusId.nameRu',
          }, {
            'dataIndex': 'personSurname',
            'title': 'Фамилия',
          }, {
            'dataIndex': 'personFirstname',
            'title': 'Имя',
          }, {
            'dataIndex': 'personPatronname',
            'title': 'Отчество',
          }].concat(columns.filter(column => column.isVisible)),
        }),
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

  importXmlAction = () => {
    this.setState(prevState => ({ ImportXMLModal: { visible: true } }));
  };

  render() {

    const dateFormat = 'DD.MM.YYYY';

    const { universal } = this.props;

    const rpmuColumns = this.rpmuColumn();
    const GridFilterData = this.stateFilter();

    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.mainview' })}>

        {this.state.ImportXMLModal.visible &&
        <ImportXMLModal
          closeAction={() => this.setState(prevState => ({ ImportXMLModal: { visible: false } }))}
          onSelectedRows={(selectedRecords) => console.log(selectedRecords)}
        />}

        {this.state.ModalChangeDateRefund && <ModalChangeDateRefund
          selectedRowKeys={this.state.selectedRowKeys}
          dateFormat={dateFormat}
          hideModal={(loadData) => {
            if (loadData)
              this.setState({
                ModalChangeDateRefund: false,
                selectedRowKeys: [],
                btnhide: false,
              }, () => this.loadMainGridData());
            else this.setState({ ModalChangeDateRefund: false });
          }}/>}

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
                      icon={faTimes}/></Icon>}>

                    <GridFilter
                      clearFilter={() => {
                        this.clearFilter();
                      }}
                      applyFilter={(filters) => {
                        console.log(JSON.stringify(filters));
                        this.setFilter(filters);
                      }}
                      filterForm={GridFilterData}
                      dateFormat={dateFormat}/>


                  </Card>
                </Animated>}

                {this.state.searchercont === 8 &&
                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                  <Card
                    style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
                    bodyStyle={{ padding: 0 }}
                    type="inner"
                    title={formatMessage({ id: 'menu.mainview.rpmuLocale' })}
                    extra={<Icon style={{ 'cursor': 'pointer' }} onClick={event => this.hideleft()}><FontAwesomeIcon
                      icon={faTimes}/></Icon>}
                  >
                    <LocaleProvider locale={componentLocal}>
                      <Spin spinning={this.props.rpmuLoading}>
                        <SmartGridView
                          name={'RefundsRPMUColumns'}
                          rowKey={'id'}
                          scroll={{ x: this.state.xsize }}
                          actionColumns={[
                            {
                              title: formatMessage({ id: 'menu.mainview.rpmuName' }),
                              key: 'lastname',
                              order: 0,
                              isVisible: true,
                              width: 100,
                              render: (text, record) => (<div>
                                  {text.lastname + ' ' + text.firstname + ' ' + text.secondname}
                                  <br/>
                                  {'(ИИН: ' + text.iin + ', ДР: ' + text.birthdate + ')'}
                                </div>
                              ),
                            }]}
                          columns={rpmuColumns}
                          rowSelection={false}
                          rowClassName={(record) => {
                            if (record.refundExist) {
                              return 'greenRow';
                            }
                          }
                          }
                          hideFilterBtn={true}
                          hideRefreshBtn={true}
                          dataSource={{
                            total: universal.rpmu.totalElements,
                            pageSize: this.state.rpmu.pagingConfig.length,
                            page: this.state.rpmu.pagingConfig.start + 1,
                            data: universal.rpmu.content,
                          }}
                        />
                        {/*<Table*/}
                        {/*bordered={true}*/}
                        {/*size={'small'}*/}
                        {/*columns={rpmuColumns}*/}
                        {/*dataSource={universal.rpmu.content}*/}
                        {/*rowClassName={(record) => {*/}

                        {/*if (record.refundExist) {*/}
                        {/*console.log(record.refundExist);*/}
                        {/*return 'greenRow';*/}
                        {/*}*/}
                        {/*}*/}
                        {/*}*/}
                        {/*scroll={{ x: 1100 }}/>*/}
                      </Spin>
                    </LocaleProvider>
                  </Card>
                </Animated>
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
                  showExportBtn={true}
                  dataSource={{
                    total: universal.table.totalElements,
                    pageSize: this.state.pagingConfig.length,
                    page: this.state.pagingConfig.start + 1,
                    data: this.props.universal.table.content,
                  }}
                  addonButtons={[
                    <Button onClick={() => this.setStatusRecord(1, formatMessage({ id: 'menu.mainview.approveBtn' }))}
                            disabled={this.btnIsDisabled(hasRole(['FSMS1', 'FSMS2', 'ADMIN']), [this.state.btnhide, this.state.selectedRowKeys.length === 0])}
                            key={'odobrit'} className={'btn-success'}
                    >
                      {formatMessage({ id: 'menu.mainview.approveBtn' })} {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
                    </Button>,

                    <Button onClick={() => this.setStatusRecord(2, formatMessage({ id: 'menu.mainview.cancelBtn' }))}
                            disabled={this.btnIsDisabled(hasRole(['FSMS1', 'FSMS2', 'ADMIN']), [this.state.btnhide, this.state.selectedRowKeys.length === 0])}
                            key={'cancel'}
                            className={'btn-danger'}>
                      {formatMessage({ id: 'menu.mainview.cancelBtn' })} {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
                    </Button>,

                    <Button onClick={() => this.setStatusRecord(3, formatMessage({ id: 'menu.mainview.saveBtn' }))}
                            disabled={this.btnIsDisabled(hasRole(['FSMS1', 'FSMS2', 'ADMIN']), [this.disableBtnIsReceiptDateNull(), this.state.btnhide, this.state.selectedRowKeys.length === 0])}
                            key={'save'}>{formatMessage({ id: 'menu.mainview.saveBtn' })} {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}</Button>,
                    <Button onClick={() => this.setStatusRecord(4, formatMessage({ id: 'menu.mainview.performBtn' }))}
                            disabled={this.btnIsDisabled(hasRole(['FSMS2', 'ADMIN']), [this.disableBtnIsReceiptDateNull(), this.state.btnhide, this.state.selectedRowKeys.length === 0])}
                            key={'run'}>{formatMessage({ id: 'menu.mainview.performBtn' })} {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}</Button>,

                    <Dropdown key={'dropdown'} trigger={['click']} overlay={<Menu>
                      <Menu.Item
                        disabled={this.btnIsDisabled(hasRole(['FSMS2', 'ADMIN']), [this.state.btnhide, this.state.selectedRowKeys.length === 0])}
                        key="1"
                        onClick={this.AppRefundStatusAuto}>
                        {formatMessage({ id: 'menu.mainview.verifyRPMUBtn' })} {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
                      </Menu.Item>
                      {/*<Menu.Item*/}
                      {/*key="2" onClick={this.exportToExcel}>*/}
                      {/*{formatMessage({ id: 'menu.mainview.excelBtn' })}*/}
                      {/*</Menu.Item>*/}
                      <Menu.Item
                        disabled={this.btnIsDisabled(hasRole(['FSMS2', 'ADMIN']), [this.state.selectedRowKeys.length === 0])}
                        key="3"
                        onClick={() => {
                          this.setState({ ModalChangeDateRefund: true });
                        }}>
                        {formatMessage({ id: 'menu.mainview.setDateBtn' })}
                      </Menu.Item>
                      <Menu.Item disabled={hasRole(['ADMIN', 'FSMS2'])} key="4" onClick={() => {
                        this.showModal();
                      }}>
                        {formatMessage({ id: 'menu.mainview.mt102Btn' })}
                      </Menu.Item>

                      <Menu.Item disabled={hasRole(['ADMIN'])} key="5" onClick={() => {
                      }}>

                        <Upload
                          showUploadList={false}
                          openFileDialogOnClick={true}
                          onRemove={() => {

                          }}
                          onPreview={() => {

                          }}
                          onChange={(e) => {
                            if (e.file.status === 'done') {
                              console.log(e.file);
                              this.importXmlAction();
                            }
                          }}>
                          {formatMessage({ id: 'menu.mainview.xmlBtn' })}
                        </Upload>
                      </Menu.Item>
                      <Menu.Item disabled={hasRole(['ADMIN'])} key="6" onClick={() => {
                        this.showGraphic();
                      }}>
                        {formatMessage({ id: 'menu.mainview.infographBtn' })}
                      </Menu.Item>
                      <Menu.Item disabled={hasRole(['FSMS1', 'FSMS2', 'ADMIN'])} key="7" onClick={() => {
                        this.refundsReceiver();
                      }}>
                        {formatMessage({ id: 'menu.mainview.refundreceiver' })}
                      </Menu.Item>
                    </Menu>}>
                      <Button disabled={hasRole(['FSMS2', 'ADMIN'])}
                              key={'action'}>{formatMessage({ id: 'menu.mainview.actionBtn' })} <Icon
                        type="down"/></Button>
                    </Dropdown>,
                  ]}
                  actionExport={() => this.exportToExcel()}
                  onShowSizeChange={(pageNumber, pageSize) => {
                    this.onShowSizeChange(pageNumber, pageSize);
                  }}
                  onSelectCell={(cellIndex, cell) => {

                  }}
                  onSelectRow={(record) => {
                    //console.log(record);
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
