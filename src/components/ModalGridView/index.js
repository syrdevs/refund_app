import React, { Component } from 'react';
import { Modal, Tabs, Table, Button, Spin } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import SmartGridView from '@/components/SmartGridView';

const TabPane = Tabs.TabPane;

@connect(({ universal, loading }) => ({
  universal,
  loadingFirst: loading.effects['universal/mt102preview'],
  loadingData: loading.effects['universal/mt102view'],
}))
export default class ModalGridView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      dataColumn: [],
      isVisible: false,
      filter: {
        'start': 0,
        'length': 15,
        'src': {
          'searched': false,
          'data': {},
        },
      },
      fcolumn: [
        {
          title: formatMessage({ id: 'menu.mainview.fio' }),
          order: 3,
          key: 'fio',
          isVisible: true,
          width: 150,
          render: (item) => {
            //console.log(i);
            return item.personSurname + ' ' + item.personFirstname + ' ' + item.personPatronname;
          },
        }
      ],
      columns: [{
        'title': 'Номер заявки',
        'isVisible': true,
        'dataIndex': 'applicationId.appNumber',
      }, {
        'title': 'Сумма возврата',
        'isVisible': true,
        'dataIndex': 'refundPayAmount',
      }, {
        'title': 'ИИН Потребителя',
        'isVisible': true,
        'dataIndex': 'personIin',
      },
      {
        'title': 'КНП',
        'isVisible': true,
        'dataIndex': 'applicationId.dknpId.id',
      }, {
        'title': 'Период',
        'isVisible': true,
        'dataIndex': 'payPeriod',
      }]
    };
  }

  componentWillReceiveProps(props, prevProps) {
    if (props != null) {
      this.setState({
        isVisible: props.visible
      });
    }
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    this.setState({
      filter: this.props.filter
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/mt102preview',
      payload: {
        ...this.props.filter,
      },
    }).then((e)=>{
      if(this.props.universal.refundKnpList.length>0) {
        this.setState({
          filter: {
            start: this.state.filter.start,
            length: this.state.filter.length,
            src: {
              searched: this.state.filter.src.searched,
              data: {
                ...this.state.filter.src.data,
                knpId:this.props.universal.refundKnpList[0].knpId
              },
            },
          },
          dataSource: this.props.universal.modalgridviewdata,
          dataColumn:  this.props.universal.refundKnpList,
        })
      }
    });
  }

  handleCancel = (e) => {
    this.props.resetshow();
  };
  onChangetab = (e) => {
    this.setState({
      filter: {
        start: this.state.filter.start,
        length: this.state.filter.length,
        src: {
          searched: this.state.filter.src.searched,
          data: {
            ...this.state.filter.src.data,
            knpId:e
          },
        },
      }
    })
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/mt102view',
      payload: {
        ...this.state.filter,
      },
    }).then(()=>{
      this.setState({
        dataSource: this.props.universal.modalgridviewdata,
        dataColumn:  this.props.universal.refundKnpList,
      })
    });
  };

  handleSave = () => {
    console.log(this.props);
  }

  onShowSizeChange = (current, pageSize) => {
    const max = current * pageSize;
    const min = max - pageSize;
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/mt102view',
      payload: {
        ...this.state.filter,
        start: current,
        length: pageSize,
      },
    }).then(()=>{
      this.setState({
        dataSource: this.props.universal.modalgridviewdata,
        dataColumn:  this.props.universal.refundKnpList,
      })
    });
  };

  render() {

    const { visible, universal } = this.props;
    return (<Modal
      width={1000}
      centered
      onCancel={this.handleCancel}
      footer={[<Button key={'savemt'} onClick={this.handleSave}>{formatMessage({id:"form.save"})}</Button>, <Button key={'exportExcel'}>{formatMessage({id:"system.excelExport"})}</Button>,
        <Button key={'closeExcel'} onClick={this.handleCancel}>{formatMessage({id:"system.close"})}</Button>]}
      visible={visible}>
      <Spin tip={formatMessage({ id: 'system.loading' })} spinning={this.props.loadingFirst}>
        <Tabs onChange={this.onChangetab}>
          {this.state.dataColumn.map((tabItem) => {
            return (<TabPane tab={tabItem.knpId} key={tabItem.knpId}>
              <span>{formatMessage({id:"system.totalAmount"})}: {tabItem.totalAmount}</span>
              <Spin tip={formatMessage({ id: 'system.loading' })} spinning={this.props.loadingData}>
              <SmartGridView
                name={'mt102ModalPageColumns'}
                scroll={{ x: 'auto' }}
                actionColumns={this.state.fcolumn}
                columns={this.state.columns}
                hideFilterBtn={true}
                hideRefreshBtn={true}
                dataSource={{
                  total: this.state.dataSource.totalElements,
                  pageSize: this.state.filter.length,
                  page: this.state.filter.start + 1,
                  data: this.state.dataSource.content,
                }}
                addonButtons={[]}

                onShowSizeChange={(pageNumber, pageSize) => {
                  this.onShowSizeChange(pageNumber, pageSize);
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
                onSelectCheckboxChange={(selectedRowKeys) => {

                }}
              />
              </Spin>
            </TabPane>);
          })}
        </Tabs>
      </Spin>
    </Modal>);
  }
}


