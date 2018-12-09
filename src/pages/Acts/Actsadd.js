import React, { Component } from 'react';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card, Spin, Badge, Icon} from 'antd';
import styles from './style.less';

const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import SmartGridView from '@/components/SmartGridView';
import { Tab } from '../../components/Login';
import ActModal from './ActModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'dva/index';


const TabPane = Tabs.TabPane;

const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};




@Form.create()
@connect(({ universal, loading }) => ({
  universal,
  loadingperiodYear: loading.effects['universal/getActperiodYear'],
  loadingperiodSection: loading.effects['universal/getActperiodSection'],
  loadingorganization: loading.effects['universal/getActorganization'],
  loadingmedicalType: loading.effects['universal/getActmedicalType'],
}))

class Actsadd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          'title': 'Код',
          'dataIndex': 'code',
          'isVisible': 'true',
        },
        {
          'title': 'Вид деятельности',
          'dataIndex': 'activity',
          'isVisible': 'true',
        },
        {
          'title': 'Принято к оплате (тг)',
          'dataIndex': 'accept_payment',
          'isVisible': 'true',
        },
        {
          'title': 'Вычет аванса (тг)',
          'dataIndex': 'prepaid',
          'isVisible': 'true',
        },
        {
          'title': 'Итого к оплате (тг)',
          'dataIndex': 'total',
          'isVisible': 'true',
        }
      ],
      data: [
        {
          key: 1, id:"123qwe111", code: '123456', activity: 'Медицинское учереждение', present_payment: 10456, accept_payment:10456, prepaid:2500, total:10456
        },
        {
          key: 2, id:"123qwe222", code: '123456', activity: 'Медицинское учереждение', present_payment: 10456, accept_payment:10456, prepaid:2500, total:10456
        },
        {
          key: 3, id:"123qwe333", code: '123456', activity: 'Медицинское учереждение', present_payment: 10456, accept_payment:10456, prepaid:2500, total:10456
        },
      ],
      ContractSelect: [],
      selectedRowKeys: [],
      modal:false,
      ContractSumms:[]
    }
  }
  deleteContract=()=>{
    /*this.setState({
      data: this.state.data.filter((item) => {
        /!*this.state.ContractTable.filter((select)=>{
          select.key==item.key
        })*!/
      })
    })*/
  }
