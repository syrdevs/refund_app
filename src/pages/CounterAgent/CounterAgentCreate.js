import React, { Component } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card, Modal, Spin } from 'antd';
import { ContragentsPage, GraphicPage, SpecPage, InfoPage, DogovorPage } from './TabPages';
import reduxRouter from 'umi/router';
import styles from './CounterAgent.less';
import moment from 'moment';
import { connect } from 'dva/index';

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
@connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects['universal/saveobject'],
}))
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

    const { dispatch } = this.props;


    let sendModel = {
      'entity': 'contract',
      'alias': null,
      'data': {
        'dateBegin': moment(data.period[0]).format('DD.MM.YYYY'),
        'dateEnd': moment(data.period[1]).format('DD.MM.YYYY'),
        'number': data.number,
        'documentDate': moment(data.documentDate).format('DD.MM.YYYY'),
        'contractAlternation': {
          'id': data.contractAlternation,
        },
        'parentContract': {
          'id': data.parentContract.value.id,
        },
        'division': {
          'id': data.divisions,
        },
        'periodYear': {
          'id': data.periodYear,
        },
        'contractType': {
          'id': data.contractType,
        },
        'contractPartys': [
          {
            'contractRole': {
              'id': '4c5c28e5-afd5-42bc-b8a4-209cc149687a',
            },
            'organization': {
              'id': '1b0e836c-3f9c-4438-8ef8-a4d8018664ea',
            },
          },
          {
            'contractRole': {
              'id': '59425c7f-022e-4606-a895-085613e3990a',
            },
            'organization': {
              'id': '73b39727-9ac0-4d67-9120-9a2d743d9a35',
            },
          },
        ],
        'contractItems': [
          {
            'activity': {
              'id': '32576777-c4a9-41c9-86c4-393bb29072ef',
            },
          },
        ],
      },
    };

    dispatch({
      type: 'universal/saveobject',
      payload: sendModel,
    });

    history.back();
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
            <Spin spinning={this.props.loadingData !== undefined}>
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
            </Spin>
          </Row>
        </Card>
      </Form>);
  };
}
