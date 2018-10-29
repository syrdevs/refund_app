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
  Divider,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GridFilter from '@/components/GridFilter';
import paymentsData from './paymentsData';
import moment from 'moment/moment';
import classNames from 'classnames';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const dateFormat = 'YYYY/MM/DD';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const EditableContext = React.createContext();


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

    const testcolumns = [
      { title: 'Референс', dataIndex: 'referance', isVisible: true },
      { title: 'Дата платежа', dataIndex: 'date_payment', isVisible: true },
      { title: 'Сумма', dataIndex: 'summa', isVisible: true },
      { title: 'КНП', width: 80, dataIndex: 'knp' , isVisible: true},
      { title: 'Отправитель (БИН)', width: 120, dataIndex: 'sender_bin' , isVisible: true},
      { title: 'Отправитель (БИК)', width: 120, dataIndex: 'sender_bik' , isVisible: true},
      { title: 'Получатель (Наименование)', width: 130, dataIndex: 'receiver_name' },
      { title: 'Получатель (БИН)', width: 120, dataIndex: 'receiver_bin' },
      { title: 'Получатель (БИК)', width: 120, dataIndex: 'receiver_bik' },
      { title: 'Получатель (Счет)', width: 120, dataIndex: 'receiver_amount' },
    ];

    testcolumns.forEach((column) => {
      column.sorter = (a, b) => a[column.dataIndex].length - b[column.dataIndex].length;
    });

    const testdata = [];

    for (let i = 0; i < 50; i++) {
      var itemRow = {};
      itemRow.referance = 'GCVP_4515' + i;
      itemRow.date_payment = '26.10.2018';
      itemRow.summa = '15119181.644';
      itemRow.knp = '12' + i;
      itemRow.sender_bin = '132131232132' + i;
      itemRow.sender_bik = '12312321' + i;
      itemRow.receiver_name = '13123212' + i;
      itemRow.receiver_bin = '122312321' + i;
      itemRow.receiver_bik = '131231232' + i;
      itemRow.receiver_amount = 'KZ15151515KZT2515';

      testdata.push(itemRow);
    }


    this.setState({
      testcolumns: testcolumns,
      testdata: {
        number: 0,
        size: 15, // in one page
        totalElements: 47983, //total of data
        totalPages: 3199,
        content: testdata,
      },
      dataSource: testdata.slice(0, 10),
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

  componentDidUpdate() {

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
    this.setState({
      dataSource: this.state.testdata.content.slice(min, max),
    });

  };

  handleSelectColumn(column, e) {
    const { testcolumns } = this.state;
    let filteredColumn = testcolumns.map(function(item) {
      if (item.dataIndex === column.dataIndex) {
        item.isVisible = !item.isVisible;
      }

      return item;
    });

    this.setState({
      testcolumns: filteredColumn,
    });
  }

  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      filterContainer: filterContainer == 6 ? 0 : 6,
    }));
  };

  render() {

    const { testdata, testcolumns, dataSource } = this.state;

    const menuItems = testcolumns.map(function(column, index) {
      return (
        <Menu.Item key={index.toString()}>
          <Checkbox
            onChange={this.handleSelectColumn.bind(this, column)}
            checked={column.isVisible}
          >
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
      <Card
        style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
        type="inner"
        title="Платежи РПМУ">
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
        }} bordered={true} size={'small'} columns={testcolumns.filter(column => column.isVisible)} dataSource={dataSource}
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
    );


    return (
      <PageHeaderWrapper title="Платежи МТ100">
        <Tabs type="card">
          <TabPane tab={formatMessage({ id: 'menu.payments.payment100' })} key="1">
            <Row>
              <Col sm={24} md={this.state.filterContainer}>

                <Card
                  style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
                  type="inner"
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
        <br/>
      </PageHeaderWrapper>
    );
  }
}
