import { query as queryUsers, queryCurrent } from '@/services/user';
import { LoginUser, CheckToken } from '@/services/api';
export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    * fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * checkToken({ payload }, { call }) {
      yield call(CheckToken, payload);
    },
    * fetchCurrent(_, { call, put }) {
      //const response = yield call(queryCurrent);
      // to do
      const response = {
        surname:"Admin",
        firstname:"Admin",
        id:"1"
      };
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
