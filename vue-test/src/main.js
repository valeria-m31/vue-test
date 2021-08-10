import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import vuetify from './plugins/vuetify'
import store from '../store'
import { VueMaskDirective } from 'v-mask'
import Vuelidate from 'vuelidate'
import './_scss/main.scss';


Vue.directive('mask', VueMaskDirective);

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuelidate)

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