componentDidMount() {
  const { dispatch } = this.props;
  const DicArr=[
    'periodYear',
    'periodSection',
    'organization',
    'medicalType',
  ]
  DicArr.forEach(function(item) {
    dispatch({
      type: 'universal/getAct'+item,
      payload: {
          "start":0,
          "length":1000,
          "entity":item
      },
    });
  })


/*  dispatch({
    type: 'universal/getActperiodYear',
    payload: {
      table: {
        "start":0,
        "length":20,
        "entity":"periodYear"
      },
    },
  });
  dispatch({
    type: 'universal/getActperiodYear',
    payload: {
      table: {
        "start":0,
        "length":20,
        "entity":"periodYear"
      },
    },
  });
  dispatch({
    type: 'universal/getActperiodYear',
    payload: {
      table: {
        "start":0,
        "length":20,
        "entity":"periodYear"
      },
    },
  });*/
}

  showModal=()=>{
    this.setState({
      modal:true
    })
  }
  CancelModal=()=>{
    this.setState({
      modal:false
    })
  }
  onChangeSumma=(e, d)=>{
    console.log(e.id);
    console.log(d);
    //ContractSumms
    this.setState({
      ContractSumms:[
        ...this.state.ContractSumms.filter((item)=>{item.id != e.id}),
        {
          id: e.id,
          summ: d
        }
      ]
    })
  }
  render() {
    const title = {fontSize:'12px'};
    const rowSelection = {

    };
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
    };
    return (<Spin spinning={this.props.loadingperiodYear && this.props.loadingperiodSection && this.props.loadingorganization && this.props.loadingmedicalType}>
      {this.state.modal &&<ActModal
          addAct={(actitem)=>{
          console.log(actitem);
            this.setState({
              data: [
                ...this.state.data,
                actitem
              ]
            }, ()=>{
              this.CancelModal()
            })
          }}
          onCancel={()=>{
            this.CancelModal()
          }}
       />}
      <Tabs defaultActiveKey="1">
        <TabPane tab="Акт выполненных работ" key="1">
          <Row style={{marginTop:'20px'}}>
            <Form layout="horizontal" hideRequiredMark>

              <Tabs
                className={styles.stepFormText}
                defaultActiveKey="form"
                tabPosition={'left'}>
                <Row>
                  <div style={{width:'100%'}}>
                    <Button
                      style={{float:'left', margin: '0px 0px 10px -10px'}}>
                      Сохранить
                    </Button>
                    <Button
                      style={{float:'left', margin: '0px 0px 10px 10px'}}>
                      <Icon><FontAwesomeIcon icon={faTrash}/></Icon> Очистить
                    </Button>
                  </div>
                </Row>
                <TabPane tab="Титульная часть" key="form">
                  <Card style={{marginLeft: '-10px'}}>
                    <div style={{margin:'10px 0', maxWidth:'70%'}}>
                      <Form.Item {...formItemLayout} label="Номер">
                        {getFieldDecorator('number', {
                          initialValue: '',
                          rules: [{ required: true, message: 'не заполнено'}],
                        })(<Input style={{width:'50%'}}/>)}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Дата">
                        {getFieldDecorator('date', {
                          initialValue: '',
                          rules: [{ required: true, message: 'не заполнено' }],
                        })(
                          <DatePicker
                            format={'DD.MM.YYYY'}
                            style={{width:'50%'}}
                            placeholder="Выберите дату"
                          />
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Отчетный период: год">
                        {getFieldDecorator('act_period_year', {
                          initialValue: '',
                          rules: [{ required: true, message: 'не заполнено' }],
                        })(
                          <Select style={{width:'50%'}}>
                            {this.props.universal.actperiodYear.content && this.props.universal.actperiodYear.content.map((item) => {
                                    return <Select.Option key={item.id}>{item.year}</Select.Option>;
                                })}
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Отчетный период: месяц">
                        {getFieldDecorator('act_period_month', {
                          initialValue: '',
                          rules: [{ required: true, message: 'не заполнено' }],
                        })(
                          <Select style={{width:'50%'}}>
                            {this.props.universal.actperiodSection.content && this.props.universal.actperiodSection.content.map((item) => {
                              return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                            })}
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Подразделение">
                        {getFieldDecorator('podr', {
                          initialValue: '',
                          rules: [{ required: true, message: 'не заполнено' }],
                        })(
                          <Select>
                            {this.props.universal.actorganization.content && this.props.universal.actorganization.content.map((item) => {
                              return <Select.Option key={item.id}>{item.name}</Select.Option>;
                            })}
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Примечание">
                        {getFieldDecorator('notes', {
                          initialValue: '',
                          rules: [{ required: true, message: 'не заполнено' }],
                        })(
                          <Input />
                        )}
                      </Form.Item>
                    </div>
                    <Row>
                      <div style={{width:'100%'}}>

                      </div>
                    </Row>
                  </Card>
                </TabPane>
                <TabPane tab={<Badge count={this.state.data.length} style={{ backgroundColor: '#1990FF', margin:'-4px' }}><div><span style={title}>Спецификации</span></div></Badge>} key="contracts">
                  <Card style={{marginLeft: '-10px'}}>
                    <SmartGridView
                      name={'actform'}
                      scroll={{ x: 'auto' }}
                      searchButton={false}
                      fixedBody={true}
                      rowKey={'id'}
                      loading={false}
                      fixedHeader={false}
                      hideRefreshBtn={true}
                      hideFilterBtn={true}
                      rowSelection={true}
                      showExportBtn={true}
                      showTotal={true}
                      hidePagination={true}
                      columns={this.state.columns}
                      actionColumns={[
                        {
                          title: 'Предъявлено к оплате (тг)',
                          order: 10,
                          width: 200,
                          key: 'operation',
                          className: 'action_column',
                          isVisible: true,
                          onCell: record => {
                            return {
                              onClick: () => {

                              },
                            };
                          },
                          render: (e) => (
                            <Input
                              onChange={(d)=>{
                                /*console.log(e);
                                console.log(d.target.value);*/
                                this.onChangeSumma(e, d.target.value)
                              }}
                            />
                          ),
                        }]}
                      sorted={false}
                      showTotal={true}
                      addonButtons={[]}
                      actionExport={() => {}}
                      onSelectRow={(record, index) => {
                        //console.log(record)
                      }}
                      dataSource={{
                        total: this.state.data.length,
                        pageSize: this.state.data.length,
                        page: 1,
                        data: this.state.data,
                      }}
                      onShowSizeChange={(pageNumber, pageSize) => {}}
                      onRefresh={() => {

                      }}
                      onSearch={() => {

                      }}
                    />
                  </Card>
                </TabPane>
              </Tabs>
              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: {
                    span: formItemLayout.wrapperCol.span,
                    offset: formItemLayout.labelCol.span,
                  },
                }}
                label=""
              >
              </Form.Item>
            </Form>
          </Row>
        </TabPane>
      </Tabs>
      </Spin> );
  }
}

export default Actsadd;
