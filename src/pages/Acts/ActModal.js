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
      columns: [
        {
          'title': 'Код',
          'dataIndex': 'code',
          'isVisible': 'true',
        },
        {
          'title': 'Вид деятельности',
          'dataIndex': 'activity',
          'isVisible': 'true',
        },
        {
          'title': 'Предъявлено к оплате (тг)',
          'dataIndex': 'present_payment',
          'isVisible': 'true',
        },
        {
          'title': 'Принято к оплате (тг)',
          'dataIndex': 'accept_payment',
          'isVisible': 'true',
        },
        {
          'title': 'Вычет аванса (тг)',
          'dataIndex': 'prepaid',
          'isVisible': 'true',
        },
        {
          'title': 'Итого к оплате (тг)',
          'dataIndex': 'total',
          'isVisible': 'true',
        }
      ],
      selectedRow: {},
      data: [
        {
          key: 4, code: '123456', activity: 'Медицинское учереждение', present_payment: 10456, accept_payment:10456, prepaid:2500, total:10456
        },
        {
          key: 5, code: '123456', activity: 'Медицинское учереждение', present_payment: 10456, accept_payment:10456, prepaid:2500, total:10456
        },
        {
          key: 6, code: '123456', activity: 'Медицинское учереждение', present_payment: 10456, accept_payment:10456, prepaid:2500, total:10456
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


