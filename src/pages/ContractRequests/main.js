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
import GridFilter from '@/components/GridFilter';
import GridFilterCollapsible from '@/components/GridFilterCollapsible';
import SmartGridView from '@/components/SmartGridView';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva/index';
import { faTimes } from '@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import router from 'umi/router';
import ContractRequestsadd from './ContractRequestsadd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DocGridCollapse from '../../components/DocGridFilter/DocGridCollapse';
import DropDownAction from '@/components/DropDownAction/';


const dateFormat = 'DD.MM.YYYY';

@connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects['universal2/getList'],
}))
export default class ContractRequestsTable extends Component  {
  state = {
    selectedRowKeys: [],
    filterContainer: 0,
    filterForm:  [
      {
        label: 'Подразделение',
        displayField: 'name',
        filterName: 'divisions',
        name: 'divisions',
        type: 'combobox',
      },
      {
        label: 'Учетный период(месяц)',
        name: 'periodSection',
        filterName: 'periodSection',
        type: 'combobox',
      },
      {
        label: 'Учетный период(год)',
        displayField: 'year',
        filterName: 'periodYear',
        name: 'periodYear',
        type: 'combobox',
      },
      {
        label: 'Вид заявки',
        filterName: 'paymentRequestType',
        name: 'paymentRequestType',
        type: 'combobox',
      },
      {
        label: 'Номер',
        name: 'number',
        type: 'text',
      },
      {
        label: 'Дата',
        name: 'documentDate',
        filterName: 'periodSection',
        type: 'date',
      },
      {
        label: 'Сумма',
        name: 'documentSum',
        type: 'text',
      },
      /*{
        label: 'Статус',
        name: 'documentStatus',
        type: 'combobox',
      },*/
    ],
    pagingConfig: {
      'start': 0,
      'length': 15,
      'src': {
        'searched': false,
        'data': {},
      },
    },
    columns: [
        {
          title: 'Подразделение',
          dataIndex: 'division.name',
          isVisible: true,
        },
        {
          title: 'Учетный период: год',
          dataIndex: 'periodYear.year',
          isVisible: true,
        },
        {
          title: 'Учетный период: месяц',
          dataIndex: 'periodSection.name',
          isVisible: true,
        },
        {
          title: 'Вид заявки',
          dataIndex: 'paymentRequestType.nameRu',
          isVisible: true,
          width: 500
        },
        {
          title: 'Номер',
          dataIndex: 'number',
          isVisible: true,
        },
        {
          title: 'Дата',
          dataIndex: 'documentDate',
          isVisible: true,
        },
        {
          title: 'Сумма, т',
          dataIndex: 'documentSum',
          isVisible: true,
        },
        {
          title: 'Статус',
          dataIndex: 'documentStatus.statusName',
          isVisible: true,
        },
        {
          title: 'Файлы',
          dataIndex: 'documentAttacmentsCount',
          isVisible: true,
        },
    ],
    dataSource: [
      {
        id: '1',
        request_year: 'test',
        request_month: 'test',
        number: 'test',
        data: 'test',
        payments: 'test',
        podr: '1516512',
        children: [
          {
            id: '3',
            request_year: 'test',
            request_month: 'test',
            number: 'test',
            data: 'test',
            payments: 'test',
            podr: '1516512',
          }
        ],
      }, {
        id: '2',
        request_year: 'test',
        request_month: 'test',
        number: 'test',
        data: 'test',
        payments: 'test',
        podr: '1516512',
        children: [
          {
            id: '4',
            request_year: 'test',
            request_month: 'test',
            number: 'test',
            data: 'test',
            payments: 'test',
            podr: '1516512',
          }
        ],
        newContract:false
      },
    ],
    gridParameters: {
      start: 0,
      length: 15,
      entity: "paymentRequest",
      alias: "paymentRequestList",
      filter: {},
      sort: [],
    },
  };

  onShowSizeChange = (current, pageSize) => {
    const {dispatch} = this.props;
    this.setState(prevState => ({
      gridParameters: {
        ...prevState.gridParameters,
        start: current,
        length: pageSize,
      },
    }), () => dispatch({
      type: 'universal2/getList',
      payload: {
        ...this.state.gridParameters,
        start: current,
        length: pageSize,
      },
    }));
  };

