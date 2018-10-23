import React, { Component } from 'react';
import { Modal } from 'antd';

export default class ModalGridView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(props) {

  }

  render() {
    return (<Modal
      centered
      title="20px to Top"
      style={{ top: 20 }}
      visible={}
      onOk={}
      onCancel={}
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>);
  }
}
