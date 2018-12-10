import React, { Component } from 'react';
import { Form, Input, Button, Select, Divider, DatePicker, Table, Row, Col, Tabs, Card, Spin, Badge, Icon, InputNumber} from 'antd';
import styles from './style.less';

const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import SmartGridView from '@/components/SmartGridView';
import { Tab } from '../../components/Login';
import ActModal from './ActModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'dva/index';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';


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
@connect(({ universal, loading }) => ({
  universal,
  loadingperiodYear: loading.effects['universal/getperiodYear'],
  loadingperiodSection: loading.effects['universal/getperiodSection'],
  loadingorganization: loading.effects['universal/getorganization'],
  loadingmedicalType: loading.effects['universal/getmedicalType'],
}))
class ViewAct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          'title': 'Код',
          'dataIndex': 'code',
          'isVisible': 'true',
        },
        {
          'title': 'Вид деятельности',
          'dataIndex': 'activity',
          'isVisible': 'true',
        },
        {
          title: 'Принято к оплате (₸)',
          dataIndex: 'accept_payment',
          isVisible: true,

        },
        {
          title: 'Предъявлено к оплате (₸)',
          dataIndex: 'accept_payment',
          isVisible: true,

        },
        {
          title: 'Вычет аванса (₸)',
          dataIndex: 'prepaid',
          isVisible: true,
        },
        {
          title: 'Итого к оплате (₸)',
          dataIndex: 'total',
          isVisible: true,
        }
      ],
      fcolumn: [],
      data: [
        {
           id:"123qwe111", code: '123456', activity: 'Медицинское учереждение', present_payment: 10456, accept_payment:10456, prepaid:2500, total:10456
        },
        {
          id:"123qwe222", code: '123456', activity: 'Медицинское учереждение', present_payment: 10456, accept_payment:10456, prepaid:2500, total:10456
        },
        {
         id:"123qwe333", code: '123456', activity: 'Медицинское учереждение', present_payment: 10456, accept_payment:10456, prepaid:2500, total:10456
        },
      ],
      ContractSelect: [],
      selectedRowKeys: [],
      modal:false,
      ContractSumms:[],
      Contractpayment:[],
      ShowClear: true,
      formcolumn:[{
        title: 'Наименование',
        dataIndex: 'name',
        render: (text) => <div style={{ color: 'black' }}>{text}</div>,
        width: 100,

      }, {
        title: 'Значения',
        dataIndex: 'value',
        key: 'value',
        width: 150,
      }],
      formdata:[
        {
        name: 'Номер',
        value: "123456",
        key: 1,
      },
        {
          name: 'Дата',
          value: "01.01.2019",
          key: 2,
        },
        {
          name: 'Отчетный период: год',
          value: "2019",
          key: 3,
        },
        {
          name: 'Отчетный период: месяц',
          value: "Январь",
          key: 4,
        },
        {
          name: 'Подразделение',
          value: "ТОО ТМИ",
          key: 5,
        },
        {
          name: 'Примечание',
          value: "Lorem ipsum dolor.",
          key: 6,
        }
        ]
    }
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const DicArr=[
      'periodYear',
      'periodSection',
      'organization',
      'medicalType',
    ]
    DicArr.forEach(function(item) {
      dispatch({
        type: 'universal/get'+item,
        payload: {
          "start":0,
          "length":1000,
          "entity":item
        },
      });
    })

  }
  onChangeSumma=(e, d)=>{

  }

  onChangePayment=(e, d)=>{
  }
  render() {
    const title = {fontSize:'12px'};
    const rowSelection = {

    };
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
    };
    return (
      <PageHeaderWrapper title={formatMessage({ id: 'app.module.acts.title' })}>
        <Card
          headStyle={{ padding: 0 }}
          style={{padding:'10px'}}
          className={styles.headPanel}
          bordered={false}
          bodyStyle={{ padding: 0 }}>
          <Spin spinning={this.props.loadingperiodYear && this.props.loadingperiodSection && this.props.loadingorganization && this.props.loadingmedicalType}>
          <Row style={{marginTop:'5px'}}>
              <Tabs
                className={styles.stepFormText}
                type={'card'}
                defaultActiveKey="form"
                onChange={(e)=>{
                  if (e==='form'){
                    this.setState({
                      ShowClear: true
                    })
                  }
                  else {
                    this.setState({
                      ShowClear: false
                    })
                  }
                }}
                tabPosition={'left'}>
                <TabPane tab="Титульная часть" key="form">
                  <Card style={{marginLeft: '-10px'}}>
                      <Table
                        columns={this.state.formcolumn}
                        dataSource={this.state.formdata}
                        pagination={{ position: 'none' }}
                        showHeader={false}
                      />
                  </Card>
                </TabPane>
                <TabPane tab="Спецификация"
                         key="specifications"
                >
                  <Card style={{marginLeft: '-10px'}}>
                    <SmartGridView
                      name={'specform'}
                      scroll={{ x: 'auto' }}
                      searchButton={false}
                      fixedBody={true}
                      rowKey={'id'}
                      loading={false}
                      fixedHeader={false}
                      hideRefreshBtn={true}
                      hideFilterBtn={true}
                      rowSelection={true}
                      showExportBtn={true}
                      hidePagination={true}
                      columns={this.state.columns}
                      actionColumns={this.state.fcolumn}
                      sorted={true}
                      onSort={(column) => {}}
                      showTotal={true}
                      addonButtons={[]}
                      actionExport={() => {}}
                      onSelectRow={(record, index) => {
                        //console.log(record)
                      }}
                      dataSource={{
                        total: this.state.data.length,
                        pageSize: this.state.data.length,
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
          </Row>
        </Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ViewAct ;

/*[<Button
    htmlType="submit"
    onClick={(e)=>{
      console.log(this.props.location.query)
      /!*this.props.form.validateFields(
        (err, values) => {
          if (!err) {
            this.props.tomain();
          }
          else {

          }
        },
      );*!/
    }
    }>
    Сохранить1111
  </Button>]*/
