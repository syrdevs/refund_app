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
  Select,
  Row,
  Col,
  Calendar, Badge,
  DatePicker,
  Modal,
} from 'antd';

export default class ReportForm extends Component {
  state = {};

  componentDidUpdate() {

  }

  componentDidMount() {
  }

  render() {

    const { buttonIsDisabled, reportName, reportForming } = this.props;

    return (<Card bodyStyle={{ padding: 15 }}>
      {reportName}
      <hr/>
      Параметры отсутсвуют
      <br/>
      <br/>
      <Button onClick={reportForming} type={'primary'} disabled={buttonIsDisabled}>Сформировать</Button>
    </Card>);
  }
}
