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
import ContractNew from './ContractNew';


const dateFormat = 'DD.MM.YYYY';
export default class ContractTable extends Component  {
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
        title: 'Отчетный период',
        dataIndex: 'report_period',
        isVisible: true,
      },
      {
        title: 'БИН',
        dataIndex: 'bin',
        isVisible: true,
      },
      {
        title: 'Контрагент',
        dataIndex: 'counteragent',
        isVisible: true,
      },
      {
        title: 'Вид договора',
        dataIndex: 'contract_Type',
        isVisible: true,
      },
      {
        title: 'Номер',
        dataIndex: 'number',
        isVisible: true,
      },
      {
        title: 'Дата',
        dataIndex: 'data',
        isVisible: true,
      },
      {
        title: 'Период с',
        dataIndex: 'periodStart',
        isVisible: true,
      },
      {
        title: 'Период по',
        dataIndex: 'periodEnd',
        isVisible: true,
      },
      {
        title: 'Подразделение',
        dataIndex: 'podr',
        isVisible: true,
      },
      {
        title: 'Статус',
        dataIndex: 'status',
        isVisible: true,
      },
    ],


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
          }
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
          }
        ],
        newContract:false
      },
    ],
  };

  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      filterContainer: filterContainer === 6 ? 0 : 6,
    }));
  };

  clearFilter = () => {
    console.log('clear filter');
  };

  applyFilter = (filters) => {
    console.log(filters);
  };


  createConract = () => {
    this.props.createContract(this.state.selectedRowKeys);
  };

  render = () => {
    const contractform = () => {
      /*console.log("test");
      router.push('/acts/add');*/

      this.setState({
        newContract: !this.state.newContract
      })
    };

    const addonButtons = [
      <Button
        onClick={() => this.createConract()}
        disabled={this.state.selectedRowKeys.length === 0}
        className={'btn-success'}
        key={'create_contract'}>Создать
        Акт</Button>,
      <Dropdown key={'dropdown'} trigger={['click']} overlay={<Menu>
        <Menu.Item
          key="1"
          onClick={()=>{
            contractform();
          }}>
          Новый
        </Menu.Item>
        <Menu.Item
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
      </Menu>}>
        <Button
          key={'action'}>{formatMessage({ id: 'menu.mainview.actionBtn' })} <Icon
          type="down"/></Button>
      </Dropdown>,
    ];

    return (<div>
        {this.state.newContract ? <ContractNew/>: <Row>
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
              selectedRowCheckBox={true}
              selectedRowKeys={this.state.selectedRowKeys}
              showExportBtn={true}
              addonButtons={addonButtons}
              actionExport={() => {
                console.log('export');
              }}
              dataSource={{
                total: this.state.dataSource.length,
                pageSize: this.state.pagingConfig.length,
                page: this.state.pagingConfig.start + 1,
                data: this.state.dataSource,
              }}
              onShowSizeChange={(pageNumber, pageSize) => {
                console.log('on paging');
              }}
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
        </Row>}
      </div>
    );
  };
}


