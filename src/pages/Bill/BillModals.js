import React, { Component } from 'react';
import { Modal, Tabs, Table, Button, Spin } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import SmartGridView from '@/components/SmartGridView';
import saveAs from 'file-saver';
import style from '../CounterAgent/Modals/ContragentModalStyle.less';

const TabPane = Tabs.TabPane;

@connect(({ universal, universal2, loading }) => ({
  universal,
  loadingFirst: loading.effects['universal/mt102preview'],
  loadingData: loading.effects['universal/mt102view'],
}))
export default class BillModals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      downloadBtn102Loading: false,
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
      fcolumn: [ ],
      actcolumns: [
        {
          title: 'Отчетный период(Год)',
          dataIndex: 'periodYear.year',
          isVisible: true,
          width : 80,
        },
        {
          title: 'Отчетный период(Месяц)',
          dataIndex: 'periodSection.periodSectionName',
          isVisible: true,
          width : 120,
        },
        {
          title: 'БИН',
          dataIndex: 'contragent.bin',
          isVisible: true,
          width : 120,
        },
        {
          title: 'Контрагент',
          dataIndex: 'contragent.organization',
          isVisible: true,
          width : 400,
        },
        {
          title: 'Договор',
          dataIndex: 'contract.number',
          isVisible: true,
          width : 120,
        },
        {
          title: 'Номер',
          dataIndex: 'number',
          isVisible: true,
          width : 120,
        },
        {
          title: 'Дата',
          dataIndex: 'documentDate',
          isVisible: true,
          width : 120,
        },
        {
          title: 'Оплата',
          dataIndex: 'documentSum',
          isVisible: true,
          width : 120,
        },
        {
          title: 'Подразделение',
          dataIndex: 'division.name',
          isVisible: true,
          width : 120,
        },
      ],
    };
  }

  componentWillReceiveProps(props, prevProps) {
    if (props != null) {
      this.setState({
        isVisible: props.visible,
      });
    }
  }

  componentWillUnmount() {
  }

  componentDidMount() {

    const filter = this.props.filter;
    filter.src.data.dappRefundStatusList = [{ id: '8050e0eb-74c0-48cd-9bd5-5089585cc577' }];
    this.setState({
      filter: filter,
    }, () => {
      this.firstLoad();
    });

  }

  firstLoad = () => {
    const { dispatch } = this.props;
    const { filter } = this.state;
    dispatch({
      type: 'universal/mt102preview',
      payload: {
        ...filter,
      },
    }).then((e) => {
      if (this.props.universal.refundKnpList.length > 0) {
        this.setState({
          filter: {
            start: this.state.filter.start,
            length: this.state.filter.length,
            src: {
              searched: this.state.filter.src.searched,
              data: {
                ...this.state.filter.src.data,
                knpList: { id: this.props.universal.refundKnpList[0].id },
              },
            },
          },
          dataSource: this.props.universal.modalgridviewdata,
          dataColumn: this.props.universal.refundKnpList,
        });
      } else {
        this.props.resetshow();
        Modal.info({
          title: 'Сообщение',
          content: (
            <div>
              <p>Информация для формирования МТ102 отсутствует</p>
            </div>
          ),
          onOk() {
          },
        });
      }
    });
  };

  handleCancel = (e) => {
    this.props.resetshow();
  };
  onChangetab = (e, a, b) => {
    const { dispatch } = this.props;

    this.setState({
      filter: {
        start: this.state.filter.start,
        length: this.state.filter.length,
        src: {
          searched: this.state.filter.src.searched,
          data: {
            ...this.state.filter.src.data,
            knpList: { id: e },
          },
        },
      },
    }, () => {
      dispatch({
        type: 'universal/mt102view',
        payload: {
          ...this.state.filter,
        },
      }).then(() => {
        this.setState({
          dataSource: this.props.universal.modalgridviewdata,
          dataColumn: this.props.universal.refundKnpList,
        });
      });
    });

  };

  downloadFile() {

    let authToken = localStorage.getItem('token');

    this.setState({
      downloadBtn102Loading: true,
    });

    fetch('/api/refund/mt102GroupByKnp',
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + authToken,
        },
        method: 'post',
        body: JSON.stringify(this.state.filter.src),
      })
    // .then(response => response.blob())
    // .then(responseBlob => {
    //   this.setState({
    //     downloadBtn102Loading: false,
    //   });
    //
    //   let blob = new Blob([responseBlob], { type: responseBlob.type }),
    //     url = window.URL.createObjectURL(blob);
    //   window.open(url, '_self');
    // });
      .then(response => {
        if (response.ok) {
          return response.blob().then(blob => {
            let disposition = response.headers.get('content-disposition');
            console.log(this.getFileNameByContentDisposition(disposition));
            return {
              fileName: this.getFileNameByContentDisposition(disposition),
              raw: blob,
            };
          });
        }
      })
      .then(data => {
        this.setState({
          downloadBtn102Loading: false,
        });
        if (data) {
          saveAs(data.raw, data.fileName);
        }
      });

  };
  getFileNameByContentDisposition=(contentDisposition)=>{
    var filename = "";
    if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      var matches = filenameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }
    }

    return filename;
  };

  handleSave = () => {
    this.downloadFile();
  };

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
    }).then(() => {
      this.setState({
        dataSource: this.props.universal.modalgridviewdata,
        dataColumn: this.props.universal.refundKnpList,
      });
    });
  };

  render() {
    const { visible, universal } = this.props;
    return (<Modal
      width={1200}
      centered
      onCancel={this.handleCancel}
      footer={[<Button loading={this.state.downloadBtn102Loading} key={'checkAct'} onClick={console.log("")}>Выбрать</Button>,
        <Button key={'closeAct'} onClick={console.log('close')}>{formatMessage({ id: 'system.close' })}</Button>]}
      visible={visible}>
      <Spin tip={formatMessage({ id: 'system.loading' })} spinning={this.props.loadingFirst}>
              <Spin tip={formatMessage({ id: 'system.loading' })} spinning={false}>
                <div className={style.DogovorModal}>
                  <SmartGridView
                    name={'actmodaltable'}
                    scroll={{ y: '1000' }}
                    actionColumns={this.state.fcolumn}
                    columns={this.state.actcolumns}
                    hideFilterBtn={true}
                    showTotal={true}
                    rowKey={'id'}
                    hideRefreshBtn={true}
                    dataSource={{
                      total: this.state.dataSource.totalElements,
                      pageSize: this.state.filter.length,
                      page: this.state.filter.start + 1,
                      data: this.state.dataSource.content,
                    }}
                    addonButtons={[
                      <div key={"total_amount"} style={{
                        paddingTop: 15,
                        display: 'inline-block',
                      }}>{formatMessage({ id: 'system.totalAmount' })}: 123456</div>]}

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
                </div>
              </Spin>
      </Spin>
    </Modal>);
  }
}


