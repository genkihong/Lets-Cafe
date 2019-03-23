<template>
  <div>
    <!-- loading 動畫效果 -->
    <Loading :active.sync="isLoading"></Loading>

    <div class="text-right mt-4">
      <button class="btn btn-primary text-white" @click="openModal(true)">建立新商品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <!-- <th width="200">ID</th> -->
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="90">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <!-- <td>{{ item.id }}</td> -->
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td >
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group ">
              <button class="btn btn-outline-basic btn-sm" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="delProductModal(item)">刪除</button>
            </div>                 
          </td>
        </tr>
      </tbody>       
    </table>

    <!-- 分頁 -->
    <Pagination :Pages="pagination" @getPage="getProducts"></Pagination>

    <!-- 新增/修改產品 Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header text-white" :class="{'bg-primary':isNew,'btn-basic':!isNew}">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew == true">新增商品</span>
              <span v-else>修改商品資料</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files" @change="uploadFile">
                </div>
                <img class="img-fluid" alt="" :src="tempProduct.imageUrl">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempProduct.title">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category" placeholder="請輸入分類" v-model="tempProduct.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="unit">單位</label>
                    <input type="unit" class="form-control" id="unit" placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model="tempProduct.price">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn text-white" :class="{'btn-primary':isNew,'btn-basic':!isNew}" 
              @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!--刪除產品 Modal-->
    <DeleteModal :Product="tempProduct" @expunge="delProduct"></DeleteModal>
  </div>
</template>

<script>
import $ from 'jquery';
import DeleteModal from '../../components/DeleteModal';
export default {
  data() {
    return {
      products: [],     // 所有商品列表
      pagination: {     // 分頁
        current_page: '',
      },   
      tempProduct: {},  // 新增/修改商品
      isNew: false,     // true: 新增, false: 修改
      isLoading: false, // true: start loading 動畫, false: stop loading 動畫
      status: {
        fileUploading: false,  // true: show spin icon, false: hide spin icon     
      },
    };
  },
  components: { // 啟用元件
    DeleteModal,
  },
  methods: {
    getProducts(page = 1) {   // 取得所有商品
      // const api = 'https://vue-course-api.hexschool.io/api/charles/products';
      const vm = this;
      const api =`${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/products?page=${page}`;
      vm.isLoading = true;
      
      this.$http.get(api).then((response) => {
        console.log('取得商品列表', response.data);
        vm.products = response.data.products;     // 取得商品資料
        vm.pagination = response.data.pagination; // 取得分頁資料
        vm.isLoading = false;
      });
    },
    openModal(isNew, item) {  // 新增 & 修改商品 Modal
      const vm = this;
      if (isNew) {           // 建立新商品
        vm.tempProduct = {};
        vm.isNew = true;
      } else {               // 修改商品
        vm.tempProduct = Object.assign({}, item); // 避免物件傳參考讓 item == tempProduct
        vm.isNew = false;
      }
      console.log('openModal', isNew);
      $('#productModal').modal('show');
    },
    updateProduct() {         // 新增 & 修改商品
      const vm = this;
      let api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product`; // 新增商品 API
      let httpMethod = 'post';
      let showPage = 1; // 新增商品後, 畫面會回到第一頁  
      let failMsg =  '無法新增產品'   

      if (!vm.isNew) { // 更換 API method
        api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}` // 修改商品 API
        httpMethod = 'put';
        showPage = vm.pagination.current_page;  // 修改商品後, 畫面會在同一頁面
        failMsg = '無法修改產品';
      };

      this.$http[httpMethod](api, {data: vm.tempProduct}).then((response) => {
        console.log('新增商品', response.data);
        if (response.data.success) {
          $('#productModal').modal('hide');
          this.$bus.$emit('push-msg', response.data.message, 'success');
          vm.getProducts(showPage);
        } else {
          $('#productModal').modal('hide');
          this.$bus.$emit('push-msg', failMsg, 'danger');
          vm.getProducts();
        };
      });
    },
    delProductModal(item) {   // 刪除商品 Modal
      const vm = this;
      vm.tempProduct = Object.assign({}, item);
      $('#delProductModal').modal('show');
    },
    delProduct() {            // 刪除商品
      const vm = this;
      const api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
      
      this.$http.delete(api).then((response) => {
        console.log('刪除商品', response.data);
        if (response.data.success) {
          $('#delProductModal').modal('hide');
          this.$bus.$emit('push-msg', response.data.message, 'success');
          vm.getProducts(vm.pagination.current_page); // 刪除商品後, 畫面會在同一頁面
        } else {
          $('#productModal').modal('hide');
          this.$bus.$emit('push-msg', response.data.message, 'danger');
          vm.getProducts();
        }        
      });
    },
    uploadFile() {            // 上傳檔案
      // console.log(this);
      const vm = this;
      const uploadedFile = vm.$refs.files.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile); // append(欄位名稱, 要上傳的檔案)

      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // 上傳檔案格式
        }
      }).then((response) => {
        // console.log('上傳檔案', response.data);
        vm.status.fileUploading = false;

        if (response.data.success) {
          // vm.tempProduct.imageUrl = response.data.imageUrl;
          // console.log(vm.tempProduct);
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl); // 寫入 response.data.imageUrl 
        } else {
          this.$bus.$emit('push-msg', response.data.message, 'danger'); // 上傳檔案失敗 alert 訊息
        };
      });
    },
  },
  created() {
    this.getProducts();
    // this.$bus.$emit('push-msg', 'This is alert text !!'); // alert 測試用
  },
};
</script>