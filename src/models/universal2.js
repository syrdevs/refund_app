import {
  getColumns,
  getData,
  getJournalData,
  getStaticticsData} from '../services/api';

export default {
  namespace: 'universal2',
  state: {
    dataStore: [],
    columns: [],
  },
  effects: {

    * statisticsData(payload, { call, put }) {
      const response = yield call(getStaticticsData, payload);

      yield put({
        type: 'getData',
        payload: response,
      });
    },

    * journalData(payload, { call, put }) {
      const response = yield call(getJournalData, payload);

      yield put({
        type: 'getData',
        payload: response,
      });
    },

    * clear(payload, { call, put }) {
      yield put({
        type: 'clearData',
      });
    },

    * data(payload, { call, put }) {

      const response = yield call(getData, payload);

      yield put({
        type: 'getData',
        payload: response,
      });
    },
    * columns(payload, { call, put }) {

      const response = yield call(getColumns, payload);

      yield put({
        type: 'getColumns',
        payload: response,
      });
    },
  },
  reducers: {
    clearData(state, { payload }) {
      return {
        columns: [],
        dataStore: [],
      };
    },
    getData(state, { payload }) {
      return {
        ...state,
        dataStore: payload,
      };
    },
    getColumns(state, { payload }) {
      return {
        ...state,
        columns: payload,
      };
    },
  },
};
