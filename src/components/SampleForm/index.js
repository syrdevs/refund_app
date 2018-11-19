import React, { Component } from 'react';
import { Tabs, Spin, Form, Divider, Button, Icon, Col, Card, Row, Select, Input, Table, Popconfirm, DatePicker, LocaleProvider  } from 'antd';
import FieldCreator from '../FieldCreator/FieldCreator';
import index from '../PageHeaderWrapper';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import styles from './SampleForm.less';
import componentLocal from '../../locales/components/componentLocal';
import moment from 'moment/moment';
import { connect } from 'dva/index';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { md: 6, xs: 24, sm: 24 },
  wrapperCol: { md: 18, xs: 24, sm: 24},
};
const formRenderLayout = {
  labelCol: { md: 24, xs: 24, sm: 24 },
  wrapperCol: { md: 24, xs: 24, sm: 24},
}
const Option = Select.Option;
function momentDefine() {
  var suffixes = {
    0: '-ші',
    1: '-ші',
    2: '-ші',
    3: '-ші',
    4: '-ші',
    5: '-ші',
    6: '-шы',
    7: '-ші',
    8: '-ші',
    9: '-шы',
    10: '-шы',
    20: '-шы',
    30: '-шы',
    40: '-шы',
    50: '-ші',
    60: '-шы',
    70: '-ші',
    80: '-ші',
    90: '-шы',
    100: '-ші',
  };

  var kk = moment.defineLocale('en', {
    months: 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
    monthsShort: 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
    weekdays: 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
    weekdaysShort: 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
    weekdaysMin: 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm',
    },
    calendar: {
      sameDay: '[Бүгін сағат] LT',
      nextDay: '[Ертең сағат] LT',
      nextWeek: 'dddd [сағат] LT',
      lastDay: '[Кеше сағат] LT',
      lastWeek: '[Өткен аптаның] dddd [сағат] LT',
      sameElse: 'L',
    },
    relativeTime: {
      future: '%s ішінде',
      past: '%s бұрын',
      s: 'бірнеше секунд',
      ss: '%d секунд',
      m: 'бір минут',
      mm: '%d минут',
      h: 'бір сағат',
      hh: '%d сағат',
      d: 'бір күн',
      dd: '%d күн',
      M: 'бір ай',
      MM: '%d ай',
      y: 'бір жыл',
      yy: '%d жыл',
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/,
    ordinal: function(number) {
      var a = number % 10,
        b = number >= 100 ? 100 : null;
      return number + (suffixes[number] || suffixes[a] || suffixes[b]);
    },
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 7,  // The week that contains Jan 1st is the first week of the year.
    },
  });

}
const RendetField =({name, label, type, getFieldDecorator, validatemessage, references}) => {
  switch (type) {
    case 'combobox': {
      return(
        <FormItem
          style={{marginBottom:'0px'}}
          label={label}

        >
          {getFieldDecorator(name, {
            rules: [{
              required: true,
              message: validatemessage,
            }],
          })(
            <Select  key={name} style={{marginLeft:'10px', width:'95%'}} name={name}>
              {references.knp && references.knp.map((item) => {
                return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
              })}
            </Select>)}
        </FormItem>
      )}
    case 'text': {
      return(
        <FormItem
          style={{marginBottom:'0px'}}
          key={name}
          label={label}
        >
          {getFieldDecorator(name, {
            rules: [{
              required: true,
              message: validatemessage,
            }],
            initialValue: ''
          })(
            <Input  key={name} style={{marginLeft:'10px', width:'95%'}} name={name}/>)}
        </FormItem>
      )}
    case 'datePicker': {
      return(
        <FormItem
          style={{marginBottom:'0px'}}
          label={label}
        >
          {getFieldDecorator(name, {
            rules: [{
              required: true,
              message: validatemessage,
            }],
            initialValue: ''
          })(
            <LocaleProvider locale={componentLocal}>
              <DatePicker name={name} format={'DD.MM.YYYY'}/>
            </LocaleProvider>)}
        </FormItem>
      )}
    default:
      break;
  }
}

