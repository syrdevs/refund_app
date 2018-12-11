import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card, Spin } from 'antd';
import SmartGridView from '@/components/SmartGridView';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import moment from 'moment';
import LinkModal from '@/components/LinkModal';
import DogovorModal from '../Modals/DogovorModal';

const { TextArea } = Input;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

@connect(({ universal2 }) => ({
  universal2,
}))
export default class InfoPage extends Component {
  state = {

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

  render = () => {
    let getObjectData = Object.keys(this.props.universal.getObjectData).length > 0 ? this.props.universal.getObjectData : {};


    if (this.props.universal.counterAgentData && Object.keys(this.props.universal.counterAgentData).length > 0) {
      getObjectData = this.props.universal.counterAgentData;
    }

    const { form: { getFieldDecorator, validateFields }, dispatch, data, formItemLayout } = this.props;

    return (<Card style={{ marginLeft: '-10px' }}>
      {this.state.DogovorModal.visible && <DogovorModal
        onSelect={(record) => {
          this.setState({ DogovorModal: { visible: false, record: record } });
        }}
        hide={() => this.setState({ DogovorModal: { visible: false } })
        }/>}

      <div style={{ margin: '0px 15px', maxWidth: '70%' }}>
        {/*<Form.Item {...formItemLayout} label="БИН">*/}
        {/*{getFieldDecorator('bin', {*/}
        {/*rules: [{ required: true, message: '' }]*/}
        {/*}*/}
        {/*)(<Input style={{ width: '50%' }}/>)}*/}
        {/*</Form.Item>*/}
        {/*<Form.Item {...formItemLayout} label="Контрагент">*/}
        {/*{getFieldDecorator('counteragent', {*/}
        {/*initialValue: '',*/}
        {/*rules: [{ required: true, message: '' }],*/}
        {/*})(*/}
        {/*<Select>*/}
        {/*<Option value="ant-design@alipay.com">Контрагент 1</Option>*/}
        {/*<Option value="ant-design@alipay.com">Контрагент 2</Option>*/}
        {/*<Option value="ant-design@alipay.com">Контрагент 3</Option>*/}
        {/*</Select>,*/}
        {/*)}*/}
        {/*</Form.Item>*/}
        <Form.Item {...formItemLayout} label="Вид договора">
          {getFieldDecorator('contractType', {
            rules: [{ required: false, message: 'не заполнено' }],
            initialValue: getObjectData.contractType ? getObjectData.contractType.id : null,
          })(
            <Select placeholder="Вид договора"
                    onChange={(value, option) => {
                      if (option.props.prop.code === '3') {
                        this.setState({ contractAlterationReason: true });
                      } else {
                        this.setState({ contractAlterationReason: false });
                      }
                    }}
            >
              {this.getReferenceValues('contractType', 'nameRu')}
            </Select>,
          )}
        </Form.Item>

        {/*{this.state.contractAlterationReason &&*/}
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
        {/*}*/}


        <Form.Item {...formItemLayout} label="Номер">
          {getFieldDecorator('number', {
            rules: [{ required: false, message: 'не заполнено' }],
            initialValue: getObjectData.number ? getObjectData.number : null,
          })(<Input placeholder="Номер"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Дата договора">
          {getFieldDecorator('documentDate', {
            rules: [{ required: false, message: 'не заполнено' }],
            initialValue: getObjectData.documentDate ? moment(getObjectData.documentDate) : null,
          })(
            <DatePicker
              format={'DD.MM.YYYY'}
              value={null}
              style={{ width: '50%' }}
              placeholder="Выберите дату"/>,
          )}
        </Form.Item>
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
        <Form.Item {...formItemLayout} label="Период">
          {getFieldDecorator('period', {
            rules: [{ required: false, message: 'не заполнено' }],
            initialValue: getObjectData.dateBegin ? [moment(getObjectData.dateBegin), getObjectData.dateEnd ? getObjectData.dateEnd : null] : null,
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
        <Form.Item {...formItemLayout} label="Родительский договор">
          {getFieldDecorator('parentContract', {

            initialValue: getObjectData.parentContract ? getObjectData.parentContract : null,
            rules: [{
              //required: false, message: 'не заполнено',
              validator: (rule, value, callback) => {
                if (value !== null && value) {
                  if (value.value !== null) {
                    callback();
                    return;
                  } else {
                    callback('не заполнено');
                  }
                }
                callback('не заполнено');
              },
            }],
          })(
            <LinkModal
              data={this.state.DogovorModal.record}
              onTarget={(record) => {
                console.log(record);
              }}
              onDelete={() => {
                this.setState({ DogovorModal: { visible: false, record: null } });
              }}
              onClick={() => {
                this.setState({ DogovorModal: { visible: true } });
              }}>
            </LinkModal>)}
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
        {/*<Form.Item {...formItemLayout} label="Статус">*/}
        {/*{getFieldDecorator('status', {*/}
        {/*initialValue: '',*/}
        {/*rules: [{ required: true, message: '' }],*/}
        {/*})(*/}
        {/*<Select>*/}
        {/*<Option value="ant-design@alipay.com">Статус 1</Option>*/}
        {/*<Option value="ant-design@alipay.com">Статус 2</Option>*/}
        {/*<Option value="ant-design@alipay.com">Статус 3</Option>*/}
        {/*</Select>,*/}
        {/*)}*/}
        {/*</Form.Item>*/}
      </div>
    </Card>);
  };
}
