import BaseFormField from '@/components/BaseFormField.vue';

export default {
  props: ['title', 'error', 'placeholder', 'value', 'name'],
  components: { BaseFormField },
  computed: {
    dataValue: {
      get() {
        // eslint-disable-next-line no-unused-expressions
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
