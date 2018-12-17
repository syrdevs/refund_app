import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card, Tag } from 'antd';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';

export default class SpecPage extends Component {
  state = {
    smarttabDataSource: [],
    columns: [
      {
        title: 'Код',
        dataIndex: 'code',
        width: '10%',
      },
      {
        title: 'Вид деятельности',
        dataIndex: 'activity.name',
        width: 300,
      },
      {
        title: 'Способ оплаты',
        dataIndex: 'activity.paymentType.nameRu',
        width: '10%',
      },
      {
        title: 'Единица',
        dataIndex: 'measureUnit.nameRu',
        width: '10%',
        render: (text) => {
          return <Tag style={{ fontSize: '14px' }} color="blue">{text}</Tag>;
        },
      },
      {
        title: 'Всего',
        children: [
          {
            title: 'Количество',
            dataIndex: 'value',
            width: '10%',
          }, {
            title: 'Тариф (₸)',
            dataIndex: 'tariffItem.tariffValue',
            isVisible: true,
            order: 2,
            width: '10%',
            key: 'tariff',
          },
          {
            title: 'Сумма (₸)',
            dataIndex: 'valueSum',
            isVisible: true,
            order: 2,
            width: '10%',
            key: 'valueSum',
          },
          {
            title: 'Аванс (₸)',
            dataIndex: 'sumAdvance',
            isVisible: true,
            order: 2,
            width: '10%',
            key: 'sumAdvance',
          }],
      },
    ],
  };

  renderData = () => {
    if (this.props.formData.contractItems) {

      let dataSource = [];
      let _index = 0;


      this.props
        .formData
        .contractItems
        .forEach((item) => {

          if (item.contractItemValues) {
            return item.contractItemValues.forEach((contractItem) => {

              let itemResult = {
                itemId: item.id,
                activity: item.activity,
                key: _index++,
                contractTimeItem: {},
                percentAdvance: 0,
              };

              Object.keys(item.activity).forEach((contractKey) => {
                itemResult[contractKey] = item.activity[contractKey];
              });

              Object.keys(contractItem).forEach((contractItemKey) => {
                if (contractItemKey !== 'contractTimeTables' && contractItemKey !== 'id')
                  itemResult[contractItemKey] = contractItem[contractItemKey];
              });

              if (contractItem.contractTimeTables) {
                contractItem.contractTimeTables.forEach((monthItem) => {
                  itemResult.contractTimeItem[monthItem.periodSection.index] = monthItem;
                });
              }

              dataSource.push(itemResult);
            });
          }
        });


      this.setState({
        smarttabDataSource: dataSource,
        smarttabcount: dataSource.length,
      });

    }
  };

