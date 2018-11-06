import React, { Component } from 'react';
import { Modal, DatePicker, Upload, Button, Icon, Row} from 'antd';
import moment from 'moment';

class ModalChangeDate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isVisible: false,
      ColType: null
    };
  }

  componentWillReceiveProps(props) {
    if (props != null) {
      this.setState({
        isVisible: props.visible,
        dataSource: props.dataSource,
        ColType: props.coltype,
      });
    }
  }

  handleOk = () => {
    const {dataSource, ColType} = this.state;
    const {serverFileList, resetshow, clearfile} = this.props;
    console.log({
      id: dataSource.id,
      files: serverFileList.map((file)=>file.id),
      date: dataSource.value,
      type: ColType
    })
    clearfile();
    resetshow();
    this.setState({ isVisible: false });

  };

  handleCancel = () => {
    const {resetshow, clearfile} = this.props;
    clearfile();
    resetshow();
  }

  render() {
    const dateFormat = 'DD.MM.YYYY';
    const { dataSource, isVisible, ColType } = this.state;
    const {serverFileList, addfile} = this.props;

    const props = {
      defaultFileList: serverFileList.map((file)=>({uid:file.id, name: file.filename})),
      //fileList: serverFileList.map((file)=>({uid:file.id, name: file.filename}))
    };

    return (
      <Modal
        title="Установка даты"
        onOk={() => {
          this.handleOk(dataSource);
        }}
        onCancel={() => {
          this.handleCancel(dataSource);
        }}
        width={500}
        centered
        visible={isVisible}
      >
        <Row>
          <DatePicker
            value={moment(dataSource.value, dateFormat)}
            size="large"
            style={{marginBottom: '5px'}}
            format={moment().format('DD.MM.YYYY')}
          />
        </Row>
        {ColType !== 'appEndDate' &&
        <Row>
          {isVisible &&
          <Upload
            {...props}
            beforeUpload={(e) => {
              console.log(e)
            }}
            onChange={addfile}
          >
            <Button size="large">
              <Icon type="upload" />Загрузить
            </Button>
          </Upload>
          }
        </Row>}
      </Modal>);
  }
}

export default ModalChangeDate;

