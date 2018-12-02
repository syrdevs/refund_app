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
    searchercalendar: [],
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
    * SearcherData(payload, { call, put }) {
      const response = yield call(getSearcherData, payload);
      yield put({
        type: 'SearcherDataReducer',
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
    SearcherDataReducer(state, { payload }) {
      return {
        ...state,
        searcherdata: payload,
      };
    },

  },
};
