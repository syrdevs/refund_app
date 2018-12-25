import React, { Component } from 'react';
import {
  Card,
  Label,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';


export default class Bills extends Component {



  render = () => {
    const { location, children } = this.props;
    return children;
  };
}
