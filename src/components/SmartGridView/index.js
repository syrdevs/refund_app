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
  Divider,
} from 'antd';
import styles from './index.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard, faColumns } from '@fortawesome/free-solid-svg-icons/index';
import { Resizable } from 'react-resizable';

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
        <div>Выберите столбцов:</div>
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

  return (<Dropdown trigger={['click']} overlay={menu} placement="bottomRight">
    <Button style={{ float: 'right' }}>
      <Icon><FontAwesomeIcon icon={faColumns}/></Icon>
    </Button>
  </Dropdown>);
};

const SmartGridHeader = props => {
  return (<div>
    <Row>
      <Col sm={24} md={24} xs={24}>
        <div className={styles.headerButton}>
          <Button type={'default'} disabled={props.searchButton} onClick={props.onSearch}><Icon type="search"
                                                                                                theme="outlined"/></Button>
          <Button onClick={props.onRefresh}><FontAwesomeIcon icon={faSyncAlt}/></Button>
          {props.addonButtons}
          <div className={styles.smart_grid_controls_right}>
            {<SmartColumnsSelect searchButton={props.searchButton} onSelectColumn={props.onSelectColumn}
                                 value={props.columns}/>}

            {props.showTotal && <div className={styles.total_label}>Количество записей: 2548462</div>}
          </div>
        </div>

      </Col>
    </Row>
  </div>);
};

const EditableContext = React.createContext();

export default class SmartGridView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isColumnChanged: false,
    };
  }

  selectableRow() {

    let lastActiveRow = false;
    const SelectableRow = ({ form, index, ...props }) => {

      const trRef = React.createRef();

      return (<EditableContext.Provider value={form}>
        <tr {...props} ref={trRef} onClick={(e) => {

          if (lastActiveRow) {
            lastActiveRow.style.backgroundColor = '';
          }

          lastActiveRow = trRef.current;
          lastActiveRow.style.backgroundColor = '#e6f7ff';

        }}/>
      </EditableContext.Provider>);
    };

    return SelectableRow;
  }

  onSelectColumn = (columnIndex) => {

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
            console.log('replaceddd///////////////');
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
    local_helper.set(this.props.name, this.props.columns, StorageColumns.length === 0 && this.props.columns.length !== 0);
    let _columns = local_helper.get(this.props.name);

    let tableOptions = {
      bordered: true,
      rowClassName: styles.smart_grid_view_container,
      size: 'small',
      pagination: false,
      rowKey: this.props.rowKey,
      columns: _columns.filter(column => column.isVisible),
      dataSource: this.props.dataSource.data,
    };

    if (this.props.sorted) {
      tableOptions.columns.forEach((column) => {
        column.width = 150;
        column.sorter = (a, b) => a[column.dataIndex].length - b[column.dataIndex].length;
      });
    }

    tableOptions.columns = tableOptions.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      })
    }));

    // to do order column with actionColumns
    if (this.props.actionColumns && this.props.actionColumns.length > 0) {
      tableOptions.columns = this.props.actionColumns.concat(tableOptions.columns);
    }


    if (this.props.rowSelection) {
      tableOptions.components = {
        header: {
          cell: ResizeableTitle,
        },
        body: {
          row: this.selectableRow(),
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


    return (<div>
      <SmartGridHeader {...this.props}
                       searchButton={this.props.searchButton}
                       onSelectColumn={this.onSelectColumn}
                       addonButtons={this.props.addonButtons}
                       columns={_columns}
                       onSearch={this.props.onSearch}/>
      <Table {...tableOptions}/>
      <br/>
      <Pagination
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        showSizeChanger
        onShowSizeChange={(page, pageSize) => {
          this.props.onShowSizeChange(page - 1, pageSize);
        }}
        onChange={(page, pageSize) => {
          this.props.onShowSizeChange(page - 1, pageSize);
        }}
        defaultCurrent={this.props.dataSource.page}
        total={this.props.dataSource.total}
      />
    </div>);
  }

}
