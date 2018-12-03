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


const dateFormat = 'DD.MM.YYYY';
export default class ContractMain extends Component {
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
        title: 'Родительский договор',
        dataIndex: 'ParentContractId',
        isVisible: true,
      },
      {
        title: 'Вид договора',
        dataIndex: 'ContractTypeId',
        isVisible: true,
      },
      {
        title: 'Рабочий период (год)',
        dataIndex: 'PeriodYearId',
        isVisible: true,
      },
      {
        title: 'Заявки на объем',
        dataIndex: 'ProposalId',
        isVisible: true,
      },
      {
        title: 'Протокол распределения объемов',
        dataIndex: 'PlanProtocolId',
        isVisible: true,
      },
      {
        title: 'Номер договора',
        dataIndex: 'Number',
        isVisible: true,
      },
      {
        title: 'Дата заключения договора',
        dataIndex: 'Date',
        isVisible: true,
      },
      {
        title: 'Дата начала действия договора',
        dataIndex: 'DateBegin',
        isVisible: true,
      },
      {
        title: 'Дата окончания действия договора',
        dataIndex: 'DateEnd',
        isVisible: true,
      },
      {
        title: 'Примечание к договору',
        dataIndex: 'Description',
        isVisible: true,
      },
      {
        title: 'Подразделение ФСМС',
        dataIndex: 'OwnerDepartment',
        isVisible: true,
      },
    ],
    dataSource: [
      {
        id: '1',
        ParentContractId: 'test',
        ContractTypeId: 'test',
        PeriodYearId: 'test',
        ProposalId: 'test',
        PlanProtocolId: 'test',
        Number: '1516512',
        Date: '02.12.2018',
        DateBegin: '05.12.2018',
        DateEnd: '06.12.2018',
        Description: 'lorem ipsum dolor sit amet',
        OwnerDepartment: 'Департамент информационных технологий',
      }, {
        id: '2',
        ParentContractId: 'test1',
        ContractTypeId: 'test1',
        PeriodYearId: 'test1',
        ProposalId: 'test1',
        PlanProtocolId: 'test1',
        Number: '1516515',
        Date: '02.12.2018',
        DateBegin: '05.12.2018',
        DateEnd: '06.12.2018',
        Description: 'lorem ipsum dolor sit amet',
        OwnerDepartment: 'Департамент информационных технологий',
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

    const addonButtons = [
      <Button
        onClick={() => this.createConract()}
        disabled={this.state.selectedRowKeys.length === 0}
        className={'btn-success'}
        key={'create_contract'}>Создать
        договор</Button>,
    ];

    return (<div>
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
      </div>
    );
  };
}
