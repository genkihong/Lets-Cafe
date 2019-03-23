<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary text-white" @click="openModal(true)">建立新商品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
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
import DeleteModal from '@/components/DeleteModal';
export default {
  data() {
    return {
      products: [],
      pagination: {
        current_page: '',
      },   
      tempProduct: {},
      isNew: false,
      status: {
        fileUploading: false,  
      },
    };
  },
  components: {
    DeleteModal,
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/products?page=${page}`;
      vm.$store.dispatch('updateLoading', true, { root: true });
      console.log(api);
      this.$http.get(api).then((response) => {
        console.log('取得商品列表', response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.$store.dispatch('updateLoading', false, { root: true });
      });
    },
    openModal(isNew, item) {
      const vm = this;
      if (isNew) {
        vm.tempProduct = {};
        vm.isNew = true;
      } else {
        vm.tempProduct = Object.assign({}, item);
        vm.isNew = false;
      }
      console.log('openModal', isNew);
      $('#productModal').modal('show');
    },
    updateProduct() {
      const vm = this;
      let api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product`;
      let httpMethod = 'post';
      let showPage = 1;
      let failMsg =  '無法新增產品'   

      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}` // 修改商品 API
        httpMethod = 'put';
        showPage = vm.pagination.current_page;
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
    delProductModal(item) {
      const vm = this;
      vm.tempProduct = Object.assign({}, item);
      $('#delProductModal').modal('show');
    },
    delProduct() {
      const vm = this;
      const api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
      
      this.$http.delete(api).then((response) => {
        console.log('刪除商品', response.data);
        if (response.data.success) {
          $('#delProductModal').modal('hide');
          this.$bus.$emit('push-msg', response.data.message, 'success');
          vm.getProducts(vm.pagination.current_page);
        } else {
          $('#productModal').modal('hide');
          this.$bus.$emit('push-msg', response.data.message, 'danger');
          vm.getProducts();
        }        
      });
    },
    uploadFile() {
      const vm = this;
      const uploadedFile = vm.$refs.files.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);

      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        vm.status.fileUploading = false;

        if (response.data.success) {
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
        } else {
          this.$bus.$emit('push-msg', response.data.message, 'danger');
        };
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>