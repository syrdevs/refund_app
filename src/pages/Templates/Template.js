import React, { Component } from 'react';
import {
  Card,
  Table,
  Icon,
  Menu,
  Dropdown,
  Button,
  Label,
  Pagination,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Checkbox,
  Divider,
  Upload,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

export default class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      dataSource: [],
    };
  }

  componentDidMount() {
    this.setState({
      columns: [{
        width: 60,
        title: '№',
        dataIndex: 'number',
      }, {
        title: 'Описание шаблона',
        dataIndex: 'templateDescription',
      }, {
        title: 'Шаблон',
        width: 50,
        onCell: record => {
          return {
            onClick: () => {
              console.log(record);
            },
          };
        },
        render: () => (
          <Button>
            Скачать шаблон
          </Button>
        ),
      }, {
        title: 'Загрузка шаблона',
        width: 50,
        onCell: record => {
          return {
            onClick: () => {
              console.log(record);
            },
          };
        },
        render: () => (
          <Upload size={'small'} name="logo" action="/upload.do" listType="picture">
            <Button>
              Загрузить шаблон
            </Button>
          </Upload>
        ),
      }],
      dataSource: [{
        key: 1,
        number: 1,
        templateDescription: 'Письмо об отказе',
      }],
    });
  }

  render() {

    const { columns, dataSource } = this.state;

    return (
      <PageHeaderWrapper title="ШАБЛОНЫ">
        <Card bordered={false} bodyStyle={{ padding: 5 }}>
          <Table size={'small'} bordered={true} rowKey={'key'} columns={columns} dataSource={dataSource}/>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
