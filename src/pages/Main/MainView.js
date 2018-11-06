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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons/index';
import { getAuthority } from '../../utils/authority';
import ModalGraphView from '../../components/ModalGraphView';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

function hasRole(roles) {
  let userRoles = getAuthority();
  return !userRoles.some(r => roles.indexOf(r) >= 0);
}


@connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects['universal/mainviewtable'],
}))
class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowModal: false,
      ShowGraph: false,
      modalVisible: false,
      updateModalVisible: false,
      expandForm: false,
      selectedRows: [],
      searchButton: false,
      formValues: {},
      stepFormValues: {},
      fcolumn: [{
        title: 'Платежи',
        order: 1,
        key: 'operation',
        isVisible: true,
        width: 70,
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
      },
        {
          title: 'МТ102',
          order: 2,
          key: 'mt102',
          isVisible: true,
          width: 70,
          onCell: record => {
            return {
              onClick: () => {
                console.log("test success")
                /*const { dispatch } = this.props;
                dispatch({
                  type: 'universal2/getmt102',
                  payload: {},
                });*/
                //this.toggleItems(record);
              },
            };
          },
          render: () => (
            <Button size={'small'}>
              <a href="/api/refund/getfile" download>
              <Icon><FontAwesomeIcon icon={faFileAlt}/></Icon>
              </a>
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

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/clear',
      payload: {
        table: 'requests',
      },
    });
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

  showGraphic = () => {
    this.setState({
      ShowGraph: true,
    });
  };

  toggleSearcher() {
    this.setState({
      searchButton: true,
      isHidden: false,
      searchercont: 7,
      tablecont: 17,
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


  //tested

  selectTable = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  stateFilter = () => {
    return [
      {
        name: 'number',
        label: 'Номер заявки',
        type: 'text',
      },
      {
        name: 'iin',
        label: 'ИИН Потребителя',
        type: 'text',
      },
      {
        name: 'dappRefundStatusId.nameRu',
        label: 'Статус заявки на возврат',
        type: 'multibox',
        store: this.props.universal.select1,
      },
      {
        name: 'lastDate',
        label: 'Крайная дата',
        type: 'betweenDate',
      },
      {
        name: 'payerDate',
        label: 'Дата заявления плательщика',
        type: 'betweenDate',
      },
      {
        name: 'RefundComeDate',
        label: 'Дата поступление заявки на возврат',
        type: 'betweenDate',
      },
      {
        name: 'RefundFundDate',
        label: 'Дата поступления заявление в Фонд',
        type: 'betweenDate',
      },
      {
        name: 'RefusalDate',
        label: 'Дата осуществления возврата',
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
        label: 'Причина возврата',
        type: 'combobox',
        store: this.props.universal.select1,
      },
      {
        name: 'RefusalReason',
        label: 'Причина отказа',
        type: 'combobox',
        store: this.props.universal.select1,
      },
    ];
  };

  rpmuColumn =() => {
    return  [
      {
        title: "Потребитель",
        key: "lastname",
        width: 100,
        render: (text, record) => (<div>
            {text.lastname + ' '+text.firstname+' '+text.secondname}
          <br/>
            {'(ИИН: '+text.iin+', ДР: '+text.birthdate+')'}
          </div>
        )
      },
      {
        title: "Сумма",
        dataIndex: "paymentsum",
        key: "paymentsum",
        width: 80
      },
      {
        title: "Период",
        dataIndex: "paymentperiod",
        key: "paymentperiod",
        width: 70
      },
      {
        title: "КНП",
        dataIndex: "knp",
        key: "knp",
        width: 50
      },
      {
        title: "Референс",
        dataIndex: "reference",
        key: "reference",
        width: 70
      }
    ]
  }


  render() {

    const dateFormat = 'DD.MM.YYYY';

    const { universal } = this.props;

    const rpmuColumns = this.rpmuColumn();

    const DataDiv = () => (<Card
      style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
      bodyStyle={{ padding: 0 }}
      type="inner"
      title="Платежи РПМУ"
      extra={<Icon style={{ 'cursor': 'pointer' }} onClick={event => this.hideleft()}><FontAwesomeIcon icon={faTimes}/></Icon>}
    >
      <Table
        size={'small'}
        columns={rpmuColumns}
        dataSource={universal.rpmu.content}
        rowClassName={(record) => {

          if(record.refundExist){
            console.log(record.refundExist);
            return "greenRow";
          }
        }
        }
        scroll={{ x: 1100 }}/>
    </Card>);

    const GridFilterData = this.stateFilter();


    return (
      <PageHeaderWrapper title="РЕЕСТР ВОЗВРАТОВ">
        <ModalGraphView visible={this.state.ShowGraph}
                        resetshow={(e) => {
                         this.setState({ ShowGraph: false });
                        }}
                       dataSource={universal.mainmodal}/>
        <ModalGridView visible={this.state.ShowModal}
                       resetshow={(e) => {
                         this.setState({ ShowModal: false });
                       }}
                       dataSource={universal.mainmodal}/>
        <Card bodyStyle={{ padding: 5 }}>
          <Row>
            <Col sm={24} md={this.state.searchercont}>
              <div>

                {this.state.searchercont === 7 && <Card
                  style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
                  type="inner"
                  title="Фильтр"
                  headStyle={{
                    padding: '0 14px',
                  }}
                  extra={<Icon style={{ 'cursor': 'pointer' }} onClick={event => this.hideleft()}><FontAwesomeIcon
                    icon={faTimes}/></Icon>}
                >

                  <GridFilter
                    clearFilter={() => {
                    }}
                    applyFilter={(filters) => {
                      console.log(filters);
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
              {/*<Card style={{ borderRadius: '5px', marginBottom: '10px' }} bodyStyle={{ padding: 0 }} bordered={true}>*/}
              <Spin tip="Загрузка..." spinning={this.props.loadingData}>
                <SmartGridView
                  name={'RefundsPageColumns'}
                  scroll={{ x: this.state.xsize }}
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
                  showTotal={false}
                  dataSource={{
                    total: 50,
                    pageSize: 10,
                    page: 1,
                    data: universal.table.content,
                  }}
                  addonButtons={[
                    <Button disabled={hasRole(['FSMS1', 'FSMS2', 'ADMIN'])} key={'odobrit'} className={'btn-success'}
                            >
                      Одобрить {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
                    </Button>,

                    <Button disabled={hasRole(['FSMS1', 'FSMS2', 'ADMIN'])} key={'cancel'}
                            className={'btn-danger'}>
                      Отклонить {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
                    </Button>,

                    <Button disabled={hasRole(['FSMS1', 'FSMS2', 'ADMIN'])}
                            key={'save'}>Сохранить {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}</Button>,
                    <Button disabled={hasRole(['FSMS2', 'ADMIN'])}
                            key={'run'}>Выполнить {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}</Button>,

                    <Dropdown key={'dropdown'} trigger={['click']} overlay={<Menu>
                      <Menu.Item disabled={hasRole(['FSMS2', 'ADMIN'])} key="1">
                        Сверить с
                        РПМУ {this.state.selectedRowKeys.length > 0 && `(${this.state.selectedRowKeys.length})`}
                      </Menu.Item>
                      <Menu.Item key="2">
                        Выгрузить в
                        Excel
                      </Menu.Item>
                      <Menu.Item disabled={hasRole(['FSMS2', 'ADMIN'])} key="3">
                        Установить дату осуществления возврата
                      </Menu.Item>
                      <Menu.Item disabled={hasRole(['ADMIN', 'FSMS2'])} key="4">
                        Сформировать МТ102
                      </Menu.Item>
                      <Menu.Item disabled={hasRole(['ADMIN'])} key="5" onClick={() => {
                        this.showModal();
                      }}>
                        Импортировать выписку XML
                      </Menu.Item>
                      <Menu.Item disabled={hasRole(['ADMIN'])} key="5" onClick={() => {
                        this.showGraphic();
                      }}>
                        Инфографика
                      </Menu.Item>
                    </Menu>}>
                      <Button disabled={hasRole(['FSMS2', 'ADMIN'])} key={'action'}>Действия <Icon
                        type="down"/></Button>
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
              {/*</Card>*/}
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default MainView;
