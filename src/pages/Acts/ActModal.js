import React, { Component } from 'react';
import { Modal, Tabs, Table, Button, Spin, Card } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import SmartGridView from '../../components/SmartGridView';
import { connect } from 'dva/index';

const TabPane = Tabs.TabPane;


export default class ActModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      selectedRow: {},
      columns: [
        {
          title: 'Отчетный период(Год)',
          dataIndex: 'act_period_year',
          isVisible: true,
        },
        {
          title: 'Отчетный период(Месяц)',
          dataIndex: 'act_period_month',
          isVisible: true,
        },
        {
          title: 'БИН',
          dataIndex: 'bin',
          isVisible: true,
        },
        {
          title: 'Контрагент',
          dataIndex: 'counteragent',
          isVisible: true,
        },
        {
          title: 'Договор',
          dataIndex: 'contract_id',
          isVisible: true,
        },
        {
          title: 'Номер',
          dataIndex: 'number',
          isVisible: true,
        },
        {
          title: 'Дата',
          dataIndex: 'act_date',
          isVisible: true,
        },
        {
          title: 'Оплата',
          dataIndex: 'payment',
          isVisible: true,
        },
        {
          title: 'Подразделение',
          dataIndex: 'podr',
          isVisible: true,
        },
      ],
      data: [
        {
          id: '3',
          act_period_year: 'test',
          act_period_month: 'test',
          bin: 'test',
          counteragent: 'test',
          contract_id: 'test',
          number: '1516512',
          act_date: '02.12.2018',
          payment: '05.12.2018',
          podr: '06.12.2018',
        }, {
          id: '4',
          act_period_year: 'test',
          act_period_month: 'test',
          bin: 'test',
          counteragent: 'test',
          contract_id: 'test',
          number: '1516512',
          act_date: '02.12.2018',
          payment: '05.12.2018',
          podr: '06.12.2018',
          newContract: false,
        },
      ],
    };
  }
  cancelModal=()=>{
    this.props.onCancel();
  }
  componentDidMount() {

  }
  addAct=()=>{
    this.props.addAct(this.state.selectedRow)
  }

  render() {

    return (<Modal
      width={1000}
      centered
      visible={true}
      footer={[<Button key={'savemt'} onClick={()=>{this.addAct()}}>Добавить</Button>,
      <Button key={'closeExcel'} onClick={()=>{this.cancelModal()}}>Отмена</Button>]}>
      <Card
        style={{marginTop:'15px'}}>
      <SmartGridView
        name={'actform'}
        scroll={{ x: 'auto' }}
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
        addonButtons={[]}
        actionExport={() => {}}
        onSelectRow={(record, index) => {
            this.setState({
              selectedRow: record
            })
        }}
        dataSource={{
          total: this.state.data.length,
          pageSize: 15,
          page: 1,
          data: this.state.data,
        }}
        onShowSizeChange={(pageNumber, pageSize) => {}}
        onRefresh={() => {

        }}
        onSearch={() => {

        }}
      />
      </Card>

    </Modal>);
  }
}


