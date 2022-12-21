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
import { ref, onMounted } from "vue";
import { slideDown } from "../store.js";
const company = ref(null);
const job = ref(null);
const deadline = ref(null);
let __contactPerson = null;
let __cv = null;
let __state = null;
let __note = null;
let buttonDisabled = false;

onMounted(() => {
  buttonDisabled = false;
});

const saveToLocalStorage = () => {
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
  if (buttonDisabled == false) {
    buttonDisabled = true;
    if (localStorage.getItem("applications")) {
      const currentApplications = JSON.parse(
        localStorage.getItem("applications")
      );
      console.log(currentApplications);
      const newData = [...currentApplications, application];
      console.log(newData);
      localStorage.setItem("applications", JSON.stringify(newData));
    } else {
      localStorage.setItem("applications", JSON.stringify([application]));
    }
    slideDown.value = true;
  }
};
</script>
