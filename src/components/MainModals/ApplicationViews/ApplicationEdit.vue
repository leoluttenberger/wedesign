<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen">
    <div v-if="!motivationModalOpen">
      <div class="grid grid-cols-3 gap-20 p-2 place-items-center">
        <button type="button" @click="openQueryModal()" class="p-4">
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
      <div class="space-y-1 px-2 py-4 bg-wd-background dark:bg-slate-700">
        <div class="grid grid-cols-2 gap-1">
          <div class="col-span-2 md:col-span-1">
            <div class="px-2">
              <FormKit
                type="text"
                label="Firma:"
                v-model="company"
                placeholder="Unternehmensname"
              />
            </div>
          </div>

          <div class="col-span-2 md:col-span-1">
            <div class="px-2">
              <FormKit
                type="text"
                label="Berufsbezeichnung:"
                v-model="job"
                placeholder="Bäcker, Verkäufer"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-1">
          <div class="col-span-2 md:col-span-1">
            <div class="px-2">
              <FormKit
                v-model="streetName"
                label="Straße:"
                type="text"
                placeholder="Musterstraße"
              />
            </div>
          </div>
          <div class="col-span-2 md:col-span-1">
            <div class="px-2">
              <FormKit
                v-model="streetNumber"
                label="Nr:"
                type="text"
                placeholder="1/1"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-1">
          <div class="col-span-2 md:col-span-1">
            <div class="px-2">
              <FormKit
                v-model="districtNumber"
                label="PLZ:"
                type="text"
                placeholder="1010"
              />
            </div>
          </div>
          <div class="col-span-2 md:col-span-1">
            <div class="px-2">
              <FormKit
                v-model="city"
                label="Ort:"
                type="text"
                placeholder="Musterstadt"
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
                label="Ende: *"
                v-model="end"
                :validation="start ? [['required'], ['date_after', start]] : []"
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
                type="select"
                v-model="state"
                label=" Status:"
                :options="[
                  'In Bearbeitung',
                  'Abgeschickt',
                  'Keine Rückmeldung',
                  'Leider nein',
                ]"
                input-class="$reset h-10 bg-white dark:bg-slate-800 text-base dark:text-white"
              />
            </div>
          </div>
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
        <div class="grid grid-cols-2 gap-1">
          <div class="col-span-2 md:col-span-1">
            <div class="py-2 px-2">
              <FormKit
                type="textarea"
                label="Notiz:"
                v-model="note"
                placeholder="Wichtige Informationen"
              />
            </div>
          </div>
          <div class="col-span-2 md:col-span-1">
            <div class="flex px-2">
              <FormKit
                type="text"
                label="Motivationsschreiben:"
                v-if="__mv == 0"
                value="fehlt"
                disabled="true"
              />
              <FormKit
                type="text"
                label="Motivationsschreiben:"
                v-if="__mv != 0"
                value="angehängt"
                disabled="true"
              />
              <div class="pt-7">
                <CloseIcon
                  v-if="__mv == 0"
                  class="h-6 w-24 stroke-1 stroke-wd-error"
                ></CloseIcon>
              </div>
              <div class="pt-7">
                <CheckIcon
                  v-if="__mv > 0"
                  class="h-6 w-24 stroke-1 stroke-wd-green"
                ></CheckIcon>
              </div>
            </div>
          </div>
        </div>

        <div class="grid flex gap-2 p-2">
          <button
            class="bg-wd-error shadow rounded-md h-10 w-full text-white font-bold"
            @click="openDeteleModal()"
          >
            Bewerbung entfernen
          </button>
          <button
            class="bg-wd-green shadow rounded-md h-16 w-full text-white font-bold"
            @click="createMotivationNode()"
          >
            Motivationsschreiben bearbeiten
          </button>
          <button
            class="bg-wd-green shadow rounded-md h-16 w-full text-white font-bold"
            @click="previewApplication()"
          >
            Vorschau & Teilen
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
  <CropModal :show="showModal">
    <div class="place-items-center">
      <div class="text-white text-xl p-2">Schließen?</div>
      <div class="text-white font-Montserrat text-base font-bold pb-2">
        <p>
          Bist du wirklich sicher, dass du das Fenster schließen willst ohne zu
          speichern?
        </p>
      </div>
    </div>

    <div
      class="flex justify-evenly text-white font-Montserrat text-base font-bold h-10"
    >
      <button
        type="button"
        @click="returnToEdit()"
        class="bg-wd-error w-screen"
      >
        Nein
      </button>

      <button type="button" @click="closeModal()" class="bg-wd-green w-screen">
        Ja
      </button>
    </div>
  </CropModal>
  <CropModal :show="showDeleteModal">
    <div class="place-items-center">
      <div class="text-white text-xl p-2">Entfernen?</div>
      <div class="text-white font-Montserrat text-base font-bold pb-2">
        <p>Bist du wirklich sicher, dass du die Bewerbung entfernen willst?</p>
      </div>
    </div>

    <div
      class="flex justify-evenly text-white font-Montserrat text-base font-bold h-10"
    >
      <button
        type="button"
        @click="returnToEdit()"
        class="bg-wd-error w-screen"
      >
        Nein
      </button>

      <button
        type="button"
        @click="deleteAndReturn()"
        class="bg-wd-green w-screen"
      >
        Ja
      </button>
    </div>
  </CropModal>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from "vue";
