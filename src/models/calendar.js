import {
  getCalendarEvents,
  saveCalendarEvents,
  removeCalendarEvents,
} from '../services/api';

export default {
  namespace: 'calendar',
  state: {
    status: undefined,
    events:[],
  },
  effects: {
    *get(payload, { call, put }) {
      const response = yield call(getCalendarEvents, payload);

      yield put({
        type: 'getRedux',
        payload: response,
      });
    },
    *save(payload, { call, put }) {
      const response = yield call(saveCalendarEvents, payload);

      yield put({
        type: 'saveRedux',
        payload: response,
      });
    },
    *remove(payload, { call, put }) {
      const response = yield call(removeCalendarEvents, payload);

      yield put({
        type: 'removeRedux',
        payload: response,
      });
    },
  },

  reducers: {
    getRedux(state, { payload }) {
      const datafix = [];
      payload.forEach(item=>{
        datafix.push({
          id: item.id,
          date: item.eventDate,
          EventID: {
            id: item.deventId===null ? '2' : item.deventId,
            name: item.eventTitle
          }
        })
      })

      return {
        ...state,
        events: datafix,
      };
    },
    saveRedux(state, { payload }) {
      return state;
    },
    removeRedux(state, { payload }) {
      return state;
    },
  },
};
