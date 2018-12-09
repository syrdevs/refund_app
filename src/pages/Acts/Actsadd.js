import React, { Component } from 'react';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card} from 'antd';
import styles from './style.less';

const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import SmartGridView from '@/components/SmartGridView';
import { Tab } from '../../components/Login';


const TabPane = Tabs.TabPane;

const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};




@Form.create()
class Actsadd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          'title': 'Наименование',
          'dataIndex': 'name',
          'isVisible': 'true',
        },
        {
          'title': 'Тип1',
          'dataIndex': 'type1',
          'isVisible': 'true',
        },
        {
          'title': 'Тип2',
          'dataIndex': 'type2',
          'isVisible': 'true',
        }
      ],
      data: [
        {
          key: 1, name: 'Договор 1', type1: 32, type2: 'абс',
        },
        {
          key: 2, name: 'Договор 1', type1: 42, type2: 'абс',
        },
        {
          key: 3, name: 'Договор 1', type1: 32, type2: 'абс',
        },
      ],
      ContractSelect: [],
      selectedRowKeys: [],


    }
  }
  deleteContract=()=>{
    /*this.setState({
      data: this.state.data.filter((item) => {
        /!*this.state.ContractTable.filter((select)=>{
          select.key==item.key
        })*!/
      })
    })*/
  }
  render() {
    const rowSelection = {
      /*onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },*/
      /*onSelect: (record, selected, selectedRows) => {
        //selectedRows=[].push(record)
        console.log(record)
        console.log(selectedRows)
        this.setState({
          ContractSelect: selectedRows
        })
      },*/
      /* onSelectAll: (selected, selectedRows, changeRows) => {
         console.log(selected, selectedRows, changeRows);
       },*/
    };
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
    };


    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Информация об Акте" key="1">
          <Row style={{marginTop:'20px'}}>
            <Form layout="horizontal" hideRequiredMark>
              <Tabs
                className={styles.stepFormText}
                defaultActiveKey="form"
                tabPosition={'left'}>
                <TabPane tab="Форма" key="form">
                  <Card style={{marginLeft: '-10px'}}>
                    <div style={{margin:'30px 0', maxWidth:'70%'}}>
                      <Form.Item {...formItemLayout} label="Номер">
                        {getFieldDecorator('number', {
                          initialValue: '',
                          rules: [{ required: true, message: '' }],
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Дата">
                        {getFieldDecorator('date', {
                          initialValue: '',
                          rules: [{ required: true, message: '' }],
                        })(
                          <DatePicker/>
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Отчетный период: год">
                        {getFieldDecorator('act_period_year', {
                          initialValue: '',
                          rules: [{ required: true, message: '' }],
                        })(
                          <Select>
                            <Option value="ant-design@alipay.com">2017</Option>
                            <Option value="ant-design@alipay.com">2018</Option>
                            <Option value="ant-design@alipay.com">2019</Option>
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Отчетный период: месяц">
                        {getFieldDecorator('act_period_month', {
                          initialValue: '',
                          rules: [{ required: true, message: '' }],
                        })(
                          <MonthPicker/>
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Подразделение">
                        {getFieldDecorator('podr', {
                          initialValue: '',
                          rules: [{ required: true, message: '' }],
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Примечание">
                        {getFieldDecorator('notes', {
                          initialValue: '',
                          rules: [{ required: true, message: '' }],
                        })(
                          <Input />
                        )}
                      </Form.Item>
                    </div>
                  </Card>
                </TabPane>
                <TabPane tab="Спецификация" key="contracts">
                  <Card style={{marginLeft: '-10px'}}>
                    <SmartGridView
                      name={'contractform'}
                      searchButton={false}
                      fixedBody={true}
                      rowKey={'id'}
                      loading={false}
                      fixedHeader={false}
                      hideRefreshBtn={true}
                      hideFilterBtn={true}
                      rowSelection={true}
                      showExportBtn={false}
                      columns={this.state.columns}
                      actionColumns={[]}
                      sorted={false}
                      showTotal={false}
                      addonButtons={[
                        <Button style={{marginRight:'5px'}} type={'default'}  onClick={()=>{}}>Добавить</Button>,
                        <Button  type={'default'}  onClick={()=>{this.deleteContract()}}>Удалить</Button>
                      ]}
                      actionExport={() => {}}
                      onSelectRow={(record, index) => {
                        console.log(e)
                      }}
                      dataSource={{
                        total: 1,
                        pageSize: 15,
                        page: 1,
                        data: this.state.data,
                      }}
                      onShowSizeChange={(pageNumber, pageSize) => {}}
                      onRefresh={() => {

                      }}
                      onSearch={() => {

                      }}
                    />
                  </Card>
                </TabPane>
              </Tabs>
              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: {
                    span: formItemLayout.wrapperCol.span,
                    offset: formItemLayout.labelCol.span,
                  },
                }}
                label=""
              >
                <Button type="primary" >
                  Сохранить
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </TabPane>
      </Tabs>
    );
  }
}

export default Actsadd;