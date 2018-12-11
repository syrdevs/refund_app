import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card } from 'antd';
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
        <Option value={item.id} key={item.id}>{item[propName]}</Option>))
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
            rules: [{ required: true, message: 'не заполнено' }],
            initialValue: '',
          })(
            <Select placeholder="Вид договора">
              {this.getReferenceValues('contractType', 'nameRu')}
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Причина">
          {getFieldDecorator('reason', {
            rules: [{ required: false, message: 'не заполнено' }],
            initialValue: '',
          })(
            <Select placeholder="Причина">
              {this.getReferenceValues('contractAlterationReason', 'nameRu')}
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Номер">
          {getFieldDecorator('number', {
            rules: [{ required: false, message: 'не заполнено' }],
            initialValue: '',
          })(<Input placeholder="Номер"/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Дата договора">
          {getFieldDecorator('documentDate', {
            rules: [{ required: true, message: 'не заполнено' }],
            initialValue: '',
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
            rules: [{ required: true, message: 'не заполнено' }],
            initialValue: '',
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
            rules: [{ required: true, message: 'не заполнено' }],
            initialValue: '',
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
            initialValue: '',
          })(
            <Select
              placeholder="Подразделение">
              {this.getReferenceValues('divisions', 'name')}
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Родительский договор">
          <LinkModal
            value={'Договор №1254364'}
            data={this.state.DogovorModal.record}
            onClick={(isLink, record) => {
              console.log(record);
              if (isLink) {
                this.setState({ DogovorModal: { visible: false, record: null } });
              } else {
                this.setState({
                  DogovorModal: {
                    visible: true,
                  },
                });
              }
            }}>
          </LinkModal>
        </Form.Item>
        <Form.Item {...formItemLayout} label="Примечание">
          {getFieldDecorator('descr', {
            rules: [{ required: false, message: 'не заполнено' }],
            initialValue: '',
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
