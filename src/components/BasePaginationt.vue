<!-- eslint-disable vue/max-len -->
<!-- eslint-disable max-len -->
<template>
  <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a href="#"
          class="pagination__link pagination__link--arrow"
          aria-label="Предыдущая страница"
          :class="{'disabled-link pagination__link--disabled': page < 2}"
          @click.prevent="prevPage"
          >
            <svg width="8" height="14" fill="currentColor">
              <use xlink:href="#icon-arrow-left"></use>
            </svg>
        </a>
      </li>
      <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
        <a
          href="#"
          class="pagination__link"
          :class="{'pagination__link--current': pageNumber === page}"
          @click.prevent="paginate(pageNumber)">
          {{ pageNumber }}
        </a>
      </li>
      <li class="pagination__item">
        <a
          href="#"
          class="pagination__link pagination__link--arrow"
          aria-label="Следующая страница"
          :class="{'disabled-link pagination__link--disabled': page === pages}"
          @click.prevent="nextPage"
          >
            <svg width="8" height="14" fill="currentColor">
              <use xlink:href="#icon-arrow-right"></use>
            </svg>
        </a>
      </li>
    </ul>
</template>

<style>
.disabled-link {
  pointer-events: none;
  cursor: not-allowed;
  border-color: red;
  background-color: gray;
  opacity: 0.6;
}
</style>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    nextPage() {
      this.$emit('paginate', this.page + 1);
    },
    prevPage() {
      this.$emit('paginate', this.page - 1);
    },
  },
};
</script>
