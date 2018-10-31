import React, { Component } from 'react';
import { Card, Label, Row, Col, Input, Button, Table, Tabs, Spin } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva/index';
const TabPane = Tabs.TabPane;

@connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects['universal/optionsData'],
}))
class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      columns: [],
      datasource: [
        {
          groupNameRu: "МТ101",
          groupNameKz: null,
          groupOptionList:
            [{
              "id": "1",
              "optionName": "NAME",
              "optionValue": "НАО \"Фонд социального медицинского страхования\"",
              "optionType": "string",
              "description": "NAME"
            }, {
              "id": "10",
              "optionName": "SENDER_IDN",
              "optionValue": "160440007161",
              "optionType": "string",
              "description": "SENDER_IDN"
            }, {
              "id": "11",
              "optionName": "SENDER_IRS",
              "optionValue": "1",
              "optionType": "string",
              "description": "SENDER_IRS"
            }, {
              "id": "12",
              "optionName": "SENDER_SECO",
              "optionValue": "1",
              "optionType": "string",
              "description": "SENDER_SECO"
            }, {
              "id": "13",
              "optionName": "ASSIGN",
              "optionValue": "Возврат излишне (ошибочно) перечиcленных отчислений/взносов/пени ОСМС",
              "optionType": "string",
              "description": "ASSIGN"
            }, {
              "id": "14",
              "optionName": "{1}",
              "optionValue": "{1:F01KRKZKX0000000001000001}",
              "optionType": "string",
              "description": "{1}"
            }, {
              "id": "15",
              "optionName": "{2}",
              "optionValue": "{2:I102SGROSS0000003003}",
              "optionType": "string",
              "description": "{2}"
            }, {
              "id": "16",
              "optionName": "{4}",
              "optionValue": "{4:",
              "optionType": "string",
              "description": "{4}"
            }, {
              "id": "17",
              "optionName": ":50:",
              "optionValue": "/D/KZ33125KZT1001313313",
              "optionType": "string",
              "description": ":50:"
            }, {
              "id": "18",
              "optionName": ":52B:",
              "optionValue": "NBRKKZKX",
              "optionType": "string",
              "description": ":52B:"
            }, {
              "id": "19",
              "optionName": ":57B:",
              "optionValue": "GCVPKZ2A",
              "optionType": "string",
              "description": ":57B:"
            }, {
              "id": "2",
              "optionName": "IDN",
              "optionValue": "160940025485",
              "optionType": "string",
              "description": "IDN"
            }, {
              "id": "20",
              "optionName": ":59:",
              "optionValue": "KZ92009MEDS368609103",
              "optionType": "string",
              "description": ":59:"
            }, {
              "id": "21",
              "optionName": ":20:",
              "optionValue": "REFERENCE",
              "optionType": "string",
              "description": ":20:"
            }, {
              "id": "3",
              "optionName": "CHIEF",
              "optionValue": "Махашева Т.М.",
              "optionType": "string",
              "description": "CHIEF"
            }, {
              "id": "4",
              "optionName": "MAINBK",
              "optionValue": "Гродер Г.И.",
              "optionType": "string",
              "description": "MAINBK"
            }, {
              "id": "5",
              "optionName": "IRS",
              "optionValue": "1",
              "optionType": "string",
              "description": "IRS"
            }, {
              "id": "6",
              "optionName": "SECO",
              "optionValue": "1",
              "optionType": "string",
              "description": "SECO"
            }, {
              "id": "7",
              "optionName": "VO",
              "optionValue": "01",
              "optionType": "string",
              "description": "VO"
            }, {
              "id": "8",
              "optionName": "SEND",
              "optionValue": "07",
              "optionType": "string",
              "description": "SEND"
            }, {
              "id": "9",
              "optionName": "SENDER_NAME",
              "optionValue": "НАО \"Государственная корпорация \"Правительство для граждан\"",
              "optionType": "string",
              "description": "SENDER_NAME"
            }]
        },
        {
          groupNameRu: "МТ102",
          groupNameKz: null,
          groupOptionList:
            [{
              "id": "1",
              "optionName": "NAME",
              "optionValue": "НАО \"Фонд социального медицинского страхования\"",
              "optionType": "string",
              "description": "NAME"
            }, {
              "id": "10",
              "optionName": "SENDER_IDN",
              "optionValue": "160440007161",
              "optionType": "string",
              "description": "SENDER_IDN"
            }, {
              "id": "11",
              "optionName": "SENDER_IRS",
              "optionValue": "1",
              "optionType": "string",
              "description": "SENDER_IRS"
            }, {
              "id": "12",
              "optionName": "SENDER_SECO",
              "optionValue": "1",
              "optionType": "string",
              "description": "SENDER_SECO"
            }, {
              "id": "13",
              "optionName": "ASSIGN",
              "optionValue": "Возврат излишне (ошибочно) перечиcленных отчислений/взносов/пени ОСМС",
              "optionType": "string",
              "description": "ASSIGN"
            }, {
              "id": "14",
              "optionName": "{1}",
              "optionValue": "{1:F01KRKZKX0000000001000001}",
              "optionType": "string",
              "description": "{1}"
            }, {
              "id": "15",
              "optionName": "{2}",
              "optionValue": "{2:I102SGROSS0000003003}",
              "optionType": "string",
              "description": "{2}"
            }, {
              "id": "16",
              "optionName": "{4}",
              "optionValue": "{4:",
              "optionType": "string",
              "description": "{4}"
            }, {
              "id": "17",
              "optionName": ":50:",
              "optionValue": "/D/KZ33125KZT1001313313",
              "optionType": "string",
              "description": ":50:"
            }, {
              "id": "18",
              "optionName": ":52B:",
              "optionValue": "NBRKKZKX",
              "optionType": "string",
              "description": ":52B:"
            }, {
              "id": "19",
              "optionName": ":57B:",
              "optionValue": "GCVPKZ2A",
              "optionType": "string",
              "description": ":57B:"
            }, {
              "id": "2",
              "optionName": "IDN",
              "optionValue": "160940025485",
              "optionType": "string",
              "description": "IDN"
            }, {
              "id": "20",
              "optionName": ":59:",
              "optionValue": "KZ92009MEDS368609103",
              "optionType": "string",
              "description": ":59:"
            }, {
              "id": "21",
              "optionName": ":20:",
              "optionValue": "REFERENCE",
              "optionType": "string",
              "description": ":20:"
            }, {
              "id": "3",
              "optionName": "CHIEF",
              "optionValue": "Махашева Т.М.",
              "optionType": "string",
              "description": "CHIEF"
            }, {
              "id": "4",
              "optionName": "MAINBK",
              "optionValue": "Гродер Г.И.",
              "optionType": "string",
              "description": "MAINBK"
            }, {
              "id": "5",
              "optionName": "IRS",
              "optionValue": "1",
              "optionType": "string",
              "description": "IRS"
            }, {
              "id": "6",
              "optionName": "SECO",
              "optionValue": "1",
              "optionType": "string",
              "description": "SECO"
            }, {
              "id": "7",
              "optionName": "VO",
              "optionValue": "01",
              "optionType": "string",
              "description": "VO"
            }, {
              "id": "8",
              "optionName": "SEND",
              "optionValue": "07",
              "optionType": "string",
              "description": "SEND"
            }, {
              "id": "9",
              "optionName": "SENDER_NAME",
              "optionValue": "НАО \"Государственная корпорация \"Правительство для граждан\"",
              "optionType": "string",
              "description": "SENDER_NAME"
            }]
        }
      ]
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/optionsData',
      payload: {},
    });
  }



  fieldOnChange = (value,index, childindex) => {
      const datasource = this.props.universal.options;
      datasource[index].groupOptionList[childindex].optionValue = value;
          const { dispatch } = this.props;
          dispatch({
            type: 'universal/optionsDatachange',
            payload: datasource,
          });
  };
  saveChanges = () => {
    console.log(this.state.datasource);
  }


  render() {
    const { datasource } = this.props.universal.options;
    return (
      <PageHeaderWrapper title="Настройки" children={'Serik'}>
        <Spin tip="Загрузка..." spinning={this.props.loadingData}>
        <Card style={{borderRadius: '5px', marginBottom:'10px'}} bodyStyle={{ padding: 0 }} bordered={true}>
          <Row>
            <Button
              type="primary"
              style={{margin: '5px 0px 0px 5px'}}
              onClick={() => {this.saveChanges()}}>
              Сохранить
            </Button>
          </Row>
          <Row>
            <Tabs defaultActiveKey="0">
              {this.props.universal.options.map((tabItem, index) => {
                return (
                <TabPane tab={tabItem.groupNameRu} key={index}>
                  {tabItem.groupOptionList
                    .map((inputs, childindex) => {
                      return (
                        <Row style={{ margin: '0px 10px 10px 10px'}} key={index+""+childindex}>
                          <Col span={24} key={index+""+childindex}>
                            <Input addonBefore={inputs.optionName} key={index+""+childindex} defaultValue={inputs.optionValue} onChange={(e) => {this.fieldOnChange(e.target.value,index,childindex)}}/>
                          </Col>
                        </Row>
                      )
                    })
                  }
                </TabPane>);
              })}
            </Tabs>
          </Row>
        </Card>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

export default Options;
