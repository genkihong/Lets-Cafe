<template>
  <div class="sticky-top shadow-sm">  
    <!-- nav bar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container">        
        <!-- 手機漢堡選單 -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <i class="material-icons">menu</i>
        </button>
        <!-- logo -->
        <router-link class="navbar-brand" to="/">
          <i class="text-lighter fas fa-mug-hot fa-lg"></i>     
        </router-link>
        <!-- cart-icon -->
        <router-link class="cart-icon text-lighter order-md-1" to="/cart">
          <span class="badge badge-pill badge-danger cart-badge" v-if="myCart.carts.length">
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
      isActive: '',
    }
  },
  computed: {
    myCart() {
      return this.$store.state.myCart;
    }
  },
  methods: {
    getCart() {
      this.$store.dispatch('getCart');
    },
  },
  created() {
    const vm = this;
    vm.getCart();   
  },
}
</script>

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