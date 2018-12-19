import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card } from 'antd';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';

export default class InfoPage extends Component {
  state = {
    columns: [{
      title: 'Наименование',
      dataIndex: 'name',
      render: (text) => <div style={{ color: 'black' }}>{text}</div>,
      width: 100,

    }, {
      title: 'Значения',
      dataIndex: 'value',
      key: 'value',
      width: 150,
      render: (text, record) => {
        if (record.href) {
          return <div
            style={{
              color: '#1890ff',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => {
              window.open('viewcontract?id=' + record.href);
            }}>{text}</div>;
        }
        return text;
      },
    }],
  };

  render = () => {

    const { formData } = this.props;
    let dataSourceItem = [];

    if (formData.parentContract) {
      dataSourceItem.push({
        href: formData.parentContract.id,
        name: 'Родительский договор',
        value: `${formData.parentContract.contractType}  №${formData.parentContract.number} от ${formData.parentContract.documentDate}`,
      });
    }

    if (formData.planProtocol) {
      dataSourceItem.push({
        name: 'Протокол распределения объемов',
        value: `№${formData.planProtocol.number} от ${formData.planProtocol.number}`,
      });
    }

    if (formData.proposal) {
      dataSourceItem.push({
        name: 'Заявка на объемы',
        value: `№${formData.proposal.number} от ${formData.proposal.number}`,
      });
    }

    if (formData.periodYear) {
      dataSourceItem.push({
        name: 'Учетный период: год',
        value: formData.periodYear.year,
      });
    }

    if (formData.contractType) {
      dataSourceItem.push({
        name: 'Вид договора',
        value: formData.contractType.nameRu,
      });
    }

    if (formData.contractAlterationReasons) {
      dataSourceItem.push({
        name: 'Причина',
        value: formData.contractAlterationReasons[0].dictionaryBase.nameRu,
      });
    }

    if (formData.number) {
      dataSourceItem.push({
        name: 'Номер',
        value: formData.number,
      });
    }

    if (formData.documentDate) {
      dataSourceItem.push({
        name: 'Дата',
        value: formData.documentDate,
      });
    }

    if (formData.dateBegin) {
      dataSourceItem.push({
        name: 'Дата начала',
        value: formData.dateBegin,
      });
    }

    if (formData.dateEnd) {
      dataSourceItem.push({
        name: 'Дата окончания',
        value: formData.dateEnd,
      });
    }

    if (formData.descr) {
      dataSourceItem.push({
        name: 'Комментарий',
        value: formData.descr,
      });
    }

    if (formData.division) {
      dataSourceItem.push({
        name: 'Подразделение',
        value: formData.division.name,
      });
    }


    return (<Card style={{ marginLeft: '-10px' }}>
      <div style={{ margin: '0px 15px', maxWidth: '70%' }}>
        <Table pagination={{ position: 'none' }}
               showHeader={false}
               columns={this.state.columns}
               dataSource={dataSourceItem}/>
      </div>
    </Card>);
  };
}
