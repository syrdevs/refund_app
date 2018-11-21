import React, { Component } from 'react';
import {
  Card,
  Table,
  Icon,
  Menu,
  Dropdown,
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
  Divider,
  Spin,
  Tooltip,
} from 'antd';
/*import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from '@/components/Charts';*/
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import jsonfile from '../Dashboard/data'
import styles from './HomePage';

/*const { TabPane } = Tabs;
const { RangePicker } = DatePicker;*/


export default class HomePage extends Component {
  constructor(props) {
    super(props);

  }


  componentDidMount() {
    console.log("test")
  }



  render() {



    return (
      <div>
        asdjkadjasd
      </div>
    );
  }
}

