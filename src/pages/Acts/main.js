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
  Divider, InputNumber,
} from 'antd';
import GridFilterCollapsible from '@/components/GridFilterCollapsible';
import SmartGridView from '@/components/SmartGridView';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva/index';
import { faTimes } from '@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import style from '../CounterAgent/Modals/ContragentModalStyle.less';
import DocGridCollapse from '../../components/DocGridFilter/DocGridCollapse';


const dateFormat = 'DD.MM.YYYY';

@connect(({ universal2, loading  }) => ({
  universal2,
  loadingData: loading.effects['universal2/getList'],
}))
export default class ActsTable extends Component  {
  state = {
    selectedRowKeys: [],
    filterContainer: 0,
    filterForm: [
      {
        title: 'Акт фильтр',
        rootKey: 'aktId',
        formElements: [
          {
            label: 'Учетный период(месяц)',
            name: 'periodSection',
            type: 'combobox',
          },
          {
            label: 'Подразделение',
            name: 'division',
            type: 'text',
          },

          {
            label: 'Контрагент',
            name: 'division',
            type: 'text',
          },
          {
            label: 'Договор',
            name: 'division',
            type: 'text',
          },
          {
            label: 'Протокол',
            name: 'division',
            type: 'text',
          },

          {
            label: 'Номер',
            name: 'number',
            type: 'text',
          },
          {
            label: 'Дата',
            name: 'documentDate',
            type: 'dates',
          },
          {
            label: 'Сумма',
            name: 'documentSum',
            type: 'text',
          },
        ]
      },
    ],
    pagingConfig: {
      'start': 0,
      'length': 15,
      'src': {
        'searched': false,
        'data': {},
      },
    },
    fcolumn: [
      {
        title: 'Контрагент',
        dataIndex: 'contract.contragent',
        isVisible: true,
        width : 550,
        order: 3,
        key: 'contract.contragent',
        className: 'action_column',
        render: (item) => {
          if (item){
            return item.bin+"  "+item.organization;
          }
        },
      },
      {
        title: 'Договор',
        dataIndex: 'contract',
        order: 4,
        width: 500,
        key: 'contract',
        className: 'action_column',
        isVisible: true,
        render: (item) => {
          if (item){
            return item.contractType+" №"+item.number+" от "+item.documentDate;
          }
        },
      },
      {
        title: 'Протокол',
        dataIndex: 'protocol',
        order: 5,
        width: 200,
        key: 'operation',
        className: 'action_column',
        isVisible: true,
        render: (e) => {
          if (e)
          {
            return "№"+e.number+" от "+e.documentDate;
          }
        },
      }
    ],
    columns: [
      {
        title: 'Учетный период(год)',
        dataIndex: 'periodYear.year',
        isVisible: true,
      },
      {
        title: 'Учетный период(месяц)',
        dataIndex: 'periodSection.name',
        isVisible: true,
      },
      {
        title: 'Подразделение',
        dataIndex: 'division',
        isVisible: true,
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
        title: 'Сумма',
        dataIndex: 'documentSum',
        isVisible: true,
      },
    ],
    /*buttons:[
      {
        type:'menu',
        name:'Новый'
      },
      {
        type:'menu',
        name:'Открыть/Изменить'
      },
      {
        type:'menu',
        name:'Удалить'
      },
      {
        type:'menu',
        name:'Включить в заявку на оплату'
      },
    ],*/
    dataSource: [
      {
        id: '1',
        act_period_year: 'test',
        act_period_month: 'test',
        bin: 'test',
        counteragent: 'test',
        contract_id: 'test',
        number: '1516512',
        act_date: '02.12.2018',
        payment: '05.12.2018',
        podr: '06.12.2018',
      }, {
        id: '2',
        act_period_year: 'test',
        act_period_month: 'test',
        bin: 'test',
        counteragent: 'test',
        contract_id: 'test',
        number: '1516512',
        act_date: '02.12.2018',
        payment: '05.12.2018',
        podr: '06.12.2018',
        newContract:false
      },
    ],
    gridParameters: {
      start: 0,
      length: 15,
      entity: "act",
      alias: "actList",
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
        entity: "act",
        alias: "actList",
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
        entity: "act",
        alias: "actList",
        filter: filters,
        sort: [],
      },
    }, () => {
      this.loadMainGridData();
    });


  };



  render = () => {
    const { universal2 } = this.props;
    const act = universal2.references[this.state.gridParameters.entity];
    const addonButtons = [
      <Dropdown key={'dropdown'} trigger={['click']} overlay={<Menu>



        {/*<Menu.Item
          key="1"
          onClick={()=>{
            router.push('/contract/acts/add');
          }}>
          Новый
        </Menu.Item>*/}
        <Menu.Item
          key="2"
          disabled={this.state.selectedRowKeys.length!==1}
          onClick={()=>{
            router.push("/contract/acts/viewAct?id="+this.state.selectedRowKeys[0])
          }}>
          Открыть
        </Menu.Item>
        <Menu.Item
          key="3"
          disabled={this.state.selectedRowKeys.length === 0}
        >
          Удалить
        </Menu.Item>
        <Menu.Item
        key="4"
        disabled={this.state.selectedRowKeys.length === 0}
        >
        Включить в заявку на оплату
      </Menu.Item>
        {/*<Menu.Item
          key="5"
          onClick={() =>
            {
              //router.push('/contract/acts/contractrequest/add');
              this.props.history.push({
                pathname: '/contract/acts/contractrequest/add',
                state: {
                  data: act.content.filter(x => this.state.selectedRowKeys.findIndex(a => x.id === a) !== -1),
                  columns: [
                    {
                      title: 'Отчетный период(Год)',
                      dataIndex: 'periodYear.year',
                      isVisible: true,
                      width : 150,
                    },
                    {
                      title: 'Отчетный период(Месяц)',
                      dataIndex: 'periodSection.periodSectionName',
                      isVisible: true,
                      width : 150,
                    },
                    {
                      title: 'БИН',
                      dataIndex: 'contragent.bin',
                      isVisible: true,
                      width : 150,
                    },
                    {
                      title: 'Контрагент',
                      dataIndex: 'contragent.organization',
                      isVisible: true,
                      width : 450,
                    },
                    {
                      title: 'Договор',
                      dataIndex: 'contract.number',
                      isVisible: true,
                      width : 150,
                    },
                    {
                      title: 'Номер',
                      dataIndex: 'number',
                      isVisible: true,
                      width : 150,
                    },
                    {
                      title: 'Дата',
                      dataIndex: 'documentDate',
                      isVisible: true,
                      width : 150,
                    },
                    {
                      title: 'Оплата',
                      dataIndex: 'documentSum',
                      isVisible: true,
                      width : 150,
                    },
                    {
                      title: 'Подразделение',
                      dataIndex: 'division.name',
                      isVisible: true,
                      width : 200,
                    },
                  ],
                  type: "act"
                },
              });
            }
          }
          disabled={this.state.selectedRowKeys.length === 0}>
          Создать заявку
        </Menu.Item>*/}
      </Menu>
      }>
        <Button
          key={'action'}>{formatMessage({ id: 'menu.mainview.actionBtn' })} <Icon
          type="down"/></Button>
      </Dropdown>,
    ];

    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.contract.acts' })}>
        <Spin tip={formatMessage({ id: 'system.loading' })} spinning={this.props.loadingData}>
          <Card
            bodyStyle={{ padding: 5 }}>
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
                    {this.state.filterContainer === 6 && <DocGridCollapse
                      clearFilter={this.clearFilter}
                      applyFilter={(filter) => this.applyFilter(filter)} key={'1'}
                      filterForm={this.state.filterForm}
                      dateFormat={dateFormat}/>}
                </Card>
              </Col>
              <Col sm={24} md={this.state.filterContainer !== 6 ? 24 : 18}>
                <SmartGridView
                    scroll={{ x: 2100 }}
                    name={'ActMain'}
                    columns={this.state.columns}
                    actionColumns={this.state.fcolumn}
                    showTotal={true}
                    selectedRowCheckBox={true}
                    selectedRowKeys={this.state.selectedRowKeys}
                    showExportBtn={true}
                    addonButtons={addonButtons}
                    actionExport={() => {
                    }}
                    dataSource={{
                      total: act ? act.totalElements : 0,
                      pageSize: this.state.gridParameters.length,
                      page: this.state.gridParameters.start + 1,
                      data: act ? act.content : [],
                    }}
                    onShowSizeChange={(pageNumber, pageSize) => {
                    }}
                    onRefresh={() => {
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
