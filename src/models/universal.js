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
  getActDics
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
    paymentsData: [],
    searcherdata: {},
    searcherRPNdata: {},
    searcherMEDdata: {},
    searcherjur: {},
    searchercalendar: [],
    searcherjurcalendar: [],
    actperiodYear:{},
    actperiodSection: {},
    actorganization: {},
    actmedicalType: {}

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
        payload: response || {},
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
    * getActperiodYear(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicactperiodyearReducer',
        payload: response,
      });
    },
    * getActperiodSection(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicactperiodSectionReducer',
        payload: response,
      });
    },
    * getActorganization(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicactorganizationReducer',
        payload: response,
      });
    },
    * getActmedicalType(payload, { call, put }) {
      const response = yield call(getActDics, payload);
      yield put({
        type: 'dicactmedicalTypeReducer',
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
        paymentsData: payload,
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

    dicactperiodyearReducer(state, { payload }) {
      return {
        ...state,
        actperiodYear: payload,
      };
    },
    dicactperiodSectionReducer(state, { payload }) {
      return {
        ...state,
        actperiodSection: payload,
      };
    },
    dicactorganizationReducer(state, { payload }) {
      return {
        ...state,
        actorganization: payload,
      };
    },
    dicactmedicalTypeReducer(state, { payload }) {
      return {
        ...state,
        actmedicalType: payload,
      };
    },

  },
};
