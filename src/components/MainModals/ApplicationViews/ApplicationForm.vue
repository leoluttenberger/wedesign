<template>
  <div class="px-5">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
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
          <div
            class="px-0 py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
          >
            <p>Start</p>
          </div>
          <div class="px-2">
            <FormKit
              type="datetime-local"
              v-model="start"
              validation="required"
              value=""
              validation-visibility="live"
              placeholder="Auswählen"
            />
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
            <FormKit
              type="datetime-local"
              v-model="deadline"
              :value="start"
              validation="required|date_after"
              validation-visibility="live"
              placeholder="Auswählen"
            />
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
    </div>
  </div>
  <div class="grid flex">
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
import { slideDown } from "@/store/store.js";
const company = ref(null);
const job = ref(null);
const deadline = ref(null);
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
  const applications = ref(JSON.parse(localStorage.getItem("applications")));

  const application = [
    {
      id: 1,
      company: company.value,
      job: job.value,
      streetName: "",
      streetNumber: "",
      districtNumber: "",
      city: "",
      contactPerson: contactPerson.value,
      state: __state,
      mv: __mv,
      note: "",
      start: start.value,
      deadline: deadline.value,
    },
  ];
  const appointment = [
    {
      type: "Deadline",
      title: company.value,
      appointmentFrom: start.value,
      appointmentTo: deadline.value,
      note: note.value,
      deadlineId: 1,
    },
  ];
  let dateCheck = false;

  if (deadline.value != null) {
    const year = Number(deadline.value.slice(0, 4));
    const month = (Number(deadline.value.slice(5, 7)) / 10) * 10;
    const day = (Number(deadline.value.slice(8, 10)) / 10) * 10;
    const hours = (Number(deadline.value.slice(11, 13)) / 10) * 10;
    const minutes = (Number(deadline.value.slice(14, 16)) / 10) * 10;
    const currentDate = new Date();
    if (year > Number(currentDate.getFullYear())) {
      console.log("Year:", year);
      dateCheck = true;
    } else if (year == Number(currentDate.getFullYear())) {
      if (month > Number(currentDate.getMonth() + 1)) {
        console.log("Month:", month);
        dateCheck = true;
      } else if (month == Number(currentDate.getMonth() + 1)) {
        if (day > Number(currentDate.getDate())) {
          console.log("Day:", day);
          dateCheck = true;
        } else if (day == Number(currentDate.getDate())) {
          console.log("Day:", day);
          if (hours > Number(currentDate.getHours())) {
            console.log("Hours:", hours);
            dateCheck = true;
          } else if (hours == Number(currentDate.getHours())) {
            console.log("Hours:", hours);
            if (minutes >= Number(currentDate.getMinutes())) {
              console.log("Minutes:", minutes);
              dateCheck = true;
            }
          }
        }
      }
    }
  }
  if (start.value != null) {
    const year = Number(start.value.slice(0, 4));
    const month = (Number(start.value.slice(5, 7)) / 10) * 10;
    const day = (Number(start.value.slice(8, 10)) / 10) * 10;
    const hours = (Number(start.value.slice(11, 13)) / 10) * 10;
    const minutes = (Number(start.value.slice(14, 16)) / 10) * 10;
    const currentDate = new Date();
    dateCheck = false;
    if (year > Number(currentDate.getFullYear())) {
      console.log("Year:", year);
      dateCheck = true;
    } else if (year == Number(currentDate.getFullYear())) {
      if (month > Number(currentDate.getMonth() + 1)) {
        console.log("Month:", month);
        dateCheck = true;
      } else if (month == Number(currentDate.getMonth() + 1)) {
        if (day > Number(currentDate.getDate())) {
          console.log("Day:", day);
          dateCheck = true;
        } else if (day == Number(currentDate.getDate())) {
          console.log("Day:", day);
          if (hours > Number(currentDate.getHours())) {
            console.log("Hours:", hours);
            dateCheck = true;
          } else if (hours == Number(currentDate.getHours())) {
            console.log("Hours:", hours);
            if (minutes >= Number(currentDate.getMinutes())) {
              console.log("Minutes:", minutes);
              dateCheck = true;
            }
          }
        }
      }
    }
  }

  if (company.value) {
    if (buttonDisabled == false) {
      if (dateCheck) {
        buttonDisabled = true;
        if (localStorage.getItem("applications")) {
          if (applications.value.length) {
            const currentApplications = JSON.parse(
              localStorage.getItem("applications")
            );
            console.log(applications.value.length);

            application[0].id =
              applications.value[applications.value.length - 1][0].id + 1;
            appointment[0].deadlineId = application[0].id;
            const newData = [...currentApplications, application];
            localStorage.setItem("applications", JSON.stringify(newData));
          } else {
            localStorage.setItem("applications", JSON.stringify([application]));
          }
        } else {
          localStorage.setItem("applications", JSON.stringify([application]));
        }
        if (localStorage.getItem("appointments")) {
          const currentappointments = JSON.parse(
            localStorage.getItem("appointments")
          );
          const newData = [...currentappointments, appointment];
          localStorage.setItem("appointments", JSON.stringify(newData));
        } else {
          localStorage.setItem("appointments", JSON.stringify([appointment]));
        }
        slideDown.value = true;
      }
    }
  }
};
</script>
