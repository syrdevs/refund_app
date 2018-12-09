import React, { Component } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Modal, Row, Col, Tabs, Card } from 'antd';
import SmartGridView from '@/components/SmartGridView';

export default class DogovorModal extends Component {
  state = {
    selectedRecord: {},
    dataSource: [
      {
        id: '1',
        bin: 'БИН',
        counteragent: '89999559999',
        type_dogovor: 'Тип договора',
        nomer: '123456478',
        date: '09.12.2018',
        status: 'Принято',
      },
      {
        id: '2',
        bin: 'БИН',
        counteragent: '41423413255',
        type_dogovor: 'Тип договора',
        nomer: '123456478',
        date: '09.12.2018',
        status: 'Принято',
      },
      {
        id: '3',
        bin: 'БИН',
        counteragent: '5123513252',
        type_dogovor: 'Тип договора',
        nomer: '123456478',
        date: '09.12.2018',
        status: 'Принято',
      },
      {
        id: '4',
        bin: 'БИН',
        counteragent: '734573574332',
        type_dogovor: 'Тип договора',
        nomer: '123456478',
        date: '09.12.2018',
        status: 'Принято',
      },
    ],
  };
  render = () => {

    const columns = [{
      title: 'БИН',
      dataIndex: 'bin',
      isVisible:true,
      width: 100,
    }, {
      title: 'Контрагент',
      dataIndex: 'counteragent',
      isVisible:true,
      width: 150,
    }, {
      title: 'Вид договора',
      dataIndex: 'type_dogovor',
      isVisible:true,
      width: 150,
    }, {
      title: 'Номер',
      dataIndex: 'nomer',
      isVisible:true,
      width: 150,
    }, {
      title: 'Дата',
      dataIndex: 'date',
      isVisible:true,
      width: 150,
    }, {
      title: 'Статус',
      dataIndex: 'status',
      isVisible:true,
      width: 150,
    }];


    return (<Modal
      style={{ top: 20 }}
      width={800}
      title={'Список договоров'}
      okText={'Выбрать'}
      onCancel={() => this.props.hide()}
      onOk={() => {
        this.props.onSelect(this.state.selectedRecord);
        this.props.hide();
      }}
      visible={true}>
      <SmartGridView
        scroll={{ x: 'auto' }}
        name={'DogovorModal'}
        columns={columns}
        showTotal={true}
        actionExport={() => {
          console.log('export');
        }}
        dataSource={{
          total: this.state.dataSource.length,
          pageSize: 15,
          page: 1,
          data: this.state.dataSource,
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
