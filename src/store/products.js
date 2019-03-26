/* eslint-disable no-param-reassign */
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    products: [],
    product: {},
    categories: [],
    newProduct: [],
  },
  actions: {
    getProducts(context) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
      context.commit('LOADING', true, { root: true });
      axios.get(api).then((response) => {
        context.commit('PRODUCTS', response.data.products);
        context.commit('CATEGORIES', response.data.products);
        context.commit('NEWPRODUCT', response.data.products);
        context.commit('LOADING', false, { root: true });
      });
    },
    getProduct(context, id) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      context.commit('LOADING', true, { root: true });
      axios.get(api).then((response) => {
        context.commit('PRODUCT', response.data.product);
        context.commit('LOADING', false, { root: true });
      });
    },
  },
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PRODUCT(state, payload) {
      state.product = payload;
    },
    CATEGORIES(state, payload) {
      const list = new Set();
      payload.forEach((value) => {
        list.add(value.category);
      });
      state.categories = Array.from(list);
    },
    NEWPRODUCT(state, payload) {
      state.newProduct = payload.slice(5, 9);
    },
  },
  getters: {
    products(state) { return state.products; },
    product: state => state.product,
    categories: state => state.categories,
    newProduct: state => state.newProduct,
  },
};
