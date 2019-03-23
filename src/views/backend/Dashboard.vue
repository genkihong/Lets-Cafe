<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <Alert/>
    <Navbar/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view/> 
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Alert from '@/components/AlertMessage';

export default {
  computed: {    
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  components: {
    Alert,
    Navbar,
    Sidebar,
  },
};
</script>