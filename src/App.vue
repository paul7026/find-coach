<template>
  <the-header />
  <router-view> </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheHeader from '@/components/layout/TheHeader.vue';

export default defineComponent({
  components: {
    TheHeader,
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
</style>
