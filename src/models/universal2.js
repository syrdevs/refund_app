import {
  getColumns,
  getData,
  getJournalData,
  getStaticticsData,
  getReportsList,
  getReportParameters,
  getFormedReports,
} from '../services/api';

export default {
  namespace: 'universal2',
  state: {
    reportParametersData: [],
    reportFormedData: [],
    dataStore: [],
    columns: [],
  },
  effects: {

    * formedReports(payload, { call, put }) {
      const response = yield call(getFormedReports, payload);

      yield put({
        type: 'formedReportsData',
        payload: response || {},
      });
    },

    * reportParameters(payload, { call, put }) {
      const response = yield call(getReportParameters, payload);

      yield put({
        type: 'reportParametersData',
        payload: response || {},
      });
    },

    * reportsData(payload, { call, put }) {
      const response = yield call(getReportsList, payload);

      yield put({
        type: 'getData',
        payload: response || {},
      });
    },

    * statisticsData(payload, { call, put }) {
      const response = yield call(getStaticticsData, payload);

      yield put({
        type: 'getData',
        payload: response || {},
      });
    },

    * journalData(payload, { call, put }) {
      const response = yield call(getJournalData, payload);

      yield put({
        type: 'getData',
        payload: response || {},
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
        payload: response || {},
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
        ...state,
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
    formedReportsData(state, { payload }) {
      return {
        ...state,
        reportFormedData: payload,
      };
    },
    reportParametersData(state, { payload }) {
      return {
        ...state,
        reportParametersData: payload,
      };
    },
  },
};
