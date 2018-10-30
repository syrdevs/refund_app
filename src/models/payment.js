import { getColumns } from '../services/api';

export default {
  namespace: 'payment',
  state: {
    filter: [],
    _columns: [],
    dataSource: [],
  },
  effects: {
    * getData(payload, { call, put }) {

    },
    * columns(payload, { call, put, select }) {

      const stateColumns = yield select(state => state.payment._columns);
      const columnData = stateColumns.length > 0 ? stateColumns : yield call(getColumns, payload);
      const dataSource = yield call(getData, payload);

      yield put({
        type: 'getColumns',
        payload: {
          columns: stateColumns,
        },
      });
    },
  },
  reducers: {
    getColumns(state, { payload }) {
      return {
        ...state,
        _columns: payload,
      };
    },
  },
};
