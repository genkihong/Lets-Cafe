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
        context.dispatch('getCart');
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
    removeCart(context, id) {
      const api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`;
      context.commit('LOADING', true, { root: true });
      
      axios.delete(api).then((response) => {
        console.log('刪除購物車', response);
          $('#removeModal').modal('hide');
          new Vue().$bus.$emit('push-msg', response.data.message, 'success');
          context.dispatch('getCart');
          context.commit('LOADING', false, { root: true });
      });
    },
    addCouponCode(context, coupon_code) {
      const vm = this;
      const api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`;
      const coupon = {
        code: coupon_code
      }
      context.commit('LOADING', true, { root: true });
      
      axios.post(api, {data: coupon}).then((response) => {
        console.log('優惠卷', response);
        if (response.data.success) {
          new Vue().$bus.$emit('push-msg', response.data.message, 'success');
          context.dispatch('getCart');
          context.commit('LOADING', false, { root: true });
        } else {
          new Vue().$bus.$emit('push-msg', response.data.message, 'danger');
          context.dispatch('getCart');
          context.commit('LOADING', false, { root: true });
        }
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