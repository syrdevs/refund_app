import React, {Component} from 'react';
import {Card, Row, Tabs, Steps, Menu, Icon, Col, Layout, Progress, Button, Dropdown, Spin, Badge} from "antd";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {formatMessage, FormattedMessage} from 'umi/locale';
import {Animated} from 'react-animated-css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import GridFilter from '@/components/GridFilter';
import SmartGridView from '@/components/SmartGridView';
import {connect} from "dva";
import saveAs from "file-saver";
import moment from "moment";
import router from "umi/router";
import styles from "../../components/SmartGridView/index.less";
import SignModal from "../../components/SignModal";
import ShowAct from '../Acts/ShowAct';
import DogovorModal from "../CounterAgent/Modals/DogovorModal";
import RejectModal from "./RejectModal";

const Step = Steps.Step;
const TabPane = Tabs.TabPane;

class ViewDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowSign: false,
      rejectModal: {
        visible: false,
      }
    }
  }

  componentDidMount() {
  }

  viewKeyModal = () => {
    this.setState({
        ShowSign: true,
      },
    );
  };


  viewRejectModal = () => {
    this.setState({
      rejectModal: {
        visible: true,
      }
    })

  }


  callback = (key) => {
  };


  render() {
    const smart_grid_controls_right = {
      display: 'inline-block',
      float: 'right'
    };
    const CardHeight = {height: 'auto', marginBottom: '10px'};
    return (<PageHeaderWrapper title={formatMessage({id: 'app.module.documents.title.view'})}>
      {this.state.rejectModal.visible && <RejectModal
        hide={() => {
          this.setState({
            rejectModal: {visible: false}
          })
        }}
        onOk={() => {
            console.log("ok")
        }}
        onCancel={() => {
          this.setState({
            rejectModal: {visible: false}
          })
        }}
        />}

      {this.state.ShowSign &&
      <SignModal
        onCancel={() => {
          this.setState({
            ShowSign: false
          })
        }}
        visible={this.state.ShowSign}
        getKey={(e) => {
          this.setState({
            ShowSign: false
          }, () => {

            console.log(e);
          })
        }}
      />}
      <Card style={{borderRadius: '5px', marginBottom: '10px'}} bodyStyle={{padding: 0}} bordered={true}>
        <Row>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Документ" key="1">
              <div style={CardHeight}>
                {/*<Card*/}
                {/*style={{margin:'10px'}}*/}
                {/*type="inner"*/}
                {/*bodyStyle={{padding: 25}}*/}
                {/*// title={<div>Информация о документе</div>}*/}
                {/*>*/}
                <Button style={{marginLeft: '10px'}} onClick={() => {
                  this.viewKeyModal()
                }}>Подписать
                </Button>
                <Button style={{marginLeft: '10px'}} onClick={() => {
                  this.viewRejectModal()
                }}>Отклонить
                </Button>
                <Card
                  style={{margin: '10px'}}
                  type="inner"
                  bodyStyle={{padding: 25}}
                  title={<div>Информация о документе</div>}
                >


                  <p style={{marginTop: '10px'}}><h3>Заголовок письма</h3></p>
                  <p>Отправитель: Султанов Усен Ибраевич</p>
                  <p>Тип документа: Контрагент</p>
                  <p>сегодня, 16:40</p>


                </Card>
                <Card
                  style={{margin: '10px'}}
                  type="inner"
                  bodyStyle={{padding: 25}}
                  title={<div>Документ №135</div>}
                >
                  <ShowAct
                    actid='eceb5e9c-38d2-4246-b101-1c08288c3c87'
                  /></Card>
                {/*</Card>*/}
              </div>
            </TabPane>
            <TabPane tab="Ход исполнения" key="2">
              <div style={CardHeight}>
                <Card
                  style={{margin: '10px'}}
                  type="inner"
                  bodyStyle={{padding: 25}}
                  title={'Ход работы'}
                >
                  <Steps direction="vertical">
                    {/*<p>Сегодня</p>*/}
                    <Step status="finish" title={<Row>
                      <Col sm={24} md={24} xs={24}>
                        <div>
                          Султанов Усен Ибраевич
                        </div>
                      </Col></Row>} description="Отправил документ на подписание 16.12.2018 10:26"
                          icon={<Icon type="mail"/>}/>
                    <Step status="finish" title="Дайрабаев Сакен Сейдуллаевич"
                          description="Подписал документ 16.12.2018 12:15"/>
                    <Step status="finish" title="Куаныш Айдын" description="Подписал документ 16.12.2018 14:26"/>
                    <Step status="finish" title="Ахметов Нурбек Саматович"
                          description="Подписал документ 16.12.2018 16:48"/>
                  </Steps>
                </Card>
              </div>
            </TabPane>
          </Tabs>

        </Row>
      </Card>
    </PageHeaderWrapper>)


  }


}

export default ViewDocument;

