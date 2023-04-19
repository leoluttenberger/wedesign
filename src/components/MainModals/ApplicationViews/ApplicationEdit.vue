<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen">
    <div v-if="!motivationModalOpen">
      <div class="grid grid-cols-3 gap-20 p-2 place-items-center">
        <button type="button" @click="closeModal()" class="p-4">
          <BackIcon
            class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
          ></BackIcon>
        </button>
        <p
          class="text-black px-1 dark:text-white font-Montserrat text-xl p-4 font-bold"
        >
          {{ company }}
        </p>
        <button type="button" @click="closeAfterSave()" class="p-4">
          <CheckIcon
            class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
          ></CheckIcon>
        </button>
      </div>
      <div class="space-y-1">
        <div class="grid grid-cols-2 gap-1">
          <div class="col-span-2 md:col-span-1">
            <div class="flex bg-white dark:bg-slate-800 h-10">
              <p
                class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
              >
                Firma:
              </p>
              <div class="px-2">
                <FormKit
                  type="text"
                  v-model="company"
                  placeholder="Unternehmensname"
                />
              </div>
            </div>
          </div>

          <div class="col-span-2 md:col-span-1">
            <div class="flex bg-white dark:bg-slate-800 h-10">
              <p
                class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
              >
                Beruf:
              </p>
              <div class="px-2">
                <FormKit
                  type="text"
                  v-model="job"
                  placeholder="Beruf oder Lehre"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-1">
          <div class="col-span-2 md:col-span-1">
            <div class="flex bg-white dark:bg-slate-800 h-10">
              <p
                class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
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
                class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
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
                class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
              >
                PLZ:
              </p>
              <div class="px-2">
                <FormKit
                  v-model="districtNumber"
                  type="text"
                  placeholder="1010"
                />
              </div>
            </div>
          </div>
          <div class="col-span-2 md:col-span-1">
            <div class="flex bg-white dark:bg-slate-800 h-10">
              <p
                class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
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
              <p
                class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
              >
                Start:
              </p>
              <div class="px-2">
                <FormKit
                  type="datetime-local"
                  name="Start"
                  v-model="start"
                  placeholder="Auswählen"
                />
              </div>
            </div>
          </div>
          <div class="col-span-2 md:col-span-1">
            <div class="flex bg-white dark:bg-slate-800 h-10">
              <p
                class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
              >
                Deadline:
              </p>
              <div class="px-2">
                <FormKit
                  type="datetime-local"
                  name="Deadline"
                  v-model="deadline"
                  :validation="
                    start ? [['required'], ['date_after', start]] : []
                  "
                  validation-visibility="live"
                  :value="deadline"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-1">
          <div class="col-span-2 md:col-span-1">
            <div class="flex bg-white dark:bg-slate-800 h-10">
              <p
                class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
              >
                Status:
              </p>
              <div class="px-2">
                <FormKit
                  type="select"
                  v-model="state"
                  :options="[
                    'Entwurf',
                    'Erledigt',
                    'Keine Rückmeldung',
                    'Leider nein',
                  ]"
                />
              </div>
            </div>
          </div>
          <div class="col-span-2 md:col-span-1">
            <div class="flex bg-white dark:bg-slate-800 h-10">
              <div
                class="px-1 py-1 w-24 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
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
        <div class="grid grid-cols-2 gap-1">
          <div class="col-span-2 md:col-span-1">
            <div class="flex bg-white dark:bg-slate-800 h-24">
              <p
                class="py-3 px-1 w-24 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
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
          <div class="col-span-2 md:col-span-1">
            <div class="flex bg-white dark:bg-slate-800 py-1">
              <div class="py-1">
                <CloseIcon
                  v-if="__mv == 0"
                  class="h-6 w-24 stroke-1 stroke-wd-error"
                ></CloseIcon>
              </div>
              <div class="py-1">
                <CheckIcon
                  v-if="__mv > 0"
                  class="h-6 w-24 stroke-1 stroke-wd-green"
                ></CheckIcon>
              </div>
              <p
                class="w-34 py-2 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
              >
                {{ __mvText }}
              </p>
            </div>
          </div>
        </div>

        <div class="grid flex gap-2 py-2">
          <button
            class="bg-wd-error shadow rounded-md h-10 w-full text-white font-bold"
            @click="removeFromLocalStorage()"
          >
            Bewerbung entfernen
          </button>
          <button
            class="bg-wd-green hover:bg-transparent-green shadow h-16 text-white font-bold"
            @click="createMotivationNode()"
          >
            Motivationsschreiben bearbeiten
          </button>
          <button
            class="bg-wd-green hover:bg-transparent-green shadow h-16 text-white font-bold"
            @click="previewApplication()"
          >
            Vorschau ansehen
          </button>
        </div>
      </div>
    </div>

    <MVEditModal :show="motivationModalOpen">
      <div class="flex">
        <div
          class="rounded-lg w-screen h-screen overflow-hidden shadow-xl dark:bg-slate-700 bg-white"
        >
          <component
            v-bind="editIndex"
            :is="MotivationEdit"
            :currentApplIndex="editIndex"
            :currentMotvationMVIndex="mvIndex"
          />
        </div>
      </div>
    </MVEditModal>

    <MVEditModal :show="applicationPreviewOpen">
      <div class="flex">
        <div
          class="rounded-lg w-screen h-screen overflow-hidden shadow-xl dark:bg-slate-700 bg-white"
        >
          <component
            v-bind="editIndex"
            :is="ApplicationPreview"
            :currentApplIndex="editIndex"
            :currentMotvationMVIndex="mvIndex"
          />
        </div>
      </div>
    </MVEditModal>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from "vue";
