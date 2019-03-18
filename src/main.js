// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
Vue.config.productionTip = false;

import Vue from 'vue';
import axios from 'axios';        // 載入主要 axios AJAX 套件
import VueAxios from 'vue-axios'; // 將 axios 轉為 Vue 的套件
import Loading from 'vue-loading-overlay'; // loading 效果
import VeeValidate from 'vee-validate';
import zh_TW from 'vee-validate/dist/locale/zh_TW';

import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap'; // bootstrap js

import Alert from '@/components/backend/AlertMessage';
import Pagination from '@/components/backend/Pagination';

import App from './App';       // 載入 App.vue  
import router from './router'; // 載入 router/index.js
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

// 全域啟用 component
Vue.use(VueAxios, axios); // 啟用 axios 套件
Vue.use(VeeValidate);     // 啟用驗證套件
// Vue.use(VeeValidate, {
//   events: 'input|blur',
// });
VeeValidate.Validator.localize('zh_TW', zh_TW);

Vue.component('Alert', Alert);
Vue.component('Pagination', Pagination);
Vue.component('Loading', Loading); 

Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App }, // App.vue
  template: '<App/>',
  router,              // router: router 縮寫
});
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