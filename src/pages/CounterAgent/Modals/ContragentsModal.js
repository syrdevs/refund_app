import React, { Component } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Modal, Row, Col, Tabs, Card } from 'antd';
import SmartGridView from '@/components/SmartGridView';
import { connect } from 'dva/index';
import style from './ContragentModalStyle.less';

@connect(({ universal2 }) => ({
  universal2,
}))
export default class ContragentsModal extends Component {
  state = {
    selectedRowKeys: [],
    selectedRecord: {},
    columns: [
      {
        title: 'Код',
        dataIndex: 'code',
        isVisible: true,
        width: 100,
      }, {
        title: 'Наименование/Имя',
        dataIndex: 'name',
        isVisible: true,
        width: 400,
      }, {
        title: 'Идентификатор',
        dataIndex: 'idendifier.identifiervalue',
        isVisible: true,
        width: 200,
      }, {
        title: 'Адрес',
        dataIndex: 'address',
        isVisible: true,
        width: 200,
      }, {
        title: 'Актуальные контакты',
        dataIndex: 'contact',
        isVisible: true,
        width: 200,
      }, {
        title: 'Банковские реквизиты',
        dataIndex: 'bankAccount.bank',
        isVisible: true,
        width: 200,
      }, {
        title: 'Ответственные лица',
        dataIndex: 'representative',
        isVisible: true,
        width: 200,
      },
    ],
    gridParameters: {
      start: 0,
      length: 15,
      alias: 'clinicList',
      entity: 'clinic',
      filter: {},
      sort: [],
    },
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
    const counterData = universal2.references[this.state.gridParameters.entity];

    return (<Modal
      style={{ top: 0,paddingBottom:0 }}
      width={1200}
      title={'Список контрагентов'}
      okText={'Выбрать'}
      onCancel={() => this.props.hide()}
      onOk={() => {
        //this.props.onSelect(counterData.content.filter(x => this.state.selectedRowKeys.findIndex(a => x.id === a) !== -1));

        if (Object.keys(this.state.selectedRecord).length > 0)
          this.props.onSelect(this.state.selectedRecord);

      }}
      visible={true}>
      <div className={style.SmartGridView}>
        <SmartGridView
          scroll={{ x: 'auto', y: 280 }}
          name={'ContragentsModal'}
          rowSelection={true}
          hideFilterBtn={true}
          hideRefreshBtn={true}
          // selectedRowCheckBox={true}
          // selectedRowKeys={this.state.selectedRowKeys}
          columns={this.state.columns}
          showTotal={true}
          actionExport={() => {
            console.log('export');
          }}
          dataSource={{
            total: counterData ? counterData.totalElements : 0,
            pageSize: this.state.gridParameters.length,
            page: this.state.gridParameters.start + 1,
            data: counterData ? counterData.content : [],
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
            this.setState({ selectedRowKeys: selectedRowKeys });
          }}
        />
      </div>

    </Modal>);
  };
}
