import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Card } from 'antd';

@connect(({ blog, loading }) => ({
  blog,
  submitting: loading.effects['blog/get'],
}))
export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
    };
  }

  componentDidUpdate(props) {}

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'blog/get',
      payload: {},
    });
  }

  render() {
    return (
      <div>
        <Card>test</Card>
      </div>
    );
  }
}
