<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <div class="actions">
      <base-checkbox
        label="frontend"
        v-model="filters.frontend"
        @change="setFilter"
      >
        Frontend
      </base-checkbox>

      <base-checkbox
        label="backend"
        v-model="filters.backend"
        @change="setFilter"
      >
        Backend
      </base-checkbox>

      <base-checkbox
        label="career"
        v-model="filters.career"
        @change="setFilter"
      >
        Career
      </base-checkbox>
    </div>
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseCard from '../ui/BaseCard.vue';
import BaseCheckbox from '../ui/BaseCheckbox.vue';

export default defineComponent({
  components: { BaseCard, BaseCheckbox },
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },

  methods: {
    setFilter() {
      this.$emit('change-filter', this.filters);
    },
  },
});
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  justify-content: space-between;
  width: 55%;
}
</style>
