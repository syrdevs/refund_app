import React, { Component } from 'react';
import { Modal, Tabs, Table, Button, Spin } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import SmartGridView from '@/components/SmartGridView';
import saveAs from 'file-saver';

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
        },
      ],
      columns: [{
        'title': 'Номер заявки',
        width: 120,
        'isVisible': true,
        'dataIndex': 'applicationId.appNumber',
      }, {
        'title': 'Сумма возврата',
        width: 150,
        'isVisible': true,
        'dataIndex': 'refundPayAmount',
      }, {
        'title': 'ИИН Потребителя',
        'isVisible': true,
        width: 120,
        'dataIndex': 'personIin',
      }, {
        'title': 'КНП',
        'isVisible': true,
        'dataIndex': 'applicationId.dknpId.code',
      }, {
        'title': 'Период',
        'isVisible': true,
        width: 120,
        'dataIndex': 'payPeriod',
      }],
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
      width={1000}
      centered
      onCancel={this.handleCancel}
      footer={[<Button loading={this.state.downloadBtn102Loading} key={'savemt'} onClick={this.handleSave}>Скачать
        МТ102</Button>,
        <Button key={'exportExcel'}>{formatMessage({ id: 'system.excelExport' })}</Button>,
        <Button key={'closeExcel'} onClick={this.handleCancel}>{formatMessage({ id: 'system.close' })}</Button>]}
      visible={visible}>
      <Spin tip={formatMessage({ id: 'system.loading' })} spinning={this.props.loadingFirst}>
        <Tabs onChange={this.onChangetab}>
          {this.state.dataColumn.map((tabItem) => {
            return (<TabPane tab={tabItem.knpId} key={tabItem.id}>
              {/*<Spin tip={formatMessage({ id: 'system.loading' })} spinning={this.props.loadingData}>*/}
              <Spin tip={formatMessage({ id: 'system.loading' })} spinning={false}>
                <SmartGridView
                  name={'mt102ModalPageColumns'}
                  scroll={{ x: 'auto', y: 300 }}
                  actionColumns={this.state.fcolumn}
                  columns={this.state.columns}
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
                    }}>{formatMessage({ id: 'system.totalAmount' })}: {tabItem.totalAmount}</div>]}

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


