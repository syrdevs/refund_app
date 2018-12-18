import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card, Spin, Modal } from 'antd';
import SmartGridView from '@/components/SmartGridView';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import moment from 'moment';
import LinkModal from '@/components/LinkModal';
import DogovorModal from '../Modals/DogovorModal';
import CounterAgentModal from '../Modals/ContragentsModal';

const confirm = Modal.confirm;
const { TextArea } = Input;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

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

@connect(({ universal2 }) => ({
  universal2,
}))
export default class InfoPage extends Component {
  state = {

    CounterAgentsModal: {
      record: null,
      visible: false,
    },

    DogovorModal: {
      record: null,
      visible: false,
    },

    contractAlterationReason: false,

    fields: {
      bin: '',
    },
  };

  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().year(2019);
  };

  getReferenceValues = (code, propName) => {
    const { universal2 } = this.props;

    if (!universal2.references.hasOwnProperty(code)) return null;

    return universal2.references[code]
      ? universal2.references[code].content.map((item) => (
        <Option value={item.id} prop={item} key={item.id}>{item[propName]}</Option>))
      : null;
  };
  componentDidMount = () => {

    const { dispatch, universal2 } = this.props;
    dispatch({
      type: 'universal2/getList',
      payload: {
        'start': 0,
        'length': 500,
        'entity': 'contractType',
      },
    });
    dispatch({
      type: 'universal2/getList',
      payload: {
        'start': 0,
        'length': 500,
        'entity': 'contractAlterationReason',
      },
    });
    dispatch({
      type: 'universal2/getList',
      payload: {
        'start': 0,
        'length': 500,
        'entity': 'divisions',
      },
    });
    dispatch({
      type: 'universal2/getList',
      payload: {
        'start': 0,
        'length': 500,
        'entity': 'periodYear',
      },
    });
  };

  clearSpecifications = () => {
    if (this.props.setSpecData) {
      this.props.setSpecData({ clear: true });
    }
  };

  getSpecifications = (id) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'universal2/getContractById',
      payload: {
        'entity': 'contract',
        'alias': null,
        'id': id,
      },
    }).then(() => {
      if (this.props.universal2.contractData.contractItems && this.props.setSpecData) {
        this.props.setSpecData(this.props.universal2.contractData);
      }
    });
  };

  render = () => {

    /// params to info page
    /// formData
    /// formItemLayout
    /// form

    const { form: { getFieldDecorator, validateFields }, formItemLayout } = this.props;
    let getObjectData = this.props.formData ? this.props.formData : {};


    return (<Card style={{ marginLeft: '-10px' }}>

      {this.state.CounterAgentsModal.visible && <CounterAgentModal
        onSelect={(record) => {
          if (this.props.getCounterAgentById) {
            this.props.getCounterAgentById(record.id);
          }
          this.setState({ CounterAgentsModal: { visible: false, record: record } });
        }}
        hide={() => this.setState({ CounterAgentsModal: { visible: false } })}/>
      }

      {this.state.DogovorModal.visible &&
      <DogovorModal
        onSelect={(record) => {

          confirm({
            title: 'Подтверждение',
            content: 'Существующая спецификация документа будет заменена, хотите продолжить?',
            okText: 'Да',
            cancelText: 'Нет',
            onOk: () => {
              this.getSpecifications(record.id);
              this.setState({ DogovorModal: { visible: false, record: record } });
            },
            onCancel: () => {
              this.setState({ DogovorModal: { visible: false, record: record } });
            },
          });


        }}
        hide={() => this.setState({ DogovorModal: { visible: false } })}/>}


      <div style={{ margin: '0px 15px', maxWidth: '70%' }}>

        {getObjectData.contract &&
        <Form.Item {...formItemLayout} label="Контрагент">
          {getFieldDecorator('counterAgent', {
            initialValue: {
              value: getObjectData.contract ? getObjectData.contract.contragent : null,
            },
            rules: [{
              required: false,//, message: 'не заполнено',
              // validator: (rule, value, callback) => {
              //   if (value !== null && value) {
              //     if (value.value !== null) {
              //       callback();
              //       return;
              //     } else {
              //       callback('не заполнено');
              //     }
              //   }
              //   callback('не заполнено');
              // },
            }],
          })(
            <LinkModal
              labelFormatter={(record) => {

                if (record.idendifier && record.idendifier.identifiervalue) {
                  return `${record.idendifier.identifiervalue} ${record.name}`;
                }
                return '';
              }}
              data={this.state.CounterAgentsModal.record}
              onTarget={(record) => {

              }}
              onDelete={() => {
                this.setState({ CounterAgentsModal: { visible: false, record: null } });
              }}
              onClick={() => {
                this.setState({ CounterAgentsModal: { visible: true } });
              }}>
            </LinkModal>)}
        </Form.Item>}


        <Form.Item {...formItemLayout} label="Учетный период">
          {getFieldDecorator('periodYear', {
            rules: [{ required: false, message: 'не заполнено' }],
            initialValue: getObjectData.periodYear ? getObjectData.periodYear.id : null,
          })(
            <Select
              placeholder="Учетный период"
              style={{ width: '50%' }}>
              {this.getReferenceValues('periodYear', 'year')}
            </Select>,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Родительский договор">
          {getFieldDecorator('parentContract', {
            initialValue: { value: getObjectData.parentContract ? getObjectData.parentContract : null },
            rules: [{
              required: false,//, message: 'не заполнено',
              // validator: (rule, value, callback) => {
              //   if (value !== null && value) {
              //     if (value.value !== null) {
              //       callback();
              //       return;
              //     } else {
              //       callback('не заполнено');
              //     }
              //   }
              //   callback('не заполнено');
              // },
            }],
          })(
            <LinkModal
              labelFormatter={(record) => {
                return `№ ${record.number} от ${record.documentDate}`;
              }}
              data={this.state.DogovorModal.record}
              onTarget={(record) => {
                window.open('viewcontract?id=' + record.id);
              }}
              onDelete={() => {
                this.setState({ DogovorModal: { visible: false, record: null } });
                const { dispatch } = this.props;

                confirm({
                  title: 'Подтверждение',
                  okText: 'Да',
                  cancelText: 'Нет',
                  content: 'Существующая спецификация документа будет заменена, хотите продолжить?',
                  onOk: () => {

                    dispatch({
                      type: 'universal2/clearContract',
                      payload: {},
                    }).then(() => {
                      this.clearSpecifications();
                    });
                  },
                });


              }}
              onClick={() => {
                this.setState({ DogovorModal: { visible: true } });
              }}>
            </LinkModal>)}
        </Form.Item>


        <Form.Item {...formItemLayout} label="Протокол распределения объемов">
          {(getObjectData.planProtocol && getObjectData.planProtocol.number) &&
          <span
            className="ant-form-text">№ {getObjectData.planProtocol.number} от {getObjectData.planProtocol.documentDate}</span>
          }
        </Form.Item>


        <Form.Item {...formItemLayout} label="Заявка на объемы">
          {(getObjectData.proposal && getObjectData.proposal.number) &&
          <span
            className="ant-form-text">№{getObjectData.proposal.number} от {getObjectData.proposal.documentDate}</span>
          }
        </Form.Item>


        <Form.Item {...formItemLayout} label="Вид договора">
          {getFieldDecorator('contractType', {
            rules: [{ required: false, message: 'не заполнено' }],
            initialValue: getObjectData.contractType ? getObjectData.contractType.id : null,
          })(
            <Select placeholder="Вид договора"
                    onChange={(value, option) => {
                      if (option.props.prop.code === '2') {
                        this.setState({ contractAlterationReason: true });
                      } else {
                        this.setState({ contractAlterationReason: false });
                      }
                    }}>
              {this.getReferenceValues('contractType', 'nameRu')}
            </Select>,
          )}
        </Form.Item>

        {this.state.contractAlterationReason &&
        <Form.Item {...formItemLayout} label="Причина">
          {getFieldDecorator('contractAlternation', {
            rules: [{ required: false, message: 'не заполнено' }],
            initialValue: getObjectData.contractAlternation ? getObjectData.contractAlternation.id : null,
          })(
            <Select placeholder="Причина">
              {this.getReferenceValues('contractAlterationReason', 'nameRu')}
            </Select>,
          )}
        </Form.Item>
        }


        <Form.Item {...formItemLayout} label="Номер">
          {getFieldDecorator('number', {
            rules: [{ required: false, message: 'не заполнено' }],
            initialValue: getObjectData.number ? getObjectData.number : null,
          })(<Input placeholder="Номер"/>)}
        </Form.Item>


        <Form.Item {...formItemLayout} label="Дата договора">
          {getFieldDecorator('documentDate', {
            rules: [{ required: false, message: 'не заполнено' }],
            initialValue: getObjectData.documentDate ? moment(getObjectData.documentDate, 'DD.MM.YYYY') : null,
          })(
            <DatePicker
              format={'DD.MM.YYYY'}
              value={null}
              style={{ width: '50%' }}
              placeholder="Выберите дату"/>,
          )}
        </Form.Item>


        <Form.Item {...formItemLayout} label="Период">
          {getFieldDecorator('period', {
            rules: [{ required: false, message: 'не заполнено' }],
            initialValue: getObjectData.dateBegin ? [moment(getObjectData.dateBegin, 'DD.MM.YYYY'), getObjectData.dateEnd ? moment(getObjectData.dateEnd, 'DD.MM.YYYY') : null] : null,
          })(
            <RangePicker
              style={{ width: '50%' }}
              format={'DD.MM.YYYY'}
              placeholder={[
                formatMessage({ id: 'datepicker.start.label' }),
                formatMessage({ id: 'datepicker.end.label' }),
              ]}/>,
          )}
        </Form.Item>


        <Form.Item {...formItemLayout} label="Примечание">
          {getFieldDecorator('descr', {
            rules: [{ required: false, message: 'не заполнено' }],
            initialValue: getObjectData.descr ? getObjectData.descr : null,
          })(
            <TextArea
              placeholder="Примечание"
              rows={4}/>,
          )}
        </Form.Item>


        <Form.Item {...formItemLayout} label="Подразделение">
          {getFieldDecorator('divisions', {
            rules: [{ required: false, message: 'не заполнено' }],
            initialValue: getObjectData.division ? getObjectData.division.id : null,
          })(
            <Select
              placeholder="Подразделение">
              {this.getReferenceValues('divisions', 'name')}
            </Select>,
          )}
        </Form.Item>


      </div>
    </Card>);
  };
}
