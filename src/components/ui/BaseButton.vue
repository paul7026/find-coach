<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },
});
</script>

<style lang="scss" scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #14213d;
  border: 1px solid #14213d;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 0.5rem;
  display: inline-block;
  &:hover,
  &:active {
    background-color: #0f192e;
    border-color: #0f192e;
  }
}

.flat {
  background-color: transparent;
  color: #14213d;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: black;
  color: black;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #e5e5e5;
  border-color: #e5e5e5;
}
</style>
