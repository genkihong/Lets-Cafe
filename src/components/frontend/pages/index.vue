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
import Carousel from '../carousel';
import FrontNavbar from '../frontNavbar';
import Footer from '../footer';

export default {
  components: {
    Carousel,
    FrontNavbar,   
    Footer,
  },
}
</script>