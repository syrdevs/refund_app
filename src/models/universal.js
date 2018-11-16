import { testMethod } from '../services/user';
import { getmainViewTable, getmainViewColumn, getRPMUTable, getMainModal, getMainSelect1, getOptionsdata, setfile, getmt102file, mt102preview,setRefundStatus } from '../services/api';

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
    options: [],
    refundKnpList:[],
    modalgridviewdata:[]
  },
  effects: {
    * changeRefundStatus(payload, { call }) {
      yield call(setRefundStatus, payload);
    },

    * setfile(payload, { call, put }) {
      const response = yield call(setfile, payload);

      yield put({
        type: 'setfileReduce',
        payload: response,
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
      if (response.refundKnpList.length>0) {
        payload.payload.src.data['knpId'] = response.refundKnpList[0].knpId;
        const data = yield call(getmainViewTable, payload);
        yield put({
          type: 'mt102dataReducer',
          payload: data,
        });
      }
    },
    * mt102view(payload, { call, put }) {
      console.log(payload);
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
    mt102(state, { payload }) {
      return {
        ...state,
        mt102file:payload
      };
    },
    mt102dataReducer (state, { payload }) {
      console.log(payload);
      return {
        ...state,
        modalgridviewdata: payload
      }
    },
    mt102prevReducer (state, { payload }) {
      return {
        ...state,
        refundKnpList: payload.refundKnpList
      }
    },
    setfileReduce(state, { payload }) {
      return {
        ...state,
        setfile:payload
      };
    },
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
