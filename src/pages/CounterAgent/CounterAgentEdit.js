import React, { Component } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  DatePicker,
  Table,
  Row,
  Col,
  Tabs,
  Card,
  Modal,
  Spin,
} from 'antd';
import { ContragentsPage, GraphicPage, SpecPage, InfoPage, DogovorPage, AttachmentPage } from './TabPages';
import reduxRouter from 'umi/router';
import styles from './CounterAgent.less';
import moment from 'moment';
import { connect } from 'dva/index';
import DropDownAction from '@/components/DropDownAction/';

const TabPane = Tabs.TabPane;
const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};
/*
* <Button
                key={'clear_btn'}
                style={{ marginLeft: '5px' }}
                onClick={() => {
                  // const { dispatch } = this.props;
                  // dispatch({
                  //   type: 'universal/clearData',
                  //   payload: {
                  //     typeName: 'getObjectData',
                  //     value: {},
                  //   },
                  // }).then(() => {
                  //
                  // });
                  //this.props.form.resetFields();

                }}>Очистить</Button>,
*
* */


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
  getContractData = () => {
    const { dispatch } = this.props;

    if (this.props.location.state) {
      dispatch({
        type: 'universal/getobject',
        payload: {
          'entity': 'contract',
          'alias': null,
          //todo get object
          'id': this.props.location.state.data.id,
        },
      });
    } else {
      reduxRouter.push('main');
    }
  };

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'universal/clearData',
      payload: {
        typeName: 'getObjectData',
        value: {},
      },
    });

    dispatch({
      type: 'universal/clearData',
      payload: {
        typeName: 'counterAgentData',
        value: {},
      },
    });
  }

  componentDidMount() {

    const { dispatch } = this.props;

    dispatch({
      type: 'universal/clearData',
      payload: {
        typeName: 'getObjectData',
        value: {},
      },
    });

    dispatch({
      type: 'universal/clearData',
      payload: {
        typeName: 'getCounterAgentData',
        value: {},
      },
    });

    this.getContractData();

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
      'data': {},
    };

    if (SpecFormData.length > 0) {
      sendModel.contractItems = SpecFormData;
    }

    if (this.props.universal.getObjectData && this.props.universal.getObjectData.contractParties) {

      sendModel.data.contractParties =
        this.props.universal.getObjectData.contractParties.map((contractParty) => {
          return {
            contractRole: {
              id: contractParty.contractRole.id,
            },
            organization: {
              id: contractParty.organization.id,
            },
          };
        });

    }

    if (Object.keys(this.props.universal.counterAgentData).length > 0 && this.props.universal.counterAgentData.hasOwnProperty("contractParties")) {

      sendModel.data.contractParties =
        this.props.universal.counterAgentData.contractParties.map((contractParty) => {
          return {
            contractRole: {
              id: contractParty.contractRole.id,
            },
            organization: {
              id: contractParty.organization.id,
            },
          };
        });

    }


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

    if (data.parentContract.value) {
      sendModel.data.parentContract = {
        id: data.parentContract.value.id,
      };
    }

    if (data.descr) {
      sendModel.data.descr = data.descr;
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


    dispatch({
      type: 'universal/saveobject',
      payload: sendModel,
    }).then((res) => {
      if (!this.props.universal.saveanswer.Message) {
        Modal.info({
          title: 'Информация',
          content: 'Сведения сохранены',
        });
        // reduxRouter.push('/contract/contracts/table');
      }
    });

  };

  getCounterAgentById = (id, year) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'universal/getCounterAgentData',
      payload: {
        'contragentId': id,
        'year': year,
      },
    }).then(() => {
      this.props.form.resetFields();
    });

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
                  });

                  dispatch({
                    type: 'universal/clearData',
                    payload: {
                      typeName: 'counterAgentData',
                      value: {},
                    },
                  });

                  reduxRouter.push('/contract/contracts/table');
                }}>Закрыть</Button>,

              <DropDownAction
                contractId={this.props.location.state.data.id}
                entity={'contract'}
                type={2}/>,
            ]}
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
                    formData={Object.keys(this.props.universal.counterAgentData).length > 0 ? this.props.universal.counterAgentData : this.props.universal.getObjectData}
                    formItemLayout={formItemLayout}
                    getCounterAgentById={this.getCounterAgentById}
                  />
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
                      gridData={Object.keys(this.props.universal.counterAgentData).length > 0 ? this.props.universal.counterAgentData : this.props.universal.getObjectData}/>}


                </TabPane>
                <TabPane tab="Контрагенты" key="counteragents">
                  <ContragentsPage
                    gridData={Object.keys(this.props.universal.counterAgentData).length > 0 ? this.props.universal.counterAgentData : this.props.universal.getObjectData}
                    selectedData={this.props.location.state}/>
                </TabPane>
                <TabPane tab={'Приложения'} key="attachments">
                  <AttachmentPage
                    getContractData={this.getContractData}
                    filesData={this.props.universal.getObjectData}
                    contractId={this.props.location.state.data.id}
                    formItemLayout={formItemLayout}
                  />
                </TabPane>
              </Tabs>
            </Row>
          </Card>
        </Form>
      </Spin>);
  };
}
