/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: {
      total: 0,
    },
  },
  mutations: {
    changeTotal(state, n) {
      state.cart.total = n;
    },
  },
  actions: {

  },
  getters: {
    totalFormatted: state => `$${state.cart.total.toFixed(2)}`,
    total: state => state.cart.total.toFixed(2),
  },
});
