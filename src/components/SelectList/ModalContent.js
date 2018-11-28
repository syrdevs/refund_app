import React, { Component } from 'react';
import {
  Card,
  Tabs,
  Table,
  Icon,
  Menu,
  Dropdown,
  Modal,
  Button,
  Label,
  Pagination,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Checkbox,
  Spin,
  LocaleProvider,
  Divider,
} from 'antd';
import './index.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard, faColumns } from '@fortawesome/free-solid-svg-icons/index';
import { Resizable } from 'react-resizable';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import componentLocal from '../../locales/components/componentLocal';
import { connect } from 'dva';

const Search = Input.Search;


@connect(({ references, loading }) => ({
  references,
  loadingData: loading.effects['references/load'],
}))
export default class ModalContent extends Component {
  state = {
    selectedRow: false,
    okBtnDisabled: true,
    selectedRecord: false,
    selectedRowKeys: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'references/load',
      code: 'knp',
    });
  }

  componentWillUnmount() {

  }

  handleOk = () => {
    // to do name reference
    var records = this.props.references['knp'].filter(x => this.state.selectedRowKeys.findIndex(a => a === x.id) >= 0);
    this.props.onSelect(this.props.multipleSelect ? records : this.state.selectedRecord);
  };
  handleCancel = () => {
    this.props.hideModal();
  };

  onSearch = (value) => {
    console.log('search ' + value);
  };


  render = () => {

    const dataSource = this.props.references['knp'];

    const columns = [{
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: 'Наименование',
      dataIndex: 'nameRu',
      key: 'nameRu',
    }];


    let tableOptions = {
      rowKey: 'id',
      useFixedHeader: true,
      scroll: {
        y: 250,
      },
    };

    if (!this.props.multipleSelect) {
      tableOptions.rowClassName = (record, index) => {
        return this.state.selectedRow === index ? 'active' : '';
      };
    }

    tableOptions.onRow = (record, index) => ({
      onClick: () => this.setState({
        selectedRecord: record,
        selectedRow: index,
        okBtnDisabled: false,
      }),
    });

    if (this.props.multipleSelect) {
      tableOptions.rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          if (selectedRowKeys.length > 0)
            this.setState({ selectedRowKeys: selectedRowKeys, okBtnDisabled: false });
        },
      };
    }


    return (<Modal
      width={700}
      title="Информация"
      okButtonProps={{
        disabled: this.state.okBtnDisabled,
      }}
      style={{ top: 40 }}
      okText={'Выбрать'}
      visible={this.props.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}>
      <Search
        placeholder="введите текст"
        onSearch={value => this.onSearch(value)}
        enterButton
      />
      <br/>
      <br/>
      <p>Список:</p>
      <Spin spinning={this.props.loadingData}>
        <Table
          {...tableOptions}
          className={'ant_modal_grid'}
          size={'small'}
          dataSource={dataSource}
          columns={columns}/>
      </Spin>
    </Modal>);
  };
}
