<template>
  <header>
    <nav>
      <h1><router-link to="/">Find a Coach</router-link></h1>
      <ul>
        <li><router-link to="/coaches">All Coaches</router-link></li>
        <li v-if="isLoggedIn">
          <router-link to="/requests">Requests</router-link>
        </li>
        <li v-else>
          <router-link to="/auth">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '../ui/BaseButton.vue';

export default defineComponent({
  components: { BaseButton },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isAuthenticated',
    }),
  },

  methods: {
    ...mapActions({
      logoutAction: 'logout',
    }),

    logout() {
      this.logoutAction();
      this.$router.replace('/coaches');
    },
  },
});
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #14213d;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
    color: #fca311;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
    &:active,
    &:hover,
    &.router-link-active {
      border: 1px solid #fca311;
    }
  }
}

h1 {
  margin: 0;
  a {
    color: white;
    margin: 0;
    &:hover,
    &:active,
    &.router-link-active {
      border-color: transparent;
    }
  }
}

nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
