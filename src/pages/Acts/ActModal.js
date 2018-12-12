import React, { Component } from 'react';
import { Modal, Tabs, Table, Button, Spin, Card } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import SmartGridView from '../../components/SmartGridView';
import { connect } from 'dva/index';
import style from '../CounterAgent/Modals/ContragentModalStyle.less';

const TabPane = Tabs.TabPane;

@connect(({ universal2 }) => ({
  universal2,
}))
export default class ActModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      selectedRow: {},
      columns: [
        {
          title: 'Отчетный период(Год)',
          dataIndex: 'periodYear.year',
          isVisible: true,
          width : 150,
        },
        {
          title: 'Отчетный период(Месяц)',
          dataIndex: 'periodSection.periodSectionName',
          isVisible: true,
          width : 150,
        },
        {
          title: 'БИН',
          dataIndex: 'contragent.bin',
          isVisible: true,
          width : 150,
        },
        {
          title: 'Контрагент',
          dataIndex: 'contragent.organization',
          isVisible: true,
          width : 800,
        },
        {
          title: 'Договор',
          dataIndex: 'contract.number',
          isVisible: true,
          width : 150,
        },
        {
          title: 'Номер',
          dataIndex: 'number',
          isVisible: true,
          width : 150,
        },
        {
          title: 'Дата',
          dataIndex: 'documentDate',
          isVisible: true,
          width : 150,
        },
        {
          title: 'Оплата',
          dataIndex: 'documentSum',
          isVisible: true,
          width : 150,
        },
        {
          title: 'Подразделение',
          dataIndex: 'division.name',
          isVisible: true,
          width : 120,
        },
      ],
      data: [
        {
          id: '3',
          act_period_year: 'test123',
          act_period_month: 'test',
          bin: 'test',
          counteragent: 'test',
          contract_id: 'test',
          number: '1516512',
          act_date: '02.12.2018',
          payment: '05.12.2018',
          podr: '06.12.2018',
        }, {
          id: '4',
          act_period_year: 'test123',
          act_period_month: 'test',
          bin: 'test',
          counteragent: 'test',
          contract_id: 'test',
          number: '1516512',
          act_date: '02.12.2018',
          payment: '05.12.2018',
          podr: '06.12.2018',
          newContract: false,
        },
      ],
      selectedRowKeys: [],
      selectedRecord: {},
      gridParameters: {
        start: 0,
        length: 15,
        entity: "act",
        alias: "actList",
        filter: {},
        sort: [],
      },
    };
  }
  onShowSizeChange = (current, pageSize) => {
    const {dispatch} = this.props;
    this.setState(prevState => ({
      gridParameters: {
        ...prevState.gridParameters,
        start: current,
        length: pageSize,
      },
    }), () => dispatch({
      type: 'universal2/getList',
      payload: {
        ...this.state.gridParameters,
        start: current,
        length: pageSize,
      },
    }));
  };

  loadMainGridData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/getList',
      payload: this.state.gridParameters,
    }).then(()=>{
    });
  };

  componentDidMount() {
    this.loadMainGridData();
  }


  cancelModal=()=>{
    this.props.onCancel();
  }
  addAct=()=>{
    this.props.addAct(this.state.data.filter(x => this.state.selectedRowKeys.findIndex(a => x.id === a) !== -1))
  }

  render() {
    const { universal2 } = this.props;
    const act = universal2.references[this.state.gridParameters.entity];


    return (<Modal
        style={{ top: 20 }}
        width={1200}
        title={'Список Актов'}
        okText={'Выбрать'}
        onCancel={() => this.cancelModal()}
        onOk={() => {
          this.addAct()
          //this.props.hide();
        }}
        visible={true}>
      <Spin tip={formatMessage({ id: 'system.loading' })} spinning={universal2.loading}>
        <Card
          bodyStyle={{ padding: 5 }}>
          <div className={style.SmartGridView}>
            <SmartGridView
                name={'actform'}
                scroll={{ x: '2000' }}
                rowSelection={true}
                hideFilterBtn={true}
                hideRefreshBtn={true}
                selectedRowCheckBox={true}
                selectedRowKeys={this.state.selectedRowKeys}
                onSelectCheckboxChange={(selectedRowKeys) => {
                  this.setState({ selectedRowKeys: selectedRowKeys });
                }}
                onSelectRow={(record, index) => {
                  this.setState({
                    selectedRecord: record,
                  });
                }}
                searchButton={false}
                fixedBody={true}
                rowKey={'id'}
                loading={false}
                fixedHeader={false}
                showExportBtn={false}
                columns={this.state.columns}
                actionColumns={[]}
                sorted={false}
                showTotal={false}
                addonButtons={[]}
                actionExport={() => {}}
                onSelectRow={(record, index) => {
                    this.setState({
                      selectedRow: record
                    })
                }}
                dataSource={{
                  total: act ? act.totalElements : 0,
                  pageSize: this.state.gridParameters.length,
                  page: this.state.gridParameters.start + 1,
                  data: act ? act.content : [],
                }}
                onShowSizeChange={(pageNumber, pageSize) => {}}
                onRefresh={() => {

                }}
                onSearch={() => {

        }}
            />
          </div>
        </Card>
      </Spin>
    </Modal>);
  }
}


