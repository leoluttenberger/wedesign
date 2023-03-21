<template>
  <div class="p-4">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1 py-4">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
          >
            Firma:
          </p>
          <div class="px-2">
            <FormKit
              v-model="company"
              type="text"
              placeholder="Unternehmensname"
              validation="required|alphanumeric|?length:2"
              validation-label="Firma"
              validation-visibility="live"
            />
          </div>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1 py-4">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
          >
            Beruf:
          </p>
          <div class="px-2">
            <FormKit v-model="job" type="text" placeholder="Beruf oder Lehre" />
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
          >
            Straße:
          </p>
          <div class="px-2">
            <FormKit
              v-model="streetName"
              type="text"
              placeholder="Musterstraße"
            />
          </div>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
          >
            Nr:
          </p>
          <div class="px-2">
            <FormKit v-model="streetNumber" type="text" placeholder="1/1" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
          >
            PLZ:
          </p>
          <div class="px-2">
            <FormKit v-model="districtNumber" type="text" placeholder="1010" />
          </div>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
          >
            Ort:
          </p>
          <div class="px-2">
            <FormKit v-model="city" type="text" placeholder="Muserstadt" />
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <div
            class="px-0 py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
          >
            <p>Start</p>
          </div>
          <div class="px-2">
            <FormKit type="date" v-model="start" placeholder="Auswählen" />
          </div>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-3 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
          >
            Deadline:
          </p>
          <div class="px-2">
            <FormKit type="date" v-model="deadline" placeholder="Auswählen" />
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-14">
          <div
            class="px-0 py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
          >
            <p>Ansprechs</p>
            <p>person:</p>
          </div>
          <div class="px-2">
            <FormKit
              type="text"
              v-model="contactPerson"
              placeholder="Marlene Musterfrau"
            />
          </div>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-24">
          <p
            class="px-0 py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
          >
            Notiz:
          </p>
          <div class="py-2 px-2">
            <FormKit
              type="textarea"
              v-model="note"
              placeholder="Wichtige Informationen"
            />
          </div>
        </div>
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
const streetName = ref(null);
const streetNumber = ref(null);
const districtNumber = ref(null);
const city = ref(null);
const contactPerson = ref(null);
const note = ref("");
const start = ref(null);
let __mv = 0;
let __state = "Entwurf";
let buttonDisabled = false;

onMounted(() => {
  buttonDisabled = false;
});

const saveToLocalStorage = () => {
  const application = [
    {
      company: company.value,
      job: job.value,
      streetName: streetName.value,
      streetNumber: streetNumber.value,
      districtNumber: districtNumber.value,
      city: city.value,
      deadline: deadline.value,
      contactPerson: contactPerson.value,
      state: __state,
      mv: __mv,
      note: note.value,
    },
  ];
  const appointment = [
    {
      type: "Deadline",
      title: company.value,
      appointmentFrom: start.value,
      appointmentTo: deadline.value,
      note: note.value,
    },
  ];
  if (company.value) {
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
      if (localStorage.getItem("appointments")) {
        const currentappointments = JSON.parse(
          localStorage.getItem("appointments")
        );
        const newData = [...currentappointments, appointment];
        console.log(newData);
        localStorage.setItem("appointments", JSON.stringify(newData));
      } else {
        localStorage.setItem("appointments", JSON.stringify([appointment]));
      }
      slideDown.value = true;
    }
  }
};
</script>
