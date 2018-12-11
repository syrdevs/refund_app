import React, { Component, PureComponent } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Select, Divider, DatePicker, Icon, Table, Row, Col, Tabs, Card, Modal } from 'antd';

export default class LinkModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: props.value ? props.value : null,
    };
  }


  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }


  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  handleChange = (record) => {
    this.triggerChange({ value: record });
  };

  hideModal = () => {
    this.setState({ visible: false });
  };

  render = () => {



    let fileName = '';

    if (this.props.data && this.state.value === null) {
      this.handleChange(this.props.data);
      fileName = `№ ${this.props.data.number} от ${this.props.data.documentDate}`;
    }

    if (this.state.value !== null) {
      fileName = `№ ${this.state.value.number} от ${this.state.value.documentDate}`;
    }

    return (<div>
      <Modal
        width={1000}
        onOk={() => this.hideModal()}
        onCancel={() => this.hideModal()}
        visible={this.state.visible}>
        {this.props.children}
      </Modal>

      {!this.props.data && this.state.value === null ? <Button onClick={() => {
        this.props.onClick();
      }}>Выбрать</Button> : <div>

      <span
        style={{
          color: '#1890ff',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={() => {
          this.props.onTarget(this.props.data ? this.props.data : this.state.value);
        }}>
        {fileName}
        </span>

        <span
          onClick={() => {
            this.handleChange(null);
            this.props.onDelete();
          }}
          style={{
            marginLeft: '20px',
            cursor: 'pointer',
            color: 'red',
            textDecoration: 'underline',
            fontSize: '11px',
          }}>Удалить</span>

      </div>}
    </div>);
  };
}
