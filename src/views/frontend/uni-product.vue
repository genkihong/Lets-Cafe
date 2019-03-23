<template>
  <div class="mt-5">
    <div class="container">
      <!-- breadcrumb -->
      <div class="row">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent pl-0">
              <li class="breadcrumb-item">
                <router-link class="text-white text-decoration-none" to="/">Let's cafe</router-link>
              </li>              
              <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="row text-lighter my-3">
        <div class="col-md-6">
          <div class="card-hovereffect mb-3">
            <img class="img-thumbnail bg-cover" :src="product.imageUrl" alt="Let's cafe">
          </div> 
          <button type="button" class="btn btn-lighter btn-block btn-lg card-btn" @click="addtoCart(product.id, product.num)">
            <i class="fas fa-spinner fa-pulse" v-if="loadingItem === product.id"></i>
            加到購物車
          </button>             
        </div>
        <div class="col-md-6">
          <h3 class="text-lighter my-3 mt-md-0">{{ product.title }}</h3>
          <blockquote class="blockquote mb-3">
            <p class="mb-2">{{ product.content }}</p>
            <footer class="blockquote-footer text-right">{{ product.description }}</footer>
          </blockquote>
          <div class="d-flex justify-content-between align-items-baseline mb-3">
            <div class="h3" v-if="!product.price">{{ product.origin_price | currency }}</div>
            <del class="h5 font-italic" v-if="product.price">原價 {{ product.origin_price | currency }}</del>
            <div class="h3 text-danger" v-if="product.price">特價 {{ product.price | currency }}</div>
          </div>     
          <select name="" class="form-control mb-3" v-model="product.num">
            <option :value="num" v-for="num in 10" :key="num">選購 {{ num }} {{ product.unit }}</option>
          </select>
          <div class="text-right text-nowrap">
            小計 <strong>{{ product.num * product.price | currency }}</strong>
          </div>         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      productId: '', 
      status: {
        loadingItem: '',
      }
    }
  },
  computed: {
    loadingItem() {
      return this.$store.state.loadingItem;
    },
    ...mapGetters('productsModule', ['product'])
  },
  methods: {
    getProduct(id) {
      this.$store.dispatch('productsModule/getProduct', id);
    },
    addtoCart(id, qty = 1) {
      this.$store.dispatch('cartModule/addtoCart', { id, qty });
    },
  },
  created() {
    this.productId = this.$route.params.id;
    console.log(this.productId);
    this.getProduct(this.productId); 
  }   
}
</script>