import Vue from 'vue';
import { Collapse, CollapseItem, Slider } from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Slider);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
