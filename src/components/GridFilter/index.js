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
  Divider,
} from 'antd';
import moment from 'moment/moment';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

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

    const { fields } = this.state;

    this.props.filterForm.map((filterItem, idx) => {
      fields[filterItem.name] = {
        disabled: false,
      };
    });

    this.setState({
      fields: fields,
    });

  }

  componentDidUpdate() {
    const { isClearFilter } = this.state;

    if (isClearFilter) {
      this.setState({
        isClearFilter: false,
      });
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

  applyFilters = () => {
    const { fields, formFilters } = this.state;
    const { applyFilter } = this.props;

    let filterData = {};
    Object.keys(fields).forEach((field) => {
      if (formFilters[field]) {
        filterData[field] = fields[field].disabled ? null : formFilters[field];
      }
    });

    applyFilter(filterData);
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

  renderFilter = (filterItem, _index) => {

    const { dateFormat } = this.props;
    const { fields, formFilters, isClearFilter } = this.state;

    switch (filterItem.type) {
      case 'betweenDate': {

        let RangeDateProps = {
          ref: React.createRef(),
          /*     defaultValue: formFilters[filterItem.name] ? formFilters[filterItem.name] : [moment(new Date(), dateFormat), moment(new Date(), dateFormat)],*/
          format: dateFormat,
          onChange: (moment, dateString) => {
            this.fieldOnChange(filterItem, dateString);
          },
        };

        if (isClearFilter) {
          RangeDateProps.value = null;
          /*this.setState({
            isClearFilter: false,
          });*/
        }

        return (<div key={_index}>{filterItem.label}:
          <RangePicker  {...RangeDateProps}
                        disabled={fields[filterItem.name].disabled}/>
          <Checkbox checked={fields[filterItem.name].disabled} onChange={(e) => {
            fields[filterItem.name].disabled = e.target.checked;

            this.setState({
              fields: fields,
              formFilters: formFilters,
            });

          }}>Без значения</Checkbox>
        </div>);
      }
      case 'text': {
        return (<div key={_index}>{filterItem.label}:
          <Input onChange={(e) => {
            this.fieldOnChange(filterItem, e.target.value);
          }} value={formFilters[filterItem.name]} style={{ width: '100%' }}/></div>);
      }
      case 'multibox': {

        let params = {};

        if (isClearFilter) {
          params.value = [];
        }

        return (<div key={_index}>{filterItem.label}:
          <Select
            {...params}
            mode="multiple"
            style={{ width: '100%' }}
            placeholder=""
            onChange={(value) => {
              this.fieldOnChange(filterItem, value);
            }}
          >
            {filterItem.store.map((item) => {
              return <Select.Option key={item.id}>{item.name}</Select.Option>;
            })}
          </Select>
        </div>);
      }
      case 'combobox': {

        let params = {};

        if (isClearFilter) {
          params.value = [];
        }

        return (<div key={_index}>{filterItem.label}:
          <Select
            {...params}
            style={{ width: '100%' }}
            placeholder=""
            onChange={(value) => {
              this.fieldOnChange(filterItem, value);
            }}
          >
            {filterItem.store.map((item) => {
              return <Select.Option key={item.id}>{item.name}</Select.Option>;
            })}
          </Select>
        </div>);
      }
      default:
        break;
    }

  };

  render() {

    const { fields, isClearFilter } = this.state;
    const { filterForm } = this.props;


    return (<Card
      style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
      type="inner"
      title="Фильтр"
      extra={<Button size="small" onClick={this.filterPanelState}><Icon type="close" theme="outlined"/></Button>}
    >
      <Form layout={'vertical'}>
        {Object.keys(fields).length > 0 && filterForm.map((filterItem, idx) => this.renderFilter(filterItem, idx))}
        <FormItem>
          <Button style={{ margin: '10px 0 0 15px' }} size={'small'} type="primary" icon="search"
                  onClick={this.applyFilters}>
            Искать
          </Button>
          <Button style={{ margin: '10px 0 0 15px' }} size={'small'} icon="delete"
                  onClick={this.clearFilters}>Очистить</Button>
        </FormItem>
      </Form>
    </Card>);
  }
}
