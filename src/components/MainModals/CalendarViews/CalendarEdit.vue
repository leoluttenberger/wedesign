<template>
  <div class="grid grid-cols-2 gap-1">
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-2 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
        >
          Label:
        </p>
        <div class="px-2">
          <FormKit
            v-model="type"
            type="select"
            placeholder="Auswahl"
            :options="['Bewerbungsgespräch', 'Sonstig Termine']"
          />
        </div>
      </div>
    </div>
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-2 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
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

  <div class="grid grid-cols-2 gap-1">
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-2 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
        >
          Beginn:
        </p>
        <div class="px-2">
          <FormKit
            type="datetime-local"
            v-model="appointmentFrom"
            :value="appointmentFrom"
          />
        </div>
      </div>
    </div>
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-2 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
        >
          Ende:
        </p>
        <div class="px-2">
          <FormKit
            type="datetime-local"
            v-model="appointmentTo"
            :validation="[['date_after', appointmentFrom]]"
            validation-visibility="live"
            :value="appointmentTo"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-1">
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-2 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
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
          class="px-2 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
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
      class="bg-wd-error shadow rounded-md h-14 w-full text-white font-bold"
      @click="removeFromLocalStorage()"
      :disabled="buttonDisabled"
    >
      Termin entfernen
    </button>
    <button
      class="bg-wd-green hover:bg-transparent-green shadow h-24 text-white font-bold"
      @click="saveToLocalStorage()"
      :disabled="buttonDisabled"
    >
      Termin speichern
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";
import { slideDown, changedDate } from "@/store/store.js";
const type = ref(null);
const title = ref("");
const appointmentFrom = ref(null);
const appointmentTo = ref(null);
const address = ref("");
const note = ref(null);
const appointments = ref(JSON.parse(localStorage.getItem("appointments")));
let buttonDisabled = false;

const props = withDefaults(
  defineProps<{
    editIndex: number;
  }>(),
  { editIndex: 0 }
);

onMounted(() => {
  buttonDisabled = false;
  changedDate.value = false;
  type.value = appointments.value[props.editIndex][0].type;
  title.value = appointments.value[props.editIndex][0].title;
  appointmentFrom.value =
    appointments.value[props.editIndex][0].appointmentFrom;
  appointmentTo.value = appointments.value[props.editIndex][0].appointmentTo;
  address.value = appointments.value[props.editIndex][0].address;
  note.value = appointments.value[props.editIndex][0].note;
});

const saveToLocalStorage = () => {
  let dateCheck = false;
  const currentDate = new Date();

  if (appointmentFrom.value != null) {
    const year = Number(appointmentFrom.value.slice(0, 4));
    const month = (Number(appointmentFrom.value.slice(5, 7)) / 10) * 10;
    const day = (Number(appointmentFrom.value.slice(8, 10)) / 10) * 10;
    const hours = (Number(appointmentFrom.value.slice(11, 13)) / 10) * 10;
    const minutes = (Number(appointmentFrom.value.slice(14, 16)) / 10) * 10;

    if (year > Number(currentDate.getFullYear())) {
      dateCheck = true;
    } else if (year == Number(currentDate.getFullYear())) {
      if (month > Number(currentDate.getMonth() + 1)) {
        dateCheck = true;
      } else if (month == Number(currentDate.getMonth() + 1)) {
        if (day > Number(currentDate.getDate())) {
          dateCheck = true;
        } else if (day == Number(currentDate.getDate())) {
          if (hours > Number(currentDate.getHours())) {
            dateCheck = true;
          } else if (hours == Number(currentDate.getHours())) {
            console.log("Hours:", hours);
            if (minutes >= Number(currentDate.getMinutes())) {
              dateCheck = true;
            }
          }
        }
      }
    }
  }
  if (appointmentTo.value != null) {
    const year = Number(appointmentTo.value.slice(0, 4));
    const month = (Number(appointmentTo.value.slice(5, 7)) / 10) * 10;
    const day = (Number(appointmentTo.value.slice(8, 10)) / 10) * 10;
    const hours = (Number(appointmentTo.value.slice(11, 13)) / 10) * 10;
    const minutes = (Number(appointmentTo.value.slice(14, 16)) / 10) * 10;

    if (year > Number(currentDate.getFullYear())) {
      dateCheck = true;
    } else if (year == Number(currentDate.getFullYear())) {
      if (month > Number(currentDate.getMonth() + 1)) {
        dateCheck = true;
      } else if (month == Number(currentDate.getMonth() + 1)) {
        if (day > Number(currentDate.getDate())) {
          dateCheck = true;
        } else if (day == Number(currentDate.getDate())) {
          console.log("Day:", day);
          if (hours > Number(currentDate.getHours())) {
            dateCheck = true;
          } else if (hours == Number(currentDate.getHours())) {
            if (minutes >= Number(currentDate.getMinutes())) {
              dateCheck = true;
            }
          }
        }
      }
    }
  }
  if (buttonDisabled == false) {
    if (dateCheck) {
      buttonDisabled = true;
      if (localStorage.getItem("appointments")) {
        console.log("Update Appointments");
        const applications = ref(
          JSON.parse(localStorage.getItem("applications"))
        );

        appointments.value[props.editIndex][0].type = type.value;
        appointments.value[props.editIndex][0].titel = title.value;
        appointments.value[props.editIndex][0].appointmentFrom =
          appointmentFrom.value;
        appointments.value[props.editIndex][0].appointmentTo =
          appointmentTo.value;

        appointments.value[props.editIndex][0].address = address.value;
        appointments.value[props.editIndex][0].note = note.value;

        if (type.value == "Deadline") {
          if (appointments.value.length > 0) {
            for (let i = 0; i < applications.value.length; i++) {
              if (
                applications.value[i][0].id ==
                appointments.value[props.editIndex][0].deadlineId
              ) {
                applications.value[i][0].start = appointmentFrom.value;
              }
            }

            localStorage.setItem(
              "applications",
              JSON.stringify(applications.value)
            );
          }
        }

        localStorage.setItem(
          "appointments",
          JSON.stringify(appointments.value)
        );
      }
    }
    slideDown.value = true;
    changedDate.value = true;
  }
};
const removeFromLocalStorage = () => {
  if (buttonDisabled == false) {
    const applications = ref(JSON.parse(localStorage.getItem("applications")));
    for (let i = 0; i < applications.value.length; i++) {
      if (
        applications.value[i][0].id ==
          appointments.value[props.editIndex][0].deadlineId &&
        appointments.value[props.editIndex][0].deadlineId != 0
      ) {
        applications.value[i][0].deadline = null;
        applications.value[i][0].start = null;
      }
    }
    appointments.value.splice(props.editIndex, 1);
    localStorage.setItem("appointments", JSON.stringify(appointments.value));
    localStorage.setItem("applications", JSON.stringify(applications.value));

    slideDown.value = true;
    changedDate.value = true;
  }
};
</script>
