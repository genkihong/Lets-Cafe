/* eslint-disable no-param-reassign */
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
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      context.commit('LOADINGITEM', id, { root: true });
      const cart = {
        product_id: id,
        qty,
      };
      axios.post(api, { data: cart }).then((response) => {
        context.dispatch('getCart');
        new Vue().$bus.$emit('push-msg', response.data.message, 'success');
        context.commit('LOADINGITEM', '', { root: true });
      });
    },
    getCart(context) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      context.commit('LOADING', true, { root: true });
      axios.get(api).then((response) => {
        context.commit('CART', response.data.data);
        context.commit('LOADING', false, { root: true });
      });
    },
    removeCart(context, id) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`;
      context.commit('LOADING', true, { root: true });
      axios.delete(api).then((response) => {
        $('#removeModal').modal('hide');
        new Vue().$bus.$emit('push-msg', response.data.message, 'success');
        context.dispatch('getCart');
        context.commit('LOADING', false, { root: true });
      });
    },
    addCouponCode(context, couponCode) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`;
      const coupon = {
        code: couponCode,
      };
      context.commit('LOADING', true, { root: true });
      axios.post(api, { data: coupon }).then((response) => {
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
  },
};
