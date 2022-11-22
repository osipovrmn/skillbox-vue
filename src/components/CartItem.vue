<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/max-len -->
<!-- eslint-disable vue/return-in-computed-property -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>

    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <BaseCounter :item="item" class="product__counter form__counter" :counter.sync="amount" />

    <b class="product__price">
      {{ item.amount * item.product.price | numberFormat}} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item)"
      >
        <svg width="20" height="20" fill="currentColor">
          <use xlink:href="#icon-close"></use>
        </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import BaseCounter from '@/components/BaseCounter.vue';

export default {
  components: { BaseCounter },
  filters: { numberFormat },
  props: ['item'],
  methods: {
    ...mapActions({ deleteProduct: 'deleteProductToCart' }),
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        // eslint-disable-next-line vue/max-len
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
};
</script>
