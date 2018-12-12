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
              {references && references.map((item) => {
                return <Select.Option key={item.id}>{item.name}</Select.Option>;
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
              <DatePicker style={{marginLeft:'10px', width:'95%'}} name={name} format={'DD.MM.YYYY'}/>
            )}
        </FormItem>
      )}
    default:
      break;
  }
}

@connect(({ references, universal, loading }) => ({
  references,
  universal,
  loadingData: loading.effects['references/load'],
}))

class SampleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
        codeagent:null,
      },
      panes: [
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
      isNew:false,
      validatemessage:'Поле обязательно для заполнения',
      hasError: false,
      identitiescount: 0,
      adressescount: 0,
      contactscount: 0,
      bankscount: 0,
      responsescount:0,
      RegistrerSZscount:0,
      idents:[],
      identitiesarr:[],
      adressesarr:[],
      contactsarr:[],
      banksarr:[],
      responsesarr: [],
      RegistrerSZsarr: [],
      identities:[],
      adresses:[],
      contacts:[],
      banks:[],
      responses: [],
      RegistrerSZs: [],
      smarttabs:[
        {
          name: "identities",
          title:"Идентификаторы",
          cols:{
            identitytype:null,
            identityname:null,
            identitybeginDate:null,
            identityendDate:null,
          },
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
                      <Select name={'identitytype'+record.key} style={{ width: 250 }} onChange={(e)=>{this.identValue(e, record, 'identitytype', 'identities')}}>
                        {this.props.universal.identifierType.content && this.props.universal.identifierType.content.map((item) => {
                          return <Select.Option key={item.id}>{item.name}</Select.Option>;
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
                      <Input name={'identityname'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'identityname', 'identities')}}/>)}
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
                      <DatePicker style={{width:'100%'}} name={'identitybeginDate'+record.key}  format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'identitybeginDate', 'identities')}}/>)}
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
                  })(
                    <DatePicker style={{width:'100%'}} name={'identityendDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'identityendDate', 'identities')}}/>)}
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
                    <a onClick={() => this.remove('identities',record.key, 'identitiescount')}>Удалить</a>
                  </div>
                );
              },
            }
          ]
        },
        {
          name: "adresses",
          title:"Адреса",
          cols:{
            identitytype:null,
            identityname:null,
            identitybeginDate:null,
            identityendDate:null,
          },
          columns: [
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
                      <Input name={'adresstype'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'adresstype', "adresses")}}/>)}
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
                      <Input name={'adressname'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'adressname', "adresses")}}/>)}
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
                  })(
                    <DatePicker style={{width:'100%'}} name={'adressbeginDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'adressbeginDate', "adresses")}}/>)}
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
                  })(
                    <DatePicker style={{width:'100%'}} name={'adressendDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'adressendDate', "adresses")}}/>
                  )}
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
                    <a onClick={() => this.remove('adresses',record.key, 'adressescount')}>Удалить</a>
                  </div>
                );
              },
            }
          ]
        },
        {
          name: "contacts",
          title:"Контакты",
          cols:{
            identitytype:null,
            identityname:null,
            identitybeginDate:null,
            identityendDate:null,
          },
          columns: [{
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
                    <Input name={'contacttype'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'contacttype', "contacts")}}/>)}
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
                      <Input name={'contactname'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'contactname', "contacts")}}/>)}
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
                      <Input name={'contactnote'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'contactnote', "contacts")}}/>)}
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
                  })(
                    <DatePicker style={{width:'100%'}} name={'contactbeginDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'contactbeginDate', "contacts")}}/>
                  )}
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
                  })(
                    <DatePicker style={{width:'100%'}} name={'contactendDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'contactendDate', "contacts")}}/>
                  )}
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
                    <a onClick={() => this.remove('contacts',record.key, 'contactscount')}>Удалить</a>
                  </div>
                );
              },
            }
            ]
        },
        {
          name: "banks",
          title:"Банковские реквизиты",
          cols:{
            identitytype:null,
            identityname:null,
            identitybeginDate:null,
            identityendDate:null,
          },
          columns: [
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
                    <Input name={'bik'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'bik', "banks")}}/>)}
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
                      <Input name={'bankname'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'bankname', "banks")}}/>)}
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
                      <Input name={'iik'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'iik', "banks")}}/>)}
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
                      <Select name={'currency'+record.key} style={{ width: 150 }} onChange={(e)=>{this.identValue(e, record, 'currency', "banks")}}>
                        {this.props.universal.currencyType.content && this.props.universal.currencyType.content.map((item) => {
                          return <Select.Option key={item.id}>{item.name}</Select.Option>;
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
                  })(
                    <DatePicker style={{width:'100%'}} name={'bankbeginDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'bankbeginDate', "banks")}}/>
                  )}
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
                  })(
                    <DatePicker style={{width:'100%'}} name={'bankbeginDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'bankbeginDate', "banks")}}/>
                  )}
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
                    <a onClick={() => this.remove('banks',record.key, 'bankscount')}>Удалить</a>
                  </div>
                );
              },
            }
            ]
        },
        {
          name: "responses",
          title:"Ответственные лица",
          cols:{
            identitytype:null,
            identityname:null,
            identitybeginDate:null,
            identityendDate:null,
          },
          columns: [
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
                      <Input name={'position'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'position', "responses")}}/>)}
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
                      <Input name={'surname'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'surname', "responses")}}/>)}
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
                      <Input name={'name'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'name', "responses")}}/>)}
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
                      <Input name={'patronic'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'patronic', "responses")}}/>)}
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
                  })(
                    <DatePicker style={{width:'100%'}} name={'bdate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'bdate', "responses")}}/>
                  )}
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
                      <Input name={'fio_parently_initials'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'fio_parently_initials', "responses")}}/>)}
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
                      <Input name={'fio_genitive_initials'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'fio_genitive_initials', "responses")}}/>)}
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
                    <a onClick={() => this.remove('responses',record.key, 'responsescount')}>Удалить</a>
                  </div>
                );
              },
            }
          ]
        },
        {
          name: "RegistrerSZs",
          title:"Данные о включении в регистр СЗ",
          cols:{
            identitytype:null,
            identityname:null,
            identitybeginDate:null,
            identityendDate:null,
          },
          columns: [
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
                  })(
                    <DatePicker style={{width:'100%'}} name={'registrbeginDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'registrbeginDate', "RegistrerSZs")}}/>
                  )}
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
                  })(
                    <DatePicker style={{width:'100%'}} name={'registrendDate'+record.key} format={'DD.MM.YYYY'} onChange={(e)=>{this.identValue(e, record, 'registrendDate', "RegistrerSZs")}}/>
                  )}
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
                      <Input name={'registr_reason'+record.key} onChange={(e)=>{this.identValue(e.target.value, record, 'registr_reason', "RegistrerSZs")}}/>)}
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
                    <a onClick={() => this.remove('RegistrerSZs',record.key, 'RegistrerSZscount')}>Удалить</a>
                  </div>
                );
              },
            }
          ]
        },
      ]
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
    /*identifierType: {},
       currencyType: {},
       legalForm: {},*/

    dispatch({
      type: 'universal/getidentifierType',
      payload: {
        "start":0,
        "length":1000,
        "entity":"identifierType"
      },
    }).then(()=>{
      console.log(this.props.universal)
    });


    dispatch({
      type: 'universal/getcurrencyType',
      payload: {
        "start":0,
        "length":1000,
        "entity":"currencyType"
      },
    });


    dispatch({
      type: 'universal/getlegalForm',
      payload: {
        "start":0,
        "length":1000,
        "entity":"legalForm"
      },
    });
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

  identValue = (e, record, name, arrname) => {
    this.setState({
    [arrname]: [
       ...this.state[arrname].filter((value)=> value.key!==record.key),
       {
         ...record,
         [name]:e
       }
     ]
   })
  }

  remove(table, key, count) {
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

  sendserver = (e) => {
    console.log(this.state.identities)
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
    const {panes, smarttabs} = this.state;
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
                tabPosition='top'
                style={{marginBottom:'20px', minHeight: '550px'}}
              >
                { smarttabs.map(smarttab => {
                  return (
                    <TabPane tab={
                      <Badge count={this.state[smarttab.name+'count']} style={{ backgroundColor: '#1990FF' }}><div><span style={title}>{smarttab.title}</span></div></Badge>} key={smarttab.name}>
                      <div>
                        <Button onClick={()=>{this.setState({
                          [smarttab.name]: [
                            ...this.state[smarttab.name],
                            {
                              ...smarttab.cols,
                              key: this.state[smarttab.name+'count'],
                            }

                          ],
                          [smarttab.name+'count']: this.state[smarttab.name+'count']+1
                        },()=>{
                        })}} type="primary" style={{ marginBottom: 16 }}>
                          Добавить
                        </Button>
                        <Table bordered={false} dataSource={this.state[smarttab.name]} columns={this.state.smarttabs.find(x => x.name === smarttab.name).columns} />
                      </div>
                    </TabPane>
                  )
                })}
              { panes.map(pane =>{
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
                            references={this.props.universal.legalForm.content ? this.props.universal.legalForm.content : []}
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
/*{/!*
<Select name={'contacttype'+record.key} style={{ width: 250 }} onChange={(e)=>{this.identValue(e, record, 'contacttype', "contacts")}}>
                      {this.props.references.knp && this.props.references.knp.map((item) => {
                        return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                      })}
                    </Select>*!/}*/



/*{/!*<Select name={'position'+record.key} style={{ width: 150 }} onChange={(e)=>{this.identValue(e, record, 'position', "responses")}}>
                        {this.props.references.knp && this.props.references.knp.map((item) => {
                          return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                        })}
                      </Select>
                    )}*!/}*/
