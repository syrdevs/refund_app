import React, { Component } from 'react';
import ContractMain from './ContractMain';
import ContractCreateModal from './ContractCreate';
import ContractService from './ContractService';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Card,
} from 'antd';

export default class ContractPage extends Component {
  state = {
    modal: {
      contractModal: {
        visible: false,
      },
    },
  };

  componentDidMount = () => {

  };

  contractCreateModal = (selectedData) => {
    this.setState(prevState => ({
      modal: {
        ...prevState.modal,
        contractModal: {
          visible: true,
        },
      },
    }));
  };

  contractCreateHideModal = () => {
    this.setState(prevState => ({
      modal: {
        ...prevState.modal,
        contractModal: {
          visible: false,
        },
      },
    }));
  };

  render = () => {
    return (<PageHeaderWrapper title={formatMessage({ id: 'app.module.contracts.title' })}>

      {this.state.modal.contractModal.visible && <ContractCreateModal hideModal={this.contractCreateHideModal}/>}


      <Card bodyStyle={{ padding: 5 }}>
        <ContractMain createContract={(selectedData) => this.contractCreateModal(selectedData)}/>
      </Card>
    </PageHeaderWrapper>);
  };
};
