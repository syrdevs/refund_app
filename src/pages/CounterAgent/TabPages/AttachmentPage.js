import React, { Component } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  DatePicker,
  Table,
  Row,
  Col,
  Tabs,
  Card,
  Upload,
  Icon,
  Spin,
} from 'antd';
import reduxRouter from 'umi/router';
import { connect } from 'dva/index';
import saveAs from 'file-saver';

const TabPane = Tabs.TabPane;
const { TextArea } = Input;

@Form.create()
@connect(({ universal, loading }) => ({
  universal,
  // loadingData: loading.effects['universal/saveobject'],
}))
class AttachmentPage extends Component {
  state = {
    columns: [
      {
        title: 'Документ',
        dataIndex: 'attachmentType.nameRu',
        width: '30%',
      }, {
        title: 'Коментарий',
        dataIndex: 'fileDescription',
        width: '50%',
      }, {
        title: 'Файл',
        width: '10%',
        render: ((item) => {
          return <a onClick={() => {
            this.downloadFile(item);
          }}>{item.name}</a>;
        }),
      }, {
        title: 'Действие',
        width: '10%',
        render: ((item) => {
          return <a onClick={() => {
            this.removeFile(item);
          }}>Удалить</a>;
        }),
      },
    ],
    dataSource: [],
    loading: false,
  };


  componentDidMount() {

    const { dispatch } = this.props;

    this.getFilesData();

    dispatch({
      type: 'universal/getattachmentType',
      payload: {
        'start': 0,
        'length': 500,
        'entity': 'attachmentType',
      },
    });
  }

  getFilesData = () => {
    const { dispatch } = this.props;
    if (this.props.contractId) {

      this.setState({ loading: true });

      dispatch({
        type: 'universal/getobject',
        payload: {
          'entity': 'contract',
          'alias': null,
          'id': this.props.contractId,
        },
      }).then(() => {
        this.setState({
          dataSource: this.props.universal.getObjectData.documentAttachments!==undefined ? this.props.universal.getObjectData.documentAttachments : [],
          loading: false,
        });
      });
    }

  };

  downloadFile = (file) => {

    let authToken = localStorage.getItem('token');
    this.setState({ loading: true });
    fetch('/api/uicommand/downloadFile',
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + authToken,
        },
        method: 'post',
        body: JSON.stringify(
          {
            "entity":"documentAttachment",
            "id":file.id
          }
        )
      })
      .then(response => {
        if (response.ok) {
          return response.blob().then(blob => {

            this.setState({ loading: false });
            let disposition = response.headers.get('content-disposition');
            return {
              fileName: this.getFileNameByContentDisposition(disposition),
              raw: blob,
            };
          });
        }
      })
      .then(data => {
        if (data) {
          saveAs(data.raw, data.fileName);
        }
      });

  };
  removeFile = (file) => {
    const { dispatch } = this.props;

    this.setState({ loading: true });
    dispatch({
      type: 'universal/deleteObject',
      payload: {
        "entity":"documentAttachment",
        "id":file.id
      },
    }).then(() =>{
      this.setState({ loading: false });
      this.getFilesData();
    });
  };
  uploadFile = (data) => {

    this.props.form.validateFields(
      (err, values) => {

        if (err) {
          return;
        }

        if (data.file.status === 'done') {
          let authToken = localStorage.getItem('token');
          let entityData = {};

          if (values.fileDescription) {
            entityData.fileDescription = values.fileDescription;
          }

          if (values.fileDoc) {
            entityData.attachmentType = { 'id': values.fileDoc };
          }

          const formData = new FormData();
          formData.append('entity', 'contract');
          formData.append('path', 'documentAttachments');
          formData.append('id', this.props.contractId);
          formData.append('filedata', JSON.stringify({
            'entity': 'documentAttachment',
            'alias': null,
            'data': entityData,
          }));
          formData.append('content', data.file.originFileObj);

          const options = {
            headers: {
              Authorization: 'Bearer ' + authToken,
            },
            method: 'POST',
            body: formData,
          };

          this.setState({ loading: true });

          fetch('/api/uicommand/uploadFile', options)
            .then((response) => {
              this.setState({ loading: false });
              this.getFilesData();
            });
        }
      });


  };


  getFileNameByContentDisposition = (contentDisposition) => {
    let filename = '';
    if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
      let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      let matches = filenameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }
    }

    return filename;
  };

  render() {

    const { form: { getFieldDecorator, validateFields }, formItemLayout } = this.props;

    let uploadProps = {
      onPreview: (file) => {

      },
      onRemove: this.removeFile,
      onChange: this.uploadFile,
    };

    return (<Card style={{ marginLeft: '-10px' }}>
      <Spin spinning={this.state.loading}>
        <Row>
          <div style={{ margin: '10px 0', maxWidth: '70%' }}>
            <Form.Item {...formItemLayout} label="Документ">
              {getFieldDecorator('fileDoc', {
                initialValue: null,
                rules: [{ required: true, message: 'не заполнено' }],
              })(
                <Select allowClear>
                  {this.props.universal.attachmentType.content && this.props.universal.attachmentType.content.map((item) => {
                    return <Select.Option key={item.id} value={item.id}>{item.nameRu}</Select.Option>;
                  })}
                </Select>,
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Комментарий">
              {getFieldDecorator('fileDescription', {
                initialValue: null,
                rules: [{ required: false, message: 'не заполнено' }],
              })(
                <TextArea rows={4}/>,
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Тип файла">
              {getFieldDecorator('file', {
                initialValue: null,
                rules: [{ required: false, message: 'не заполнено' }],
              })(
                <Upload
                  {...uploadProps}
                  showUploadList={false}
                  name="logo">
                  <Button>
                    <Icon type="upload"/> Загрузить
                  </Button>
                </Upload>,
              )}
            </Form.Item>
          </div>
        </Row>
        <Row>
          <Table
            columns={this.state.columns}
            dataSource={this.state.dataSource}
            pagination={{ position: 'none' }}
            showHeader={false}
          />
        </Row>
      </Spin>
    </Card>);
  }
}

export default AttachmentPage;
