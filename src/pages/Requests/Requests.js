import React, { Component } from 'react';
import {
  Card,
  Icon,
  Button,
  Row,
  Col,
  Spin,
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
      pagingConfig: {
        'start': 0,
        'length': 10,
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

  clearFilter = () => {

    this.setState({
      pagingConfig: {
        'start': 0,
        'length': 10,
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
        'length': 10,
        'src': {
          'searched': true,
          'data': filters,
        },
      },
    }, () => {
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

  clearfile = () => {
    this.setState({
      serverFileList: [{
        id: '1',
        filename: '1xxx.png',
      }, {
        id: '2',
        filename: '2yyy.png',
      }, {
        id: '3',
        filename: '3zzz.png',
      }],
    });
  };

  addfile = (e) => {

    const { serverFileList, ModalData } = this.state;

    if (e.file.status === 'uploading') {
      const { dispatch } = this.props;
      dispatch({
        type: 'universal/setfile',
        payload: {
          file: e.file,
          id: ModalData.id,
        },
      });
      /*console.log(e.file);*/
    }
    /*if (e.file.status === 'removed') {
      this.setState({
        serverFileList: serverFileList.filter((obj) => {
          return obj.id !== e.file.uid;
        }),
      });
    }*/
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
        'title': 'Крайняя дата исполнения заявки',
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
        'dataIndex': 'dknpId.id',
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
          render: (text, row) => <a
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
          >{text}</a>,
        });
      }
      else if (['appEndDate'].indexOf(column.dataIndex) !== -1) {
        actionColumns.push({
          ...column,
          order: 3,
          render: (text, row) => <a
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
          >{text}</a>,
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
                      console.log(filters);
                      //this.setFilter(filters);
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
                  showTotal={true}
                  dataSource={{
                    total: dataStore.totalElements,
                    pageSize: this.state.pagingConfig.length,
                    page: this.state.pagingConfig.start + 1,
                    data: dataStore.content,
                  }}
                  onShowSizeChange={(pageNumber, pageSize) => {
                    this.onShowSizeChange(pageNumber, pageSize);
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
