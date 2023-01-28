<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData" />
    </base-card>
  </section>
</template>

<script lang="ts">
import CoachForm from '@/components/coaches/CoachForm.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import { CoachFormData } from '@/models/CoachesModel';

import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  components: { BaseCard, CoachForm },

  methods: {
    ...mapActions({
      registerCoach: 'coaches/registerCoach',
    }),

    saveData(formData: CoachFormData) {
      this.registerCoach(formData);
      this.$router.replace('/coaches');
    },
  },
});
</script>
