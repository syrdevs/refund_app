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

@connect(({ universal2 }) => ({
  universal2,
}))
export default class ReportParamForm extends Component {
  state = {};
  componentWillUnmount(){
    console.log("did un mount");
  }
  componentDidMount(){
    console.log("did mount");
  }
  componentDidUpdate() {
    /*const { dispatch } = this.props;
    if (this.props.data.id && this.state.formId !== this.props.data.id) {
      dispatch({
        type: 'universal2/reportParameters',
        payload: { id: this.props.data.id },
      }).then(() => {
        this.setState(prevState => ({
          formId: this.props.data.id,
          formFilters: {},
        }));
      });

    }*/
  }

  render = () => {

    /*
    {this.props.universal2.reportParametersData.length > 0 ? testParameters.map((filterItem, idx) => this.generateForm(filterItem, idx)) : formatMessage({ id: 'system.outParameters' })}
    * */
    return (<div>test</div>);
  };
}
