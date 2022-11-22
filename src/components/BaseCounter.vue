<!-- eslint-disable max-len -->
<!-- eslint-disable vue/max-len -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div>
      <button type="button" aria-label="Убрать один товар" @click.prevent="decrement" :disabled="counter === 0">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" :value="counter" name="count">

      <button type="button" aria-label="Добавить один товар" @click.prevent="increment">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
</template>

<script>
export default {
  props: ['item', 'counter'],
  emits: ['update:counter'],
  methods: {
    increment() {
      this.$emit('update:counter', this.counter + 1);
    },
    decrement() {
      this.$emit('update:counter', this.counter - 1);
    },
  },

};
</script>
