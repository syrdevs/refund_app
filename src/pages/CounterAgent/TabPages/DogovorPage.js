import React, { Component } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Modal, Row, Col, Tabs, Card } from 'antd';
import DogovorModal from '../Modals/DogovorModal';

export default class DogovorPage extends Component {
  state = {

    modalForm: {
      visible: false,
    },

    formKeys: {
      bin: 'БИН',
      counteragent: 'Контрагент',
      type_dogovor: 'Вид договора',
      nomer: 'Номер',
      date: 'Дата',
      status: 'Статус',
    },

    dataSource: [],
  };
  render = () => {

    const columns = [{
      title: 'Наименование',
      dataIndex: 'name',
      render: (text) => <div style={{ color: 'black' }}>{text}</div>,
      width: 100,

    }, {
      title: 'Значения',
      dataIndex: 'value',
      key: 'value',
      width: 150,
    }];


    return (<Card bodyStyle={{ padding: 5 }} style={{ marginLeft: '-10px' }}>
      <div>
        {this.state.modalForm.visible &&
        <DogovorModal
          onSelect={(record) => {

            let selectItem = [];
            let keys = Object.keys(this.state.formKeys);

            keys.forEach((itemKey) => {
              selectItem.push({
                name: this.state.formKeys[itemKey],
                value: record[itemKey],
              });
            });

            this.setState({
              dataSource: selectItem,
            });
          }}
          hide={() => this.setState({ modalForm: { visible: false } })}/>}

        <div style={{ width: '100%' }}>
          <Button onClick={() => {
            this.setState({ modalForm: { visible: true } });
          }} key={'select_button'} style={{ margin: '0px 0px 10px 5px' }}>Выбрать</Button>
          {this.state.dataSource.length > 0 && <Button
            onClick={() => {
              this.setState({
                dataSource: [],
              });
            }}
            key={'delete_button'}
            style={{ margin: '0px 0px 10px 5px' }}>Удалить</Button>}
        </div>
        <Table
          columns={columns}
          dataSource={this.state.dataSource}
          pagination={{ position: 'none' }}
          showHeader={false}
        />
      </div>
    </Card>);
  };
}
