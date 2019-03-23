<template>
  <div class="bg-main min-vh-100">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-8 text-lighter text-center p-3">
          <form class="form-signin" @submit.prevent="signin">      
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control" placeholder="Email address" 
            v-model="user.username" required autofocus>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" 
            v-model="user.password" required>
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"> Remember me
            </label>
          </div>
          <button class="btn btn-lighter btn-block btn-lg card-btn" type="submit">Sign in</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2019</p>
        </form>   
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const api =`${process.env.VUE_APP_API_PATH}/admin/signin`;
      const vm = this;

      this.$http.post(api, vm.user).then((response) => {
        console.log('登入',response.data);
        if (response.data.success) {
          vm.$router.push('/admin/products');  // 登入成功就跳至 products 頁面
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>

// html, body {
//   height: 100%;
// }

//body {
//   background-color: #424242 !important ;
//   display: -ms-flexbox;
//   display: flex;
//   -ms-flex-align: center;
//   align-items: center;
//   padding-top: 40px;
//   padding-bottom: 40px;
//}
.btn-lg{
  padding: .5rem 1rem;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>