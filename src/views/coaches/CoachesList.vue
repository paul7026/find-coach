<template>
  <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <coach-filter @change-filter="setFilters" />
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches(true)">
          Refresh
        </base-button>
        <base-button v-if="!isLoggedIn" link to="/auth?redirect=register"
          >Login to Register as Coach</base-button
        >
        <base-button
          v-if="isLoggedIn && !isCoach && !isLoading"
          link
          to="/register"
          >Register as Coach</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner />
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in coaches"
          :key="coach.id"
          :id="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        />
      </ul>
      <h3 v-else>No coaches found</h3>
    </base-card>
  </section>
</template>

<script lang="ts">
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import CoachItem from '@/components/coaches/CoachItem.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import { activeFilters, Coach } from '@/models/CoachesModel';
import { defineComponent } from 'vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  components: {
    BaseCard,
    BaseButton,
    CoachItem,
    CoachFilter,
    BaseSpinner,
    BaseDialog,
  },

  data() {
    return {
      isLoading: false,
      error: null as string | null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      } as activeFilters,
    };
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'isAuthenticated',
      hasCoaches: 'coaches/hasCoaches',
      isCoach: 'coaches/isCoach',
    }),

    coaches(): Coach[] {
      return this.$store.getters['coaches/filteredCoaches'](this.activeFilters);
    },
  },

  created() {
    this.loadCoaches();
  },

  methods: {
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        if (error instanceof Error) {
          this.error = error.message || 'Something went wrong!';
        }
      }
      this.isLoading = false;
    },

    handleError() {
      this.error = null;
    },

    setFilters(updatedFilters: activeFilters) {
      this.activeFilters = updatedFilters;
    },
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