import BackIcon from "@/assets/icons/BackIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

import { slideDown, sideBack } from "@/store/store.js";
import MotivationEdit from "@/components/MainModals/MotivationViews/MotivationEdit.vue";
import MVEditModal from "@/components/MenuModals/MVEditModal.vue";
import ApplicationPreview from "@/components/MainModals/ApplicationViews/AppilcationPreview.vue";

const MAX_ARCHIVE_LENGHT = 20;

const company = ref(null);
const job = ref(null);
const deadline = ref(null);
const contactPerson = ref(null);
const state = ref(null);
const note = ref(null);
const motivationModalOpen = ref(false);
const applicationPreviewOpen = ref(false);
const streetName = ref(null);
const streetNumber = ref(null);
const districtNumber = ref(null);
const city = ref(null);
const start = ref(null);
const mvIndex = ref(null);

let __mv = null;
let __mvText = null;
const editIndex = ref(0);

const props = defineProps({
  editIndex: {
    type: Number,
    default: 0,
  },
});

watch(sideBack, () => {
  if (sideBack.value) {
    if (motivationModalOpen.value == true) {
      motivationModalOpen.value = true;
    } else {
      applicationPreviewOpen.value = true;
    }
  } else {
    motivationModalOpen.value = false;
    applicationPreviewOpen.value = false;
    const applications = ref(
      JSON.parse(localStorage.getItem("applications")) || []
    );
    __mv = applications.value[props.editIndex][0].mv;
  }
});

onMounted(() => {
  editIndex.value = props.editIndex;
  const applications = ref(
    JSON.parse(localStorage.getItem("applications")) || []
  );
  const motivations = ref(
    JSON.parse(localStorage.getItem("motivations")) || []
  );

  company.value = applications.value[props.editIndex][0].company;
  job.value = applications.value[props.editIndex][0].job;
  streetName.value = applications.value[props.editIndex][0].streetName;
  streetNumber.value = applications.value[props.editIndex][0].streetNumber;
  districtNumber.value = applications.value[props.editIndex][0].districtNumber;
  city.value = applications.value[props.editIndex][0].city;
  deadline.value = applications.value[props.editIndex][0].deadline;
  contactPerson.value = applications.value[props.editIndex][0].contactPerson;
  state.value = applications.value[props.editIndex][0].state;
  note.value = applications.value[props.editIndex][0].note;
  start.value = applications.value[props.editIndex][0].start;
  __mv = applications.value[props.editIndex][0].mv;
  if (__mv == 0) {
    __mvText = "Motivationsschreiben fehlt";
    mvIndex.value = 0;
  } else {
    __mvText = "Motivationsschreiben angehaengt";
    mvIndex.value = 0;

    for (let i = 0; i < motivations.value.length; i++) {
      if (motivations.value[i][0].indexMV == __mv) {
        mvIndex.value = i;
        break;
      }
    }
  }

  sideBack.value = false;
  slideDown.value = false;
});

