import React, {Component} from 'react';
import {Card, Row, Menu, Icon, Col, Layout, Button, Dropdown, Spin,Progress, Badge} from "antd";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {formatMessage, FormattedMessage} from 'umi/locale';
import {Animated} from 'react-animated-css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpenpen} from "@fortawesome/free-solid-svg-icons";
import GridFilter from '@/components/GridFilter';
import SmartGridView from '@/components/SmartGridView';
import {connect} from "dva";
import saveAs from "file-saver";
import moment from "moment";
import router from "umi/router";
import documentStyle from "./Documents.less";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {faReply} from "@fortawesome/free-solid-svg-icons/faReply";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons/faFolderOpen";
import {faFolder} from "@fortawesome/free-solid-svg-icons/faFolder";
import {faCheckSquare} from "@fortawesome/free-solid-svg-icons/faCheckSquare";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";

const SubMenu = Menu.SubMenu;
const {Header, Sider, Content} = Layout;


@connect(({universal2, universal, loading}) => ({
  universal2,
  universal,
  loadingData: loading.effects['universal2/data'],
}))
class Documents extends Component {
  constructor(props) {
    super(props);
  }

  rootSubmenuKeys = ['sub1'];

  state = {
    collapsed: false,
    openKeys: ['sub1'],
    fcolumn:
      [{
        'title': '',
        isVisible: true,

        'dataIndex': 'progressStst',
        order: 0,
        render: (record, value) => <a
          href="#"> <Progress type="circle" percent={this.setPercent(value.status)} status={this.setStatusProg(value.status)} width={29} /></a> ,
      },
        {
        'title': 'Статус',
        isVisible: true,
        'dataIndex': 'status',
        order: 2,
        render: (record, value) => <a
          href="#"> <span><Badge status={this.setBadgeStatus(value.status)} /></span> {value.status} </a> ,
      }],
    columns: [
      {
        dataIndex: '102',
        title: 'МТ 102',
        width: 50,
        onCell: record => {
          return {
            onClick: () => {
              console.log(record);
            },
          };
        },
        render: () => (
          <Button key={'102'}>
            <Icon type="database" theme="outlined"/>
          </Button>
        ),
      }, {
        dataIndex: 'xml',
        title: 'XML',
        width: 50,
        onCell: record => {
          return {
            onClick: () => {
              console.log(record);
            },
          };
        },
        render: () => (
          <Button key={'xml'}>
            <Icon type="database" theme="outlined"/>
          </Button>
        ),
      }],
    searchercont: 0,
    tablecont: 24,
    isSearcher: false,
    ColType: null,
    filterForm: [],
    ModalData: {
      id: null,
      key: null,
      value: null,
    },
    ShowModal: false,
    // searchButton: false,
    serverFileList: [],
    sortedInfo: {},
    pagingConfig: {
      'start': 0,
      'length': 10,
      'src': {
        'searched': false,
        'data': {},
      },
      'sort': [],
    },

  };

  setStatusProg=(value)=>{
    if(value==='Отклонен'){
      return 'exception'
    }else if(value==='Подписан'){
      return 'success'
    }
  };

  setPercent=(value)=>{
    if (value==='Подписан') {
      return '100';
    }
    else if (value === 'На подписании') {
      return '75';
    }
    else {
      return '100';
    }
  };

  setBadgeStatus = (value) => {
    if (value==='Подписан') {
      return 'success';
    }
    else if (value === 'На подписании') {
      return 'default';
    }
    else {
      return 'error';
    }
  };

  hideleft() {
    this.setState({
      // searchButton: false,
      searchercont: 0,
      tablecont: 24,

    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({openKeys});
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'universal2/clear',
      payload: {
        table: 'getApplicationPage',
      },
    });
  }

  componentDidMount() {
    const {dispatch} = this.props;
    this.loadMainGridData();

    this.setState({
      filterForm: [
        {
          name: 'appNumber',
          label: formatMessage({id: 'menu.filter.numberrequest'}),
          type: 'text',
        },
        {
          name: 'appDate',
          label: 'Дата заявки',
          type: 'betweenDate',
        },
        {
          name: 'reference',
          label: formatMessage({id: 'menu.filter.reference'}),
          type: 'text',
        },
        {
          name: 'payOrderNum',
          label: formatMessage({id: 'menu.filter.paymentnumber'}),
          type: 'text',
        },
        {
          name: 'payOrderDate',
          label: formatMessage({id: 'menu.filter.payment.date'}),
          type: 'betweenDate',
        },
        {
          name: 'receiptAppdateToFsms',
          label: formatMessage({id: 'menu.filter.refundadd'}),
          type: 'betweenDate',
        },
        {
          name: 'knp',
          label: formatMessage({id: 'menu.filter.knp'}),
          type: 'multibox',
        },
      ],
    });
  }

