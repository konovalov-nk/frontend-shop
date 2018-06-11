/* eslint-disable no-param-reassign */
import Vue from 'vue'
import Vuex from 'vuex'
import { storeCart } from '@/store/cart'
import { storeUser } from '@/store/user'
import storeModal from '@/store/modal'
import { storeOrder } from '@/store/order'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart: storeCart,
    user: storeUser,
    modal: storeModal,
    order: storeOrder,
  },
})
