import React, { Component } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card } from 'antd';
import { ContragentsPage, GraphicPage, SpecPage, InfoPage, DogovorPage } from './TabPages';
import styles from './CounterAgent.less';

const TabPane = Tabs.TabPane;
const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

export default class CounterAgentCreate extends Component {
  state = {};


  render = () => {

    {/*<div style={{float:'right'}}>*/
    }
    {/*<Button key={'save_button'}*/
    }
    {/*style={{ margin: '0px 0px 10px' }}>Сохранить</Button>*/
    }
    {/*</div>*/
    }

    return (
      <Card
        headStyle={{ padding: 0 }}
        title={''}
        className={styles.headPanel}
        extra={[<Button>Сохранить</Button>]}
        bordered={false}
        bodyStyle={{ padding: 0 }}>
        <Row style={{ marginTop: '0px' }}>
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
              <TabPane tab="Род-кий договор" key="rod_dogovor">
                <DogovorPage/>
              </TabPane>
              <TabPane tab="Спецификация" key="specification">
                <SpecPage/>
              </TabPane>
              <TabPane tab="Контрагенты" key="counteragents">
                <ContragentsPage/>
              </TabPane>
            </Tabs>
          </Form>
        </Row>
      </Card>);
  };
}
