// 官方元件
import Vue from 'vue'               
import VueRouter from 'vue-router' 

// frontend
import Index from '@/components/frontend/pages/index';  
import AllProducts from '@/components/frontend/pages/all-products';
import UniProduct from '@/components/frontend/pages/uni-product';
import Cart from '@/components/frontend/pages/cart';
import Order from '@/components/frontend/pages/order';
import Checkout from '@/components/frontend/pages/checkout';

// backend
import Dashboard from '@/components/backend/Dashboard';     
import Login from '@/components/backend/pages/Login';       
import Products from '@/components/backend/pages/Products'; 
import Coupons from '@/components/backend/pages/Coupons';
import Orders from '@/components/backend/pages/Orders';

Vue.use(VueRouter)

export default new VueRouter({ 
  routes: [
    {
      path: '*',         
      redirect: '/',
    },
    // 前台
    {
      path: '/', 
      //name: 'index',      
      component: Index, 
      children: [
        {
          path: '', // 所有產品
          name: 'AllProducts',      
          component: AllProducts,
        },
        {
          path: 'uni_product/:id', // 單一產品
          name: 'UniProduct',      
          component: UniProduct,
        },
        {
          path: 'cart', // 購物車
          name: 'Cart',      
          component: Cart,
        },  
        {
          path: 'order', // 訂單
          name: 'Order',      
          component: Order,
        },
        {
          path: 'checkout/:orderId', // 結帳
          name: 'Checkout',      
          component: Checkout,
        },        
      ],
      
    },
    
    
    // 後台
    {
      path: '/login',  
      name: 'Login',      
      component: Login,  
    },
    {
      path: '/admin',  
      name: 'Dashboard',      
      component: Dashboard,
      children: [
        {
          path: 'products', // #/admin/products
          name: 'Products',      
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupons',
          name: 'Coupons',      
          component: Coupons,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',      
          component: Orders,
          meta: { requiresAuth: true },
        },
      ],
    },
    
  ],
});
