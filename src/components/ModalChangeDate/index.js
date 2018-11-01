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

  handleOk = (e, isOk = false) => {
    this.setState({ isVisible: false });
    this.props.resetshow(e, isOk);
  };

  render() {
    const dateFormat = 'DD.MM.YYYY';
    const { dataSource, isVisible } = this.state;
    return (<Modal
      title="Установка даты"

      onOk={() => {
        this.handleOk(dataSource, true);
      }}
      onCancel={() => {
        this.handleOk(dataSource,false);
      }}
      width={300}
      centered={true}
      visible={isVisible}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <DatePicker value={moment(dataSource.value, dateFormat)}
                  format={moment().format('DD.MM.YYYY')}
      />
      </div>
    </Modal>);
  }
}