  renderMonthColumns = () => {


    let smartdataColumns = {};
    let data = {
      'contractTimeTables': [
        {
          'id': 'b4ed338a-b86d-442b-b7a1-066437a61c56',
          'periodSection': {
            'id': 'ec16e8c2-191a-4b14-a21a-e5804c781582',
            'status': 'Открыт',
            'index': '04',
            'name': 'Апрель',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': 'a6c0afa1-da39-4319-b47f-179eac256454',
          'periodSection': {
            'id': 'eb3628bf-d0b6-4760-bafe-64a85fcf817b',
            'status': 'Открыт',
            'index': '07',
            'name': 'Июль',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': '142f2bf1-6815-49a8-9666-4152c0073af0',
          'periodSection': {
            'id': 'b5c47f41-99d0-4cee-a83c-df21f28ebdb5',
            'status': 'Открыт',
            'index': '02',
            'name': 'Февраль',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': 'd8fe0e65-c3ad-43f1-b28e-628703b26a09',
          'periodSection': {
            'id': 'f1f2ac96-f6f6-4bd1-90dd-85d1e274622c',
            'status': 'Открыт',
            'index': '01',
            'name': 'Январь',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': 'ddc8168d-192d-4f9e-932a-7afda17426ba',
          'periodSection': {
            'id': '70595496-9faf-4fe0-833c-09deed7488c8',
            'status': 'Открыт',
            'index': '11',
            'name': 'Ноябрь',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': '50f60dd7-69b4-469c-b1ef-8a2e04c65820',
          'periodSection': {
            'id': '7b5daf7d-acf5-479b-81e1-3b0ee2e68e8a',
            'status': 'Открыт',
            'index': '05',
            'name': 'Май',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': '08bfdf1c-6a25-47ec-97a0-9b89c2c4f0b3',
          'periodSection': {
            'id': '99d4c419-4bd5-4741-9bd8-1a9b7f8ddc46',
            'status': 'Открыт',
            'index': '06',
            'name': 'Июнь',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': 'e481a0d9-0f59-4cec-a02e-b237f4de057a',
          'periodSection': {
            'id': 'f18680f6-6387-42e1-940d-62d0a5ce0900',
            'status': 'Открыт',
            'index': '03',
            'name': 'Март',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': '17f8666e-6086-401d-a901-cce905f4b272',
          'periodSection': {
            'id': 'f4e8188b-64c9-408f-bd9f-34cc0ed70995',
            'status': 'Открыт',
            'index': '12',
            'name': 'Декабрь',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': 'b5aabc37-1a60-4100-a5a2-d6fd28fc96a4',
          'periodSection': {
            'id': 'c838383d-36c0-469a-8e3d-8aefa5628be0',
            'status': 'Открыт',
            'index': '10',
            'name': 'Октябрь',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': '7112e2b4-a5be-4a7d-9fb5-f10c357d7d58',
          'periodSection': {
            'id': '7dbcf2de-4193-4d8c-8d0f-e7529e236ed7',
            'status': 'Открыт',
            'index': '08',
            'name': 'Август',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
        {
          'id': '2b9846b6-0bb3-4734-bfc9-fac38bf29fa6',
          'periodSection': {
            'id': 'e86fa194-bbae-4897-8110-0e66ce52a3e4',
            'status': 'Открыт',
            'index': '09',
            'name': 'Сентябрь',
          },
          'valueSection': 0,
          'sumSection': 0,
          'sumAdvanceTakeout': 0,
        },
      ],
    };
    let extraColumns = [];

    // let monthList = [
    //   'Январь',
    //   'Февраль',
    //   'Март',
    //   'Апрель',
    //   'Май',
    //   'Июнь',
    //   'Июль',
    //   'Август',
    //   'Сентябрь',
    //   'Октябрь',
    //   'Ноябрь',
    //   'Декабрь',
    // ];

    data.contractTimeTables
      .sort((a, b) => {
        if (a.periodSection.index < b.periodSection.index)
          return -1;
        if (a.periodSection.index > b.periodSection.index)
          return 1;
        return 0;
      })
      .forEach((recordItem) => {
        let monthColumn = {
          title: recordItem.periodSection.name,
          children: [
            {
              title: 'Количество',
              key: `periodSection${recordItem.periodSection.index}.valueSection`,
              width: 200,
              render: (record) => {

                let defaultValue = record.contractTimeItem ? record.contractTimeItem[recordItem.periodSection.index] : {};
                if (defaultValue) {
                  return <span>{defaultValue.hasOwnProperty('valueSection') ? defaultValue.valueSection : 0}</span>;
                }

                return '';
              },
            },
            {
              title: 'Сумма, т',
              key: `periodSection${recordItem.periodSection.index}.sumSection`,
              width: 200,
              render: (record) => {
                let defaultValue = record.contractTimeItem ? record.contractTimeItem[recordItem.periodSection.index] : {};

                if (defaultValue) {
                  return <span>{defaultValue.hasOwnProperty('sumSection') ? defaultValue.sumSection : 0}</span>;
                }
                return '';
              },
            },
            {
              title: 'Сумма аванса, т',
              key: `periodSection${recordItem.periodSection.index}.sumAdvanceTakeout`,
              width: 200,
              render: (record) => {
                let defaultValue = record.contractTimeItem ? record.contractTimeItem[recordItem.periodSection.index] : {};
                if (defaultValue) {
                  return <span>{defaultValue.hasOwnProperty('sumAdvanceTakeout') ? defaultValue.sumAdvanceTakeout : 0}</span>;
                }

                return '';
              },
            },
          ],
        };

        extraColumns.push(monthColumn);
      });


    data.contractTimeTables.forEach((item) => {
      smartdataColumns[item.periodSection.index] = {};
    });

    this.setState(prevState => ({
      columns: prevState.columns.concat(extraColumns),
    }));
  };

  componentDidMount() {

    this.renderMonthColumns();

    const { formData } = this.props;

    if (formData.contractItems) {
      this.renderData();
    }
  };


  render = () => {
    return (<Card bodyStyle={{ padding: 5 }} style={{ marginLeft: '-10px' }}>
      <Table
        scroll={{
          x: 1200,
        }}
        pagination={false}
        bordered={true}
        dataSource={this.state.smarttabDataSource}
        columns={this.state.columns}/>
    </Card>);
  };
}
