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
import saveAs from 'file-saver';
import moment from 'moment';

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
          order: 8,
          key: 'fio',
          isVisible: true,
          width: 200,
          render: (item) => {
            //console.log(i);
            return item.refundId.personSurname + ' ' + item.refundId.personFirstname + ' ' + item.refundId.personPatronname;
          },
        },
      ],
      columns: [{
        'title': 'Дата и время',
        'dataIndex': 'entryDate',
        'width': 200,
        'isVisible': true,
      }, {
        'title': 'Номер заявки',
        'dataIndex': 'refundId.applicationId.appNumber',
        'width': 200,
        'isVisible': true,
      }, {
        'title': 'Референс ГК',
        'dataIndex': 'refundId.gcvpReference',
        'width': 200,
        'isVisible': true,
      }, {
        'title': 'Номер ПП ГК',
        'dataIndex': 'refundId.gcvpOrderNum',
        'width': 200,
        'isVisible': true,
      }, {
        'title': 'Дата ПП ГК',
        'width': 200,
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
          'width': 200,
          'dataIndex': 'dactionId.nameRu',
        },
        {
          'title': 'Действие(до)',
          'width': 200,
          'dataIndex': 'prev_dactionId.nameRu',
        },
        {
          'title': 'Пользователь',
          'width': 200,
          'dataIndex': 'userId.userName',
        },
      ],
      filterContainer: 0,
      searchButton: false,
      filterForm: [
        {
          name: 'entryDate',
          label: 'Дата и время',
          type: 'betweenDate',
        }, {
          name: 'appNumber',
          label: 'Номер заявки',
          type: 'text',
        }, {
          name: 'gcvpReference',
          label: 'Референс ГК',
          type: 'text',
        }, {
          name: 'gcvpOrderNum',
          label: 'Номер ПП ГК',
          type: 'text',
        }, {
          name: 'gcvpOrderDate',
          label: 'Дата ПП ГК',
          type: 'betweenDate',
        }, {
          name: 'dappRefundStatus',
          label: 'Действие',
          type: 'multibox',
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
        'length': this.state.pagingConfig.length,
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

  exportToExcel = () => {
    let filename = "";
    let authToken = localStorage.getItem('token');
    let columns = JSON.parse(localStorage.getItem('journalPageColumns'));

    fetch('/api/refund/exportToExcel',
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + authToken,
        },
        method: 'post',
        body: JSON.stringify({
          'entityClass': 'refund_history',
          'fileName':'Журнал действий',
          'src': {
            'searched': true,
            'data': this.state.pagingConfig.src.data,
          },
          'columns': [].concat(columns.filter(column => column.isVisible)),
        }),
      })
      .then(response => {if(response.ok){
        let disposition = response.headers.get("content-disposition");

        filename = this.getFileNameByContentDisposition(disposition);
        return response.blob();
      }})
      .then(responseBlob => {saveAs(responseBlob, moment().format('DDMMYYYY')+filename);});
  };
  getFileNameByContentDisposition(contentDisposition){
    var regex = /filename[^;=\n]*=(UTF-8(['"]*))?(.*)/;
    var matches = regex.exec(contentDisposition);
    var filename;
    var filenames;
    if (matches != null && matches[3]) {
      filename = matches[3].replace(/['"]/g, '');
      var match = regex.exec(filename);
      if (match != null && match[3]) {
        filenames = match[3].replace(/['"]/g, '').replace('utf-8','');
      }
    }
    return decodeURI(filenames);
  }

  componentDidMount() {
    this.loadMainGridData();
  }

  onShowSizeChange = (current, pageSize) => {

    const max = current * pageSize;
    const min = max - pageSize;
    const { dispatch } = this.props;

    this.setState(prevState => ({
      pagingConfig: {
        ...prevState.pagingConfig,
        start: current,
        length: pageSize,
      },
    }), () => {
      dispatch({
        type: 'universal2/journalData',
        payload: {
          ...this.state.pagingConfig,
          start: current,
          length: pageSize,
        },
      });
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
          rowKey={'id'}
          loading={this.props.loadingData}
          fixedHeader={true}
          rowSelection={true}
          columns={this.state.columns}
          actionColumns={this.state.fcolumn}
          sorted={true}
          showTotal={true}
          showExportBtn
          actionExport={() => this.exportToExcel()}
          dataSource={{
            total: dataStore.totalElements,
            pageSize: this.state.pagingConfig.length,
            page: this.state.pagingConfig.start + 1,
            data: dataStore.content,
          }}
          onShowSizeChange={(pageNumber, pageSize) => this.onShowSizeChange(pageNumber, pageSize)}
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
            {/*<TabPane tab={formatMessage({ id: 'menu.journal.requests' })} key="2">*/}
              {/*Заявки*/}
            {/*</TabPane>*/}
          </Tabs>
        </Card>
        <br/>
      </PageHeaderWrapper>);
  }

}
