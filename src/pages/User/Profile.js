import React, { Component } from 'react';
import {  Card, List, Row, Col, Table } from 'antd';


import PageHeaderWrapper from '@/components/PageHeaderWrapper';


class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userProfile: {
        id: "1",
        username: "admin",
        iin: "100000000000",
        surname: "КУДАЙБЕРГЕНОВ",
        firstname: "БЕКЖАН",
        patronname: null,
        birthDate: "16.07.2017",
        phone: "87029993336",
        email: "mark@gmail.com",
        userDRoleList: [
          {
            id: "a87ece83-e542-4f14-845b-0e5cc575e850",
            nameRu: "Администратор",
            nameKz: "Администратор",
            code: "ADMIN"
          }
        ],
        passBegDate: "",
        passEndDate: "",
        passBlockBegDate: "16.07.2017",
        passBlockEndDate: "16.07.2017",
        dcompanyId: {
          id: "C63E5A60E30243AA82599BD4604A4CFA",
          nameRu: "Центральный аппарат",
          nameKz: "Центральный аппарат"
        },
        dpositionId: {
          id: "1",
          nameRu: "Инженер",
          nameKz: "Инженер"
        }
      },
    }
  }




 render(){
    const {userProfile} = this.state;
    const data = [{
      name: 'Логин',
      value: userProfile.username,
    },{
      name: 'ИИН',
      value: userProfile.iin,
    },{
      name: 'ФИО',
      value: userProfile.surname+' '+userProfile.firstname +(userProfile.patronname ==null? '' : ' '+ userProfile.patronname),
    },{
      name: 'Дата рождения',
      value: userProfile.birthDate,
    },{
      name: 'Телефон',
      value: userProfile.phone,
    },{
      name: 'Эл. почта',
      value: userProfile.email,
    },{
      name: 'Роли',
      value: userProfile.userDRoleList.map((role) => role.nameRu+' ')
    },{
      name: 'Компания',
      value: userProfile.dcompanyId.nameRu,
    },{
      name: 'Должность',
      value: userProfile.dpositionId.nameRu,
    } ];
   const columns = [{
     title: 'Наименование',
     dataIndex: 'name',
     render: (text) => <div style={{color: 'black'}}>{text}</div>,
     width: 100,

   }, {
     title: 'Значения',
     dataIndex: 'value',
     key: 'value',
     width: 150,
   }];
   return(
     <PageHeaderWrapper title="Профиль">
       <Row>
         <Card
           bordered={false}
           bodyStyle={{ padding: 5 }}
         >
           <List
             itemLayout="vertical"
             style={{paddingBottom:'5px'}}
           >
             <Table
               columns={columns}
               dataSource={data}
               pagination={{ position: 'none' }}
               showHeader={false}
             />
           </List>
         </Card>
       </Row>
     </PageHeaderWrapper>)
 }
}

export default Profile;

{/*<List.Item>
  <List.Item.Meta
    title="Логин"
    description={userProfile.username}
  />
</List.Item>
<List.Item>
<List.Item.Meta
title="ИИН"
description={userProfile.iin}
/>
</List.Item>
<List.Item>
  <List.Item.Meta
    title="ФИО"
    description={userProfile.surname +' '+ userProfile.firstname +(userProfile.patronname==null ? ' ' : ' '+userProfile.patronname)}
  />
  </List.Item>
  <List.Item>
    <List.Item.Meta
      title="Дата рождения"
      description={userProfile.birthDate}
    />
  </List.Item>
  <List.Item>
  <List.Item.Meta
  title="Телефон"
  description={userProfile.phone}
  />
</List.Item>
<List.Item>
  <List.Item.Meta
    title="Эл. почта"
    description={userProfile.email}
  />
  </List.Item>*/}
