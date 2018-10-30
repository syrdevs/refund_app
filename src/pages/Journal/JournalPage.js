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
import { connect } from 'dva';

const TabPane = Tabs.TabPane;
const dateFormat = 'YYYY/MM/DD';


@connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects['universal2/data'],
}))
export default class JournalPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      filterContainer: 0,

      dataContent: {
        'size': 15,
        'totalElements': 8921,
        'totalPages': 595,
        'content': [],
      },

      filterForm: [],
    };
  }


  componentDidMount() {

    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/columns',
      payload: {
        table: 'journal',
      },
    });
    dispatch({
      type: 'universal2/data',
      payload: {
        table: 'journal',
      },
    });

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

  applyFilter(dataFilter) {
    console.log(dataFilter);
  }

  clearFilter() {
    console.log('clearead');
  }

  onShowSizeChange = (current, pageSize) => {

    const max = current * pageSize;
    const min = max - pageSize;
    /*this.setState({
      dataSource: this.state.testdata.content.slice(min, max),
    });*/

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

    local_helper.set('journalColumns', filteredColumn, true);

    this.setState({
      columns: filteredColumn,
    });
  }

  refreshTable = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/data',
      payload: {
        table: 'journal',
      },
    });
  };

  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      filterContainer: filterContainer == 6 ? 0 : 6,
    }));
  };


  componentDidUpdate() {

  }

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
    let journalColumns = local_helper.get('journalColumns');
    local_helper.set('journalColumns', columns, journalColumns.length === 0 && columns.length !== 0);
    let _columns = local_helper.get('journalColumns');


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

    const DataDiv = () => (
      <Spin tip="Загрузка..." spinning={this.props.loadingData}>
        <div>
          <Button type={this.state.filterContainer != 6 ? 'default ' : ''} onClick={this.filterPanelState}
                  style={{ margin: '10px 0 10px 15px' }} size="small"><Icon type="search" theme="outlined"/></Button>

          <Button onClick={this.refreshTable} style={{ margin: '10px 0 10px 15px' }} size="small"><Icon type="redo"
                                                                                                        theme="outlined"/>Обновить</Button>
          <div style={{ float: 'right', margin: '10px 0 10px 5px' }}>Количество записей: 15</div>
          <div style={{ margin: '10px 15px 10px 15px', float: 'right' }}>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button size={'small'}>
                <Icon type="setting" theme="outlined"/>
              </Button>
            </Dropdown>
          </div>
        </div>
        <Table bordered={true} size={'small'} columns={_columns.filter(column => column.isVisible === 'true')}
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
