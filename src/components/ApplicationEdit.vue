<template>
  <div class="p-4">
    <FormKit
      v-model="company"
      type="text"
      label="Firma"
      placeholder="Unternehmensname"
    />
    <FormKit
      v-model="job"
      type="text"
      label="Beruf"
      placeholder="Beruf oder Lehre"
    />
    <FormKit
      type="date"
      v-model="deadline"
      label="Deadline"
      placeholder="Auswählen"
    />
  </div>
  <button
    class="bg-wd-green hover:bg-transparent-green shadow h-14 text-white"
    @click="saveToLocalStorage()"
    :disabled="buttonDisabled"
  >
    Bewerbung hinzufügen
  </button>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";
import { slideDown } from "../store.js";
const company = ref(null);
const job = ref(null);
const deadline = ref(null);
let __contactPerson = null;
let __cv = null;
let __state = null;
let __note = null;
let buttonDisabled = false;
const applications = ref(JSON.parse(localStorage.getItem("applications")));

const props = withDefaults(
  defineProps<{
    editIndex: number;
  }>(),
  { editIndex: 0 }
);

onMounted(() => {
  buttonDisabled = false;
  company.value = applications.value[props.editIndex][0].company;
  job.value = applications.value[props.editIndex][0].job;
  deadline.value = applications.value[props.editIndex][0].deadline;
  __contactPerson = applications.value[props.editIndex][0].contactPerson;
  __cv = applications.value[props.editIndex][0].cv;
  __state = applications.value[props.editIndex][0].state;
  __note = applications.value[props.editIndex][0].note;
});

const saveToLocalStorage = () => {
  if (buttonDisabled == false) {
    buttonDisabled = true;
    if (localStorage.getItem("applications")) {
      console.log("Update Education");
      applications.value[props.editIndex][0].company = company.value;
      applications.value[props.editIndex][0].job = job.value;
      applications.value[props.editIndex][0].deadline = deadline.value;
      applications.value[props.editIndex][0].contactPerson = __contactPerson;
      applications.value[props.editIndex][0].cv = __cv;
      applications.value[props.editIndex][0].state = __state;
      applications.value[props.editIndex][0].note = __note;

      localStorage.setItem("applications", JSON.stringify(applications.value));
    } else {
      const application = [
        {
          company: company.value,
          job: job.value,
          deadline: deadline.value,
          contactPerson: __contactPerson,
          state: __state,
          cv: __cv,
          note: __note,
        },
      ];
      localStorage.setItem("applications", JSON.stringify([application]));
    }
    slideDown.value = true;
  }
};
const removeFromLocalStorage = () => {
  if (buttonDisabled == false) {
    applications.value.splice(props.editIndex, 1);
    localStorage.setItem("applications", JSON.stringify(applications.value));
    slideDown.value = true;
  }
};
</script>
