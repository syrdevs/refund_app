import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card } from 'antd';
import SmartGridView from '@/components/SmartGridView';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';

const { TextArea } = Input;
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


@Form.create()
export default class InfoPage extends Component {
  state = {
    columns: [
      {
        'title': 'Наименование',
        'dataIndex': 'name',
        'isVisible': 'true',
      },
      {
        'title': 'Тип1',
        'dataIndex': 'type1',
        'isVisible': 'true',
      },
      {
        'title': 'Тип2',
        'dataIndex': 'type2',
        'isVisible': 'true',
      },
    ],
    data: [
      {
        key: 1, name: 'Договор 1', type1: 32, type2: 'абс',
      },
      {
        key: 2, name: 'Договор 1', type1: 42, type2: 'абс',
      },
      {
        key: 3, name: 'Договор 1', type1: 32, type2: 'абс',
      },
    ],
    ContractSelect: [],
    selectedRowKeys: [],
  };
  render = () => {

    const { form: { getFieldDecorator, validateFields }, dispatch, data } = this.props;
    const { formItemLayout } = this.props;


    return (<Card  style={{ marginLeft: '-10px' }}>
      <div style={{ margin: '0px 15px', maxWidth: '70%' }}>
        <Form.Item {...formItemLayout} label="БИН">
          {getFieldDecorator('bin', {
            initialValue: '',
            rules: [{ required: true, message: '' }],
          })(<Input style={{ width: '50%' }}/>)}
        </Form.Item>
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
          {getFieldDecorator('contract_Type', {
            initialValue: '',
            rules: [{ required: true, message: '' }],
          })(
            <Select>
              <Option value="ant-design@alipay.com">Договор 1</Option>
              <Option value="ant-design@alipay.com">Договор 2</Option>
              <Option value="ant-design@alipay.com">Договор 3</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Причина">
          {getFieldDecorator('reason', {
            initialValue: '',
            rules: [{ required: true, message: '' }],
          })(
            <Select>
              <Option value="ant-design@alipay.com">Причина 1</Option>
              <Option value="ant-design@alipay.com">Причина 2</Option>
              <Option value="ant-design@alipay.com">Причина 3</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Номер">
          {getFieldDecorator('number', {
            initialValue: '',
            rules: [{ required: true, message: '' }],
          })(<Input/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Дата">
          {getFieldDecorator('date', {
            initialValue: '',
            rules: [{ required: true, message: '' }],
          })(
            <DatePicker
              value={null}
              style={{ width: '100%' }}
              placeholder="Выберите дату"/>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Отчетный период">
          {getFieldDecorator('report_period', {
            initialValue: '',
            rules: [{ required: true, message: '' }],
          })(
            <MonthPicker
              style={{ width: '100%' }}
              placeholder="Выберите период"/>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Период">
          {getFieldDecorator('period', {
            initialValue: '',
            rules: [{ required: true, message: '' }],
          })(
            <RangePicker
              style={{ width: '100%' }}
              placeholder={[
                formatMessage({ id: 'datepicker.start.label' }),
                formatMessage({ id: 'datepicker.end.label' }),
              ]}/>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Подразделение">
          {getFieldDecorator('podr', {
            initialValue: '',
            rules: [{ required: true, message: '' }],
          })(
            <Select>
              <Option value="ant-design@alipay.com">Подразделение 1</Option>
              <Option value="ant-design@alipay.com">Подразделение 2</Option>
              <Option value="ant-design@alipay.com">Подразделение 3</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Примечание">
          {getFieldDecorator('description', {
            initialValue: '',
            rules: [{ required: true, message: '' }],
          })(
            <TextArea rows={4}/>,
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
