/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import { storeCart } from '@/store/cart';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart: storeCart,
  },
});
