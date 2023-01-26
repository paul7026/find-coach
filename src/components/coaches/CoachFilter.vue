<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <div class="actions">
      <label for="frontend">
        Frontend
        <input type="checkbox" id="frontend" checked @change="setFilter" />
        <span></span>
      </label>

      <label for="backend">
        Backend
        <input type="checkbox" id="backend" checked @change="setFilter" />
        <span></span>
      </label>

      <label for="career">
        Career
        <input type="checkbox" id="career" checked @change="setFilter" />
        <span></span>
      </label>
    </div>
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseCard from '../ui/BaseCard.vue';

export default defineComponent({
  components: { BaseCard },
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
    setFilter(event: Event) {
      const target = event.target as HTMLInputElement;
      const inputId = target.id;
      const isActive = target.checked;
      const updatedFilters = { ...this.filters, [inputId]: isActive };
      this.filters = updatedFilters;
      this.$emit('change-filter', updatedFilters);
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

label {
  margin-bottom: 1rem;
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
