import { testMethod } from '../services/user';
import {
  getmainViewTable,
  getmainViewColumn,
  getRPMUTable,
  getMainModal,
  getMainSelect1,
  getOptionsdata,
  setfile,
  getmt102file,
  mt102preview,
  setRefundStatus,
  getFilesRequest,
  deleteFileRequest,
  setDateRequest,
  dAppRefundStatusAuto,
  setDateRefund,
  saveOptionsdata,
  getReceiversRefund,
  paymentsData,
  getSearcherCalendar,
  getSearcherData,
  getSearcherJur,
  getSearcherJurCalendar,
  getSearcherRPNData,
  getSearcherMEDData,
  getActDics,
} from '../services/api';

export default {
  namespace: 'universal',
  state: {
    table: {
      number: null,
      size: null,
      totalElements: null,
      totalPages: null,
      content: [],
    },
    files: [],
    columns: [],
    rpmu: {
      columns: [],
      data: [],
    },
    mainmodal: [],
    select1: [],
    options: [],
    refundKnpList: [],
    modalgridviewdata: [],
    paymentsData: {
      mt100: {},
      mt102: {},
    },
    searcherdata: {},
    searcherRPNdata: {},
    searcherMEDdata: {},
    searcherjur: {},
    searchercalendar: [],
    searcherjurcalendar: [],
    periodYear: {},
    periodSection: {},
    organization: {},
    medicalType: {},
    paymentRequestType: {},
    divisions:{}

  },
  effects: {
    * receiversRefund(payload, { call, put }) {
      yield  call(getReceiversRefund, payload);
    },
    * AppRefundStatusAuto(payload, { call, put }) {
      yield call(dAppRefundStatusAuto, payload);
    },
    * removeFileRequest(payload, { call }) {
      yield call(deleteFileRequest, payload);
    },
    * getFilesRequestDate(payload, { call, put }) {
      const response = yield call(getFilesRequest, payload);

      yield put({
        type: 'files',
        payload: response,
      });
    },
    * changeRefundStatus(payload, { call }) {
      yield call(setRefundStatus, payload);
    },
    * changeDateRefund(payload, { call }) {
      yield call(setDateRefund, payload);
    },
    * changeDateRequest(payload, { call }) {
      yield call(setDateRequest, payload);
    },
    * setfile(payload, { call, put }) {
      const response = yield call(setfile, payload);

      yield put({
        type: 'setfileReduce',
        payload: response,
      });
    },
    * paymentsData(payload, { call, put }) {
      const response = yield call(paymentsData, payload.payload);

      yield put({
        type: 'paymentsDataReducer',
        payload: {
          type: payload.payload.entity,
          response: response || {},
        },
      });
    },
    * getmt102(payload, { call, put }) {
      const response = yield call(getmt102file, payload);

      yield put({
        type: 'mt102',
        payload: response,
      });
    },
    * mt102preview(payload, { call, put }) {

      const response = yield call(mt102preview, payload);
      yield put({
        type: 'mt102prevReducer',
        payload: response,
      });
      if (response.refundKnpList.length > 0) {
        payload.payload.src.searched = true;
        payload.payload.src.data['knpList'] = {
          id: response.refundKnpList[0].id,
        };
        const data = yield call(getmainViewTable, payload);
        yield put({
          type: 'mt102dataReducer',
          payload: data,
        });
      }
    },
    * mt102view(payload, { call, put }) {
      const data = yield call(getmainViewTable, payload);
      yield put({
        type: 'mt102dataReducer',
        payload: data,
      });
    },
    * mainviewtable(payload, { call, put }) {
      const response = yield call(getmainViewTable, payload);

      yield put({
        type: 'maintable',
        payload: response,
      });
    },
    * mainviewcolumn(payload, { call, put }) {
      const response = yield call(getmainViewColumn, payload);

      yield put({
        type: 'maincolumn',
        payload: response,
      });
    },
    * rpmuTable(payload, { call, put }) {
      const response = yield call(getRPMUTable, payload);

      yield put({
        type: 'rpmuReduce',
        payload: response,
      });
    },
    * mainModal(payload, { call, put }) {
      const response = yield call(getMainModal, payload);

      yield put({
        type: 'mainModalReducer',
        payload: response,
      });
    },
    * mainSelect1(payload, { call, put }) {
      const response = yield call(getMainSelect1, payload);

      yield put({
        type: 'mainSelect1Reduce',
        payload: response,
      });
    },
    * optionsData(payload, { call, put }) {
      const response = yield call(getOptionsdata, payload);
      yield put({
        type: 'OptionReducer',
        payload: response || [],
      });
    },
    * optionsDatachange(payload, { call, put }) {
      const response = yield call(saveOptionsdata, payload);
      yield put({
        type: 'OptionChangeReducer',
        payload: payload,
      });
    },
    * SearcherCalendar(payload, { call, put }) {
      const response = yield call(getSearcherCalendar, payload);
      yield put({
        type: 'SearcherCalendarReducer',
        payload: response,
      });
    },
    * SearcherJurCalendar(payload, { call, put }) {
      const response = yield call(getSearcherJurCalendar, payload);
      yield put({
        type: 'SearcherJurCalendarReducer',
        payload: response,
      });
    },
    * SearcherData(payload, { call, put }) {
      const response = yield call(getSearcherData, payload);
      yield put({
        type: 'SearcherDataReducer',
        payload: response,
      });
    },
    * SearcherRPNData(payload, { call, put }) {
      const response = yield call(getSearcherRPNData, payload);
      yield put({
        type: 'SearcherRNPDataReducer',
        payload: response,
      });
    },
    * SearcherMEDData(payload, { call, put }) {
      const response = yield call(getSearcherMEDData, payload);
      yield put({
        type: 'SearcherMEDDataReducer',
        payload: response,
      });
    },
    * SearcherJur(payload, { call, put }) {
      const response = yield call(getSearcherJur, payload);
      yield put({
        type: 'SearcherJurReducer',
        payload: response,
      });
    },
    * getperiodYear(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicperiodyearReducer',
        payload: response,
      });
    },
    * getperiodSection(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicperiodSectionReducer',
        payload: response,
      });
    },
    * getorganization(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicorganizationReducer',
        payload: response,
      });
    },
    * getmedicalType(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicmedicalTypeReducer',
        payload: response,
      });
    },

    * getpaymentRequestType(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicpaymentRequestTypeReducer',
        payload: response,
      });
    },
    * getdivisions(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicdivisionsReducer',
        payload: response,
      });
    },
  },

  reducers: {

    files(state, { payload }) {
      return {
        ...state,
        files: payload,
      };
    },
    mt102(state, { payload }) {
      return {
        ...state,
        mt102file: payload,
      };
    },
    mt102dataReducer(state, { payload }) {
      return {
        ...state,
        modalgridviewdata: payload,
      };
    },
    mt102prevReducer(state, { payload }) {
      return {
        ...state,
        refundKnpList: payload.refundKnpList,
      };
    },
    setfileReduce(state, { payload }) {
      return {
        ...state,
        setfile: payload,
      };
    },
    paymentsDataReducer(state, { payload }) {
      return {
        ...state,
        paymentsData: {
          ...state.paymentsData,
          [payload.type]: payload.response,
        },
      };
    },
    maintable(state, { payload }) {
      if (payload === undefined) {
        return {
          ...state,
          table: {
            'size': 15,
            'totalElements': 0,
            'totalPages': 0,
            'content': [],
          },
        };
      }
      return {
        ...state,
        table: payload,
      };
    },
    maincolumn(state, { payload }) {
      return {
        ...state,
        columns: payload,
      };
    },
    rpmuReduce(state, { payload }) {
      return {
        ...state,
        rpmu: payload,
      };
    },
    mainModalReducer(state, { payload }) {
      return {
        ...state,
        mainmodal: payload,
      };
    },
    mainSelect1Reduce(state, { payload }) {
      return {
        ...state,
        select1: payload,
      };
    },
    OptionReducer(state, { payload }) {
      return {
        ...state,
        options: payload,
      };
    },
    OptionChangeReducer(state, { payload }) {
      return state;
    },
    SearcherCalendarReducer(state, { payload }) {
      return {
        ...state,
        searchercalendar: payload,
      };
    },
    SearcherJurCalendarReducer(state, { payload }) {
      return {
        ...state,
        searcherjurcalendar: payload,
      };
    },
    SearcherDataReducer(state, { payload }) {
      return {
        ...state,
        searcherdata: payload,
      };
    },
    SearcherRNPDataReducer(state, { payload }) {
      return {
        ...state,
        searcherRPNdata: payload,
      };
    },
    SearcherMEDDataReducer(state, { payload }) {
      return {
        ...state,
        searcherMEDdata: payload,
      };
    },
    SearcherJurReducer(state, { payload }) {
      return {
        ...state,
        searcherjur: payload,
      };
    },
    dicperiodyearReducer(state, { payload }) {
      return {
        ...state,
        periodYear: payload,
      };
    },
    dicperiodSectionReducer(state, { payload }) {
      return {
        ...state,
        periodSection: payload,
      };
    },
    dicorganizationReducer(state, { payload }) {
      return {
        ...state,
        organization: payload,
      };
    },
    dicmedicalTypeReducer(state, { payload }) {
      return {
        ...state,
        medicalType: payload,
      };
    },
    dicpaymentRequestTypeReducer(state, { payload }) {
      return {
        ...state,
        paymentRequestType: payload,
      };
    },
    dicdivisionsReducer(state, { payload }) {
      return {
        ...state,
        divisions: payload,
      };
    },

  },
};
