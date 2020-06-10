import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vueOS',
});

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    signinEmail: null,
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    signinEmail(state) {
      return state.signinEmail;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_SIGNIN_EMAIL(state, value) {
      console.log('set singin email');
      console.log(state);
      console.log(value);
      state.signinEmail = value;
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit('SET_LOGGED_IN', user !== null);
      if (user) {
        commit('SET_USER', {
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        commit('SET_USER', null);
      }
    },
    fetchSignInEmail({ commit }, email) {
      if (email) {
        commit('SET_SIGNIN_EMAIL', email);
      } else {
        commit('SET_SIGNIN_EMAIL', null);
      }
    },
  },
});
