<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>訂單編號</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in sortOrder" :key="key" :class="{'text-secondary': !item.is_paid}">
          <td>{{ item.create_at | date }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-danger">尚未付款</span>
          </td>
          <td>{{ item.id}}</td>
        </tr>
      </tbody>
    </table>
    <Pagination :Pages="pagination" @getPage="getOrders"></Pagination>
    
  </div>
</template>

<script>
import Pagination from '../Pagination'; // 載入分頁元件
export default {
  data() {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
    };
  },
  components: { // 啟用分頁元件
    Pagination,
  },
  methods: {
    getOrders(page = 1) { // 取得所有訂單內容
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/orders?page=${page}`;
      vm.isLoading = true;
      
      this.$http.get(url, vm.tempProduct).then((response) => {
        console.log('所有訂單內容', response);
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
  },
  computed: {
    sortOrder() { // 訂單排序
      const vm = this;
      let newOrder = [];
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        });
      }
      return newOrder;
    },
  },
  created() {
    this.getOrders();
    console.log(process.env.API_PATH);
  },
};
</script>