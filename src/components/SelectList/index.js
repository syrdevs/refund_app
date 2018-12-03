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
import ModalContent from './ModalContent';

const Option = Select.Option;


export default class SelectList extends Component {
  state = {

    modalForm: {
      visible: false,
    },
    inputEl: {
      value: null,
    },

    selectedRecords: [],
  };

  hideModal = () => {
    this.setState((modalForm) => ({
      modalForm: {
        ...modalForm,
        visible: false,
      },
    }));
  };
  showModal = () => {
    this.setState((modalForm) => ({
      modalForm: {
        ...modalForm,
        visible: true,
      },
    }));
  };

  componentDidUpdate = () => {
    const { isClearFilter } = this.props;

    if (isClearFilter && this.state.inputEl.value !== null) {
      this.setState({
        inputEl: {
          value: null,
        },
      });
    }
  };

  render = () => {


    const children = [];
    this.state.selectedRecords.forEach((record, index) => {
      children.push(<Option key={index}>{record.nameRu}</Option>);
    });

    return (<div>
      <Input value={this.state.inputEl.value}
             readOnly
             addonAfter={<Icon style={{ cursor: 'pointer' }}
                               onClick={() => this.showModal()}
                               type="bars"/>}/>
      {(this.props.multipleSelect && this.state.selectedRecords.length > 0) && <Select
        mode="multiple"
        open={false}
        value={this.state.selectedRecords.map(x => x.nameRu)}
        style={{ width: '100%', marginTop: 5 }}
        onDeselect={(value) => {

          let removedRecords = this.state.selectedRecords.filter(x => x.nameRu !== value);

          this.setState({
            selectedRecords: removedRecords,
            inputEl: {
              value: 'Выбрано ' + removedRecords.length + ' элементов',
            },
          });

          this.props.onSelect(removedRecords);
        }}
      >
        {children}
      </Select>}
      {this.state.modalForm.visible &&
      <ModalContent
        {...this.state.modalForm}
        name={this.props.name}
        multipleSelect={this.props.multipleSelect}
        onSelect={(record) => {
          this.hideModal();
          if (this.props.multipleSelect) {
            this.setState({
              selectedRecords: record,
              inputEl: {
                value: 'Выбрано ' + record.length + ' элементов',
              },
            });
            this.props.onSelect(record);
          } else {
            this.props.onSelect(record);
            this.setState(state => ({
              inputEl: {
                ...state.inputEl,
                value: record.code + ' - ' + record.nameRu,
              },
            }));
          }
        }}
        hideModal={() => this.hideModal()}/>}

    </div>);
  };
}
