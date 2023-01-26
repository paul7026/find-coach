<template>
  <form @submit.prevent="submitForm">
    <div
      class="form-control"
      :class="{ invalid: !emailIsValid && email.isTouched }"
    >
      <label for="email">Your E-Mail</label>
      <input
        type="email"
        id="email"
        v-model.trim="email.val"
        @blur="email.isTouched = true"
      />
      <p v-if="!emailIsValid && email.isTouched">Please enter a valid email</p>
    </div>

    <div
      class="form-control"
      :class="{ invalid: !messageIsValid && message.isTouched }"
    >
      <label for="message">Message</label>
      <textarea
        id="message"
        rows="5"
        v-model.trim="message.val"
        @blur="message.isTouched = true"
      />
      <p v-if="!messageIsValid && message.isTouched">
        Please enter a non-empty message
      </p>
    </div>

    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { BaseButton },
  data() {
    return {
      email: {
        val: null as string | null,
        isTouched: false,
      },
      message: {
        val: null as string | null,
        isTouched: false,
      },
    };
  },

  computed: {
    emailIsValid(): boolean {
      return !!this.email.val;
    },

    messageIsValid(): boolean {
      return !!this.message.val;
    },

    formIsValid(): boolean {
      return this.emailIsValid && this.messageIsValid;
    },
  },

  methods: {
    submitForm() {
      this.email.isTouched = true;
      this.message.isTouched = true;

      if (this.formIsValid) {
        const formData = {
          email: this.email.val,
          message: this.message.val,
          coachId: this.$route.params.id,
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
