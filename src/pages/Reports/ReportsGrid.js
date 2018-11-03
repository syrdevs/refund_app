import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Card,
  Table,
  Icon,
  Menu,
  Input,
  Dropdown,
  Button,
  Checkbox,
  Tabs,
  Label,
  Select,
  Row,
  Col,
  Calendar, Badge,
  DatePicker,
  Modal,
} from 'antd';


export default class ReportsGrid extends Component {
  state = {
    columns: [{
      title: '№',
      dataIndex: 'index',
    }, {
      title: 'Наименование на казахском',
      dataIndex: 'name_kk',
    }, {
      title: 'Наименование на русском',
      dataIndex: 'name_ru',
    }, {
      title: 'Дата',
      dataIndex: 'date_create',
    }, {
      title: 'Пользователь',
      dataIndex: 'applicant',
    }, {
      title: 'Формат',
      dataIndex: 'file_type',
    }, {
      title: 'Действия',
      dataIndex: 'action_column',
      width: 80,
      onCell: record => {
        return {
          onClick: () => {
            console.log(record);
          },
        };
      },
      render: () => (
        <Icon type="loading" theme="outlined"/>
      ),
    }],

    dataSource: [{
      id: '1',
      index: 1,
      name_ru: 'Количество договоров в разрезе',
      name_kk: 'Количество договоров в разрезе',
      date_create: '03.11.2018 19:13',
      applicant: 'Кудайбергенов',
      file_type: 'PDF',
    }, {
      id: '2',
      index: 2,
      name_ru: 'Количество договоров в разрезе',
      name_kk: 'Количество договоров в разрезе',
      date_create: '03.11.2018 19:13',
      applicant: 'Кудайбергенов',
      file_type: 'PDF',
    }]
  };

  componentDidUpdate() {

  }

  componentDidMount() {

  }

  render() {

    const { columns, dataSource } = this.state;

    return (<Table
      size={'small'}
      rowKey={'id'}
      columns={columns}
      bordered={true}
      dataSource={dataSource}/>);
  }
}
