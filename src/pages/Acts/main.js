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
import Actsadd from './Actsadd';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ContractRequestsadd from '../ContractRequests/ContractRequestsadd';


const dateFormat = 'DD.MM.YYYY';
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
        dataIndex: 'act_period_year',
        isVisible: true,
      },
      {
        title: 'Отчетный период(Месяц)',
        dataIndex: 'act_period_month',
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
        title: 'Договор',
        dataIndex: 'contract_id',
        isVisible: true,
      },
      {
        title: 'Номер',
        dataIndex: 'number',
        isVisible: true,
      },
      {
        title: 'Дата',
        dataIndex: 'act_date',
        isVisible: true,
      },
      {
        title: 'Оплата',
        dataIndex: 'payment',
        isVisible: true,
      },
      {
        title: 'Подразделение',
        dataIndex: 'podr',
        isVisible: true,
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
    ShowMain: true,
    Showrequest: false,
    title: formatMessage({ id: 'app.module.acts.title' })
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
    /*this.props.createContract(this.state.selectedRowKeys);*/
  };
  createConractRequest = () => {
    //router.push('/contract/acts/newcontractrequest');
    this.setState({
      ShowMain: false,
      Showrequest: true,
      title: formatMessage({ id: 'app.module.contractrequests.title.add'})
    })
  }

  render = () => {
    /*const contractform = () => {
      /!*console.log("test");
      router.push('/acts/add');*!/

      this.setState({
        newContract: !this.state.newContract
      })
    };*/

    const addonButtons = [
      <Dropdown key={'dropdown'} trigger={['click']} overlay={<Menu>
        <Menu.Item
          key="1"
          onClick={()=>{
            //contractform();
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
        <Menu.Item
          key="5"
          onClick={() => this.createConractRequest()}
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
      <PageHeaderWrapper title={this.state.title}>
        <Card bodyStyle={{ padding: 5 }}>
        {this.state.Showrequest && <ContractRequestsadd
          tomain={()=>{
            this.setState({
              ShowMain: true,
              Showrequest: false,
              title: formatMessage({ id: 'app.module.acts.title'})
            })
          }}
        />}
        {this.state.ShowMain &&
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
          </Row>
        }
      </Card>
      </PageHeaderWrapper>


    );
  };
}
