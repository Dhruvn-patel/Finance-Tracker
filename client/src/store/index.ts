import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isAuthLogin: false,
    };
  },
  mutations: {
    LOG_OUT_FUNCTION(state: any) {
      state.isAuthLogin = !state.isAuthLogin;
      localStorage.removeItem("loginUser");
      console.log(state.isAuthLogin, "islogin");
    },
    TOOGLE_STATE(state: any) {
      state.isAuthLogin = !state.isAuthLogin;
    }
  },
  actions: {
    LogOutFunction(context: any) {
      context.commit("LOG_OUT_FUNCTION");
    },
     ToogleFunction(context: any) {
      context.commit("TOOGLE_STATE");
    },
  },
  getters: {
    isLogin(state: any) {
      if (localStorage.getItem("loginUser") != null) {
        state.isAuthLogin = JSON.parse(
          localStorage.getItem("loginUser") || ""
        ).isLogin;
      }
      return state.isAuthLogin;
    },
  },
});
export default store;
