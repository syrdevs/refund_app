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

export default class PaymentsPage2 extends Component {
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
      { title: 'Референс', dataIndex: 'referance', fixed: 'left' },
      { title: 'Дата платежа', dataIndex: 'date_payment' },
      { title: 'Сумма', dataIndex: 'summa' },
      { title: 'КНП', dataIndex: 'knp' },
      { title: 'Отправитель(БИН)', dataIndex: 'sender_bin' },
      { title: 'Отправитель(БИК)', dataIndex: 'sender_bik' },
      { title: 'Получатель(Наименование)', dataIndex: 'receiver_name' },
      { title: 'Получатель(БИН)', dataIndex: 'receiver_bin' },
    ];

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

    const SearcherDiv = (prop) => (
      <Card
        bodyStyle={{ padding: 10 }}
        type="inner"
        title="Фильтр"
        extra={<Button size="small" onClick={this.filterPanelState}><Icon type="close" theme="outlined"/></Button>}
      >
        <Form layout={'vertical'}>
          Дата платежа:
          <RangePicker
            defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
            format={dateFormat}
          />
          БИН:
          <Input style={{ width: '100%' }}/>
          Реферанс
          <Input style={{ width: '100%' }}/>
          КНП
          <Input style={{ width: '100%' }}/>
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
        title="Платежи РПМУ">
        <div>
          <Button type={this.state.filterContainer != 6 ? 'default ' : 'primary'} onClick={this.filterPanelState}
                  style={{ margin: '10px 0 10px 15px' }} size="small"><Icon type="search" theme="outlined"/></Button>

          <Button style={{ margin: '10px 0 10px 15px' }} size="small"><Icon type="redo"
                                                                            theme="outlined"/>Обновить</Button>
          <Button style={{ margin: '10px 15px 10px 15px', float: 'right' }} size="small"><Icon type="export"
                                                                                               theme="outlined"/>Выгрузка
            в
            Excel</Button>
        </div>
        <Table size={'small'} columns={testcolumns} dataSource={testdata} scroll={{ x: 1300 }}/>
      </Card>
    );


    return (
      <PageHeaderWrapper title="Платежи МТ102">
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
