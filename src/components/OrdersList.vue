<!-- eslint-disable max-len -->
<!-- eslint-disable vue/max-len -->
<template>
  <div>
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in products.basket.items" :key="item.product.id">
        <h3>
          {{item.product.title}}<b> - {{item.quantity}}шт.</b>
        </h3>

        <b>{{(item.price * item.quantity) | numberFormat}} ₽</b>

        <span>Артикул: {{item.product.id}}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: <b>{{products.length}}</b> товара на сумму <b>{{products.totalPrice | numberFormat}} ₽</b></p>
    </div>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  filters: {
    numberFormat,
  },
  computed: {
    products() {
      // eslint-disable-next-line max-len, vue/max-len
      return this.$store.state.orderInfo ? this.$store.state.orderInfo : this.$store.getters.getDataOrders;
    },
  },
};
</script>
