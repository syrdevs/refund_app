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
  Select,
  Checkbox,
  Divider,
  Spin,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import { connect } from 'dva';
import { faTimes } from '@fortawesome/free-solid-svg-icons/index';
import SmartGridView from '@/components/SmartGridView';


const { RangePicker } = DatePicker;

@connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects['universal2/statisticsData'],
}))
export default class StaticticsView extends Component {
  state = {

    filters: {
      dateValues: null,
    },

    gridData: {
      columns: [
        {
          isVisible: true,
          dataIndex: 'appcount',
          title: 'Количество заявок на возврат',
        },
        {
          dataIndex: 'otcount',
          isVisible: true,
          title: 'Количество отчислений на возврат',
        },
        {
          dataIndex: 'vzcount',
          isVisible: true,
          title: 'Количество взносов на возврат',
        },
        {
          dataIndex: 'penotcount',
          isVisible: true,
          title: 'Количество пени за отчисления',
        },
        {
          dataIndex: 'penvzcount',
          isVisible: true,
          title: 'Количество пени за взносы',
        },
        {
          dataIndex: 'otsum',
          isVisible: true,
          title: 'Сумма отчислений на возврат',
        },
        {
          dataIndex: 'vzsum',
          isVisible: true,
          title: 'Сумма взносов на возврат',
        },
        {
          dataIndex: 'penotsum',
          isVisible: true,
          title: 'Сумма пени за отчисления на возврат',
        },
        {
          dataIndex: 'penvzsum',
          isVisible: true,
          title: 'Сумма пени за взносы на возврат',
        },
      ],
    },

    pagingConfig: {
      'start': 0,
      'length': 15,
      'src': {
        'searched': false,
        'data': {},
      },
    },
  };

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
      type: 'universal2/statisticsData',
      payload: this.state.pagingConfig,
    });


  };

  onShowSizeChange = (current, pageSize) => {

    const max = current * pageSize;
    const min = max - pageSize;
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/statisticsData',
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

  componentDidMount() {
    this.loadMainGridData();
  }

  render() {

    const { gridData } = this.state;
    const { universal2 } = this.props;


    return (<PageHeaderWrapper title={formatMessage({ id: 'menu.refund.stat.title' })}>
      <Card bodyStyle={{ padding: 5 }}>
        <Row type="flex" justify="center">
          <Col>
            <Card bodyStyle={{ padding: 5 }}>
              <RangePicker
                //
                placeholder={[formatMessage({ id: 'datepicker.start.label' }), formatMessage({ id: 'datepicker.end.label' })]}
                format={'DD.MM.YYYY'}
                onChange={(date, dateString) => {
                  this.setState((prevState) => ({
                    filters: {
                      ...prevState.filters,
                      dateValues: dateString,
                    },
                  }));
                }}/>
              <Button style={{ margin: '10px' }} onClick={() => {
                console.log(this.state.filters.dateValues);
                this.loadMainGridData();
              }
              }>{formatMessage({ id: 'button.apply' })}</Button>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Spin spinning={this.props.loadingData}>
              <SmartGridView
                name={'StatisticsView'}
                hideFilterBtn={true}
                hideRefreshBtn={true}
                columns={gridData.columns}
                dataSource={{
                  total: 0,
                  pageSize: this.state.pagingConfig.length,
                  page: this.state.pagingConfig.start + 1,
                  data: Array.isArray(universal2.dataStore) ? universal2.dataStore : [universal2.dataStore],
                }}
              />
            </Spin>
          </Col>
        </Row>
      </Card>
      <br/>
    </PageHeaderWrapper>);
  }

}
