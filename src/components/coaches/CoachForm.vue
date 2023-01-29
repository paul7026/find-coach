<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: v$.firstName.$error }">
      <label for="firstName">First name</label>
      <input
        type="text"
        id="firstName"
        v-model.trim="firstName"
        @blur="v$.firstName.$touch"
      />
      <p v-if="v$.firstName.$error">First name must not be empty</p>
    </div>

    <div class="form-control" :class="{ invalid: v$.lastName.$error }">
      <label for="lastName">Last name</label>
      <input
        type="text"
        id="lastName"
        v-model.trim="lastName"
        @blur="v$.lastName.$touch"
      />
      <p v-if="v$.lastName.$error">Last name must not be empty</p>
    </div>

    <div class="form-control" :class="{ invalid: v$.description.$error }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description"
        @blur="v$.description.$touch"
      />
      <p v-if="v$.description.$error">Description must not be empty</p>
    </div>

    <div class="form-control" :class="{ invalid: v$.rate.$error }">
      <label for="rate">Hourly Rate ($)</label>
      <input
        type="number"
        id="rate"
        min="0"
        max="1000"
        v-model.trim="rate"
        @blur="v$.rate.$touch"
      />
      <p v-if="v$.rate.$error">Rate must be integer between 0 and 1000</p>
    </div>

    <div class="form-control" :class="{ invalid: v$.areas.$error }">
      <h3>Areas of Expertise</h3>
      <div>
        <base-checkbox
          class="checkbox"
          label="frontend"
          value="frontend"
          v-model="areas"
        >
          Frontend Development
        </base-checkbox>

        <base-checkbox
          class="checkbox"
          label="backend"
          value="backend"
          v-model="areas"
        >
          Backend Development
        </base-checkbox>

        <base-checkbox
          class="checkbox"
          label="career"
          value="career"
          v-model="areas"
        >
          Career Advisory
        </base-checkbox>
      </div>
      <p v-if="v$.areas.$error">At least one expertise must be selected</p>
    </div>

    <div class="actions">
      <base-button>Register</base-button>
    </div>
  </form>
</template>

<script lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, integer, maxValue, minValue } from '@vuelidate/validators';
import { CoachFormData } from '@/models/CoachesModel';
import { defineComponent } from '@vue/runtime-core';
import BaseButton from '../ui/BaseButton.vue';
import BaseCheckbox from '../ui/BaseCheckbox.vue';

export default defineComponent({
  components: { BaseButton, BaseCheckbox },
  emits: ['save-data'],

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      firstName: '',
      lastName: '',
      description: '',
      rate: null as number | null,
      areas: [] as string[],
    };
  },

  validations() {
    return {
      firstName: { required },
      lastName: { required },
      description: { required },
      rate: {
        required,
        integer,
        maxValue: maxValue(1000),
        minValue: minValue(0),
      },
      areas: { required },
    };
  },

  methods: {
    submitForm() {
      this.v$.$validate();

      if (!this.v$.$error) {
        const formData: CoachFormData = {
          firstName: this.firstName,
          lastName: this.lastName,
          description: this.description,
          hourlyRate: this.rate!,
          areas: this.areas,
        };
        this.$emit('save-data', formData);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.form-control {
  margin: 1rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
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

h3 {
  margin: 1rem 0;
  font-size: 1rem;
}

.checkbox {
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
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
