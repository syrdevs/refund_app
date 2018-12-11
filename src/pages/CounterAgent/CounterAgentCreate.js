import React, { Component } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card, Modal } from 'antd';
import { ContragentsPage, GraphicPage, SpecPage, InfoPage, DogovorPage } from './TabPages';
import reduxRouter from 'umi/router';
import styles from './CounterAgent.less';
import moment from 'moment';

const TabPane = Tabs.TabPane;
const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

@Form.create()
export default class CounterAgentCreate extends Component {
  state = {};

  componentDidMount() {
    // if (this.props.location.state) {
    //
    // } else {
    //   reduxRouter.push('main');
    // }
  };

  sendForm = (data) => {
    console.log(moment(data.documentDate).format('DD.MM.YYYY'));
  };

  render = () => {

    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();

          this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
              return;
            }

            this.sendForm(fieldsValue);
          });

        }}
        layout="horizontal" hideRequiredMark>
        <Card
          headStyle={{ padding: 0 }}
          title={''}
          className={styles.headPanel}
          extra={[<Button
            htmlType="submit">Сохранить</Button>]}
          bordered={false}
          bodyStyle={{ padding: 0 }}>
          <Row style={{ marginTop: '5px' }}>
            <Tabs
              tabBarStyle={{ textAlign: 'left' }}
              type={'card'}
              className={styles.stepFormText}
              defaultActiveKey="main"
              tabPosition={'left'}>
              <TabPane tab="Титульная часть" key="main">
                <InfoPage {...this.props} formItemLayout={formItemLayout}/>
              </TabPane>
              {/*<TabPane tab="Род-кий договор" key="rod_dogovor">*/}
              {/*<DogovorPage/>*/}
              {/*</TabPane>*/}
              <TabPane tab="Спецификация" key="specification">
                <SpecPage {...this.props}/>
              </TabPane>
              <TabPane tab="Контрагенты" key="counteragents">
                <ContragentsPage selectedData={this.props.location.state} {...this.props}/>
              </TabPane>
            </Tabs>
          </Row>
        </Card>
      </Form>);
  };
}
