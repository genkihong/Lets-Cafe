<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">
              <h6><i class="fas fa-box-open mr-3"></i>商品列表</h6>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders">
              <h6><i class="fas fa-money-check-alt mr-3"></i>訂單列表</h6>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupons">
              <i class="fas fa-ticket-alt fa-lg mr-3"></i><span class="h6 mb-0">優惠券</span>
            </router-link>
          </li>         
        </ul>
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>模擬功能</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <!-- <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/customer_order">
              <h6 class="text-basic"><i class="fas fa-shopping-cart mr-3"></i>模擬訂單</h6>
            </router-link>         
          </li>          
        </ul> -->
      </div>
    </nav>
  </div>
</template>