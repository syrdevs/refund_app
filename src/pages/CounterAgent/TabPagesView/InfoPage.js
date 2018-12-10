import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card } from 'antd';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';

export default class InfoPage extends Component {
  state = {
    dataSource: [
      {
        name: 'Вид договора',
        value: 'Договор субподряда к договору на ГОБМП',
      },
      {
        name: 'Причина',
        value: 'Соглашение о расторжении',
      },
      {
        name: 'Номер',
        value: '525684844866',
      },
      {
        name: 'Дата',
        value: '10.12.2018',
      },
      {
        name: 'Отчетный период',
        value: '2018',
      },
      {
        name: 'Период',
        value: '01.02.2018 - 10.12.2018',
      },
      {
        name: 'Подразделение',
        value: 'НАО «Фонд социального медицинского страхования»',
      },
      {
        name: 'Примечание',
        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        name: 'Родительский договор',
        href: '#test',
        value: 'Договор №12032585',
      },

    ],
    columns: [{
      title: 'Наименование',
      dataIndex: 'name',
      render: (text) => <div style={{ color: 'black' }}>{text}</div>,
      width: 100,

    }, {
      title: 'Значения',
      dataIndex: 'value',
      key: 'value',
      width: 150,
      render: (text, record) => {
        if (record.href) {
          return <div
            style={{
              color: '#1890ff',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => {
              window.open("viewcontract?id=2")
            }}>{text}</div>;
        }
        return text;
      },
    }],
  };

  render = () => {

    return (<Card style={{ marginLeft: '-10px' }}>
      <div style={{ margin: '0px 15px', maxWidth: '70%' }}>
        <Table pagination={{ position: 'none' }}
               showHeader={false}
               columns={this.state.columns}
               dataSource={this.state.dataSource}/>
      </div>
    </Card>);
  };
}
