<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    
    <div class="container" v-if="myCart.carts.length > 0">
      <!-- breadcrumb -->
      <div class="row justify-content-center">
        <div class="col-md-10">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent pl-0">
              <li class="breadcrumb-item">
                <router-link class="text-white text-decoration-none" to="/">Let's cafe</router-link>
              </li>            
              <li class="breadcrumb-item active" aria-current="page">購物車清單</li>
            </ol>
          </nav>
        </div>
      </div>  
      <!-- 購物車清單 --> 
      <div class="row justify-content-center my-3">
        <div class="col-md-10">
          <div class="card bg-main">
            <div class="card-header d-flex">
              <button class="btn btn-link text-decoration-none text-lighter" type="button" data-toggle="collapse" data-target="#collapseCart">
                <i class="fas fa-shopping-cart fa-lg mr-3"></i>
                顯示購物車細節
              </button>
              <!-- 原價 -->
              <span class="h3 text-lighter ml-auto mb-0" v-if="myCart.final_total === myCart.total">
                <strong>{{myCart.total | currency}}</strong>
              </span>
              <!-- 折扣價 -->
              <span class="h3 text-lighter ml-auto mb-0" v-if="myCart.final_total !== myCart.total">
                <strong>{{myCart.final_total | currency}}</strong>
              </span>
            </div>
          </div>
          
          <div id="collapseCart" class="collapse">
            <h3 class="text-center text-lighter p-3">購物車清單</h3>
            <table class="table table-sm text-lighter table-borderless">
              <thead class="thead-dark">
                <tr>
                  <th width="60"></th>
                  <th class="d-none d-sm-table-cell" width="200">Coffee Name</th>
                  <th>商品名稱</th>
                  <th width="60">數量</th>
                  <th class="text-right" width="140">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cart in myCart.carts" :key="cart.id">
                  <td class="align-middle">
                    <button type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#removeModal" 
                    :data-title="cart.product.title" @click="removeModal(cart)">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                  <td class="align-middle d-none d-sm-table-cell">
                    <div class="img-thumbnail bg-cover" style="width: 160px; height: 90px;" 
                      :style="{backgroundImage: `url(${cart.product.imageUrl})`}">
                    </div>
                    <!-- <img :src="cart.product.imageUrl"  class="img-thumbnail" alt=""> -->
                  </td>
                  <td class="align-middle">
                    {{ cart.product.title }}
                    <p class="text-primary" v-if="cart.coupon">已套用優惠券</p>
                  </td>
                  <td class="align-middle">{{ cart.qty }} {{ cart.product.unit }}</td>
                  <!-- 小計 -->
                  <td class="align-middle text-right">{{cart.final_total | currency}}</td>            
                </tr>           
              </tbody>
              <tfoot>
                <!-- 原價 -->
                <tr class="d-none d-sm-table-row">
                  <td colspan="4" class="h3 text-right">總計</td>
                  <td class="h3 text-right">
                    <strong>{{myCart.total | currency}}</strong>
                  </td>
                </tr>
                <!-- 折扣價 -->
                <tr class="d-none d-sm-table-row" v-if="myCart.final_total !== myCart.total">
                  <td colspan="4" class="h3 text-right text-primary">折扣價</td>
                  <td class="h3 text-right text-primary">
                    <strong>{{myCart.final_total | currency}}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>                
          </div>
          <div class="input-group input-group-sm">
            <input type="text" class="form-control" placeholder="請輸入優惠碼 coffee" v-model="coupon_code">
            <div class="input-group-append">
              <button class="btn btn-outline-light" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>    
          <router-link class="btn btn-lighter btn-block btn-lg card-btn my-3" to="/order">
            <i class="fas fa-user-alt fa-lg mr-3"></i>建立訂單
          </router-link>
        </div>        
      </div>   
    </div>
    <!-- 無購物車清單 -->
    <div class="container" v-if="myCart.carts.length === 0">
      <!-- breadcrumb -->
      <div class="row justify-content-center">
        <div class="col-md-6">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent pl-0">
              <li class="breadcrumb-item">
                <router-link class="text-white text-decoration-none" to="/">Let's cafe</router-link>
              </li>            
              <li class="breadcrumb-item active" aria-current="page">購物車清單</li>
            </ol>
          </nav>
        </div>
      </div>  
      <div class="row justify-content-center align-items-center">    
        <div class="col-md-6">
          <div class="d-flex justify-content-center align-items-center text-lighter my-5">
            <h2>目前沒有任何購物清單喔 !</h2>         
          </div> 
          <router-link class="rounded-sm btn btn-lighter btn-block btn-lg card-btn my-3" to="/">
            <i class="fas fa-cart-arrow-down fa-lg mr-3"></i>前往購物           
          </router-link>             
        </div>    
      </div>    
    </div>
    <!-- Remove modal -->
    <div class="modal fade" id="removeModal" tabindex="-1">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h3 class="modal-title"></h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="h5 text-secondary font-weight-bold">確認要刪除訂單 !</p> 
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">取消</button>
            <button type="submit" class="btn btn-outline-danger btn-sm" @click="removeCart">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      myCart: {      // 購物車
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
      isLoading: false,
      tempCart: {},
      coupon_code: '',// 優惠卷    
    }
  },
  
  methods: {
    getCart() {  // 取得購物車內容
      const vm = this;
      const api =`${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      vm.isLoading = true;
      
      this.$http.get(api).then((response) => {
        console.log('cart 購物車', response);
        vm.myCart = response.data.data; 
        vm.isLoading = false;
      });
    },
    removeModal(cart) {
      const vm = this;
      vm.tempCart = Object.assign({}, cart);
      console.log('tempCart',vm.tempCart);
      // $('#removeModal').modal('show');

      $('#removeModal').on('show.bs.modal', function (event) { // Modal title:產品名稱
        var btn = $(event.relatedTarget);
        var title = btn.data('title');
        var modal = $(this);
        console.log('show.bs.modal',title);
        modal.find('.modal-title').text(title);
      });
    },
    removeCart() { // 刪除購物車
      const vm = this;
      const api =`${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${vm.tempCart.id}`;
      vm.isLoading = true;
      
      this.$http.delete(api).then((response) => {
        console.log('刪除購物車', response);
          $('#removeModal').modal('hide');
          vm.$bus.$emit('push-msg', response.data.message, 'success');
          vm.$bus.$emit('update-cart');
          vm.getCart();
          vm.isLoading = false;               
      });
    },
    addCouponCode() { // 使用優惠券
      const vm = this;
      const api =`${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      }
      vm.isLoading = true;
      
      this.$http.post(api, {data: coupon}).then((response) => {
        console.log('優惠卷', response);
        if (response.data.success) {
          vm.$bus.$emit('push-msg', response.data.message, 'success');
          vm.getCart();
          vm.isLoading = false;
        } else {
          vm.$bus.$emit('push-msg', response.data.message, 'danger');
          vm.getCart();
          vm.isLoading = false;        }
      });
    },    
  },
  created() {
    this.getCart();     
  }
}
</script>
