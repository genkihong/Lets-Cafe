import axios from 'axios';

export default {
  namespaced: true, // actions, mutations, getters 是屬於區域變數
  // state: 模組區域變數
  // actions/mutations/getters: 全域變數
  state: {
    products: [],   // 所有產品
    product: {},    // 單一產品
    categories: [], // 產品種類
    newProduct: [], // 熱銷產品       
  },
  actions: {
    getProducts (context) {
      const api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
      context.commit('LOADING', true, { root: true }); // { root: true } 才能 global 使用(因為要觸發在 index.js 的 mutations)

      axios.get(api).then((response) => {
        console.log('user 產品列表', response);
        context.commit('PRODUCTS', response.data.products);  
        context.commit('CATEGORIES', response.data.products);
        context.commit('NEWPRODUCT', response.data.products);
        context.commit('LOADING', false, { root: true });
      });
    },
    getProduct (context, id) {
      const api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      context.commit('LOADING', true, { root: true });

      axios.get(api).then((response) => {
        console.log('單一產品', response); 
        context.commit('PRODUCT', response.data.product);
        context.commit('LOADING', false, { root: true });
      });
    },    
  },  
  mutations: {    
    PRODUCTS (state, payload) {
      state.products = payload;
    },
    PRODUCT (state, payload) {
      state.product = payload;
    },    
    CATEGORIES (state, payload) {
      const list = new Set()
      payload.forEach((value) => {
        list.add(value.category);
      })
      state.categories = Array.from(list);
    },
    NEWPRODUCT (state, payload) {
      state.newProduct = payload.slice(5, 9);
    }
  },
  getters: {
    products(state) {
      return state.products;
    },
    // products: state => state.products,
    product: state => state.product,
    categories: state => state.categories,
    newProduct: state => state.newProduct,    
  }
}