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
  Tabs
} from 'antd';
import { connect } from 'dva/index';

const FormItem = Form.Item;
const Search = Input.Search;
const TabPane = Tabs.TabPane;

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
class Searcher extends Component {
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
    let isPayed  = false;
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
    }
  }

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
    const {person} = this.state;

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
    const  data = [{
        key:1,
        name: 'ИИН',
        value: person.iin ? person.iin.toUpperCase() : person.iin,
      }, {
        key:2,
        name: 'ФАМИЛИЯ',
        value: person.lastname ? person.lastname.toUpperCase() : person.lastname,
      },  {
        key:3,
        name: 'ИМЯ',
        value: person.firstname ? person.firstname.toUpperCase() : person.firstname,
      }, {
        key:4,
        name: 'ОТЧЕСТВО',
        value: person.secondname ? person.secondname.toUpperCase() : person.secondname,
      }, {
        key:5,
        name: 'ДАТА РОЖДЕНИЯ',
        value: person.birthdate ? person.birthdate.toUpperCase() : person.birthdate,
      }, {
        key:6,
        name: 'ПОЛ',
        value: person.dSexId.nameRu ? person.dSexId.nameRu.toUpperCase() : person.dSexId.nameRu,
      }, {
        key:7,
        name: 'НАЦИОНАЛЬНОСТЬ',
        value: person.nationality.nameRu ? person.nationality.nameRu.toUpperCase() : person.nationality.nameRu ,
      }, {
        key:8,
        name: 'ГРАЖДАНСТВО',
        value: person.citizenship.nameRu ? person.citizenship.nameRu.toUpperCase() : person.citizenship.nameRu ,
      }, {
        key:9,
        name: 'СТАТУС СТРАХОВАНИЯ',
        value: person.firstname ? (person.status ? formatMessage({ id: 'report.param.medinsstattrue' }).toUpperCase() : formatMessage({ id: 'report.param.medinsstatfalse' }).toUpperCase()): '',
      }, {
        key:10,
        name: 'КАТЕГОРИИ',
        value: person.categories.map((category) =>
          <div>
            <div style={{width: '80%',wordWrap: 'break-word'}} color="blue">{category.name.toUpperCase()}</div><br></br>
          </div>),
      }, {
        key:11,
        name: 'Медицинская организация'.toUpperCase(),
        value: person.clinic ? person.clinic.toUpperCase() : person.clinic,
      }, {
        key:12,
        name: 'Дата прикрепления'.toUpperCase(),
        value: person.clinic_date ? person.clinic_date.toUpperCase() : person.clinic_date,
      }
      ];

    const dataRPM = [{
      key:1,
      name: 'ИИН',
      value: person.iin ? person.iin.toUpperCase() : person.iin,
    }, {
      key:2,
      name: 'ФАМИЛИЯ',
      value: person.lastname ? person.lastname.toUpperCase() : person.lastname,
    },  {
      key:3,
      name: 'ИМЯ',
      value: person.firstname ? person.firstname.toUpperCase() : person.firstname,
    }, {
      key:4,
      name: 'ОТЧЕСТВО',
      value: person.secondname ? person.secondname.toUpperCase() : person.secondname,
    }, {
      key:5,
      name: 'ДАТА РОЖДЕНИЯ',
      value: person.birthdate ? person.birthdate.toUpperCase() : person.birthdate,
    }, {
      key:6,
      name: 'ПОЛ',
      value: person.dSexId.nameRu ? person.dSexId.nameRu.toUpperCase() : person.dSexId.nameRu,
    }, {
      key:7,
      name: 'НАЦИОНАЛЬНОСТЬ',
      value: person.nationality.nameRu ? person.nationality.nameRu.toUpperCase() : person.nationality.nameRu ,
    }, {
      key:8,
      name: 'ГРАЖДАНСТВО',
      value: person.citizenship.nameRu ? person.citizenship.nameRu.toUpperCase() : person.citizenship.nameRu ,
    }
    ];

    const {iin} = this.state;

    return (<div>
        <Spin tip="" spinning={this.state.loading}>
          <Row style={{ marginBottom:'10px' }}>
              <Row>
                <div style={CardHeight}>
                  <Card
                    style={{height:'140px', marginBottom:'10px'}}
                    type="inner"
                    bodyStyle={{ padding: 25 }}
                    title={formatMessage({ id: 'report.param.searcher' })}
                  >

                    <Col span={12}>
                      <Search
                        placeholder="Введите ИИН"
                        enterButton={formatMessage({ id: 'system.search' })}
                        size="large"
                        maxLength={12}
                        style={{ width: 600 }}
                        onSearch={value => this.searchperson(value)}
                      />
                    </Col>
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
                </div>
              </Row>



            <Tabs
              defaultActiveKey="1"
              tabPosition={'left'}
              style={{ height: 'auto' }}
            >
              <TabPane tab={formatMessage({ id: this.props.persontitle })}
                       key="1"
              >
                <Row  gutter={12}>
                  <Col span={12}>
                    <Card
                      bodyStyle={{height:'auto'}}
                      title={formatMessage({ id: this.props.persontitle })}
                      type="inner"
                    >
                      <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{ pageSize: 50, position: 'none' }}
                        showHeader={false}
                        size={'default'}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                      bodyStyle={{height:'auto'}}
                      title={formatMessage({ id: this.props.persontitle })}
                      type="inner"
                    >
                      <Table
                        columns={columns}
                        dataSource={dataRPM}
                        pagination={{ pageSize: 50, position: 'none' }}
                        showHeader={false}
                        size={'default'}
                      />
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab={formatMessage({ id: 'report.param.monthpay' })}
                       key="2"
              >
                <Row>
                  <Col span={24}>
                    <Card
                      style={{height:'600', marginTop: '10px'}}
                      title={formatMessage({ id: 'report.param.monthpay' })}
                      type="inner"
                    >
                      <Calendar
                        onPanelChange={this.onPanelChange}
                        mode='year'
                        className={style.customCalendar}
                        monthCellRender={this.monthCellRender}
                        fullscreen
                      />
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Row>
        </Spin>
      </div>
    );
  }
}
export default Searcher;



{/*<Input
                      value={iin}
                      name='iin'
                      onChange={(e) => {
                        this.formfield(e);
                    }}
                    />*/}
{/*<Button
                    onClick={()=>{
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
                          "lastname": null
                        }
                      })
                  }}
                  >
                    {formatMessage({ id: 'system.clear' })}
                  </Button>*/}



