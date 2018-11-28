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
  Form
} from 'antd';
import { connect } from 'dva/index';

const FormItem = Form.Item;

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
        "lastname": null
      },
      payes:[],
      loading:false
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

  searchperson=()=>{
    const { dispatch } = this.props;
    this.setState({
      loading: true
    },()=>{
      dispatch({
        type: 'universal/SearcherData',
        payload: {
          iin: this.state.iin,
        },
      }).then(() => {
        if (JSON.stringify(this.props.universal.searcherdata)!=="{}") {
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
              "lastname": null
            },
            loading: false
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
    const CardHeight={height:'550px', marginBottom:'10px'};
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
    const data = [{
      name: 'ИИН',
      value: person.iin,
    }, {
      name: 'ФАМИЛИЯ',
      value: person.lastname,
    }, {
      name: 'ОТЧЕСТВО',
      value: person.secondname,
    }, {
      name: 'ИМЯ',
      value: person.firstname,
    }, {
      name: 'ДАТА РОЖДЕНИЯ',
      value: person.birthdate,
    }, {
      name: 'ПОЛ',
      value: person.dSexId.nameRu,
    }];
    const { iin, surname, name, patronic, bdate } = this.state;

    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.rpmu.searcher' })}>
        <Spin tip="" spinning={this.state.loading}>
          <Row style={{ marginBottom:'10px' }}>
            <Col span={18}>
              <div style={CardHeight}>
                <Card
                  style={{height:'150px'}}
                  type="inner"
                  title={formatMessage({ id: 'report.param.searcher' })}
                >
                  <Form layout="inline">
                    <FormItem
                      label={<span style={{fontSize:'15px', fontWeight: 'bold'}}>{formatMessage({ id: 'profile.field.iin' })}</span>}
                    >
                        <Input
                          value={iin}
                          name='iin'
                          onChange={(e) => {
                            this.formfield(e);
                          }}
                        />
                    </FormItem>
                    <FormItem>
                      <Button
                        type='primary'
                        style={{marginLeft:"7px"}}
                        onClick={()=>{
                          this.searchperson();
                        }}
                      >
                        {formatMessage({ id: 'system.search' })}
                      </Button>
                    </FormItem>
                  </Form>
                </Card>
                <Card
                  style={{height:'400px'}}
                  title={formatMessage({ id: 'report.param.personinform' })}
                  type="inner"
                >
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ position: 'none' }}
                    showHeader={false}
                  />
                </Card>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ width: '100%', height:'550px', backgroundColor:'white', border: "1px solid #d9d9d9", borderRadius: 4, marginBottom:'30px' }}>
                <Calendar
                  onPanelChange={this.onPanelChange}
                  mode='year'
                  className={style.customCalendar}
                  monthCellRender={this.monthCellRender}
                  fullscreen
                />
              </div>
            </Col>
          </Row>
        </Spin>
      </PageHeaderWrapper>
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



