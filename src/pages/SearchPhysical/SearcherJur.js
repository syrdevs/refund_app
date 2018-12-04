import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import style from './Searcher.less';
import moment from 'moment';
import {
  Card,
  Table,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
  Calendar,
  Spin,
  Form,
  Tag,
  Modal
} from 'antd';
import { connect } from 'dva/index';

const FormItem = Form.Item;
const Search = Input.Search;

const formItemLayout = {
  labelCol: { md: 6, xs: 6, sm: 6 },
  wrapperCol: { md: 18, xs: 18, sm: 18},
};

@connect(({ universal, loading }) => {
  return {
    universal,
    loadingData: loading.effects['universal/SearcherJur'],
  };
})
class SearcherJur extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bin: null,
      jur: {
        "senderName": "",
        "senderBin": "",
        "senderBankBik": "",
        "paymentCount": null,
        "paymentSum": null
      },
      loading:false,
      payes:[]
    };
  }


  monthCellRender=(value)=>{
    let result=(<div style={{backgroundColor:'red', opacity: '0.1', height: '100%', width: '100%'}}></div>);
    this.state.payes.forEach((item) => {
      if(item.period===value.format('MMYYYY')) {
        result= (
          <div
            style={{backgroundColor: '#EEF9E9', height: '100%', width: '100%', padding: '10px'}}
            onClick={()=>{this.ShowDetailofMonth(item.detailList, value)}}
            >
            <p>Сумма: {item.totalAmount}</p>
            <p>Кол-во: {item.totalElements}</p>
          </div>
        )
      }
    });
    return result;

    /*if('012018'===value.format('MMYYYY')) {
      return (
        <div
          style={{backgroundColor: '#EEF9E9', height: '100%', width: '100%'}}
          onClick={()=>{this.ShowDetailofMonth(value)}}
        >
            <p>Сумма: 1000000000</p>
            <p>Кол-во: 1000000</p>
        </div>
      )
    }
    else {
      return (<div style={{backgroundColor:'red', opacity: '0.1', height: '100%', width: '100%'}}></div>)
    }*/

  }


  ShowDetailofMonth=(value, date)=>{
    if(value.length) {
      Modal.info({
        title: 'Платежи в разрезе КНП за '+date.format('MMMM'),
        content: (
          <div>
            {value.map(item=>(<p>{item.knp}. Сумма: {item.amount}, кол-во: {item.count}</p>))}
          </div>
        ),
        onOk() {
        },
      });
    }
  }


  searchperson=(value)=>{
    const { dispatch } = this.props;
    this.setState({
      loading: true,
      bin: value
    },()=>{
      dispatch({
        type: 'universal/SearcherJur',
        payload: {
          bin: this.state.bin,
        },
      }).then(() => {
        if (JSON.stringify(this.props.universal.searcherjur)!=="{}" && this.props.universal.searcherjur) {
          this.setState({
            jur: this.props.universal.searcherjur,
          }, () => {
            this.payesSearcher(moment(new Date()).year());
          })
        }
        else {
          this.setState({
            jur: {
              "senderName": "",
              "senderBin": "",
              "senderBankBik": "",
              "paymentCount": null,
              "paymentSum": null
            },
            loading: false,
            payes:[]
          })
        }
      });
    })
  }

  onPanelChange=(value, mode)=>{
    this.payesSearcher(value.year());
  };

  payesSearcher=(year)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/SearcherJurCalendar',
      payload: {
        bin: this.state.bin,
        year: year
      },
    }).then(()=>{
      if(this.props.universal.searcherjurcalendar!==undefined){
        this.setState({
          payes: this.props.universal.searcherjurcalendar,
          loading: false
        })
      }
      else {
        this.setState({
          payes: [],
          loading: false
        })
      }

    })
  }


  render() {
    const CardHeight={height:'auto', marginBottom:'10px'};
    const {jur} = this.state;


    const columns = [{
      title: 'Наименование',
      dataIndex: 'name',
      render: (text) => <div style={{color: 'black'}}>{text}</div>,
      width: 100,

    }, {
      title: 'Значения',
      dataIndex: 'value',
      key: 'value',
      width: 150,
    }];
    const Jurdata  = [
      {
        key:0,
        name: 'НАИМЕНОВАНИЕ',
        value: jur.senderName,
      },
      {
        key:1,
        name: 'БИН',
        value: jur.senderBin,
      },
      {
        key:2,
        name: 'БИК',
        value: jur.senderBankBik,
      },
      {
        key:3,
        name: 'РЕГИОН',
        value: '',
      },
      {
        key:4,
        name: 'КОЛИЧЕСТВО ПЛАТЕЖЕЙ',
        value: jur.paymentCount,
      },
      {
        key:5,
        name: 'СУММА ПЛАТЕЖЕЙ',
        value: jur.paymentSum,
      }
    ];

    return (<div>
        <Spin tip="" spinning={this.state.loading}>
          <Row style={{ marginBottom:'10px' }}>
            <Col span={10}>
              <div style={CardHeight}>
                <Card
                  style={{height:'140px', marginBottom:'10px'}}
                  type="inner"
                  bodyStyle={{ padding: 25 }}
                  title={formatMessage({ id: 'report.param.searcher' })}
                  extra={<div>
                    {this.state.jur.senderBin &&<Button
                    style={{marginLeft:"10px"}}
                    size={'large'}
                    onClick={()=>{
                      if (this.state.bin){
                        this.props.searchbybin(this.state.bin)
                      }
                    }}
                  >Просмотр платежей</Button>}</div>}
                >
                  <Search
                    placeholder="Введите БИН"
                    enterButton={formatMessage({ id: 'system.search' })}
                    size="large"
                    maxLength={12}
                    onSearch={value => this.searchperson(value)}
                  />

                </Card>
                <Card
                  bodyStyle={{height:'auto'}}
                  title={formatMessage({ id: this.props.persontitle })}
                  type="inner"
                >
                  <Table
                    columns={columns}
                    dataSource={Jurdata}
                    style={{height:'auto'}}
                    pagination={{ pageSize: 50, position: 'none' }}
                    showHeader={false}
                    size={'default'}
                  />
                </Card>
              </div>
            </Col>
            <Col span={14}>
              <Card
                style={{height:'600', marginLeft:'10px'}}
                title={formatMessage({ id: 'report.param.monthpay' })}
                type="inner"
              >
                <div style={{height: '500px'}}>
                  <Calendar
                    onPanelChange={this.onPanelChange}
                    mode='year'
                    className={style.customCalendar}
                    monthCellRender={this.monthCellRender}
                    fullscreen
                  />
                </div>
                <div style={{height:'50px', marginLeft:'10px'}}>
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
          </Row>
        </Spin>
      </div>
    );
  }
}
export default SearcherJur;


