import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card } from 'antd';

export default class Acts extends Component {
  state = {};
  render = () => {
    return (<Card style={{ marginLeft: '-10px' }}>
      <SmartGridView
        name={'contractform'}
        searchButton={false}
        fixedBody={true}
        rowKey={'id'}
        loading={false}
        fixedHeader={false}
        hideRefreshBtn={true}
        hideFilterBtn={true}
        rowSelection={true}
        showExportBtn={false}
        columns={this.state.columns}
        actionColumns={[]}
        sorted={false}
        showTotal={false}
        addonButtons={[
          <Button style={{ marginRight: '5px' }} type={'default'} onClick={() => {
          }}>Добавить</Button>,
          <Button type={'default'} onClick={() => {
            this.deleteContract();
          }}>Удалить</Button>,
        ]}
        actionExport={() => {
        }}
        onSelectRow={(record, index) => {
          console.log(e);
        }}
        dataSource={{
          total: 1,
          pageSize: 15,
          page: 1,
          data: this.state.data,
        }}
        onShowSizeChange={(pageNumber, pageSize) => {
        }}
        onRefresh={() => {

        }}
        onSearch={() => {

        }}
      />
    </Card>);
  };
}
