import React, { Component } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card } from 'antd';
import reduxRouter from 'umi/router';
import SmartGridView from '@/components/SmartGridView';

export default class ContragentsPage extends Component {
  state = {
    isForm: false,
    columns: [
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
      },
    ],

    xsize: 'auto',

    pagingConfig: {
      'start': 0,
      'length': 15,
      'src': {
        'searched': false,
        'data': {},
      },
    },
  };
  render = () => {
    return <Card style={{ marginLeft: '-10px' }} bodyStyle={{ padding: 5 }}>
      <SmartGridView
        hidePagination={true}
        name='ContragentPageView'
        rowKey={'id'}
        showExportBtn={true}
        showTotal={true}
        hideFilterBtn={true}
        hideRefreshBtn={true}
        columns={this.state.columns}
        dataSource={{
          total: 8921,
          pageSize: this.state.pagingConfig.length,
          page: this.state.pagingConfig.start + 1,
          data: [{
            'id': '1',
            'code': '00052',
            'name': 'ТОО TMI Company',
            'bin': '861207303160',
            'address': 'Микрорайон 4, дом 34, кв 50',
            'currentContacts': '+77028596963',
            'account': 'KZ75125KZT1001300335',
            'responsiblePersons': 'Ахметов Даурен',
          }],
        }}
        actionExport={() =>{}}
        onShowSizeChange={(pageNumber, pageSize) => {
          {/*<Button
                      disabled={hasRole(['ADMIN'])}
                      key='register_document'
                    >Зарегистрировать договор
                    </Button>,*/
          }
        }}
        onSelectCell={(cellIndex, cell) => {

        }}
        onSelectRow={() => {

        }}
        onFilter={(filters) => {

        }}
        onRefresh={() => {

        }}
        onSearch={() => {

        }}
      /></Card>;
  };
}
