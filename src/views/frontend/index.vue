<template>
  <div class="bg-main">
    <Alert/>    
    <header>
      <FrontNavbar/> 
      <Carousel/>
    </header>
    <main>
      <router-view/>
    </main>
    <Footer/>    
  </div>    
</template>

<script>
import Carousel from '../../components/frontend/carousel';
import FrontNavbar from '../../components/frontend/frontNavbar';
import Footer from '../../components/frontend/footer';

export default {
  components: {
    Carousel,
    FrontNavbar,   
    Footer,
  },
}
</script>