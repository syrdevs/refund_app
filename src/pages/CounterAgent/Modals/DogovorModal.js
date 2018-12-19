import React, { Component } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Modal, Row, Col, Tabs, Card, Spin } from 'antd';
import SmartGridView from '@/components/SmartGridView';
import { connect } from 'dva/index';
import style from './ContragentModalStyle.less';
import { Tab } from '../../../components/Login';

@connect(({ universal2, loading }) => ({
  universal2,
  loading: loading.effects['universal2/getList'],
}))
export default class DogovorModal extends Component {
  state = {
    selectedRecord: {},
    columns: [
      {
        title: 'Подразделение',
        dataIndex: 'division.name',
        isVisible: true,
      },
      {
        title: 'Учетный период: год',
        dataIndex: 'periodYear.year',
        isVisible: true,
      },
      {
        title: 'Контрагент',
        dataIndex: 'contragent.organization',
        isVisible: true,
        width: 460,
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
        title: 'Дата начала',
        dataIndex: 'dateBegin',
        isVisible: true,
      },
      {
        title: 'Дата окончания',
        dataIndex: 'dateEnd',
        isVisible: true,
      },
      {
        title: 'Сумма',
        dataIndex: 'documentSum',
        isVisible: true,
      },
      {
        title: 'Статус',
        dataIndex: 'documentStatus.statusName',
        isVisible: true,
      },
      {
        title: 'Файлы',
        dataIndex: 'documentAttachmentsCount',
        isVisible: true,
      },
    ],
    fcolumn: [
      {
        order: 12,
        title: 'Протокол распределения объемов',
        dataIndex: 'planProtocol',
        isVisible: true,
        render: (text, record) => {
          if (record && record.planProtocol) {
            return <span style={{
              color: '#1890ff',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}>№{record.planProtocol.number} от {record.planProtocol.documentDate}</span>;
          }
        },
      },
      {
        title: 'Родительский договор',
        order: 11,
        dataIndex: 'parentContract.number',
        isVisible: true,
        render: (text, record) => {
          if (record && record.parentContract) {
            return <span style={{
              color: '#1890ff',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}>{record.parentContract.contractType} №{record.parentContract.number} от {record.parentContract.documentDate}</span>;
          }
          //***
          ////<parentContract.contractType> №<parentContract.number> от <parentContract.documentDate>
        },
      },
      {
        title: 'Заявка на объемы',
        dataIndex: 'proposal',
        isVisible: true,
        order: 13,
        render: (text, record) => {
          if (record && record.proposal) {
            return <span style={{
              color: '#1890ff',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}>№{record.proposal.number} от {record.proposal.documentDate}</span>;
          }
        },
      },
    ],
    gridParameters: {
      start: 0,
      length: 15,
      entity: 'contract',
      alias: 'contractList',
      filter: {},
      sort: [],
    },
  };

  onShowSizeChange = (current, pageSize) => {
    const { dispatch } = this.props;
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
      style={{ top: 0 ,paddingBottom:0}}
      width={1200}
      title={'Список договоров'}
      okText={'Выбрать'}
      onCancel={() => this.props.hide()}
      onOk={() => {
        if (Object.keys(this.state.selectedRecord).length > 0)
          this.props.onSelect(this.state.selectedRecord);
        else this.props.hide();
      }}
      visible={true}>
      <Spin spinning={this.props.loading}>
        <div className={style.DogovorModal}>
          <SmartGridView
            scroll={{ x: 'auto', y:280 }}
            name={'DogovorModal'}
            actionColumns={this.state.fcolumn}
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
        </div>
      </Spin>
    </Modal>);
  };
}

