import React, { Component } from 'react';
import {
  Tabs,
  Spin,
  Form,
  Divider,
  Button,
  Icon,
  Col,
  Card,
  Row,
  InputNumber,
  Select,
  Input,
  Table,
  Popconfirm,
  DatePicker,
  LocaleProvider,
  Badge,
} from 'antd';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import moment from 'moment/moment';
import { connect } from 'dva/index';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { md: 6, xs: 24, sm: 24 },
  wrapperCol: { md: 18, xs: 24, sm: 24 },
};
const formRenderLayout = {
  labelCol: { md: 24, xs: 24, sm: 24 },
  wrapperCol: { md: 24, xs: 24, sm: 24 },
};
const Option = Select.Option;

function momentDefine() {
  let suffixes = {
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

  let kk = moment.defineLocale('en', {
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
      let a = number % 10,
        b = number >= 100 ? 100 : null;
      return number + (suffixes[number] || suffixes[a] || suffixes[b]);
    },
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 7,  // The week that contains Jan 1st is the first week of the year.
    },
  });

}

const RenderField = ({ name, label, type, getFieldDecorator, validatemessage, references }) => {
  switch (type) {
    case 'combobox': {
      return (
        <FormItem
          style={{ marginBottom: '0px' }}
          label={label}

        >
          {getFieldDecorator(name, {
            rules: [{
              required: true,
              message: validatemessage,
            }],
          })(
            <Select key={name} style={{ marginLeft: '10px', width: '95%' }} name={name}>
              {references.knp && references.knp.map((item) => {
                return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
              })}
            </Select>)}
        </FormItem>
      );
    }
    case 'text': {
      return (
        <FormItem
          style={{ marginBottom: '0px' }}
          key={name}
          label={label}
        >
          {getFieldDecorator(name, {
            rules: [{
              required: true,
              message: validatemessage,
            }],
            initialValue: '',
          })(
            <Input key={name} style={{ marginLeft: '10px', width: '95%' }} name={name}/>)}
        </FormItem>
      );
    }
    case 'datePicker': {
      return (
        <FormItem
          style={{ marginBottom: '0px' }}
          label={label}
        >
          {getFieldDecorator(name, {
            rules: [{
              required: true,
              message: validatemessage,
            }],
            initialValue: '',
          })(
            <DatePicker style={{ marginLeft: '10px', width: '95%' }} name={name} format={'DD.MM.YYYY'}/>,
          )}
        </FormItem>
      );
    }
    default:
      break;
  }
};

