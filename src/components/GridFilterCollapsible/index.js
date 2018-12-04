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
  Collapse,
  Checkbox,
  LocaleProvider,
  Divider,
  Spin,
} from 'antd';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import GridFilter from '@/components/GridFilter';

const Panel = Collapse.Panel;


export default class GridFilterCollapsible extends Component {


  state = {
    filters: {},
    isClearFilter: false,
  };

  componentWillUnmount() {
    console.log('unmounted');
  }

  componentDidMount() {

  }

  applyFilter = (collapsiblePanelsFilter) => {
    const { clearFilter, applyFilter } = this.props;
    let filterData = {};
    let filterKeys = Object.keys(collapsiblePanelsFilter);

    if (filterKeys.length > 0) {

      let rootKey = filterKeys[0];

      filterData = collapsiblePanelsFilter[rootKey];

      filterKeys.forEach((filterKey, _index) => {
        if (_index !== 0 && Object.keys(collapsiblePanelsFilter[filterKey]).length > 0) {
          filterData[filterKey] = {
            ...collapsiblePanelsFilter[filterKey],
          };
        }
      });


      applyFilter(filterData);
    }

  };

  render() {

    const { clearFilter, applyFilter } = this.props;

    let collapsiblePanels = [];
    let collapsiblePanelsFilter = {};
    let clearedFilterPanelCount = 0;

    this.props.filterForm.forEach((filterForm, _index) => {

      collapsiblePanelsFilter[filterForm.rootKey] = {};

      collapsiblePanels.push(<Panel forceRender={true} key={_index} header={filterForm.title}>
        <GridFilter
          clearFilterAction={this.state.isClearFilter}
          clearFilter={() => {

            clearedFilterPanelCount++;

            if (clearedFilterPanelCount === this.props.filterForm.length) {
              this.setState({
                isClearFilter: false,
              });
              clearFilter();
            }


            //
            // if (this.state.isClearFilter !== false) {
            //
            //
            //
            // }
          }}
          miniForm={true}
          filterOnChange={(filters) => {
            collapsiblePanelsFilter[filterForm.rootKey] = filters;
          }}
          dateFormat={this.props.dateFormat}
          filterForm={filterForm.formElements}/>
      </Panel>);
    });

    return (<div><Collapse bordered={false} accordion defaultActiveKey={['0']}>
      {collapsiblePanels}
    </Collapse>
      <Form layout={'vertical'}>
        <Divider style={{ margin: '16px 10px 0 0' }}/>
        <Button style={{ margin: '10px 0 0 0px' }} type='primary'
                onClick={() => this.applyFilter(collapsiblePanelsFilter)}>
          {formatMessage({ id: 'system.search' })}
        </Button>
        <Button style={{ margin: '10px 0 0 5px' }}
                onClick={() => {
                  this.setState({
                    isClearFilter: true,
                  });
                }}>{formatMessage({ id: 'system.clear' })}</Button>
      </Form>
    </div>);
  }
}
