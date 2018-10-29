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
      { title: 'Референс', dataIndex: 'referance' },
      { title: 'Дата платежа', dataIndex: 'date_payment' },
      { title: 'Сумма', dataIndex: 'summa' },
      { title: 'КНП', width: 80, dataIndex: 'knp' },
      { title: 'Отправитель (БИН)', width: 120, dataIndex: 'sender_bin' },
      { title: 'Отправитель (БИК)', width: 120, dataIndex: 'sender_bik' },
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


    const SearcherDiv = (prop) => (
      <Card
        style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
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
        style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
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
        <Table components={{
          body: {
            row: SelectableRow,
          },
        }} bordered={true} size={'small'} columns={testcolumns} dataSource={testdata}
               scroll={{ x: 1300 }}
        />
      </Card>
    );


    return (
      <PageHeaderWrapper title="Платежи МТ100">
        <Tabs size={'small'} type="card">
          <TabPane tab={formatMessage({ id: 'menu.payments.payment100' })} key="1">
            <Row>
              <Col sm={24} md={this.state.filterContainer}>
                <SearcherDiv/>
              </Col>
              <Col sm={24} md={this.state.filterContainer != 6 ? 24 : 18}>
                <DataDiv/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab={formatMessage({ id: 'menu.payments.payment102' })} key="2">
            <Row>
              <Col sm={24} md={this.state.filterContainer}>
                <Card bodyStyle={{ padding: 5 }} bordered={true}>
                  <SearcherDiv/>
                </Card>
              </Col>
              <Col sm={24} md={this.state.filterContainer != 6 ? 24 : 18}>
                <Card bodyStyle={{ padding: 5 }} bordered={true}>
                  <DataDiv/>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <br/>
      </PageHeaderWrapper>
    );
  }
}