const previewApplication = () => {
  saveToLocalStorage();
  const motivations = ref(
    JSON.parse(localStorage.getItem("motivations")) || []
  );
  if (__mv == null) {
    __mvText = "Motivationsschreiben fehlt";
  } else {
    __mvText = "Motivationsschreiben angehaengt";
    for (let i = 0; i < motivations.value.length; i++) {
      if (motivations.value[i][0].indexMV == __mv) {
        mvIndex.value = i;
      }
    }
  }
  applicationPreviewOpen.value = true;
  sideBack.value = true;
};
const removeFromLocalStorage = () => {
  const applications = ref(
    JSON.parse(localStorage.getItem("applications")) || []
  );
  const appointments = ref(
    JSON.parse(localStorage.getItem("appointments")) || []
  );
  let sliceIndex = 0;
  let count = 0;
  const archive = [
    {
      company: applications.value[props.editIndex][0].company,
      job: applications.value[props.editIndex][0].job,
      state: applications.value[props.editIndex][0].state,
      date: applications.value[props.editIndex][0].date,
    },
  ];
  if (localStorage.getItem("archives")) {
    const archives = JSON.parse(localStorage.getItem("archives"));
    const newData = [...archives, archive];
    console.log("Updated Archives");
    if (archives.length > MAX_ARCHIVE_LENGHT) {
      newData.splice(0, 1);
    }
    localStorage.setItem("archives", JSON.stringify(newData));
  } else {
    localStorage.setItem("archives", JSON.stringify([archive]));
    console.log("Added Archives");
  }

  for (let i = 0; i < appointments.value.length; i++) {
    if (
      props.editIndex + 1 == appointments.value[i][0].deadlineId &&
      appointments.value[i][0].deadlineId != 0
    ) {
      sliceIndex = i;
      count++;
    }
  }
  if (count != 0) {
    appointments.value.splice(sliceIndex, 1);
    localStorage.setItem("appointments", JSON.stringify(appointments.value));
    console.log("Removed Appointment: ", count);
  }
  applications.value.splice(props.editIndex, 1);
  localStorage.setItem("applications", JSON.stringify(applications.value));
  slideDown.value = true;
};
const createMotivationNode = () => {
  motivationModalOpen.value = true;
  sideBack.value = true;
};
const closeAfterSave = () => {
  saveToLocalStorage();
  slideDown.value = true;
};
const saveToLocalStorage = () => {
  const applications = ref(
    JSON.parse(localStorage.getItem("applications")) || []
  );
  const appointments = ref(
    JSON.parse(localStorage.getItem("appointments")) || []
  );

  applications.value[props.editIndex][0].company = company.value;
  applications.value[props.editIndex][0].job = job.value;
  applications.value[props.editIndex][0].streetName = streetName.value;
  applications.value[props.editIndex][0].streetNumber = streetNumber.value;
  applications.value[props.editIndex][0].districtNumber = districtNumber.value;
  applications.value[props.editIndex][0].city = city.value;
  applications.value[props.editIndex][0].contactPerson = contactPerson.value;
  applications.value[props.editIndex][0].state = state.value;
  applications.value[props.editIndex][0].note = note.value;
  applications.value[props.editIndex][0].start = start.value;
  applications.value[props.editIndex][0].deadline = deadline.value;

  console.log(props.editIndex);
  const appointment = [
    {
      type: "Deadline",
      title: company.value,
      appointmentFrom: start.value,
      appointmentTo: deadline.value,
      note: note.value,
      deadlineId: applications.value[props.editIndex][0].id,
    },
  ];
  let dateCheck = false;
  if (company.value && deadline.value) {
    if (start.value == null) {
      dateCheck = true;
    } else if (deadline.value >= start.value) {
      dateCheck = true;
    }
    if (dateCheck) {
      if (appointments.value.length > 0) {
        for (let i = 0; i < appointments.value.length; i++) {
          if (
            applications.value[props.editIndex][0].id ==
              appointments.value[i][0].deadlineId &&
            appointments.value[i][0].deadlineId != 0
          ) {
            appointments.value[i][0].appointmentFrom = start.value;
            appointments.value[i][0].appointmentTo = deadline.value;
          }
        }
        localStorage.setItem(
          "appointments",
          JSON.stringify(appointments.value)
        );
        console.log("Updated Appointment");
      } else {
        localStorage.setItem("appointments", JSON.stringify([appointment]));
        console.log("Added Appointment");
      }

      localStorage.setItem("applications", JSON.stringify(applications.value));
    }
  }
};
const closeModal = () => {
  slideDown.value = true;
};
</script>
