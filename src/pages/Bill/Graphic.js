import React, { Component } from 'react';
import { Card, List, Row, Col, Table, Spin } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva/index';
import SmartGridView from '../../components/SmartGridView';
import Input from 'antd/es/input';
import Button from 'antd/es/button';

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
            key: 'periodSection01.valueSection',
            width: 200,
            render: (item) => {
              return <Input
                        defaultValue={item.periodSection01.valueSection}
                        onChange={(e)=> {this.OnChangeperiod(item, "periodSection01", "valueSection",e)}}

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
            key: 'periodSection01.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection01.sumAdvanceTakeout}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection01", "sumAdvanceTakeout",e)}}
              />;
            },
          }
        ]
      },
      {
        title: 'Февраль',
        children: [
          {
            title: 'Количество',
            key: 'periodSection02.valueSection',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection02.valueSection}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection02", "valueSection",e)}}

              />;
            }
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection02.sumSection',
            key: 'periodSection02.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            key: 'periodSection02.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection02.sumAdvanceTakeout}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection02", "sumAdvanceTakeout",e)}}
              />;
            },
          }
        ]
      },
      {
        title: 'Март',
        children: [
          {
            title: 'Количество',
            key: 'periodSection03.valueSection',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection03.valueSection}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection03", "valueSection",e)}}

              />;
            }
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection03.sumSection',
            key: 'periodSection03.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            key: 'periodSection03.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection03.sumAdvanceTakeout}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection03", "sumAdvanceTakeout",e)}}
              />;
            },
          }
        ]
      },
      {
        title: 'Апрель',
        children: [
          {
            title: 'Количество',
            key: 'periodSection04.valueSection',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection04.valueSection}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection04", "valueSection",e)}}

              />;
            }
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection04.sumSection',
            key: 'periodSection04.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            key: 'periodSection04.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection04.sumAdvanceTakeout}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection04", "sumAdvanceTakeout",e)}}
              />;
            },
          }
        ]
      },
      {
        title: 'Май',
        children: [
          {
            title: 'Количество',
            key: 'periodSection05.valueSection',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection05.valueSection}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection05", "valueSection",e)}}

              />;
            }
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection05.sumSection',
            key: 'periodSection05.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            key: 'periodSection05.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection05.sumAdvanceTakeout}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection05", "sumAdvanceTakeout",e)}}
              />;
            },
          }
        ]
      },
      {
        title: 'Июнь',
        children: [
          {
            title: 'Количество',
            key: 'periodSection06.valueSection',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection06.valueSection}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection06", "valueSection",e)}}

              />;
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
            key: 'periodSection06.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection06.sumAdvanceTakeout}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection06", "sumAdvanceTakeout",e)}}
              />;
            },
          }
        ]
      },
      {
        title: 'Июль',
        children: [
          {
            title: 'Количество',
            key: 'periodSection07.valueSection',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection07.valueSection}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection07", "valueSection",e)}}

              />;
            }
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection07.sumSection',
            key: 'periodSection07.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            key: 'periodSection07.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection07.sumAdvanceTakeout}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection07", "sumAdvanceTakeout",e)}}
              />;
            },
          }
        ]
      },
      {
        title: 'Август',
        children: [
          {
            title: 'Количество',
            key: 'periodSection08.valueSection',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection08.valueSection}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection08", "valueSection",e)}}

              />;
            }
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection08.sumSection',
            key: 'periodSection08.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            key: 'periodSection08.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection08.sumAdvanceTakeout}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection08", "sumAdvanceTakeout",e)}}
              />;
            },
          }
        ]
      },
      {
        title: 'Сентябрь',
        children: [
          {
            title: 'Количество',
            key: 'periodSection09.valueSection',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection09.valueSection}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection09", "valueSection",e)}}

              />;
            }
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection09.sumSection',
            key: 'periodSection09.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            key: 'periodSection09.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection09.sumAdvanceTakeout}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection09", "sumAdvanceTakeout",e)}}
              />;
            },
          }
        ]
      },
      {
        title: 'Октябрь',
        children: [
          {
            title: 'Количество',
            key: 'periodSection10.valueSection',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection10.valueSection}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection10", "valueSection",e)}}

              />;
            }
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection10.sumSection',
            key: 'periodSection10.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            key: 'periodSection10.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection10.sumAdvanceTakeout}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection10", "sumAdvanceTakeout",e)}}
              />;
            },
          }
        ]
      },
      {
        title: 'Ноябрь',
        children: [
          {
            title: 'Количество',
            key: 'periodSection11.valueSection',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection11.valueSection}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection11", "valueSection",e)}}

              />;
            }
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection11.sumSection',
            key: 'periodSection11.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            key: 'periodSection11.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection11.sumAdvanceTakeout}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection11", "sumAdvanceTakeout",e)}}
              />;
            },
          }
        ]
      },
      {
        title: 'Декабрь',
        children: [
          {
            title: 'Количество',
            key: 'periodSection12.valueSection',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection12.valueSection}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection12", "valueSection",e)}}

              />;
            }
          },
          {
            title: 'Сумма, т',
            dataIndex: 'periodSection12.sumSection',
            key: 'periodSection12.sumSection',
            width: 200,
          },
          {
            title: 'Сумма аванса, т',
            key: 'periodSection12.sumAdvanceTakeout',
            width: 200,
            render: (item) => {
              return <Input
                defaultValue={item.periodSection12.sumAdvanceTakeout}
                onChange={(e)=> {this.OnChangeperiod(item, "periodSection12", "sumAdvanceTakeout",e)}}
              />;
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
      (this.props.universal.getObjectData._contractItemValue ? this.props.universal.getObjectData._contractItemValue : []).map((item)=>{
        this.setState({
          [item.id]:{
            "periodSection12": item.periodSection12,
            "periodSection11": item.periodSection11,
            "periodSection10": item.periodSection10,
            "periodSection09": item.periodSection09,
            "periodSection08": item.periodSection08,
            "periodSection07": item.periodSection07,
            "periodSection06": item.periodSection06,
            "periodSection05": item.periodSection05,
            "periodSection04": item.periodSection04,
            "periodSection03": item.periodSection03,
            "periodSection02": item.periodSection02,
            "periodSection01": item.periodSection01,
            "activity": item.activity,
            "measureUnit": item.measureUnit,
            "tariffItem": item.tariffItem,

          }
        })
      })
    })
  }
  OnChangeperiod=(item, period, value, e)=>{
    console.log([value]);

    this.setState({
      [item.id]: {
        ...this.state[item.id],
        [period]: {
          ...this.state[item.id][period],
          [value]:e.target.value
        }
    }
    })
  }
  send=()=>{
    let activities = Array.from(new Set(this.props.universal.getObjectData._contractItemValue.map(item=> item.activity)));
    let periods = [];
    this.props.universal.getObjectData._contractItemValue.map(item=> {
      periods.push(this.state[item.id])
    })
    activities.forEach((item, i)=>{

      periods.filter(period=> period.activity.id===item.id).map((j)=>{
        delete j.activity
        activities[i].contractItemValues=[];
        activities[i].contractItemValues.push(j);
      })
    })

    console.log({contractItems:activities});
  }

  render() {
    const data =this.props.universal.getObjectData._contractItemValue;

    return (
      <div>
        <Row>
          <Button
          onClick={()=>{this.send()}}>
            Send
          </Button>
        </Row>
      <Row>
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
            </Row>
    </div>);
  }
}

export default Graphic;

{/*<PageHeaderWrapper title={formatMessage({ id: 'menu.profile' })}>
  <Spin spinning={false}>
  </Spin>
</PageHeaderWrapper>*/}

