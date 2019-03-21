<template>
  <div class="d-flex justify-content-center">
    <nav aria-label="Page navigation example">
      <ul class="pagination border">        
        <li class="page-item" :class="{'disabled': !Pages.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="getPage(Pages.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in Pages.total_pages" :key="page" :class="{'active': Pages.current_page === page}">
          <a class="page-link" href="#" @click.prevent="getPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': !Pages.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getPage(Pages.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {                  // 從 products 傳進來的物件
    Pages: {
      type: Object,
    }
  },
  methods: {                // 傳出去給 products 的方法
    getPage(page){
      // console.log('分頁元件',page);
      this.$emit('getPage', page);
    }
  },
}
</script>

