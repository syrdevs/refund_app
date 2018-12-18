import React, { Component } from 'react';
import {
  Card,
  Tabs,
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
  LocaleProvider,
  Divider,
  Spin,
} from 'antd';
import moment from 'moment/moment';
import { connect } from 'dva';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import SelectList from '@/components/SelectList';


import componentLocal from '../../locales/components/componentLocal';
import { Animated } from 'react-animated-css';

const FormItem = Form.Item;
const { RangePicker, MonthPicker } = DatePicker;

function momentDefine() {
  var suffixes = {
    0: '-ші',
    1: '-ші',
    2: '-ші',
    3: '-ші',
    4: '-ші',
    5: '-ші',
    6: '-шы',
    7: '-ші',
    8: '-ші',
    9: '-шы',
    10: '-шы',
    20: '-шы',
    30: '-шы',
    40: '-шы',
    50: '-ші',
    60: '-шы',
    70: '-ші',
    80: '-ші',
    90: '-шы',
    100: '-ші',
  };

  var kk = moment.defineLocale('en', {
    months: 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
    monthsShort: 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
    weekdays: 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
    weekdaysShort: 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
    weekdaysMin: 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm',
    },
    calendar: {
      sameDay: '[Бүгін сағат] LT',
      nextDay: '[Ертең сағат] LT',
      nextWeek: 'dddd [сағат] LT',
      lastDay: '[Кеше сағат] LT',
      lastWeek: '[Өткен аптаның] dddd [сағат] LT',
      sameElse: 'L',
    },
    relativeTime: {
      future: '%s ішінде',
      past: '%s бұрын',
      s: 'бірнеше секунд',
      ss: '%d секунд',
      m: 'бір минут',
      mm: '%d минут',
      h: 'бір сағат',
      hh: '%d сағат',
      d: 'бір күн',
      dd: '%d күн',
      M: 'бір ай',
      MM: '%d ай',
      y: 'бір жыл',
      yy: '%d жыл',
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/,
    ordinal: function(number) {
      var a = number % 10,
        b = number >= 100 ? 100 : null;
      return number + (suffixes[number] || suffixes[a] || suffixes[b]);
    },
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 7,  // The week that contains Jan 1st is the first week of the year.
    },
  });

}

