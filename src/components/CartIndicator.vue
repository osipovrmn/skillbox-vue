<!-- eslint-disable vue/max-len -->
<!-- eslint-disable max-len -->
<template>
  <router-link class="header__cart" aria-label="Корзина с товарами" :to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <BaseSpinner v-if="$store.state.isCartLoading" />
    <span v-else class="header__count" aria-label="Количество товаров">{{ $store.state.cartProducts.length }}</span>
  </router-link>
</template>

<script>
import BaseSpinner from '@/components/BaseSpinner.vue';

export default {
  components: { BaseSpinner },
};
</script>
