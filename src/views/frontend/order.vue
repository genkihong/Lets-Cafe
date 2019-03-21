<template>
  <div class="mt-5">
    <Loading :active.sync="isLoading"></Loading>
    
    <div class="container">
      <!-- 訂單流程 -->
      <section class="form-row text-center">
        <div class="col-12 col-sm">
          <div class="alert alert-success alert-rounded" role="alert">
            1.輸入訂單資料
          </div>
        </div>
        <div class="col-12 col-sm">
          <div class="alert alert-main alert-rounded" role="alert">
            2.金流付款
          </div>
        </div>
        <div class="col-12 col-sm">
          <div class="alert alert-main alert-rounded" role="alert">
            3.付款完成
          </div>
        </div>
      </section>

      <!-- 訂單資訊 -->
      <div class="row justify-content-center text-lighter my-3">
        <form class="col-md-8" @submit.prevent="createOrder">
          <h3 class="text-center p-3">訂購人資訊</h3>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="username">*收件人姓名</label>
                <input type="text" class="form-control" name="name" id="username"
                  :class="{'is-invalid': errors.has('name')}" v-validate="'required'"
                  v-model="form.user.name" placeholder="輸入姓名">
                <small class="text-danger" v-if="errors.has('name')">請輸入姓名 !</small>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="usertel">*收件人電話</label>
                <input type="tel" class="form-control" name="Phone" id="usertel"
                :class="{'is-invalid': errors.has('Phone')}" v-validate="'required|numeric'"
                v-model="form.user.tel" placeholder="請輸入電話">
                <small class="text-danger" v-if="errors.has('Phone')">請輸入電話 !</small>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="useremail">*Email</label>
            <input type="email" class="form-control" name="email" id="useremail"
              :class="{'is-invalid': errors.has('email')}" v-validate="'required|email'" 
              v-model="form.user.email" placeholder="請輸入 Email">
            <small class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</small>
          </div>          
          <div class="form-group">
            <label for="useraddress">*收件人地址</label>
            <input type="address" class="form-control" name="address" id="useraddress" 
            :class="{'is-invalid': errors.has('address')}" v-validate="'required'" 
            v-model="form.user.address" placeholder="請輸入地址">
            <small class="text-danger" v-if="errors.has('address')">請輸入地址 !</small>
          </div>
        
          <div class="form-group">
            <label for="usermessage">留言</label>
            <textarea name="message" id="usermessage" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
          </div>
          <button class="btn btn-lighter btn-block btn-lg card-btn my-3">
            <i class="far fa-address-card fa-lg mr-3"></i>送出訂單
          </button>        
        </form>
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {         // 訂單
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      isLoading: false,  // true: start loading 動畫, false: stop loading 動畫     
    }
  },
  methods:{
    createOrder() { // 建立訂單
      const vm = this;
      const api =`${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order`;
      const order = vm.form;
      vm.isLoading = true;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(api, {data: order}).then((response) => {
            console.log('訂單已建立', response);
            if (response.data.success) {
              vm.$bus.$emit('update-cart');
              vm.$router.push(`/checkout/${response.data.orderId}`); // 訂單建立成功後, 前往結帳頁面
            }
            vm.isLoading = false;
          });
        } else {
          vm.isLoading = false;
          console.log('欄位不完整');
        }
      });      
    },
  }  
}
</script>