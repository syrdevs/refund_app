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
import Actsadd from '../Acts/Actsadd';
import Options from '../Options/Options';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ContractNew from './ContractNew';

const dateFormat = 'DD.MM.YYYY';


@connect(({ universal2 }) => ({
  universal2,
}))
export default class ContractTable extends Component {
  state = {

    selectedRowKeys: null,
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
        title: 'Отчетный период',
        dataIndex: 'periodYear',
        isVisible: true,
      },
      {
        title: 'БИН',
        dataIndex: 'contractParty.bin',
        isVisible: true,
      },
      {
        title: 'Контрагент',
        dataIndex: 'contractParty.organization',
        isVisible: true,
      },
      {
        title: 'Вид договора',
        dataIndex: 'contractType',
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
        title: 'Период с',
        dataIndex: 'dateBegin',
        isVisible: true,
      },
      {
        title: 'Период по',
        dataIndex: 'periodEnd',
        isVisible: true,
      },
      {
        title: 'Подразделение',
        dataIndex: 'division',
        isVisible: true,
      },
      /*{
        title: 'Статус',
        dataIndex: 'status',
        isVisible: true,
      },*/
    ],
    fcolumn: [],
    dataSource: [
      {
        id: '1',
        report_period: 'test',
        bin: 'test',
        counteragent: 'test',
        contract_Type: 'test',
        number: 'test',
        data: '1516512',
        periodStart: '02.12.2018',
        periodEnd: '05.12.2018',
        podr: '06.12.2018',
        status: 'lorem ipsum dolor sit amet',
        children: [
          {
            id: '3',
            report_period: 'test',
            bin: 'test',
            counteragent: 'test',
            contract_Type: 'test',
            number: 'test',
            data: '1516512',
            periodStart: '02.12.2018',
            periodEnd: '05.12.2018',
            podr: '06.12.2018',
            status: 'lorem ipsum dolor sit amet',
          },
        ],
      }, {
        id: '2',
        report_period: 'test',
        bin: 'test',
        counteragent: 'test',
        contract_Type: 'test',
        number: 'test',
        data: '1516512',
        periodStart: '02.12.2018',
        periodEnd: '05.12.2018',
        podr: '06.12.2018',
        status: 'lorem ipsum dolor sit amet',
        children: [
          {
            id: '4',
            report_period: 'test',
            bin: 'test',
            counteragent: 'test',
            contract_Type: 'test',
            number: 'test',
            data: '1516512',
            periodStart: '02.12.2018',
            periodEnd: '05.12.2018',
            podr: '06.12.2018',
            status: 'lorem ipsum dolor sit amet',
          },
        ],
        newContract: false,
      },
    ],
    ShowMain: true,
    ShowAct: false,
    ShowContract: false,
    gridParameters: {
      start: 0,
      length: 15,
      entity: 'contract',
      alias: 'contractList',
      filter: {},
      sort: [],
    },
    title: formatMessage({ id: 'app.module.contracts.title' }),
  };
  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      filterContainer: filterContainer === 6 ? 0 : 6,
    }));
  };
  clearFilter = () => {
    //console.log('clear filter');
  };
  applyFilter = (filters) => {
    // console.log(filters);
  };

  componentWillUnmount() {

  }

  onShowSizeChange = (current, pageSize) => {
    const { dispatch } = this.props;
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
    });
  };

  componentDidMount() {
    this.loadMainGridData();
  }

  render = () => {
    const { universal2 } = this.props;
    const contracts = universal2.references[this.state.gridParameters.entity];


    const addonButtons = [
      <Dropdown key={'dropdown'} trigger={['click']} overlay={<Menu>
        <Menu.Item
          key="1"
          onClick={() => {
            router.push('/contract/counteragent/create');
          }}>
          Новый
        </Menu.Item>
        <Menu.Item
          disabled={this.state.selectedRowKeys === null}
          onClick={() => {
            this.props.history.push({
              pathname: '/contract/counteragent/edit',
              state: {
                data: this.state.selectedRowKeys,
              },
            });
          }}
          key="2">
          Открыть/Изменить
        </Menu.Item>
        <Menu.Item
          key="3">
          Удалить
        </Menu.Item>
        <Menu.Item
          key="4">
          Включить в заявку на оплату
        </Menu.Item>
        <Menu.Item
          key="5"
          onClick={() => {
            //router.push('/contract/contracts/acts/add');
            //console.log(this.state.selectedRowKeys);
            this.props.history.push({
              pathname: '/contract/contracts/acts/add',
              state: {
                data: this.state.selectedRowKeys,
              },
            });
          }
          }
          disabled={this.state.selectedRowKeys === null}
        >
          Создать акт
        </Menu.Item>
      </Menu>}>
        <Button
          key={'action'}>{formatMessage({ id: 'menu.mainview.actionBtn' })} <Icon
          type="down"/></Button>
      </Dropdown>,
    ];
    return (
      <PageHeaderWrapper title={this.state.title}>
        <Card bodyStyle={{ padding: 5 }}>
          <Spin tip={formatMessage({ id: 'system.loading' })} spinning={universal2.loading}>
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
                <SmartGridView
                  scroll={{ x: 'auto' }}
                  name={'ContractMain'}
                  columns={this.state.columns}
                  showTotal={true}
                  /*selectedRowCheckBox={true}
                  selectedRowKeys={this.state.selectedRowKeys}*/
                  showExportBtn={true}
                  addonButtons={addonButtons}
                  actionColumns={this.state.fcolumn}
                  actionExport={() => {
                    // console.log('export');
                  }}
                  dataSource={{
                    total: contracts ? contracts.totalElements : 0,
                    pageSize: this.state.gridParameters.length,
                    page: this.state.gridParameters.start + 1,
                    data: contracts ? contracts.content : [],
                  }}
                  onShowSizeChange={(pageNumber, pageSize) => {
                    // console.log('on paging');
                  }}
                  onRefresh={() => {
                    // console.log('onRefresh');
                  }}
                  onSearch={() => {
                    this.filterPanelState();
                  }}
                  onSelectRow={(record, index) => {
                    this.setState({
                      selectedRowKeys: record,
                    });
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
          </Spin>
        </Card>
      </PageHeaderWrapper>

    );
  };
}


