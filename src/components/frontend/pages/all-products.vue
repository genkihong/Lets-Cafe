<template>
  <div class="mt-5">
    <Loading :active.sync="isLoading"></Loading>
    
    <div class="container-fluid">
      <h2 class="text-lighter divider">熱銷咖啡</h2>
      <div class="row no-gutters my-5">
        <div class="col-6 col-md-3" v-for="product in newProduct" :key="product.id">
          <div class="img-hovereffect">
            <div class="img-h img-fluid bg-cover" :style="{backgroundImage: `url(${product.imageUrl})`}"></div>
            <!-- <img class="img-fluid bg-cover" src="product.imageUrl" alt=""> -->
            <div class="overlay">
              <router-link :to="{name:'UniProduct', params:{ id: product.id }}">
                <h5 class="product-title">{{product.title}}</h5>
              </router-link>
            </div>
          </div>
        </div>
        <!-- <div class="col-6 col-md-3">
          <div class="img-hovereffect">
            <div class="img-h img-fluid bg-cover" style="background-image: url(static/images/con-panna.jpg)"></div>
            <img class="img-fluid bg-cover" src="static/images/viennese.jpg" alt="">
            <div class="overlay">
              <h6>con panna</h6>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="img-hovereffect">
            <div class="img-h img-fluid bg-cover" style="background-image: url(static/images/macchiato.jpg)"></div>
            <img class="img-fluid bg-cover" src="static/images/espresso.jpg" alt="">
            <div class="overlay">
              <h6>macchiato</h6>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="img-hovereffect">
            <div class="img-h img-fluid bg-cover" style="background-image: url(static/images/latte.jpg)"></div>
            <img class="img-fluid bg-cover" src="static/images/latte.jpg" alt="">
            <div class="overlay">
              <h6>latte</h6>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- Product list -->
    <div class="container">
      <h2 class="text-lighter font-italic divider">Let's drink a coffee</h2>         
      <div class="row my-5">
        <div class="col-md-4 mb-3" v-for="item in products" :key="item.id">
          <div class="card border-0 text-center shadow h-100">
            <div class="card-hovereffect">
              <img class="img-thumbnail bg-cover" :src="item.imageUrl" alt="Let's cafe">
              <!-- <div class="bg-cover card-img" :style="{backgroundImage:`url(${item.imageUrl})`}"></div> -->
            </div>
            <!-- 查看單一產品 -->
            <router-link class="btn btn-lighter btn-block btn-lg card-btn rounded-0" 
              :to="{name:'UniProduct', params:{ id: item.id }}">
              <h3 class="mb-0">{{ item.title }}</h3>
            </router-link> 
            <!-- <button type="button" class="btn btn-lighter btn-block btn-lg card-btn" @click="getProduct(item.id)">
              <h3 class="mb-0">{{ item.title }}</h3>
            </button> -->
            <div class="card-body">
              <!-- <span class="badge badge-warning float-right ml-2">{{ item.category }}</span> -->
              <p class="card-text text-truncate">{{ item.content }}</p>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="h3" v-if="!item.price">{{ item.origin_price | currency}}</div>
                <del class="h5 font-italic" v-if="item.price">原價 {{ item.origin_price | currency}}</del>
                <div class="h3 text-danger" v-if="item.price">特價 {{ item.price | currency}}</div>
              </div>
            </div>
            <div class="card-footer p-0">
              <button type="button" class="btn btn-lighter btn-block btn-lg card-btn rounded-0" @click="addtoCart(item.id)">
                <i class="fas fa-circle-notch fa-spin" v-if="status.loadingItem === item.id"></i>
                加到購物車
              </button>                   
            </div>
          </div>
        </div>
      </div>     
    </div> 
    <!-- 分頁 -->
    <Pagination :Pages="pagination" @getPage="getProducts"></Pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newProduct: [], // 熱銷產品
      products: [],   // 所有商品列表
      product: {},    // 單一商品
      pagination: {},
      isLoading: false,  // true: start loading 動畫, false: stop loading 動畫
      status: {
        loadingItem: '', // 單一商品 spin icon
      }
    }
  },
  methods: {
    getProducts(page = 1) {   // 取得所有商品
      const vm = this;
      const api =`${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products?page=${page}`;
      vm.isLoading = true;
      
      this.$http.get(api).then((response) => {
        console.log('user 產品列表', response);
        vm.products = response.data.products;

        vm.newProduct = vm.products.slice(3,7);
        console.log('熱銷咖啡',vm.newProduct);

        vm.pagination = response.data.pagination; // 取得分頁資料
        vm.isLoading = false;
      });
    },
    getProduct(id) {  // 單一商品(查看更多)
      const vm = this;
      const api =`${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${id}`;
      vm.isLoading = true;
      
      this.$http.get(api).then((response) => {
        console.log('查看更多', response);      
        //vm.$router.push(`/uni_product/${id}`); // 前往單一產品頁面
        vm.isLoading = false;    
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
    this.getProducts(); // 商品列表
  }   
}
</script>