import BackIcon from "@/assets/icons/BackIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

import { slideDown, sideBack } from "@/store/store.js";
import MotivationEdit from "@/components/MainModals/MotivationViews/MotivationEdit.vue";
import MVEditModal from "@/components/MenuModals/MVEditModal.vue";
import ApplicationPreview from "@/components/MainModals/ApplicationViews/ApplicationPreview.vue";

const MAX_ARCHIVE_LENGHT = 20;
const company = ref(null);
const job = ref(null);
const end = ref(null);
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

const showModal = ref(false);
const showDeleteModal = ref(false);
const __mv = ref(null);
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
    __mv.value = applications.value[props.editIndex][0].mv;
    checkMVTextAndMVIndex();
  }
});

onMounted(() => {
  showModal.value = false;
  showDeleteModal.value = false;
  editIndex.value = props.editIndex;
  const applications = ref(
    JSON.parse(localStorage.getItem("applications")) || []
  );

  company.value = applications.value[props.editIndex][0].company;
  job.value = applications.value[props.editIndex][0].job;
  streetName.value = applications.value[props.editIndex][0].streetName;
  streetNumber.value = applications.value[props.editIndex][0].streetNumber;
  districtNumber.value = applications.value[props.editIndex][0].districtNumber;
  city.value = applications.value[props.editIndex][0].city;
  end.value = applications.value[props.editIndex][0].end;
  contactPerson.value = applications.value[props.editIndex][0].contactPerson;
  state.value = applications.value[props.editIndex][0].state;
  note.value = applications.value[props.editIndex][0].note;
  start.value = applications.value[props.editIndex][0].start;
  __mv.value = applications.value[props.editIndex][0].mv;
  checkMVTextAndMVIndex();
  sideBack.value = false;
  slideDown.value = false;
});

const checkMVTextAndMVIndex = () => {
  const motivations = ref(
    JSON.parse(localStorage.getItem("motivations")) || []
  );
  if (__mv.value != null) {
    console.log("mv", __mv.value);
    for (let i = 0; i < motivations.value.length; i++) {
      if (motivations.value[i][0].indexMV == __mv.value) {
        mvIndex.value = i;
      }
    }
  }
};
const previewApplication = () => {
  saveToLocalStorage();
  checkMVTextAndMVIndex();
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
  /*if (localStorage.getItem("archives")) {
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
  }*/

  for (let i = 0; i < appointments.value.length; i++) {
    if (
      props.editIndex + 1 == appointments.value[i][0].endId &&
      appointments.value[i][0].endId != 0
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
  applications.value[props.editIndex][0].end = end.value;

  console.log(props.editIndex);
  const appointment = [
    {
      type: "Ende",
      title: company.value,
      appointmentFrom: start.value,
      appointmentTo: end.value,
      note: note.value,
      endId: applications.value[props.editIndex][0].id,
    },
  ];
  let dateCheck = false;
  if (company.value && end.value) {
    if (start.value == null) {
      dateCheck = true;
    } else if (end.value >= start.value) {
      dateCheck = true;
    }
    if (dateCheck) {
      if (appointments.value.length > 0) {
        for (let i = 0; i < appointments.value.length; i++) {
          if (
            applications.value[props.editIndex][0].id ==
              appointments.value[i][0].endId &&
            appointments.value[i][0].endId != 0
          ) {
            appointments.value[i][0].appointmentFrom = start.value;
            appointments.value[i][0].appointmentTo = end.value;
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
  showModal.value = false;
};
const returnToEdit = () => {
  showModal.value = false;
  showDeleteModal.value = false;
};

const deleteAndReturn = () => {
  showDeleteModal.value = false;
  removeFromLocalStorage();
};

const openQueryModal = () => {
  showModal.value = true;
};
const openDeteleModal = () => {
  showDeleteModal.value = true;
};
</script>
