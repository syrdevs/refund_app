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
  Spin,
  LocaleProvider,
  Divider,
} from 'antd';
import styles from './index.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard, faColumns } from '@fortawesome/free-solid-svg-icons/index';
import { Resizable } from 'react-resizable';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import componentLocal from '../../locales/components/componentLocal';

import ru_RU from 'antd/lib/locale-provider/ru_RU';

function getPropByName(obj, desc) {
  var arr = desc.split('.');

  while (arr.length && obj) {
    var comp = arr.shift();
    var match = new RegExp('(.+)\\[([0-9]*)\\]').exec(comp);
    if ((match !== null) && (match.length == 3)) {
      var arrayData = { arrName: match[1], arrIndex: match[2] };
      if (obj[arrayData.arrName] != undefined) {
        obj = obj[arrayData.arrName][arrayData.arrIndex];
      } else {
        obj = undefined;
      }
    } else {
      obj = obj[comp];
    }
  }

  return obj;
}

const ResizeableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

const SmartColumnsSelect = props => {


  const menu = (
    <Menu>
      <Menu.Item>
        <div>{formatMessage({ id: 'app.table.column.select' })}:</div>
      </Menu.Item>
      {props.value.map(function(column, index) {
        return (
          <Menu.Item key={index.toString()}>
            <Checkbox
              onChange={() => {
                props.onSelectColumn(column.dataIndex);
              }}
              checked={column.isVisible}>
              {column.title}
            </Checkbox>
          </Menu.Item>
        );
      }, this)}
    </Menu>
  );

  return (<Dropdown trigger={['click']} onVisibleChange={(visible) => {
    props.dropDownAction(visible);
  }} visible={props.dropDownVisible} overlay={menu} placement="bottomRight">
    <Button style={{ float: 'right' }}>
      <Icon><FontAwesomeIcon icon={faColumns}/></Icon>
    </Button>
  </Dropdown>);
};

const SmartGridHeader = props => {

  let filterBtnShow = props.hideFilterBtn !== true;
  let refreshBtnShow = props.hideRefreshBtn !== true;

  return (<div>
    <Row>
      <Col sm={24} md={24} xs={24}>
        <div className={styles.headerButton}>

          {filterBtnShow &&
          <Button type={'default'} disabled={props.searchButton} onClick={props.onSearch}><Icon type="search"
                                                                                                theme="outlined"/></Button>}

          {refreshBtnShow && <Button onClick={props.onRefresh}><FontAwesomeIcon icon={faSyncAlt}/></Button>}
          {props.addonButtons}

          <div className={styles.smart_grid_controls_right}>

            {<SmartColumnsSelect {...props} searchButton={props.searchButton} onSelectColumn={props.onSelectColumn}
                                 value={props.columns}/>}
            {props.showExportBtn &&
            <Button onClick={() => props.actionExport()} style={{ float: 'right' }}><Icon type="file-excel"/></Button>}

            {props.showTotal &&
            <div
              className={styles.total_label}>{props.extraButtons !== undefined && props.extraButtons} {formatMessage({ id: 'app.table.column.total' })}: {props.dataSource.total}</div>}

          </div>
        </div>

      </Col>
    </Row>
  </div>);
};


class BodyCell extends Component {
  render() {
    return <td  {...this.props}/>;
  }
}

export default class SmartGridView extends Component {
  constructor(props) {
    super(props);

    this.table = null;

    this.state = {
      dropDownVisible: false,
      selectedRow: null,
      isColumnChanged: false,
    };
  }

  componentDidMount() {

  }

  onSelectColumn = (columnIndex) => {

    const { onColumnsChange } = this.props;

    let local_helper = this.StorageHelper();
    let StorageColumns = local_helper.get(this.props.name);

    StorageColumns.forEach(function(item) {
      if (item.dataIndex === columnIndex) {
        item.isVisible = !item.isVisible;
      }
    });

    local_helper.set(this.props.name, StorageColumns, true);

    this.setState({
      isColumnChanged: !this.state.isColumnChanged,
    });

    if (onColumnsChange)
      onColumnsChange(!this.state.isColumnChanged);

  };

  onSelectChange = (selectedRowKeys) => {
    this.props.onSelectCheckboxChange(selectedRowKeys);
  };

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  clearSort = () => {

  };

  StorageHelper() {
    return {
      clear: function(name) {
        localStorage.setItem(name, null);
      },
      set: function(name, value, isReplace = true) {

        if (isReplace) {
          localStorage.setItem(name, typeof value === 'string' ? value : JSON.stringify(value));
        } else {
          if (!localStorage.getItem(name)) {
            localStorage.setItem(name, typeof value === 'string' ? value : JSON.stringify(value));
          }
        }

      },
      get: function(name) {
        let result = localStorage.getItem(name);

        if (result) {
          return JSON.parse(result);
        }

        return false;
      },
    };
  }

