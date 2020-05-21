import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/services/user.service'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
    isAuth: (state) => (Object.keys(state.user).length)
  },
  mutations: {
    setAuth (state, user) {
      state.user = user
    }
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const res = await User.login(payload);
        if (res.status !== 200) {
          return Promise.reject(res);
        }
        commit('setAuth', res.data.user);
        return res;
      } catch(err) {
        return Promise.reject(err);
      }
      return;
    }
  },
  modules: {

  }
})

export default store;