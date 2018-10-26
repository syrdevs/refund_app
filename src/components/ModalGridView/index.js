import React, { Component } from 'react';
import { Modal, Tabs, Table } from 'antd';

const TabPane = Tabs.TabPane;

export default class ModalGridView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      isVisible: false,
    };
  }

  componentWillReceiveProps(props, prevProps) {
    if (props != null) {
      this.setState({
        isVisible: props.visible,
        dataSource: props.dataSource,
      });
    }
  }

  handleCancel = (e) => {
    this.props.resetshow();
  };

  render() {

    const { dataSource, isVisible } = this.state;

    return (<Modal
      width={1000}
      centered
      onCancel={this.handleCancel}
      footer={[null, null]}
      visible={isVisible}>
      <Tabs type="card">
        {dataSource.map((tabItem) => {
          return (<TabPane tab={tabItem.id} key={tabItem.id}>
            <Table pagination={false} dataSource={tabItem.data.values} columns={tabItem.data.columns}
                   scroll={{ y: 450 }}/>
          </TabPane>);
        })}
      </Tabs>
    </Modal>);
  }
}


