import Vue from 'vue';
import Vuex from 'vuex'

import productsModule from './products';
import cartModule from './cart';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true, // 嚴謹模式
  // 資料狀態
  state: {
    isLoading: false,
    loadingItem: '',  // 單一商品 spin icon
  },
  // 操作行為，不會改變 state 內資料狀態，接收 dispatch 傳過來的參數
  // 執行非同步行為 AJAX, setTimeout
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status); // 執行 mutations 內的 LOADING 要用 context.commit
    },  
  },
  // 操作 state 內資料狀態
  // 執行同步行為
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    LOADINGITEM(state, id) {
      console.log(id);
      state.loadingItem = id;
    },
  },
  // computed state 資料
  getters: {
    // isLoading(state) {
    //   return state.isLoading;
    // },
    // loadingItem(state) {
    //   return state.loadingItem;
    // },
  },
  // 載入 Module 
  modules: {
    productsModule,
    cartModule
  }
});