<template>
  <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Request Received</h2>
      </header>
      <base-spinner v-if="isLoading" />
      <ul v-else-if="hasRequests && !isLoading">
        <request-item
          v-for="req in receivedRequests"
          :key="req.id"
          :email="req.userEmail"
          :message="req.message"
        />
      </ul>
      <h3 v-else>You have't received any request yet!</h3>
    </base-card>
  </section>
</template>

<script lang="ts">
import RequestItem from '@/components/requests/RequestItem.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  components: { BaseCard, RequestItem, BaseDialog, BaseSpinner },
  data() {
    return {
      isLoading: false,
      error: null as string | null,
    };
  },

  computed: {
    ...mapGetters({
      receivedRequests: 'requests/requests',
      hasRequests: 'requests/hasRequests',
    }),
  },

  created() {
    this.loadRequests();
  },

  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
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
  },
});
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
