<template>
  <form @submit.prevent="submitForm">
    <div
      class="form-control"
      :class="{ invalid: !firstNameIsValid && firstName.isTouched }"
    >
      <label for="firstName">First name</label>
      <input
        type="text"
        id="firstName"
        v-model.trim="firstName.val"
        @blur="firstName.isTouched = true"
      />
      <p v-if="!firstNameIsValid && firstName.isTouched">
        First name must not be empty.
      </p>
    </div>

    <div
      class="form-control"
      :class="{ invalid: !lastNameIsValid && lastName.isTouched }"
    >
      <label for="lastName">Last name</label>
      <input
        type="text"
        id="lastName"
        v-model.trim="lastName.val"
        @blur="lastName.isTouched = true"
      />
      <p v-if="!lastNameIsValid && lastName.isTouched">
        Last name must not be empty.
      </p>
    </div>

    <div
      class="form-control"
      :class="{ invalid: !descriptionIsValid && description.isTouched }"
    >
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="description.isTouched = true"
      />
      <p v-if="!descriptionIsValid && description.isTouched">
        Description must not be empty.
      </p>
    </div>

    <div
      class="form-control"
      :class="{ invalid: !rateIsValid && rate.isTouched }"
    >
      <label for="rate">Hourly Rate ($)</label>
      <input
        type="number"
        id="rate"
        min="0"
        max="1000"
        v-model.trim="rate.val"
        @blur="rate.isTouched = true"
      />
      <p v-if="!rateIsValid && rate.isTouched">
        Rate must be greater than 0 and less than 1000.
      </p>
    </div>

    <div class="form-control" :class="{ invalid: !areasIsValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <label class="checkbox-label" for="frontend">
          Frontend Development
          <input
            type="checkbox"
            id="frontend"
            value="frontend"
            v-model="areas.val"
          />
          <span></span>
        </label>

        <label class="checkbox-label" for="backend">
          Backend Development
          <input
            type="checkbox"
            id="backend"
            value="backend"
            v-model="areas.val"
          />
          <span></span>
        </label>

        <label class="checkbox-label" for="career">
          Career Advisory
          <input
            type="checkbox"
            id="career"
            value="career"
            v-model="areas.val"
          />
          <span></span>
        </label>
      </div>
      <p v-if="!areasIsValid && areas.isTouched">
        At least one expertise must be selected.
      </p>
    </div>

    <div class="actions">
      <base-button>Register</base-button>
    </div>
  </form>
</template>

<script lang="ts">
import { CoachFormData } from '@/models/CoachesModel';
import { defineComponent } from '@vue/runtime-core';
import BaseButton from '../ui/BaseButton.vue';

export default defineComponent({
  components: { BaseButton },
  emits: ['save-data'],
  data() {
    return {
      firstName: {
        val: null as null | string,
        isTouched: false,
      },
      lastName: {
        val: null as null | string,
        isTouched: false,
      },
      description: {
        val: null as null | string,
        isTouched: false,
      },
      rate: {
        val: null as null | number,
        isTouched: false,
      },
      areas: {
        val: [] as string[],
        isTouched: false,
      },
    };
  },

  computed: {
    firstNameIsValid(): boolean {
      return !!this.firstName.val;
    },

    lastNameIsValid(): boolean {
      return !!this.lastName.val;
    },

    descriptionIsValid(): boolean {
      return !!this.description.val;
    },

    rateIsValid(): boolean {
      return !!this.rate.val && this.rate.val > 0 && this.rate.val <= 1000;
    },

    areasIsValid(): boolean {
      return this.areas.val.length !== 0;
    },

    formIsValid(): boolean {
      return (
        this.firstNameIsValid &&
        this.lastNameIsValid &&
        this.descriptionIsValid &&
        this.rateIsValid &&
        this.areasIsValid
      );
    },
  },

  methods: {
    submitForm() {
      this.firstName.isTouched = true;
      this.lastName.isTouched = true;
      this.description.isTouched = true;
      this.rate.isTouched = true;
      this.areas.isTouched = true;

      if (this.formIsValid) {
        const formData: CoachFormData = {
          firstName: this.firstName.val,
          lastName: this.lastName.val,
          description: this.description.val,
          hourlyRate: this.rate.val,
          areas: this.areas.val,
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

.checkbox-label {
  margin-bottom: 1rem;
  position: relative;
  padding-left: 30px;
  cursor: pointer;

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: #ddd;
    transition: 0.2s background-color;
    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 6px;
      top: 2px;
      width: 4px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  }
}

input:checked ~ span {
  background-color: rgb(99, 93, 93);
}

label input:checked ~ span:after {
  display: block;
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
