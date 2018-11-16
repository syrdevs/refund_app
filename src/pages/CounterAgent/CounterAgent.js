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
      isForm:false,
      columns: [{
        'title': 'Номер заявки',
        'isVisible': true,
        'dataIndex': 'applicationId.appNumber',
      }, {
        'title': 'Дата заявления плательщика',
        'isVisible': true,
        'dataIndex': 'appPayerDate',
      }, {
        'title': 'Дата заявки',
        'isVisible': true,
        'dataIndex': 'applicationId.appDate',
      }, {
        'title': 'Дата поступления заявления в Фонд',
        'isVisible': true,
        'dataIndex': 'receiptAppdateToFsms',
      }, {
        'title': 'Дата поступления',
        'isVisible': true,
        'dataIndex': 'entryDate',
      }, {
        'title': 'Крайняя дата исполнения заявки',
        'isVisible': true,
        'dataIndex': 'appEndDate',
      },
        {
          'title': 'Сумма возврата',
          'isVisible': true,
          'dataIndex': 'refundPayAmount',

        },
        {
          'title': 'Референс ГК',
          'isVisible': true,
          'dataIndex': 'gcvpReference',
        }, {
          'title': 'Номер плат-го поручения ГК',
          'isVisible': true,
          'dataIndex': 'gcvpOrderNum',
        }, { 'title': 'Дата плат-го поручения ГК', 'dataIndex': 'gcvpOrderDate' }, {
          'title': 'Причина возврата',
          'dataIndex': 'drefundReasonId.nameRu',
        }, { 'title': 'ИИН Потребителя', 'dataIndex': 'personIin' }, {
          'title': 'КНП',
          'dataIndex': 'applicationId.dknpId.id',
        }, {
          'title': 'Номер платежного поручения',
          'dataIndex': 'applicationId.payOrderNum',
        }, {
          'title': 'Дата платежного поручения',
          'dataIndex': 'applicationId.payOrderDate',
        }, { 'title': 'Сумма отчислений', 'dataIndex': 'payAmount' }, {
          'title': 'Дата последнего взноса',
          'dataIndex': 'lastPayDate',
        }, {
          'title': 'Дата осуществления возврата',
          'dataIndex': 'refundDate',
        }, {
          'title': 'Кол-во отчислений и (или) взносов за последние 12 календарных месяцев',
          'dataIndex': 'lastMedcarePayCount',
        }, { 'title': 'Статус страхования', 'dataIndex': 'medinsStatus' }, {
          'title': 'Референс',
          'dataIndex': 'applicationId.reference',
        }, { 'title': 'Причина отказа', 'dataIndex': 'ddenyReasonId.nameRu' }, {
          'title': 'Отчет об отказе',
          'dataIndex': 'refundStatus',
        }, { 'title': 'Осталось дней', 'dataIndex': 'daysLeft' }, {
          'title': 'Дата изменения статуса заявки',
          'dataIndex': 'changeDate',
        }, { 'title': 'Период', 'dataIndex': 'payPeriod' }, {
          'title': 'Веб-сервис (сообщение) ',
          'dataIndex': 'wsStatusMessage',
        }],

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

    const { dispatch } = this.props;

    dispatch({
      type: 'universal/mainviewtable',
      payload: this.state.pagingConfig,
    });
  };

  componentDidMount() {
    this.loadMainGridData();
  }



  toggleSearcher() {}

  toggleItems() {}

  goForm = () => {
    console.log("qweqwe");
    this.setState({
      isForm: !this.state.isForm
    })
  }




  render() {

    const { universal } = this.props;


    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.counteragent' })}>
        <Card bodyStyle={{ padding: 5 }}>
          <Row>
            <Col sm={24} md={this.state.tablecont}>
              {this.state.searchercont === 8 &&
              <DataDiv/>
              }
              {!this.state.isForm &&
              <Spin tip={formatMessage({ id: 'system.loading' })} spinning={this.props.loadingData}>
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
                  columns={this.state.columns}
                  sorted
                  showTotal
                  dataSource={{
                      total: universal.table.totalElements,
                      pageSize: this.state.pagingConfig.length,
                      page: this.state.pagingConfig.start + 1,
                      data: universal.table.content,
                  }}
                  addonButtons={[
                    <Button
                      disabled={hasRole(['ADMIN'])}
                      className='btn-success'
                      onClick={()=>this.goForm()}
                      key='add'
                    >Добавить
                    </Button>,
                    <Button
                      disabled={hasRole(['ADMIN'])}
                      className='btn-danger'
                      key='delete'
                    >Удалить
                    </Button>,
                    <Button
                      disabled={hasRole(['ADMIN'])}
                      type="primary"
                      key='update'
                    >Редактировать
                    </Button>,
                    ]}

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
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CounterAgent;
