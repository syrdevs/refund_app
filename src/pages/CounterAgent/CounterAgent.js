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


@connect(({ universal2 }) => ({
  universal2,
}))
class CounterAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      isForm: false,
      columns: [
        {
          title: 'Код',
          dataIndex: 'code',
          isVisible: true,
        }, {
          title: 'Наименование/Имя',
          dataIndex: 'name',
          isVisible: true,
        }, {
          title: 'Идентификатор',
          dataIndex: 'idendifier.value',
          isVisible: true,
        }, {
          title: 'Адрес',
          dataIndex: 'address',
          isVisible: true,
        }, {
          title: 'Актуальные контакты',
          dataIndex: 'contact',
          isVisible: true,
        }, {
          title: 'Банковские реквизиты',
          dataIndex: 'bankAccount.account',
          isVisible: true,
        }, {
          title: 'Ответственные лица',
          dataIndex: 'representative',
          isVisible: true,
        },
      ],

      xsize: 'auto',

      gridParameters: {
        start: 0,
        length: 10,
        alias: 'clinicList',
        entity: 'clinic',
        filter: {},
        sort: [],
      },
    };
  }

  componentWillUnmount() {

  }

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
        <Menu.Item
          disabled={hasRole(['ADMIN'])}
          onClick={() => this.goForm()}
          key='add'>
          Добавить
        </Menu.Item>
        <Menu.Item
          disabled={hasRole(['ADMIN']) || true}
          key='delete'>
          Удалить
        </Menu.Item>
        <Menu.Item
          disabled={hasRole(['ADMIN']) || true}
          key='update'>
          Открыть/изменить
        </Menu.Item>
        <Menu.Item
          disabled={hasRole(['ADMIN']) || this.state.selectedRowKeys.length === 0}
          key='register_document'
          onClick={() => {
            /*
            * {
                  'id': '1',
                  'code': '00052',
                  'name': 'ТОО TMI Company',
                  'bin': '861207303160',
                  'address': 'Микрорайон 4, дом 34, кв 50',
                  'currentContacts': '+77028596963',
                  'account': 'KZ75125KZT1001300335',
                  'responsiblePersons': 'Ахметов Даурен',
                }
            * */
            //console.log(this.state.selectedRowKeys);
            // this.props.history.push({
            //   pathname:"create",
            //   // state:{
            //   //   key:"value"
            //   // }
            // });

            //reduxRouter.push("create");

            this.props.history.push({
              pathname: 'create',
              state: {
                data: {
                  'id': '1',
                  'code': '00052',
                  'name': 'ТОО TMI Company',
                  'bin': '861207303160',
                  'address': 'Микрорайон 4, дом 34, кв 50',
                  'currentContacts': '+77028596963',
                  'account': 'KZ75125KZT1001300335',
                  'responsiblePersons': 'Ахметов Даурен',
                },
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
          <Spin tip={formatMessage({ id: 'system.loading' })} spinning={false}>
            <SmartGridView
              name='SamplePageColumns'
              scroll={{ x: this.state.xsize }}
              fixedBody
              selectedRowCheckBox
              searchButton={this.state.searchButton}
              selectedRowKeys={this.state.selectedRowKeys}
              rowKey={'id'}
              fixedHeader
              rowSelection
              showExportBtn={true}
              actionExport={() => {
              }}
              columns={this.state.columns}
              sorted
              showTotal
              dataSource={{
                total: counterData ? counterData.totalElements : 0,
                pageSize: counterData ? counterData.size : 0,
                page: this.state.gridParameters.start + 1,
                data: counterData ? counterData.content : [],
              }}
              addonButtons={addonButtons}

              onShowSizeChange={(pageNumber, pageSize) => {

              }}
              onSelectCell={(cellIndex, cell) => {

              }}
              onSelectRow={() => {

              }}
              onFilter={(filters) => {

              }}
              onRefresh={() => {

              }}
              onSearch={() => {

              }}
              onSelectCheckboxChange={(selectedRowKeys) => {
                this.setState({
                  selectedRowKeys: selectedRowKeys,
                });
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
