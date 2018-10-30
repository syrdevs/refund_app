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
import paymentsData from './paymentsData';
import moment from 'moment/moment';
import classNames from 'classnames';
import { connect } from 'dva/index';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const dateFormat = 'YYYY/MM/DD';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const EditableContext = React.createContext();

@connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects['universal2/data'],
}))
export default class PaymentsPage extends Component {
  constructor(props) {
    super(props);


    this.state = {

      testcolumns: [],
      testdata: [],
      dataSource: [],

      count: 0,
      filterContainer: 0,


      filterForm: [],
    };
  }

  componentDidMount() {

    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/columns',
      payload: {
        table: 'payment',
      },
    });
    dispatch({
      type: 'universal2/data',
      payload: {
        table: 'payment',
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
          name: 'date_payment',
          label: 'Дата платежа',
          type: 'betweenDate',
        },
        {
          name: 'knp',
          label: 'КНП',
          type: 'text',
        },
        {
          name: 'bin',
          label: 'БИН',
          type: 'text',
        },
      ],
    });

  }


  applyFilter(dataFilter) {
    console.log(dataFilter);
  }

  clearFilter() {
    console.log('clearead');
  }


  onShowSizeChange = (current, pageSize) => {

    const max = current * pageSize;
    const min = max - pageSize;

    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/data',
      payload: {
        table: 'payment',
      },
    });

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

    const { dataStore, columns } = this.props.universal2;

    let local_helper = this.StorageHelper();
    let StorageColumns = local_helper.get('paymentColumns');
    local_helper.set('paymentColumns', columns, StorageColumns.length === 0 && columns.length !== 0);
    let _columns = local_helper.get('paymentColumns');

    _columns.forEach((column) => {
      column.sorter = (a, b) => a[column.dataIndex].length - b[column.dataIndex].length;
    });

    const menuItems = _columns.map(function(column, index) {
      return (
        <Menu.Item key={index.toString()}>
          <Checkbox
            onChange={this.handleSelectColumn.bind(this, column)}
            checked={column.isVisible === 'true'}>
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

    const DataDiv = () => (
      <Spin tip="Загрузка..." spinning={this.props.loadingData}>
        <Card bordered={false}
          style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
          type="inner">
          <div>
            <Button type={this.state.filterContainer != 6 ? 'default ' : ''} onClick={this.filterPanelState}
                    style={{ margin: '10px 0 10px 15px' }} size="small"><Icon type="search" theme="outlined"/></Button>

            <Button style={{ margin: '10px 0 10px 15px' }} size="small"><Icon type="redo"
                                                                              theme="outlined"/>Обновить</Button>
            <Button style={{ margin: '10px 15px 10px 15px', float: 'right' }} size="small"><Icon type="export"
                                                                                                 theme="outlined"/>Выгрузка
              в
              Excel</Button>
            <div style={{ margin: '10px 15px 10px 15px', float: 'right' }}>
              <Dropdown overlay={menu} placement="bottomRight">
                <Button size={'small'}>
                  <Icon type="setting" theme="outlined"/>
                </Button>
              </Dropdown>
            </div>
          </div>
          <Table components={{
            body: {
              row: SelectableRow,
            },
          }} bordered={true} size={'small'} columns={_columns.filter(column => column.isVisible === 'true')}
                 dataSource={dataStore}
                 scroll={{ x: 1300 }} pagination={false}
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
          </Row>
        </Card>
      </Spin>
    );


    return (
      <PageHeaderWrapper title="Платежи">
        <Card bodyStyle={{ padding: 5 }}>
          <Tabs>
            <TabPane tab={formatMessage({ id: 'menu.payments.payment100' })} key="1">
              <Row>
                <Col sm={24} md={this.state.filterContainer}>
                  <Card
                    bordered={false}
                    style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
                    type="inner"
                    headStyle={{background:'white'}}
                    title="Фильтр"
                    extra={<Button size="small" onClick={this.filterPanelState}><Icon type="close"
                                                                                      theme="outlined"/></Button>}
                  >
                    <GridFilter clearFilter={this.clearFilter} applyFilter={this.applyFilter} key={'1'}
                                filterForm={this.state.filterForm}
                                dateFormat={dateFormat}/>
                  </Card>

                </Col>
                <Col sm={24} md={this.state.filterContainer != 6 ? 24 : 18}>
                  <DataDiv/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab={formatMessage({ id: 'menu.payments.payment102' })} key="2">
              <Row>
                <Col sm={24} md={this.state.filterContainer}>
                  <Card
                    style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
                    type="inner"
                    title="Фильтр"
                    headStyle={{background:'white'}}
                    bordered={false}
                    extra={<Button size="small" onClick={this.filterPanelState}><Icon type="close"
                                                                                      theme="outlined"/></Button>}
                  >
                    <GridFilter clearFilter={this.clearFilter} applyFilter={this.applyFilter} key={'1'}
                                filterForm={this.state.filterForm}
                                dateFormat={dateFormat}/>
                  </Card>
                </Col>
                <Col sm={24} md={this.state.filterContainer != 6 ? 24 : 18}>
                  <DataDiv/>
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
