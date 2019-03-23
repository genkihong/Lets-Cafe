<template>
  <div class="bg-main">
    <Loading :active.sync="isLoading"></Loading>
    <Alert/>    
    <!-- nav bar -->
    <div class="sticky-top shadow-sm">  
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
    <!-- carousel -->
    <div class="bd-example">
      <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item header-carousel-item bg-cover active"
          :style="{backgroundImage:`url(${imgUrl}/images/coffee-1.jpg)`}" data-interval="3000">
            <!-- <img class="bg-cover" src="@/assets/images/coffee-1.jpg" height="600" alt=""> -->
            <div class="carousel-caption d-none d-md-block">
              <h2>Let's drink a coffee</h2>
              <p class="h5">品味豐富的人生來自品嚐一杯好咖啡</p>
            </div>
          </div>
          <div class="carousel-item header-carousel-item bg-cover"        
          :style="{backgroundImage:`url(${imgUrl}/images/coffee-2.jpg)`}" data-interval="3000">         
            <div class="carousel-caption d-none d-md-block">
              <h2>Taste a good coffee</h2>
              <p class="h5">喝一杯香淳濃厚的咖啡</p>
            </div>
          </div>
          <div class="carousel-item header-carousel-item bg-cover"
          :style="{backgroundImage:`url(${imgUrl}/images/coffee-3.jpg)`}" data-interval="3000">         
            <div class="carousel-caption d-none d-md-block">
              <h2>Enjoy your life</h2>
              <p class="h5">一個人也可以享受的好咖啡</p>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    <main class="mt-5">
      <router-view/>
    </main>
    <footer class="bg-lighter py-3">
      <div class="container">
        <div class="row text-main">
          <div class="col-md-6">
            <div class="d-flex mb-3">
              <i class="fas fa-mug-hot fa-2x mr-3"></i>
              <h2 class="font-weight-bold">Let's cafe</h2>
            </div>            
            <p><em>Made by Charles Hong</em></p>                  
          </div>
          <div class="col-md-6">
            <div class="text-right mb-3">
              <a class="text-decoration-none" href="#">
                <i class="text-facebook fab fa-facebook-square fa-2x"></i>
                <!-- <img src="/static/images/icon_fb.png" alt="FB"> -->
              </a>    
            </div>            
            <p class="text-right">&copy; Copright 2019 All Rights Reserved</p>            
          </div>
        </div>
      </div> 
    </footer>    
  </div>    
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      isActive: '',
      imgUrl: process.env.VUE_APP_IMGURL
    }
  },
  computed: {    
    isLoading() { // 取得 isLoading 值
      return this.$store.state.isLoading;
    },
    ...mapGetters ('cartModule', ['myCart'])
  },
  methods: {
    ...mapActions('cartModule', ['getCart'])
  },
  created() {
    this.getCart();
  }
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
.header-carousel-item{
  height: 600px;
}
.carousel-caption{
  background-color: rgba(0, 0, 0, .6);
}

</style>