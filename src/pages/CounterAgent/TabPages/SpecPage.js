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
import Guid from '@/utils/Guid';
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


@connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects['universal2/getList'],
}))

class SpecPage extends Component {
  state = {
    validatemessage: 'не заполнено',
    columns: [
      {
        title: 'Код',
        dataIndex: 'activity.code',
        width: '5%',
        render: (text, record) => {


          return (
            <FormItem>
              {this.props.form.getFieldDecorator('spespage.code' + record.key, {
                rules: [{
                  required: false,
                  message: this.state.validatemessage,
                }],
                initialValue: text,
              })(
                <Input name={'code' + record.key}
                       onChange={(e) => {
                         //this.identValue(e.target.value, record, 'code', 'identities');
                       }

                       }/>)}
            </FormItem>);
        },
      },
      {
        title: 'Вид деятельности',
        dataIndex: 'activity.name',
        type: 'combobox',
        width: '30%',
        render: (text, record) => {


          return (
            <FormItem>
              {this.props.form.getFieldDecorator('spespage.activity' + record.key, {
                rules: [{
                  required: false,
                  message: this.state.validatemessage,
                }],
              })(
                <Select
                  name={'activity' + record.key}
                  style={{ width: 350 }}
                  onChange={(e, option) => {
                    record['activity'] = {
                      prop: option.props.prop,
                      code: option.props.prop.activity.code,
                      id: option.props.prop.activity.id,
                      name: option.props.prop.activity.name,
                    };

                    // this.identValue(e, record, 'type_activities', 'identities');
                  }}>
                  {this.props.universal2.references['activityList'] && this.props.universal2.references['activityList'].content.map((item) =>
                    <Option value={item.activity.id} prop={item}
                            key={item.activity.id}>{item.activity.name}</Option>)}
                </Select>,
              )}
            </FormItem>);
        },
      },
      {
        title: 'Способ оплаты',
        dataIndex: 'currencyType.nameRu',
        render: (text, record) => {
          return (
            <FormItem
            >
              {this.props.form.getFieldDecorator('spespage.paymentType' + record.key, {
                rules: [{
                  required: false,
                  message: this.state.validatemessage,
                }],
              })(
                <Select name={'paymentType' + record.key} style={{ width: 150 }} onChange={(e, option) => {
                  record['currencyType'] = {
                    name: option.props.prop.shortname,
                    id: e,
                  };
                  //this.identValue(e, record, 'paymentType', 'identities');
                  //this.identValue(e.target.value, record, 'unit', 'identities');
                }}>
                  {this.getReferenceValues('paymentType', 'shortname')}
                </Select>,
              )}
            </FormItem>);
        },
      },
      {
        title: 'Единица учета',
        dataIndex: 'measureUnit.nameRu',
        width: 150,
        render: (text, record) => {
          return (
            <FormItem
            >
              {this.props.form.getFieldDecorator('spespage.unit' + record.key, {
                rules: [{
                  required: false,
                  message: this.state.validatemessage,
                }],
              })(
                <Select name={'unit' + record.key} style={{ width: 250 }} onChange={(e, option) => {
                  record['measureUnit'] = {
                    id: e,
                    name: option.props.prop.nameRu,
                  };
                  // this.identValue(e, record, 'unit', 'identities');
                  //this.identValue(e.target.value, record, 'unit', 'identities');
                }}>
                  {this.getReferenceValues('measureUnit', 'nameRu')}
                </Select>,
              )}
            </FormItem>);
        },
      },
      {
        title: 'Количество',
        dataIndex: 'value',
        width: '10%',
        render: (text, record) => {
          return (
            <FormItem
            >
              {this.props.form.getFieldDecorator('spespage.amount' + record.key, {
                rules: [{
                  required: false,
                  message: this.state.validatemessage,
                }],
              })(
                <InputNumber name={'amount' + record.key} onChange={(e) => {
                  record['value'] = e;
                  //this.identValue(e, record, 'amount', 'identities');
                }}/>)}
            </FormItem>);
        },
      },
      {
        title: 'Тариф (₸)',
        dataIndex: 'tariffItem.name',
        isVisible: true,
        order: 2,
        width: '10%',
        key: 'tariff',
        onCell: record => {
          return {
            onClick: () => {

            },
          };
        },
        render: (text, record) => (
          <FormItem>
            {this.props.form.getFieldDecorator('spespage.tariff' + record.key, {
              rules: [{
                required: false,
                message: this.state.validatemessage,
              }],
            })(
              <InputNumber
                style={{ width: '100%' }}
                step={0.01}
                onChange={(d) => {
                  //this.onChangePayment(text, d);
                }}
              />,
            )}
          </FormItem>),
      },
      {
        title: 'Сумма (₸)',
        dataIndex: 'valueSum',
        isVisible: true,
        order: 2,
        width: '10%',
        key: 'summa',
        onCell: record => {
          return {
            onClick: () => {

            },
          };
        },
        render: (text, record) => (
          <FormItem>
            {this.props.form.getFieldDecorator('spespage.summa' + record.key, {
              rules: [{
                required: false,
                message: this.state.validatemessage,
              }],
            })(
              <InputNumber
                style={{ width: '100%' }}
                step={0.01}
                onChange={(d) => {
                  record['valueSum'] = d;
                  //this.onChangePayment(text, d);
                }}
              />,
            )}
          </FormItem>),
      },
      {
        title: 'Аванс (₸)',
        dataIndex: 'sumAdvance',
        isVisible: true,
        order: 2,
        width: '10%',
        key: 'avans',
        onCell: record => {
          return {
            onClick: () => {

            },
          };
        },
        render: (text, record) => (
          <FormItem>
            {this.props.form.getFieldDecorator('spespage.avans' + record.key, {
              rules: [{
                required: false,
                message: this.state.validatemessage,
              }],
            })(
              <InputNumber
                style={{ width: '100%' }}
                step={0.01}
                onChange={(d) => {
                  record['sumAdvance'] = d;
                  // this.onChangePayment(text, d);
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

    dataSource: [],

    smarttabDataSource: [],
    smarttabcols: {
      code: null,
      activity: null,
      currencyType: null,
      measureUnit: null,
      value: null,
      tariffItem: null,
      valueSum: null,
      sumAdvance: null,
    },
    smarttabcount: 0,
    identitiescount: 0,
    identities: [],
  };

  onChangePayment = (e, d) => {

  };

  getReferenceValues = (code, propName) => {
    const { universal2 } = this.props;

    if (!universal2.references[code]) return null;

    return universal2.references[code]
      ? universal2.references[code].content.map((item) => {
        return <Option value={item.id} prop={item} key={item.id}>{item[propName]}</Option>;
      })
      : null;
  };


  componentDidMount() {

    this.props.eventManager.subscribe('onSpecFormSubmit', () => {

      let specifyKeys = {};
      let specifyData = this.state.smarttabDataSource;

      specifyData.forEach((item) => {
        if (!specifyKeys[item.activity.id]) {
          specifyKeys[item.activity.id] = {
            'parentContractItem': {
              'id': item.activity.prop.parentActivity ? item.activity.prop.parentActivity.id : null,
            },
            'activity': {
              'id': item.activity ? item.activity.id : null,
            },
            'contractItemValues': [],
          };

        }

        if (specifyKeys[item.activity.id]) {
          specifyKeys[item.activity.id].contractItemValues.push({
            'measureUnit': {
              'id': item.measureUnit ? item.measureUnit.id : null,
            },
            'value': item.value ? item.value : null,
            'currencyType': {
              'id': item.currencyType ? item.currencyType.id : null,
            },
            'valueSum': item.valueSum ? item.valueSum : null,
            'sumAdvance': item.sumAdvance ? item.sumAdvance : null,
          });
        }

      });

      return Object.keys(specifyKeys).map((specKey) => (specifyKeys[specKey]));
    });

    if (getLocale() === 'en-US') {
      momentDefine();
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/getList',
      payload: {
        'start': 0,
        'length': 1000,
        'entity': 'activityList',
      },
    });
    dispatch({
      type: 'universal2/getList',
      payload: {
        'start': 0,
        'length': 1000,
        'entity': 'measureUnit',
      },
    });
    dispatch({
      type: 'universal2/getList',
      payload: {
        'start': 0,
        'length': 500,
        'entity': 'paymentType',
      },
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

    return (<Card bodyStyle={{ padding: 5 }} style={{ marginLeft: '-10px' }}>
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
      }} style={{ marginBottom: 16 }}>
        Добавить
      </Button>
      <Table
        scroll={{
          x: 1200,
        }}
        pagination={false}
        bordered={false} dataSource={this.state.smarttabDataSource} columns={this.state.columns}/>
    </Card>);
  };
}

export default Form.create()(SpecPage);
