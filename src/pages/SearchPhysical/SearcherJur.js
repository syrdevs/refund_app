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
    loadingData: loading.effects['universal/SearcherData'],
  };
})
class SearcherJur extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        "dSexId": {
          "nameKz": null,
          "id": null,
          "nameRu": null,
          "code": null
        },
        "iin": null,
        "firstname": null,
        "secondname": null,
        "birthdate": null,
        "lastname": null,
        "clinic": null,
        "citizenship": {
          "nameRu": null,
          "nameKz": null,
          "shortname": null,
          "code": null,
          "id": null
        },
        "clinic_date": null,
        "nationality": {
          "shortnameKz": null,
          "nameRu": null,
          "nameKz": null,
          "shortname": null,
          "code": null,
          "id": null
        },
        "categories": [],
        "status": false,
      },
      payes:[],
      loading:false,
    };
  }

  formfield = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  ChangeDate(value) {
    this.setState({
      bdate: value
    })
  }

  monthCellRender=(value)=>{
    /*let isPayed  = false;
    this.state.payes.map((item) => {
      if(item===value.format('MMYYYY')) {
        isPayed=true
      }
    });
    if(isPayed){
      return (<div style={{backgroundColor: '#52c41a', opacity: '0.1',  height: '100%', width: '100%'}}></div>)
    }
    else {
      return (<div style={{backgroundColor:'red', opacity: '0.1', height: '100%', width: '100%'}}></div>)
    }*/
    if('012018'===value.format('MMYYYY')) {
      return (
        <div
          style={{ height: '100%', width: '100%'}}
          onClick={()=>{this.ShowDetailofMonth(value)}}
        >
          <p>Сумма: 1000000000</p>
          <p>Кол-во: 1000000</p>
        </div>
      )
    }
  }
  ShowDetailofMonth=(value)=>{
    if(value) {
      Modal.info({
        title: 'Платежи в разрезе КНП за '+value.format('MMMM'),
        content: (
          <div>
            <p>121. Сумма: 1000000000, кол-во: 1000000</p>
            <p>122. Сумма: 1000000000, кол-во: 1000000</p>
            <p>123. Сумма: 1000000000, кол-во: 1000000</p>
            <p>123. Сумма: 1000000000, кол-во: 1000000</p>
            <p>123. Сумма: 1000000000, кол-во: 1000000</p>
          </div>
        ),
        onOk() {
        },
      });
    }
  }

  /*getJurMonthData=(value)=>{
    if('012018'===value){
      return (<div
        ref={this._element}
        style={{ height: '100%', width: '100%'}}>
        <p>121. Сумма: 1000000000, кол-во: 1000000</p>
        <p>122. Сумма: 1000000000, кол-во: 1000000</p>
        <p>123. Сумма: 1000000000, кол-во: 1000000</p>
      </div>)
    }

  }*/

  searchperson=(value)=>{
    const { dispatch } = this.props;
    this.setState({
      loading: true,
      iin: value
    },()=>{
      dispatch({
        type: 'universal/SearcherData',
        payload: {
          iin: this.state.iin,
        },
      }).then(() => {
        if (JSON.stringify(this.props.universal.searcherdata)!=="{}" && this.props.universal.searcherdata) {
          this.setState({
            person: this.props.universal.searcherdata
          }, () => {
            this.payesSearcher(moment(new Date()).year());
          })
        }
        else {
          this.setState({
            person: {
              "dSexId": {
                "nameKz": null,
                "id": null,
                "nameRu": null,
                "code": null
              },
              "iin": null,
              "firstname": null,
              "secondname": null,
              "birthdate": null,
              "lastname": null,
              "clinic": null,
              "citizenship": {
                "nameRu": null,
                "nameKz": null,
                "shortname": null,
                "code": null,
                "id": null
              },
              "clinic_date": null,
              "nationality": {
                "shortnameKz": null,
                "nameRu": null,
                "nameKz": null,
                "shortname": null,
                "code": null,
                "id": null
              },
              "categories": [],
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
      type: 'universal/SearcherCalendar',
      payload: {
        iin: this.state.iin,
        year: year
      },
    }).then(()=>{
      this.setState({
        payes: this.props.universal.searchercalendar,
        loading: false
      })
    })
  }




  render() {
    const CardHeight={height:'auto', marginBottom:'10px'};

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
        value: '',
      },
      {
        key:1,
        name: 'БИН',
        value: '',
      },
      {
        key:2,
        name: 'БИК',
        value: '',
      },
      {
        key:3,
        name: 'РЕГИОН',
        value: '',
      },
      {
        key:4,
        name: 'КОЛИЧЕСТВО ПЛАТЕЖЕЙ',
        value: '',
      },
      {
        key:5,
        name: 'СУММА ПЛАТЕЖЕЙ',
        value: '',
      }
    ];
    const {iin} = this.state;

    return (<div>
        <Spin tip="" spinning={this.state.loading}>
          <Row style={{ marginBottom:'10px' }}>
            <Col span={12}>
              <div style={CardHeight}>
                <Card
                  style={{height:'140px', marginBottom:'10px'}}
                  type="inner"
                  bodyStyle={{ padding: 25 }}
                  title={formatMessage({ id: 'report.param.searcher' })}
                >
                  <Search
                    placeholder="Введите БИН"
                    enterButton={formatMessage({ id: 'system.search' })}
                    size="large"
                    maxLength={12}
                    style={{ width: 400 }}
                    onSearch={value => this.searchperson(value)}
                  />
                  {this.state.person.iin &&<Button
                    style={{marginLeft:"10px"}}
                    size={'large'}
                    onClick={()=>{
                      if (this.state.iin){
                        this.props.searchbyiin(this.state.iin)
                      }
                    }}
                  >Просмотр платежей</Button>}
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
            <Col span={12}>
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



