import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import Vuetable from 'vuetable-2';
Vue.use(Vuetable);

new Vue({
  render: h => h(App)
}).$mount('#app');