  render() {

    let local_helper = this.StorageHelper();
    let StorageColumns = local_helper.get(this.props.name);

    if (this.props.columns && StorageColumns.length !== this.props.columns.length) {
      local_helper.set(this.props.name, this.props.columns, true);
    } else {
      local_helper.set(this.props.name, this.props.columns, StorageColumns.length === 0 && this.props.columns.length !== 0);
    }


    let _columns = local_helper.get(this.props.name);


    let tableOptions = {
      bordered: true,
      rowClassName: styles.smart_grid_view_container,
      size: 'small',
      pagination: false,
      rowKey: this.props.rowKey || 'id',
      columns: _columns.filter(column => column.isVisible),
      dataSource: this.props.dataSource.data,
      onChange: (pagination, filters, sorter) => {
        if (this.props.onSort)
          this.props.onSort(sorter);
      },
    };
    /* if (this.props.rowClassName){
       tableOptions.rowClassName = this.props.rowClassName;
     }*/


    if (this.props.fixedHeader) {
      // tableOptions.useFixedHeader = this.props.fixedHeader;
    }


    /* tableOptions.columns = tableOptions.columns.map((col, index) => ({
       ...col,
       onHeaderCell: column => ({
         width: column.width,
         onResize: this.handleResize(index),
       }),
     }));*/

    // to do order column with actionColumns
    if (this.props.actionColumns && this.props.actionColumns.length > 0) {
      this.props.actionColumns.filter(x => x.isVisible).map((actcol) => {
        if (actcol.order != null) {
          tableOptions.columns.splice(actcol.order, 0, actcol);
        }
        else {
          tableOptions.columns.splice(1, 0, actcol);
        }
      });
      //tableOptions.columns = this.props.actionColumns.filter(x => x.isVisible).concat(tableOptions.columns);
    }

    if (this.props.sorted) {

      tableOptions.columns.forEach((column) => {

        //column.width = 150;

        if (this.props.sortedInfo) {
          column.sortOrder = this.props.sortedInfo.columnKey === column.dataIndex && this.props.sortedInfo.order;
          column.sorter = true;
        }

        //(a, b, sortOrder) => {
        //console.log(sortOrder);

        /*console.log(a);

        let _a = getPropByName(a, column.dataIndex);
        let _b = getPropByName(b, column.dataIndex);

        _a = _a ? _a : '';
        _b = _b ? _b : '';

        if (_a < _b) {
          return -1;
        }
        if (_a > _b) {
          return 1;
        }
        return 0;*/
        //};
      });
    }

    if (this.props.rowSelection) {
      tableOptions.components = {
        /* header: {
           cell: ResizeableTitle,
         },*/
        body: {
          cell: BodyCell,
        },
      };
    }

    if (this.props.selectedRowCheckBox) {
      tableOptions.rowSelection = {
        selectedRowKeys: this.props.selectedRowKeys,
        onChange: this.onSelectChange,
      };
    }

    if (this.props.scroll) {
      tableOptions.scroll = {
        ...this.props.scroll,
      };
    }
    if (!this.props.rowClassName) {
      tableOptions.rowClassName = (record, index) => {
        return this.state.selectedRow === index ? 'active' : '';
      };
    }
    else {
      tableOptions.rowClassName = this.props.rowClassName;
    }


    tableOptions.onRow = (record, index) => ({
      onClick: () => {
        this.setState({
          selectedRow: index,
        }, () => {
          if (this.props.onSelectRow)
            this.props.onSelectRow(record, index);
        });
      },
    });
    /*

     rowClassName={(record, index) => {
        return this.state.selectedRow === index ? 'active' : '';
      }}
    *  onRow={(record, index) => {
        return {
          onClick: () => {
            this.setState({
              selectedRow: index,
            });
          },
        };
      }}
    * */

    return (<div>
      <SmartGridHeader {...this.props}
                       searchButton={this.props.searchButton}
                       dropDownAction={(state) => {
                         this.setState({
                           dropDownVisible: state,
                         });
                       }}
                       dropDownVisible={this.state.dropDownVisible}
                       onSelectColumn={this.onSelectColumn}
                       addonButtons={this.props.addonButtons}
                       columns={_columns}
                       onSearch={this.props.onSearch}/>
      <Table {...tableOptions}/>
      <br/>
      <LocaleProvider locale={componentLocal}>
        <Pagination
          defaultPageSize={this.props.dataSource.pageSize}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          showSizeChanger
          pageSizeOptions={['15', '30', '40', '50', '100']}
          onShowSizeChange={(page, pageSize) => {
            this.props.onShowSizeChange(page - 1, pageSize);
          }}
          onChange={(page, pageSize) => {
            this.props.onShowSizeChange(page - 1, pageSize);
          }}
          defaultCurrent={this.props.dataSource.page}
          total={this.props.dataSource.total}
        />
      </LocaleProvider>
    </div>);
  }

}
