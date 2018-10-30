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
import { connect } from 'dva/index';


@connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects['universal2/data'],
}))
export default class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      dataSource: [],
    };
  }

  componentDidMount() {

    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/columns',
      payload: {
        table: 'templates',
      },
    });
    dispatch({
      type: 'universal2/data',
      payload: {
        table: 'templates',
      },
    });

    this.setState({
      columns: [{
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
    });
  }

  render() {
    const { dataStore, columns } = this.props.universal2;

    return (
      <PageHeaderWrapper title="ШАБЛОНЫ">
        <Card bordered={false} bodyStyle={{ padding: 5 }}>
          <Table size={'small'} bordered={true} rowKey={'key'}
                 columns={columns.length > 0 ? columns.concat(this.state.columns) : []}
                 dataSource={dataStore}/>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
