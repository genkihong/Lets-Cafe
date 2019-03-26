/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';

import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

import Alert from '@/components/AlertMessage';
import Pagination from '@/components/Pagination';

import App from './App.vue';
import router from './router';
import store from './store';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);


VeeValidate.Validator.localize('zhTW', zhTW);


Vue.component('Alert', Alert);
Vue.component('Loading', Loading);
Vue.component('Pagination', Pagination);

Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API_PATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
