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
  Input,
  DatePicker,
  Select,
  Checkbox,
  Spin,
  Divider,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import moment from 'moment';
import ModalGridView from '@/components/ModalGridView';
import GridFilter from '@/components/GridFilter';
import ModalChangeDate from '@/components/ModalChangeDate';
import SmartGridView from '@/components/SmartGridView';
import { faTimes } from '@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const EditableContext = React.createContext();

@connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects['universal2/data'],
}))
class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnFiltered: [],
      modalVisible: false,
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
      },{
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
      }]
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
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push({
        id: i,
        name: 'a' + i,
      });
    }
    this.setState({
      filterForm: [
        {
          name: 'number',
          label: 'Номер заявки',
          type: 'text',
        },
        {
          name: 'reference',
          label: 'Референс',
          type: 'text',
        },
        {
          name: 'payNumber',
          label: 'Номер платежного поручения',
          type: 'text',
        },
        {
          name: 'RefundComeDate',
          label: 'Дата платежного поручения',
          type: 'betweenDate',
        },
        {
          name: 'RefundFundDate',
          label: 'Дата поступления заявление в Фонд',
          type: 'betweenDate',
        },
        {
          name: 'knp',
          label: 'КНП',
          type: 'multibox',
          store: children,
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
  handleStandardTableChange = (e) => {
    console.log(e);
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
  resetshow(e, isOk) {
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

  render() {
    const dateFormat = 'DD.MM.YYYY';
    let { columns, dataStore } = this.props.universal2;

    let actionColumns = [];
    let propColumns = [];

    columns.forEach((column) => {
      if (['receiptAppdateToFsms'].indexOf(column.dataIndex) !== -1) {
        //column.dataIndex = column.dataIndex;
        column.render = (text, row) => <a
          onClick={(e) => {
            this.setState({
              ShowModal: true,
              ColType: "receiptAppdateToFsms",
              ModalData: {
                id: row.id,
                key: column.dataIndex,
                value: text,
              },
            });
          }}
        >{text}</a>;

        actionColumns.push(column);
      }
      else if (['appEndDate'].indexOf(column.dataIndex) !== -1) {
        //column.dataIndex = column.dataIndex;
        column.render = (text, row) => <a
          onClick={(e) => {
            this.setState({
              ShowModal: true,
              ColType: "appEndDate",
              ModalData: {
                id: row.id,
                key: column.dataIndex,
                value: text,
              },
            });
          }}
        >{text}</a>;

        actionColumns.push(column);
      }
      else {
        propColumns.push(column);
      }
    });


    return (
      <PageHeaderWrapper title="ЗАЯВКИ">
        {<ModalChangeDate visible={this.state.ShowModal}
                          serverFileList = {this.state.serverFileList}
                          coltype={this.state.ColType}
                          resetshow={(e) => {
                            this.resetshow(e);
                          }}
                          dataSource={this.state.ModalData}/>}
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
                title="Фильтр"
                extra={<Icon style={{'cursor':'pointer'}} onClick={event => this.hideleft()} ><FontAwesomeIcon icon={faTimes}/></Icon>}
              >
                <GridFilter
                  clearFilter={() => {
                  }}
                  applyFilter={() => {
                  }}
                  filterForm={this.state.filterForm}
                  dateFormat={dateFormat}/>
              </Card>}
            </Col>
            <Col sm={24} md={this.state.tablecont}>
                <Spin tip="Загрузка..." spinning={this.props.loadingData}>
                  <SmartGridView
                    name={'RequestPageColumns'}
                    scroll={{ x: 1300 }}
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
