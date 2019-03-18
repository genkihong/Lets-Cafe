<template>
  <div class="mt-5">
    <Loading :active.sync="isLoading"></Loading>

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
            <i class="fas fa-circle-notch fa-spin" v-if="status.loadingItem === product.id"></i>
            加到購物車
          </button>             
        </div>   

        <div class="col-md-6">
          <h3 class="text-lighter mb-3">{{ product.title }}</h3>
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
export default {
  data() {
    return {
      product: {},    // 單一商品
      productId: '',  // 單一產品id
      isLoading: false,  // true: start loading 動畫, false: stop loading 動畫
      status: {
        loadingItem: '', // 單一商品 spin icon
      }
    }
  },
  methods: {
    getProduct(id) {  // 單一商品(查看更多)
      const vm = this;
      const api =`${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${id}`;
      vm.isLoading = true;
      
      this.$http.get(api).then((response) => {
        console.log('單一產品', response);
        vm.product = response.data.product;    
        vm.isLoading = false;
        vm.product.num = 1; // 將數量預設為 1
      });
    },
    addtoCart(id, qty = 1) {  // 加入購物車
      const vm = this;
      const api =`${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, {data: cart}).then((response) => {
        console.log('加入購物車', response);
        vm.$bus.$emit('push-msg', response.data.message, 'success');
        vm.$bus.$emit('update-cart'); // 更新購物車數量圖示
        // getCart();
        vm.status.loadingItem = '';
      });
    },
    // getCart() {  // 取得購物車內容
    //   const vm = this;
    //   const api =`${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
    //   vm.isLoading = true;
      
    //   this.$http.get(api).then((response) => {
    //     console.log('購物車內容', response);
    //     vm.myCart = response.data.data; 
    //     vm.isLoading = false;
    //   });
    // },
  },
  created() {
    this.productId = this.$route.params.id;
    console.log(this.productId);
    this.getProduct(this.productId); 
  }   
}
</script>