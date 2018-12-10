import React, { Component, Provider } from 'react';
import {
  Card,
  Button,
  Label,
  Row,
  Form,
  Tabs
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { ContragentsPage, SpecPage, InfoPage, DogovorPage } from './TabPagesView';
import styles from './CounterAgent.less';

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

export default class CounterAgentView extends Component {
  componentDidMount() {
    console.log(this.props);
  };

  render = () => {
    const { location, children } = this.props;

    return (<div>
      <Card
        headStyle={{ padding: 0 }}
        title={''}
        className={styles.headPanel}
        bordered={false}
        bodyStyle={{ padding: 0 }}>
        <Row style={{ marginTop: '5px' }}>
          <Form layout="horizontal" hideRequiredMark>
            <Tabs
              tabBarStyle={{ textAlign: 'left' }}
              type={'card'}
              className={styles.stepFormText}
              defaultActiveKey="main"
              tabPosition={'left'}>
              <TabPane tab="Титульная часть" key="main">
                <InfoPage formItemLayout={formItemLayout}/>
              </TabPane>
              {/*<TabPane tab="Род-кий договор" key="rod_dogovor">*/}
                {/*<DogovorPage/>*/}
              {/*</TabPane>*/}
              <TabPane tab="Спецификация" key="specification">
                <SpecPage/>
              </TabPane>
              <TabPane tab="Контрагенты" key="counteragents">
                <ContragentsPage/>
              </TabPane>
            </Tabs>
          </Form>
        </Row>
      </Card>
    </div>);
  };
}
