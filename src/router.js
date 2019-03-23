import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/',
    },     
    {
      path: '/',
      component: () => import('./views/frontend/index.vue'),
      children: [
        {
          path: '',
          name: 'AllProducts',
          component: () => import('./views/frontend/all-products.vue'),
        },
        {
          path: 'uni_product/:id',
          name: 'UniProduct',
          component: () => import('./views/frontend/uni-product.vue'),
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('./views/frontend/cart.vue'),
        },  
        {
          path: 'order',
          name: 'Order',
          component: () => import('./views/frontend/order.vue'),
        },
        {
          path: 'checkout/:orderId',
          name: 'Checkout',
          component: () => import('./views/frontend/checkout.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/backend/Login.vue'),
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: () => import('./views/backend/Dashboard.vue'),
      children: [
        {
          path: 'products',
          name: 'Products',
          component: () => import('./views/backend/Products.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: () => import('./views/backend/Coupons.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: () => import('./views/backend/Orders.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
  ]
});
