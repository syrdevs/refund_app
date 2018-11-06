import React, { Component } from 'react';
import { Modal, Card, List, Tabs } from 'antd';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";


const TabPane = Tabs.TabPane;


export default class ModalGraphView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      isVisible: false,
      graphdata: {
        title1: "Графика причин возвратов",
        title2: "Графика статусов возвратов",
        infographRefundReason:[
          {
            id:"51E748D88D4637A6E054001B782A74A6",
            name:"Ошибочно перечислены",
            value:119,
             },
          {
            id:"51E748D88D4737A6E054001B782A74A6",
            name:"Излишне начислены на работников",
            value:1,
            },
          {
            id:"51E748D88D4837A6E054001B782A74A6",
            name:"Неверно указан код назначения платежа",
            value:0,
            },
          {
            id:"51E748D88D4937A6E054001B782A74A6",
            name:"В формате платежного поручения МТ 102 допущены ошибки",
            value:0,
            },
          {
            id:"51E748D88D4A37A6E054001B782A74A6",
            name:"Неверно указаны реквизиты плательщика",
            value:10,
          },
          {
            id:"9",
            name:"Плательщиком или банком дважды перечислено",
            value:782,
           }
        ],
        infographAppRefundStatus:[
          {
            id:"1",
            name:"Получен от ГК",
            value:0
          },
          {
            id:"10",
            name:"Принято",
            value:0
          },
          {
            id:"2",
            name:"Ошибка загрузки",
            value:0
          },
          {
            id:"3",
            name:"Обработано-одобрено",
            value:0
          },
          {
            id:"4",
            name:"Обработано - отказано",
            value:0
          },
          {
            id:"5",
            name:"Исполнено- одобрено",
            value:0
          },
          {
            id:"6",
            name:"Исполнено-отказано",
            value:0
          },
          {
            id:"7",
            name:"Отправлено- одобрено",
            value:906
          },
          {
            id:"8",
            name:"Отправлено-отказано",
            value:6
          },
          {
            id:"9",
            name:"Ошибка в отправке",
            value:0
          }
        ]
      }
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentWillReceiveProps(props, prevProps) {
    if (props != null) {
      this.setState({
        isVisible: props.visible,
        dataSource: props.dataSource,
      });
    }
  }


  handleCancel = (e) => {
    this.props.resetshow();
  };

  render() {

    const { dataSource, isVisible } = this.state;

    const cols = {
      sales: {
        tickInterval: 1
      }
    };

    return (
      <Modal
        width={1200}
        centered
        onCancel={this.handleCancel}
        footer={[null, null]}
        visible={isVisible}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={this.state.graphdata.title1} key="1">
            <Chart
              height={400}
              data={this.state.graphdata.infographRefundReason}
              scale={cols}
              forceFit
            >
              <Axis name="name" visible={false} />
              <Axis name="value" />
              <Legend name='name' visible={false} />
              <Tooltip
                crosshairs={{
                  type: "x"
                }}
              />
              <Geom type="interval" position="name*value" />
            </Chart>
          </TabPane>
          <TabPane tab={this.state.graphdata.title2} key="2">
            <Chart
              height={400}
              data={this.state.graphdata.infographAppRefundStatus}
              scale={cols}
              forceFit
            >
              <Axis name="name" visible={false} />
              <Axis name="value" />
              <Tooltip
                crosshairs={{
                  type: "x"
                }}
              />
              <Geom type="interval" position="name*value" />
            </Chart>
          </TabPane>
        </Tabs>
      </Modal>);
  }
}

  {/**/}

