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
  Spin,
  Row,
  Col,
  Calendar, Badge,
  DatePicker,
  Modal,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ReportGrid from './ReportsGrid';
import ReportForm from './ReportForm';

const TabPane = Tabs.TabPane;

function getTree(data, primaryIdName, parentIdName) {
  if (!data || data.length == 0 || !primaryIdName || !parentIdName)
    return [];

  var tree = [],
    rootIds = [],
    item = data[0],
    primaryKey = item[primaryIdName],
    treeObjs = {},
    tempChildren = {},
    parentId,
    parent,
    len = data.length,
    i = 0;

  while (i < len) {
    item = data[i++];
    primaryKey = item[primaryIdName];

    if (tempChildren[primaryKey]) {
      item.children = tempChildren[primaryKey];
      delete tempChildren[primaryKey];
    }

    treeObjs[primaryKey] = item;
    parentId = item[parentIdName];

    if (parentId) {
      parent = treeObjs[parentId];

      if (!parent) {
        var siblings = tempChildren[parentId];
        if (siblings) {
          siblings.push(item);
        } else {
          tempChildren[parentId] = [item];
        }
      } else if (parent.children) {
        parent.children.push(item);
      } else {
        parent.children = [item];
      }
    } else {
      rootIds.push(primaryKey);
    }
  }

  for (var i = 0; i < rootIds.length; i++) {
    tree.push(treeObjs[rootIds[i]]);
  }
  ;

  return tree;
}


@connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects['universal2/reportsData'],
}))
export default class ReportsPage extends Component {

  state = {

    selectedRow: null,

    tabs: {
      activeKey: '1',
    },

    reportForm: {
      data: {},
      filterData: [],
      buttonIsDisabled: true,
      reportName: '',
    },

    reportsData: {
      columns: [{
        title: '№',
        key: 'index',
        render: (text, row, index) => index + 1,
      }, {
        title: 'Наименование на казахском',
        dataIndex: 'nameKz',
      }, {
        title: 'Наименование на русском',
        dataIndex: 'nameRu',
      }],
      dataSource: [],
    },

  };


  onRowClick = (record, index) => {

    if(!record.children){
      this.setState({
        selectedRow: record.id ,
        reportForm: {
          formingReport: false,
          reportName: record.nameRu,
          buttonIsDisabled: false,
          data: record,
        },
      });
    }
    else{
      this.setState({
        selectedRow: null,
        reportForm: {
          data: {},
          filterData: [],
          buttonIsDisabled: true,
          reportName: '',
        },
      });
    }

  };

  unReport = () => {
    this.setState((prevState, props) => {
      return {
        reportForm: {
          ...prevState.reportForm,
          formingReport: false,
        },
      };
    });
  };

  reportForming = (formFilter) => {

    let filteredData = [];

    Object.keys(formFilter).forEach((formItem) => {
      if (formFilter[formItem].momentValue) {
        filteredData.push(formFilter[formItem].value);
      }
      else {
        filteredData.push(formFilter[formItem].value);
      }
    });

    let orderRecord = this.state.reportForm.data;
    this.setState((prevState, props) => {
      return {
        reportForm: {
          ...prevState.reportForm,
          formingReport: true,
          filterData: filteredData,
        },
        tabs: {
          activeKey: '2',
        },
      };
    });
  };

  tabOnChange = (activeKey) => {
    if (this.state.tabs.activeKey === activeKey) return;
    this.setState((prevState, props) => {
      return {
        tabs: {
          activeKey: activeKey,
        },
      };
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'universal2/reportsData',
      payload: {},
    });
  }

  render() {

    let treeStoreData = [];

    if (this.props.universal2.dataStore.length > 0)
      treeStoreData = getTree(JSON.parse(JSON.stringify(this.props.universal2.dataStore)), 'id', 'parentd');

    return (<PageHeaderWrapper title="Отчеты">
        <Spin spinning={this.props.loadingData}>
          <Card bodyStyle={{ padding: 5 }}>
            <Row gutter={16}>
              <Col sm={18} md={18}>
                <Tabs onChange={this.tabOnChange} activeKey={this.state.tabs.activeKey}>
                  <TabPane tab={formatMessage({ id: 'report.list' })} key="1">
                    <Table
                      rowClassName={(record, index) => {
                        return this.state.selectedRow === record.id ? 'active' : '';
                      }}
                      size={'small'}
                      rowKey={'id'}
                      onRow={(record, index) => {
                        return {
                          onClick: () => this.onRowClick(record, index),
                        };
                      }}
                      pagination={false}
                      columns={this.state.reportsData.columns}
                      bordered={true}
                      dataSource={treeStoreData}/>
                  </TabPane>
                  <TabPane tab={formatMessage({ id: 'report.formingList' })} key="2">
                    {this.state.tabs.activeKey === '2' &&
                    <ReportGrid  {...this.state.reportForm} unReport={this.unReport}/>}
                    <br>
                    </br>
                  </TabPane>
                </Tabs>

              </Col>
              <Col sm={6} md={6}>
                <ReportForm {...this.state.reportForm} reportForming={this.reportForming}/>
              </Col>
            </Row>
          </Card>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}
