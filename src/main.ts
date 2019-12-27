import Vue from 'vue';
import { Loading, Overlay } from 'vant';
import App from './App.vue';
import '@/assets/style/index.scss';

Vue.config.productionTip = false;

Vue.use(Loading);
Vue.use(Overlay);

new Vue({
  render: h => h(App),
}).$mount('#app');
