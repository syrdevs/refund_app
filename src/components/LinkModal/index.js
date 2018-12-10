import React, { Component, PureComponent } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card, Modal } from 'antd';

export default class LinkModal extends Component {
  state = {
    visible: false,
  };

  hideModal = () => {
    this.setState({ visible: false });
  };

  render = () => {

    return (<div>
      <Modal
        width={1000}
        onOk={() => this.hideModal()}
        onCancel={() => this.hideModal()}
        visible={this.state.visible}>
        {this.props.children}
      </Modal>

      {!this.props.data ? <Button onClick={() => {
        this.props.onClick(false);
      }}>Выбрать</Button> : <span
        style={{
          color: '#1890ff',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={() => {
          window.open("viewcontract?id=1");
        }}> Договор #12153161681 </span>}


    </div>);
  };
}
