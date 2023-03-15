<template>
  <div class="grid grid-cols-2 gap-1">
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
        >
          Label:
        </p>
        <div class="px-2">
          <FormKit
            v-model="type"
            type="select"
            placeholder="Auswahl"
            :options="['Bewerbungstermin', 'Sonstig Termine']"
          />
        </div>
      </div>
    </div>
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
        >
          Titel:
        </p>
        <div class="px-2">
          <FormKit
            v-model="title"
            type="text"
            placeholder="Titel des Termins"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-1 py-4">
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
        >
          Beginn:
        </p>
        <div class="px-2">
          <FormKit
            type="datetime-local"
            v-model="appointmentFrom"
            value="2020-03-13T18:22"
          />
        </div>
      </div>
    </div>
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
        >
          Ende:
        </p>
        <div class="px-2">
          <FormKit
            type="datetime-local"
            v-model="appointmentTo"
            :validation="[['date_after', appointmentFrom]]"
            validation-visibility="live"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-1">
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
        >
          Adresse:
        </p>
        <div class="px-2">
          <FormKit
            v-model="address"
            type="text"
            placeholder="PLZ, Ort, Adresse"
          />
        </div>
      </div>
    </div>
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
        >
          Notizen:
        </p>
        <div class="px-2">
          <FormKit
            type="textarea"
            v-model="note"
            placeholder="Wichtige Informationen"
          />
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
      Termin hinzufügen
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { slideDown, addedDate } from "@/store.js";
const type = ref(null);
const title = ref("");
const appointmentFrom = ref(null);
const appointmentTo = ref(null);
const address = ref("");
const note = ref(null);
let buttonDisabled = false;

onMounted(() => {
  buttonDisabled = false;
});

const saveToLocalStorage = () => {
  const appointment = [
    {
      type: type.value,
      title: title.value,
      appointmentFrom: appointmentFrom.value,
      appointmentTo: appointmentTo.value,
      note: note.value,
    },
  ];
  if (buttonDisabled == false) {
    buttonDisabled = true;
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
    addedDate.value = appointmentFrom.value;
  }
};
</script>
