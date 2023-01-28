<template>
  <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>

  <base-card>
    <base-spinner v-if="isLoading" />
    <form v-if="!isLoading" @submit.prevent="submitForm">
      <div class="form-control" :class="{ invalid: v$.email.$error }">
        <label for="email">E-Mail</label>
        <input
          type="email"
          id="email"
          v-model.trim="email"
          @blur="v$.email.$touch"
        />
        <p v-if="v$.email.$error">Please enter a valid email</p>
      </div>

      <div class="form-control" :class="{ invalid: v$.password.$error }">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model.trim="password"
          @blur="v$.password.$touch"
        />
        <p v-if="v$.password.$error">
          Password must be greater than 6 characters.
        </p>
      </div>
      <base-button type="submit">{{ submitButtonCaption }}</base-button>
      <base-button type="button" mode="flat" @click="switchAuthMode">
        {{ switchModeButtonCaption }}
      </base-button>
    </form>
  </base-card>
</template>

<script lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  components: { BaseButton, BaseCard, BaseSpinner, BaseDialog },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      email: '',
      password: '',
      mode: 'login',
      isLoading: false,
      error: null as string | null,
    };
  },

  computed: {
    submitButtonCaption(): string {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },

    switchModeButtonCaption(): string {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
  },

  validations() {
    return {
      email: { required, email },
      password: { required, minLengthValue: minLength(6) },
    };
  },

  methods: {
    ...mapActions({
      login: 'login',
      signup: 'signup',
    }),

    async submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.isLoading = true;

        const actionPayload = {
          email: this.email,
          password: this.password,
        };

        try {
          this.mode === 'login'
            ? await this.login(actionPayload)
            : await this.signup(actionPayload);

          const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');

          this.$router.replace(redirectUrl);
        } catch (error) {
          if (error instanceof Error) {
            this.error = error.message || 'Failed to authenticate, try later!';
          }
        }

        this.isLoading = false;
      }
    },

    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },

    handleError() {
      this.error = null;
    },
  },
});
</script>

<style lang="scss" scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 1rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  border-radius: 6px;
  padding: 10px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  &:focus {
    background-color: rgb(252, 252, 252);
    outline: none;
    border-color: rgb(99, 93, 93);
  }
}

.invalid {
  input,
  textarea {
    border: 1px solid red;
  }

  p {
    color: red;
  }
}
</style>
