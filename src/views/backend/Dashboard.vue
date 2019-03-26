<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <Alert/>
    <Navbar/>
    <div class="container-fluid">
      <div class="row mt-5">
        <Sidebar/>
        <main class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view/> 
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Alert from '@/components/AlertMessage';

export default {
  computed: {    
    ...mapGetters(['isLoading']),
  },
  components: {
    Alert,
    Navbar,
    Sidebar,
  },
};
</script>