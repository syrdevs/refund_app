import React, {Component} from 'react';
import {connect} from 'dva';
import {
  Card,
  Table,
  Icon,
  Menu,
  Dropdown,
  Button,
  Checkbox,
  Label
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class MainView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      updateModalVisible: false,
      expandForm: false,
      selectedRows: [],
      formValues: {},
      stepFormValues: {},
      columns: [],
      dataSource: []
    }
  }

  componentDidMount() {

    const dataSource = [];
    for (let i = 0; i < 5; i++) {
      dataSource.push({
        key: i,
        surname: `Edward King2 ${i}`,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }

    this.setState({
      columns: [
        {
          title: 'Name',
          isVisible: true,
          dataIndex: 'name'
        }, {
          title: 'Age',
          isVisible: true,
          dataIndex: 'age',
        }, {
          title: 'Address',
          isVisible: true,
          dataIndex: 'address',
        }, {
          title: 'Column2',
          dataIndex: 'surname',
        }
      ],
      dataSource: dataSource
    });

  }

  componentWillReceiveProps(props) {
    console.log(props);
  }

  handleSelectRows() {

  }

  handleStandardTableChange() {

  }

  handleSelectColumn(column, e) {
    const {columns} = this.state;
    let filteredColumn = columns.map(function (item) {
      if (item.dataIndex === column.dataIndex) {
        item.isVisible = !item.isVisible;
      }

      return item;
    });

    this.setState({
      columns: filteredColumn
    });


  }

  render() {

    const {selectedRows, columns, dataSource} = this.state;

    const menuItems = columns.map((column,index)=>{
      return <Menu.Item key={index.toString()}>
        <Checkbox onChange={this.handleSelectColumn.bind(this, column)}
                  checked={column.isVisible}>{column.title}</Checkbox>
      </Menu.Item>;
    });


    const menu = (
      <Menu>
        <Menu.Item>
          <div>Выберите столбцов:</div>
        </Menu.Item>
        {menuItems}
      </Menu>
    );

    return (
      <PageHeaderWrapper title="Список таблица">
        <Card bordered={false}>
          <div>
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button><Icon type="setting" theme="outlined"/></Button>
            </Dropdown>
            <Table
              rowKey={'key'}
              dataSource={dataSource}
              columns={columns.filter(column => column.isVisible)}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default MainView;
