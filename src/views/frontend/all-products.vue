<template>
  <div id="all-products">   
    <div class="container-fluid">
      <h2 class="text-lighter divider">熱銷咖啡</h2>
      <div class="row no-gutters my-5">
        <div class="col-6 col-md-3" v-for="product in newProduct" :key="product.id">
          <div class="img-hovereffect">
            <div class="img-h img-fluid bg-cover" :style="{backgroundImage: `url(${product.imageUrl})`}"></div>
            <div class="overlay">
              <router-link :to="{name:'UniProduct', params:{ id: product.id }}">
                <h5 class="product-title">{{product.title}}</h5>
              </router-link>
            </div>
          </div>
        </div>       
      </div>
    </div>    
    <div class="container">
      <h2 class="text-lighter font-italic divider">Let's drink a coffee</h2> 
      <div class="row mt-5">
        <!-- 左側選單 (List group) -->
        <div class="col-md-3">
          <div class="list-group sticky-top" style="top: 82px;">
            <a href="#" class="list-group-item list-group-item-action" 
              @click.prevent="searchText = ''" :class="{ 'active': searchText === ''}">
              All coffees 
            </a>
            <a class="list-group-item list-group-item-action" href="#" @click.prevent="searchText = item"
              :class="{ 'active': item === searchText}" v-for="item in categories" :key="item">
              {{ item }}
            </a>            
          </div>
        </div>        
        <div class="col-md-9">          
          <!-- Product list -->
          <div class="row mt-3 mt-md-0">
            <div class="col-md-6 mb-3" v-for="item in filterData[currentPage]" :key="item.id">
              <div class="card border-0 text-center shadow h-100">
                <div class="card-hovereffect">
                  <img class="img-thumbnail bg-cover" :src="item.imageUrl" alt="Let's cafe">                  
                </div>
                <!-- 查看單一產品 -->
                <router-link class="btn btn-lighter btn-block btn-lg card-btn rounded-0" 
                  :to="{name:'UniProduct', params:{ id: item.id }}">
                  <h3 class="mb-0">{{ item.title }}</h3>
                </router-link>                
                <div class="card-body">
                  <p class="card-text text-truncate">{{ item.content }}</p>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h3" v-if="!item.price">{{ item.origin_price | currency}}</div>
                    <del class="h5 font-italic" v-if="item.price">原價 {{ item.origin_price | currency}}</del>
                    <div class="h3 text-danger" v-if="item.price">特價 {{ item.price | currency}}</div>
                  </div>
                </div>
                <div class="card-footer p-0">
                  <button type="button" class="btn btn-lighter btn-block btn-lg card-btn rounded-0" @click="addtoCart(item.id)">
                    <i class="fas fa-spinner fa-pulse" v-if="loadingItem === item.id"></i>
                    加到購物車
                  </button>                   
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>          
    </div> 
    <!-- 分頁 -->
    <div class="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination border">                 
          <li class="page-item" :class="{'active': currentPage === page - 1}" 
            v-for="page in pages" :key="page">
            <a class="page-link" href="#" @click.prevent="currentPage = page - 1">{{page}}</a>
          </li>                 
        </ul>
      </nav> 
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      product: {},
      searchText: '',
      currentPage: 0,
      pages: 0,
    }
  },
  computed: {
    filterData() {
      const vm = this;
      let items = [];
      console.log(vm.searchText);
      if (vm.searchText) {
        items = vm.products.filter((value) => {
          return value.category.includes(vm.searchText);           
        });        
      } 
      else {
        items = vm.products;    
      }
      const newPage = [];
      items.forEach((value, i) => {
        if (i % 6 === 0) {
          newPage.push([]);
        }
        const page = parseInt(i / 6);
        newPage[page].push(value);
      });
      vm.pages = newPage.length
      vm.currentPage = 0;
      console.log('分頁',newPage);
      return newPage;    
    },
    ...mapGetters(['loadingItem']),
    ...mapGetters('productsModule', ['products', 'categories', 'newProduct'])
  },
  methods: {
    ...mapActions('productsModule', ['getProducts']),
    addtoCart(id, qty = 1) {
      this.$store.dispatch('cartModule/addtoCart', { id, qty });
    },  
  },
  created() {
    this.getProducts();
  }
}
</script>
