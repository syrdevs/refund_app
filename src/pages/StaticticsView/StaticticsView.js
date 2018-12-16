import React, {Component} from 'react';
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
  Spin, Tooltip,
} from 'antd';
import {formatMessage, FormattedMessage} from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import {connect} from 'dva';
import {faTimes} from '@fortawesome/free-solid-svg-icons/index';
import SmartGridView from '@/components/SmartGridView';
import numeral from "numeral";
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
} from '@/components/Charts';
import jsonfile from "../Dashboard/data";
import GridContent from '@/components/PageHeaderWrapper/GridContent';


const {RangePicker} = DatePicker;
const dt = moment(new Date()).format('DD.MM.YYYY');
@connect(({universal2, loading}) => ({
  universal2,
  loadingData: loading.effects['universal2/statisticsData'],
}))
export default class StaticticsView extends Component {

  state = {

    filters: {
      dateValues: [dt, dt],
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
    /*const { dispatch } = this.props;
    dispatch({
      type: 'universal2/clear',
      payload: {},
    });*/
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
    const {dispatch} = this.props;
    //dateStart=01.11.2010&dateEnd=16.11.2018
    dispatch({
      type: 'universal2/statisticsData',
      payload: this.state.filters.dateValues !== null ? {
        dateStart: this.state.filters.dateValues[0],
        dateEnd: this.state.filters.dateValues[1],
      } : {
        dateStart: null,
        dateEnd: null,
      },
    });
  };

  onShowSizeChange = (current, pageSize) => {

    const max = current * pageSize;
    const min = max - pageSize;
    const {dispatch} = this.props;
    dispatch({
      type: 'universal2/statisticsData',
      payload: {
        dateStart: this.state.filters.dateValues[0],
        dateEnd: this.state.filters.dateValues[1],
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
    const visitData = jsonfile.visitData;
    const {gridData, firstload} = this.state;
    const {universal2} = this.props;
    const dateFormat = 'DD.MM.YYYY';
    const dt=moment(new Date()).format('DD.MM.YYYY');

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: {marginBottom: 24},
    };
    return (
      <PageHeaderWrapper title={formatMessage({id: 'menu.refund.stat.title'})}>
        <Card bodyStyle={{padding: 5}}>
          <Row type="flex" justify="center">
            <Col>
              <Card bodyStyle={{padding: 5}}>
                <RangePicker
                  //

                   defaultValue={[moment(dt, 'DD.MM.YYYY'), moment(dt, 'DD.MM.YYYY')]}
                  placeholder={[formatMessage({id: 'datepicker.start.label'}), formatMessage({id: 'datepicker.end.label'})]}
                  format={'DD.MM.YYYY'}
                  onChange={(date, dateString) => {
                    this.setState((prevState) => ({
                      filters: {
                        ...prevState.filters,
                        dateValues: dateString,
                      },
                    }));
                  }}/>
                <Button style={{margin: '10px'}} onClick={() => {
                  //console.log(this.state.filters.dateValues);
                  this.loadMainGridData();
                }
                }>{formatMessage({id: 'button.apply'})}</Button>
              </Card>
            </Col>
          </Row>
          {/*<Row>*/}
          {/*<Col>*/}
          {/*<Spin spinning={this.props.loadingData === true}>*/}
          {/*<SmartGridView*/}
          {/*name={'StatisticsView'}*/}
          {/*hideFilterBtn={true}*/}
          {/*hideRefreshBtn={true}*/}
          {/*columns={gridData.columns}*/}
          {/*dataSource={{*/}
          {/*total: 0,*/}
          {/*pageSize: this.state.pagingConfig.length,*/}
          {/*page: this.state.pagingConfig.start + 1,*/}
          {/*data: Array.isArray(universal2.dataStore) ? universal2.dataStore : [universal2.dataStore],*/}
          {/*}}*/}
          {/*/>*/}
          {/*</Spin>*/}
          {/*</Col>*/}
          {/*</Row>*/}

        </Card>
        <GridContent>
          <Row style={{margin: '50px'}} gutter={24}>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Количество заявок на возврат'
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={
                      <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>
                    }
                  >


                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.appcount).format('0,0')}
                footer={
                  <Field
                    label={
                      'Количество заявок на возврат'
                    }
                    value={numeral(this.props.universal2.dataStore.appcount).format('0,0')}
                  />
                }
                contentHeight={60}
              >


              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Количество отчислений на возврат'
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={
                      <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>
                    }
                  >


                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.otcount).format('0,0')}
                footer={
                  <Field
                    label={
                      'Количество отчислений на возврат'
                    }
                    value={numeral(this.props.universal2.dataStore.otcount).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Количество взносов на возврат'
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={
                      <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>
                    }
                  >


                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.vzcount).format('0,0')}
                footer={
                  <Field
                    label={
                      'Количество взносов на возврат'
                    }
                    value={numeral(this.props.universal2.dataStore.vzcount).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Количество пени за отчисления'
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={
                      <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>
                    }
                  >


                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.penotcount).format('0,0')}
                footer={
                  <Field
                    label={
                      'Количество пени за отчисления'
                    }
                    value={numeral(this.props.universal2.dataStore.penotcount).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Количество пени за взносы'
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={
                      <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>
                    }
                  >
                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.penvzcount).format('0,0')}
                footer={
                  <Field
                    label={
                      'Количество пени за взносы'
                    }
                    value={numeral(this.props.universal2.dataStore.penvzcount).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Сумма отчислений на возврат'
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={
                      <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>
                    }
                  >
                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.otsum).format('0,0')}
                footer={
                  <Field
                    label={
                      'Сумма отчислений на возврат'
                    }
                    value={numeral(this.props.universal2.dataStore.otsum).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Сумма взносов на возврат'
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={
                      <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>
                    }
                  >
                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.vzsum).format('0,0')}
                footer={
                  <Field
                    label={
                      'Сумма взносов на возврат'
                    }
                    value={numeral(this.props.universal2.dataStore.vzsum).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Сумма пени за отчисления на возврат'
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={
                      <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>
                    }
                  >
                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.penotsum).format('0,0')}
                footer={
                  <Field
                    label={
                      'Сумма пени за отчисления на возврат'
                    }
                    value={numeral(this.props.universal2.dataStore.penotsum).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title='Сумма пени за взносы на возврат'
                loading={this.props.loadingData === true}
                action={
                  <Tooltip
                    title={
                      <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce"/>
                    }
                  >
                  </Tooltip>
                }
                total={numeral(this.props.universal2.dataStore.penvzsum).format('0,0')}
                footer={
                  <Field
                    label={
                      'Сумма пени за взносы на возврат'
                    }
                    value={numeral(this.props.universal2.dataStore.penvzsum).format('0,0')}
                  />
                }
                contentHeight={60}
              >

              </ChartCard>
            </Col>
          </Row>
        </GridContent>
        <br/>
      </PageHeaderWrapper>);
  }

}
