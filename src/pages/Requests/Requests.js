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
        title: 'МТ 102',
        fixed: 'right',
        width: 50,
        onCell: record => {
          return {
            onClick: () => {
              console.log(record);
            },
          };
        },
        render: () => (
          <Button>
            <Icon type="database" theme="outlined"/>
          </Button>
        ),
      },
        {
          title: 'XML',
          fixed: 'right',
          width: 50,
          onCell: record => {
            return {
              onClick: () => {
                console.log(record);
              },
            };
          },
          render: () => (
            <Button>
              <Icon type="database" theme="outlined"/>
            </Button>
          ),
        }],
      searchercont: 0,
      tablecont: 24,
      isSearcher: false,
      filterForm: [],
      ModalData: {
        id: null,
        key: null,
        value: null,
      },
      ShowModal: false,
    };
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
          label: 'Номер заявки:',
          type: 'text',
        },
        {
          name: 'reference',
          label: 'Референс:',
          type: 'text',
        },
        {
          name: 'payNumber',
          label: 'Номер платежного поручения:',
          type: 'text',
        },
        {
          name: 'RefundComeDate',
          label: 'Дата платежного поручения:',
          type: 'betweenDate',
        },
        {
          name: 'RefundFundDate',
          label: 'Дата поступления заявление в Фонд:',
          type: 'betweenDate',
        },
        {
          name: 'knp',
          label: 'КНП:',
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
      isSearcher: false,
      searchercont: 6,
      tablecont: 18,
    });
  };

  hideleft() {
    this.setState({
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

  handleSelectColumn(column, e) {

    let local_helper = this.StorageHelper();
    const { columns } = this.props.universal2;
    let filteredColumn = columns.map(function(item) {
      if (item.dataIndex === column.dataIndex) {
        item.isVisible = !item.isVisible;
      }
      return item;
    });

    local_helper.set('requestsColumns', filteredColumn, true);

    this.setState({
      columnFiltered: filteredColumn,
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
            console.log('replaceddd///////////////');
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

  render() {
    const dateFormat = 'DD.MM.YYYY';
    const { columns, dataStore } = this.props.universal2;

    let local_helper = this.StorageHelper();
    let StorageColumns = local_helper.get('requestsColumns');
    local_helper.set('requestsColumns', columns, StorageColumns.length === 0 && columns.length !== 0);
    let _columns = local_helper.get('requestsColumns');

    _columns.forEach((column) => {
      column.sorter = (a, b) => a[column.dataIndex].length - b[column.dataIndex].length;

      if (['receiptAppdateToFsms', 'appEndDate'].indexOf(column.dataIndex) !== -1) {
        column.render = (text, row) => <a
          onClick={() => {
            this.setState({
              ShowModal: true,
              ModalData: {
                id: row.id,
                key: column.dataIndex,
                value: text,
              },
            });
          }}
        >{text}</a>;
      }


    });

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
    };

    const menuItems = _columns.map(function(column, index) {
      return (
        <Menu.Item key={index.toString()}>
          <Checkbox
            onChange={this.handleSelectColumn.bind(this, column)}
            checked={column.isVisible}>
            {column.title}
          </Checkbox>
        </Menu.Item>
      );
    }, this);
    const menu = (
      <Menu>
        <Menu.Item>
          <div>Выберите столбцов:</div>
        </Menu.Item>
        {menuItems}
      </Menu>
    );

    return (
      <PageHeaderWrapper title="ЗАЯВКИ">
        {<ModalChangeDate visible={this.state.ShowModal}
                          resetshow={(e) => {
                            this.resetshow(e);
                          }}
                          dataSource={this.state.ModalData}/>}
        <Col sm={24} md={this.state.searchercont}>
          {!this.state.isSearcher &&
          <Card
            style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
            type="inner"
            title="Фильтр"
            extra={<Button onClick={event => this.hideleft()}>х</Button>}
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
            <Card style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}>
              <Row>
                <Button onClick={() => {
                  this.toggleSearcher();
                }}>
                  <Icon type="search"/>
                </Button>
                <Button onClick={this.refreshTable}>
                  <Icon type="redo"/>Обновить
                </Button>

                <div style={{ float: 'right' }}>
                  Количество записей:8580
                </div>
                <div style={{ margin: '0px 15px', float: 'right' }}>
                  <Dropdown overlay={menu} placement="bottomRight">
                    <Button size={'small'}>
                      <Icon type="setting" theme="outlined"/>
                    </Button>
                  </Dropdown>
                </div>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Table
                  components={{
                    body: {
                      row: SelectableRow,
                    },
                  }}
                  rowKey={'id'}
                  dataSource={dataStore}
                  columns={_columns.concat(this.state.columns).filter((column) => column.isVisible)}
                  size={'small'}
                  scroll={{ x: 1300, y: 500 }}
                  onChange={this.handleStandardTableChange}
                  pagination={false}
                />
              </Row>
              <Row>
                <Pagination
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  showSizeChanger
                  onShowSizeChange={this.onShowSizeChange}
                  onChange={this.onShowSizeChange}
                  defaultCurrent={1}
                  total={50}
                />
              </Row>
            </Card>
          </Spin>
        </Col>
      </PageHeaderWrapper>
    );
  }
}

export default Requests;
