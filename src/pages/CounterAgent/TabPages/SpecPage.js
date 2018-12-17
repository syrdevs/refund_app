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
  Tag,
  DatePicker,
  LocaleProvider,
  Badge,
} from 'antd';
import Guid from '@/utils/Guid';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import moment from 'moment/moment';
import { connect } from 'dva/index';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabPageStyle from './TabPages.less';

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

{/*<Select name={'paymentType' + record.key} style={{ width: 150 }} onChange={(e, option) => {*/
}
{/*record['paymentType'] = {*/
}
{/*name: option.props.prop.shortname,*/
}
{/*id: e,*/
}
{/*};*/
}
{/*//this.identValue(e, record, 'paymentType', 'identities');*/
}
{/*//this.identValue(e.target.value, record, 'unit', 'identities');*/
}
{/*}}>*/
}
{/*{this.getReferenceValues('paymentType', 'shortname')}*/
}
{/*</Select>,*/
}
//
// <Select name={'unit' + record.key} style={{ width: 250 }} onChange={(e, option) => {
//   // record['measureUnit'] = {
//   //   id: e,
//   //   name: option.props.prop.nameRu,
//   // };
//   // this.identValue(e, record, 'unit', 'identities');
//   //this.identValue(e.target.value, record, 'unit', 'identities');
// }}>
//   {this.getReferenceValues('measureUnit', 'nameRu')}
// </Select>,
{/*<InputNumber*/
}
{/*style={{ width: '100%' }}*/
}
{/*step={0.01}*/
}
{/*onChange={(d) => {*/
}
{/*//this.onChangePayment(text, d);*/
}
{/*}}*/
}
{/*/>,*/
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
                <Input readOnly={true} style={{ width: 150 }} name={'code' + record.key}
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
                initialValue: record.id ? record.id : null,
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

                    this.changeContractType(record.key, e);

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
        dataIndex: 'paymentType.nameRu',
        width: 150,
        render: (text, record) => {
          return (
            <FormItem>
              {this.props.form.getFieldDecorator('spespage.paymentType' + record.key, {
                rules: [{
                  required: false,
                  message: this.state.validatemessage,
                }],
              })(<span>{record.paymentType ? record.paymentType.nameRu : null}</span>)}
            </FormItem>);
        },
      },
      {
        title: 'Единица учета',
        dataIndex: 'measureUnit.nameRu',
        width: 150,
        render: (text, record) => {

          return (
            <FormItem>
              {this.props.form.getFieldDecorator('spespage.unit' + record.key, {
                rules: [{
                  required: false,
                  message: this.state.validatemessage,
                }],
              })(
                record.measureUnit ? <Tag style={{ fontSize: '14px' }} color="blue"
                                          key={record.key}>{record.measureUnit.nameRu}</Tag> : <span> </span>,
              )}
            </FormItem>);
        },
      },
      {
        title: 'Всего',
        children: [
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
                    initialValue: record.value ? record.value : 0,
                  })(
                    <InputNumber
                      style={{ width: 70 }}
                      name={'amount' + record.key}
                      onChange={(e) => {
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
            width: '20%',
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
                })(<span>{record.tariffItem ? record.tariffItem.tariffValue : 0}</span>)}
              </FormItem>),
          },
          {
            title: 'Сумма (₸)',
            dataIndex: 'valueSum',
            isVisible: true,
            order: 2,
            width: '20%',
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
                  <span>{record.valueSum ? record.valueSum : 0}</span>,
                )}
              </FormItem>),
          },
          {
            title: 'Аванс (₸)',
            dataIndex: 'sumAdvance',
            isVisible: true,
            order: 2,
            width: '20%',
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
                  initialValue: record.sumAdvance ? record.sumAdvance : 0,
                  rules: [{
                    required: false,
                    message: this.state.validatemessage,
                  }],
                })(
                  <InputNumber
                    style={{ width: 90 }}
                    step={0.01}
                    onChange={(d) => {
                      record['sumAdvance'] = d;
                      // this.onChangePayment(text, d);
                    }}
                  />,
                )}
              </FormItem>),
          }],
      },
      {
        title: 'Остаток',
        dataIndex: 'percentAdvance',
        width: '20%',
      },

      // {
      //   title: '',
      //   dataIndex: 'operation',
      //   width: '2%',
      //   render: (text, record) => {
      //     const { editable } = record;
      //     return (
      //       <div style={{ marginTop: '-20px' }}><Icon
      //         onClick={() => this.remove('identities', record.key, 'identitiescount')}><FontAwesomeIcon
      //         icon={faTrash}/></Icon></div>
      //     );
      //   },
      // },
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
      contractTimeItem: null,
    },
    smarttabcount: 0,
    identitiescount: 0,
    identities: [],
  };

  changeContractType = (key, contractId) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'universal2/getList',
      payload: {
        'start': 0,
        'length': 20,
        'entity': 'activityMeasureUnit',
        'alias': 'activityWithMeasureUnits',
        'filter': {
          'activity.Id': contractId,
        },
      },
    }).then(() => {
      if (this.props.universal2.references.activityMeasureUnit && this.props.universal2.references.activityMeasureUnit.content.length > 0) {
        /// todo check len
        let contractTypeItem = this.props.universal2.references.activityMeasureUnit.content[0];
        let smarttabDataSource = this.state.smarttabDataSource.map((item) => (item));

        smarttabDataSource[key] = {
          ...smarttabDataSource[key],
          paymentType: contractTypeItem.activity.paymentType,
          measureUnit: contractTypeItem.measureUnit,
          tariffItem: contractTypeItem.tariffItems,
        };

        this.setState(prevState => ({
          smarttabDataSource: smarttabDataSource,
        }));

      }
    });

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

  componentDidUpdate() {
    if (this.props.forceRender) {
      this.setState({
        smarttabDataSource: [],
        smarttabcount: 0,
      }, () => {
        this.renderData();
        this.props.setForceRender();
      });
    }
  }

  renderData = () => {
    if (this.props.gridData.contractItems) {

      let dataSource = [];
      let _index = 0;


      this.props
        .gridData
        .contractItems
        .forEach((item) => {

          if (item.contractItemValues) {
            return item.contractItemValues.forEach((contractItem) => {

              let itemResult = {
                itemId: item.id,
                activity: item.activity,
                key: _index++,
                contractTimeItem: {},
                percentAdvance: 0,
              };

              Object.keys(item.activity).forEach((contractKey) => {
                itemResult[contractKey] = item.activity[contractKey];
              });

              Object.keys(contractItem).forEach((contractItemKey) => {
                if (contractItemKey !== 'contractTimeTables' && contractItemKey !== 'id')
                  itemResult[contractItemKey] = contractItem[contractItemKey];
              });

              if (contractItem.contractTimeTables) {
                contractItem.contractTimeTables.forEach((monthItem) => {
                  itemResult.contractTimeItem[monthItem.periodSection.index] = monthItem;
                });
              }

              dataSource.push(itemResult);
            });
          }
        });


      this.setState({
        smarttabDataSource: dataSource,
        smarttabcount: dataSource.length,
      });

    }
  };

  renderMonthColumns = () => {


    let smartdataColumns = {};
    let data = {
      'contractTimeTables': [
        {
          'id': 'b4ed338a-b86d-442b-b7a1-066437a61c56',
          'periodSection': {
            'id': 'ec16e8c2-191a-4b14-a21a-e5804c781582',
            'status': 'Открыт',
            'index': '04',
            'name': 'Апрель',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': 'a6c0afa1-da39-4319-b47f-179eac256454',
          'periodSection': {
            'id': 'eb3628bf-d0b6-4760-bafe-64a85fcf817b',
            'status': 'Открыт',
            'index': '07',
            'name': 'Июль',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': '142f2bf1-6815-49a8-9666-4152c0073af0',
          'periodSection': {
            'id': 'b5c47f41-99d0-4cee-a83c-df21f28ebdb5',
            'status': 'Открыт',
            'index': '02',
            'name': 'Февраль',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': 'd8fe0e65-c3ad-43f1-b28e-628703b26a09',
          'periodSection': {
            'id': 'f1f2ac96-f6f6-4bd1-90dd-85d1e274622c',
            'status': 'Открыт',
            'index': '01',
            'name': 'Январь',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': 'ddc8168d-192d-4f9e-932a-7afda17426ba',
          'periodSection': {
            'id': '70595496-9faf-4fe0-833c-09deed7488c8',
            'status': 'Открыт',
            'index': '11',
            'name': 'Ноябрь',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': '50f60dd7-69b4-469c-b1ef-8a2e04c65820',
          'periodSection': {
            'id': '7b5daf7d-acf5-479b-81e1-3b0ee2e68e8a',
            'status': 'Открыт',
            'index': '05',
            'name': 'Май',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': '08bfdf1c-6a25-47ec-97a0-9b89c2c4f0b3',
          'periodSection': {
            'id': '99d4c419-4bd5-4741-9bd8-1a9b7f8ddc46',
            'status': 'Открыт',
            'index': '06',
            'name': 'Июнь',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': 'e481a0d9-0f59-4cec-a02e-b237f4de057a',
          'periodSection': {
            'id': 'f18680f6-6387-42e1-940d-62d0a5ce0900',
            'status': 'Открыт',
            'index': '03',
            'name': 'Март',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': '17f8666e-6086-401d-a901-cce905f4b272',
          'periodSection': {
            'id': 'f4e8188b-64c9-408f-bd9f-34cc0ed70995',
            'status': 'Открыт',
            'index': '12',
            'name': 'Декабрь',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': 'b5aabc37-1a60-4100-a5a2-d6fd28fc96a4',
          'periodSection': {
            'id': 'c838383d-36c0-469a-8e3d-8aefa5628be0',
            'status': 'Открыт',
            'index': '10',
            'name': 'Октябрь',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': '7112e2b4-a5be-4a7d-9fb5-f10c357d7d58',
          'periodSection': {
            'id': '7dbcf2de-4193-4d8c-8d0f-e7529e236ed7',
            'status': 'Открыт',
            'index': '08',
            'name': 'Август',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': '2b9846b6-0bb3-4734-bfc9-fac38bf29fa6',
          'periodSection': {
            'id': 'e86fa194-bbae-4897-8110-0e66ce52a3e4',
            'status': 'Открыт',
            'index': '09',
            'name': 'Сентябрь',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
      ],
    };
    let extraColumns = [];

    // let monthList = [
    //   'Январь',
    //   'Февраль',
    //   'Март',
    //   'Апрель',
    //   'Май',
    //   'Июнь',
    //   'Июль',
    //   'Август',
    //   'Сентябрь',
    //   'Октябрь',
    //   'Ноябрь',
    //   'Декабрь',
    // ];

    data.contractTimeTables
      .sort((a, b) => {
        if (a.periodSection.index < b.periodSection.index)
          return -1;
        if (a.periodSection.index > b.periodSection.index)
          return 1;
        return 0;
      })
      .forEach((recordItem) => {
        let monthColumn = {
          title: recordItem.periodSection.name,
          children: [
            {
              title: 'Количество',
              key: `periodSection${recordItem.periodSection.index}.valueSection`,
              width: 200,
              render: (record) => {

                let defaultValue = record.contractTimeItem ? record.contractTimeItem[recordItem.periodSection.index] : {};

                return <InputNumber
                  defaultValue={defaultValue.hasOwnProperty('valueSection') ? defaultValue.valueSection : 0}
                  onChange={(e) => {
                    record['contractTimeItem'] = {
                      ...record['contractTimeItem'],

                      [recordItem.periodSection.index]: {
                        ...record['contractTimeItem'][recordItem.periodSection.index],
                        valueSection: e,
                      },
                    };

                    let percentAdvance = Object
                      .keys(record.contractTimeItem)
                      .map((monthKey) => record.contractTimeItem[monthKey].valueSection ? record.contractTimeItem[monthKey].valueSection : 0)
                      .reduce((a, b) => a + b, 0);

                    record['percentAdvance'] = isNaN(percentAdvance) ? 0 : percentAdvance;

                    this.setState(prevState => ({
                      smarttabDataSource: prevState.smarttabDataSource,
                    }));

                    //this.OnChangeperiod(item, 'periodSection01', 'valueSection', e);
                  }}

                />;
              },
            },
            {
              title: 'Сумма, т',
              key: `periodSection${recordItem.periodSection.index}.sumSection`,
              width: 200,
              render: (record) => {
                let defaultValue = record.contractTimeItem ? record.contractTimeItem[recordItem.periodSection.index] : {};

                return <span>{defaultValue.hasOwnProperty('valueSection') ? defaultValue.sumSection : 0}</span>;
              },
            },
            {
              title: 'Сумма аванса, т',
              key: `periodSection${recordItem.periodSection.index}.sumAdvanceTakeout`,
              width: 200,
              render: (record) => {
                let defaultValue = record.contractTimeItem ? record.contractTimeItem[recordItem.periodSection.index] : {};

                return <InputNumber
                  defaultValue={defaultValue.hasOwnProperty('sumAdvanceTakeout') ? defaultValue.sumAdvanceTakeout : 0}
                  onChange={(e) => {

                    record['contractTimeItem'] = {
                      ...record['contractTimeItem'],

                      [recordItem.periodSection.index]: {
                        ...record['contractTimeItem'][recordItem.periodSection.index],
                        sumAdvanceTakeout: e,
                      },
                    };

                    //this.OnChangeperiod(item, 'periodSection01', 'sumAdvanceTakeout', e);
                  }}
                />;
              },
            },
          ],
        };

        extraColumns.push(monthColumn);
      });


    data.contractTimeTables.forEach((item) => {
      smartdataColumns[item.periodSection.index] = {};
    });

    this.setState(prevState => ({
      smarttabcols: {
        ...prevState.smarttabcols,
        contractTimeItem: smartdataColumns,
      },
      columns: prevState.columns.concat(extraColumns),
    }));
  };

  componentWillUnmount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/clearData',
      payload: {
        typeName: 'getObjectData',
        value: {},
      },
    });
  };

  componentDidMount() {

    this.renderMonthColumns();

    this.props.eventManager.subscribe('onSpecFormSubmit', () => {

      let specifyKeys = {};
      let specifyData = this.state.smarttabDataSource;

      specifyData.forEach((item) => {
        if (!specifyKeys[item.activity.id]) {
          specifyKeys[item.activity.id] = {
            // 'parentContractItem': {
            //   'id': item.activity.prop.parentActivity ? item.activity.prop.parentActivity.id : null,
            // },
            'activity': {
              'id': item.activity ? item.activity.id : null,
            },
            'contractItemValues': [],
          };

        }

        if (specifyKeys[item.activity.id]) {

          let contractItemValue = {
            // 'measureUnit': {
            //   'id': 'be88fc85-e565-43cd-a14a-7cdd46828f4c',
            // },
            'measureUnit': {
              'id': item.measureUnit ? item.measureUnit.id : null,
            },
            // 'paymentType': {
            //   'id': item.paymentType ? item.paymentType.id : null,
            // },
            // 'currencyType': {
            //   'id': item.currencyType ? item.currencyType.id : null,
            // },
            //'valueSum': item.valueSum ? item.valueSum.toString().replace('.', ',') : null
          };

          if (item.tariffItem) {
            contractItemValue.tariffItem = {
              id: item.tariffItem ? item.tariffItem.id : null,
            };
          }

          contractItemValue.value = item.value ? item.value.toString() : 0;
          contractItemValue.sumAdvance = item.sumAdvance ? item.sumAdvance.toString().replace('.', ',') : 0;


          if (item.contractTimeItem) {

            let contractTimeTables = [];

            Object.keys(item.contractTimeItem).map((monthKey) => {
              let monthItem = item.contractTimeItem[monthKey];
              let contractTimeTablesItem = {
                periodSection: {
                  search: true,
                  index: monthKey,
                },
              };

              contractTimeTablesItem.valueSection = monthItem.valueSection ? monthItem.valueSection : 0;
              contractTimeTablesItem.sumSection = monthItem.sumSection ? monthItem.sumSection : 0;
              contractTimeTablesItem.sumAdvanceTakeout = monthItem.sumAdvanceTakeout ? monthItem.sumAdvanceTakeout : 0;

              contractTimeTables.push(contractTimeTablesItem);
            });

            contractItemValue.contractTimeTables = contractTimeTables;
          }

          specifyKeys[item.activity.id].contractItemValues.push(contractItemValue);
        }

      });

      return Object.keys(specifyKeys).map((specKey) => (specifyKeys[specKey]));
    });

    this.renderData();

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


    return (<Spin spinning={this.props.loadingData}>
      <Card bodyStyle={{ padding: 5 }} style={{ marginLeft: '-10px' }}>
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
        <div className={TabPageStyle.SpesPage}>
          <Table
            scroll={{
              x: 1200,
            }}
            pagination={false}
            bordered={true} dataSource={this.state.smarttabDataSource} columns={this.state.columns}/>
        </div>
      </Card>
    </Spin>);
  };
}

export default Form.create()(SpecPage);