@connect(({ references, loading }) => ({
  references,
  loadingData: loading.effects['references/load'],
}))
class SampleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identities:[],
      idents:[],
      data:{
        codeagent:null,
      },
      panes: [
        { title: 'Адреса', content:  [
          {
            name: 'adresstype',
            label: 'Вид адреса',
            type: 'combobox',
          },
          {
              name: 'adressname',
              label: 'Адрес',
              type: 'text',
            },
          {
              name: 'adressbeginDate',
              label: 'Дата начала действия',
              type: 'datePicker',
            },
          {
              name: 'adressendDate',
              label: 'Дата окончания действия',
              type: 'datePicker',
            }],key: '2' },
        { title: 'Контакты', content:  [
            {
              name: 'contacttype',
              label: 'Вид контакта',
              type: 'combobox',
            },
            {
              name: 'contactname',
              label: 'Контакт',
              type: 'text',
            },
            {
              name: 'contactnote',
              label: 'Примечание',
              type: 'text',
            },
            {
              name: 'contactbeginDate',
              label: 'Дата начала действия',
              type: 'datePicker',
            },
            {
              name: 'contactendDate',
              label: 'Дата окончания действия',
              type: 'datePicker',
            }],key: '3' },
        { title: 'Банковские реквизиты', content:  [
            {
              name: 'bik',
              label: 'БИК',
              type: 'text',
            },
            {
              name: 'bankname',
              label: 'Наименование банка (краткое)',
              type: 'text',
            },
            {
              name: 'iik',
              label: 'ИИК',
              type: 'text',
            },
            {
              name: 'currency',
              label: 'Валюта счета',
              type: 'combobox',
            },
            {
              name: 'bankbeginDate',
              label: 'Дата начала действия',
              type: 'datePicker',
            },
            {
              name: 'bankendDate',
              label: 'Дата окончания действия',
              type: 'datePicker',
            }],key: '4' },
        { title: 'Ответственные лица', content:  [
            {
              name: 'position',
              label: 'Должность',
              type: 'combobox',
            },
            {
              name: 'surname',
              label: 'Фамилия',
              type: 'text',
            },
            {
              name: 'name',
              label: 'Имя',
              type: 'text',
            },
            {
              name: 'patronic',
              label: 'Отчество',
              type: 'text',
            },
            {
              name: 'bdate',
              label: 'Дата рождения',
              type: 'text',
            },
            {
              name: 'fio_genitive_initials',
              label: 'Фамилия и инициалы в родительном падеже',
              type: 'text',
            },
            {
              name: 'fiobeginDate',
              label: 'Дата начала действия',
              type: 'datePicker',
            },
            {
              name: 'fioendDate',
              label: 'Дата окончания действия',
              type: 'datePicker',
            }
          ],key: '5' },
        { title: 'Регистр СЗ', content:  [
            {
              name: 'registrbeginDate',
              label: 'Дата включения в регистр',
              type: 'datePicker',
            },
            {
              name: 'registrendDate',
              label: 'Дата исключения из регистра',
              type: 'datePicker',
            },
            {
              name: 'registr_reason',
              label: 'Причина исключения',
              type: 'combobox',
            }
          ],key: '6' },
        { title: 'Организация', content:  [
            {
              name: 'org_form',
              label: 'Организационно-правовая форма',
              type: 'combobox',
            },
            {
              name: 'org_name',
              label: 'Наименование',
              type: 'text',
            },
            {
              name: 'full_org_name',
              label: 'Наименование полное',
              type: 'text',
            },
            {
              name: 'short_org_name',
              label: 'Наименование краткое',
              type: 'text',
            }
          ],key: '7' }
      ],
      fizpane: { title: 'Физическое лицо', content:  [
          {
            name: 'fiz_surname',
            label: 'Фамилия',
            type: 'text',
          },
          {
            name: 'fiz_name',
            label: 'Имя',
            type: 'text',
          },
          {
            name: 'fiz_patronic',
            label: 'Отчество',
            type: 'text',
          },
          {
            name: 'gender',
            label: 'Пол',
            type: 'combobox',
          },
          {
            name: 'fio_genitive',
            label: 'ФИО в родительном падеже',
            type: 'text',
          },
          {
            name: 'fiz_fio_genitive',
            label: 'ФИО в родительном падеже',
            type: 'text',
          },
          {
            name: 'fiz_fio_genitive_initials',
            label: 'Фамилия и инициалы в родительном падеже',
            type: 'text',
          },
        ],key: '7' },
      orgpane: { title: 'Организация', content:  [
          {
            name: 'org_form',
            label: 'Организационно-правовая форма',
            type: 'combobox',
          },
          {
            name: 'org_name',
            label: 'Наименование',
            type: 'text',
          },
          {
            name: 'full_org_name',
            label: 'Наименование полное',
            type: 'text',
          },
          {
            name: 'short_org_name',
            label: 'Наименование краткое',
            type: 'text',
          }
        ],key: '7' },
      count: 0,
      isNew:false,
      validatemessage:'Поле обязательно для заполнения',
      columns: [{
        title: 'Идентификатор',
        dataIndex: 'identitytype',
        type: 'combobox',
        width: '15%',
        render: (text, record) => {
          return (
            <FormItem
            >
              {this.props.form.getFieldDecorator('identitytype'+record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(
                <Select name={'identitytype'+record.key} style={{ width: 150 }} onChange={(e)=>{this.identValue(e, record, 'identitytype')}}>
                  {this.props.references.knp && this.props.references.knp.map((item) => {
                  return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                })}
                </Select>)}</FormItem>)
        },
      },
        {
        title: 'Значение',
        dataIndex: 'identityname',
        width: '35%',
        render: (text, record) => {
          return (
            <FormItem
            >
              {this.props.form.getFieldDecorator('identityname'+record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(
                <Input name={'identityname'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'identityname')}}/>)}
            </FormItem>)
        },
      },
        {
        title: 'Дата начала действия',
        dataIndex: 'identitybeginDate',
        width: '25%',
        render: (text, record) => {
          return (
            <FormItem
            >
              {this.props.form.getFieldDecorator('identitybeginDate'+record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(
            <DatePicker name={'identitybeginDate'+record.key}  format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'identitybeginDate')}}/>)}
            </FormItem>
          )
        },
      },
        {
          title: 'Дата окончания действия',
          dataIndex: 'identityendDate',
          width: '25%',
          render: (text, record) => {
            return (<FormItem
            >
              {this.props.form.getFieldDecorator('identityendDate'+record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(<LocaleProvider locale={componentLocal}>
                  <DatePicker name={'identityendDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'identityendDate')}}/>
              </LocaleProvider>)}
            </FormItem>)
          },
        },
        {
          title: 'Действие',
          dataIndex: 'operation',
          width: '10%',
          render: (text, record) => {
            const { editable } = record;
            return (
              <div>
                <a onClick={() => this.remove(record.key)}>Удалить</a>
              </div>
            );
          },
        }
      ],
      hasError: false
    };
  }

  componentDidMount() {
    if (getLocale() === 'en-US') {
      momentDefine();
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'references/load',
      code: 'knp',
    });
  }

  tabchange(key) {
    console.log(key);
  }

  selecttypeagent = (e) => {
    this.setState({
      panes: [
        ...this.state.panes.filter((item)=>item.key !=='7'),
        this.state[e],

      ]
    });
  }

  fieldOnChange = (filterItem, value) => {
    this.setState({
      data: {
        ...this.state.data,
        [filterItem.name]: value
      }
    })
  };

  identValue = (e, record, name) => {
    this.setState({
      idents: [
       ...this.state.idents.filter((value,index)=> value.key!==record.key),
       {
         key: record.key,
         identitytype: record.identitytype,
         identityname: record.identityname,
         identitybeginDate: record.identitybeginDate,
         identityendDate: record.identityendDate,
         [name]:e
       }
     ]
   })
  }

  remove(key) {
    this.setState({
      identities: [
        ...this.state.identities.filter(item => key !==item.key)
      ]
    })
  }

  mainfiels=(e)=>{
    this.setState({
      data:{
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    })
  }

  AddIdentity =() => {
    this.setState({
      identities: [
        ...this.state.identities,
        {
          key: this.state.count,
          identitytype: null,
          identityname: null,
          identitybeginDate: null,
          identityendDate: null,
        }

      ],
      count: this.state.count+1
    })
  }

  sendserver = (e) => {
    console.log(this.props.references)
    this.props.form.validateFields(
      (err, values) => {
        if (!err) {
          console.log({
            ...values,
            identities: this.state.idents
          })
        }
        else {
          this.setState({
            hasError:true
          })
        }
      },
    );


  }

  cancelform = () => {

  }

  render() {
    const {panes} = this.state;
    const dateFormat = 'DD.MM.YYYY';
    const title = {fontSize:'15px', fontWeight: 'bold'};
    const titledata = {marginLeft:'10px', width:'95%'};
    const errStyle = {color: 'red', textAlign: 'right', fontSize: '17px', marginRight: '16px'}
    const {
      form: { getFieldDecorator },
    } = this.props;



    return (
      <Card
        title="Форма регистрации контрагента"
        bodyStyle={{ padding: 5 }}
      >
        <Form layout={'horizontal'}>
          <Row>
            <div style={{marginTop:'20px'}}>
              {this.state.isNew &&
              <div>
                <FormItem
                  label={<span style={title}>Краткое наименование</span>}
                  {...formItemLayout}
                >
                  <div style={titledata}>AО Нейрореабилитационный центр "Луч"</div>
                </FormItem>
                <FormItem
                  style={{marginBottom: '10px'}}
                  label={<span style={title}>Полное наименование</span>}
                  {...formItemLayout}
                >
                  <div style={titledata}>Aкционерное Общество Нейрореабилитационный центр "Луч"</div>
                </FormItem>
              </div>}
              <FormItem
                label={<span style={title}>Код контрагента</span>}
                {...formItemLayout}
              >
                {getFieldDecorator('codeagent', {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                  initialValue: this.state.data.codeagent
                })(
                <Input style={titledata} name='codeagent' onChange={(e)=>{this.mainfiels(e)}} disabled={this.state.isNew}/>)}
              </FormItem>
              <FormItem
                style={{marginBottom: '10px'}}
                label={<span style={title}>Вид контрагента</span>}
                {...formItemLayout}
              >
                <Select  defaultValue="Организация" style={titledata} onChange={this.selecttypeagent}>
                  <Option value="orgpane">Организация</Option>
                  <Option value="fizpane">Физическое лицо</Option>
                </Select>
              </FormItem>
              {this.state.isNew &&
              <div>
                <FormItem
                  label={<span style={title}>ОПФ</span>}
                  {...formItemLayout}
                >
                  <Select  defaultValue="AO" style={titledata} disabled>
                    <Option value="AO">АО "Акционерное Общество"</Option>
                    <Option value="TOO">ТОО "Товарищество с ограниченной ответственностью"</Option>
                  </Select>
                </FormItem>
                <FormItem
                  style={{marginBottom: '10px'}}
                  label={<span style={title}>Полное наименование</span>}
                  {...formItemLayout}
                >
                  <Input style={titledata} value='Нейрореабилитационный центр "Луч"' disabled/>
                </FormItem>
              </div>}
            </div>
          </Row>
          <Row>
            <div style={{ margin: '0px 20px 0px 20px' }}>
              <Divider
                style={{ marginBottom: '20px' }}
              />
              <Tabs
                onChange={() =>{this.tabchange}}
                tabPosition='left'
                style={{marginBottom:'20px', minHeight: '550px'}}
              >
              <TabPane tab={<span style={title}>Идентификатор</span>} key={0}>

                <div>
                  <Button onClick={this.AddIdentity} type="primary" style={{ marginBottom: 16 }}>
                    Добавить
                  </Button>
                  <Table bordered dataSource={this.state.identities} columns={this.state.columns} />
                </div>


              </TabPane>
              {panes.map(pane =>
              <TabPane tab={<span style={title}>{pane.title}</span>}  key={pane.key}>
                {/*<FieldCreator
                  filterForm={pane.content}
                  dateFormat={dateFormat}
                  getFieldDecorator={getFieldDecorator}
                  validatemessage={this.state.validatemessage}
                  fieldOnChange={this.fieldOnChange}

                />*/}
                {pane.content.map((content)=>{

                  return(
                    <RendetField
                      key={content.name}
                      name={content.name}
                      label={content.label}
                      type={content.type}
                      getFieldDecorator={getFieldDecorator}
                      validatemessage={this.state.validatemessage}
                      references={this.props.references}
                    />
                  )})}
              </TabPane>
              )}
            </Tabs>
            </div>
          </Row>
          <Row>
            {this.state.hasError && <div style={errStyle} className='ant-form-explain'>Пожалуйста заполните обязательные поля</div>}
            <Divider
              style={{ margin: '16px 10px 0 0', height: '2px' }}
            />
          </Row>
          <Row>
            <Col>
              <div style={{float: 'right', margin: '20px 20px 10px 0'}}>
                <Button
                  size={'large'}
                  style={{ marginRight: '20px'}}
                  type='primary'
                  onClick={(e)=>{this.sendserver(e)}}
                >
                  Добавить
                </Button>
                <Button
                  size={'large'}
                  onClick={(e)=>{this.cancelform()}}
                >
                  Отменить
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  };
}
export default Form.create()(SampleForm);
