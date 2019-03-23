import axios from 'axios';

export default {
  namespaced: true, // actions, mutations, getters 是屬於區域變數
  state: {
    products: [],   // 所有產品
    product: {},    // 單一產品
    categories: [], // 產品種類
    newProduct: [], // 熱銷產品       
  },
  actions: {
    getProducts(context) {   // 取得所有商品
      const api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
      context.commit('LOADING', true, { root: true }); // { root: true } 才能 global 使用

      axios.get(api).then((response) => {
        console.log('user 產品列表', response);
        context.commit('PRODUCTS', response.data.products);     // 所有產品 
        context.commit('CATEGORIES', response.data.products);   // 產品種類
        context.commit('NEWPRODUCT', response.data.products);   // 熱銷咖啡
        context.commit('LOADING', false, { root: true });
      });
    },
    getProduct(context, id) {  // 單一商品(查看更多)
      const api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      context.commit('LOADING', true, { root: true });

      axios.get(api).then((response) => {
        console.log('查看更多', response); 
        context.commit('PRODUCT', response.data.product);    
        context.commit('LOADING', false, { root: true });
      });
    },    
  },  
  mutations: {    
    PRODUCTS(state, payload) {    // 所有產品
      state.products = payload;
    },
    PRODUCT(state, payload) {
      state.product = payload;
      state.product.num = 1;
    },    
    CATEGORIES(state, payload) {  // 產品種類
      const list = new Set();
      payload.forEach((value) => {
        list.add(value.category);
      });
      state.categories = Array.from(list);
    },
    NEWPRODUCT(state, payload) {  // 熱銷咖啡
      state.newProduct = payload.slice(5,9); 
      console.log('熱銷咖啡',state.newProduct);
    },    
  }, 
  getters: {
    // products(state) {
    //   return state.products;
    // },
    products: state => state.products,
    product: state => state.product,
    categories: state => state.categories,
    newProduct: state => state.newProduct,    
  } 
}