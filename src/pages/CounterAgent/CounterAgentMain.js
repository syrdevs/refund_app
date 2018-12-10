import React, { Component, Provider } from 'react';
import {
  Card,
  Button,
  Label,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const dateFormat = 'DD.MM.YYYY';
export default class CounterAgentMain extends Component {
  state = {

    titles: {
      '/contract/counteragent/create': 'menu.contract.counteragent.contract.headTitle',
    },

  };

  getCardTitle = () => {
    return this.state.titles[this.props.location.pathname] ? this.state.titles[this.props.location.pathname] : 'menu.counteragent';
  };

  render = () => {
    const { location, children } = this.props;

    return (<PageHeaderWrapper title={formatMessage({ id: this.getCardTitle() })}>
        <Card bodyStyle={{ padding: 5 }}>
          <div style={{ width: '100%' }}>
          </div>
          {children}
        </Card>
      </PageHeaderWrapper>
    );
  };
}
