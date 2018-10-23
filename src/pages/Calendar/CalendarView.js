import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Card,
  Table,
  Icon,
  Menu,
  Input,
  Dropdown,
  Button,
  Checkbox,
  Label,
  Select,
  Calendar, Badge,
  DatePicker,
  Modal,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import style from './CalendarView.less';
import moment from 'moment';
import 'moment/locale/ru';
import ModalGridView from '@/components/ModalGridView';

moment.locale('ru-ru');


const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;


export default class CalendarView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentDate: moment(),
      modalVisible: false,
      selectedDate: '',
      modalData: {},
      dataSource: [],
      modalForm: {
        selectedDayType: '',
        description: '',
      },
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: [{
        date: '23.10.2018',
        EventID: {
          id: '1',
          name: 'Lorem ipsum dolor sit amet 2222',
          code: '10',
        },
      }, {
        date: '01.10.2018',
        EventID: {
          id: '2',
          name: 'Lorem ipsum dolor sit amet 11111',
          code: '10',
        },
      }],
    });


  }

  showModal = (data) => {
    this.setState({
      modalVisible: true,
      modalData: data ? data : {},
    });
  };
  handleOk = (e) => {

    const { modalForm } = this.state;

    console.log(modalForm.description, modalForm.selectedDayType);

    this.setState({
      modalVisible: false,
    });
  };
  handleCancel = (e) => {
    this.setState({
      modalData: {},
      modalVisible: false,
      modalForm: {
        selectedDay: '',
        description: '',
      },
    });
  };
  handleDelete = () => {
    const { modalData, dataSource } = this.state;

    if (Object.keys(modalData).length > 0) {
      console.log(modalData);
    }
  };

  dateCellRender(value) {
    const eventData = this.getListData(value);

    return eventData && (
      <div className={'event_day'}><Icon type="calendar" theme="outlined"/>{eventData.name}</div>
    );
  }

  getListData(value) {
    let listData;

    const { dataSource } = this.state;

    dataSource.forEach((dateItem) => {
      let _date = moment(dateItem.date, 'DD-MM-YYYY').format('DD');
      let _month = moment(dateItem.date, 'DD-MM-YYYY').format('MM');

      if (_date == value.date() && _month == value.month() + 1) {
        listData = dateItem.EventID;
      }
    });

    return listData || '';
  }

  getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  monthCellRender(value) {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }


  onSelectDate(e) {
    let _date = moment(e, 'DD.MM.YYYY');

    this.setState({ selectedDate: _date });

    let EventData = this.getListData(e);
    this.showModal(EventData);
  }

  onChangeDatePicker(e, st) {

    let month = moment(e).format('MM');
    let year = moment(e).format('YYYY');

    /// send to server is redux

    if (e)
      this.setState({
        currentDate: e,
      });
  }

  render() {

    const { modalVisible, currentDate, modalData, modalForm } = this.state;

    return (<PageHeaderWrapper title="Календарь">
      <Modal centered
             className={style.modal_buttons}
             title="Информация"
             onCancel={this.handleCancel.bind(this)}
             visible={modalVisible}
             footer={[
               <Button key="delete" onClick={this.handleDelete} type="danger">Удалить</Button>,
               <Button key="submit" onClick={this.handleOk} type="primary">Сохранить</Button>,
               <Button key="cancel" onClick={this.handleCancel}>Отмена</Button>,
             ]}>
        <Select
          style={{ width: '100%' }}
          placeholder="Выберите"
          onChange={(value, option) => {
            modalForm.selectedDayType = value;
          }}
          optionFilterProp="children">
          <Option value="1">Выходной день</Option>
          <Option value="2">Праздничный день</Option>
        </Select>
        <br/><br/>
        <Input value={modalData.name} onChange={(e) => {
          modalData.name = e.target.value;
          modalForm.description = e.target.value;

          this.setState({
            modalData: modalData,
            modalForm: modalForm
          });

        }} style={{ width: '100%' }} placeholder='Событие'/>
      </Modal>


      <Card bordered={false}>
        <div>
          <MonthPicker value={currentDate} onChange={this.onChangeDatePicker.bind(this)} placeholder="Выберите"/>
          <Calendar value={currentDate} className={style.customCalendar} onSelect={this.onSelectDate.bind(this)}
                    dateCellRender={this.dateCellRender.bind(this)}
                    monthCellRender={this.monthCellRender.bind(this)}/>
        </div>
      </Card>
    </PageHeaderWrapper>);
  };
}
