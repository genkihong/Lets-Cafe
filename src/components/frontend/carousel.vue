<template>
  <div class="bd-example">
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item header-carousel-item bg-cover bg-1 active" data-interval="3000">          
          <div class="carousel-caption d-none d-md-block">
            <h2>Let's drink a coffee</h2>
            <p class="h5">喝一杯香淳濃厚的咖啡</p>
          </div>
        </div>
        <div class="carousel-item header-carousel-item bg-cover bg-2" data-interval="3000">         
          <div class="carousel-caption d-none d-md-block">
            <h2>Taste a good coffee</h2>
            <p class="h5">品味豐富的人生來自品嚐一杯好咖啡</p>
          </div>
        </div>
        <div class="carousel-item header-carousel-item bg-cover bg-3" data-interval="3000">         
          <div class="carousel-caption d-none d-md-block">
            <h2>Enjoy your life</h2>
            <p class="h5">一個人也可以享受的好咖啡</p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
  
.header-carousel-item{
  height: 600px;
}

.bg-1{
  background-image: url(https://images.unsplash.com/photo-1497935586351-b67a49e012bf);
}
.bg-2{
  background-image: url(https://images.unsplash.com/photo-1492158244976-29b84ba93025);
}
.bg-3{
  background-image: url(https://images.unsplash.com/photo-1490914327627-9fe8d52f4d90);
}
.carousel-caption{
  background-color: rgba(0, 0, 0, .6);
}

</style>