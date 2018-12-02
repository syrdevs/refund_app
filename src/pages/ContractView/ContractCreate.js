import React, { Component } from 'react';
import ContractService from './ContractService';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Card,
  Modal,
} from 'antd';

export default class ContractCreateModal extends Component {
  state = {};

  componentWillUnmount = () => {

  };

  componentDidMount = () => {

  };

  render = () => {
    return (<Modal
      title="Vertically centered modal dialog"
      centered
      visible={true}
      onOk={this.props.hideModal}
      onCancel={this.props.hideModal}
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>);
  };
}
