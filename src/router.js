import store from '@/store';
import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index.vue';
import Checkout from './views/Checkout.vue';
import ConfirmOrder from './views/ConfirmOrder.vue';
import Payment from './views/Payment.vue';
import Finish from './views/Finish.vue';

Vue.use(Router);

const checkCart = (to, from, next) => {
  if (store.getters['cart/items'].length > 0) {
    next();
  } else {
    next('/');
  }
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      beforeEnter: checkCart,
    },
    {
      path: '/confirm',
      name: 'confirm_order',
      component: ConfirmOrder,
      beforeEnter: checkCart,
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment,
      beforeEnter: checkCart,
    },
    {
      path: '/finish',
      name: 'finish',
      component: Finish,
      beforeEnter: checkCart,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (['checkout', 'index', 'confirm_order'].includes(to.name)) {
      return { selector: '#steps-bar', offset: { x: 0, y: 30 } };
    }

    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },
});
