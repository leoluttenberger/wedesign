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
            :options="['Bewerbungsgespräch', 'Sonstige Termine']"
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
            validation="required"
            value="2020-03-13T18:22"
            validation-visibility="live"
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
            :value="appointmentFrom"
            validation="required|date_after"
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
import { slideDown, addedDate, addedType } from "@/store/store.js";

const type = ref(null);
const title = ref("");
const appointmentFrom = ref(null);
const appointmentTo = ref(null);
const address = ref("");
const note = ref(null);
let buttonDisabled = false;

onMounted(() => {
  buttonDisabled = false;
  slideDown.value = false;
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
  if (appointmentFrom.value != null && appointmentTo.value != null) {
    if (buttonDisabled == false) {
      buttonDisabled = true;
      if (localStorage.getItem("appointments")) {
        const currentappointments = JSON.parse(
          localStorage.getItem("appointments")
        );
        const newData = [...currentappointments, appointment];
        localStorage.setItem("appointments", JSON.stringify(newData));
      } else {
        localStorage.setItem("appointments", JSON.stringify([appointment]));
      }
      addedDate.value = appointmentFrom.value;
      addedType.value = type.value;
      slideDown.value = true;
      console.log("Date saved!");
    }
  } else {
    console.log("Date is not set!");
    console.log(appointmentFrom.value);
    console.log(appointmentTo.value);
  }
};
</script>
