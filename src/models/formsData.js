

export default {
  namespace: 'formsData',
  state: {
    act:{}
  },
  effects: {

    * setAct(payload) {
      console.log("setAct")
      state= {
        ...state,
        act: payload
      }
    },

  },

  reducers: {
    setActRedux(state, { payload }) {
      console.log("redux")
      return {
        ...state,
       act: payload
      };
    },

  },
};
