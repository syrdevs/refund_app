import { testMethod } from '../services/user';

export default {
  namespace: 'blog',
  state: {
    status: undefined,
  },
  effects: {
    *get(payload, { call, put }) {
      const response = yield call(testMethod, payload);

      yield put({
        type: 'test',
        payload: response,
      });
    },
    *fetch(_, { call, put }) {},
  },

  reducers: {
    test(state, { payload }) {
      return payload;
    },
  },
};
