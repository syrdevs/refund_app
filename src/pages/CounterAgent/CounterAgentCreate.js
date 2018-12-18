import React, { Component } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card, Modal, Spin } from 'antd';
import { ContragentsPage, GraphicPage, SpecPage, InfoPage, DogovorPage } from './TabPages';
import reduxRouter from 'umi/router';
import styles from './CounterAgent.less';
import moment from 'moment';
import { connect } from 'dva/index';
import error from '../Exception/models/error';
import AttachmentPage from './TabPages/AttachmentPage';

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
  loadingData: loading.effects['universal/getCounterAgentData'],
}))
export default class CounterAgentCreate extends Component {
  state = {

    SpecData: {},
    SpecPageForceRendered: false,

    eventManager: {
      _events: {},
      handleEvent: (evName) => {
        if (!this.state.eventManager._events[evName]) return [];//throw new Error('eventName not registered');

        return this.state.eventManager._events[evName]();
      },
      subscribe: (evName, fn) => {
        this.state.eventManager._events[evName] = fn;
      },
    },
    specifyData: [],
  };

  getCounterAgentById = (id) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'universal/getCounterAgentData',
      payload: {
        'contragentId': id,
      },
    }).then(() => {
      this.props.form.resetFields();
    });

  };

  componentDidMount() {

    const { dispatch } = this.props;

    if (this.props.location.state) {
      this.getCounterAgentById(this.props.location.state.data.id);
    } else {
      reduxRouter.push('main');
    }

  };

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'universal/clearData',
      payload: {
        typeName: 'counterAgentData',
        value: {},
      },
    });
  }

  sendForm = (data) => {

    const { dispatch } = this.props;

    let SpecFormData = this.state.eventManager.handleEvent('onSpecFormSubmit');

    //todo check model
    let sendModel = {
      'entity': 'contract',
      'alias': null,
      'data': {
        'contractParties': this.props.universal.counterAgentData.contractParties,
        'contractItems': SpecFormData,
      },
    };

    if (data.period !== null && data.period.length > 0) {
      sendModel.data.dateBegin = moment(data.period[0]).format('DD.MM.YYYY');

      if (data.period[1])
        sendModel.data.dateEnd = moment(data.period[1]).format('DD.MM.YYYY');
    }

    /*
    *  'number': data.number,
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
    * */

    if (data.number) {
      sendModel.data.number = data.number;
    }

    if (data.parentContract.value) {
      sendModel.data.parentContract = {
        id: data.parentContract.value.id,
      };
    }

    if (data.divisions) {
      sendModel.data.division = {
        id: data.divisions,
      };
    }

    if (data.periodYear) {
      sendModel.data.periodYear = {
        'id': data.periodYear,
      };
    }

    if (data.contractType) {
      sendModel.data.contractType = {
        'id': data.contractType,
      };
    }

    if (data.descr) {
      sendModel.data.descr = data.descr;
    }

    if (data.documentDate)
      sendModel.data.documentDate = moment(data.documentDate).format('DD.MM.YYYY');

    if (data.contractAlternation) {
      sendModel.data.contractAlternation = {
        'id': data.contractAlternation,
      };
    }

    dispatch({
      type: 'universal/saveobject',
      payload: sendModel,
    }).then((res) => {
      if (!this.props.universal.saveanswer.Message) {
        // Modal.info({
        //   title: 'Информация',
        //   content: 'Договор успешно создан',
        // });
        reduxRouter.push('/contract/contracts/table');
      }
    });

  };

  setSpecData = (data) => {
    this.setState({
      SpecPageForceRendered: true,
      SpecData: data,
    });
  };

  render = () => {


    return (
      <Spin spinning={this.props.loadingData}>
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
              key={'save_btn'}
              htmlType="submit">Сохранить</Button>,

              <Button
                key={'delete_btn'}
                style={{ marginLeft: '5px' }}
                onClick={() => {

                  const { dispatch } = this.props;

                  dispatch({
                    type: 'universal/clearData',
                    payload: {
                      typeName: 'getObjectData',
                      value: {},
                    },
                  }).then(() => {
                    reduxRouter.push('/contract/contracts/table');
                  });
                }}>Закрыть</Button>,
              <Button
                key={'clear_btn'}
                style={{ marginLeft: '5px' }}
                onClick={() => {
                  this.props.form.resetFields();
                }}>Очистить</Button>]}
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
                  <InfoPage
                    form={this.props.form}
                    formData={{
                      ...this.props.universal.counterAgentData,
                      contract: {
                        contragent: this.props.location.state.data,
                      },
                    }}
                    setSpecData={this.setSpecData}
                    formItemLayout={formItemLayout}
                    getCounterAgentById={this.getCounterAgentById}
                  />
                </TabPane>
                <TabPane tab="Спецификация" key="specification">
                  {Object.keys(this.state.SpecData).length > 0 ?
                    <SpecPage
                      setForceRender={() => {
                        this.setState({
                          SpecPageForceRendered: false,
                        });
                      }}
                      forceRender={this.state.SpecPageForceRendered}
                      eventManager={this.state.eventManager}
                      form={this.props.form}
                      gridData={this.state.SpecData}/>
                    : <SpecPage
                      eventManager={this.state.eventManager}
                      form={this.props.form}
                      gridData={this.props.universal.getObjectData}/>}
                </TabPane>
                <TabPane tab="Контрагенты" key="counteragents">
                  <ContragentsPage
                    gridData={this.props.universal.counterAgentData}
                    selectedData={this.props.location.state}/>
                </TabPane>
              </Tabs>
            </Row>
          </Card>
        </Form>
      </Spin>);
  };
}
