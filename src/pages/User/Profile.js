import React, { Component } from 'react';
import { Card, List, Row, Col, Table, Spin } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva/index';

@connect(({ user, loading }) => ({
  user,
  loading: loading.effects['user/fetchCurrent'],
}))
class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        id: '1',
        username: 'admin',
        iin: '100000000000',
        surname: 'Иванов',
        firstname: 'Иван',
        patronname: 'Иванович',
        birthDate: '16.07.2017',
        phone: '87011234567',
        email: 'mark@gmail.com',
        userDRoleList: [
          {
            id: 'a87ece83-e542-4f14-845b-0e5cc575e850',
            nameRu: 'Администратор',
            nameKz: 'Администратор',
            code: 'ADMIN',
          },
        ],
        passBegDate: '',
        passEndDate: '',
        passBlockBegDate: '16.07.2017',
        passBlockEndDate: '16.07.2017',
        dcompanyId: {
          id: 'C63E5A60E30243AA82599BD4604A4CFA',
          nameRu: 'Центральный аппарат',
          nameKz: 'Центральный аппарат',
        },
        dpositionId: {
          id: '1',
          nameRu: 'Инженер',
          nameKz: 'Инженер',
        },
      },
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
  }

  render() {
    const { currentUser } = this.props.user;

    let data = [];


    if (this.props.loading !== undefined) {
      data = [{
        name: 'ФИО',
        value: currentUser.userName,
        key: 3,
      },
        {
          name: 'Телефон',
          value: currentUser.phoneNumber,
          key: 5,
        }, {
          name: 'Эл. почта',
          value: currentUser.eMail,
          key: 6,
        }, {
          name: 'Роли',
          value: currentUser.roles,
          key: 7,
        }, {
          name: 'Компания',
          value: currentUser.company,
          key: 8,
        }, {
          name: 'Должность',
          value: currentUser.position,
          key: 9,
        }];
    }

    /* data = [

       /!* {
          name: 'Дата рождения',
          value: currentUser.birthDate,
          key: 4,
        }, *!/
     /!*{
       name: 'Логин',
       value: currentUser.username,
       key: 1,
     },
     {
       name: 'ИИН',
       value: currentUser.iin,
       key: 2,
     }, *!/
     ];*/


    const columns = [{
      title: 'Наименование',
      dataIndex: 'name',
      render: (text) => <div style={{ color: 'black' }}>{text}</div>,
      width: 100,

    }, {
      title: 'Значения',
      dataIndex: 'value',
      key: 'value',
      width: 150,
    }];

    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.profile' })}>
        <Row>
          <Card
            bordered={false}
            bodyStyle={{ padding: 5 }}
          >
            <List
              itemLayout="vertical"
              style={{ paddingBottom: '5px' }}
            >
              <Spin spinning={this.props.loading}>
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{ position: 'none' }}
                  showHeader={false}
                />
              </Spin>
            </List>
          </Card>
        </Row>
      </PageHeaderWrapper>);
  }
}

export default Profile;
