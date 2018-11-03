import React, { Component } from 'react';
import { Modal, Tabs, Table, Input, DatePicker, Card, Form, Icon } from 'antd';
import moment from 'moment';

const InputGroup = Input.Group;
const TabPane = Tabs.TabPane;

const FormItem = Form.Item;

export default class ModalChangePassword extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }
  componentWillReceiveProps(props, prevProps) {
    if (props != null) {
      this.setState({
        isVisible: props.visible,
        pass1:'',
        pass2:'',
        pass3:'',
        showhide1: 'none',
        showhide2: 'none',
        showhide3: 'none'
      });
    }
  }

  handleOk = () => {
   if (this.state.pass1 === '' && this.state.pass1 === '' && this.state.pass1 === '') {
     if (this.state.pass1 === '')
       this.setState({
         showhide1: 'block'
       })
     if (this.state.pass2 === '')
       this.setState({
         showhide2: 'block'
       })
     if (this.state.pass3 === '')
       this.setState({
         showhide3: 'block'
       })
   }
    else {
      this.setState({ isVisible: false });
    }
  };

  inputchange(e){
    console.log(e);
    console.log("asdasdasd");
  //  this.setState({ [e.target.id]: e.target.value });
  }
  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const spantitle = {fontSize:"13px", fontWeight:"bold"};
    const dateFormat = 'DD.MM.YYYY';
    const { isVisible } = this.state;
    const showHide1  = {display:this.state.showhide1, color: 'red'};
    const showHide2  = {display:this.state.showhide2, color: 'red'};
    const showHide3  = {display:this.state.showhide3, color: 'red'};
    return (<Modal
      title="Сменить пароля"
      onOk={(e) => {
        this.handleOk(e);
      }}
      onCancel={(e) => {
        this.props.resetshow(e);
      }}
      width={500}
      visible={isVisible}>
      <Form onSubmit={this.handleSubmit} className="login-form">
          <div><span style={spantitle}>Текущий пароль:</span>
            <Input name="pass1" onChange={(e) =>{ console.log(e); this.setState({[e.target.name]: e.target.value})}} value={this.state.pass1} id={'pass1'} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
            <div style={showHide1}>Это поле обязательное к заполнению</div>
          </div>
          <div><span style={spantitle}>Пароль:</span>
            <Input value={this.state.pass2}  id={'pass1'} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
            <div style={showHide2}>Это поле обязательное к заполнению</div>
          </div>
          <div><span style={spantitle}>Пароль(повтор):</span>
            <Input value={this.state.pass3}  id={'pass1'} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
            <div style={showHide3}>Это поле обязательное к заполнению</div>
          </div>
      </Form>
    </Modal>);
  }
}


