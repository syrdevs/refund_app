import React, {Component} from 'react';
import {Card, Row, Tabs, Steps, Menu, Icon, Col, Layout, Progress, Button, Dropdown, Spin, Badge, Modal} from "antd";
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
import CounterAgentView from "../CounterAgent/CounterAgentView";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";

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
      buttonShow:true,
      ShowSign: false,
      rejectModal: {
        visible: false,
      },
      data:{},
      dataRoutePath:[]
    }
  }

  loadActData=(id)=>{
    this.props.dispatch({
      type: 'universal/getObjectByEntity',
      payload: {
        "entity": "documentToSign",
        "alias": "routes",
        "id": id //'this.props.location.query.id'
      },
    }).then(()=>{
      this.setState({
        data: this.props.universal.getObjectEntities["documentToSign"]
      });
    })
  };

  componentDidMount() {
    const { dispatch } = this.props;
    console.log(this.props.location.query.id);
    this.loadActData(this.props.location.query.id);
    this.loadDocRoutePath();
  }

  getIconStep=(value,index)=>{
    if(index===0){
      return <Icon><FontAwesomeIcon icon={faEnvelope}/></Icon>
    }
    if(value===0){
      return  <Icon type="clock-circle" />
    }
    if(value===2){
      return <Icon type="exclamation-circle" />
    }

    return <Icon><FontAwesomeIcon icon={faCheck}/></Icon>

  }

  stepDescr=(value,index)=>{
    if(index===0){
      return 'Опубликовал документ'
    }
    if(value===0){
      return 'На рассмотрении'
    }
    if(value===1){
      return 'Подписал'
    }
    if(value===2){
      return 'Отклонил';
    }


  }

  viewKeyModal = () => {
    this.setState({
        ShowSign: true,
      },
    );
  };

  loadDocRoutePath=()=>{
    fetch('/api/contract/getDocumentRoutePath', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      method: 'post',
      body: JSON.stringify({
        "entity": "contract",
        "id":this.props.location.query.id
      }),
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
            dataRoutePath: data,
          },
        );
      })
  };


  viewRejectModal = () => {
    this.setState({
      rejectModal: {
        visible: true,
      }
    })

  };


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
        rejectid={this.props.location.query.id}
        hide={() => {
          this.setState({
            rejectModal: {visible: false}
          })
        }}
        onOk={() => {

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

          fetch('/api/contract/uploadSignedDocument', {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            method: 'post',
            body: JSON.stringify({
              "entity": "contract",
              "alias": null,
              "id": this.props.location.query.id,
              "xml": e[0].xml
            }),
          })
            .then(data => {
              console.log(data);
              this.setState({
                ShowSign: false,
                 buttonShow:false
              }, () => {
                // router.push('/documents');
                Modal.info({
                  content: 'Документ подписан',
                });
                console.log(e);
              })
            })
            .catch(function(e) {
              Modal.error({
                content: 'some messages...some messages...',
              });
            });
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
                {this.state.buttonShow &&<Button type="primary" disabled={this.state.data?this.state.data.documentSigned===true:false} style={{marginLeft: '10px'}} onClick={() => {
                  this.viewKeyModal()
                }}>Подписать
                </Button>}
                {this.state.buttonShow && <Button type="danger" disabled={this.state.data?this.state.data.documentSigned===true:false} style={{marginLeft: '10px'}} onClick={() => {
                  this.viewRejectModal()
                }}>Отклонить
                  </Button>
                }

                <Card
                  style={{margin: '10px'}}
                  type="inner"
                  bodyStyle={{padding: 25}}
                  title={<div>Информация о документе</div>}
                >


                  <p style={{marginTop: '10px'}}><h3>{this.state.data ?this.state.data.descr : ''}</h3></p>
                  <p>Опубликовал: {this.state.data ?this.state.data.initiatorUser? this.state.data.initiatorUser.userName : '':''}</p>
                  <p>Тип документа: Договор</p>
                  <p>{this.state.data?this.state.data.statusDate?this.state.data.status.statusDate:'':''}</p>


                </Card>
                <Card
                  style={{margin: '10px'}}
                  type="inner"
                  bodyStyle={{padding: 25}}
                  title={<div>Документ № {this.state.data?this.state.data.number:''} от {this.state.data?this.state.data.documentDate:''}</div>}
                >
                  <CounterAgentView contractId={this.props.location.query.id}/>
                </Card>
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
                  {/*current={this.state.dataRoutePath}*/}
                  <Steps direction="vertical">
                    {this.state.dataRoutePath.map((item,index )=> <Step key={item.stepName} title={item.stepName} description={this.stepDescr(item.stepStatus,index)} status="finish" icon={this.getIconStep(item.stepStatus,index)} />)}
                  </Steps>
                  {/*<Steps direction="vertical">
                    <p>Сегодня</p>
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
                  </Steps>*/}
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

