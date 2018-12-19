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


@connect(({ universal, act, loading }) => ({
  universal,
  act,
  // loadinggetattachmentType: loading.effects['universal/getattachmentType'] && loading.effects['universal/getmedicalType'] && loading.effects['universal/getorganization'] & loading.effects['universal/getperiodSection'] && loading.effects['universal/getperiodYear']),
  loadingdeleteObject: loading.effects['universal/deleteObject'],
  loadingcreateActForContract: loading.effects['universal/createActForContract'],
  loadinggetobject: loading.effects['universal/getobject'],
  loadingsave: loading.effects['universal/saveobject'],
}))
class ViewDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowSign: false,
      rejectModal: {
        visible: false,
      },
      data:{},
    }
  }

  loadActData=(id)=>{
    this.props.dispatch({
      type: 'universal/getobject',
      payload: {
        "entity": "contract",
        "alias": null,
        "id": id //'this.props.location.query.id'
      },
    }).then(()=>{
      this.setState({
        data: this.props.universal.getObjectData
      });
      console.log(this.state.data)
    })
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.loadActData(this.props.location.query.id)

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
    // console.log(this.props.location.state ? this.props.location.state.data : null);
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
            router.push('/documents');
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
                  <p>Отправитель: {this.state.data.initiatorUser?this.state.data.initiatorUser:''}</p>
                  <p>Тип документа: {this.state.data.documentType?this.state.data.documentType.entDesc:''}</p>
                  <p>{this.state.data.entryDateTime?this.state.data.entryDateTime:''}</p>


                </Card>
                <Card
                  style={{margin: '10px'}}
                  type="inner"
                  bodyStyle={{padding: 25}}
                  title={<div>Документ № {this.state.data?this.state.data.number:''} от {this.state.data?this.state.data.documentDate:''}</div>}
                >
                  {this.props.location.query.type === 'act' && <ShowAct
                    actid={this.props.location.query.id}
                  />}</Card>
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

