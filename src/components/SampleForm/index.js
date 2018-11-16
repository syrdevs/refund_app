import React, { Component } from 'react';
import { Tabs, Spin, Form, Divider, Button, Icon, Col, Card  } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import FieldCreator from '../FieldCreator/FieldCreator';

const TabPane = Tabs.TabPane;

export default class SampleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      panes: [
        { title: 'Форма 1', content: [ {
            name: 'appNumber',
            label: formatMessage({ id: 'menu.filter.numberrequest' }),
            type: 'text',
          },
            {
              name: 'iin',
              label: formatMessage({ id: 'menu.filter.iin' }),
              type: 'text',
            },
            {
              name: 'refund_status',
              label: formatMessage({ id: 'menu.filter.refundstatus' }),
              type: 'multibox',
            },
            {
              name: 'lastDate',
              label: formatMessage({ id: 'menu.filter.lastdate' }),
              type: 'betweenDate',
            },
            {
              name: 'payerDate',
              label: formatMessage({ id: 'menu.filter.payerdate' }),
              type: 'betweenDate',
            },
            {
              name: 'RefundComeDate',
              label: formatMessage({ id: 'menu.filter.RefundComeDate' }),
              type: 'betweenDate',
            },
            {
              name: 'RefundFundDate',
              label: formatMessage({ id: 'menu.filter.RefundFundDate' }),
              type: 'betweenDate',
            },
            {
              name: 'RefusalDate',
              label: formatMessage({ id: 'menu.filter.RefusalDate' }),
              type: 'betweenDate',
            },
            {
              name: 'knp',
              label: formatMessage({ id: 'menu.filter.knp' }),
              type: 'multibox',
              hint: true,
            },
            {
              name: 'refund_reason',
              label: formatMessage({ id: 'menu.filter.RefundReason' }),
              type: 'combobox',
            },
            {
              name: 'refund_deny_reason',
              label: formatMessage({ id: 'menu.filter.RefusalReason' }),
              type: 'combobox',
            }], key: '1' },
        { title: 'Форма 2', content: [ {
            name: 'appNumber',
            label: formatMessage({ id: 'menu.filter.numberrequest' }),
            type: 'text',
          },
            {
              name: 'iin',
              label: formatMessage({ id: 'menu.filter.iin' }),
              type: 'text',
            },
            {
              name: 'refund_status',
              label: formatMessage({ id: 'menu.filter.refundstatus' }),
              type: 'multibox',
            },
            {
              name: 'lastDate',
              label: formatMessage({ id: 'menu.filter.lastdate' }),
              type: 'betweenDate',
            },
            {
              name: 'payerDate',
              label: formatMessage({ id: 'menu.filter.payerdate' }),
              type: 'betweenDate',
            },
            {
              name: 'RefundComeDate',
              label: formatMessage({ id: 'menu.filter.RefundComeDate' }),
              type: 'betweenDate',
            },
            {
              name: 'RefundFundDate',
              label: formatMessage({ id: 'menu.filter.RefundFundDate' }),
              type: 'betweenDate',
            },
            {
              name: 'RefusalDate',
              label: formatMessage({ id: 'menu.filter.RefusalDate' }),
              type: 'betweenDate',
            },
            {
              name: 'knp',
              label: formatMessage({ id: 'menu.filter.knp' }),
              type: 'multibox',
              hint: true,
            },
            {
              name: 'refund_reason',
              label: formatMessage({ id: 'menu.filter.RefundReason' }),
              type: 'combobox',
            },
            {
              name: 'refund_deny_reason',
              label: formatMessage({ id: 'menu.filter.RefusalReason' }),
              type: 'combobox',
            }], key: '2' },
        { title: 'Форма 3', content: [ {
            name: 'appNumber',
            label: formatMessage({ id: 'menu.filter.numberrequest' }),
            type: 'text',
          },{
              name: 'iin',
              label: formatMessage({ id: 'menu.filter.iin' }),
              type: 'text',
            },{
              name: 'refund_status',
              label: formatMessage({ id: 'menu.filter.refundstatus' }),
              type: 'multibox',
            },
            {
              name: 'lastDate',
              label: formatMessage({ id: 'menu.filter.lastdate' }),
              type: 'betweenDate',
            },
            {
              name: 'payerDate',
              label: formatMessage({ id: 'menu.filter.payerdate' }),
              type: 'betweenDate',
            },
            {
              name: 'RefundComeDate',
              label: formatMessage({ id: 'menu.filter.RefundComeDate' }),
              type: 'betweenDate',
            },
            {
              name: 'RefundFundDate',
              label: formatMessage({ id: 'menu.filter.RefundFundDate' }),
              type: 'betweenDate',
            },
            {
              name: 'RefusalDate',
              label: formatMessage({ id: 'menu.filter.RefusalDate' }),
              type: 'betweenDate',
            },
            {
              name: 'knp',
              label: formatMessage({ id: 'menu.filter.knp' }),
              type: 'multibox',
              hint: true,
            },
            {
              name: 'refund_reason',
              label: formatMessage({ id: 'menu.filter.RefundReason' }),
              type: 'combobox',
            },
            {
              name: 'refund_deny_reason',
              label: formatMessage({ id: 'menu.filter.RefusalReason' }),
              type: 'combobox',
            }], key: '3' }
      ]
    };
  }

  tabchange(key) {
    console.log(key);
  }

  render() {
    const {panes} = this.state;
    const dateFormat = 'DD.MM.YYYY';
    return (
      <Card bodyStyle={{ padding: 5 }}>
        <Form layout='vertical'>
          <Tabs
            onChange={() =>{this.tabchange}}
            tabPosition='left'
          >{panes.map(pane =>
            <TabPane tab={pane.title} key={pane.key}>
              <FieldCreator
                filterForm={pane.content}
                dateFormat={dateFormat}
              />
            </TabPane>
            )}
          </Tabs>
          <Divider
            style={{ margin: '16px 10px 0 0' }}
          />
          <Button
            style={{ margin: '10px 0 0 0px' }}
            type='primary'
            onClick={(e)=>{console.log(e)}}
          >
            Добавить
          </Button>
          <Button
            style={{ margin: '10px 0 0 5px' }}
            onClick={(e)=>{console.log(e)}}
          >
            Отменить
          </Button>
        </Form>
      </Card>
    );
  };
}
