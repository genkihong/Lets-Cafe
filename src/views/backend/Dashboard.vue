<template>
  <div>
    <Navbar/>
    <Alert/>
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
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Alert from '../../components/AlertMessage';

export default {
  components: {
    Alert,  // Alert: Alert 縮寫
    Navbar,
    Sidebar,
  },
};
</script>