  loadMainGridData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/getList',
      payload: this.state.gridParameters,
    }).then(()=>{
      console.log(this.props.universal2.references.paymentRequest)
    });
  };

  componentDidMount() {
    this.loadMainGridData();
  }



  filterPanelState = () => {
    this.setState({
      filterContainer: this.state.filterContainer === 6 ? 0 : 6,
    });
  };

  clearFilter = () => {

    this.setState({
      gridParameters: {
        start: 0,
        length: 15,
        entity: "paymentRequest",
        alias: "paymentRequestList",
        filter: {},
        sort: [],
      },
    }, () => {
      this.loadMainGridData();
    });
  };
  applyFilter = (filters) => {
    this.setState({
      gridParameters: {
        start: 0,
        length: 15,
        entity: "paymentRequest",
        alias: "paymentRequestList",
        filter: filters,
        sort: [],
      },
    }, () => {
      this.loadMainGridData();
    });


  };

  createConract = () => {
    this.props.createContract(this.state.selectedRowKeys);
  };

  contractform = () => {
    this.setState({
      newContract: !this.state.newContract
    })
  };

  render = () => {
    const { universal2 } = this.props;

    const paymentRequest = universal2.references[this.state.gridParameters.entity];
    console.log(paymentRequest);

    const addonButtons = [
      <Dropdown key={'dropdown'} trigger={['click']} overlay={<Menu>
        {/*<Menu.Item
          key="1"
          onClick={()=>{
            //this.contractform();
            router.push('/contract/contractrequests/add');
          }}>
          Новый
        </Menu.Item>*/}
        <Menu.Item
          key="2"
          disabled={this.state.selectedRowKeys.length!==1}
          onClick={()=>{
            router.push("/contract/contractrequests/add?id="+this.state.selectedRowKeys[0])
          }}
        >
          Открыть
        </Menu.Item>
        <Menu.Item
          key="3"
          disabled={this.state.selectedRowKeys.length===0}
        >
          Удалить
        </Menu.Item>
      </Menu>}>
        <Button
          key={'action'}>{formatMessage({ id: 'menu.mainview.actionBtn' })} <Icon
          type="down"/></Button>
      </Dropdown>,
    ];
    if (this.state.selectedRowKeys.length !== 0) {
      addonButtons.push(<DropDownAction
        contractId={this.state.selectedRowKeys}
        entity={'paymentRequest'}
        type={2}
      />)
    }

    return (
      <PageHeaderWrapper title={formatMessage({ id: 'app.module.contractrequests.title' })}>
        <Spin tip={formatMessage({ id: 'system.loading' })} spinning={this.props.loadingData}>
          <Card bodyStyle={{ padding: 5 }}>
             <Row>
              <Col sm={24} md={this.state.filterContainer}>
                <Card
                  headStyle={{
                    padding: '0 14px',
                  }}
                  bodyStyle={{
                    padding: 5,
                  }}
                  style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
                  type="inner"
                  title={formatMessage({ id: 'system.filter' })}
                  extra={<Icon style={{ 'cursor': 'pointer' }} onClick={this.filterPanelState}><FontAwesomeIcon
                    icon={faTimes}/></Icon>}>
                  {this.state.filterContainer === 6 && <GridFilter
                    clearFilter={() => {
                      this.clearFilter();
                    }}
                    applyFilter={(filters) => {
                      this.applyFilter(filters);
                    }}
                    key={'1'}
                    filterForm={this.state.filterForm}
                    dateFormat={dateFormat}/>}
                </Card>
              </Col>
              <Col sm={24} md={this.state.filterContainer !== 6 ? 24 : 18}>
                <SmartGridView
                  scroll={{ x: 'auto' }}
                  name={'ContractRequestMain'}
                  columns={this.state.columns}
                  showTotal={true}
                  selectedRowCheckBox={true}
                  selectedRowKeys={this.state.selectedRowKeys}
                  showExportBtn={true}
                  addonButtons={addonButtons}
                  actionExport={() => {
                    console.log('export');
                  }}
                  dataSource={{
                    total: paymentRequest ? paymentRequest.totalElements : 0,
                    pageSize: this.state.gridParameters.length,
                    page: this.state.gridParameters.start + 1,
                    data: paymentRequest ? paymentRequest.content : [],
                  }}
                  onShowSizeChange={(pageNumber, pageSize) => this.onShowSizeChange(pageNumber, pageSize)}
                  onRefresh={() => {
                    console.log('onRefresh');
                  }}
                  onSearch={() => {
                    this.filterPanelState();
                  }}
                  onSelectCheckboxChange={(selectedRowKeys) => {
                    this.setState({
                      selectedRowKeys: selectedRowKeys,
                    });
                  }}
                />
                <br/>
              </Col>
            </Row>
          </Card>
        </Spin>
      </PageHeaderWrapper>
    );
  };
}
