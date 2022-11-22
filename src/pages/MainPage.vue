<!-- eslint-disable no-return-assign -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vue/max-len -->
<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">152 товара</span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-id.sync="filterColorId"
      />

      <section class="catalog">
        <BasePreloader v-if="productsLoading" />

        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров
          <button @click.prevent="loadProducts">Попробовать еще раз</button>
        </div>

        <ProductList :products="products" />

        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import BasePagination from '@/components/BasePaginationt.vue';
import BasePreloader from '@/components/BasePreloader.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  components: {
    ProductList, BasePagination, ProductFilter, BasePreloader,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      page: 1,
      productsPerPage: 6, // количество товара на странице

      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false,
    };
  },

  computed: {
    products() {
      return this.productsData
        // eslint-disable-next-line arrow-body-style
        ? this.productsData.items.map((product) => {
          return {
            ...product,
            image: product.image.file.url,
          // eslint-disable-next-line semi
          }
        })
        : [];
    },

    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },

  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        // eslint-disable-next-line vue/max-len
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColorId,
          },
        })
          // eslint-disable-next-line no-return-assign
          .then((response) => this.productsData = response.data)
          // eslint-disable-next-line no-return-assign
          .finally(() => this.productsLoading = false)
          // eslint-disable-next-line no-return-assign
          .catch(() => this.productsLoadingFailed = true);
      }, 1000);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};

</script>
