import Vue from 'vue';
import { Collapse, CollapseItem, Loading, Message, MessageBox, Slider } from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Slider);
Vue.use(Loading);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