{/* <div style={{height: 'auto'}}>
                  <div className="antd-pro\pages\-search-physical\-searcher-customCalendar ant-fullcalendar-fullscreen">
                    <div className="ant-fullcalendar antd-pro\pages\-search-physical\-searcher-customCalendar ant-fullcalendar-full ant-fullcalendar-fullscreen" tabIndex="0">
                      <div className="ant-fullcalendar-calendar-body">
                        <table className="ant-fullcalendar-month-panel-table" cellSpacing="0" role="grid">
                          <tbody className="ant-fullcalendar-month-panel-tbody">
                          <tr role="row">
                            <td role="gridcell" title="янв." className="ant-fullcalendar-month-panel-cell">
                              <div className="ant-fullcalendar-month" style={{marginBottom:'10px', height:'150px'}}>
                                <div className="ant-fullcalendar-value">Январь</div>
                                <div className="ant-fullcalendar-content" style={{height:'auto'}}>
                                   <div style="background-color: red; opacity: 0.1; height: 100%; width: 100%;"></div>
                                  {this.getJurMonthData('012018')}
                                </div>
                              </div>
                            </td>
                            <td role="gridcell" title="февр." className="ant-fullcalendar-month-panel-cell">
                              <div className="ant-fullcalendar-month" style={{marginBottom:'10px', height:'150px'}}>
                                <div className="ant-fullcalendar-value">Февраль</div>
                                <div className="ant-fullcalendar-content" style={{height:'auto'}}>
                                   <div style="background-color: red; opacity: 0.1; height: 100%; width: 100%;"></div>
                                  {this.getJurMonthData('022018')}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr role="row">
                            <td role="gridcell" title="март" className="ant-fullcalendar-month-panel-cell">
                              <div className="ant-fullcalendar-month" style={{marginBottom:'10px', height:'150px'}}>
                                <div className="ant-fullcalendar-value">Март</div>
                                <div className="ant-fullcalendar-content" style={{height:'auto'}}>
                                   <div style="background-color: red; opacity: 0.1; height: 100%; width: 100%;"></div>
                                  {this.getJurMonthData('032018')}
                                </div>
                              </div>
                            </td>
                            <td role="gridcell" title="апр." className="ant-fullcalendar-month-panel-cell">
                              <div className="ant-fullcalendar-month" style={{marginBottom:'10px', height:'150px'}}>
                                <div className="ant-fullcalendar-value">Апрель</div>
                                <div className="ant-fullcalendar-content" style={{height:'auto'}}>
                                   <div style="background-color: red; opacity: 0.1; height: 100%; width: 100%;"></div>
                                  {this.getJurMonthData('042018')}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr role="row">
                            <td role="gridcell" title="май" className="ant-fullcalendar-month-panel-cell">
                              <div className="ant-fullcalendar-month" style={{marginBottom:'10px', height:'150px'}}>
                                <div className="ant-fullcalendar-value">Май</div>
                                <div className="ant-fullcalendar-content" style={{height:'auto'}}>
                                   <div style="background-color: red; opacity: 0.1; height: 100%; width: 100%;"></div>
                                  {this.getJurMonthData('052018')}
                                </div>
                              </div>
                            </td>
                            <td role="gridcell" title="июнь" className="ant-fullcalendar-month-panel-cell">
                              <div className="ant-fullcalendar-month" style={{marginBottom:'10px', height:'150px'}}>
                                <div className="ant-fullcalendar-value">Июнь</div>
                                <div className="ant-fullcalendar-content" style={{height:'auto'}}>
                                   <div style="background-color: red; opacity: 0.1; height: 100%; width: 100%;"></div>
                                  {this.getJurMonthData('062018')}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr role="row">
                            <td role="gridcell" title="июль" className="ant-fullcalendar-month-panel-cell">
                              <div className="ant-fullcalendar-month" style={{marginBottom:'10px', height:'150px'}}>
                                <div className="ant-fullcalendar-value">Июль</div>
                                <div className="ant-fullcalendar-content" style={{height:'auto'}}>
                                   <div style="background-color: red; opacity: 0.1; height: 100%; width: 100%;"></div>
                                  {this.getJurMonthData('072018')}
                                </div>
                              </div>
                            </td>
                            <td role="gridcell" title="авг." className="ant-fullcalendar-month-panel-cell">
                              <div className="ant-fullcalendar-month" style={{marginBottom:'10px', height:'150px'}}>
                                <div className="ant-fullcalendar-value">Август</div>
                                <div className="ant-fullcalendar-content" style={{height:'auto'}}>
                                   <div style="background-color: red; opacity: 0.1; height: 100%; width: 100%;"></div>
                                  {this.getJurMonthData('082018')}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr role="row">
                            <td role="gridcell" title="сент." className="ant-fullcalendar-month-panel-cell">
                              <div className="ant-fullcalendar-month" style={{marginBottom:'10px', height:'150px'}}>
                                <div className="ant-fullcalendar-value">Сентябрь</div>
                                <div className="ant-fullcalendar-content" style={{height:'auto'}}>
                                   <div style="background-color: red; opacity: 0.1; height: 100%; width: 100%;"></div>
                                  {this.getJurMonthData('092018')}
                                </div>
                              </div>
                            </td>
                            <td role="gridcell" title="окт." className="ant-fullcalendar-month-panel-cell">
                              <div className="ant-fullcalendar-month" style={{marginBottom:'10px', height:'150px'}}>
                                <div className="ant-fullcalendar-value">Октябрь</div>
                                <div className="ant-fullcalendar-content" style={{height:'auto'}}>
                                   <div style="background-color: red; opacity: 0.1; height: 100%; width: 100%;"></div>
                                  {this.getJurMonthData('102018')}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr role="row">
                            <td role="gridcell" title="нояб." className="ant-fullcalendar-month-panel-cell">
                              <div className="ant-fullcalendar-month" style={{marginBottom:'10px', height:'150px'}}>
                                <div className="ant-fullcalendar-value">Ноябрь</div>
                                <div className="ant-fullcalendar-content" style={{height:'auto'}}>
                                   <div style="background-color: red; opacity: 0.1; height: 100%; width: 100%;"></div>
                                  {this.getJurMonthData('112018')}
                                </div>
                              </div>
                            </td>
                            <td role="gridcell" title="дек."
                                className="ant-fullcalendar-month-panel-cell ant-fullcalendar-month-panel-selected-cell ant-fullcalendar-month-panel-current-cell">
                              <div className="ant-fullcalendar-month" style={{marginBottom:'10px', height:'150px'}}>
                                <div className="ant-fullcalendar-value">Декабрь</div>
                                <div className="ant-fullcalendar-content" style={{height:'auto'}}>
                                   <div style="background-color: red; opacity: 0.1; height: 100%; width: 100%;"></div>
                                  {this.getJurMonthData('122018')}
                                </div>
                              </div>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>*/}


