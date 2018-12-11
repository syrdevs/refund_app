import React, { Component } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Modal, Row, Col, Tabs, Card } from 'antd';
import SmartGridView from '@/components/SmartGridView';
import { connect } from 'dva/index';

@connect(({ universal2 }) => ({
  universal2,
}))
export default class DogovorModal extends Component {
  state = {
    selectedRecord: {},
    columns:[
      {
        title: 'Отчетный период',
        dataIndex: 'periodYear',
        isVisible: true,
      },
      {
        title: 'БИН',
        dataIndex: 'contractParty.bin',
        isVisible: true,
      },
      {
        title: 'Контрагент',
        dataIndex: 'counteragent',
        isVisible: true,
      },
      {
        title: 'Вид договора',
        dataIndex: 'contractType',
        isVisible: true,
      },
      {
        title: 'Номер',
        dataIndex: 'number',
        isVisible: true,
      },
      {
        title: 'Дата',
        dataIndex: 'documentDate',
        isVisible: true,
      },
      {
        title: 'Период с',
        dataIndex: 'periodStart',
        isVisible: true,
      },
      {
        title: 'Период по',
        dataIndex: 'periodEnd',
        isVisible: true,
      },
      {
        title: 'Подразделение',
        dataIndex: 'contractParty.organization',
        isVisible: true,
      },
      /*{
        title: 'Статус',
        dataIndex: 'status',
        isVisible: true,
      },*/
    ],
    gridParameters: {
      start: 0,
      length: 15,
      entity: "contract",
      alias: "contractList",
      filter: {},
      sort: [],
    },
  };

  onShowSizeChange = (current, pageSize) => {
    const {dispatch} = this.props;
    this.setState(prevState => ({
      gridParameters: {
        ...prevState.gridParameters,
        start: current,
        length: pageSize,
      },
    }), () => dispatch({
      type: 'universal2/getList',
      payload: {
        ...this.state.gridParameters,
        start: current,
        length: pageSize,
      },
    }));
  };
  loadMainGridData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/getList',
      payload: this.state.gridParameters,
    });
  };
  componentDidMount() {
    this.loadMainGridData();
  }

  render = () => {

    const { universal2 } = this.props;
    const contracts = universal2.references[this.state.gridParameters.entity];

    return (<Modal
      style={{ top: 20 }}
      width={800}
      title={'Список договоров'}
      okText={'Выбрать'}
      onCancel={() => this.props.hide()}
      onOk={() => {
        this.props.onSelect(this.state.selectedRecord);
        //this.props.hide();
      }}
      visible={true}>
      <SmartGridView
        scroll={{ x: 'auto' }}
        name={'DogovorModal'}
        columns={this.state.columns}
        showTotal={true}
        actionExport={() => {
          console.log('export');
        }}
        dataSource={{
          total: contracts ? contracts.totalElements : 0,
          pageSize: this.state.gridParameters.length,
          page: this.state.gridParameters.start + 1,
          data: contracts ? contracts.content : [],
        }}
        onSelectRow={(record, index) => {
          this.setState({
            selectedRecord: record,
          });
        }}
        onShowSizeChange={(pageNumber, pageSize) => {
          console.log('on paging');
        }}
        onRefresh={() => {
          console.log('onRefresh');
        }}
        onSearch={() => {

        }}
        onSelectCheckboxChange={(selectedRowKeys) => {

        }}
      />
    </Modal>);
  };
}
