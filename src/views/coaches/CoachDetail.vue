<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>

  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view />
    </base-card>
  </section>

  <section>
    <base-card>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      />
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script lang="ts">
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import { Coach } from '@/models/CoachesModel';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { BaseCard, BaseButton, BaseBadge },
  props: {
    id: String,
  },

  data() {
    return {
      selectedCoach: null as Coach | null,
    };
  },

  computed: {
    fullName() {
      return this.selectedCoach?.firstName + ' ' + this.selectedCoach?.lastName;
    },

    areas() {
      return this.selectedCoach?.areas;
    },

    rate() {
      return this.selectedCoach?.hourlyRate;
    },

    description() {
      return this.selectedCoach?.description;
    },

    contactLink() {
      return `/coaches/${this.id}/contact`;
    },
  },

  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach: Coach) => coach.id === this.id
    );
  },
});
</script>

<style scoped>
p {
  font-size: 18px;
}
</style>
