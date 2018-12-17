import React, {Component} from 'react';
import {formatMessage, FormattedMessage} from 'umi/locale';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
} from '@/components/Charts';
import Trend from '@/components/Trend';
import NumberInfo from '@/components/NumberInfo';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import {getTimeDistance} from '@/utils/utils';
import jsonfile from './data'
import Yuan from '@/utils/Yuan';

import styles from './Analysis.less';
import moment from "moment";
import {connect} from "dva";

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `Test ${i} Test`,
    total: 323234,
  });
}

const dt = moment(new Date()).format('DD.MM.YYYY');

@connect(({universal2, loading}) => ({
  universal2,
  loadingData: loading.effects['universal2/statisticsData'],
}))

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.rankingListData = [];
    for (let i = 0; i < 7; i += 1) {
      this.rankingListData.push({
        title: formatMessage({id: 'app.analysis.test'}, {no: i}),
        total: 323234,
      });
    }
  }

  state = {
    beginDate:dt,
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
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
    loading: false,
  };

  componentDidMount() {
    // this.reqRef = requestAnimationFrame(() => {
    /* dispatch({
       type: 'chart/fetch',
     });
     this.timeoutId = setTimeout(() => {
       this.setState({
         loading: false,
       });
     }, 600);*/
    // });
    this.loadMainGridData();
  }

  componentWillUnmount() {
    /*const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });*/
    // cancelAnimationFrame(this.reqRef);
    // clearTimeout(this.timeoutId);
  }

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

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue,
    });
  };

  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    /*dispatch({
      type: 'chart/fetchSalesData',
    });*/
  };

  isActive(type) {
    const {rangePickerValue} = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  }

  render() {
    const {rangePickerValue, salesType, currentTabKey} = this.state;
    const visitData = jsonfile.visitData;
    const visitData2 = jsonfile.visitData2;
    const salesData = jsonfile.salesData;
    const searchData = jsonfile.searchData;
    const offlineData = jsonfile.offlineData;
    const offlineChartData = jsonfile.offlineChartData;
    const salesTypeData = jsonfile.salesTypeData;
    const salesTypeDataOnline = jsonfile.salesTypeDataOnline;
    const salesTypeDataOffline = jsonfile.salesTypeDataOffline;
    const loading = false;
    const dt = moment(new Date()).format('DD.MM.YYYY');
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }
    const menu = (
      <Menu>
        <Menu.Item>Menu1</Menu.Item>
        <Menu.Item>Menu2</Menu.Item>
      </Menu>
    );

    const iconGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis"/>
        </Dropdown>
      </span>
    );

    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
            <FormattedMessage id="app.analysis.all-day" defaultMessage="All Day"/>
          </a>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
            <FormattedMessage id="app.analysis.all-week" defaultMessage="All Week"/>
          </a>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
            <FormattedMessage id="app.analysis.all-month" defaultMessage="All Month"/>
          </a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
            <FormattedMessage id="app.analysis.all-year" defaultMessage="All Year"/>
          </a>
        </div>
        <RangePicker
          value={rangePickerValue}
          onChange={this.handleRangePickerChange}
          style={{width: 256}}
        />
      </div>
    );

    const columns = [
      {
        title: <FormattedMessage id="app.analysis.table.rank" defaultMessage="Rank"/>,
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: (
          <FormattedMessage
            id="app.analysis.table.search-keyword"
            defaultMessage="Search keyword"
          />
        ),
        dataIndex: 'keyword',
        key: 'keyword',
        render: text => <a href="/">{text}</a>,
      },
      {
        title: <FormattedMessage id="app.analysis.table.users" defaultMessage="Users"/>,
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        className: styles.alignRight,
      },
      {
        title: (
          <FormattedMessage id="app.analysis.table.weekly-range" defaultMessage="Weekly Range"/>
        ),
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        render: (text, record) => (
          <Trend flag={record.status === 1 ? 'down' : 'up'}>
            <span style={{marginRight: 4}}>{text}%</span>
          </Trend>
        ),
        align: 'right',
      },
    ];

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

    const CustomTab = ({data, currentTabKey: currentKey}) => (
      <Row gutter={8} style={{width: 138, margin: '8px 0'}}>
        <Col span={12}>
          <NumberInfo
            title={data.name}
            subTitle={
              <FormattedMessage
                id="app.analysis.conversion-rate"
                defaultMessage="Conversion Rate"
              />
            }
            gap={2}
            total={`${data.cvr * 100}%`}
            theme={currentKey !== data.name && 'light'}
          />
        </Col>
        <Col span={12} style={{paddingTop: 36}}>
          <Pie
            animate={false}
            color={currentKey !== data.name && '#BDE4FF'}
            inner={0.55}
            tooltip={false}
            margin={[0, 0, 0, 0]}
            percent={data.cvr * 100}
            height={64}
          />
        </Col>
      </Row>
    );

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: {marginBottom: 24},
    };

    return (
      <Row style={{margin: '50px'}}>
        <Card bodyStyle={{padding: 5}}>
          <Row type="flex" justify="center">
            <Col>
              {/*<Card bodyStyle={{padding: 5}}>*/}
                {/*dfhsdgfdf*/}
              {/*</Card>*/}
              <h2 style={{margin: '9px'}}>СТАТИСТИЧЕСКИЕ ДАННЫЕ ЗА  {this.state.beginDate}</h2>
            </Col>
          </Row>
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
            {/*<Row gutter={24}>*/}
            {/*<Col {...topColResponsiveProps}>*/}
            {/*<ChartCard*/}
            {/*bordered={false}*/}
            {/*loading={loading}*/}
            {/*title='Количество заявок на возврат'*/}
            {/*action={*/}
            {/*<Tooltip*/}
            {/*title={*/}
            {/*<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />*/}
            {/*}*/}
            {/*>*/}


            {/*</Tooltip>*/}
            {/*}*/}
            {/*total={numeral(5558).format('0,0')}*/}
            {/*footer={*/}
            {/*<Field*/}
            {/*label={*/}
            {/*'Количество заявок на возврат'*/}
            {/*}*/}
            {/*value={numeral(5558).format('0,0')}*/}
            {/*/>*/}
            {/*}*/}
            {/*contentHeight={60}*/}
            {/*>*/}

            {/*<MiniArea color="#975FE4" data={visitData} />*/}
            {/*</ChartCard>*/}
            {/*</Col>*/}
            {/*<Col {...topColResponsiveProps}>*/}
            {/*<ChartCard*/}
            {/*bordered={false}*/}
            {/*loading={loading}*/}
            {/*title='Количество отчислений на возврат'*/}
            {/*action={*/}
            {/*<Tooltip*/}
            {/*title={*/}
            {/*'Количество отчислений на возврат'*/}
            {/*}*/}
            {/*>*/}
            {/*</Tooltip>*/}
            {/*}*/}
            {/*total={numeral(812).format('0,0')}*/}
            {/*footer={*/}
            {/*<Field*/}
            {/*label={*/}
            {/*'Количество отчислений на возврат'*/}
            {/*}*/}
            {/*value={numeral(812).format('0,0')}*/}
            {/*/>*/}
            {/*}*/}
            {/*contentHeight={60}*/}
            {/*>*/}
            {/*<MiniBar data={visitData} />*/}
            {/*</ChartCard>*/}
            {/*</Col>*/}
            {/*<Col {...topColResponsiveProps}>*/}
            {/*<ChartCard*/}
            {/*loading={loading}*/}
            {/*bordered={false}*/}
            {/*title='Количество взносов на возврат'*/}

            {/*action={*/}
            {/*<Tooltip*/}
            {/*title={*/}
            {/*<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />*/}
            {/*}*/}
            {/*>*/}
            {/*</Tooltip>*/}
            {/*}*/}
            {/*total={numeral(389).format('0,0')}*/}
            {/*footer={*/}
            {/*<Field*/}
            {/*label={*/}
            {/*'Количество взносов на возврат'*/}
            {/*}*/}
            {/*value={numeral(389).format('0,0')}*/}
            {/*/>*/}
            {/*}*/}
            {/*contentHeight={60}*/}
            {/*>*/}

            {/*/!* <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>*/}
            {/*<Trend flag="up" style={{ marginRight: 16 }}>*/}
            {/*<FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />*/}
            {/*<span className={styles.trendText}>12%</span>*/}
            {/*</Trend>*/}
            {/*<Trend flag="down">*/}
            {/*<FormattedMessage id="app.analysis.day" defaultMessage="Weekly Changes" />*/}
            {/*<span className={styles.trendText}>11%</span>*/}
            {/*</Trend>*/}
            {/*</div>*!/*/}
            {/*<MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />*/}
            {/*</ChartCard>*/}
            {/*</Col>*/}
            {/*</Row>*/}
            {/*<Row>*/}
            {/*<Col xl={24} lg={24} md={12} sm={24} xs={24} style={{marginBottom:'24px'}}>*/}
            {/*<ChartCard*/}
            {/*loading={loading}*/}
            {/*bordered={false}*/}
            {/*title='Сумма отчислений на возврат'*/}

            {/*action={*/}
            {/*<Tooltip*/}
            {/*title={'Сумма отчислений на возврат'}*/}
            {/*>*/}
            {/*</Tooltip>*/}
            {/*}*/}
            {/*total={'₸ '+numeral(1832706.49).format('0,0')}*/}
            {/*footer={*/}
            {/*<Field*/}
            {/*label={*/}
            {/*'Сумма отчислений на возврат'*/}
            {/*}*/}
            {/*value={numeral(1832706.49).format('0,0')}*/}
            {/*/>*/}
            {/*}*/}
            {/*contentHeight={200}*/}
            {/*>*/}
            {/*<Bar*/}
            {/*height={200}*/}
            {/*title={''}*/}
            {/*data={salesData}*/}
            {/*/>*/}
            {/*</ChartCard>*/}
            {/*</Col>*/}
            {/*</Row>*/}
            {/*<Row gutter={24}>*/}
            {/*<Col xl={18} lg={18} md={18} sm={24} xs={24} style={{marginBottom:'24px'}}>*/}
            {/*<ChartCard*/}
            {/*loading={loading}*/}
            {/*bordered={false}*/}
            {/*title='Сумма взносов на возврат'*/}

            {/*action={*/}
            {/*<Tooltip*/}
            {/*title={'Сумма взносов на возврат'}*/}
            {/*>*/}
            {/*</Tooltip>*/}
            {/*}*/}
            {/*total={'₸ '+numeral(866621).format('0,0')}*/}
            {/*footer={*/}
            {/*<Field*/}
            {/*label={*/}
            {/*'Сумма взносов на возврат'*/}
            {/*}*/}
            {/*value={'₸ '+numeral(866621).format('0,0')}*/}
            {/*/>*/}
            {/*}*/}
            {/*contentHeight={200}*/}
            {/*>*/}
            {/*<MiniArea line height={200} data={visitData2} />*/}
            {/*</ChartCard>*/}
            {/*</Col>*/}
            {/*<Col xl={6} lg={6} md={6} sm={24} xs={24} style={{marginBottom:'24px'}}>*/}
            {/*<ChartCard*/}
            {/*bordered={false}*/}
            {/*title={"Сумма взносов на возврат"}*/}
            {/*loading={loading}*/}
            {/*total={() => <Yuan>866621.33</Yuan>}*/}
            {/*footer={*/}
            {/*<Field*/}
            {/*label={'Сумма отчислений на возврат'}*/}
            {/*value={`₸ ${numeral(1832706.49).format('0,0')}`}*/}
            {/*/>*/}
            {/*}*/}
            {/*contentHeight={200}*/}
            {/*>*/}
            {/*<Trend style={{ marginRight: 16 }}>*/}
            {/*Сумма пени за отчисления на возврат*/}
            {/*<span className={styles.trendText}>₸ 0</span>*/}
            {/*</Trend>*/}
            {/*<Trend>*/}
            {/*Сумма пени за взносы на возврат*/}
            {/*<span className={styles.trendText}>₸ 0</span>*/}
            {/*</Trend>*/}
            {/*</ChartCard>*/}
            {/*</Col>*/}
            {/*</Row>*/}

            {/*<Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar
                        height={292}
                        title={
                          <FormattedMessage
                            id="app.analysis.visits-trend"
                            defaultMessage="Visits Trend"
                          />
                        }
                        data={salesData}
                      />
                    </div>
                  </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>
                        <FormattedMessage
                          id="app.analysis.visits-ranking"
                          defaultMessage="Visits Ranking"
                        />
                      </h4>
                      <ul className={styles.rankingList}>
                        {this.rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span
                              className={`${styles.rankingItemNumber} ${
                                i < 3 ? styles.active : ''
                                }`}
                            >
                              {i + 1}
                            </span>
                            <span className={styles.rankingItemTitle} title={item.title}>
                              {item.title}
                            </span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
            </Row>
          </div>
        </Card>*/}

            {/*<Row gutter={24}>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Card
            loading={loading}
            bordered={false}
            title={
              <FormattedMessage
                id="app.analysis.online-top-search"
                defaultMessage="Online Top Search"
              />
            }
            extra={iconGroup}
            style={{ marginTop: 24 }}
          >
            <Row gutter={68}>
              <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                <NumberInfo
                  subTitle={
                    <span>
                        <FormattedMessage
                          id="app.analysis.search-users"
                          defaultMessage="search users"
                        />
                        <Tooltip
                          title={
                            <FormattedMessage
                              id="app.analysis.introduce"
                              defaultMessage="introduce"
                            />
                          }
                        >
                          <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                        </Tooltip>
                      </span>
                  }
                  gap={8}
                  total={numeral(12321).format('0,0')}
                  status="up"
                  subTotal={17.1}
                />
                <MiniArea line height={45} data={visitData2} />
              </Col>
              <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                <NumberInfo
                  subTitle={
                    <span>
                        <FormattedMessage
                          id="app.analysis.per-capita-search"
                          defaultMessage="Per Capita Search"
                        />
                        <Tooltip
                          title={
                            <FormattedMessage
                              id="app.analysis.introduce"
                              defaultMessage="introduce"
                            />
                          }
                        >
                          <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                        </Tooltip>
                      </span>
                  }
                  total={2.7}
                  status="down"
                  subTotal={26.2}
                  gap={8}
                />
                <MiniArea line height={45} data={visitData2} />
              </Col>
            </Row>
            <Table
              rowKey={record => record.index}
              size="small"
              columns={columns}
              dataSource={searchData}
              pagination={{
                style: { marginBottom: 0 },
                pageSize: 5,
              }}
            />
          </Card>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Card
            loading={loading}
            className={styles.salesCard}
            bordered={false}
            title={
              <FormattedMessage
                id="app.analysis.the-proportion-of-sales"
                defaultMessage="The Proportion of Sales"
              />
            }
            bodyStyle={{ padding: 24 }}
            extra={
              <div className={styles.salesCardExtra}>
                {iconGroup}
                <div className={styles.salesTypeRadio}>
                  <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                    <Radio.Button value="all">
                      <FormattedMessage id="app.analysis.channel.all" defaultMessage="ALL" />
                    </Radio.Button>
                    <Radio.Button value="online">
                      <FormattedMessage
                        id="app.analysis.channel.online"
                        defaultMessage="Online"
                      />
                    </Radio.Button>
                    <Radio.Button value="stores">
                      <FormattedMessage
                        id="app.analysis.channel.stores"
                        defaultMessage="Stores"
                      />
                    </Radio.Button>
                  </Radio.Group>
                </div>
              </div>
            }
            style={{ marginTop: 24, minHeight: 509 }}
          >
            <h4 style={{ marginTop: 8, marginBottom: 32 }}>
              <FormattedMessage id="app.analysis.sales" defaultMessage="Sales" />
            </h4>
            <Pie
              hasLegend
              subTitle={<FormattedMessage id="app.analysis.sales" defaultMessage="Sales" />}
              total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
              data={salesPieData}
              valueFormat={value => <Yuan>{value}</Yuan>}
              height={248}
              lineWidth={4}
            />
          </Card>
        </Col>
      </Row>*/}

            {/*<Card
          loading={loading}
          className={styles.offlineCard}
          bordered={false}
          bodyStyle={{ padding: '0 0 32px 0' }}
          style={{ marginTop: 32 }}
        >
          <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
            {offlineData.map(shop => (
              <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
                <div style={{ padding: '0 24px' }}>
                  <TimelineChart
                    height={400}
                    data={offlineChartData}
                    titleMap={{
                      y1: formatMessage({ id: 'app.analysis.traffic' }),
                      y2: formatMessage({ id: 'app.analysis.payments' }),
                    }}
                  />
                </div>
              </TabPane>
            ))}
          </Tabs>
        </Card>*/}
          </GridContent>
      </Row>
  );
  }
  }

  export default Analysis;
