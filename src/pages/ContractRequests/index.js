import React, { Component } from 'react';
import {
  Card,
  Label,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';


const dateFormat = 'DD.MM.YYYY';
export default class ContractRequests extends Component {
  state = {
  };



  render = () => {
    const { location, children } = this.props;
    return (<PageHeaderWrapper title={formatMessage({ id: 'app.module.contractrequests.title' })}>
        <Card bodyStyle={{ padding: 5 }}>
          {children}
        </Card>
      </PageHeaderWrapper>
    );
  };
}
