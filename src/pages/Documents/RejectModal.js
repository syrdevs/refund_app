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

  }

  render = () => {
    return (<Modal
      title="Отклонить"
      visible={true}
      onOk={()=>{this.props.onCancel()}}
      onCancel={()=>{this.props.onCancel()}}
    >
      <Form layout="horizontal" hideRequiredMark>
        {/*<Card style={{borderRadius: '5px', marginBottom: '10px'}} bodyStyle={{padding: 0}} bordered={true}>*/}
          {/*<Row>*/}
            <Form.Item {...formItemLayout} label="Причина откланения:">
              <Input id="storagePassword"/>
            </Form.Item>
          {/*</Row>*/}
        {/*</Card>*/}
      </Form>
    </Modal>);
  };


}
