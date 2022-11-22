<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vue/max-len -->
<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link"  :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info" v-if="products.length">
        {{ products.length + ' ' + declensionWords(products.length, ['товар', 'товара', 'товаров']) }}
      </span>

      <span class="content__info" v-else>
        Товаров нет
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <BasePreloader v-if="$store.state.isCartLoading" />
          <ul class="cart__list" v-else>
            <CartItem v-for="item in products" :key="item.prooductId" :item="item" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <router-link v-show="products.length" tag="button" :to="{name: 'order'}" class="cart__button button button--primery" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import declensionWords from '@/helpers/declensionWords';
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import BasePreloader from '@/components/BasePreloader.vue';

export default {
  filters: {
    numberFormat,
  },
  methods: { declensionWords },
  components: { CartItem, BasePreloader },
  computed: {
    // eslint-disable-next-line vue/max-len
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
  },
};
</script>
