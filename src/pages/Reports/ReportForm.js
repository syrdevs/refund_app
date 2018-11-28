import React, { Component } from 'react';
import {
  Card,
  Table,
  Icon,
  Menu,
  Input,
  Dropdown,
  Button,
  Checkbox,
  Tabs,
  Label,
  Spin,
  Select,
  Row,
  Col,
  Calendar, Badge,
  DatePicker,
  InputNumber,
  Modal,
} from 'antd';
import moment from 'moment/moment';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva/index';
import SelectList from '@/components/SelectList';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { TextArea } = Input;

@connect(({ universal2, loading }) => ({
  universal2

}))
export default class ReportForm extends Component {
  state = {
    formId: '0',
    formFilters: [],
    loading: false,
  };

  setFilterValue = (value, _index) => {
    this.setState(prevState => ({
      formFilters: {
        ...prevState.formFilters,
        [_index]: value,
      },
    }));
  };

  componentDidUpdate() {
    const { dispatch } = this.props;
    if (this.props.data.id && this.props && this.state.formId !== this.props.data.id) {
      dispatch({
        type: 'universal2/reportParameters',
        payload: { id: this.props.data.id },
      }).then(() => {
        this.setState(prevState => ({
          formId: this.props.data.id,
          formFilters: {},
        }));
      });
    }
  }

  generateForm = (formItem, _index) => {

    const inputValue = this.state.formFilters;

    switch (formItem.parameter_type) {
      case 'Choice': {

        let params = {};

        if (formItem.multi_value) {
          params.mode = 'multiple';
        }

        return (<div key={_index + '_'} style={{ margin: '5px' }}>{formItem.name}:
          <Select
            {...params}
            style={{ width: '100%' }}
            placeholder=""
            onChange={(value) => {
              this.setFilterValue({
                value: {
                  name: formItem.name,
                  value: formItem.multi_value ? value.map(x => !isNaN(x) ? parseInt(x) : x) : (!isNaN(value) ? parseInt(value) : value),
                },
              }, _index);
            }}
          >
            <Select.Option key={null}>{<div style={{ height: 20 }}></div>}</Select.Option>
            {formItem.enumerable.map((item) => {
              return <Select.Option key={item.id}>{item.name}</Select.Option>;
            })}
          </Select>
        </div>);
      }
      case 'Entity': {

        return (<div key={_index + '_'} style={{ margin: '5px' }}>{formItem.name}:
          <SelectList multipleSelect={formItem.multi_value} name={formItem.entity} onSelect={(record) => {
            this.setFilterValue({
              value: {
                name: formItem.name,
                value: formItem.multi_value ? record.map(x => x.id) : record.id,
              },
            }, _index);
          }}/>
        </div>);
      }
      default:
        break;
    }

    switch (formItem.type) {

      case 'Decimal': {
        let params = {
          value: inputValue[_index] ? inputValue[_index].momentValue : null,
        };

        return (
          <div key={_index + '_'} style={{ margin: '5px' }}>{formItem.name}:
            <InputNumber style={{ width: '100%' }} onChange={(e) => {
              if (e) {
                this.setFilterValue({
                  value: {
                    name: formItem.name,
                    value: e.toString(),
                  },
                }, _index);
              }

            }}/>
          </div>);
      }

      case 'Text': {
        let params = {
          value: inputValue[_index] ? inputValue[_index].momentValue : null,
        };

        return (
          <div key={_index + '_'} style={{ margin: '5px' }}>{formItem.name}:
            <TextArea rows={4} onChange={(e) => {
              this.setFilterValue({
                value: {
                  name: formItem.name,
                  value: e.target.value,
                },
              }, _index);
            }}/>
          </div>);
      }

      case 'Boolean': {
        let params = {
          value: inputValue[_index] ? inputValue[_index].momentValue : null,
        };

        return (
          <div key={_index + '_'} style={{ margin: '5px' }}><span style={{ paddingRight: 10 }}>{formItem.name}:</span>
            <Checkbox onChange={(e) => {
              this.setFilterValue({
                value: {
                  name: formItem.name,
                  value: e.target.checked,
                },
              }, _index);
            }}/>
          </div>);
      }

      case 'Int32': {
        let params = {
          value: inputValue[_index] ? inputValue[_index].momentValue : null,
        };

        return (<div key={_index + '_'} style={{ margin: '5px' }}>{formItem.name}:<br/>
          <InputNumber style={{ width: '100%' }} onChange={(e) => {
            if (e) {
              this.setFilterValue({
                value: {
                  name: formItem.name,
                  value: e,
                },
              }, _index);
            }

          }}/>
        </div>);
      }

      case 'Int64': {
        let params = {
          value: inputValue[_index] ? inputValue[_index].momentValue : null,
        };

        return (<div key={_index + '_'} style={{ margin: '5px' }}>{formItem.name}:<br/>
          <InputNumber style={{ width: '100%' }} onChange={(e) => {
            if (e) {
              this.setFilterValue({
                value: {
                  name: formItem.name,
                  value: e,
                },
              }, _index);
            }

          }}/>
        </div>);
      }

      case 'String': {
        let params = {
          value: inputValue[_index] ? inputValue[_index].momentValue : null,
        };

        return (<div key={_index + '_'} style={{ margin: '5px' }}>{formItem.name}:<br/>
          <Input onChange={(e) => {
            this.setFilterValue({
              value: {
                name: formItem.name,
                value: e.target.value,
              },
            }, _index);
          }}/>
        </div>);
      }

      case 'DateTime': {
        let params = {
          value: inputValue[_index] ? inputValue[_index].momentValue : null,
        };

        return (<div key={_index + '_'} style={{ margin: '5px' }}>{formItem.name}:<br/>
          <DatePicker
            {...params}
            style={{
              width:"100%"
            }}
            format="DD.MM.YYYY"
            onChange={(date, stringDate) => {
              this.setFilterValue({
                value: {
                  name: formItem.name,
                  value: stringDate,
                },
                momentValue: date,
              }, _index);
            }}
            placeholder={formItem.placeHolder}
            key={_index}/>
        </div>);
      }

      case 'RangePicker': {

        let params = {
          value: inputValue[_index] ? inputValue[_index].momentValue : null,
        };

        return (<div key={_index + '_'} style={{ margin: '5px' }}>{formItem.label}:
          <RangePicker
            {...params}
            format="DD.MM.YYYY"
            onChange={(date, stringDate) => {
              this.setFilterValue({
                value: stringDate,
                momentValue: date,
              }, _index);
            }}
            placeholder={formItem.placeHolder}
            key={_index}/>
        </div>);
      }
      case 'MonthPicker': {

        let params = {
          value: inputValue[_index] ? inputValue[_index].momentValue : null,
        };

        if (inputValue[_index]) {
          params.open = inputValue[_index].open;
        }

        return (<div key={_index + '_'} style={{ margin: '5px' }}>{formItem.label}:
          <RangePicker
            {...params}
            onOpenChange={(status) => {
              this.setFilterValue({
                open: status,
                value: inputValue[_index] ? inputValue[_index].value : null,
                momentValue: inputValue[_index] ? inputValue[_index].momentValue : null,
              }, _index);
            }}
            onPanelChange={(date, mode) => {
              if (mode[0] === 'month') {
                let dateValues = [
                  moment(date[0]).format('MM.YYYY'),
                  moment(date[1]).format('MM.YYYY'),
                ];

                this.setFilterValue({
                  open: false,
                  value: dateValues,
                  momentValue: date,
                }, _index);

              }
            }}
            placeholder={formItem.placeHolder}
            mode={['month', 'month']}
            format="MM.YYYY"
            key={_index}/>
        </div>);
      }
      default:
        break;
    }

  };

