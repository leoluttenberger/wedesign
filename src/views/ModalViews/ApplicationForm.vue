<template>
  <div class="p-4">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Firma:
          </p>
          <FormKit
            v-model="company"
            type="text"
            placeholder="Unternehmensname"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Beruf:
          </p>
          <FormKit v-model="job" type="text" placeholder="Beruf oder Lehre" />
        </div>
      </div>
    </div>
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
        >
          Deadline:
        </p>
        <FormKit type="date" v-model="deadline" placeholder="Auswählen" />
      </div>
    </div>
  </div>

  <div class="grid flex gap-6 py-10">
    <button
      class="bg-wd-green hover:bg-transparent-green shadow h-24 text-white font-bold"
      @click="saveToLocalStorage()"
      :disabled="buttonDisabled"
    >
      Bewerbung hinzufügen
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { slideDown } from "@/store.js";
const company = ref(null);
const job = ref(null);
const deadline = ref(null);
let __contactPerson = null;
let __mv = 0;
let __state = "Entwurf";
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
      mv: __mv,
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
