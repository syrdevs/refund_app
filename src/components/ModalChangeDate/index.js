import React, { Component } from 'react';
import { Modal, Tabs, Table, Input, DatePicker, Card, Upload, Button, Icon, Row} from 'antd';
import moment from 'moment';
import { connect } from 'dva/index';

const InputGroup = Input.Group;
const TabPane = Tabs.TabPane;

@connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects['universal/setfile'],
}))
export default class ModalChangeDate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isVisible: false,
      defalutFileList: [],
      newfile:null,
      ColType: null,
      fileids:[]
    };
  }
  componentDidMount () {
    this.setState({
      fileids:[
        ...this.state.defalutFileList.map((e)=> {
          return e.uid
        })
      ]
    })
  }
  componentDidUpdate () {
  }
  componentWillUpdate() {

  }

  componentWillReceiveProps(props) {
    if (props != null) {
      this.setState({
        isVisible: props.visible,
        dataSource: props.dataSource,
        ColType: props.coltype,
      });
      const arr=[];
      this.props.serverFileList.map((singleFile) => {
          arr.push({uid: singleFile.id, name: singleFile.filename});
      });
      this.setState({
        defalutFileList: arr
      })
    }
  }
  handleChange = (e) =>{
    if (e.file.status == 'uploading') {
      const { dispatch } = this.props;
      dispatch({
        type: 'universal/setfile',
        payload: {e},
      }) .then((data) => {
          e.file.uid = this.props.universal.setfile.id;
          e.file.name = this.props.universal.setfile.filename;
          e.file.status = 'done';
        this.setState({
          defalutFileList: [
            ...this.state.defalutFileList,
            {uid: this.props.universal.setfile.id, name: this.props.universal.setfile.filename}]
        }, () =>{
          this.setState({
            fileids:[
              ...this.state.defalutFileList.map((e)=> {
                return e.uid
              })
            ]
          })
        });
      })
    }
    if (e.file.status == 'removed') {
        this.setState({defalutFileList: this.state.defalutFileList.filter((obj)=>{
            return obj.id !== e.file.uid
          })
      })
      console.log({
        id: e.file.uid,
        filename: e.file.name
      })
    }
  }

  handleOk = (e, isOk = false) => {

    console.log({
      id: this.state.dataSource.id,
      files: this.state.fileids,
      date: this.state.dataSource.value,
      type: this.state.ColType
    })
    this.setState({ isVisible: false });
    this.props.resetshow(e, isOk);
  };

  render() {
    const dateFormat = 'DD.MM.YYYY';
    const { dataSource, isVisible } = this.state;

    const props = {
      defaultFileList: this.state.defalutFileList
    };
    /*action: (file) =>{

            this.setState({
              newfile: this.props.universal.setfile
            })

          },*/

    return (
      <Modal
      title="Установка даты"

      onOk={() => {
        this.handleOk(dataSource, true);
      }}
      onCancel={() => {
        this.handleOk(dataSource,false);
      }}
      width={500}
      centered={true}
      visible={isVisible}>
      <Row>
        <DatePicker value={moment(dataSource.value, dateFormat)}
                    size={'large'}
                    style={{marginBottom: '5px'}}
                    format={moment().format('DD.MM.YYYY')}
        />
      </Row>
        {this.state.ColType != 'appEndDate' && <Row>
      <Upload {...props}
              onChange={this.handleChange}>
        <Button size={'large'}>
          <Icon type="upload" /> Загрузить
        </Button>
      </Upload>
      </Row>}
    </Modal>);
  }
}


