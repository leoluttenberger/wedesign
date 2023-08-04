<template>
  <div class="px-2">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            v-model="company"
            type="text"
            label="Firma: *"
            placeholder="Unternehmensname"
            validation="required|?length:2"
            validation-label="Firma"
            validation-visibility="live"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            v-model="job"
            label="Berufsbezeichnung:"
            type="text"
            placeholder="Bäcker, Verkäufer"
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
            v-model="start"
            placeholder="Auswählen"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            type="datetime-local"
            label="Ende:"
            v-model="end"
            :validation="[['required'], ['date_after', start]]"
            validation-visibility="live"
            :value="end"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            type="text"
            label="Ansprechsperson:"
            v-model="contactPerson"
            placeholder="Marlene Musterfrau"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="grid flex gap-2 px-4">
    <button
      class="bg-wd-green shadow rounded-md h-16 w-full text-white font-bold"
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
const end = ref(null);
const contactPerson = ref(null);
const note = ref("");
const start = ref(null);
let __mv = 0;
let __state = "In Bearbeitung";
let buttonDisabled = false;

onMounted(() => {
  buttonDisabled = false;
});

const saveToLocalStorage = () => {
  const applications = ref(
    JSON.parse(localStorage.getItem("applications")) || []
  );

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
      end: end.value,
      date: new Date("4/11/2020").toLocaleDateString(),
    },
  ];
  const appointment = [
    {
      type: "Ende",
      title: company.value,
      appointmentFrom: start.value,
      appointmentTo: end.value,
      note: note.value,
      endId: 1,
    },
  ];
  let dateCheck = false;
  if (end.value != null && end.value) {
    if (start.value == null) {
      dateCheck = true;
    } else if (end.value >= start.value) {
      dateCheck = true;
    }
  }

  if (company.value && end.value) {
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
            appointment[0].endId = application[0].id;
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
