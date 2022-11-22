/* eslint-disable max-len */
/* eslint-disable vue/max-len */
/* eslint-disable no-shadow */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    isCartLoading: true,
    orderInfo: null,
  },

  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },

    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },

    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((item) => item.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },

    deleteCartProduct(state, product) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== product.productId);
    },

    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },

    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },

    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },

    updateCartLoading(state, boolean) {
      state.isCartLoading = boolean;
    },
  },

  getters: {
    // eslint-disable-next-line consistent-return
    getDataOrders(state) {
      return {
        basket: { items: state.cartProductsData },
        totalPrice: state.cartProductsData.reduce((acc, item) => (item.product.price * item.quantity) + acc, 0),
      };
    },

    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        // eslint-disable-next-line prefer-destructuring
        const product = state.cartProductsData.find((p) => p.product.id === item.productId).product;

        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },

    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },

  actions: {
    loadOrderInfo(context, orderId) {
      return axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        });
    },

    loadCart(context) {
      context.commit('updateCartLoading', true);
      // eslint-disable-next-line arrow-parens, no-promise-executor-return
      return (new Promise(resolve => setTimeout(resolve, 1000)))
      // eslint-disable-next-line arrow-body-style
        .then(() => {
          return axios
            .get(`${API_BASE_URL}/api/baskets`, {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
            })
            .then((response) => {
              if (!context.state.userAccessKey) {
                localStorage.setItem('userAccessKey', response.data.user.accessKey);
                context.commit('updateUserAccessKey', response.data.user.accessKey);
              }

              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
              context.commit('updateCartLoading', false);
            });
        });
    },

    addProductToCart(context, { productId, amount }) {
      // eslint-disable-next-line arrow-parens, no-promise-executor-return
      return (new Promise(resolve => setTimeout(resolve, 1000)))
        // eslint-disable-next-line arrow-body-style
        .then(() => {
          return axios
            .post(
              `${API_BASE_URL}/api/baskets/products`,
              {
                productId,
                quantity: amount,
              },
              {
                params: { userAccessKey: context.state.userAccessKey },
              },
            )
            .then((response) => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            });
        });
    },

    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });

      return axios
        .put(
          `${API_BASE_URL}/api/baskets/products`,
          {
            productId,
            quantity: amount,
          },
          {
            params: { userAccessKey: context.state.userAccessKey },
          },
        )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },

    deleteProductToCart(context, { productId }) {
      context.commit('deleteCartProduct', { productId });
      return axios
        .delete(
          `${API_BASE_URL}/api/baskets/products`,
          {
            params: { userAccessKey: context.state.userAccessKey },
            data: { productId },
          },
        )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        });
    },
  },
});
