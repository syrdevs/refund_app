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
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GridFilter from '@/components/GridFilter';
import { faTimes } from '@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SmartGridView from '@/components/SmartGridView';
import { connect } from 'dva';
import { Animated } from 'react-animated-css';

const TabPane = Tabs.TabPane;
const dateFormat = 'YYYY/MM/DD';


@connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects['universal2/journalData'],
}))
export default class JournalPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fcolumn: [
        {
          title: 'Потребитель',
          order: 6,
          key: 'fio',
          isVisible: true,
          width: 150,
          render: (item) => {
            //console.log(i);
            return item.refundId.personSurname + ' ' + item.refundId.personFirstname + ' ' + item.refundId.personPatronname;
          },
        }
      ],
      columns: [{
        'title': 'Дата и время',
        'dataIndex': 'entryDate',
        'isVisible': true,
      }, {
        'title': 'Номер заявки',
        'dataIndex': 'refundId.applicationId.appNumber',
        'isVisible': true,
      }, {
        'title': 'Референс ГК',
        'dataIndex': 'refundId.gcvpReference',
        'isVisible': true,
      }, {
        'title': 'Номер ПП ГК',
        'dataIndex': 'refundId.gcvpOrderNum',
        'isVisible': true,
      }, {
        'title': 'Дата ПП ГК',
        'width': 120,
        'dataIndex': 'refundId.gcvpOrderDate',
        'isVisible': true,
      },
        /*{
        'title': 'Потребитель',
        'width': 120,
        'dataIndex': 'refundId.personSurname',
        'isVisible': true,

      },*/
        /*, {
          'title': 'Логин',
          'width': 130,
          'dataIndex': 'userId.username',
        },  {
          'title': 'Получатель (БИК)',
          'width': 120,
          'dataIndex': 'receiver_bik',
        },*/ {
          'title': 'Действие',
          'width': 120,
          'dataIndex': 'dactionId.nameRu',
        },{
          'title': 'Пользователь',
          'width': 120,
          'dataIndex': 'userId.userName',
        },
      ],
      filterContainer: 0,
      searchButton: false,
      filterForm: [{
        name: 'date',
        label: 'Дата',
        type: 'betweenDate',
      }],
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
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/clear',
      payload: {},
    });
  }

  clearFilter = () => {

    this.setState({
      pagingConfig: {
        'start': 0,
        'length': 15,
        'src': {
          'searched': false,
          'data': {},
        },
      },
    }, () => {
      this.loadMainGridData();
    });
  };

  setFilter = (filters) => {

    this.setState({
      pagingConfig: {
        'start': 0,
        'length': 15,
        'src': {
          'searched': true,
          'data': filters,
        },
      },
    }, () => {
      this.loadMainGridData();
    });


  };

  loadMainGridData = () => {

    const { dispatch } = this.props;

    dispatch({
      type: 'universal2/journalData',
      payload: this.state.pagingConfig,
    });


  };

  componentDidMount() {
    this.loadMainGridData();
  }

  applyFilter(dataFilter) {
    console.log(dataFilter);
  }


  onShowSizeChange = (current, pageSize) => {

    const max = current * pageSize;
    const min = max - pageSize;
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/journalData',
      payload: {
        ...this.state.pagingConfig,
        start: current,
        length: pageSize,
      },
    });
  };


  refreshTable = () => {
    this.loadMainGridData();
  };

  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      searchButton: filterContainer == 6 ? 0 : 6,
      filterContainer: filterContainer == 6 ? 0 : 6,
    }));
  };

  render() {

    const { dataStore, columns } = this.props.universal2;

    const DataDiv = () => (
      <Spin tip="Загрузка..." spinning={this.props.loadingData}>
        <SmartGridView
          name={'journalPageColumns'}
          searchButton={this.state.searchButton}
          fixedBody={true}
          rowKey={'entryDate'}
          loading={this.props.loadingData}
          fixedHeader={true}
          rowSelection={true}
          columns={this.state.columns}
          actionColumns={this.state.fcolumn}
          sorted={true}
          showTotal={false}
          dataSource={{
            total: dataStore.totalElements,
            pageSize: this.state.pagingConfig.length,
            page: this.state.pagingConfig.start + 1,
            data: dataStore.content,
          }}
          onShowSizeChange={(pageNumber, pageSize) => {
            console.log(pageNumber, pageSize);
          }}
          onSelectCell={(cellIndex, cell) => {

          }}
          onSelectRow={() => {

          }}
          onFilter={(filters) => {

          }}
          onRefresh={() => {
            this.refreshTable();
          }}
          onSearch={() => {
            this.filterPanelState();
          }}
        />
      </Spin>
    );

    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.journal.title' })}>
        <Card bodyStyle={{ padding: 5 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={formatMessage({ id: 'menu.journal.refunds' })} key="1">
              <Row>
                <Col xs={this.state.filterContainer !== 6 ? 0 : 24} sm={this.state.filterContainer !== 6 ? 0 : 24}
                     md={this.state.filterContainer}>
                  <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                    <Card
                      headStyle={{
                        padding: '0 14px',
                      }}
                      style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
                      type="inner"
                      title={formatMessage({ id: 'system.filter' })}
                      extra={<Icon style={{ 'cursor': 'pointer' }} onClick={this.filterPanelState}><FontAwesomeIcon
                        icon={faTimes}/></Icon>}
                    >
                      <GridFilter clearFilter={this.clearFilter} applyFilter={this.setFilter} key={'1'}
                                  filterForm={this.state.filterForm}
                                  dateFormat={dateFormat}/>
                    </Card>
                  </Animated>

                </Col>
                <Col xs={24} sm={this.state.filterContainer !== 6 ? 0 : 24}
                     md={this.state.filterContainer !== 6 ? 24 : 18}>
                  <DataDiv/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab={formatMessage({ id: 'menu.journal.requests' })} key="2">
              Заявки
            </TabPane>
          </Tabs>
        </Card>
        <br/>
      </PageHeaderWrapper>);
  }

}
