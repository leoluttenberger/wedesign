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
  <div class="grid flex gap-2">
    <button
      class="bg-wd-error shadow rounded-md h-8 w-full text-white"
      @click="removeFromLocalStorage()"
      :disabled="buttonDisabled"
    >
      Bewerbung entfernen
    </button>
    <button
      class="bg-wd-green hover:bg-transparent-green shadow h-14 text-white"
      @click="createMotivationNode()"
      :disabled="buttonDisabled"
    >
      Motivationsschreiben erstellen
    </button>
    <button
      class="bg-wd-green hover:bg-transparent-green shadow h-14 text-white"
      @click="sendJobApplication()"
      :disabled="buttonDisabled"
    >
      Bewerbung abschicken
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";
import { slideDown } from "@/store.js";
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

const sendJobApplication = () => {
  if (buttonDisabled == false) {
    buttonDisabled = true;
    slideDown.value = true;
  }
};
const removeFromLocalStorage = () => {
  if (buttonDisabled == false) {
    buttonDisabled = true;
    applications.value.splice(props.editIndex, 1);
    localStorage.setItem("applications", JSON.stringify(applications.value));
    slideDown.value = true;
  }
};
const createMotivationNode = () => {
  if (buttonDisabled == false) {
    buttonDisabled = true;
    slideDown.value = true;
  }
};
</script>
