<template>
  <label :for="label">
    <slot />
    <input type="checkbox" :id="label" v-model="model" :value="value" />
    <span></span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: String,
    modelValue: [Array, Boolean],
    value: [Boolean, Object, String],
  },

  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value: [] | boolean) {
        this.$emit('update:modelValue', value);
      },
    },
  },
});
</script>

<style lang="scss" scoped>
label {
  position: relative;
  padding-left: 30px;
  cursor: pointer;

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: #ddd;
    transition: 0.2s background-color;
    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 6px;
      top: 2px;
      width: 4px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  }
}

input:checked ~ span {
  background-color: rgb(99, 93, 93);
}

label input:checked ~ span:after {
  display: block;
}
</style>
