import { testMethod } from '../services/user';
import { getmainViewTable, getmainViewColumn, getRPMUTable, getMainModal, getMainSelect1, getOptionsdata } from '../services/api';

export default {
  namespace: 'universal',
  state: {
    table: {
      number: null,
      size: null,
      totalElements: null,
      totalPages: null,
      content: []
    },
    columns: [ ],
    rpmu: {
      columns:[],
      data:[]
    },
    mainmodal:[],
    select1: [],
    options: []
  },
  effects: {
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
            payload: response,
          });
        },
    * optionsDatachange(payload, { put }) {
      yield put({
        type: 'OptionChangeReducer',
        payload: payload,
      });
    },
  },

  reducers: {
    maintable(state, { payload }) {
      return {
        ...state,
        table:payload
      };
    },
    maincolumn(state, { payload }) {
      return {
        ...state,
        columns:payload
      };
    },
    rpmuReduce(state, { payload }) {
      return {
        ...state,
        rpmu:payload
      };
    },
    mainModalReducer(state, { payload }) {
      return {
        ...state,
        mainmodal:payload
      };
    },
    mainSelect1Reduce(state, { payload }) {
      return {
        ...state,
        select1:payload
      };
    },
    OptionReducer(state, { payload }) {
      return {
        ...state,
        options:payload
      };
    },
    OptionChangeReducer(state, { payload }) {
      return {
        ...state,
        options:payload.payload
      };
    },

  },
};
