import React, { Component } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Modal, Row, Col, Tabs, Card, Spin } from 'antd';


const formItemLayout = {
  // labelCol: {
  //   span: 10,
  // },
  // wrapperCol: {
  //   span: 14,
  // },
};
export default class RejectModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      val:''
    }
  }

  render = () => {
    return (<Modal
      title="Отклонить"
      visible={true}
      onOk={()=>{
        /*{
          "entity": "proposal",
          "id":"94c17de3-c519-45f2-829e-f876ada733e1",
          "comment":"Документ не верен!"
        }*/
        //rejectid

        console.log(this.state.val);
        fetch('/api/contract/rejectDocument', {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          method: 'post',
          body: JSON.stringify({
            "entity": "contract",
            "id":this.props.rejectid,
            "comment":"Документ не верен!"
          }),
        })
          .then(response => response.json())
          .then(data => {
            this.props.onCancel();
          })






      }}
      onCancel={()=>{this.props.onCancel()}}
    >
      <Form layout="horizontal" hideRequiredMark>
        {/*<Card style={{borderRadius: '5px', marginBottom: '10px'}} bodyStyle={{padding: 0}} bordered={true}>*/}
          {/*<Row>*/}
            <Form.Item {...formItemLayout} label="Причина откланения:">
              <Input id="storagePassword" onChange={(e)=>{
                this.setState({
                  val: e.target.value
                })
              }}/>
            </Form.Item>
          {/*</Row>*/}
        {/*</Card>*/}
      </Form>
    </Modal>);
  };


}
