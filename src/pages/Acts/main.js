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
  Divider, InputNumber, Modal
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
import DocGridFilter from '../../components/DocGridFilter';
import GridFilter from '@/components/GridFilter';
import DropDownAction from '@/components/DropDownAction/';


const dateFormat = 'DD.MM.YYYY';

@connect(({ universal2, loading  }) => ({
  universal2,
  loadingData: loading.effects['universal2/getList'],
}))
export default class ActsTable extends Component  {
  state = {
    selectedRowKeys: [],
    filterContainer: 0,
    filterForm:  [
          {
            label: 'Учетный период(месяц)',
            name: 'periodSection',
            filterName: 'periodSection',
            type: 'combobox',
          },
          {
            label: 'Учетный период(год)',
            displayField: 'year',
            filterName: 'periodYear.id',
            name: 'periodYear',
            type: 'combobox',
          },
          {
            label: 'Подразделение',
            displayField: 'name',
            filterName: 'division.id',
            name: 'divisions',
            type: 'combobox',
          },
          {
            label: 'Контрагент',
            name: 'contragent',
            type: 'text',
          },
          {
            label: 'Договор',
            name: 'contract',
            type: 'text',
          },
          {
            label: 'Протокол',
            name: 'protocol',
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
            filterName: 'periodSection.id',
            type: 'date',
          },
          {
            label: 'Сумма',
            name: 'documentSum',
            type: 'text',
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
        dataIndex: 'division.name',
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
        onClick={()=>{
          let isOne = true;
          act.content.filter(x => this.state.selectedRowKeys.findIndex(a => x.id === a) !== -1).map((item, index, arr)=> {
                arr.map(elem=> {
                  if (elem.periodSection.id!==item.periodSection.id){
                    isOne=false;
                  }
                  if (elem.periodYear.id!==item.periodYear.id){
                    isOne=false;
                  }
                })
          })

          isOne ? this.props.history.push({
            pathname: '/contract/acts/paymentrequestadd',
            state: {
              data: act.content.filter(x => this.state.selectedRowKeys.findIndex(a => x.id === a) !== -1),
              type: 'act'
            },
          }) : Modal.error({
            title: 'Ошибка',
            content: 'Нельзя создать заявку на разные учетные периоды',
          });
        }}
        >
        Включить в заявку на оплату
      </Menu.Item>
      </Menu>
      }>
        <Button
          key={'action'}>{formatMessage({ id: 'menu.mainview.actionBtn' })} <Icon
          type="down"/></Button>
      </Dropdown>,

    ];
    if (this.state.selectedRowKeys.length !== 0) {
      addonButtons.push( <DropDownAction
        contractId={this.state.selectedRowKeys}
        entity={'act'}
        type={2}
      />)
    }

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
                    onShowSizeChange={(pageNumber, pageSize) => this.onShowSizeChange(pageNumber, pageSize)}
                    onRefresh={() => {
                      this.loadMainGridData();
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
