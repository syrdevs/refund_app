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
  LocaleProvider,
  Select,
  Checkbox,
  Divider,
  Spin,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SmartGridView from '@/components/SmartGridView';
import { connect } from 'dva';
import { getAuthority } from '../../utils/authority';
import { Animated } from 'react-animated-css';
import SampleForm from '../../components/SampleForm';
import reduxRouter from 'umi/router';

function hasRole(roles) {
  let userRoles = getAuthority();
  return !userRoles.some(r => roles.indexOf(r) >= 0);
}


@connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects['universal2/getList'],
}))
class CounterAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      isForm: false,
      columns: [
        // {
        //   title: 'Код',
        //   dataIndex: 'code',
        //   isVisible: true,
        // },
        {
          title: 'БИН/ИИН',
          dataIndex: 'idendifier.identifiervalue',
          isVisible: true,
        },
        {
          title: 'Наименование/Имя',
          dataIndex: 'name',
          width: 360,
          isVisible: true,
        },  {
          title: 'Адрес',
          dataIndex: 'address',
          isVisible: true,
        }, {
          title: 'Актуальные контакты',
          dataIndex: 'contact',
          isVisible: true,
        }, {
          title: 'Банковские реквизиты',
          dataIndex: 'bankAccount.bank',
          isVisible: true,
        }, {
          title: 'Ответственные лица',
          dataIndex: 'representative',
          isVisible: true,
        },
      ],
      selectedRecord: null,
      xsize: 'auto',

      gridParameters: {
        start: 0,
        length: 15,
        alias: 'clinicList',
        entity: 'clinic',
        filter: {},
        sort: [],
      },
    };
  }

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

  toggleSearcher() {

  }

  toggleItems() {

  }

  goForm = () => {
    this.setState({
      isForm: !this.state.isForm,
    });
  };


  render() {

    const { universal2 } = this.props;
    const counterData = universal2.references[this.state.gridParameters.entity];

    const addonButtons = [
      <Dropdown key={'dropdown'} trigger={['click']} overlay={<Menu>
        {/*<Menu.Item*/}
          {/*disabled={hasRole(['ADMIN'])}*/}
          {/*onClick={() => this.goForm()}*/}
          {/*key='add'>*/}
          {/*Добавить*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item*/}
          {/*disabled={hasRole(['ADMIN']) || true}*/}
          {/*key='delete'>*/}
          {/*Удалить*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item*/}
          {/*disabled={hasRole(['ADMIN']) || true}*/}
          {/*key='update'>*/}
          {/*Открыть/изменить*/}
        {/*</Menu.Item>*/}
        <Menu.Item
          disabled={hasRole(['ADMIN']) || this.state.selectedRecord === null}
          key='register_document'
          onClick={() => {
            this.props.history.push({
              pathname: 'create',
              state: {
                data: this.state.selectedRecord,
                // data: counterData.content.filter(x => this.state.selectedRowKeys.findIndex(a => x.id === a) !== -1),
              },
            });
          }}>
          Создать договор
        </Menu.Item>
      </Menu>}>
        <Button
          key={'action'}>{formatMessage({ id: 'menu.mainview.actionBtn' })} <Icon
          type="down"/></Button>
      </Dropdown>,
    ];

    return (
      <Row>
        <Col sm={24} md={this.state.tablecont}>
          {this.state.searchercont === 8 && <DataDiv/>}
          {!this.state.isForm &&
          <Spin tip={formatMessage({ id: 'system.loading' })} spinning={this.props.loadingData}>
            <SmartGridView
              name='CounterAgentPageColumns'
              scroll={{ x: this.state.xsize }}
              fixedBody
              //selectedRowCheckBox
              searchButton={this.state.searchButton}
              // selectedRowKeys={this.state.selectedRowKeys}
              rowKey={'id'}
              fixedHeader
              //rowSelection
              showExportBtn={true}
              actionExport={() => {
              }}
              columns={this.state.columns}
              sorted={true}
              showTotal={true}
              dataSource={{
                total: counterData ? counterData.totalElements : 0,
                pageSize: this.state.gridParameters.length,
                page: this.state.gridParameters.start + 1,
                data: counterData ? counterData.content : [],
              }}
              addonButtons={addonButtons}

              onShowSizeChange={(pageNumber, pageSize) => this.onShowSizeChange(pageNumber, pageSize)}
              onSelectCell={(cellIndex, cell) => {

              }}
              onSelectRow={(record) => {
                this.setState({
                  selectedRecord: record,
                });
              }}
              onFilter={(filters) => {

              }}
              onRefresh={() => {
                this.loadMainGridData();
              }}
              onSearch={() => {

              }}
              onSelectCheckboxChange={(selectedRowKeys) => {
                // this.setState({
                //   selectedRowKeys: selectedRowKeys,
                // });
              }}
            />
          </Spin>}
          {this.state.isForm && <SampleForm/>}
        </Col>

      </Row>
    );
  }
}

export default CounterAgent;
