import React, { Component } from 'react';
import { Tabs, Spin, Form, Divider, Button, Icon, Col, Card, Row, Select, Input, Table, Popconfirm, DatePicker, LocaleProvider, Badge  } from 'antd';
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
              <DatePicker style={{marginLeft:'10px', width:'95%'}} name={name} format={'DD.MM.YYYY'}/>
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
    {/*<TabPane tab={<span style={title}>Идентификаторы</span>} key={0}>

                <div>
                  <Button onClick={this.AddIdentity} type="primary" style={{ marginBottom: 16 }}>
                    Добавить
                  </Button>
                  <Table bordered={false} dataSource={this.state.identities} columns={this.state.columns} />
                </div>


              </TabPane>*/}
    this.state = {
      identities:[],
      adresses:[],
      contacts:[],
      banks:[],
      responses: [],
      RegistrerSZs: [],
      idents:[],
      data:{
        codeagent:null,
      },
      panes: [
        /*{ title: 'Адреса', content:  [
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
            }],key: '2' },*/
        /*{ title: 'Контакты', content:  [
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
            }],key: '3' },*/
        /*{ title: 'Банковские реквизиты', content:  [
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
            }],key: '4' },*/
        /*{ title: 'Ответственные лица', content:  [
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
              name: 'fio_parently_initials',
              label: 'Фамилия, имя, отчество в родительном падеже',
              type: 'text',
            },
            {
              name: 'fio_genitive_initials',
              label: 'Фамилия и инициалы в родительном падеже',
              type: 'text',
            },
            /!*{
              name: 'fiobeginDate',
              label: 'Дата начала действия',
              type: 'datePicker',
            },
            {
              name: 'fioendDate',
              label: 'Дата окончания действия',
              type: 'datePicker',
            }*!/
          ],key: '5' },*/
        /*{ title: 'Данные о включении в регистр СЗ', content:  [
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
          ],key: '6' },*/
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
      adresscount: 0,
      contactcount: 0,
      bankcount: 0,
      responsecount:0,
      RegisterSZcount:0,
      isNew:false,
      validatemessage:'Поле обязательно для заполнения',
      columns: [
        {
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
                <Select name={'identitytype'+record.key} style={{ width: 250 }} onChange={(e)=>{this.identValue(e, record, 'identitytype')}}>
                  {this.props.references.knp && this.props.references.knp.map((item) => {
                    return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                  })}
                </Select>
                  )}
                  </FormItem>)
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
            <DatePicker style={{width:'100%'}} name={'identitybeginDate'+record.key}  format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'identitybeginDate')}}/>)}
            </FormItem>
          )
        },
      },
        {
          title: 'Дата окончания действия',
          dataIndex: 'identityendDate',
          width: '20%',
          render: (text, record) => {
            return (<FormItem
            >
              {this.props.form.getFieldDecorator('identityendDate'+record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(<LocaleProvider locale={componentLocal}>
                  <DatePicker style={{width:'100%'}} name={'identityendDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'identityendDate')}}/>
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
              <div style={{marginTop: '-20px'}}>
                <a onClick={() => this.remove('identities',record.key, 'count')}>Удалить</a>
              </div>
            );
          },
        }
      ],
      addrescolumns: [
        {
        dataIndex: 'adresstype',
        title: 'Вид адреса',
          width: '20%',
        render: (text, record) => {
          return (
            <FormItem
            >
              {this.props.form.getFieldDecorator('adresstype'+record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(
                <Input name={'adresstype'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'adresstype')}}/>)}
            </FormItem>)
        },
      },
        {
          dataIndex: 'adressname',
          title: 'Адрес',
          width: '40%',
          render: (text, record) => {
            return (
              <FormItem
              >
                {this.props.form.getFieldDecorator('adressname'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Input name={'adressname'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'adressname')}}/>)}
              </FormItem>)
          },
        },
        {
          dataIndex: 'adressbeginDate',
          title: 'Дата начала действия',
          width: '13%',
          render: (text, record) => {
            return (<FormItem
            >
              {this.props.form.getFieldDecorator('adressbeginDate'+record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(<LocaleProvider locale={componentLocal}>
                <DatePicker style={{width:'100%'}} name={'adressbeginDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'adressbeginDate')}}/>
              </LocaleProvider>)}
            </FormItem>)
          },
        },
        {
          dataIndex: 'adressendDate',
          title: 'Дата окончания действия',
          width: '15%',
          render: (text, record) => {
            return (<FormItem
            >
              {this.props.form.getFieldDecorator('adressendDate'+record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(<LocaleProvider locale={componentLocal}>
                <DatePicker style={{width:'100%'}} name={'adressendDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'adressendDate')}}/>
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
              <div style={{marginTop: '-20px'}}>
                <a onClick={() => this.remove('adresses',record.key, 'adresscount')}>Удалить</a>
              </div>
            );
          },
        }
        ],
      contactcolumns: [
        {
          dataIndex: 'contacttype',
          title: 'Вид контакта',
          width: '15%',
          render: (text, record) => {
            return (
              <FormItem
              >
                {this.props.form.getFieldDecorator('contacttype'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Select name={'contacttype'+record.key} style={{ width: 250 }} onChange={(e)=>{this.identValue(e, record, 'contacttype')}}>
                    {this.props.references.knp && this.props.references.knp.map((item) => {
                      return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                    })}
                  </Select>
                  )}
              </FormItem>)
          },
        },
        {
          dataIndex: 'contactname',
          title: 'Контакт',
          width: '15%',
          render: (text, record) => {
            return (
              <FormItem
              >
                {this.props.form.getFieldDecorator('contactname'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Input name={'contactname'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'contactname')}}/>)}
              </FormItem>)
          },
        },
        {
          dataIndex: 'contactnote',
          title: 'Примечание',
          width: '30%',
          render: (text, record) => {
            return (
              <FormItem
              >
                {this.props.form.getFieldDecorator('contactnote'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Input name={'contactnote'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'contactnote')}}/>)}
              </FormItem>)
          },
        },
        {
          dataIndex: 'contactbeginDate',
          title: 'Дата начала действия',
          width: '13%',
          render: (text, record) => {
            return (<FormItem
            >
              {this.props.form.getFieldDecorator('contactbeginDate'+record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(<LocaleProvider locale={componentLocal}>
                <DatePicker style={{width:'100%'}} name={'contactbeginDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'contactbeginDate')}}/>
              </LocaleProvider>)}
            </FormItem>)
          },
        },
        {
          dataIndex: 'contactendDate',
          title: 'Дата окончания действия',
          width: '15%',
          render: (text, record) => {
            return (<FormItem
            >
              {this.props.form.getFieldDecorator('contactendDate'+record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(<LocaleProvider locale={componentLocal}>
                <DatePicker style={{width:'100%'}} name={'contactendDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'contactendDate')}}/>
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
              <div style={{marginTop: '-20px'}}>
                <a onClick={() => this.remove('contacts',record.key, 'contactcount')}>Удалить</a>
              </div>
            );
          },
        }
      ],
      bankcolumns: [
        {
          dataIndex: 'bik',
          title: 'БИК',
          width: '15%',
          render: (text, record) => {
            return (
              <FormItem
              >
                {this.props.form.getFieldDecorator('bik'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Input name={'bik'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'bik')}}/>)}
              </FormItem>)
          },
        },
        {
          dataIndex: 'bankname',
          title: 'Наименование банка (краткое)',
          width: '25%',
          render: (text, record) => {
            return (
              <FormItem
              >
                {this.props.form.getFieldDecorator('bankname'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Input name={'bankname'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'bankname')}}/>)}
              </FormItem>)
          },
        },
        {
          dataIndex: 'iik',
          title: 'ИИК',
          width: '10%',
          render: (text, record) => {
            return (
              <FormItem
              >
                {this.props.form.getFieldDecorator('iik'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Input name={'iik'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'iik')}}/>)}
              </FormItem>)
          },
        },
        {
          dataIndex: 'currency',
          title: 'Валюта счета',
          width: '10%',
          render: (text, record) => {
            return (
              <FormItem
              >
                {this.props.form.getFieldDecorator('currency'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Select name={'currency'+record.key} style={{ width: 150 }} onChange={(e)=>{this.identValue(e, record, 'currency')}}>
                    {this.props.references.knp && this.props.references.knp.map((item) => {
                      return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                    })}
                  </Select>
                )}
              </FormItem>)
          },
        },
        {
          dataIndex: 'bankbeginDate',
          title: 'Дата начала действия',
          width: '13%',
          render: (text, record) => {
            return (<FormItem
            >
              {this.props.form.getFieldDecorator('bankbeginDate'+record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(<LocaleProvider locale={componentLocal}>
                <DatePicker style={{width:'100%'}} name={'bankbeginDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'bankbeginDate')}}/>
              </LocaleProvider>)}
            </FormItem>)
          },
        },
        {
          dataIndex: 'bankendDate',
          title: 'Дата окончания действия',
          width: '15%',
          render: (text, record) => {
            return (<FormItem
            >
              {this.props.form.getFieldDecorator('bankbeginDate'+record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(<LocaleProvider locale={componentLocal}>
                <DatePicker style={{width:'100%'}} name={'bankbeginDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'bankbeginDate')}}/>
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
              <div style={{marginTop: '-20px'}}>
                <a onClick={() => this.remove('banks',record.key, 'bankcount')}>Удалить</a>
              </div>
            );
          },
        }
      ],
      responscolumns: [
        {
          dataIndex: 'position',
          title: 'Должность',
          width: '10%',
          render: (text, record) => {
            return (
              <FormItem
              >
                {this.props.form.getFieldDecorator('position'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Select name={'position'+record.key} style={{ width: 150 }} onChange={(e)=>{this.identValue(e, record, 'position')}}>
                    {this.props.references.knp && this.props.references.knp.map((item) => {
                      return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                    })}
                  </Select>
                )}
              </FormItem>)
          },
        },
        {
          dataIndex: 'surname',
          title: 'Фамилия',
          width: '10%',
          render: (text, record) => {
            return (
              <FormItem
              >
                {this.props.form.getFieldDecorator('surname'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Input name={'surname'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'surname')}}/>)}
              </FormItem>)
          },
        },
        {
          dataIndex: 'name',
          title: 'Имя',
          width: '10%',
          render: (text, record) => {
            return (
              <FormItem
              >
                {this.props.form.getFieldDecorator('name'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Input name={'name'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'name')}}/>)}
              </FormItem>)
          },
        },
        {
          dataIndex: 'patronic',
          title: 'Отчество',
          width: '10%',
          render: (text, record) => {
            return (
              <FormItem
              >
                {this.props.form.getFieldDecorator('patronic'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Input name={'patronic'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'patronic')}}/>)}
              </FormItem>)
          },
        },
        {
          dataIndex: 'bdate',
          title: 'Дата рождения',
          width: '10%',
          render: (text, record) => {
            return (<FormItem
            >
              {this.props.form.getFieldDecorator('bdate'+record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(<LocaleProvider locale={componentLocal}>
                <DatePicker style={{width:'100%'}} name={'bdate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'bdate')}}/>
              </LocaleProvider>)}
            </FormItem>)
          },
        },
        {
          dataIndex: 'fio_parently_initials',
          title: 'Фамилия, имя, отчество в родительном падеже',
          width: '20%',
          render: (text, record) => {
            return (
              <FormItem
              >
                {this.props.form.getFieldDecorator('fio_parently_initials'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Input name={'fio_parently_initials'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'fio_parently_initials')}}/>)}
              </FormItem>)
          },
        },
        {
          dataIndex: 'fio_genitive_initials',
          title: 'Фамилия и инициалы в родительном падеже',
          width: '20%',
          render: (text, record) => {
            return (
              <FormItem
              >
                {this.props.form.getFieldDecorator('fio_genitive_initials'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Input name={'fio_genitive_initials'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'fio_genitive_initials')}}/>)}
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
              <div style={{marginTop: '-20px'}}>
                <a onClick={() => this.remove('responses',record.key, 'responsecount')}>Удалить</a>
              </div>
            );
          },
        }
      ],
      RegistrerSZcolumns: [
        {
          dataIndex: 'registrbeginDate',
          title: 'Дата включения в регистр',
          width: '15%',
          render: (text, record) => {
            return (<FormItem
            >
              {this.props.form.getFieldDecorator('registrbeginDate'+record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(<LocaleProvider locale={componentLocal}>
                <DatePicker style={{width:'100%'}} name={'registrbeginDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'registrbeginDate')}}/>
              </LocaleProvider>)}
            </FormItem>)
          },
        },
        {
          dataIndex: 'registrendDate',
          title: 'Дата исключения из регистра',
          width: '15%',
          render: (text, record) => {
            return (<FormItem
            >
              {this.props.form.getFieldDecorator('registrendDate'+record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(<LocaleProvider locale={componentLocal}>
                <DatePicker style={{width:'100%'}} name={'registrendDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'registrendDate')}}/>
              </LocaleProvider>)}
            </FormItem>)
          },
        },
        {
          dataIndex: 'registr_reason',
          title: 'Причина исключения',
          width: '60%',
          render: (text, record) => {
            return (
              <FormItem
              >
                {this.props.form.getFieldDecorator('registr_reason'+record.key, {
                  rules: [{
                    required: true,
                    message: this.state.validatemessage,
                  }],
                })(
                  <Input name={'registr_reason'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'registr_reason')}}/>)}
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
              <div style={{marginTop: '-20px'}}>
                <a onClick={() => this.remove('RegistrerSZs',record.key, 'RegisterSZcount')}>Удалить</a>
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
    /*console.log(key);*/
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

  remove(table, key, count) {
    console.log(table);
    console.log(key);
    console.log(this.state[table]);
    this.setState({
      [table]: [
        ...this.state[table].filter(item => key !==item.key)
      ],
      [count]: this.state[count]-1
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

  AddIdentity =(key) => {
    console.log(key);
    switch (key){
      default: console.log("default")
    }
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
    const titledata = {marginLeft:'0px', width:'80%'};
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
                tabPosition='top'
                style={{marginBottom:'20px', minHeight: '550px'}}
              >
              <TabPane tab={
                <Badge count={this.state.count} style={{ backgroundColor: '#1990FF' }}><div><span style={title}>Идентификаторы</span></div></Badge>} key={1}>
                <div>
                  <Button onClick={()=>{this.setState({
                    identities: [
                      ...this.state.identities,
                      {
                        key: this.state.count,
                      }

                    ],
                    count: this.state.count+1
                  })}} type="primary" style={{ marginBottom: 16 }}>
                    Добавить
                  </Button>
                  <Table bordered={false} dataSource={this.state.identities} columns={this.state.columns} />
                </div>
              </TabPane>
              <TabPane tab={<Badge count={this.state.adresscount} style={{ backgroundColor: '#1990FF'}}><div><span style={title}>Адреса</span></div></Badge>} key={2}>
                  <div>
                    <Button onClick={()=>{this.setState({
                      adresses: [
                        ...this.state.adresses,
                        {
                          key: this.state.adresscount,
                        }

                      ],
                      adresscount: this.state.adresscount+1
                    });}} type="primary" style={{ marginBottom: 16 }}>
                      Добавить
                    </Button>
                    <Table bordered={false} dataSource={this.state.adresses} columns={this.state.addrescolumns} />
                  </div>
              </TabPane>
              <TabPane tab={<Badge count={this.state.contactcount} style={{ backgroundColor: '#1990FF'}}><div><span style={title}>Контакты</span></div></Badge>} key={3}>
                  <div>
                    <Button onClick={()=>{this.setState({
                      contacts: [
                        ...this.state.contacts,
                        {
                          key: this.state.contactcount,
                        }

                      ],
                      contactcount: this.state.contactcount+1
                    });}} type="primary" style={{ marginBottom: 16 }}>
                      Добавить
                    </Button>
                    <Table bordered={false} dataSource={this.state.contacts} columns={this.state.contactcolumns} />
                  </div>
              </TabPane>
              <TabPane tab={<Badge count={this.state.bankcount} style={{ backgroundColor: '#1990FF'}}><div><span style={title}>Банковские реквизиты</span></div></Badge>} key={4}>
                  <div>
                    <Button onClick={()=>{this.setState({
                      banks: [
                        ...this.state.banks,
                        {
                          key: this.state.bankcount,
                        }

                      ],
                      bankcount: this.state.bankcount+1
                    })}} type="primary" style={{ marginBottom: 16 }}>
                      Добавить
                    </Button>
                    <Table bordered={false} dataSource={this.state.banks} columns={this.state.bankcolumns} />
                  </div>
                </TabPane>
              <TabPane tab={<Badge count={this.state.responsecount} style={{ backgroundColor: '#1990FF'}}><div><span style={title}>Ответственные лица</span></div></Badge>} key={5}>
                  <div>
                    <Button onClick={()=>{this.setState({
                      responses: [
                        ...this.state.responses,
                        {
                          key: this.state.responsecount,
                        }

                      ],
                      responsecount: this.state.responsecount+1
                    })}} type="primary" style={{ marginBottom: 16 }}>
                      Добавить
                    </Button>
                    <Table bordered={false} dataSource={this.state.responses} columns={this.state.responscolumns} />
                  </div>
                </TabPane>
              <TabPane tab={<Badge count={this.state.RegisterSZcount} style={{ backgroundColor: '#1990FF'}}><div><span style={title}>Данные о включении в регистр СЗ</span></div></Badge>} key={6}>
                  <div>
                    <Button onClick={()=>{this.setState({
                      RegistrerSZs: [
                        ...this.state.RegistrerSZs,
                        {
                          key: this.state.RegisterSZcount,
                        }

                      ],
                      RegisterSZcount: this.state.RegisterSZcount+1
                    })}} type="primary" style={{ marginBottom: 16 }}>
                      Добавить
                    </Button>
                    <Table bordered={false} dataSource={this.state.RegistrerSZs} columns={this.state.RegistrerSZcolumns} />
                  </div>
                </TabPane>
              { panes.map(pane =>
              {
                  return(
                    <TabPane tab={<span style={title}>{pane.title}</span>}  key={pane.key}>
                      <Card style={{ margin: '20px' }}>
                      {
                      pane.content.map((content)=>{
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
                      </Card>
                  </TabPane>

                  )
                }
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
