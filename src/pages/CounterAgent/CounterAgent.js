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


@connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects['universal/mainviewtable'],
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
          dataIndex: 'bin',
          isVisible: true,
        }, {
          title: 'Адрес',
          dataIndex: 'address',
          isVisible: true,
        }, {
          title: 'Актуальные контакты',
          dataIndex: 'currentContacts',
          isVisible: true,
        }, {
          title: 'Банковские реквизиты',
          dataIndex: 'account',
          isVisible: true,
        }, {
          title: 'Ответственные лица',
          dataIndex: 'responsiblePersons',
          isVisible: true,
        },
      ],

      xsize: 'auto',

      pagingConfig: {
        'start': 0,
        'length': 15,
        'src': {
          'searched': false,
          'data': {},
        },
      },
    };
  }

  componentWillUnmount() {

  }

  loadMainGridData = () => {

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

    const { universal } = this.props;


    const addonButtons = [
      <Dropdown key={'dropdown'} trigger={['click']} overlay={<Menu>
        <Menu.Item
          disabled={hasRole(['ADMIN']) || true}
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
            {this.state.searchercont === 8 &&
            <DataDiv/>
            }
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
                loading={this.props.loadingData}
                fixedHeader
                rowSelection
                showExportBtn={true}
                actionExport={() => {
                }}
                columns={this.state.columns}
                sorted
                showTotal
                dataSource={{
                  total: 8921,
                  pageSize: this.state.pagingConfig.length,
                  page: this.state.pagingConfig.start + 1,
                  data: [{
                    'id': '1',
                    'code': '00052',
                    'name': 'ТОО TMI Company',
                    'bin': '861207303160',
                    'address': 'Микрорайон 4, дом 34, кв 50',
                    'currentContacts': '+77028596963',
                    'account': 'KZ75125KZT1001300335',
                    'responsiblePersons': 'Ахметов Даурен',
                  }],
                }}
                addonButtons={addonButtons}

                onShowSizeChange={(pageNumber, pageSize) => {
                  {/*<Button
                      disabled={hasRole(['ADMIN'])}
                      key='register_document'
                    >Зарегистрировать договор
                    </Button>,*/
                  }
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
