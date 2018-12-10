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


const dateFormat = 'DD.MM.YYYY';
export default class ContractRequestsTable extends Component  {
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
        dataIndex: 'request_year',
        isVisible: true,
      },
      {
        title: 'Отчетный период(Месяц)',
        dataIndex: 'request_month',
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
        title: 'Оплата',
        dataIndex: 'payments',
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
        name:'Зарегистрировать изменение'
      },
      {
        type:'menu',
        name:'Расторгнуть'
      },
      {
        type:'menu',
        name:'Отобразить (скрыть) иерархию'
      },
      {
        type:'menu',
        name:'Показать сумму'
      },
      {
        type:'menu',
        name:'Зарегистрировать акт выполненных работ'
      }
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
  contractform = () => {
    this.setState({
      newContract: !this.state.newContract
    })
  };

  render = () => {
    const addonButtons = [
      <Dropdown key={'dropdown'} trigger={['click']} overlay={<Menu>
        <Menu.Item
          key="1"
          onClick={()=>{
            //this.contractform();
            router.push('/contract/contractrequests/add');
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
      </Menu>}>
        <Button
          key={'action'}>{formatMessage({ id: 'menu.mainview.actionBtn' })} <Icon
          type="down"/></Button>
      </Dropdown>,
    ];

    return (<PageHeaderWrapper title={formatMessage({ id: 'app.module.contractrequests.title' })}>
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
      </Card>
      </PageHeaderWrapper>
    );
  };
}
