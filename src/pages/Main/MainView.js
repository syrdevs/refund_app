import React, {Component} from 'react';
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
  Divider
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import customCardStyle from './MainView.less'
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
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
      dataSource: [],
      isHidden: true,
      isItems: false,
      isSearcher: false,
      searchercont: 0,
      tablecont: 24,
      SelectStatusItems: [],
      SelectKNPItems: [],
      SelectRefundItems: [],
      SelectRefusalItems: [],
      DataTable: {
        "number":0,
        "size":15, // in one page
        "totalElements":47983, //total of data
        "totalPages":3199,
        "content":[ {
            "id":"F83632ECE881416CAB52E4D7AE377B5C",
            "lastPayDate":null,
            "payAmount":"1935.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"590110300316",
            "personSurname":"АБИТБЕКОВ",
            "personFirstname":"ЖЕТИГЕН",
            "personPatronname":"ШЫНЫБЕКОВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1935.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51300,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"92D5475ADF23415099A647E85840ACE3",
            "lastPayDate":null,
            "payAmount":"425.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"08.10.2018",
            "appEndDate":"25.10.2018",
            "entryDate":"22.10.2018 15:05",
            "receiptAppdateToFsms":"17.10.2018",
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"850803402503",
            "personSurname":"САРБАСОВА",
            "personFirstname":"ЭЛЬВИРА",
            "personPatronname":"ДУЙСЕНГАЛИЕВНА",
            "medinsStatus":null,
            "refundPayAmount":425.00,
            "refundStatus":2,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:05",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"052018",
            "outPayOrderNum":51299,
            "applicationId": {
              "id":"074AC52DFC89483FB49C6076284CB0CE",
              "appNumber":"7852",
              "appDate":"22.10.2018",
              "payOrderDate":"23.08.2018",
              "payOrderNum":"002225978",
              "reference":"SB18824461967902",
              "refundCount":1,
              "receiptAppdateToFsms":"17.10.2018",
              "appEndDate":"25.10.2018",
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039325545",
            "gcvpOrderNum":"37801881 ",
            "gcvpOrderDate":"25.08.2018",
            "rpmuCheckResult":"Не соответствует дата рождения;",
            "dappRefundStatusId": {
              "id": "4", "parentId": null, "nameRu": "Обработано - отказано", "nameKz": null, "code": "00004", "version": 1.0
            }
            ,
            "ddenyReasonId": {
              "id": "1", "parentId": null, "nameRu": "Частичный возврат по одному участнику", "nameKz": "Частичный возврат по одному участнику", "code": "1", "version": 1.0
            }
            ,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
          ,
          {
            "id":"F2458D2B3C8D40E7B0307D51CB9D1699",
            "lastPayDate":null,
            "payAmount":"450.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"19.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 12:43",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"731201401557",
            "personSurname":"КАРЫБАЕВА",
            "personFirstname":"ЗАМЗАГУЛ",
            "personPatronname":"БЕКЕНОВНА",
            "medinsStatus":null,
            "refundPayAmount":450.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 12:43",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"062018",
            "outPayOrderNum":51288,
            "applicationId": {
              "id":"AD511E558DC7498FB33F4B0115065541",
              "appNumber":"8994",
              "appDate":"22.10.2018",
              "payOrderDate":"23.07.2018",
              "payOrderNum":"657578   ",
              "reference":"IOA0000000300225",
              "refundCount":4,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039070777",
            "gcvpOrderNum":"37292379 ",
            "gcvpOrderDate":"23.07.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
          ,
          {
            "id":"3B415077BCA0405593EDA3151369451F",
            "lastPayDate":null,
            "payAmount":"1035.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"19.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 12:43",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"970714351661",
            "personSurname":"КРАМСКОЙ",
            "personFirstname":"ВЛАДИСЛАВ",
            "personPatronname":"НИКОЛАЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1035.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 12:43",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"062018",
            "outPayOrderNum":51286,
            "applicationId": {
              "id":"AD511E558DC7498FB33F4B0115065541",
              "appNumber":"8994",
              "appDate":"22.10.2018",
              "payOrderDate":"23.07.2018",
              "payOrderNum":"657578   ",
              "reference":"IOA0000000300225",
              "refundCount":4,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039070777",
            "gcvpOrderNum":"37292379 ",
            "gcvpOrderDate":"23.07.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
          ,
          {
            "id":"E94C941ECF7740609DC2D02ED8A8352C",
            "lastPayDate":null,
            "payAmount":"450.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"19.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 12:43",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"731201401557",
            "personSurname":"КАРЫБАЕВА",
            "personFirstname":"ЗАМЗАГУЛ",
            "personPatronname":"БЕКЕНОВНА",
            "medinsStatus":null,
            "refundPayAmount":450.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 12:43",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"022018",
            "outPayOrderNum":51287,
            "applicationId": {
              "id":"AD511E558DC7498FB33F4B0115065541",
              "appNumber":"8994",
              "appDate":"22.10.2018",
              "payOrderDate":"23.07.2018",
              "payOrderNum":"657578   ",
              "reference":"IOA0000000300225",
              "refundCount":4,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039070777",
            "gcvpOrderNum":"37292379 ",
            "gcvpOrderDate":"23.07.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
          ,
          {
            "id":"3872890E9A9F46AAB67B754020E645F9",
            "lastPayDate":null,
            "payAmount":"833.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"22.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 17:51",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"801218301320",
            "personSurname":"ШПЕКОВ",
            "personFirstname":"АЗАТ",
            "personPatronname":"САЛИМОВИЧ",
            "medinsStatus":null,
            "refundPayAmount":833.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 17:51",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"082018",
            "outPayOrderNum":51324,
            "applicationId": {
              "id":"CFC7944BE75544BDA78790377D9C2E04",
              "appNumber":"9232",
              "appDate":"22.10.2018",
              "payOrderDate":"19.09.2018",
              "payOrderNum":"2086     ",
              "reference":"5318919277012649",
              "refundCount":1,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121",
                "parentId": null,
                "nameRu": "Отчисления на обязательное социальное медицинское страхование",
                "nameKz": null,
                "code": null,
                "shortname": "Обяз.соц.мед.страх.",
                "knpType": "1",
                "letter": null,
                "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039556609",
            "gcvpOrderNum":"38210729 ",
            "gcvpOrderDate":"20.09.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"E60DD0F935A241A5B9826E04337D6C19",
            "lastPayDate":null,
            "payAmount":"1247.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"770715450099",
            "personSurname":"СЕИТОВА",
            "personFirstname":"ИНДИРА",
            "personPatronname":"САПУАНОВНА",
            "medinsStatus":null,
            "refundPayAmount":1247.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51309,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"99FD3EB4D56F4018BDB7C8BFCB6C10BE",
            "lastPayDate":null,
            "payAmount":"1772.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"700116302415",
            "personSurname":"МЫЛТЫКБАЕВ",
            "personFirstname":"ДАУЛЕТ",
            "personPatronname":"ТУРСЫНГАЗЫЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1772.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51308,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"95627EBBAA814CF1B880AECE2FF75BB9",
            "lastPayDate":null,
            "payAmount":"1620.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"740602400356",
            "personSurname":"КАЛИЕВА",
            "personFirstname":"АСЕТ",
            "personPatronname":"АХМЕТОВНА",
            "medinsStatus":null,
            "refundPayAmount":1620.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51307,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"2657736C188C41DA891A4890318D6250",
            "lastPayDate":null,
            "payAmount":"2254.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"650823301959",
            "personSurname":"ИМАНКУЛОВ",
            "personFirstname":"ЕРЛАН",
            "personPatronname":"КАБЫЛГАЛИЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":2254.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51306,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"0D259975ADF546A191703144B9C6205C",
            "lastPayDate":null,
            "payAmount":"2559.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"640808302468",
            "personSurname":"ЖАРУЛЛАЕВ",
            "personFirstname":"ШАХИМУРАТ",
            "personPatronname":"РАБУЛЛАЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":2559.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51305,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"CC07293BCFA9467ABAAE85CEC22ECADD",
            "lastPayDate":null,
            "payAmount":"2100.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"621010302607",
            "personSurname":"ДУЙСЕНБАЕВ",
            "personFirstname":"ЖУМАБЕК",
            "personPatronname":"ЖУМАТАЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":2100.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51304,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"973EF2E9DCBC44ACAC77866AD9C413AB",
            "lastPayDate":null,
            "payAmount":"2450.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"640203350449",
            "personSurname":"ГУСЕВ",
            "personFirstname":"ПЕТР",
            "personPatronname":"АНДРЕЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":2450.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51303,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"06D99163A64F4D578E7DF95641CB923A",
            "lastPayDate":null,
            "payAmount":"1935.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"680110303082",
            "personSurname":"БОНДАРЕВ",
            "personFirstname":"ВЛАДИМИР",
            "personPatronname":"ВИКТОРОВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1935.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51302,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"6A6A4A3F6B834243BE4E05031F83E277",
            "lastPayDate":null,
            "payAmount":"1797.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"700127302777",
            "personSurname":"АЗАМАТОВ",
            "personFirstname":"САБЫРГАЛИ",
            "personPatronname":"КАИРБОЛАТОВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1797.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51301,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"F83632ECE881416CAB52E4D7AE377B5C",
            "lastPayDate":null,
            "payAmount":"1935.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"590110300316",
            "personSurname":"АБИТБЕКОВ",
            "personFirstname":"ЖЕТИГЕН",
            "personPatronname":"ШЫНЫБЕКОВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1935.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51300,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"92D5475ADF23415099A647E85840ACE3",
            "lastPayDate":null,
            "payAmount":"425.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"08.10.2018",
            "appEndDate":"25.10.2018",
            "entryDate":"22.10.2018 15:05",
            "receiptAppdateToFsms":"17.10.2018",
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"850803402503",
            "personSurname":"САРБАСОВА",
            "personFirstname":"ЭЛЬВИРА",
            "personPatronname":"ДУЙСЕНГАЛИЕВНА",
            "medinsStatus":null,
            "refundPayAmount":425.00,
            "refundStatus":2,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:05",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"052018",
            "outPayOrderNum":51299,
            "applicationId": {
              "id":"074AC52DFC89483FB49C6076284CB0CE",
              "appNumber":"7852",
              "appDate":"22.10.2018",
              "payOrderDate":"23.08.2018",
              "payOrderNum":"002225978",
              "reference":"SB18824461967902",
              "refundCount":1,
              "receiptAppdateToFsms":"17.10.2018",
              "appEndDate":"25.10.2018",
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039325545",
            "gcvpOrderNum":"37801881 ",
            "gcvpOrderDate":"25.08.2018",
            "rpmuCheckResult":"Не соответствует дата рождения;",
            "dappRefundStatusId": {
              "id": "4", "parentId": null, "nameRu": "Обработано - отказано", "nameKz": null, "code": "00004", "version": 1.0
            }
            ,
            "ddenyReasonId": {
              "id": "1", "parentId": null, "nameRu": "Частичный возврат по одному участнику", "nameKz": "Частичный возврат по одному участнику", "code": "1", "version": 1.0
            }
            ,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
          ,
          {
            "id":"F2458D2B3C8D40E7B0307D51CB9D1699",
            "lastPayDate":null,
            "payAmount":"450.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"19.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 12:43",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"731201401557",
            "personSurname":"КАРЫБАЕВА",
            "personFirstname":"ЗАМЗАГУЛ",
            "personPatronname":"БЕКЕНОВНА",
            "medinsStatus":null,
            "refundPayAmount":450.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 12:43",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"062018",
            "outPayOrderNum":51288,
            "applicationId": {
              "id":"AD511E558DC7498FB33F4B0115065541",
              "appNumber":"8994",
              "appDate":"22.10.2018",
              "payOrderDate":"23.07.2018",
              "payOrderNum":"657578   ",
              "reference":"IOA0000000300225",
              "refundCount":4,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039070777",
            "gcvpOrderNum":"37292379 ",
            "gcvpOrderDate":"23.07.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
          ,
          {
            "id":"3B415077BCA0405593EDA3151369451F",
            "lastPayDate":null,
            "payAmount":"1035.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"19.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 12:43",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"970714351661",
            "personSurname":"КРАМСКОЙ",
            "personFirstname":"ВЛАДИСЛАВ",
            "personPatronname":"НИКОЛАЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1035.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 12:43",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"062018",
            "outPayOrderNum":51286,
            "applicationId": {
              "id":"AD511E558DC7498FB33F4B0115065541",
              "appNumber":"8994",
              "appDate":"22.10.2018",
              "payOrderDate":"23.07.2018",
              "payOrderNum":"657578   ",
              "reference":"IOA0000000300225",
              "refundCount":4,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039070777",
            "gcvpOrderNum":"37292379 ",
            "gcvpOrderDate":"23.07.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
          ,
          {
            "id":"E94C941ECF7740609DC2D02ED8A8352C",
            "lastPayDate":null,
            "payAmount":"450.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"19.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 12:43",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"731201401557",
            "personSurname":"КАРЫБАЕВА",
            "personFirstname":"ЗАМЗАГУЛ",
            "personPatronname":"БЕКЕНОВНА",
            "medinsStatus":null,
            "refundPayAmount":450.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 12:43",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"022018",
            "outPayOrderNum":51287,
            "applicationId": {
              "id":"AD511E558DC7498FB33F4B0115065541",
              "appNumber":"8994",
              "appDate":"22.10.2018",
              "payOrderDate":"23.07.2018",
              "payOrderNum":"657578   ",
              "reference":"IOA0000000300225",
              "refundCount":4,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039070777",
            "gcvpOrderNum":"37292379 ",
            "gcvpOrderDate":"23.07.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
          ,
          {
            "id":"3872890E9A9F46AAB67B754020E645F9",
            "lastPayDate":null,
            "payAmount":"833.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"22.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 17:51",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"801218301320",
            "personSurname":"ШПЕКОВ",
            "personFirstname":"АЗАТ",
            "personPatronname":"САЛИМОВИЧ",
            "medinsStatus":null,
            "refundPayAmount":833.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 17:51",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"082018",
            "outPayOrderNum":51324,
            "applicationId": {
              "id":"CFC7944BE75544BDA78790377D9C2E04",
              "appNumber":"9232",
              "appDate":"22.10.2018",
              "payOrderDate":"19.09.2018",
              "payOrderNum":"2086     ",
              "reference":"5318919277012649",
              "refundCount":1,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121",
                "parentId": null,
                "nameRu": "Отчисления на обязательное социальное медицинское страхование",
                "nameKz": null,
                "code": null,
                "shortname": "Обяз.соц.мед.страх.",
                "knpType": "1",
                "letter": null,
                "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039556609",
            "gcvpOrderNum":"38210729 ",
            "gcvpOrderDate":"20.09.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"E60DD0F935A241A5B9826E04337D6C19",
            "lastPayDate":null,
            "payAmount":"1247.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"770715450099",
            "personSurname":"СЕИТОВА",
            "personFirstname":"ИНДИРА",
            "personPatronname":"САПУАНОВНА",
            "medinsStatus":null,
            "refundPayAmount":1247.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51309,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"99FD3EB4D56F4018BDB7C8BFCB6C10BE",
            "lastPayDate":null,
            "payAmount":"1772.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"700116302415",
            "personSurname":"МЫЛТЫКБАЕВ",
            "personFirstname":"ДАУЛЕТ",
            "personPatronname":"ТУРСЫНГАЗЫЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1772.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51308,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"95627EBBAA814CF1B880AECE2FF75BB9",
            "lastPayDate":null,
            "payAmount":"1620.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"740602400356",
            "personSurname":"КАЛИЕВА",
            "personFirstname":"АСЕТ",
            "personPatronname":"АХМЕТОВНА",
            "medinsStatus":null,
            "refundPayAmount":1620.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51307,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"2657736C188C41DA891A4890318D6250",
            "lastPayDate":null,
            "payAmount":"2254.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"650823301959",
            "personSurname":"ИМАНКУЛОВ",
            "personFirstname":"ЕРЛАН",
            "personPatronname":"КАБЫЛГАЛИЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":2254.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51306,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"0D259975ADF546A191703144B9C6205C",
            "lastPayDate":null,
            "payAmount":"2559.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"640808302468",
            "personSurname":"ЖАРУЛЛАЕВ",
            "personFirstname":"ШАХИМУРАТ",
            "personPatronname":"РАБУЛЛАЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":2559.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51305,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"CC07293BCFA9467ABAAE85CEC22ECADD",
            "lastPayDate":null,
            "payAmount":"2100.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"621010302607",
            "personSurname":"ДУЙСЕНБАЕВ",
            "personFirstname":"ЖУМАБЕК",
            "personPatronname":"ЖУМАТАЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":2100.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51304,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"973EF2E9DCBC44ACAC77866AD9C413AB",
            "lastPayDate":null,
            "payAmount":"2450.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"640203350449",
            "personSurname":"ГУСЕВ",
            "personFirstname":"ПЕТР",
            "personPatronname":"АНДРЕЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":2450.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51303,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"06D99163A64F4D578E7DF95641CB923A",
            "lastPayDate":null,
            "payAmount":"1935.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"680110303082",
            "personSurname":"БОНДАРЕВ",
            "personFirstname":"ВЛАДИМИР",
            "personPatronname":"ВИКТОРОВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1935.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51302,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"6A6A4A3F6B834243BE4E05031F83E277",
            "lastPayDate":null,
            "payAmount":"1797.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"700127302777",
            "personSurname":"АЗАМАТОВ",
            "personFirstname":"САБЫРГАЛИ",
            "personPatronname":"КАИРБОЛАТОВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1797.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51301,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"F83632ECE881416CAB52E4D7AE377B5C",
            "lastPayDate":null,
            "payAmount":"1935.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"590110300316",
            "personSurname":"АБИТБЕКОВ",
            "personFirstname":"ЖЕТИГЕН",
            "personPatronname":"ШЫНЫБЕКОВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1935.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51300,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"92D5475ADF23415099A647E85840ACE3",
            "lastPayDate":null,
            "payAmount":"425.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"08.10.2018",
            "appEndDate":"25.10.2018",
            "entryDate":"22.10.2018 15:05",
            "receiptAppdateToFsms":"17.10.2018",
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"850803402503",
            "personSurname":"САРБАСОВА",
            "personFirstname":"ЭЛЬВИРА",
            "personPatronname":"ДУЙСЕНГАЛИЕВНА",
            "medinsStatus":null,
            "refundPayAmount":425.00,
            "refundStatus":2,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:05",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"052018",
            "outPayOrderNum":51299,
            "applicationId": {
              "id":"074AC52DFC89483FB49C6076284CB0CE",
              "appNumber":"7852",
              "appDate":"22.10.2018",
              "payOrderDate":"23.08.2018",
              "payOrderNum":"002225978",
              "reference":"SB18824461967902",
              "refundCount":1,
              "receiptAppdateToFsms":"17.10.2018",
              "appEndDate":"25.10.2018",
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039325545",
            "gcvpOrderNum":"37801881 ",
            "gcvpOrderDate":"25.08.2018",
            "rpmuCheckResult":"Не соответствует дата рождения;",
            "dappRefundStatusId": {
              "id": "4", "parentId": null, "nameRu": "Обработано - отказано", "nameKz": null, "code": "00004", "version": 1.0
            }
            ,
            "ddenyReasonId": {
              "id": "1", "parentId": null, "nameRu": "Частичный возврат по одному участнику", "nameKz": "Частичный возврат по одному участнику", "code": "1", "version": 1.0
            }
            ,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
          ,
          {
            "id":"F2458D2B3C8D40E7B0307D51CB9D1699",
            "lastPayDate":null,
            "payAmount":"450.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"19.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 12:43",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"731201401557",
            "personSurname":"КАРЫБАЕВА",
            "personFirstname":"ЗАМЗАГУЛ",
            "personPatronname":"БЕКЕНОВНА",
            "medinsStatus":null,
            "refundPayAmount":450.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 12:43",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"062018",
            "outPayOrderNum":51288,
            "applicationId": {
              "id":"AD511E558DC7498FB33F4B0115065541",
              "appNumber":"8994",
              "appDate":"22.10.2018",
              "payOrderDate":"23.07.2018",
              "payOrderNum":"657578   ",
              "reference":"IOA0000000300225",
              "refundCount":4,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039070777",
            "gcvpOrderNum":"37292379 ",
            "gcvpOrderDate":"23.07.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
          ,
          {
            "id":"3B415077BCA0405593EDA3151369451F",
            "lastPayDate":null,
            "payAmount":"1035.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"19.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 12:43",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"970714351661",
            "personSurname":"КРАМСКОЙ",
            "personFirstname":"ВЛАДИСЛАВ",
            "personPatronname":"НИКОЛАЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1035.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 12:43",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"062018",
            "outPayOrderNum":51286,
            "applicationId": {
              "id":"AD511E558DC7498FB33F4B0115065541",
              "appNumber":"8994",
              "appDate":"22.10.2018",
              "payOrderDate":"23.07.2018",
              "payOrderNum":"657578   ",
              "reference":"IOA0000000300225",
              "refundCount":4,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039070777",
            "gcvpOrderNum":"37292379 ",
            "gcvpOrderDate":"23.07.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
          ,
          {
            "id":"E94C941ECF7740609DC2D02ED8A8352C",
            "lastPayDate":null,
            "payAmount":"450.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"19.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 12:43",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"731201401557",
            "personSurname":"КАРЫБАЕВА",
            "personFirstname":"ЗАМЗАГУЛ",
            "personPatronname":"БЕКЕНОВНА",
            "medinsStatus":null,
            "refundPayAmount":450.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 12:43",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"022018",
            "outPayOrderNum":51287,
            "applicationId": {
              "id":"AD511E558DC7498FB33F4B0115065541",
              "appNumber":"8994",
              "appDate":"22.10.2018",
              "payOrderDate":"23.07.2018",
              "payOrderNum":"657578   ",
              "reference":"IOA0000000300225",
              "refundCount":4,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039070777",
            "gcvpOrderNum":"37292379 ",
            "gcvpOrderDate":"23.07.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
          ,
          {
            "id":"3872890E9A9F46AAB67B754020E645F9",
            "lastPayDate":null,
            "payAmount":"833.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"22.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 17:51",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"801218301320",
            "personSurname":"ШПЕКОВ",
            "personFirstname":"АЗАТ",
            "personPatronname":"САЛИМОВИЧ",
            "medinsStatus":null,
            "refundPayAmount":833.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 17:51",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"082018",
            "outPayOrderNum":51324,
            "applicationId": {
              "id":"CFC7944BE75544BDA78790377D9C2E04",
              "appNumber":"9232",
              "appDate":"22.10.2018",
              "payOrderDate":"19.09.2018",
              "payOrderNum":"2086     ",
              "reference":"5318919277012649",
              "refundCount":1,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121",
                "parentId": null,
                "nameRu": "Отчисления на обязательное социальное медицинское страхование",
                "nameKz": null,
                "code": null,
                "shortname": "Обяз.соц.мед.страх.",
                "knpType": "1",
                "letter": null,
                "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039556609",
            "gcvpOrderNum":"38210729 ",
            "gcvpOrderDate":"20.09.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"E60DD0F935A241A5B9826E04337D6C19",
            "lastPayDate":null,
            "payAmount":"1247.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"770715450099",
            "personSurname":"СЕИТОВА",
            "personFirstname":"ИНДИРА",
            "personPatronname":"САПУАНОВНА",
            "medinsStatus":null,
            "refundPayAmount":1247.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51309,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"99FD3EB4D56F4018BDB7C8BFCB6C10BE",
            "lastPayDate":null,
            "payAmount":"1772.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"700116302415",
            "personSurname":"МЫЛТЫКБАЕВ",
            "personFirstname":"ДАУЛЕТ",
            "personPatronname":"ТУРСЫНГАЗЫЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1772.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51308,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"95627EBBAA814CF1B880AECE2FF75BB9",
            "lastPayDate":null,
            "payAmount":"1620.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"740602400356",
            "personSurname":"КАЛИЕВА",
            "personFirstname":"АСЕТ",
            "personPatronname":"АХМЕТОВНА",
            "medinsStatus":null,
            "refundPayAmount":1620.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51307,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"2657736C188C41DA891A4890318D6250",
            "lastPayDate":null,
            "payAmount":"2254.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"650823301959",
            "personSurname":"ИМАНКУЛОВ",
            "personFirstname":"ЕРЛАН",
            "personPatronname":"КАБЫЛГАЛИЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":2254.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51306,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"0D259975ADF546A191703144B9C6205C",
            "lastPayDate":null,
            "payAmount":"2559.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"640808302468",
            "personSurname":"ЖАРУЛЛАЕВ",
            "personFirstname":"ШАХИМУРАТ",
            "personPatronname":"РАБУЛЛАЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":2559.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51305,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"CC07293BCFA9467ABAAE85CEC22ECADD",
            "lastPayDate":null,
            "payAmount":"2100.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"621010302607",
            "personSurname":"ДУЙСЕНБАЕВ",
            "personFirstname":"ЖУМАБЕК",
            "personPatronname":"ЖУМАТАЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":2100.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51304,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"973EF2E9DCBC44ACAC77866AD9C413AB",
            "lastPayDate":null,
            "payAmount":"2450.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"640203350449",
            "personSurname":"ГУСЕВ",
            "personFirstname":"ПЕТР",
            "personPatronname":"АНДРЕЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":2450.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51303,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"06D99163A64F4D578E7DF95641CB923A",
            "lastPayDate":null,
            "payAmount":"1935.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"680110303082",
            "personSurname":"БОНДАРЕВ",
            "personFirstname":"ВЛАДИМИР",
            "personPatronname":"ВИКТОРОВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1935.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51302,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"6A6A4A3F6B834243BE4E05031F83E277",
            "lastPayDate":null,
            "payAmount":"1797.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"700127302777",
            "personSurname":"АЗАМАТОВ",
            "personFirstname":"САБЫРГАЛИ",
            "personPatronname":"КАИРБОЛАТОВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1797.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51301,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"F83632ECE881416CAB52E4D7AE377B5C",
            "lastPayDate":null,
            "payAmount":"1935.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"17.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 15:11",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"590110300316",
            "personSurname":"АБИТБЕКОВ",
            "personFirstname":"ЖЕТИГЕН",
            "personPatronname":"ШЫНЫБЕКОВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1935.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:11",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"012018",
            "outPayOrderNum":51300,
            "applicationId": {
              "id":"0B1F557C484F4D428E104ED265792040",
              "appNumber":"8951",
              "appDate":"19.10.2018",
              "payOrderDate":"02.02.2018",
              "payOrderNum":"72400899 ",
              "reference":"TRE351709239",
              "refundCount":10,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00037805789",
            "gcvpOrderNum":"34768765 ",
            "gcvpOrderDate":"02.02.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "51E748D88D4637A6E054001B782A74A6", "parentId": null, "nameRu": "Ошибочно перечислены", "nameKz": null, "code": "00111", "version": 1.0
            }
          }
          ,
          {
            "id":"92D5475ADF23415099A647E85840ACE3",
            "lastPayDate":null,
            "payAmount":"425.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"08.10.2018",
            "appEndDate":"25.10.2018",
            "entryDate":"22.10.2018 15:05",
            "receiptAppdateToFsms":"17.10.2018",
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"850803402503",
            "personSurname":"САРБАСОВА",
            "personFirstname":"ЭЛЬВИРА",
            "personPatronname":"ДУЙСЕНГАЛИЕВНА",
            "medinsStatus":null,
            "refundPayAmount":425.00,
            "refundStatus":2,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 15:05",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"052018",
            "outPayOrderNum":51299,
            "applicationId": {
              "id":"074AC52DFC89483FB49C6076284CB0CE",
              "appNumber":"7852",
              "appDate":"22.10.2018",
              "payOrderDate":"23.08.2018",
              "payOrderNum":"002225978",
              "reference":"SB18824461967902",
              "refundCount":1,
              "receiptAppdateToFsms":"17.10.2018",
              "appEndDate":"25.10.2018",
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039325545",
            "gcvpOrderNum":"37801881 ",
            "gcvpOrderDate":"25.08.2018",
            "rpmuCheckResult":"Не соответствует дата рождения;",
            "dappRefundStatusId": {
              "id": "4", "parentId": null, "nameRu": "Обработано - отказано", "nameKz": null, "code": "00004", "version": 1.0
            }
            ,
            "ddenyReasonId": {
              "id": "1", "parentId": null, "nameRu": "Частичный возврат по одному участнику", "nameKz": "Частичный возврат по одному участнику", "code": "1", "version": 1.0
            }
            ,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
          ,
          {
            "id":"F2458D2B3C8D40E7B0307D51CB9D1699",
            "lastPayDate":null,
            "payAmount":"450.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"19.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 12:43",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"731201401557",
            "personSurname":"КАРЫБАЕВА",
            "personFirstname":"ЗАМЗАГУЛ",
            "personPatronname":"БЕКЕНОВНА",
            "medinsStatus":null,
            "refundPayAmount":450.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 12:43",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"062018",
            "outPayOrderNum":51288,
            "applicationId": {
              "id":"AD511E558DC7498FB33F4B0115065541",
              "appNumber":"8994",
              "appDate":"22.10.2018",
              "payOrderDate":"23.07.2018",
              "payOrderNum":"657578   ",
              "reference":"IOA0000000300225",
              "refundCount":4,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039070777",
            "gcvpOrderNum":"37292379 ",
            "gcvpOrderDate":"23.07.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
          ,
          {
            "id":"3B415077BCA0405593EDA3151369451F",
            "lastPayDate":null,
            "payAmount":"1035.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"19.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 12:43",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"970714351661",
            "personSurname":"КРАМСКОЙ",
            "personFirstname":"ВЛАДИСЛАВ",
            "personPatronname":"НИКОЛАЕВИЧ",
            "medinsStatus":null,
            "refundPayAmount":1035.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 12:43",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"062018",
            "outPayOrderNum":51286,
            "applicationId": {
              "id":"AD511E558DC7498FB33F4B0115065541",
              "appNumber":"8994",
              "appDate":"22.10.2018",
              "payOrderDate":"23.07.2018",
              "payOrderNum":"657578   ",
              "reference":"IOA0000000300225",
              "refundCount":4,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039070777",
            "gcvpOrderNum":"37292379 ",
            "gcvpOrderDate":"23.07.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
          ,
          {
            "id":"E94C941ECF7740609DC2D02ED8A8352C",
            "lastPayDate":null,
            "payAmount":"450.00",
            "refundEntryDate":"22.10.2018",
            "appPayerDate":"19.10.2018",
            "appEndDate":null,
            "entryDate":"22.10.2018 12:43",
            "receiptAppdateToFsms":null,
            "refundDate":null,
            "lastMedcarePayCount":null,
            "personIin":"731201401557",
            "personSurname":"КАРЫБАЕВА",
            "personFirstname":"ЗАМЗАГУЛ",
            "personPatronname":"БЕКЕНОВНА",
            "medinsStatus":null,
            "refundPayAmount":450.00,
            "refundStatus":null,
            "appRefundStatus":1,
            "refundStatusText":null,
            "refundDocumentList":null,
            "daysLeft":null,
            "changeDate":"22.10.2018 12:43",
            "wsStatus":0,
            "wsStatusMessage":null,
            "payPeriod":"022018",
            "outPayOrderNum":51287,
            "applicationId": {
              "id":"AD511E558DC7498FB33F4B0115065541",
              "appNumber":"8994",
              "appDate":"22.10.2018",
              "payOrderDate":"23.07.2018",
              "payOrderNum":"657578   ",
              "reference":"IOA0000000300225",
              "refundCount":4,
              "receiptAppdateToFsms":null,
              "appEndDate":null,
              "dknpId": {
                "id": "121", "parentId": null, "nameRu": "Отчисления на обязательное социальное медицинское страхование", "nameKz": null, "code": null, "shortname": "Обяз.соц.мед.страх.", "knpType": "1", "letter": null, "shortnameKz": null
              }
            }
            ,
            "gcvpReference":"GCVP-00039070777",
            "gcvpOrderNum":"37292379 ",
            "gcvpOrderDate":"23.07.2018",
            "rpmuCheckResult":null,
            "dappRefundStatusId": {
              "id": "10", "parentId": null, "nameRu": "Принято", "nameKz": "Принято", "code": "00010", "version": 1.0
            }
            ,
            "ddenyReasonId":null,
            "drefundReasonId": {
              "id": "9", "parentId": null, "nameRu": "Плательщиком или банком дважды перечислено", "nameKz": "Плательщиком или банком дважды перечислено", "code": "9", "version": 1.0
            }
          }
        ]
      }
    }
  }




  componentDidMount() {
    this.setState({
      columns: [
        {
          title: 'Действие',
          key: 'operation',
          isVisible: true,
          fixed: 'left',
          width: 100,
          onCell: (record) => {
            return {
              onClick: () => {this.toggleItems(record)}
            }
          },
          render: () => <Button><Icon type="database" theme="outlined" /></Button>,
        },
        {
          title: 'Платеж',
          isVisible: true,
          dataIndex: 'payAmount'
        },
        {
          title: 'Фамилия',
          isVisible: true,
          dataIndex: 'personSurname',
        },
        {
          title: 'Имя',
          isVisible: true,
          dataIndex: 'personFirstname',
        },
        {
          title: 'Отчество',
          dataIndex: 'personPatronname',
        }
      ],
      dataSource: this.state.DataTable.content.slice(0,9)
    });
    const children =[];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    this.setState({
      SelectStatusItems: children,
      SelectKNPItems: children,
      SelectRefundItems: children,
      SelectRefusalItems: children
    });

  }
  componentWillReceiveProps(props) {
    console.log(props);
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
  onShowSizeChange = (current, pageSize) => {
    const max = current*pageSize;
    const min = max-pageSize;
    console.log("max = " + max);
    console.log("min = " + min);
    console.log(this.state.DataTable);
    this.setState({
      dataSource: this.state.DataTable.content.slice(min,max)
    })
  }



  toggleSearcher () {
      this.setState({
        isHidden: false,
        isItems: true,
        isSearcher: false,
        searchercont: 6,
        tablecont: 18
      })
  }
  toggleItems() {
      this.setState({
        isHidden: false,
        isItems: false,
        isSearcher: true,
        searchercont: 8,
        tablecont: 16
      })
  }
  hideleft() {
    if(!this.state.isHidden) {
      this.setState({
        isHidden: true,
        isItems: false,
        isSearcher: false,
        searchercont: 0,
        tablecont: 24
      });
    }
  }

  render() {
    const dateFormat = 'YYYY/MM/DD';
    const {columns, dataSource} = this.state;
    const testcolumns = [
      { title: 'Full Name', dataIndex: 'name', key: 'name', fixed: 'left' },
      { title: 'Age', dataIndex: 'age', key: 'age'},
      { title: 'Column 1', dataIndex: 'age', key: '1' },
      { title: 'Column 2', dataIndex: 'age', key: '2' },
      { title: 'Column 3', dataIndex: 'address', key: '3' },
      { title: 'Column 4', dataIndex: 'address', key: '4' },
      { title: 'Column 5', dataIndex: 'address', key: '5' },
      { title: 'Column 6', dataIndex: 'address', key: '6' },
      { title: 'Column 7', dataIndex: 'address', key: '7' },
      { title: 'Column 8', dataIndex: 'address', key: '8' }
    ];
    const testdata = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 40,
      address: 'London Park',
    },{
      key: '3',
      name: 'John Brown',
      age: 32,
      address: 'New York Park',
    }, {
      key: '4',
      name: 'Jim Green',
      age: 40,
      address: 'London Park',
    },{
      key: '5',
      name: 'John Brown',
      age: 32,
      address: 'New York Park',
    }, {
      key: '6',
      name: 'Jim Green',
      age: 40,
      address: 'London Park',
    },{
      key: '7',
      name: 'John Brown',
      age: 32,
      address: 'New York Park',
    }, {
      key: '8',
      name: 'Jim Green',
      age: 40,
      address: 'London Park',
    },{
      key: '9',
      name: 'John Brown',
      age: 32,
      address: 'New York Park',
    }, {
      key: '10',
      name: 'Jim Green',
      age: 40,
      address: 'London Park',
    }];

    const SearcherDiv = () => (<Card
        type="inner"
        title="Фильтр"
        extra={<Button onClick={(event) => this.hideleft()}>х</Button>}
      >
        <Form layout={'vertical'}>
          <FormItem>
            <Divider orientation="left">Номер заявки</Divider>
            <Input />
          </FormItem>
          <FormItem>
            <Divider orientation="left">ИИН Потребителя</Divider>
            <Input />
          </FormItem>
          <FormItem label="Статус заявки на возврат">
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder=""
              defaultValue={['a10', 'c12']}
            >
              {this.state.SelectStatusItems}
            </Select>
          </FormItem>
          <FormItem label="Крайная дата">
            <RangePicker
              defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
              format={dateFormat}/>
          </FormItem>
          <FormItem label="Дата заявления плательщика">
            <RangePicker
              defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
              format={dateFormat}/>
          </FormItem>
          <FormItem label="Дата поступление заявки на возврат">
            <RangePicker
              defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
              format={dateFormat}/>
          </FormItem>
          <FormItem label="Дата поступления заявление в Фонд">
            <RangePicker
              defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
              format={dateFormat}/>
          </FormItem>
          <FormItem label="Дата осуществления возврата">
            <RangePicker
              defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
              format={dateFormat}/>
          </FormItem>
          <FormItem label="КНП">
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder=""
              defaultValue={[]}
            >
              {this.state.SelectKNPItems}
            </Select>
          </FormItem>
          <FormItem label="Причина возврата">
            <Select size={'default'}>
              {this.state.SelectRefundItems}
            </Select>
          </FormItem>
          <FormItem label="Причина отказа">
            <Select size={'default'}>
              {this.state.SelectRefusalItems}
            </Select>
          </FormItem>
          <FormItem >
            <Row>
              <Col span={12}>
                <Button type="primary" icon="search">Искать</Button>
              </Col>
              <Col span={12}>
                <Button icon="delete">Очистить</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Card>)
    const DataDiv = () => (
        <Card
          bodyStyle={{padding:0}}
          type="inner"
          title="Платежи РПМУ"
          extra={<Button onClick={(event) => this.hideleft()}>х</Button>}
        >
          <Table columns={testcolumns} dataSource={testdata} scroll={{ x: 1300 }} />
        </Card>
    )


    const menuItems = columns.map(function (column, index) {
      return (<Menu.Item key={index.toString()}>
        <Checkbox onChange={this.handleSelectColumn.bind(this, column)}
                  checked={column.isVisible}>{column.title}</Checkbox>
      </Menu.Item>);
    }, this);
    const menu = (<Menu>
        <Menu.Item>
          <div>Выберите столбцов:</div>
        </Menu.Item>
        {menuItems}
      </Menu>);
    const actionmenu = (<Menu>
      <Menu.Item key="1"><Icon type="user" />1st </Menu.Item>
      <Menu.Item key="2"><Icon type="user" />2nd </Menu.Item>
      <Menu.Item key="3"><Icon type="user" />3rd </Menu.Item>

    </Menu>);
    const buttons = { margin: 3};




    return (
      <PageHeaderWrapper title="РЕЕСТР ВОЗВРАТА">
        <Row type="flex" justify="end">
          <Button style={buttons}>Обновить</Button>
          <Button type="primary" style={buttons}>Одобрить</Button>
          <Button type="danger" style={buttons}>Отклонить</Button>
          <Button style={buttons}>Сохранить</Button>
          <Button style={buttons}>Выполнить</Button>
          <Button style={buttons}>Сверить с РПМУ</Button>
          <Dropdown overlay={actionmenu}>
            <Button style={buttons}>Дейстие</Button>
          </Dropdown>
          <Button style={buttons}>Выгрузка в Excell</Button>
        </Row>
          <div>
            <div>
              <Row>
                <Col sm={24} md={this.state.searchercont}>
                  <div>
                    {!this.state.isSearcher &&<SearcherDiv />}
                    {!this.state.isItems &&<DataDiv/>}

                  </div>
                </Col>
                <Col sm={24} md={this.state.tablecont}>
                  <Card bordered={true}>
                      <Button style={{ margin: 5}} onClick={this.toggleSearcher.bind(this)}><Icon type="search" theme="outlined" /></Button>
                      <Dropdown overlay={menu} placement="bottomLeft">
                        <Button><Icon type="setting" theme="outlined"/></Button>
                      </Dropdown>

                    <Row style={{ marginBottom: 20}}>
                      <Table
                        rowKey={'key'}
                        dataSource={dataSource}
                        columns={columns.filter(column => column.isVisible)}
                        onChange={this.handleStandardTableChange}
                        pagination={false}
                      />
                    </Row>
                    <Row>
                      <Pagination style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}
                                  showSizeChanger
                                  onShowSizeChange={this.onShowSizeChange}
                                  onChange={this.onShowSizeChange}
                                  defaultCurrent={1} total={50} />
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>

          </div>

      </PageHeaderWrapper>

    );
  }
}

export default MainView;
