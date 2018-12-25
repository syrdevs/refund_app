import React, { Component } from 'react';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Modal, Row, Col, Tabs, Card, Spin } from 'antd';
import SmartGridView from '@/components/SmartGridView';
import { connect } from 'dva/index';
import style from '../CounterAgent/Modals/ContragentModalStyle.less';

@connect(({ universal2, loading }) => ({
  universal2,
  loading: loading.effects['universal2/getList'],
}))
export default class BillModal extends Component {
  state = {
    selectedRecord: {},
    fcolumn: [
      {
        title: 'Контрагент',
        dataIndex: 'contract.contragent',
        isVisible: true,
        width : 550,
        order: 3,
        key: 'contract.contragent',
        className: 'action_column',
        render: (item) => {
          if (item){
            return item.bin+"  "+item.organization;
          }
        },
      },
      {
        title: 'Договор',
        dataIndex: 'contract',
        order: 4,
        width: 500,
        key: 'contract',
        className: 'action_column',
        isVisible: true,
        render: (item) => {
          if (item){
            return item.contractType+" №"+item.number+" от "+item.documentDate;
          }
        },
      },
      {
        title: 'Протокол',
        dataIndex: 'protocol',
        order: 5,
        width: 200,
        key: 'operation',
        className: 'action_column',
        isVisible: true,
        render: (e) => {
          if (e)
          {
            return "№"+e.number+" от "+e.documentDate;
          }
        },
      }
    ],
    columns: [
      {
        title: 'Учетный период(год)',
        dataIndex: 'periodYear.year',
        isVisible: true,
      },
      {
        title: 'Учетный период(месяц)',
        dataIndex: 'periodSection.name',
        isVisible: true,
      },
      {
        title: 'Подразделение',
        dataIndex: 'division',
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
        title: 'Сумма',
        dataIndex: 'documentSum',
        isVisible: true,
      },
    ],
    gridParameters: {
      start: 0,
      length: 15,
      entity: "act",
      alias: "actList",
      filter: {},
      sort: [],
    },
    selectedRowKeys: [],
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
    const act = universal2.references[this.state.gridParameters.entity];

    return (<Modal
      style={{ top: 0 ,paddingBottom:0}}
      width={1200}
      title={'Список Актов'}
      okText={'Выбрать'}
      onCancel={() => this.props.hide()}
      onOk={() => {
      if (this.state.selectedRowKeys.length!==0) {
        let isOne = true;
        act.content.filter(x => this.state.selectedRowKeys.findIndex(a => x.id === a) !== -1).map((item, index, arr)=> {
          arr.map(elem=> {
            if (elem.periodSection.id!==item.periodSection.id){
              isOne=false;
            }
            if (elem.periodYear.id!==item.periodYear.id){
              isOne=false;
            }
          })
        })

        isOne ? this.props.history.push({
          pathname: '/contract/acts/paymentrequestadd',
          state: {
            data: act.content.filter(x => this.state.selectedRowKeys.findIndex(a => x.id === a) !== -1),
            type: 'act'
          },
        }) : Modal.error({
          title: 'Ошибка',
          content: 'Нельзя создать заявку на разные учетные периоды',
        });

      }

      }}
      visible={true}>
      <Spin spinning={this.props.loading}>
        <div className={style.DogovorModal}>
          <SmartGridView
            scroll={{ x: 'auto', y:280 }}
            name={'ActModal'}
            actionColumns={this.state.fcolumn}
            columns={this.state.columns}
            showTotal={true}
            selectedRowCheckBox={true}
            selectedRowKeys={this.state.selectedRowKeys}
            actionExport={() => {
            }}
            dataSource={{
              total: act ? act.totalElements : 0,
              pageSize: this.state.gridParameters.length,
              page: this.state.gridParameters.start + 1,
              data: act ? act.content : [],
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
              this.setState({
                selectedRowKeys: selectedRowKeys,
              });
            }}
          />
        </div>
      </Spin>
    </Modal>);
  };
}