  componentWillReceiveProps(props) {
  }

  onShowSizeChange = (current, pageSize) => {
    const max = current * pageSize;
    const min = max - pageSize;
    const {dispatch} = this.props;
    dispatch({
      type: 'universal2/data',
      payload: {
        ...this.state.pagingConfig,
        table: 'getApplicationPage',
        start: current,
        length: pageSize,
      },
    });
  };

  getFileNameByContentDisposition = (contentDisposition) => {
    let regex = /filename[^;=\n]*=(UTF-8(['"]*))?(.*)/;
    let matches = regex.exec(contentDisposition);
    let filename;
    let filenames;
    if (matches !== null && matches[3]) {
      filename = matches[3].replace(/['"]/g, '');
      let match = regex.exec(filename);
      if (match !== null && match[3]) {
        filenames = match[3].replace(/['"]/g, '').replace('utf-8', '');
      }
    }
    return decodeURI(filenames);
  };

  // toggleSearcher = () => {
  //   this.setState({
  //     searchButton: true,
  //     isSearcher: false,
  //     searchercont: 6,
  //     tablecont: 18,
  //   });
  // };

  exportToExcel = () => {

    let authToken = localStorage.getItem('token');
    let columns = [
      {
        'title': 'Номер заявки',
        'width': 100,
        'isVisible': true,
        'dataIndex': 'appNumber',
      },
      {
        'sorter': true,
        'title': 'Дата заявки',
        'isVisible': true,
        'dataIndex': 'appDate',
      },
      {
        'title': 'Дата поступления заявления в Фонд',
        'isVisible': true,
        'dataIndex': 'receiptAppdateToFsms',
      },
      {
        'title': 'Дата исполнения заявки',
        'isVisible': true,
        'dataIndex': 'appEndDate',
      },
      {
        'title': 'Номер платежного поручения',
        'isVisible': true,
        'dataIndex': 'payOrderNum',
      },
      {
        'title': 'Дата платежного поручения',
        'isVisible': true,
        'dataIndex': 'payOrderDate',
      },
      {
        'title': 'Референс',
        'isVisible': true,
        'dataIndex': 'reference',
      },
      {
        'title': 'КНП',
        'isVisible': true,
        'dataIndex': 'dknpId.code',
      },
      {
        'title': 'Возвратов',
        'isVisible': true,
        'dataIndex': 'refundCount',
      },
    ];

    fetch('/api/refund/exportToExcel',
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + authToken,
        },
        method: 'post',
        body: JSON.stringify({
          'entityClass': 'application',
          'fileName': formatMessage({id: 'menu.refunds.requests'}),
          'src': {
            'searched': true,
            'data': this.state.pagingConfig.src.data,
          },
          'columns': columns.filter(column => column.isVisible).map(x => ({dataIndex: x.dataIndex, title: x.title})),
        }),
      })
      .then(response => {
        if (response.ok) {
          return response.blob().then(blob => {
            let disposition = response.headers.get('content-disposition');
            return {
              fileName: this.getFileNameByContentDisposition(disposition),
              raw: blob,
            };
          });
        }
      })
      .then(data => {
        if (data) {
          saveAs(data.raw, moment().format('DDMMYYYY') + data.fileName);
        }
      });
  };

  loadMainGridData = () => {

    const {dispatch} = this.props;

    dispatch({
      type: 'universal2/data',
      payload: {
        table: 'getApplicationPage',
        ...this.state.pagingConfig,
      },
    });
  };


  render() {
    const dateFormat = 'DD.MM.YYYY';
    // let {columns2, dataStore2} = this.props.universal2;
    let dataStore =
      {
        size: 10,
        totalElements: 1,
        totalPages: 133,
        content: [
          {
            typeDoc: 'Заявка',
            status: 'Подписан',

            datePost: '15.12.2018 13:54',
            dateReceipt: '14.12.2018',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
          },
          {
            typeDoc: 'Договор',
            status: 'На подписании',
            dateReceipt: '16.12.2018',
            datePost: '',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
          },
          {
            typeDoc: 'Контрагент',
            status: 'Отклонен',
            dateReceipt: '14.11.2018',
            receipt:'asd',
            datePost: '26.11.2018 13:26',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
          },
        ]
      };

    let columns = [
      // {
      //   'title': '',
      //   'isVisible': true,
      //   'dataIndex': 'progressStat',
      // },
      {
        'title': 'Тип документа',
        'isVisible': true,
        'dataIndex': 'typeDoc',
      },
      // {
      //   'title': 'Статус',
      //   'isVisible': true,
      //   'dataIndex': 'status',
      // },
      {
        'title': 'Дата поступления',
        'isVisible': true,
        'dataIndex': 'dateReceipt',
      },

      {
        'title': 'Дата подписания',
        'isVisible': true,
        'dataIndex': 'datePost',
      },
      {
        'title': 'Загаловок',
        'isVisible': true,
        'dataIndex': 'description',
      },
    ];

    let actionColumns = [];
    let propColumns = [];

    columns.forEach((column) => {
      if (['receiptAppdateToFsms'].indexOf(column.dataIndex) !== -1) {
        actionColumns.push({
          ...column,
          order: 2,
          render: (text, row) => {
            if (!text) {
              return (<a
                onClick={(e) => {
                  this.setState({
                    ShowModal: true,
                    ColType: column.dataIndex,
                    ModalData: {
                      id: row.id,
                      key: column.dataIndex,
                      value: text,
                    },
                  });
                }}
              >{formatMessage({id: 'menu.requests.nulldate'})}</a>);
            } else {
              return (<a
                onClick={(e) => {
                  this.setState({
                    ShowModal: true,
                    ColType: column.dataIndex,
                    ModalData: {
                      id: row.id,
                      key: column.dataIndex,
                      value: text,
                    },
                  });
                }}
              >{text}</a>);
            }
          },
        });
      } else if (['appEndDate'].indexOf(column.dataIndex) !== -1) {
        actionColumns.push({
          ...column,
          order: 3,
          render: (text, row) => {
            if (!text) {
              return (<a
                onClick={(e) => {


                  this.setState({
                    ShowModal: true,
                    ColType: column.dataIndex,
                    ModalData: {
                      id: row.id,
                      key: column.dataIndex,
                      value: text,
                    },
                  });
                }}
              >{formatMessage({id: 'menu.requests.nulldate'})}</a>);
            } else {
              return (<a
                onClick={(e) => {
                  this.setState({
                    ShowModal: true,
                    ColType: column.dataIndex,
                    ModalData: {
                      id: row.id,
                      key: column.dataIndex,
                      value: '',
                    },
                  });
                }}
              >{text}</a>);
            }
          },
        });
      } else {
        propColumns.push(column);
      }
    });

    return (<PageHeaderWrapper title={formatMessage({id: 'menu.documents'})}>
        <Card style={{borderRadius: '5px', marginBottom: '10px'}} bodyStyle={{padding: 0}} bordered={true}>
          <Row>
            <Col sm={24}>
              <Layout>
                <Sider style={{ background: '#fff', padding: 0 }}
                  trigger={null}
                  collapsible
                  collapsed={this.state.collapsed}
                >
                  {/*<div className="logo" />*/}
                  {/*<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>*/}
                  {/*<Menu.Item key="1">*/}
                  {/*<Icon type="user" />*/}
                  {/*<span>nav 1</span>*/}
                  {/*</Menu.Item>*/}
                  {/*<Menu.Item key="2">*/}
                  {/*<Icon type="video-camera" />*/}
                  {/*<span>nav 2</span>*/}
                  {/*</Menu.Item>*/}
                  {/*<Menu.Item key="3">*/}
                  {/*<Icon type="upload" />*/}
                  {/*<span>nav 3</span>*/}
                  {/*</Menu.Item>*/}
                  {/*</Menu>*/}
                  <Menu
                    // style={{minWidth:'230px'}}
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                  >
                    {/*<SubMenu key="sub1" title={<span><Icon><FontAwesomeIcon icon={faFolderOpen}/></Icon><span>Документы</span></span>}>*/}
                      <SubMenu key="sub1" title={<span><Icon><FontAwesomeIcon icon={faEnvelope}/></Icon><span>Входящие</span></span>}  >
                        <Menu.Item key="3"><span><Icon><FontAwesomeIcon icon={faFolder}/></Icon>Все</span></Menu.Item>
                        <Menu.Item key="1"><span><Icon><FontAwesomeIcon icon={faCheckSquare}/></Icon>Исполненные</span></Menu.Item>
                        <Menu.Item key="2"><span><Icon><FontAwesomeIcon icon={faClock}/></Icon>На исполнение</span></Menu.Item>
                      </SubMenu>
                      {/*<Menu.Item key="4"><span><Icon><FontAwesomeIcon icon={faReply}/></Icon>Исходящие</span></Menu.Item>*/}
                    {/*</SubMenu>*/}
                  </Menu>
                </Sider>
                <Layout>
                  <Header style={{background: '#fff', padding: '0'}}>
                    <Icon
                      className={documentStyle.trigger}
                      type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                      onClick={this.toggle}
                    />
                  </Header>
                  <Content style={{
                    margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                  }}
                  >
                    <Card bodyStyle={{padding: 5}}>
                      <Row>
                        {/*<Col sm={24} md={this.state.searchercont}>*/}
                          {/*{!this.state.isSearcher &&*/}
                          {/*<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>*/}
                            {/*<Card*/}
                              {/*style={{margin: '0px 5px 10px 0px', borderRadius: '5px'}}*/}
                              {/*type="inner"*/}
                              {/*headStyle={{*/}
                                {/*padding: '0 14px',*/}
                              {/*}}*/}
                              {/*title={formatMessage({id: 'system.filter'})}*/}
                              {/*extra={<Icon style={{'cursor': 'pointer'}}*/}
                                           {/*onClick={event => this.hideleft()}><FontAwesomeIcon icon={faTimes}/></Icon>}*/}
                            {/*>*/}
                              {/*<GridFilter*/}
                                {/*clearFilter={() => {*/}
                                  {/*this.clearFilter();*/}
                                {/*}}*/}
                                {/*applyFilter={(filters) => {*/}
                                  {/*// console.log(filters);*/}
                                  {/*this.setFilter(filters);*/}
                                {/*}}*/}
                                {/*filterForm={this.state.filterForm}*/}
                                {/*dateFormat={dateFormat}*/}
                              {/*/>*/}
                            {/*</Card>*/}
                          {/*</Animated>}*/}
                        {/*</Col>*/}
                        <Col sm={24} md={this.state.tablecont}>
                          <Spin tip={formatMessage({id: 'system.loading'})} spinning={this.props.loadingData}>
                            <div className={documentStyle.documentTable}> <SmartGridView
                              name='RequestPageColumns'
                             // searchButton={false}
                              hideFilterBtn={true}
                              fixedBody={true}
                              rowKey={'id'}
                              loading={this.props.loadingData}
                              fixedHeader={true}
                              rowSelection={true}
                              actionColumns={this.state.fcolumn}
                              columns={columns}
                               sorted={true}
                                sortedInfo={this.state.sortedInfo}
                              showTotal={true}
                              showExportBtn={true}

                              dataSource={{
                                total: dataStore.totalElements,
                                pageSize: this.state.pagingConfig.length,
                                page: this.state.pagingConfig.start + 1,
                                data: dataStore.content,
                              }}
                              actionExport={() => this.exportToExcel()}
                              onShowSizeChange={(pageNumber, pageSize) => {
                                this.onShowSizeChange(pageNumber, pageSize);
                              }}
                              // addonButtons={[
                              //   <Dropdown key={'dropdown'} trigger={['click']} overlay={
                              //     <Menu>
                              //
                              //       <Menu.Item key="4" onClick={() => {
                              //
                              //         this.getservicenote();
                              //       }}>
                              //         {formatMessage({id: 'menu.requests.servicenote'})}
                              //       </Menu.Item>
                              //     </Menu>}>
                              //     <Button
                              //       key='action'
                              //     >{formatMessage({id: 'menu.mainview.actionBtn'})}
                              //       <Icon
                              //         type="down"/>
                              //     </Button>
                              //   </Dropdown>,
                              // ]}
                              onSort={(column) => {

                                if (Object.keys(column).length === 0) {
                                  this.setState(prevState => ({
                                    sortedInfo: {},
                                    pagingConfig: {
                                      ...prevState.pagingConfig,
                                      sort: [],
                                    },
                                  }), () => {
                                    this.loadMainGridData();
                                  });
                                  return;
                                }

                                this.setState(prevState => ({
                                  sortedInfo: column,
                                  pagingConfig: {
                                    ...prevState.pagingConfig,
                                    sort: [{field: column.field, 'desc': column.order === 'descend'}],
                                  },
                                }), () => {
                                  this.loadMainGridData();
                                });

                              }}
                              onSelectCell={(cellIndex, cell) => {

                              }}
                              onSelectRow={(record) => {
                                router.push('/documents/view');
                              }}
                              onFilter={(filters) => {

                              }}
                              onRefresh={() => {
                                this.refreshTable();
                              }}
                              // onSearch={() => {
                              //   this.toggleSearcher();
                              // }}
                            /></div>

                          </Spin>
                        </Col>
                      </Row>


                    </Card>
                  </Content>
                </Layout>
              </Layout>

            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>

    );
  }

}

export default Documents;
