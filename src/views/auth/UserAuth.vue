<template>
  <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>

  <base-card>
    <base-spinner v-if="isLoading" />
    <form v-if="!isLoading" @submit.prevent="submitForm">
      <div
        class="form-control"
        :class="{ invalid: !emailIsValid && email.isTouched }"
      >
        <label for="email">E-Mail</label>
        <input
          type="email"
          id="email"
          v-model.trim="email.val"
          @blur="email.isTouched = true"
        />
        <p v-if="!emailIsValid && email.isTouched">
          Please enter a valid email
        </p>
      </div>

      <div
        class="form-control"
        :class="{ invalid: !passwordIsValid && password.isTouched }"
      >
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model.trim="password.val"
          @blur="password.isTouched = true"
        />
        <p v-if="!passwordIsValid && password.isTouched">
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
import { defineComponent } from 'vue';

export default defineComponent({
  components: { BaseButton, BaseCard, BaseSpinner, BaseDialog },
  data() {
    return {
      email: {
        val: null as null | string,
        isTouched: false,
      },
      password: {
        val: null as null | string,
        isTouched: false,
      },
      mode: 'login',
      isLoading: false,
      error: null as string | null,
    };
  },

  computed: {
    emailIsValid(): boolean {
      return !!this.email.val && this.email.val.includes('@');
    },

    passwordIsValid(): boolean {
      return !!this.password.val && this.password.val.length >= 6;
    },

    formIsValid(): boolean {
      return this.emailIsValid && this.passwordIsValid;
    },

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

  methods: {
    async submitForm() {
      this.email.isTouched = true;
      this.password.isTouched = true;

      if (this.formIsValid) {
        this.isLoading = true;

        const actionPayload = {
          email: this.email.val,
          password: this.password.val,
        };

        try {
          this.mode === 'login'
            ? await this.$store.dispatch('login', actionPayload)
            : await this.$store.dispatch('signup', actionPayload);

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
