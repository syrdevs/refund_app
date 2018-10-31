import React, { Component } from 'react';
import { Card, Table, Icon, Menu, Dropdown, Button, Label, Pagination, Row, Col, Form, Input, DatePicker, Select, Checkbox, Divider, Spin } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import ModalGridView from '@/components/ModalGridView';
import GridFilter from '@/components/GridFilter';
import TableData from './mainView';
import { connect } from 'dva';
import axios from "axios";

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects['universal/mainviewtable'],
}))
class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowModal: false,
      modalVisible: false,
      updateModalVisible: false,
      expandForm: false,
      selectedRows: [],
      formValues: {},
      stepFormValues: {},
      fcolumn: [{
        title: 'Действие',
        key: 'operation',
        isVisible: true,
        width: 100,
        onCell: record => {
          return {
            onClick: () => {
              this.toggleItems(record);
            },
          };
        },
        render: () => (
          <Button size={'small'}>
            <Icon type="database" theme="outlined"/>
          </Button>
        ),
      }],
      columns:[],
      dataSource: [],
      isHidden: true,
      isItems: false,
      isSearcher: false,
      searchercont: 0,
      selectedRowKeys: [],
      tablecont: 24,
      filterForm: [],
      xsize:1300
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/mainviewtable',
      payload: {size:10, page:1},
    });
    dispatch({
      type: 'universal/mainviewcolumn',
      payload: {},
    });
    dispatch({
      type: 'universal/rpmuTable',
      payload: {},
    });
    dispatch({
      type: 'universal/mainModal',
      payload: {},
    });
    dispatch({
      type: 'universal/mainSelect1',
      payload: {},
    });
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
  handleSelectColumn(column, e) {
    let local_helper = this.StorageHelper();
    const { columns } = this.props.universal;
    let filteredColumn = columns.map(function(item) {
      if (item.dataIndex === column.dataIndex) {
        item.isVisible = !item.isVisible;
      }
      return item;
    });

    local_helper.set('maintableColumns', filteredColumn, true);

    this.setState({
      columns: filteredColumn
    });

  }
  onShowSizeChange = (current, pageSize) => {
    const max = current * pageSize;
    const min = max - pageSize;
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/mainviewtable',
      payload: {size:pageSize, page:1},
    });
  };
  showModal = () => {
    this.setState({
      ShowModal: true,
    });
  };
  toggleSearcher() {
    this.setState({
      isHidden: false,
      isItems: true,
      isSearcher: false,
      searchercont: 6,
      tablecont: 18,
    });
  }
  toggleItems() {
    this.setState({
      isHidden: false,
      isItems: false,
      isSearcher: true,
      searchercont: 8,
      tablecont: 16,
    });
  }
  hideleft() {
    if (!this.state.isHidden) {
      this.setState({
        isHidden: true,
        isItems: false,
        isSearcher: false,
        searchercont: 0,
        tablecont: 24,
      });
    }
  }
  selectTable = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  stateFilter = () => {
    return [
      {
        name: 'number',
        label: 'Номер заявки:',
        type: 'text',
      },
      {
        name: 'iin',
        label: 'ИИН Потребителя:',
        type: 'text',
      },
      {
        name: 'RefundStatus',
        label: 'Статус заявки на возврат:',
        type: 'multibox',
        store: this.props.universal.select1,
      },
      {
        name: 'lastDate',
        label: 'Крайная дата:',
        type: 'betweenDate',
      },
      {
        name: 'payerDate',
        label: 'Дата заявления плательщика:',
        type: 'betweenDate',
      },
      {
        name: 'RefundComeDate',
        label: 'Дата поступление заявки на возврат:',
        type: 'betweenDate',
      },
      {
        name: 'RefundFundDate',
        label: 'Дата поступления заявление в Фонд:',
        type: 'betweenDate',
      },
      {
        name: 'RefusalDate',
        label: 'Дата осуществления возврата:',
        type: 'betweenDate',
      },
      {
        name: 'knp',
        label: 'КНП:',
        type: 'multibox',
        store: this.props.universal.select1,
      },
      {
        name: 'RefundReason',
        label: 'Причина возврата:',
        type: 'combobox',
        store: this.props.universal.select1,
      },
      {
        name: 'RefusalReason',
        label: 'Причина отказа:',
        type: 'combobox',
        store: this.props.universal.select1,
      },
    ];
  }


  render() {
    const dateFormat = 'DD.MM.YYYY';
    const { universal} = this.props;

    let local_helper = this.StorageHelper();
    let journalColumns = local_helper.get('maintableColumns');
    local_helper.set('maintableColumns', universal.columns, journalColumns.length === 0 && universal.columns.length !== 0);
    let _columns = local_helper.get('maintableColumns');

    universal.columns.forEach((column) => {
      column.sorter = (a, b) => a[column.dataIndex].length - b[column.dataIndex].length;
    });
    universal.rpmu.columns.forEach((column) => {
      column.sorter = (a, b) => a[column.dataIndex].length - b[column.dataIndex].length;
    });
    const { selectedRowKeys } = this.state;
    const buttons = { margin: 3 };
    const DataDiv = () => (<Card
        style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
        bodyStyle={{ padding: 0 }}
        type="inner"
        title="Платежи РПМУ"
        extra={<Button onClick={event => this.hideleft()}>х</Button>}
      >
        <Table size={'small'} columns={universal.rpmu.columns} dataSource={universal.rpmu.data} scroll={{ x: 1100 }}/>
      </Card>);
    const menuItems = universal.columns.map(function(column, index) {
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
    const menu = (<Menu>
        <Menu.Item>
          <div>Выберите столбцов:</div>
        </Menu.Item>
        {menuItems}
      </Menu>);
    const rowSelection = {
      selectedRowKeys,
      onChange: this.selectTable,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const actionmenu = (<Menu>
      <Menu.Item key="1">
        Сверить с РПМУ {hasSelected ? `(${selectedRowKeys.length})` : ''}
      </Menu.Item>
      <Menu.Item key="2">
        Выгрузка в Excell {hasSelected ? `(${selectedRowKeys.length})` : ''}
      </Menu.Item>
    </Menu>);

    return (
      <PageHeaderWrapper title="РЕЕСТР ВОЗВРАТА">
        <ModalGridView visible={this.state.ShowModal}
                       resetshow={(e) => {this.setState({ ShowModal: false });}}
                       dataSource={universal.mainmodal}/>
            <Row>
              <Col sm={24} md={this.state.searchercont}>
                <div>
                  {!this.state.isSearcher &&
                  <Card
                    style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
                    type="inner"
                    title="Фильтр"
                    extra={<Button onClick={event => this.hideleft()}>х</Button>}
                  >
                  <GridFilter
                    clearFilter={()=>{}}
                    applyFilter={()=>{}}
                    filterForm={this.stateFilter()}
                    dateFormat={dateFormat}/>
                  </Card>}

                  {!this.state.isItems && <DataDiv/>}
                </div>
              </Col>
              <Col sm={24} md={this.state.tablecont}>
                <Card style={{borderRadius: '5px', marginBottom:'10px'}} bodyStyle={{ padding: 0 }} bordered={true}>
                  <Row>
                    <Col span={22}>
                      <Button style={buttons} onClick={this.toggleSearcher.bind(this)}>
                        <Icon type="search" theme="outlined"/>
                      </Button>
                      <Button style={buttons}>Обновить</Button>
                      <Button
                        className={'btn-success'}
                        onClick={() => {
                          this.showModal();
                        }}
                      >
                        Одобрить {hasSelected ? `(${selectedRowKeys.length})` : ''}
                      </Button>
                      <Button
                        className={'btn-danger'}
                        style={buttons}>
                        Отклонить {hasSelected ? `(${selectedRowKeys.length})` : ''}
                      </Button>
                      <Button style={buttons}>Сохранить {hasSelected ? `(${selectedRowKeys.length})` : ''}</Button>
                      <Button style={buttons}>Выполнить {hasSelected ? `(${selectedRowKeys.length})` : ''}</Button>
                      <Dropdown overlay={actionmenu}>
                        <Button style={buttons}>Дейстие</Button>
                      </Dropdown>
                    </Col>
                    <Col span={2}>
                      <div style={{ margin: '5px', float:'right'}}>
                        <Dropdown overlay={menu} placement="bottomRight" >
                          <Button>
                            <Icon type="setting" theme="outlined"/>
                          </Button>
                        </Dropdown>
                      </div>
                    </Col>
                  </Row>
                  <Spin tip="Загрузка..." spinning={this.props.loadingData}>
                    <Row style={{ marginBottom: 20 }}>
                    <Table
                      rowSelection={rowSelection}
                      size={'small'}
                      rowKey={'key'}
                      dataSource={universal.table.content}
                      columns={(this.state.fcolumn.concat(_columns)).filter(column => column.isVisible)}
                      onChange={this.handleStandardTableChange}
                      pagination={false}
                      scroll={{ x: this.state.xsize }}
                    />
                    </Row>
                    <Row style={{marginBottom:'10px'}}>
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
                </Card>
              </Col>
            </Row>
      </PageHeaderWrapper>
    );
  }
}
export default MainView;
