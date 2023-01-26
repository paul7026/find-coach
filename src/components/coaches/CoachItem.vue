<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div class="badge">
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      />
    </div>
    <div class="actions">
      <base-button mode="outline" link :to="coachContactLink">
        Contact
      </base-button>
      <base-button link :to="coachDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import BaseBadge from '../ui/BaseBadge.vue';
import BaseButton from '../ui/BaseButton.vue';

export default defineComponent({
  components: { BaseBadge, BaseButton },
  props: {
    id: String,
    firstName: String,
    lastName: String,
    rate: Number,
    areas: Array,
  },

  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },

    coachContactLink() {
      return `${this.$route.path}/${this.id}/contact`;
    },

    coachDetailsLink() {
      return `${this.$route.path}/${this.id}`;
    },
  },
});
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

h4 {
  margin: 1.5rem 0;
}

.badge {
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