  render() {
    const { buttonIsDisabled, reportName, reportForming, data } = this.props;

    const testParameters = [
      {
        'name': 'Дата с',
        'parameter_type': 'Const',
        'type': 'DateTime',
        'multi_value': false,
      },
      {
        'name': 'Дата по',
        'parameter_type': 'Const',
        'type': 'DateTime',
        'multi_value': false,
      },
      {
        'name': 'String',
        'parameter_type': 'Const',
        'type': 'String',
        'multi_value': false,
      },
      {
        'name': 'Int32',
        'parameter_type': 'Const',
        'type': 'Int32',
        'multi_value': false,
      },
      {
        'name': 'Boolean',
        'parameter_type': 'Const',
        'type': 'Boolean',
        'multi_value': false,
      },
      {
        'name': 'Decimal',
        'parameter_type': 'Const',
        'type': 'Decimal',
        'multi_value': false,
      },
      {
        'name': 'Text',
        'parameter_type': 'Const',
        'type': 'Text',
        'multi_value': false,
      },
      {
        'name': 'Int64',
        'parameter_type': 'Const',
        'type': 'Int64',
        'multi_value': false,
      },
      {
        'name': 'Статус',
        'parameter_type': 'Choice',
        'enumerable': [
          {
            'id': 0,
            'name': 'Не отправлено',
          },
          {
            'id': 1,
            'name': 'Отправлено',
          },
          {
            'id': 2,
            'name': 'Ошибка',
          },
        ],
        'multi_value': false,
      },
      {
        'name': 'Статус multi',
        'parameter_type': 'Choice',
        'enumerable': [
          {
            'id': 0,
            'name': 'Не отправлено',
          },
          {
            'id': 1,
            'name': 'Отправлено',
          },
          {
            'id': 2,
            'name': 'Ошибка',
          },
        ],
        'multi_value': true,
      },
      {
        'name': 'КНП',
        'parameter_type': 'Entity',
        'entity': 'knp',
        'id_field': 'id',
        'multi_value': false,
      },
      {
        'name': 'КНП multi',
        'parameter_type': 'Entity',
        'entity': 'knp',
        'id_field': 'id',
        'multi_value': true,
      },
    ];

    return (<Card bodyStyle={{ padding: 15 }}>
      {reportName}
      <hr/>
      <br/>
      {/*{this.props.data.id  && <ReportParamForm*/}
      {/*onFilter={(filterData) => {*/}
      {/*console.log(filterData);*/}
      {/*}}*/}
      {/*filterData={(data) => {*/}
      {/*console.log(data);*/}
      {/*}}/>}*/}

      {this.props.universal2.reportParametersData.length > 0 ? testParameters.map((filterItem, idx) => this.generateForm(filterItem, idx)) : formatMessage({ id: 'system.outParameters' })}
      <br/>
      <Button onClick={() => {
        reportForming(this.state.formFilters);
      }} type={'primary'} disabled={buttonIsDisabled}>{formatMessage({ id: 'system.forming' })}</Button>
    </Card>);
  }
}
