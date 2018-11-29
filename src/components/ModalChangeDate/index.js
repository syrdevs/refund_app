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
  changeDate: loading.effects['universal/changeDateRequest'],
}))
class ModalChangeDate extends Component {


  state = {
    changeDateValue: null,
  };

  handleOk = () => {

    const { dispatch, dataSource } = this.props;

    if (this.state.changeDateValue !== null) {
      dispatch({
        type: 'universal/changeDateRequest',
        payload: {
          [dataSource.key]: this.state.changeDateValue !== '' ? this.state.changeDateValue : null,
          id: dataSource.id,
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

  uploadFile = (data) => {

    const { dispatch, dataSource } = this.props;

    if (data.file.status === 'done') {
      //data.file.status = 'uploading';
      dispatch({
        type: 'universal/setfile',
        payload: {
          file: data.file.originFileObj,
          id: dataSource.id,
        },
      }).then(() => this.getFileList());
    }
  };
  removeFile = (file) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'universal/removeFileRequest',
      payload: {
        id: file.uid,
      },
    }).then(() => this.getFileList());
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

  /*disabledDate =(current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }*/

  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current.valueOf() < (Date.now() + -1 * 24 * 3600 * 1000);
  };

  render() {

    let uploadProps = {
      defaultFileList: this.props.universal.files.map((file) => ({
        uid: file.id,
        name: file.filename,
      })),
      onRemove: (file) => {
        if (this.props.universal.files.length === 1 && this.props.dataSource.value !== null) {
          Modal.error({
            title: 'Внимание',
            content: 'Файл не может быть удален. Пожалуйста, удалите сначала дату',
          });
          return false;
        } else {
          this.removeFile(file);
        }
      },
      onPreview: (file) => {

        let authToken = localStorage.getItem('token');

        fetch('/api/refund/upload/application/download/' + file.uid,
          {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              Authorization: 'Bearer ' + authToken,
            },
            method: 'post',
          })
          .then(response => response.blob())
          .then(responseBlob => {
            let blob = new Blob([responseBlob], { type: responseBlob.type }),
              url = window.URL.createObjectURL(blob);

            let a = document.createElement('a');
            a.href = url;
            a.download = url.split('/').pop();
            a.click();
            //window.open(url, '_self');
          });
      },
      onChange: this.uploadFile,
    };

    return (
      <Modal
        title={formatMessage({ id: 'modalchangedate.title' })}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={500}
        centered
        visible
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            {formatMessage({ id: 'system.close' })}
          </Button>,
          <Button
            disabled={this.props.coltype !== 'appEndDate' && this.props.universal.files.length === 0}
            key="submit" type="primary" onClick={this.handleOk}>
            {formatMessage({ id: 'form.save' })}
          </Button>,
        ]}
      >

        <Spin spinning={this.props.loadingFiles}>
          <Row>
            {this.props.dataSource.value && <DatePicker
              allowClear={false}
              defaultValue={moment(this.props.dataSource.value, this.props.dateFormat)}
              size="large"
              style={{ marginBottom: '5px' }}
              format={this.props.dateFormat}
              disabledDate={this.disabledDate}
              onChange={(date, dateString) => this.setState({ changeDateValue: dateString })}
            />}

            {!this.props.dataSource.value && <DatePicker
              allowClear={false}
              size="large"
              style={{ marginBottom: '5px' }}
              format={this.props.dateFormat}
              disabledDate={this.disabledDate}
              onChange={(date, dateString) => this.setState({ changeDateValue: dateString })}
            />}
          </Row>
          {this.props.coltype !== 'appEndDate' &&
          <Row style={{ marginTop: '15px' }}>
            {this.props.loadingFiles === false ?
              <Spin tip={'Загрузка файла...'} spinning={this.props.uploadFile === true}> <Upload
                {...uploadProps}>
                <Button size="large">
                  <Icon type="upload"/>{formatMessage({ id: 'system.load' })}
                </Button>
              </Upload></Spin> : <Button size="large">
                <Icon type="upload"/>{formatMessage({ id: 'system.load' })}
              </Button>
            }
          </Row>}</Spin>
      </Modal>
    );
  }
}

export default ModalChangeDate;

