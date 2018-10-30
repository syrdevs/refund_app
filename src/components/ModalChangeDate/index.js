import React, { Component } from 'react';
import { Modal, Tabs, Table, Input, DatePicker, Card } from 'antd';
import moment from 'moment';
const InputGroup = Input.Group;
const TabPane = Tabs.TabPane;

export default class ModalChangeDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isVisible: false,
    };
  }

  componentWillReceiveProps(props, prevProps) {
    if (props != null) {
      this.setState({
        isVisible: props.visible,
        dataSource: props.dataSource,
      });
    }
  }

  handleOk = (e) => {
    this.props.resetshow(e);
  };

  render() {
    const dateFormat = 'DD.MM.YYYY';
    const { dataSource, isVisible } = this.state;
    return (<Modal
      title="Установка даты"
      onOk={()=>{this.handleOk(dataSource);this.setState({isVisible:false})}}
      onCancel={()=>{this.setState({isVisible:false})}}
      width={700}
      centered
      visible={isVisible}>
        <DatePicker value={moment(dataSource.value, dateFormat)}/>
    </Modal>);
  }
}


