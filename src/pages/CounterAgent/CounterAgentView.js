import React, { Component, Provider } from 'react';
import {
  Card,
  Button,
  Label,
  Row,
  Form,
  Tabs,
  Spin,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { ContragentsPage, SpecPage, InfoPage, DogovorPage } from './TabPagesView';
import styles from './CounterAgent.less';
import { connect } from 'dva/index';
import AttachmentPage from './TabPagesView/AttachmentPage';

const TabPane = Tabs.TabPane;
const dateFormat = 'DD.MM.YYYY';
const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

@connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects['universal/getobject'],
}))
export default class CounterAgentView extends Component {
  state = {
    errorText: null,
    messageText: '',
  };

  getContractData = () => {
    const { dispatch } = this.props;

    if ((this.props.location.query && this.props.location.query.id) || this.props.contractId) {
      dispatch({
        type: 'universal/getobject',
        payload: {
          'entity': 'contract',
          'alias': null,
          'id': this.props.location.query.id ? this.props.location.query.id : this.props.contractId,
        },
      }).then(() => {

        let result = this.props.universal.getObjectData;
        if (result.Message) {
          this.setState({
            errorText: result.Message,
          });
        }


      });
    } else {
      //redirect to 404 page
    }
  };

  componentDidMount() {

    this.getContractData();
  };

  render = () => {
    const { location, children } = this.props;

    if (this.state.errorText !== null) {
      return (<Card
        headStyle={{ padding: 0 }}
        title={''}
        className={styles.headPanel}
        bordered={false}
        bodyStyle={{ padding: 0 }}>
        <div>{this.state.errorText}</div>
      </Card>);
    }

    return (<div>
      <Card
        headStyle={{ padding: 0 }}
        title={''}
        className={styles.headPanel}
        bordered={false}
        bodyStyle={{ padding: 0 }}>
        <Row style={{ marginTop: '5px' }}>
          <Spin spinning={this.props.loadingData}>
            <Form layout="horizontal" hideRequiredMark>
              <Tabs
                tabBarStyle={{ textAlign: 'left' }}
                type={'card'}
                className={styles.stepFormText}
                defaultActiveKey="main"
                tabPosition={'left'}>
                <TabPane tab="Титульная часть" key="main">
                  <InfoPage
                    formData={this.props.universal.getObjectData}
                    formItemLayout={formItemLayout}/>
                </TabPane>
                <TabPane tab="Спецификация" key="specification">
                  <SpecPage
                    formData={this.props.universal.getObjectData}
                  />
                </TabPane>
                <TabPane tab="Контрагенты" key="counteragents">
                  <ContragentsPage
                    gridData={this.props.universal.getObjectData}
                  />
                </TabPane>
                <TabPane tab="Приложения" key="attachments">
                  <AttachmentPage formData={this.props.universal.getObjectData}/>
                </TabPane>
              </Tabs>
            </Form>
          </Spin>
        </Row>
      </Card>
    </div>);
  };
}
