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

@connect(({ universal2, universal, loading }) => ({
  universal2,
  universal,
  loadingData: loading.effects['universal2/data'],
}))
class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [{
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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/columns',
      payload: {
        table: 'requests',
      },
    });
    dispatch({
      type: 'universal2/data',
      payload: {
        table: 'requests',
      },
    });

    this.setState({
      filterForm: [
        {
          name: 'number',
          label: formatMessage({ id: 'menu.filter.numberrequest' }),
          type: 'text',
        },
        {
          name: 'reference',
          label: formatMessage({ id: 'menu.filter.reference' }),
          type: 'text',
        },
        {
          name: 'payNumber',
          label: formatMessage({ id: 'menu.filter.paymentnumber' }),
          type: 'text',
        },
        {
          name: 'RefundComeDate',
          label: formatMessage({ id: 'menu.filter.payment.date' }),
          type: 'betweenDate',
        },
        {
          name: 'RefundFundDate',
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
    console.log(this.state.DataTable);
    this.setState({
      dataSource: this.state.DataTable.content.slice(min, max),
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

  resetshow() {
    this.setState({
      ModalData: {
        id: null,
        key: null,
        value: null,
      },
      ShowModal: false,
    });
  }

  refreshTable = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/data',
      payload: {
        table: 'requests',
      },
    });
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
    const { serverFileList } = this.state;
    if (e.file.status === 'uploading') {
      const { dispatch } = this.props;
      dispatch({
        type: 'universal/setfile',
        payload: { e },
      }).then(() => {
        e.file.uid = this.props.universal.setfile.id;
        e.file.name = this.props.universal.setfile.filename;
        e.file.status = 'done';
        this.setState({
          serverFileList: [
            ...serverFileList,
            { id: this.props.universal.setfile.id, filename: this.props.universal.setfile.filename },
          ],
        });

      });
    }
    if (e.file.status === 'removed') {
      this.setState({
        serverFileList: serverFileList.filter((obj) => {
          return obj.id !== e.file.uid;
        }),
      });
    }
  };

  render() {
    const dateFormat = 'DD.MM.YYYY';
    let { columns, dataStore } = this.props.universal2;

    let actionColumns = [];
    let propColumns = [];

    columns.forEach((column) => {
      if (['receiptAppdateToFsms'].indexOf(column.dataIndex) !== -1) {
        actionColumns.push({
          ...column,
          order:2,
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
          order:3,
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
        {<ModalChangeDate
          visible={this.state.ShowModal}
          serverFileList={this.state.serverFileList}
          coltype={this.state.ColType}
          addfile={(e) => {
            this.addfile(e);
          }}
          clearfile={() => {
            this.clearfile();
          }}
          resetshow={(e) => {
            this.resetshow(e);
          }}
          dataSource={this.state.ModalData}
        />}
        <Card bodyStyle={{ padding: 5 }}>
          <Row>
            <Col sm={24} md={this.state.searchercont}>
              {!this.state.isSearcher &&
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
                  }}
                  applyFilter={() => {
                  }}
                  filterForm={this.state.filterForm}
                  dateFormat={dateFormat}
                />
              </Card>}
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
                  showTotal={false}
                  dataSource={{
                    total: 50,
                    pageSize: 10,
                    page: 1,
                    data: dataStore,
                  }}
                  onShowSizeChange={(pageNumber, pageSize) => {
                    console.log(pageNumber, pageSize);
                  }}
                  onSelectCell={(cellIndex, cell) => {

                  }}
                  onSelectRow={() => {

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