@connect(({ references, loading }) => ({
  references,
  loadingData: loading.effects['references/load'],
}))
class SpecPage extends Component {
  state = {
    /*
    * Код 10
Вид деятельности 15
Единица 15
Количество 15
Тариф (тг) 10
Сумма (тг) 10
Аванс (тг) 10
*/
    columns: [
      {
        title: 'Код',
        dataIndex: 'code',
        width: '10%',
        render: (text, record) => {
          return (
            <FormItem
            >
              {this.props.form.getFieldDecorator('code' + record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(
                <Input name={'code' + record.key} onChange={(e) => {
                  this.identValue(e.target.value, record, 'code', 'identities');
                }}/>)}
            </FormItem>);
        },
      }, {
        title: 'Вид деятельности',
        dataIndex: 'type_activities',
        type: 'combobox',
        width: '15%',
        render: (text, record) => {
          return (
            <FormItem>
              {this.props.form.getFieldDecorator('type_activities' + record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(
                <Select name={'type_activities' + record.key} style={{ width: 150 }} onChange={(e) => {
                  this.identValue(e, record, 'type_activities', 'identities');
                }}>
                  {this.props.references.knp && this.props.references.knp.map((item) => {
                    return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
                  })}
                </Select>,
              )}
            </FormItem>);
        },
      },
      {
        title: 'Единица',
        dataIndex: 'unit',
        width: '15%',
        render: (text, record) => {
          return (
            <FormItem
            >
              {this.props.form.getFieldDecorator('unit' + record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(
                <Input name={'unit' + record.key} onChange={(e) => {
                  this.identValue(e.target.value, record, 'unit', 'identities');
                }}/>)}
            </FormItem>);
        },
      },
      {
        title: 'Количество',
        dataIndex: 'amount',
        width: '15%',
        render: (text, record) => {
          return (
            <FormItem
            >
              {this.props.form.getFieldDecorator('amount' + record.key, {
                rules: [{
                  required: true,
                  message: this.state.validatemessage,
                }],
              })(
                <Input name={'amount' + record.key} onChange={(e) => {
                  this.identValue(e.target.value, record, 'amount', 'identities');
                }}/>)}
            </FormItem>);
        },
      },
      {
        title: 'Тариф (₸)',
        dataIndex: 'tariff',
        isVisible: true,
        order: 2,
        width: '15%',
        key: 'tariff',
        onCell: record => {
          return {
            onClick: () => {

            },
          };
        },
        render: (text, record) => (
          <FormItem>
            {this.props.form.getFieldDecorator('tariff' + record.key, {
              rules: [{
                required: true,
                message: this.state.validatemessage,
              }],
            })(
              <InputNumber
                style={{ width: '100%' }}
                step={0.01}
                onChange={(d) => {
                  this.onChangePayment(text, d);
                }}
              />,
            )}
          </FormItem>),
      },
      {
        title: 'Сумма (₸)',
        dataIndex: 'summa',
        isVisible: true,
        order: 2,
        width: '15%',
        key: 'summa',
        onCell: record => {
          return {
            onClick: () => {

            },
          };
        },
        render: (text, record) => (
          <FormItem>
            {this.props.form.getFieldDecorator('summa' + record.key, {
              rules: [{
                required: true,
                message: this.state.validatemessage,
              }],
            })(
              <InputNumber
                style={{ width: '100%' }}
                step={0.01}
                onChange={(d) => {
                  this.onChangePayment(text, d);
                }}
              />,
            )}
          </FormItem>),
      },
      {
        title: 'Аванс (₸)',
        dataIndex: 'avans',
        isVisible: true,
        order: 2,
        width: '15%',
        key: 'avans',
        onCell: record => {
          return {
            onClick: () => {

            },
          };
        },
        render: (text, record) => (
          <FormItem>
            {this.props.form.getFieldDecorator('avans' + record.key, {
              rules: [{
                required: true,
                message: this.state.validatemessage,
              }],
            })(
              <InputNumber
                style={{ width: '100%' }}
                step={0.01}
                onChange={(d) => {
                  this.onChangePayment(text, d);
                }}
              />,
            )}
          </FormItem>),
      },

      {
        title: 'Действие',
        dataIndex: 'operation',
        width: '5%',
        render: (text, record) => {
          const { editable } = record;
          return (
            <div style={{ marginTop: '-20px' }}>
              <a onClick={() => this.remove('identities', record.key, 'identitiescount')}>Удалить</a>
            </div>
          );
        },
      },
    ],
    smarttabDataSource: [],
    smarttabcols: {
      code: null,
      type_activities: null,
      unit: null,
      amount: null,
      tariff: null,
      summa: null,
      avans: null,
    },
    smarttabcount: 0,
    identitiescount: 0,
    identities: [],
  };

  onChangePayment = (e, d) => {

  };

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

  remove = (table, key, count) => {
    this.setState({
      smarttabDataSource: [
        ...this.state.smarttabDataSource.filter(item => key !== item.key),
      ],
      smarttabcount: this.state.smarttabcount - 1,
    });
  };


  identValue = (e, record, name, arrname) => {
    this.setState({
      [arrname]: [
        ...this.state[arrname].filter((value) => value.key !== record.key),
        {
          ...record,
          [name]: e,
        },
      ],
    });
  };

  fieldOnChange = (filterItem, value) => {
    this.setState({
      data: {
        ...this.state.data,
        [filterItem.name]: value,
      },
    });
  };

  render = () => {
    return (<div>
      <Button onClick={() => {
        this.setState({
          smarttabDataSource: [
            ...this.state.smarttabDataSource,
            {
              ...this.state.smarttabcols,
              key: this.state.smarttabcount,
            },
          ],
          smarttabcount: this.state.smarttabcount + 1,
        });
      }}  style={{ marginBottom: 16 }}>
        Добавить
      </Button>
      <Table
        scroll={{
          x: 1200,
        }}
        paging={false}
        bordered={false} dataSource={this.state.smarttabDataSource} columns={this.state.columns}/></div>);
  };
}

export default Form.create()(SpecPage);
