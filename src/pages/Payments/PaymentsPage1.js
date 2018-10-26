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
import paymentsData from './paymentsData';
import moment from 'moment/moment';


const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';

export default class PaymentsPage1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,

      filterContainer: 6,
    };
  }

  componentDidMount() {
    console.log(paymentsData());
  }

  componentDidUpdate() {

  }

  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      filterContainer: filterContainer == 6 ? 0 : 6,
    }));
  };

  render() {
    const testcolumns = [
      { title: 'Full Name', dataIndex: 'name', key: 'name', fixed: 'left' },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: 'Column 1', dataIndex: 'age', key: '1' },
      { title: 'Column 2', dataIndex: 'age', key: '2' },
      { title: 'Column 3', dataIndex: 'address', key: '3' },
      { title: 'Column 4', dataIndex: 'address', key: '4' },
      { title: 'Column 5', dataIndex: 'address', key: '5' },
      { title: 'Column 6', dataIndex: 'address', key: '6' },
      { title: 'Column 7', dataIndex: 'address', key: '7' },
      { title: 'Column 8', dataIndex: 'address', key: '8' },
    ];
    const testdata = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 40,
        address: 'London Park',
      },
      {
        key: '3',
        name: 'John Brown',
        age: 32,
        address: 'New York Park',
      },
      {
        key: '4',
        name: 'Jim Green',
        age: 40,
        address: 'London Park',
      },
      {
        key: '5',
        name: 'John Brown',
        age: 32,
        address: 'New York Park',
      },
      {
        key: '6',
        name: 'Jim Green',
        age: 40,
        address: 'London Park',
      },
      {
        key: '7',
        name: 'John Brown',
        age: 32,
        address: 'New York Park',
      },
      {
        key: '8',
        name: 'Jim Green',
        age: 40,
        address: 'London Park',
      },
      {
        key: '9',
        name: 'John Brown',
        age: 32,
        address: 'New York Park',
      },
      {
        key: '10',
        name: 'Jim Green',
        age: 40,
        address: 'London Park',
      },
    ];

    const SearcherDiv = (prop) => (
      <Card
        bodyStyle={{ padding: 10 }}
        type="inner"
        title="Фильтр"
        extra={<Button size="small" onClick={this.filterPanelState}><Icon type="close" theme="outlined"/></Button>}
      >
        <Form layout={'vertical'}>
          <FormItem label="Дата платежа">
            <RangePicker
              defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
              format={dateFormat}
            />
          </FormItem>
          <FormItem label="БИН">
            <Input style={{ width: '100%' }}/>
          </FormItem>
          <FormItem label="Реферанс">
            <Input style={{ width: '100%' }}/>
          </FormItem>
          <FormItem label="КНП">
            <Input style={{ width: '100%' }}/>
          </FormItem>
          <FormItem>
            <Button style={{ margin: '10px 0 0 15px' }} size={'small'} type="primary" icon="search">
              Искать
            </Button>
            <Button style={{ margin: '10px 0 0 15px' }} size={'small'} icon="delete">Очистить</Button>
          </FormItem>
        </Form>
      </Card>
    );
    const DataDiv = () => (
      <Card
        bodyStyle={{ padding: 0 }}
        type="inner"
        title="Платежи РПМУ"
      >
        <div>
          <Button type={this.state.filterContainer != 6 ? 'default ' : 'primary'} onClick={this.filterPanelState}
                  style={{ margin: '10px 0 0 15px' }} size="small"><Icon type="search" theme="outlined"/></Button>

          <Button style={{ margin: '10px 0 0 15px' }} size="small"><Icon type="redo" theme="outlined"/>Обновить</Button>
          <Button style={{ margin: '10px 15px 0 15px', float: 'right' }} size="small"><Icon type="export"
                                                                                            theme="outlined"/>Выгрузка в
            Excel</Button>
        </div>
        <Table columns={testcolumns} dataSource={testdata} scroll={{ x: 1300 }}/>
      </Card>
    );


    return (
      <PageHeaderWrapper title="Платежи МТ100">
        <Row>
          <Col sm={24} md={this.state.filterContainer}>
            <Card bodyStyle={{ padding: 0 }} bordered={true}>
              <SearcherDiv/>
            </Card>
          </Col>
          <Col sm={24} md={this.state.filterContainer != 6 ? 24 : 18}>
            <Card bodyStyle={{ padding: 0 }} bordered={true}>
              <DataDiv/>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}
