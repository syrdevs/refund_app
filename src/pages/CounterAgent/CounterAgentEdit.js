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
  saveLoadingData: loading.effects['universal/saveobject'],
  getLoadingData: loading.effects['universal/getobject'],
}))
export default class CounterAgentEdit extends Component {
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
  };

  componentDidMount() {

    const { dispatch } = this.props;

    dispatch({
      type: 'universal/clearData',
      payload: {
        typeName: 'getObjectData',
        value: {},
      },
    });

    if (this.props.location.state) {
      dispatch({
        type: 'universal/getobject',
        payload: {
          'entity': 'contract',
          'alias': null,
          'id': this.props.location.state.data.id,
        },
      });
    }

    // if (this.props.location.state) {
    //
    // } else {
    //   reduxRouter.push('main');
    // }
  };

  sendForm = (data) => {

    const { dispatch } = this.props;

    let SpecFormData = this.state.eventManager.handleEvent('onSpecFormSubmit');

//todo check model
    let sendModel = {
      'entity': 'contract',
      'alias': null,
      'data': {
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
    if (data.period !== null && data.period.length > 0) {
      sendModel.data.dateBegin = moment(data.period[0]).format('DD.MM.YYYY');

      if (data.period[1])
        sendModel.data.dateEnd = moment(data.period[1]).format('DD.MM.YYYY');
    }

    if (this.props.location.state.data.id) {
      sendModel.data.id = this.props.location.state.data.id;
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

    if (data.parentContract) {
      sendModel.data.parentContract = {
        id: data.parentContract.id,
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

    if (data.documentDate)
      sendModel.data.documentDate = moment(data.documentDate).format('DD.MM.YYYY');

    if (data.contractAlternation) {
      sendModel.data.contractAlternation = {
        'id': data.contractAlternation,
      };
    }

    console.log(SpecFormData);

    // dispatch({
    //   type: 'universal/saveobject',
    //   payload: sendModel,
    // }).then((res) => {
    //   if (!this.props.universal.saveanswer.Message) {
    //     Modal.info({
    //       title: 'Информация',
    //       content: 'Изменения были успешно сохранены',
    //     });
    //     reduxRouter.push('/contract/contracts/table');
    //   }
    // });

  };

  setSpecData = (data) => {
    this.setState({
      SpecPageForceRendered: true,
      SpecData: data,
    });
  };

  render = () => {

    const { dispatch } = this.props;

    return (
      <Spin spinning={this.props.getLoadingData}>
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
              htmlType="submit">Сохранить</Button>, <Button
              style={{ marginLeft: '5px' }}
              onClick={() => {
                const { dispatch } = this.props;
                dispatch({
                  type: 'universal/clearData',
                  payload: {
                    typeName: 'getObjectData',
                    value: {},
                  },
                });

                reduxRouter.push('/contract/contracts/table');
              }}>Закрыть</Button>]}
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
                    setSpecData={this.setSpecData}
                    form={this.props.form}
                    formData={this.props.universal.getObjectData}
                    formItemLayout={formItemLayout}/>
                </TabPane>
                {/*<TabPane tab="Род-кий договор" key="rod_dogovor">*/}
                {/*<DogovorPage/>*/}
                {/*</TabPane>*/}
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
                    gridData={this.props.universal.getObjectData}
                    selectedData={this.props.location.state}/>
                </TabPane>
              </Tabs>
            </Row>
          </Card>
        </Form>
      </Spin>);
  };
}
