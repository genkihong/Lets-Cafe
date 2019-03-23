import Vue from 'vue';
import Vuex from 'vuex'

import productsModule from './products';
import cartModule from './cart';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    loadingItem: '',
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },  
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    LOADINGITEM(state, id) {
      console.log(id);
      state.loadingItem = id;
    },
  },
  modules: {
    productsModule,
    cartModule
  }
});