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
  Divider,
  Spin,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import ModalGridView from '@/components/ModalGridView';
import GridFilter from '@/components/GridFilter';
import SmartGridView from '@/components/SmartGridView';
import TableData from './mainView';
import { connect } from 'dva';
import axios from 'axios';

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
      searchButton: false,
      formValues: {},
      stepFormValues: {},
      fcolumn: [{
        title: 'Действие',
        order: 1,
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
      columns: [],
      dataSource: [],
      isHidden: true,
      searchercont: 0,
      selectedRowKeys: [],
      tablecont: 24,
      filterForm: [],
      xsize: 1300,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/mainviewtable',
      payload: { size: 10, page: 1 },
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

  onShowSizeChange = (current, pageSize) => {
    const max = current * pageSize;
    const min = max - pageSize;
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/mainviewtable',
      payload: { size: pageSize, page: 1 },
    });
  };
  showModal = () => {
    this.setState({
      ShowModal: true,
    });
  };

  toggleSearcher() {
    this.setState({
      searchButton: true,
      isHidden: false,
      searchercont: 6,
      tablecont: 18,
    });
  }

  toggleItems() {
    this.setState({
      searchButton: false,
      isHidden: false,
      searchercont: 8,
      tablecont: 16,
    });
  }

  hideleft() {
    if (!this.state.isHidden) {
      this.setState({
        isHidden: true,
        searchButton: false,
        searchercont: 0,
        tablecont: 24,
      });
    }
  }

  selectTable = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };
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
  };


  render() {
    const dateFormat = 'DD.MM.YYYY';
    const { universal } = this.props;

    universal.rpmu.columns.forEach((column) => {
      column.sorter = (a, b) => a[column.dataIndex].length - b[column.dataIndex].length;
    });

    const DataDiv = () => (<Card
      style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
      bodyStyle={{ padding: 0 }}
      type="inner"
      title="Платежи РПМУ"
      extra={<Button onClick={event => this.hideleft()}>х</Button>}
    >
      <Table size={'small'} columns={universal.rpmu.columns} dataSource={universal.rpmu.data} scroll={{ x: 1100 }}/>
    </Card>);

    const GridFilterData = this.stateFilter();

    return (
      <PageHeaderWrapper title="РЕЕСТР ВОЗВРАТА">
        <ModalGridView visible={this.state.ShowModal}
                       resetshow={(e) => {
                         this.setState({ ShowModal: false });
                       }}
                       dataSource={universal.mainmodal}/>
        <Row>
          <Col sm={24} md={this.state.searchercont}>
            <div>

              {this.state.searchercont === 6 && <Card
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
                  filterForm={GridFilterData}
                  dateFormat={dateFormat}/>


              </Card>}

              {this.state.searchercont === 8 &&
              <DataDiv/>
              }

            </div>
          </Col>
          <Col sm={24} md={this.state.tablecont}>
            <Card style={{ borderRadius: '5px', marginBottom: '10px' }} bodyStyle={{ padding: 0 }} bordered={true}>
              <Spin tip="Загрузка..." spinning={this.props.loadingData}>
                <SmartGridView
                  name={'RefundsPageColumns'}
                  scroll={{ x: this.state.xsize, y: 360 }}
                  fixedBody={true}
                  selectedRowCheckBox={true}
                  searchButton={this.state.searchButton}
                  selectedRowKeys={this.state.selectedRowKeys}
                  rowKey={'id'}
                  loading={this.props.loadingData}
                  fixedHeader={true}
                  rowSelection={true}
                  actionColumns={this.state.fcolumn}
                  columns={universal.columns}
                  sorted={true}
                  showTotal={true}
                  dataSource={{
                    total: 50,
                    pageSize: 10,
                    page: 1,
                    data: universal.table.content,
                  }}
                  addonButtons={[
                    <Button key={'odobrit'} className={'btn-success'} onClick={() => {
                      this.showModal();
                    }}>
                      Одобрить {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
                    </Button>,

                    <Button key={'cancel'}
                            className={'btn-danger'}>
                      Отклонить {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
                    </Button>,

                    <Button
                      key={'save'}>Сохранить {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}</Button>,
                    <Button
                      key={'run'}>Выполнить {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}</Button>,

                    <Dropdown key={'dropdown'} trigger={['click']} overlay={<Menu>
                      <Menu.Item key="1">
                        Сверить с
                        РПМУ {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
                      </Menu.Item>
                      <Menu.Item key="2">
                        Выгрузка в
                        Excell {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
                      </Menu.Item>
                    </Menu>}>
                      <Button key={'action'}>Дейстие <Icon type="down"/></Button>
                    </Dropdown>,
                  ]}

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
                    console.log('refresh');
                  }}
                  onSearch={() => {
                    this.toggleSearcher();
                  }}
                  onSelectCheckboxChange={(selectedRowKeys) => {
                    this.setState({
                      selectedRowKeys: selectedRowKeys,
                    });
                  }}
                />
                <br/>
              </Spin>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default MainView;
