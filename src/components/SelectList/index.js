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


export default class SelectList extends Component {
  state = {

    modalForm: {
      visible: false,
    },
    inputEl: {
      value: null,
    },
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


  render = () => {

    return (<div>
      <Input value={this.state.inputEl.value}
             readOnly
             addonAfter={<Icon style={{ cursor: 'pointer' }}
                               onClick={() => this.showModal()}
                               type="bars"/>}/>
      {this.state.modalForm.visible &&
      <ModalContent
        {...this.state.modalForm}
        name={this.props.name}
        onSelect={(record) => {
          this.hideModal();
          this.props.onSelect(record);
          this.setState(state => ({
            inputEl: {
              ...state.inputEl,
              value: record.code + ' - ' + record.nameRu,
            },
          }));
        }}
        hideModal={() => this.hideModal()}/>}

    </div>);
  };
}
