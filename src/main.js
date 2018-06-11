import Vue from 'vue'
import Tawk from 'vue-tawk'
import { Collapse, CollapseItem, Loading, Message, MessageBox, Slider } from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'

const tawk_src = `https://embed.tawk.to/${process.env.VUE_APP_TAWK_TO_API_KEY}/default`
Vue.use(Tawk, { tawkSrc: tawk_src })

const isProduction = process.env.NODE_ENV === 'production'
// eslint-disable-next-line
const console = (function (oldCons) {
  return {
    log(text) {
      if (!isProduction) oldCons.log(text)
    },
    info(text) {
      if (!isProduction) oldCons.info(text)
    },
    warn(text) {
      if (!isProduction) oldCons.warn(text)
    },
    error(text) {
      if (!isProduction) oldCons.error(text)
    },
  }
}(window.console))

// Then redefine the old console
window.console = console

Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Slider)
Vue.use(Loading)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
