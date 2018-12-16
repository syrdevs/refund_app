import React, { Component } from 'react';
import { Card, List, Row, Col, Table, Spin } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva/index';
import SmartGridView from '../../components/SmartGridView';
import Input from 'antd/es/input';

@connect(({ universal, loading  }) => ({
  universal,
  loadingData: loading.effects['universal2/getList'],
}))
class Graphic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
      {
        title: 'Код',
        dataIndex: 'activity.code',
        key: 'activity.code',
        width: 200,
      },
      {
        title: 'Вид деятельности',
        dataIndex: 'activity.name',
        key: 'activity.name',
        width: 200,
      },
      {
        title: 'Способ оплаты',
        dataIndex: 'activity.paymentType.shortname',
        key: 'activity.paymentType',
        width: 200,
      },
      {
        title: 'Единица учета',
        dataIndex: 'measureUnit.shortname',
        key: 'measureUnit.shortname',
        width: 200,
      },
      {
        title: 'Всего',
        children: [
          {
            title: 'Количество',
            dataIndex: 'value',
            key: 'value',
            width: 200,
          },
          {
            title: 'Сумма, т',
            dataIndex: 'valueSum',
            key: 'valueSum',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            dataIndex: 'sumAdvance',
            key: 'sumAdvance',
            width: 200,
          }
        ]
      },
      {
        title: 'Остаток',
        dataIndex: 'remainder',
        key: 'remainder',
        width: 200,
      },
      {
        title: 'Январь',
        children: [
          {
            title: 'Количество',
            dataIndex: 'periodSection01.valueSection',
            key: 'periodSection01.valueSection',
            width: 200,
            render: (item) => {
              return <Input
                        value={item}
                        key={"test"}
                        onChange={(e)=>{this.OnChange(e)}}
                        ref={node => this.userNameInput = node}
              />;
            },
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection01.sumSection',
            key: 'periodSection01.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            dataIndex: 'periodSection01.sumAdvanceTakeout',
            key: 'periodSection01.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          }
        ]
      },
      {
        title: 'Февраль',
        children: [
          {
            title: 'Количество',
            dataIndex: 'periodSection02.valueSection',
            key: 'periodSection02.valueSection',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection02.sumSection',
            key: 'periodSection02.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            dataIndex: 'periodSection02.sumAdvanceTakeout',
            key: 'periodSection02.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          }
        ]
      },
      {
        title: 'Март',
        children: [
          {
            title: 'Количество',
            dataIndex: 'periodSection03.valueSection',
            key: 'periodSection03.valueSection',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection03.sumSection',
            key: 'periodSection03.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            dataIndex: 'periodSection03.sumAdvanceTakeout',
            key: 'periodSection03.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          }
        ]
      },
      {
        title: 'Апрель',
        children: [
          {
            title: 'Количество',
            dataIndex: 'periodSection04.valueSection',
            key: 'periodSection04.valueSection',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection04.sumSection',
            key: 'periodSection04.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            dataIndex: 'periodSection04.sumAdvanceTakeout',
            key: 'periodSection04.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          }
        ]
      },
      {
        title: 'Май',
        children: [
          {
            title: 'Количество',
            dataIndex: 'periodSection05.valueSection',
            key: 'periodSection05.valueSection',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection05.sumSection',
            key: 'periodSection05.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            dataIndex: 'periodSection05.sumAdvanceTakeout',
            key: 'periodSection05.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          }
        ]
      },
      {
        title: 'Июнь',
        children: [
          {
            title: 'Количество',
            dataIndex: 'periodSection06.valueSection',
            key: 'periodSection06.valueSection',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection06.sumSection',
            key: 'periodSection06.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            dataIndex: 'periodSection06.sumAdvanceTakeout',
            key: 'periodSection06.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          }
        ]
      },
      {
        title: 'Июль',
        children: [
          {
            title: 'Количество',
            dataIndex: 'periodSection07.valueSection',
            key: 'periodSection07.valueSection',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection07.sumSection',
            key: 'periodSection07.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            dataIndex: 'periodSection07.sumAdvanceTakeout',
            key: 'periodSection07.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          }
        ]
      },
      {
        title: 'Август',
        children: [
          {
            title: 'Количество',
            dataIndex: 'periodSection08.valueSection',
            key: 'periodSection08.valueSection',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection08.sumSection',
            key: 'periodSection08.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            dataIndex: 'periodSection08.sumAdvanceTakeout',
            key: 'periodSection08.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          }
        ]
      },
      {
        title: 'Сентябрь',
        children: [
          {
            title: 'Количество',
            dataIndex: 'periodSection09.valueSection',
            key: 'periodSection09.valueSection',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection09.sumSection',
            key: 'periodSection09.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            dataIndex: 'periodSection09.sumAdvanceTakeout',
            key: 'periodSection09.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          }
        ]
      },
      {
        title: 'Октябрь',
        children: [
          {
            title: 'Количество',
            dataIndex: 'periodSection10.valueSection',
            key: 'periodSection10.valueSection',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection10.sumSection',
            key: 'periodSection10.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            dataIndex: 'periodSection10.sumAdvanceTakeout',
            key: 'periodSection10.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          }
        ]
      },
      {
        title: 'Ноябрь',
        children: [
          {
            title: 'Количество',
            dataIndex: 'periodSection11.valueSection',
            key: 'periodSection11.valueSection',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection11.sumSection',
            key: 'periodSection11.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            dataIndex: 'periodSection11.sumAdvanceTakeout',
            key: 'periodSection11.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          }
        ]
      },
      {
        title: 'Декабрь',
        children: [
          {
            title: 'Количество',
            dataIndex: 'periodSection12.valueSection',
            key: 'periodSection12.valueSection',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection12.sumSection',
            key: 'periodSection12.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            dataIndex: 'periodSection12.sumAdvanceTakeout',
            key: 'periodSection12.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input value={item}/>;
            },
          }
        ]
      },
    ],
    };
  }
  /*gridParameters: {
    start: 0,
    length: 15,
    entity: "graphic",
    alias: "graphicList",
    filter: {},
    sort: [],
  },*/
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/getobject',
      payload: {
        "entity": "contract",
        "alias": null,
        "id": "E8A735FC-8CCC-47DD-A7D7-92A1C9B75EAA"
      },
    }).then(()=>{
    })
  }
  OnChange=(e)=>{
    this.setState({
      
    })
  }

  render() {
    const data =this.props.universal.getObjectData._contractItemValue;
   // console.log(contractItems ? contractItems.map((item)=> item.activity ) : [])
      //const data=[];
    /*(contractItems ? contractItems : []).forEach((item)=> {
      (item.contractItemValues ? item.contractItemValues : []).forEach(value => {
          data.push({
            activity: item.activity,
            ...value
          })
        })
      this.setState({
        loadData:false
      })
    })*/
    //console.log(data);

    return (<Row>
              <Card
                bordered={false}
                bodyStyle={{ padding: 5 }}
              >
                <Table
                  columns={this.state.columns}
                  dataSource={data ? data : []}
                  bordered
                  pagination={{ position: 'none' }}
                  scroll={{ x: '130%'}}
                />,
              </Card>
            </Row>);
  }
}

export default Graphic;

{/*<PageHeaderWrapper title={formatMessage({ id: 'menu.profile' })}>
  <Spin spinning={false}>
  </Spin>
</PageHeaderWrapper>*/}

