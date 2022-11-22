<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vue/max-len -->
<template>
  <div>
    <BasePreloader v-if="$store.state.isCartLoading" />
    <main class="content container" v-else>
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'main'}">
                Каталог
              </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
              Корзина
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              Оформление заказа
            </a>
          </li>
        </ul>

        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{this.$store.state.cartProductsData.length}} товара
        </span>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
          <div class="cart__field">
            <div class="cart__data">
              <BaseFormText v-model="formData.name" :error="formError.name" name="ФИО" title="ФИО"  placeholder="Введите ваше полное имя"></BaseFormText>
              <BaseFormText v-model="formData.address" :error="formError.address" name="address" title="Адрес доставки" placeholder="Введите ваш адрес"></BaseFormText>
              <BaseFormText v-model="formData.phone" :error="formError.phone" name="phone" title="phone" placeholder="Введите ваш телефон"></BaseFormText>
              <BaseFormText v-model="formData.email" :error="formError.email" name="email" title="email" placeholder="Введи ваш Email"></BaseFormText>
              <BaseFormTextarea v-model="formData.comment" title="Комментарий к заказу" :error="formError.comment" placeholder="Ваши пожелания" />
            </div>

            <div class="cart__options">
              <h3 class="cart__title">Доставка</h3>
              <ul class="cart__options options">
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked>
                    <span class="options__value">
                      Самовывоз <b>бесплатно</b>
                    </span>
                  </label>
                </li>
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                    <span class="options__value">
                      Курьером <b>500 ₽</b>
                    </span>
                  </label>
                </li>
              </ul>

              <h3 class="cart__title">Оплата</h3>
              <ul class="cart__options options">
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="pay" value="card">
                    <span class="options__value">
                      Картой при получении
                    </span>
                  </label>
                </li>
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                    <span class="options__value">
                      Наличными при получении
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div class="cart__block">
            <OrdersList />

            <button class="cart__button button button--primery" type="submit">
              Оформить заказ
            </button>
          </div>

          <div class="cart__error form__error-block" v-if="formErrorMessage">
            <h4>Заявка не отправлена!</h4>
            <p>
              {{ formErrorMessage }}
            </p>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import BasePreloader from '@/components/BasePreloader.vue';
import OrdersList from '@/components/OrdersList.vue';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

export default {
  components: {
    BaseFormText,
    BaseFormTextarea,
    OrdersList,
    BasePreloader,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
    };
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';

      axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          // eslint-disable-next-line vue/max-len
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
          this.$store.commit('updateCartLoading', true);
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    },
  },
  created() {
    this.$store.commit('updateCartLoading', true);
    new Promise((resolve) => {
      // eslint-disable-next-line vue/max-len
      setTimeout(() => resolve(), 1000);
    })
      .then(() => this.$store.commit('updateCartLoading', false));
  },
};
</script>
