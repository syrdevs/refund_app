import React, { Component } from 'react';
import { Card, Label, Row, Col, Input, Button, Table, Tabs, Spin } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva/index';
const TabPane = Tabs.TabPane;

@connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects['universal/optionsData'],
}))
class Searcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iin:'',
    };
  }

  applyFilters = (e) => {
    console.log(e);
  };
  fieldOnChange = (filterItem, value) => {
console.log(filterItem);
/*    const { formFilters } = this.state;

    this.setState({
      formFilters: {
        [filterItem.name]: value,
      },
    });*/
  };

  render() {
    const mBottom = { marginBottom: '5px' };
    const {iin} = this.state;

    return (
      <PageHeaderWrapper title="Настройки">
        <Card
          title="Поиск"
          extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <Form layout={'vertical'}>
            <div  style={mBottom}>{filterItem.label}:
              <Input onKeyDown={this.onKeyPress} onChange={(e) => {
                this.fieldOnChange(filterItem, e.target.value);
              }} value={iin} style={{ width: '100%' }}/></div>
            <Button style={{ margin: '10px 0 0 0px' }} type='primary'
                    onClick={this.applyFilters}>
              Поиск
            </Button>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Searcher;
