<template>
  <div class="sticky-top">  
    <!-- nav bar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container">        
        <!-- 手機漢堡選單 -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <i class="material-icons">menu</i>
        </button>

        <!-- logo -->
        <router-link class="navbar-brand" to="/">
          <h3 class="mb-0"><i class="text-lighter fas fa-mug-hot"></i></h3>      
        </router-link>

        <!-- cart-icon -->
        <router-link class="cart-icon text-lighter order-md-1" to="/cart">
          <span class="badge badge-pill badge-danger cart-badge" v-if="myCart.carts.length > 0">
            {{myCart.carts.length}}
          </span>
          <i class="material-icons md-32 align-middle">shopping_cart</i>
        </router-link>        

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav font-weight-bolder mr-auto">
            <li class="nav-item" 
            :class="{'active':isActive =='index'}" @click.prevent="isActive ='index'">
              <router-link class="nav-link" to="/">Let's Cafe</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>   
  </div>
</template>

<script>
export default {
  data() {
    return {
      myCart:{
        carts: [
        //   {
        //     coupon: {},
        //     id: '',
        //     product: {},
        //     product_id: '',
        //     qty: '',
        //     total: 0,
        //     final_total: 0,
        //   }
        ],
        // total: 0,
        // final_total: 0,
      },
      isActive: '',
    }
  },
  methods: {
    getCart() {  // 取得購物車內容
      const vm = this;
      const api =`${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
            
      this.$http.get(api).then((response) => {
        console.log('navbar 購物車', response);
        vm.myCart = response.data.data; 
      });
    },
  },
  created() {
    const vm = this;
    vm.getCart();
    vm.$bus.$on('update-cart', () => {
      vm.getCart();
    });    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.material-icons.md-32 { 
  font-size: 32px; 
}
.cart-icon {
  position: relative;
  &:hover{
    text-decoration: none;
  }
}
.cart-badge {
  position: absolute;
  top: -10px;
  right: -10px;
}

</style>