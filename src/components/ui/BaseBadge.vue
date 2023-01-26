<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  props: {
    type: String,
    title: String,
  },

  computed: {
    text() {
      return this.title.toUpperCase();
    },
  },
});
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.frontend {
  background-color: #fca311;
  color: #14213d;
}

.backend {
  background-color: #14213d;
  color: white;
}

.career {
  background-color: #e5e5e5;
  color: #14213d;
}
</style>