@connect(({ references, loading }) => ({
  references,
  loadingData: loading.effects['references/load'],
}))
export default class GridFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClearFilter: false,
      formFilters: {},
      disableFields: {},
      fields: {},
    };
  }

  componentDidMount() {

    if (getLocale() === 'en-US') {
      momentDefine();
    }

    const { dispatch } = this.props;
    const { isClearFilter, fields } = this.state;

    if (Object.keys(fields).length === 0) {

      let _fields = {};
      this.props.filterForm.forEach((filterItem, idx) => {
        _fields[filterItem.name] = {
          disabled: false,
          type: filterItem.type,
          filterName: filterItem.filterName
        };

        if (['multibox', 'combobox'].indexOf(filterItem.type) !== -1) {
          dispatch({
            type: 'references/load',
            code: filterItem.name,
          });
        }
      });

      this.setState({
        fields: _fields,
      });
    }
  }

  componentDidUpdate() {

    const { dispatch, clearFilterAction } = this.props;
    const { isClearFilter, fields } = this.state;

    if (isClearFilter) {
      this.setState({
        isClearFilter: false,
      });
    }

    if (Object.keys(fields).length === 0) {

      let _fields = {};

      this.props.filterForm.forEach((filterItem, idx) => {
        _fields[filterItem.name] = {
          disabled: false,
          type: filterItem.type,
        };

        if (['multibox', 'combobox'].indexOf(filterItem.type) !== -1) {
          dispatch({
            type: 'references/load',
            code: filterItem.name,
          });
        }
      });

      this.setState({
        fields: _fields,
      });
    }

    if (this.props.miniForm) {
      this.applyFilters(true);

      if (clearFilterAction) {
        this.clearFilters();
      }
    }


  }

  fieldOnChange = (filterItem, value) => {

    const { formFilters } = this.state;

    this.setState({
      formFilters: {
        ...formFilters,
        [filterItem.name]: value,
      },
    });
  };
  withmaxfieldOnChange = (filterItem, value, max) => {

    const { formFilters } = this.state;
    if (value.length < (max + 1)) {
      this.setState({
        formFilters: {
          ...formFilters,
          [filterItem.name]: value,
        },
      });
    }
  };

  applyFilters = (callPropFunc) => {
    const { fields, formFilters } = this.state;
    const { applyFilter, miniForm } = this.props;


    let filterData = {};
    Object.keys(fields).forEach((field) => {
      if (formFilters[field]) {


        if (['multibox', 'combobox'].indexOf(fields[field].type) !== -1) {

          let properyName = fields[field].type == 'multibox' ? field + 'List' :  field + 'Id';
          if ( fields[field].filterName) {
             properyName = fields[field].filterName;
          }
          let propertyValue = fields[field].type == 'multibox' ?
            formFilters[field].map((valueId) => ({
              id: valueId,
            })) : { id: formFilters[field] };

          filterData[properyName] = fields[field].disabled ? null : propertyValue;

          return;
        }

        /// to do is null  prefix
        if (['betweenDate'].indexOf(fields[field].type) !== -1) {
          filterData[field + 'Start'] = fields[field].disabled ? null : formFilters[field][0];
          filterData[field + 'End'] = fields[field].disabled ? null : formFilters[field][1];
          return;
        }

        filterData[field] = fields[field].disabled ? null : formFilters[field];
      }
    });


    if (applyFilter)
      applyFilter(filterData);

    if (miniForm) {
      this.props.filterOnChange(filterData);
    }
  };

  clearFilters = () => {
    const { clearFilter } = this.props;
    const { fields, formFilters } = this.state;

    Object.keys(fields).forEach((field) => {
      fields[field].disabled = false;
    });

    this.setState({
      formFilters: {},
      isClearFilter: true,
    });

    clearFilter();
  };

  disabledDate(current) {
    return current && current >= moment().endOf('day');
  }

  renderFilter = (filterItem, _index) => {

    const { dateFormat, references } = this.props;
    const { fields, formFilters, isClearFilter } = this.state;
    const mBottom = { marginBottom: '5px' };

    switch (filterItem.type) {

      case 'date': {
        let params = {
          style: {
            width: '100%',
          },
          format: dateFormat,
          onChange: (moment, dateString) => {
            filterItem.filterName ?  this.fieldOnChange(filterItem, dateString.toString().length <= 1 ? null : dateString) :
              this.fieldOnChange(filterItem, dateString.toString().length <= 1 ? null : dateString.replace('.', ''))
          },
        };

        if (isClearFilter) {
          params.value = null;
        }

        return (<div key={_index} style={mBottom}>{filterItem.label}:
          <Row>
            <Col md={24}>
              <LocaleProvider locale={componentLocal}>
                <DatePicker   {...params}
                              format={'DD.MM.YYYY'}
                />
              </LocaleProvider>
            </Col>
          </Row>
        </div>);

      }

      case 'monthPicker': {
        let params = {
          style: {
            width: '100%',
          },
          format: dateFormat,
          onChange: (moment, dateString) => {
            this.fieldOnChange(filterItem, dateString.toString().length <= 1 ? null : dateString.replace('.', ''));
          },
        };

        if (isClearFilter) {
          params.value = null;
        }

        return (<div key={_index} style={mBottom}>{filterItem.label}:
          <Row>
            <Col md={24}>
              <LocaleProvider locale={componentLocal}>
                <MonthPicker   {...params}
                               placeholder={formatMessage({ id: 'monthpicker.period' })}
                               format={'MM.YYYY'}
                />
              </LocaleProvider>
            </Col>
          </Row>
        </div>);
      }

      case 'betweenDate': {

        let RangeDateProps = {
          ref: React.createRef(),
          /*     defaultValue: formFilters[filterItem.name] ? formFilters[filterItem.name] : [moment(new Date(), dateFormat), moment(new Date(), dateFormat)],*/
          format: dateFormat,
          onChange: (moment, dateString) => {
            this.fieldOnChange(filterItem, dateString.toString().length <= 1 ? null : dateString);
          },
        };

        if (isClearFilter) {
          RangeDateProps.value = null;
          /*this.setState({
            isClearFilter: false,
          });*/
        }

        return (<div key={_index} style={mBottom}>{filterItem.label}:

          <Row>
            <Col md={22}>
              <LocaleProvider locale={componentLocal}>
                <RangePicker   {...RangeDateProps}
                               format={'DD.MM.YYYY'}
                               placeholder={[
                                 formatMessage({ id: 'datepicker.start.label' }),
                                 formatMessage({ id: 'datepicker.end.label' }),
                               ]}
                               disabledDate={this.disabledDate}
                               disabled={fields[filterItem.name].disabled}/>
              </LocaleProvider>
            </Col>
            {filterItem.nullBtn &&
            <Col md={2}>
              <div style={{ margin: '5px' }}>
                <Checkbox checked={fields[filterItem.name].disabled} onChange={(e) => {
                  fields[filterItem.name].disabled = e.target.checked;
                  this.setState({
                    fields: fields,
                    formFilters: formFilters,
                  });
                }}></Checkbox>
              </div>
            </Col>
            }

          </Row>
        </div>);
      }
      case 'text': {

        let params = {};

        if (isClearFilter) {
          params.value = null;
        }

        if (filterItem.withMax) {
          return (<div key={_index} style={mBottom}>{filterItem.label}:
            <Input {...params} onKeyDown={this.onKeyPress} onChange={(e) => {
              this.withmaxfieldOnChange(filterItem, e.target.value, filterItem.withMax);
            }} value={formFilters[filterItem.name]} style={{ width: '100%' }}/></div>);
        }
        else {
          return (<div key={_index} style={mBottom}>{filterItem.label}:
            <Input {...params} onKeyDown={this.onKeyPress} onChange={(e) => {
              this.fieldOnChange(filterItem, e.target.value);
            }} value={formFilters[filterItem.name]} style={{ width: '100%' }}/></div>);
        }
      }
      case 'multibox': {

        let params = {};

        if (isClearFilter) {
          params.value = [];
        }


        return (<div key={_index} style={mBottom}>{filterItem.label}:
          <Select
            {...params}
            mode="multiple"
            style={{ width: '100%' }}
            placeholder=""
            onChange={(value) => {
              this.fieldOnChange(filterItem, value);
            }}
          >
            {references[filterItem.name] && references[filterItem.name].map((item) => {
              return <Select.Option key={item.id}>{item.code} - {item.nameRu}</Select.Option>;
            })}
          </Select>
        </div>);
      }
      case 'combobox': {

        let params = {};

        if (isClearFilter) {
          params.value = [];
        }


        return (<div key={_index} style={mBottom}>{filterItem.label}:
          <Select
            {...params}
            style={{ width: '100%' }}
            placeholder={filterItem.label && filterItem.label}
            onChange={(value) => {
              this.fieldOnChange(filterItem, value);
            }}
          >
            <Select.Option key={null}>{<div style={{ height: 20 }}></div>}</Select.Option>
            {references[filterItem.name] && references[filterItem.name].map((item) => {
              return <Select.Option
                key={item.id}>{filterItem.displayField ? item[filterItem.displayField] : item.nameRu}</Select.Option>;
            })}
          </Select>
        </div>);
      }

      case 'selectlist': {
        let params = {};

        if (isClearFilter) {
          params.isClearFilter = isClearFilter;
        }

        return (<div key={_index} style={mBottom}>{filterItem.label}:<SelectList {...params} name={filterItem.name}
                                                                                 onSelect={(record) => {
                                                                                   //to do filter
                                                                                   //console.log(record);
                                                                                 }}/></div>);
      }

      default:
        break;
    }

  };

  onKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.applyFilters();
    }
  };

  render() {

    const { fields, isClearFilter } = this.state;
    const { filterForm } = this.props;

    let count = this.props.filterForm.map((filterItem) => {
      return filterItem.type == 'multibox' || filterItem.type == 'combobox';
    }).filter((f) => f);


    return (

      <Spin tip="Загрузка..." spinning={count.length > 0 ? this.props.loadingData : false}>
        <Form layout={'vertical'}>
          {Object.keys(fields).length > 0 && filterForm.map((filterItem, idx) => this.renderFilter(filterItem, idx))}
          {this.props.miniForm !== true && <Divider style={{ margin: '16px 10px 0 0' }}/>}
          {this.props.miniForm !== true && < Button style={{ margin: '10px 0 0 0px' }} type='primary'
                                                    onClick={this.applyFilters}>
            {formatMessage({ id: 'system.search' })}
          </Button>}
          {this.props.miniForm !== true && <Button style={{ margin: '10px 0 0 5px' }}
                                                   onClick={this.clearFilters}>{formatMessage({ id: 'system.clear' })}</Button>}
        </Form>
      </Spin>
    );
  }
}
