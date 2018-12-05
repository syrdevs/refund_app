import React, { Component } from 'react';
import {
  Card,
  Icon,
  Button,
  Row,
  Col,
  Spin,
  Dropdown,
  Menu,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import GridFilter from '@/components/GridFilter';
import ModalChangeDate from '@/components/ModalChangeDate';
import SmartGridView from '@/components/SmartGridView';
import { faTimes } from '@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Animated } from 'react-animated-css';
import saveAs from 'file-saver';
import moment from 'moment';

@connect(({ universal2, universal, loading }) => ({
  universal2,
  universal,
  loadingData: loading.effects['universal2/data'],
}))
class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          dataIndex: '102',
          title: 'МТ 102',
          width: 50,
          onCell: record => {
            return {
              onClick: () => {
                console.log(record);
              },
            };
          },
          render: () => (
            <Button key={'102'}>
              <Icon type="database" theme="outlined"/>
            </Button>
          ),
        }, {
          dataIndex: 'xml',
          title: 'XML',
          width: 50,
          onCell: record => {
            return {
              onClick: () => {
                console.log(record);
              },
            };
          },
          render: () => (
            <Button key={'xml'}>
              <Icon type="database" theme="outlined"/>
            </Button>
          ),
        }],
      searchercont: 0,
      tablecont: 24,
      isSearcher: false,
      ColType: null,
      filterForm: [],
      ModalData: {
        id: null,
        key: null,
        value: null,
      },
      ShowModal: false,
      searchButton: false,
      serverFileList: [],
      sortedInfo: {},
      pagingConfig: {
        'start': 0,
        'length': 10,
        'src': {
          'searched': false,
          'data': {},
        },
        'sort': [],
      },
    };
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/clear',
      payload: {
        table: 'getApplicationPage',
      },
    });
  }

  loadMainGridData = () => {

    const { dispatch } = this.props;

    dispatch({
      type: 'universal2/data',
      payload: {
        table: 'getApplicationPage',
        ...this.state.pagingConfig,
      },
    });
  };

  clearOrder = () => {

  };

  clearFilter = () => {

    this.setState({
      sortedInfo: {},
      pagingConfig: {
        'start': 0,
        'length': 10,
        'src': {
          'searched': false,
          'data': {},
        },
        'sort': [],
      },
    }, () => {
      this.loadMainGridData();
    });
  };

  setFilter = (filters) => {

    this.setState(prevState => ({
      sortedInfo: {},
      pagingConfig: {
        'start': 0,
        'length': 10,
        'src': {
          'searched': true,
          'data': filters,
        },
        sort: [],
      },
    }), () => {
      this.loadMainGridData();
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    /* dispatch({
       type: 'universal2/columns',
       payload: {
         table: 'requests',
       },
     });*/

    this.loadMainGridData();

    this.setState({
      filterForm: [
        {
          name: 'appNumber',
          label: formatMessage({ id: 'menu.filter.numberrequest' }),
          type: 'text',
        },
        {
          name: 'appDate',
          label: 'Дата заявки',
          type: 'betweenDate',
        },
        {
          name: 'reference',
          label: formatMessage({ id: 'menu.filter.reference' }),
          type: 'text',
        },
        {
          name: 'payOrderNum',
          label: formatMessage({ id: 'menu.filter.paymentnumber' }),
          type: 'text',
        },
        {
          name: 'payOrderDate',
          label: formatMessage({ id: 'menu.filter.payment.date' }),
          type: 'betweenDate',
        },
        {
          name: 'receiptAppdateToFsms',
          label: formatMessage({ id: 'menu.filter.refundadd' }),
          type: 'betweenDate',
        },
        {
          name: 'knp',
          label: formatMessage({ id: 'menu.filter.knp' }),
          type: 'multibox',
        },
      ],
    });
  }

  componentWillReceiveProps(props) {
  }

  onShowSizeChange = (current, pageSize) => {
    const max = current * pageSize;
    const min = max - pageSize;
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/data',
      payload: {
        ...this.state.pagingConfig,
        table: 'getApplicationPage',
        start: current,
        length: pageSize,
      },
    });
  };

  toggleSearcher = () => {
    this.setState({
      searchButton: true,
      isSearcher: false,
      searchercont: 6,
      tablecont: 18,
    });
  };

  hideleft() {
    this.setState({
      searchButton: false,
      searchercont: 0,
      tablecont: 24,
    });
  }

  resetShow = (isGridRefresh) => {
    this.setState({
      /* ModalData: {
         id: null,
         key: null,
         value: null,
       },*/
      ShowModal: false,
    });

    if (isGridRefresh)
      this.refreshTable();
  };

  refreshTable = () => {
    this.loadMainGridData();
  };

  exportToExcel = () => {

    let authToken = localStorage.getItem('token');
    let columns = [
      {
        'title': 'Номер заявки',
        'width': 100,
        'isVisible': true,
        'dataIndex': 'appNumber',
      },
      {
        'title': 'Дата заявки',
        'isVisible': true,
        'dataIndex': 'appDate',
      },
      {
        'title': 'Дата поступления заявления в Фонд',
        'isVisible': true,
        'dataIndex': 'receiptAppdateToFsms',
      },
      {
        'title': 'Дата исполнения заявки',
        'isVisible': true,
        'dataIndex': 'appEndDate',
      },
      {
        'title': 'Номер платежного поручения',
        'isVisible': true,
        'dataIndex': 'payOrderNum',
      },
      {
        'title': 'Дата платежного поручения',
        'isVisible': true,
        'dataIndex': 'payOrderDate',
      },
      {
        'title': 'Референс',
        'isVisible': true,
        'dataIndex': 'reference',
      },
      {
        'title': 'КНП',
        'isVisible': true,
        'dataIndex': 'dknpId.code',
      },
      {
        'title': 'Возвратов',
        'isVisible': true,
        'dataIndex': 'refundCount',
      },
    ];

    fetch('/api/refund/exportToExcel',
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + authToken,
        },
        method: 'post',
        body: JSON.stringify({
          'entityClass': 'application',
          'fileName':formatMessage({ id: 'menu.refunds.requests' }),
          'src': {
            'searched': true,
            'data': this.state.pagingConfig.src.data,
          },
          'columns': columns.filter(column => column.isVisible).map(x => ({ dataIndex: x.dataIndex, title: x.title })),
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
          saveAs(data.raw, moment().format('DDMMYYYY')+data.fileName);
        }
      });
  };

  getservicenote = () => {
    let filename = '';
    let authToken = localStorage.getItem('token');
    let columns = JSON.parse(localStorage.getItem('journalPageColumns'));

    fetch('/api/refund/get/oletter',
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + authToken,
        },
        method: 'post',
        body: JSON.stringify({
          'src': {
            'searched': true,
            'data': this.state.pagingConfig.src.data,
          },
        }),
      })
      .then(response => {
        if (response.ok) {
          let disposition = response.headers.get('content-disposition');

          filename = this.getFileNameByContentDisposition(disposition);
          return response.blob();
        }
      })
      .then(responseBlob => {
        saveAs(responseBlob, filename);
      });
  };
  getFileNameByContentDisposition = (contentDisposition) => {
    let regex = /filename[^;=\n]*=(UTF-8(['"]*))?(.*)/;
    let matches = regex.exec(contentDisposition);
    let filename;
    let filenames;
    if (matches !== null && matches[3]) {
      filename = matches[3].replace(/['"]/g, '');
      let match = regex.exec(filename);
      if (match !== null && match[3]) {
        filenames = match[3].replace(/['"]/g, '').replace('utf-8', '');
      }
    }
    return decodeURI(filenames);
  };

  render() {
    const dateFormat = 'DD.MM.YYYY';
    let { columns, dataStore } = this.props.universal2;

    columns = [
      {
        'title': 'Номер заявки',
        'width': 100,
        'isVisible': true,
        'dataIndex': 'appNumber',
      },
      {
        'title': 'Дата заявки',
        'isVisible': true,
        'dataIndex': 'appDate',
      },
      {
        'title': 'Дата поступления заявления в Фонд',
        'isVisible': true,
        'dataIndex': 'receiptAppdateToFsms',
      },
      {
        'title': 'Дата исполнения заявки',
        'isVisible': true,
        'dataIndex': 'appEndDate',
      },
      {
        'title': 'Номер платежного поручения',
        'isVisible': true,
        'dataIndex': 'payOrderNum',
      },
      {
        'title': 'Дата платежного поручения',
        'dataIndex': 'payOrderDate',
      },
      {
        'title': 'Референс',
        'dataIndex': 'reference',
      },
      {
        'title': 'КНП',
        'dataIndex': 'dknpId.code',
      },
      {
        'title': 'Возвратов',
        'dataIndex': 'refundCount',
      },
    ];

    let actionColumns = [];
    let propColumns = [];

    columns.forEach((column) => {
      if (['receiptAppdateToFsms'].indexOf(column.dataIndex) !== -1) {
        actionColumns.push({
          ...column,
          order: 2,
          render: (text, row) => {
            if (!text) {
              return (<a
                onClick={(e) => {
                  this.setState({
                    ShowModal: true,
                    ColType: column.dataIndex,
                    ModalData: {
                      id: row.id,
                      key: column.dataIndex,
                      value: text,
                    },
                  });
                }}
              >{formatMessage({ id: 'menu.requests.nulldate' })}</a>);
            }
            else {
              return (<a
                onClick={(e) => {
                  this.setState({
                    ShowModal: true,
                    ColType: column.dataIndex,
                    ModalData: {
                      id: row.id,
                      key: column.dataIndex,
                      value: text,
                    },
                  });
                }}
              >{text}</a>);
            }
          },
        });
      }
      else if (['appEndDate'].indexOf(column.dataIndex) !== -1) {
        actionColumns.push({
          ...column,
          order: 3,
          render: (text, row) => {
            if (!text) {
              return (<a
                onClick={(e) => {


                  this.setState({
                    ShowModal: true,
                    ColType: column.dataIndex,
                    ModalData: {
                      id: row.id,
                      key: column.dataIndex,
                      value: text,
                    },
                  });
                }}
              >{formatMessage({ id: 'menu.requests.nulldate' })}</a>);
            }
            else {
              return (<a
                onClick={(e) => {
                  this.setState({
                    ShowModal: true,
                    ColType: column.dataIndex,
                    ModalData: {
                      id: row.id,
                      key: column.dataIndex,
                      value: '',
                    },
                  });
                }}
              >{text}</a>);
            }
          },
        });
      }
      else {
        propColumns.push(column);
      }
    });

    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.refunds.requests' })}>
        {this.state.ShowModal && <ModalChangeDate
          coltype={this.state.ColType}
          dataSource={this.state.ModalData}
          hideModal={this.resetShow}
          dateFormat={dateFormat}
        />}
        <Card bodyStyle={{ padding: 5 }}>
          <Row>
            <Col sm={24} md={this.state.searchercont}>
              {!this.state.isSearcher &&
              <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                <Card
                  style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
                  type="inner"
                  headStyle={{
                    padding: '0 14px',
                  }}
                  title={formatMessage({ id: 'system.filter' })}
                  extra={<Icon style={{ 'cursor': 'pointer' }} onClick={event => this.hideleft()}><FontAwesomeIcon
                    icon={faTimes}/></Icon>}
                >
                  <GridFilter
                    clearFilter={() => {
                      this.clearFilter();
                    }}
                    applyFilter={(filters) => {
                      // console.log(filters);
                      this.setFilter(filters);
                    }}
                    filterForm={this.state.filterForm}
                    dateFormat={dateFormat}
                  />
                </Card>
              </Animated>}
            </Col>
            <Col sm={24} md={this.state.tablecont}>
              <Spin tip={formatMessage({ id: 'system.loading' })} spinning={this.props.loadingData}>
                <SmartGridView
                  name='RequestPageColumns'
                  searchButton={this.state.searchButton}
                  fixedBody={true}
                  rowKey={'id'}
                  loading={this.props.loadingData}
                  fixedHeader={true}
                  rowSelection={true}
                  actionColumns={this.state.columns.concat(actionColumns)}
                  columns={propColumns}
                  sorted={true}
                  sortedInfo={this.state.sortedInfo}
                  showTotal={true}
                  showExportBtn={true}

                  dataSource={{
                    total: dataStore.totalElements,
                    pageSize: this.state.pagingConfig.length,
                    page: this.state.pagingConfig.start + 1,
                    data: dataStore.content,
                  }}
                  actionExport={() => this.exportToExcel()}
                  onShowSizeChange={(pageNumber, pageSize) => {
                    this.onShowSizeChange(pageNumber, pageSize);
                  }}
                  addonButtons={[
                    <Dropdown key={'dropdown'} trigger={['click']} overlay={
                      <Menu>

                        <Menu.Item key="4" onClick={() => {

                          this.getservicenote();
                        }}>
                          {formatMessage({ id: 'menu.requests.servicenote' })}
                        </Menu.Item>
                      </Menu>}>
                      <Button
                        key='action'
                      >{formatMessage({ id: 'menu.mainview.actionBtn' })}
                        <Icon
                          type="down"/>
                      </Button>
                    </Dropdown>,
                  ]}
                  onSort={(column) => {

                    if (Object.keys(column).length === 0) {
                      this.setState(prevState => ({
                        sortedInfo: {},
                        pagingConfig: {
                          ...prevState.pagingConfig,
                          sort: [],
                        },
                      }), () => {
                        this.loadMainGridData();
                      });
                      return;
                    }

                    this.setState(prevState => ({
                      sortedInfo: column,
                      pagingConfig: {
                        ...prevState.pagingConfig,
                        sort: [{ field: column.field, 'desc': column.order === 'descend' }],
                      },
                    }), () => {
                      this.loadMainGridData();
                    });

                  }}
                  onSelectCell={(cellIndex, cell) => {

                  }}
                  onSelectRow={(record) => {

                  }}
                  onFilter={(filters) => {

                  }}
                  onRefresh={() => {
                    this.refreshTable();
                  }}
                  onSearch={() => {
                    this.toggleSearcher();
                  }}
                />
              </Spin>
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Requests;
