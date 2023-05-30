<template>
  <div class="px-2">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            v-model="type"
            label="Label:"
            type="select"
            placeholder="Auswahl"
            :options="[
              'Bewerbungsgespräch',
              'Aufnahmetest',
              'Feedback',
              'Sonstige Termine',
            ]"
            input-class="$reset h-10 bg-white dark:bg-slate-800 text-base dark:text-white"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            v-model="title"
            label="Titel:"
            type="text"
            placeholder="Titel des Termins"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            type="datetime-local"
            label="Start:"
            v-model="appointmentFrom"
            placeholder="Auswählen"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            type="datetime-local"
            label="Ende:"
            v-model="appointmentTo"
            :validation="
              appointmentFrom ? [['date_after', appointmentFrom]] : []
            "
            validation-visibility="live"
            :value="appointmentTo"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            v-model="address"
            label="Adresse:"
            type="text"
            placeholder="Straße Nr., PLZ"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            type="textarea"
            label="Notizen:"
            v-model="note"
            placeholder="Wichtige Informationen"
          />
        </div>
      </div>
    </div>
    <div class="grid flex gap-2 px-2">
      <button
        class="bg-wd-green shadow rounded-md h-16 w-full text-white font-bold"
        @click="saveToLocalStorage()"
        :disabled="buttonDisabled"
      >
        Termin hinzufügen
      </button>
    </div>
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
      endId: 0,
    },
  ];
  let dateCheck = false;

  if (appointmentFrom.value != null && appointmentTo.value != null) {
    if (appointmentFrom.value < appointmentTo.value) {
      dateCheck = true;
    }
  } else if (appointmentFrom.value != null || appointmentTo.value != null) {
    dateCheck = true;
  } else {
    console.log("Date is not set!");
    console.log(appointmentFrom.value);
    console.log(appointmentTo.value);
  }

  if (dateCheck) {
    if (localStorage.getItem("appointments")) {
      const currentappointments = JSON.parse(
        localStorage.getItem("appointments")
      );
      const newData = [...currentappointments, appointment];
      localStorage.setItem("appointments", JSON.stringify(newData));
    } else {
      localStorage.setItem("appointments", JSON.stringify([appointment]));
    }
    if (appointmentFrom.value != null) {
      addedDate.value = appointmentFrom.value;
    } else {
      addedDate.value = appointmentTo.value;
    }
    addedType.value = type.value;
    slideDown.value = true;
    console.log("Date saved!");
  }
};
</script>
