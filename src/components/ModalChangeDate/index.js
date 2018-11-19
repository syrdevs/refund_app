import React, { Component } from 'react';
import { Modal, DatePicker, Upload, Button, Icon, Row, Input, Spin } from 'antd';
import moment from 'moment';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';

@connect(({ universal, loading }) => ({
  universal,
  uploadFile: loading.effects['universal/setfile'],
  loadingFiles: loading.effects['universal/getFilesRequestDate'],
  deleteFile: loading.effects['universal/removeFileRequest'],
}))
class ModalChangeDate extends Component {


  state = {
    changeDateValue: null,
  };

  handleOk = () => {

    const { changeDateValue } = this.state;

    if (changeDateValue !== null) {

    }
    //this.props.hideModal();
  };


  handleCancel = () => {
    this.props.hideModal();
  };

  uploadFile = (data) => {

    const { dispatch, dataSource } = this.props;

    if (data.file.status === 'removed') {
      this.removeFile(data.file);
    }


    if (data.file.status === 'done') {
      dispatch({
        type: 'universal/setfile',
        payload: {
          file: data.file.originFileObj,
          id: dataSource.id,
        },
      });
    }
  };
  removeFile = (file) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'universal/removeFileRequest',
      payload: {
        id: file.uid,
      },
    });
  };

  getFileList = () => {

    const { dataSource, dispatch } = this.props;

    dispatch({
      type: 'universal/getFilesRequestDate',
      payload: {
        id: dataSource.id,
      },
    });

  };

  componentDidMount() {
    this.getFileList();
  }

  render() {

    let uploadProps = {
      defaultFileList: this.props.universal.files.map((file) => ({
        uid: file.id,
        name: file.filename,
      })),
      onChange: this.uploadFile,
    };

    return (
      <Modal
        title={formatMessage({ id: 'modalchangedate.title' })}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={500}
        centered
        visible={true}>
        <Spin spinning={this.props.loadingFiles}>
          <Row>
            <DatePicker
              allowClear={false}
              defaultValue={moment(this.props.dataSource.value, this.props.dateFormat)}
              size="large"
              style={{ marginBottom: '5px' }}
              format={this.props.dateFormat}
              onChange={(date, dateString) => this.setState({ changeDateValue: dateString })}
            />
          </Row>
          {this.props.coltype !== 'appEndDate' &&
          <Row>
            {this.props.loadingFiles === false &&
            <Upload
              {...uploadProps}>
              <Button size="large">
                <Icon type="upload"/>{formatMessage({ id: 'system.load' })}
              </Button>
            </Upload>
            }
          </Row>}
        </Spin>
      </Modal>
    );
  }
}

export default ModalChangeDate;

