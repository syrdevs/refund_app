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
import GridFilterCollapsible from '@/components/GridFilterCollapsible';
import SmartGridView from '@/components/SmartGridView';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva/index';
import { faTimes } from '@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import style from '../CounterAgent/Modals/ContragentModalStyle.less';


const dateFormat = 'DD.MM.YYYY';

@connect(({ universal2 }) => ({
  universal2,
}))
export default class ActsTable extends Component  {
  state = {
    selectedRowKeys: [],
    filterContainer: 0,
    filterForm: [
      {
        title: 'Договор фильтр',
        rootKey: 'dogovorId',
        formElements: [
          {
            name: 'Number',
            label: 'Номер договора',
            type: 'text',
          },
          {
            name: 'ParentContractId',
            label: 'Номер родительского договора ',
            type: 'text',
          },
          {
            name: 'knp',
            label: 'Вид договора',
            type: 'selectlist',
          },
          {
            name: 'knp',
            label: 'Рабочий период (год)',
            type: 'selectlist',
          },
          {
            name: 'knp',
            label: 'Заявки на объем',
            type: 'selectlist',
          },
          {
            name: 'knp',
            label: 'Протокол распределения объемов',
            type: 'selectlist',
          },
          {
            name: 'Date',
            label: 'Дата заключения договора',
            type: 'date',
          },
          {
            name: 'DateBegin',
            label: 'Дата начала действия договора',
            type: 'date',
          },
          {
            name: 'DateEnd',
            label: 'Дата окончания действия договора',
            type: 'date',
          },
          {
            name: 'OwnerDepartment',
            label: 'Подразделение ФСМС',
            type: 'selectlist',
          }],
      },
      {
        title: 'Заявка фильтр',
        rootKey: 'requestId',
        formElements: [
          {
            name: 'Number',
            label: 'Номер договора',
            type: 'text',
          },
        ],
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
        width : 120,
      },
    ],
    buttons:[
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
    ],
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
    this.setState(({ filterContainer }) => ({
      filterContainer: filterContainer === 6 ? 0 : 6,
    }));
  };

  clearFilter = () => {
  };

  applyFilter = (filters) => {
  };



  render = () => {
    const { universal2 } = this.props;
    const act = universal2.references[this.state.gridParameters.entity];
    const addonButtons = [
      <Dropdown key={'dropdown'} trigger={['click']} overlay={<Menu>
        <Menu.Item
          key="1"
          onClick={()=>{
            router.push('/contract/acts/add');
          }}>
          Новый
        </Menu.Item>
        <Menu.Item
          key="2"
          disabled
        >
          Открыть/Изменить
        </Menu.Item>
        <Menu.Item
          key="3"
          disabled
        >
          Удалить
        </Menu.Item>
        <Menu.Item
        key="4"
        disabled
        >
        Включить в заявку на оплату
      </Menu.Item>
        <Menu.Item
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
                      width : 120,
                    },
                  ],
                  type: "act"
                },
              });
            }
          }
          disabled={this.state.selectedRowKeys.length === 0}>
          Создать заявку
        </Menu.Item>
      </Menu>}>
        <Button
          key={'action'}>{formatMessage({ id: 'menu.mainview.actionBtn' })} <Icon
          type="down"/></Button>
      </Dropdown>,
    ];

    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.contract.acts' })}>
        <Spin tip={formatMessage({ id: 'system.loading' })} spinning={universal2.loading}>
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
                    {this.state.filterContainer === 6 && <GridFilterCollapsible
                      clearFilter={this.clearFilter}
                      applyFilter={(filter) => this.applyFilter(filter)} key={'1'}
                      filterForm={this.state.filterForm}
                      dateFormat={dateFormat}/>}
                </Card>
              </Col>
              <Col sm={24} md={this.state.filterContainer !== 6 ? 24 : 18}>
                <div className={style.SmartGridView}>
                <SmartGridView
                    style={{height:'500px'}}
                    scroll={{ x: 'auto' }}
                    name={'ActMain'}
                    columns={this.state.columns}
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
                      //this.filterPanelState();
                    }}
                    onSelectCheckboxChange={(selectedRowKeys) => {
                      this.setState({
                        selectedRowKeys: selectedRowKeys,
                      });
                    }}
                  />
                </div>
                <br/>
              </Col>
            </Row>
          </Card>
        </Spin>
      </PageHeaderWrapper>


    );
  };
}
