import Vue from 'vue';
import axios from 'axios';
import $ from 'jquery';

export default {
  namespaced: true,
  state: {
    myCart: {
      carts: [],
    },
  },
  actions: {
    addtoCart(context, { id, qty }) {
      const api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      context.commit('LOADINGITEM', id, { root: true });
      const cart = {
        product_id: id,
        qty,
      };
      axios.post(api, {data: cart}).then((response) => {
        console.log('加入購物車', response);
        context.dispatch('getCart');  // 執行 actions 內的 getCart，要用 context.dispatch
        new Vue().$bus.$emit('push-msg', response.data.message, 'success');
        context.commit('LOADINGITEM', '', { root: true });
      });
    },
    getCart(context) {
      const api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      context.commit('LOADING', true, { root: true });
      
      axios.get(api).then((response) => {
        console.log('cart 購物車', response.data.data);
        context.commit('CART', response.data.data);
        context.commit('LOADING', false, { root: true });
      });
    },
    removeCart(context, id) { // 刪除購物車
      const api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`;
      context.commit('LOADING', true, { root: true });
      
      axios.delete(api).then((response) => {
        console.log('刪除購物車', response);
          $('#removeModal').modal('hide');
          new Vue().$bus.$emit('push-msg', response.data.message, 'success');
          context.dispatch('getCart'); // 執行 actions 內的 getCart，要用 context.dispatch
          context.commit('LOADING', false, { root: true });
      });
    },    
  },
  mutations: {
    CART(state, payload) {
      state.myCart = payload;
    },
  },  
  getters: {    
    myCart: state => state.myCart,
  }
}