import Vue from 'vue';
import { Loading, Overlay, Toast } from 'vant';

import App from './App.vue';
import '@/assets/style/index.scss';

Vue.config.productionTip = false;

Vue.use(Loading);
Vue.use(Overlay);
Vue.use(Toast);

// Vue.component('v-chart', ECharts);

new Vue({
  render: h => h(App),
}).$mount('#app');
