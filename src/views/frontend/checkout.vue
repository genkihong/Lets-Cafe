<template>
  <div class="container">
    <!-- 訂單流程 -->
    <section class="form-row text-center">
      <div class="col-12 col-sm">
        <div class="alert alert-success alert-rounded" role="alert">
          1.輸入訂單資料
        </div>
      </div>
      <div class="col-12 col-sm">
        <div class="alert alert-success alert-rounded" role="alert">
          2.金流付款
        </div>         
      </div>
      <div class="col-12 col-sm">
        <div class="alert alert-success alert-rounded" role="alert" v-if="order.is_paid">
          3.付款完成
        </div>
        <div class="alert alert-main alert-rounded" role="alert" v-else>
          3.付款完成
        </div>
      </div>
    </section>    
    <div class="row justify-content-center my-3">
      <form class="col-md-6" @submit.prevent="payOrder">
        <!-- 訂單內容 -->
        <h3 class="text-center text-lighter p-3">購買資訊</h3>
        <table class="table text-lighter table-borderless mb-5">
          <thead class="thead-dark">
            <tr>
              <th>品名</th>
              <th width="80">數量</th>
              <th class="text-right" width="160">小計</th>
            </tr>             
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }} {{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total | currency }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="h3 text-right">總計</td>
              <td class="h3 text-right">
                <strong>{{ order.total | currency }}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
        <!-- user 資訊 -->
        <h3 class="text-center text-lighter p-3">個人資料</h3>
        <table class="table text-lighter table-borderless">
          <tbody>
            <tr>
              <th width="200">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid" class="text-danger" >尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-lighter btn-block btn-lg card-btn my-3" v-if="order.is_paid === false">
          <i class="fas fa-money-check-alt fa-lg mr-3"></i>確認付款
        </button>
        <router-link class="btn btn-lighter btn-block btn-lg card-btn my-3" to="/" v-if="order.is_paid === true">
          <i class="fas fa-shopping-cart fa-lg mr-3"></i>繼續購物
        </router-link>         
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: '',
      order: {
        user: {},
      },
    }
  },
  methods: {
    getOrder() {
      const vm = this;
      const api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order/${vm.orderId}`;
      vm.$store.dispatch('updateLoading', true);
      
      this.$http.get(api).then((response) => {
        console.log('訂單內容', response.data);
        vm.order = response.data.order;
        vm.$store.dispatch('updateLoading', false);
      });
    },
    payOrder() {
      const vm = this;
      const api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/pay/${vm.orderId}`;
      vm.$store.dispatch('updateLoading', true);
      
      this.$http.post(api).then((response) => {
        console.log('結帳', response);
        if (response.data.success) {
          vm.getOrder();
        }
        vm.$store.dispatch('updateLoading', false);
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    console.log(this.orderId);
    this.getOrder();
  }
}
</script>