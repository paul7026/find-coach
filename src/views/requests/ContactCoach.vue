<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: v$.email.$error }">
      <label for="email">Your E-Mail</label>
      <input
        type="email"
        id="email"
        v-model.trim="email"
        @blur="v$.email.$touch"
      />
      <p v-if="v$.email.$error">Please enter a valid email</p>
    </div>

    <div class="form-control" :class="{ invalid: v$.message.$error }">
      <label for="message">Message</label>
      <textarea
        id="message"
        rows="5"
        v-model.trim="message"
        @blur="v$.message.$touch"
      />
      <p v-if="v$.message.$error">Please enter a non-empty message</p>
    </div>

    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import { RequestFormData } from '@/models/RequestsModel';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { BaseButton },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      email: '',
      message: '',
    };
  },

  validations() {
    return {
      email: { required, email },
      message: { required },
    };
  },

  methods: {
    submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const formData: RequestFormData = {
          email: this.email,
          message: this.message,
          coachId: this.$route.params.id as string,
        };
        this.$store.dispatch('requests/contactCoach', formData);
        this.$router.replace('/coaches');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
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

.actions {
  text-align: center;
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
