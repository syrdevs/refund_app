import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
  Card,
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
  Spin,
} from 'antd';

class Searcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iin: '',
      name: '',
      surname: '',
      patronic: '',
      bdate: null,

    };
  }

  componentDidUpdate(){
  }

  applyFilters = (e) => {
    console.log(e);
  };
  formfield = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  datefield = (e) => {

  }


  ChangeDate(value, dateString) {
    this.setState({
      bdate: value
    })
  }

  render() {
    const columns = [{
      title: 'Наименование',
      dataIndex: 'name',
      render: (text, row, index) => {
          return <div style={{color: 'black',}}>{text}</div>;
        },
      width: 100,

    }, {
      title: 'Значения',
      dataIndex: 'value',
      key: 'value',
      width: 150,
    }];

    const data = [{
      name: 'ИИН',
      value: '880328301579',
    }, {
      name: 'ФАМИЛИЯ',
      value: 'Иванов',
    }, {
      name: 'ОТЧЕСТВО',
      value: 'Иванович',
    }, {
      name: 'ИМЯ',
      value: 'Иван',
    }, {
      name: 'ДАТА РОЖДЕНИЯ',
      value: '28.03.1988',
    }, {
      name: 'ПОЛ',
      value: 'Мужской',
    }];
    const mBottom = { marginBottom: '5px' };
    const { iin } = this.state;

    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.rpmu.searcher' })}>
        <Row style={{ marginBottom:'10px' }}>
          <Col span={9}>
          <Card
            title="Параметры поиска"
           /* style={{ marginRight:'10px' }}*/
            >
            <div style={mBottom}>ИИН:
              <Input value={this.state.iin} name={'iin'} onChange={(e) => {
                this.formfield(e);
              }}/>
            </div>
            <div style={mBottom}>Фамилия:
              <Input value={this.state.surname} name={'surname'} onChange={(e) => {
                this.formfield(e);
              }}/>
            </div>
            <div style={mBottom}>Имя:
              <Input value={this.state.name} name={'name'} onChange={(e) => {
                this.formfield(e);
              }}/>
            </div>
            <div style={mBottom}>Отчество:
              <Input type={'text'} value={this.state.patronic} name={'patronic'} onChange={(e) => {
                this.formfield(e);
              }}/>
            </div>
            <div style={mBottom}><p>Дата рождения:</p>
              <DatePicker format="DD.MM.YYYY" value={this.state.bdate} onChange={(e, t) =>{this.ChangeDate(e, t)}}/>
            </div>
            <div style={{ marginTop:'34px' }}>
              <Button  type='primary' style={{marginRight:"7px"}} onClick={()=>{ console.log(this.state)}}>
                Поиск
              </Button>
              <Button onClick={()=>{this.setState({
                  iin: '',
                  name: '',
                  surname: '',
                  patronic: '',
                  bdate: null,
                })
              }}>
                Очистить
              </Button>
            </div>
          </Card>
          </Col>
          <Col span={15}>
            <Card>
              <Table columns={columns} dataSource={data} pagination = {{ position: 'none' }} showHeader={false}/>
            </Card>

          </Col>
        </Row>
        <Row>

        </Row>
        <Row>
        </Row>

      </PageHeaderWrapper>
    );
  }
}

export default Searcher;

{/*<Row>
              <div style={{marginTop:'10px', display: 'flex', justifyContent: 'left', alignItems: 'left'}}>
                <Button size={'large'} key={'odobrit'} className={'btn-success'} style={{ marginRight: '10px' }}>Сохранить</Button>
                <Button size={'large'} key={'nazad'}>Назад</Button>
              </div>
            </Row>*/}




