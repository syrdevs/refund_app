import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Card,
  Table,
  Icon,
  Menu,
  Input,
  Dropdown,
  Button,
  Checkbox,
  Tabs,
  Label,
  Select,
  Row,
  Col,
  Calendar, Badge,
  Spin,
  DatePicker,
  LocaleProvider,
  Pagination,
  Modal,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { formatMessage, FormattedMessage } from 'umi/locale';
import componentLocal from '../../locales/components/componentLocal';
import ru_RU from 'antd/lib/locale-provider/ru_RU';
import saveAs from 'file-saver';

@connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects['universal2/formedReports'],
}))
export default class ReportsGrid extends Component {
  state = {

    selectedRow: null,

    isErrorReport: false,

    _configTimer: {

      second: 1000,
      count: 5,
    },

    tasks: [],

    dataSource: [],

    pagingConfig: {
      'start': 0,
      'length': 15,
      'filter': {},
      'entity': 'report_history',
    },

    columns: [
      {
        title: '№',
        dataIndex: 'index',
        render: (e, record, index) => {
          return index + 1;
        },
      }, {
        title: 'Наименование на казахском',
        dataIndex: 'reportId.nameKz',
      }, {
        title: 'Наименование на русском',
        dataIndex: 'reportId.nameRu',
      }, {
        title: 'Дата',
        dataIndex: 'entryDate',
      }, {
        title: 'Пользователь',
        dataIndex: 'userId.userName',
      }, {
        title: 'Формат',
        dataIndex: 'ext',
      }, {
        title: 'Действие',
        align: 'center',
        dataIndex: 'action_column',
        width: 80,
        onCell: record => {
          return {
            onClick: () => {
              if (record.status === 2) {
                Modal.error({
                  title: 'Ошибка',
                  content: record.message,
                });
              }
              if (record.status === 1) {
                this.downloadFile(record);
              }
            },
          };
        },
        render: (e, record) => {

          let status = record.status;

          switch (status) {
            case 0: {
              return <Icon spin><FontAwesomeIcon icon={faSpinner}/></Icon>;
            }
            case 1: {
              return <Button>{formatMessage({ id: 'system.download' })}</Button>;
            }
            case 2: {
              return <Button style={{ 'color': 'red' }}>{formatMessage({ id: 'system.error' })}</Button>;
            }
            default:
              return <Icon spin><FontAwesomeIcon icon={faSpinner}/></Icon>;
          }

        },
      }],

  };

  /*shouldComponentUpdate(nextProps, nextState, nextContext) {

  }*/


  downloadFile = async (param) => {

    let authToken = localStorage.getItem('token');

    fetch('api/report/getReportResult?id=' + param.id,
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + authToken,
        },
      })
      .then(response => {
        if (response.ok) {
          return response.blob().then(blob => {
            let disposition = response.headers.get('content-disposition');
            return {
              fileName: this.getFileNameByContentDisposition(disposition),
              raw: blob,
            };
          });
        }
      })
      .then(data => {
        if(data){
          saveAs(data.raw, data.fileName);
        }
      });

    ///api/report/getReportResult?id=

    /* var link = document.createElement('a');
     link.href = 'https://www.7-zip.org/a/7z1805.exe';
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);*/
  };
  getFileNameByContentDisposition=(contentDisposition)=>{
    let regex = /filename[^;=\n]*=(UTF-8(['"]*))?(.*)/;
    let matches = regex.exec(contentDisposition);
    let filename;
    let filenames;
    if (matches != null && matches[3]) {
      filename = matches[3].replace(/['"]/g, '');
      let match = regex.exec(filename);
      if (match != null && match[3]) {
        filenames = match[3].replace(/['"]/g, '').replace('utf-8','');
      }
    }
    return decodeURI(filenames);
  };

  createTask = async (result) => {

    let intervalOrder = {
      key: result.id,
      count: this.state._configTimer.count,
      clear: () => {
        clearInterval(timer);
      },
    };

    let timer = setInterval(() => {
      intervalOrder.count--;

      this.getOrder(result.id, intervalOrder.count, () => {
        intervalOrder.clear();
        this.removeTask(result.id);
      });

    }, this.state._configTimer.second);

    this.setState(prevState => ({
      tasks: [...prevState.tasks, intervalOrder],
    }));
  };

  removeTask(taskItem) {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(x => x.key !== taskItem),
    }));
  }

  getOrder = async (taskItem, count, call) => {
    let token = localStorage.getItem('token');

    const res = await fetch('/api/report/getReportStatus?id=' + taskItem, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    });
    const json = await res.json();

    if (json.status !== 0) {
      this.setStatus(taskItem, json, call);
    } else if (count === 0) {
      this.setStatus(taskItem, { status: 2, message: formatMessage({ id: 'system.system.timeout' }) }, call);
    }
  };

  setStatus = async (taskItem, json, call) => {

    const { dataSource } = this.state;
    let _dataSource = [];


    dataSource.forEach((item) => {
      if (item.id === taskItem) {
        item.status = json.status;
        //item.message = json.message;
      }
      _dataSource.push(item);
    });

    this.setState({
      dataSource: _dataSource,
    }, () => {
      call();
    });

  };

  saveOrder = async () => {

    let token = localStorage.getItem('token');

    const res = await fetch('/api/report/createReport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        'id': this.props.record.id,
        'parameters': this.props.filterData,
      }),
    });

    let result = await res.json();
    result.reportId = this.props.record;

    this.setState(prevState => ({
      isErrorReport: !prevState.isErrorReport,
      dataSource: [result, ...prevState.dataSource],
    }), () => {
      this.createTask(result);
    });
  };

  componentDidUpdate() {
    if (this.props.formingReport) {
      this.props.unReport();
      this.saveOrder();
    }
  }

  componentWillUnmount() {
    console.log('did unmount');
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'universal2/formedReports',
      payload: this.state.pagingConfig,
    }).then(() => {
      if (this.props.formingReport) {
        this.props.unReport();
        this.saveOrder();
      }
    });


  }

  onShowSizeChange = (current, pageSize) => {

    const max = current * pageSize;
    const min = max - pageSize;
    const { dispatch } = this.props;
    this.setState({
      dataSource: [],
    });
    dispatch({
      type: 'universal2/formedReports',
      payload: {
        ...this.state.pagingConfig,
        start: current,
        length: pageSize,
      },
    });
  };

  render() {

    const { columns } = this.state;

    return (<Spin spinning={this.props.loadingData}><Table
      size={'small'}
      rowClassName={(record, index) => {
        return this.state.selectedRow === index ? 'active' : '';
      }}
      onRow={(record, index) => {
        return {
          onClick: () => {
            this.setState({
              selectedRow: index,
            });
          },
        };
      }}
      rowKey={'id'}
      columns={columns}
      bordered={true}
      pagination={false}
      dataSource={this.props.universal2.reportFormedData.content ? this.state.dataSource.concat(this.props.universal2.reportFormedData.content) : []}/>
      <br/>
      <LocaleProvider locale={componentLocal}>
        <Pagination
          defaultPageSize={15}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          showSizeChanger
          pageSizeOptions={['15', '30', '40', '50', '100']}
          onShowSizeChange={(page, pageSize) => {
            this.onShowSizeChange(page - 1, pageSize);
          }}
          onChange={(page, pageSize) => {
            this.onShowSizeChange(page - 1, pageSize);
          }}
          defaultCurrent={this.state.pagingConfig.start + 1}
          total={this.props.universal2.reportFormedData.totalElements}
        />
      </LocaleProvider>
    </Spin>);
  }
}
