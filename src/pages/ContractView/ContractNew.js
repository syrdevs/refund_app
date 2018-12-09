import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Acts, Contracts, Requests, ContractForm } from './TabPages';

const TabPane = Tabs.TabPane;
const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

export default class ContractNew extends Component {
  state = {
    tabs:{
      ContractForm:{

      }
    }
  };

  render() {

    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Информация о договоре" key="1">
          <Row style={{ marginTop: '20px' }}>
            <Form layout="horizontal" hideRequiredMark>
              <Tabs
                className={styles.stepFormText}
                defaultActiveKey="form"
                tabPosition={'left'}>
                <TabPane tab="Форма" key="form">
                  <ContractForm  formItemLayout={formItemLayout}/>
                </TabPane>
                <TabPane tab="Договора" key="contracts">
                  {/*<Contracts/>*/}
                </TabPane>
                <TabPane tab="Акты" key="act">
                  {/*<Acts/>*/}
                </TabPane>
                <TabPane tab="Заявки" key="requests">
                  {/*<Requests/>*/}
                </TabPane>
              </Tabs>
              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: {
                    span: formItemLayout.wrapperCol.span,
                    offset: formItemLayout.labelCol.span,
                  },
                }}
                label=""
              >
                <Button type="primary">
                  Сохранить
                </Button>
              </Form.Item>
            </Form>
            <Divider style={{ margin: '40px 0 24px' }}/>
          </Row>
        </TabPane>
      </Tabs>
    );
  }
}
