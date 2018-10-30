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

const TabPane = Tabs.TabPane;
const dateFormat = 'YYYY/MM/DD';

export default class JournalPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testdata: [],
      testcolumns: [],
      filterContainer: 0,


      dataContent: {
        'size': 15,
        'totalElements': 8921,
        'totalPages': 595,
        'content':
          [{
            'id': 'B801E0B235D64CC88D1352623AA4DA2C',
            'entryDate': '26.10.2018 20:07',
            'refundId': {
              'id': '382A1F1FE0054D7BBC1141564A87DAE7',
              'gcvpReference': 'GCVP-00037961656',
              'gcvpOrderNum': '35080497 ',
              'gcvpOrderDate': '21.02.2018',
              'personIin': '910716302376',
              'personSurname': 'УАЛИЕВ',
              'personFirstname': 'БАУЫРЖАН',
              'personPatronname': 'АБАЕВИЧ',
              'applicationId': '0606516516515',
            },
            'userId': {
              'username': 'fsms2',
              'iin': '760531401445',
              'surname': 'Сейткалиева',
              'firstname': 'Жанаргуль',
              'patronname': 'Омерхановна',
            },
            'dactionId': {
              'nameRu': 'Исполнено- одобрено',
              'nameKz': null,
            },
          }],
      },

      filterForm: [],
    };
  }

  recurseFormatter() {

  }

  componentDidMount() {


    const testcolumns = [
      {
        'title': 'Дата и время',
        'dataIndex': 'entryDate',
        'isVisible': true,
      },
      {
        'title': 'Номер заяки',
        'dataIndex': 'refundId.applicationId',
        'isVisible': true,
      },
      {
        'title': 'Референс ГК',
        'dataIndex': 'refundId.gcvpReference',
        'isVisible': true,
      },
      {
        'title': 'Номер ПП ГК',
        'dataIndex': 'refundId.gcvpOrderNum',
        'isVisible': true,
      },
      {
        'title': 'Дата ПП ГК',
        'width': 120,
        'dataIndex': 'refundId.gcvpOrderDate',
        'isVisible': true,
      },
      {
        'title': 'Потребитель',
        'width': 120,
        'dataIndex': 'refundId.personIin',
        'isVisible': true,
      },
      {
        'title': 'Логин',
        'width': 130,
        'dataIndex': 'userId.username',
      },
      {
        'title': 'Пользователь',
        'width': 120,
        'dataIndex': 'userId.surname',
      },
      {
        'title': 'Получатель (БИК)',
        'width': 120,
        'dataIndex': 'receiver_bik',
      },
      {
        'title': 'Действие',
        'width': 120,
        'dataIndex': 'Действие',
      },
    ];


    testcolumns.forEach((column) => {
      column.sorter = (a, b) => a[column.dataIndex].length - b[column.dataIndex].length;
    });

    this.setState({
      testcolumns: testcolumns,
      dataSource: this.state.dataContent.content.slice(0, 10),
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
          name: 'date',
          label: 'Дата',
          type: 'betweenDate',
        },
        {
          name: 'iin',
          label: 'ИИН Потребителя',
          type: 'text',
        }, {
          name: 'number_request',
          label: 'Номер заявки',
          type: 'text',
        }, {
          name: 'login',
          label: 'Логин',
          type: 'text',
        }, {
          name: 'action',
          label: 'Действие',
          type: 'combobox',
          store: [{
            id: '0',
            name: 'Исполнено-одобрено',
          }, {
            id: '1',
            name: 'Исполнено',
          }],
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

    const { dataSource, testcolumns } = this.state;

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

    const DataDiv = () => (
      <Spin tip="Загрузка..." spinning={false}>
        <div>
          <Button type={this.state.filterContainer != 6 ? 'default ' : ''} onClick={this.filterPanelState}
                  style={{ margin: '10px 0 10px 15px' }} size="small"><Icon type="search" theme="outlined"/></Button>

          <Button style={{ margin: '10px 0 10px 15px' }} size="small"><Icon type="redo"
                                                                            theme="outlined"/>Обновить</Button>
          <div style={{ float: 'right', margin: '10px 0 10px 5px' }}>Количество записей: 8429</div>
          <div style={{ margin: '10px 15px 10px 15px', float: 'right' }}>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button size={'small'}>
                <Icon type="setting" theme="outlined"/>
              </Button>
            </Dropdown>
          </div>
        </div>
        <Table bordered={true} size={'small'} columns={testcolumns.filter(column => column.isVisible)}
               dataSource={dataSource}
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
      </Spin>
    );

    return (
      <PageHeaderWrapper title="Журнал действий">
        <Card bodyStyle={{ padding: 5 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={'Возвраты'} key="1">
              <Row>
                <Col xs={this.state.filterContainer !== 6 ? 0 : 24} sm={this.state.filterContainer !== 6 ? 0 : 24}
                     md={this.state.filterContainer}>
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
                <Col xs={24} sm={this.state.filterContainer !== 6 ? 0 : 24}
                     md={this.state.filterContainer !== 6 ? 24 : 18}>
                  <DataDiv/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab={'Заявки'} key="2">
              Заявки
            </TabPane>
          </Tabs>
        </Card>
        <br/>
      </PageHeaderWrapper>);
  }

}
