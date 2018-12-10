import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card } from 'antd';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';

export default class SpecPage extends Component {
  state = {
    smarttabDataSource: [
      {
        code:"01542",
        type_activities:"Взносы на обязательное социальное медицинское страхование",
        unit:"час",
        amount:"100",
        tariff:"0.25",
        summa:"0.35",
        avans:"0.45"
      }
    ],
    columns: [
      {
        title: 'Код',
        dataIndex: 'code',
        width: '10%'
      }, {
        title: 'Вид деятельности',
        dataIndex: 'type_activities',
        width: '30%'
      },
      {
        title: 'Единица',
        dataIndex: 'unit',
        width: '10%'
      },
      {
        title: 'Количество',
        dataIndex: 'amount',
        width: '10%'
      },
      {
        title: 'Тариф (₸)',
        dataIndex: 'tariff',
        isVisible: true,
        order: 2,
        width: '10%',
        key: 'tariff'
      },
      {
        title: 'Сумма (₸)',
        dataIndex: 'summa',
        isVisible: true,
        order: 2,
        width: '10%',
        key: 'summa'
      },
      {
        title: 'Аванс (₸)',
        dataIndex: 'avans',
        isVisible: true,
        order: 2,
        width: '10%',
        key: 'avans'
      }
    ],
  };

  render = () => {
    return (<Card bodyStyle={{ padding: 5 }} style={{ marginLeft: '-10px' }}>
      <Table
        scroll={{
          x: 1200,
        }}
        pagination={false}
        bordered={true}
        dataSource={this.state.smarttabDataSource}
        columns={this.state.columns}/>
    </Card>);
  };
}
