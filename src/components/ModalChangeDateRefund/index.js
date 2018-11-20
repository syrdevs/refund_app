import React, { Component } from 'react';
import { Modal, DatePicker, Upload, Button, Icon, Row, Input, Spin } from 'antd';
import moment from 'moment';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';

@connect(({ universal }) => ({
  universal,
}))
class ModalChangeDateRefund extends Component {

  state = {
    changeDateValue: null,

    loading: false,
  };

  handleOk = () => {

    const { dispatch, dataSource } = this.props;

    if (this.state.changeDateValue !== null) {

      this.setState({ loading: true });

      dispatch({
        type: 'universal/changeDateRefund',
        payload: {
          refundDate: this.state.changeDateValue,
          refundList: this.props.selectedRowKeys.map((refundId) => ({ id: refundId })),
        },
      }).then(() => {
        this.props.hideModal(true);
      });
    }
    this.props.hideModal();
  };

  handleCancel = () => {
    this.props.hideModal();
  };

  render() {

    console.log(this.props);

    return (
      <Modal
        title={formatMessage({ id: 'modalchangedate.title' })}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={500}
        centered
        visible={true}>
        <Spin spinning={this.state.loading}>
          <span>Дата:</span> <DatePicker
          allowClear={false}
          size="large"
          style={{ marginBottom: '5px' }}
          format={this.props.dateFormat}
          onChange={(date, dateString) => this.setState({ changeDateValue: dateString })}
        />
        </Spin>
      </Modal>
    );
  }
}

export default ModalChangeDateRefund;

