import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import VeeValidate from 'vee-validate';
import zh_TW from 'vee-validate/dist/locale/zh_TW';
// import VueI18n from 'vue-i18n';Vue.use(VueI18n);

import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

import Alert from '@/components/backend/AlertMessage';
import Pagination from '@/components/backend/Pagination';

import App from './App.vue';
import router from './router'
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW', zh_TW);
// const i18n = new VueI18n({
//   locale: 'zhTW'
// });
// Vue.use(VeeValidate, {
//   i18n,
//   dictionary: {
//     zhTW
//   }
// })
Vue.component('Alert', Alert);
Vue.component('Loading', Loading);
Vue.component('Pagination', Pagination);

Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');


// 導航守衛
router.beforeEach((to, from, next) => {
  console.log('to',to,'from',from,'next',next);
  
  if(to.meta.requiresAuth) {  // 前往頁面如果有 meta.requiresAuth 就驗證，沒有就放行 
    // alert('這裡需要驗證');
    const api =`${process.env.API_PATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log('驗證登入',response.data);
      if (response.data.success) { // 成功登入就放行
        next();
      } else {  // 登入失敗就回到 login 頁面
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});