import React, { Component } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Modal, Row, Col, Tabs, Card } from 'antd';
import SmartGridView from '@/components/SmartGridView';

export default class ContragentsModal extends Component {
  state = {
    selectedRowKeys: [],
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

    const columns = [
      {
        title: 'Код',
        dataIndex: 'code',
        isVisible: true,
      }, {
        title: 'Наименование/Имя',
        dataIndex: 'name',
        isVisible: true,
      }, {
        title: 'Идентификатор',
        dataIndex: 'bin',
        isVisible: true,
      }, {
        title: 'Адрес',
        dataIndex: 'address',
        isVisible: true,
      }, {
        title: 'Актуальные контакты',
        dataIndex: 'currentContacts',
        isVisible: true,
      }, {
        title: 'Банковские реквизиты',
        dataIndex: 'account',
        isVisible: true,
      }, {
        title: 'Ответственные лица',
        dataIndex: 'responsiblePersons',
        isVisible: true,
      }];

    const dataSource = [{
      'id': '1',
      'code': '00052',
      'name': 'ТОО TMI Company',
      'bin': '861207303160',
      'address': 'Микрорайон 4, дом 34, кв 50',
      'currentContacts': '+77028596963',
      'account': 'KZ75125KZT1001300335',
      'responsiblePersons': 'Ахметов Даурен',
    }, {
      'id': '2',
      'code': '00052',
      'name': 'ТОО TMI Company',
      'bin': '861207303160',
      'address': 'Микрорайон 4, дом 34, кв 50',
      'currentContacts': '+77028596963',
      'account': 'KZ75125KZT1001300335',
      'responsiblePersons': 'Ахметов Даурен',
    }];

    return (<Modal
      style={{ top: 20 }}
      width={800}
      title={'Список контрагентов'}
      okText={'Выбрать'}
      onCancel={() => this.props.hide()}
      onOk={() => {
        this.props.onSelect(dataSource.filter(x => this.state.selectedRowKeys.findIndex(a => x.id === a) !== -1));
        //this.props.hide();
      }}
      visible={true}>
      <SmartGridView
        scroll={{ x: 'auto' }}
        name={'ContragentsModal'}
        rowSelection={true}
        hideFilterBtn={true}
        hideRefreshBtn={true}
        selectedRowCheckBox={true}
        selectedRowKeys={this.state.selectedRowKeys}
        columns={columns}
        showTotal={true}
        actionExport={() => {
          console.log('export');
        }}
        dataSource={{
          total: 8921,
          pageSize: 15,
          page: 1,
          data: dataSource,
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
    </Modal>);
  };
}
