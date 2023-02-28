<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen">
    <div v-if="!motivationModalOpen">
      <div class="grid grid-cols-3 gap-20 p-2 place-items-center">
        <button type="button" @click="closeModal()" class="p-4">
          <CloseIcon
            class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
          ></CloseIcon>
        </button>
        <p
          class="text-black px-1 dark:text-white font-Montserrat text-xl p-4 font-bold"
        >
          {{ company + " speichern!" }}
        </p>
        <button type="button" @click="saveToLocalStorage()" class="p-4">
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
              <div
                class="px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
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
            <div class="flex bg-white dark:bg-slate-800 h-10">
              <p
                class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
              >
                Deadline:
              </p>
              <div class="px-2">
                <FormKit
                  type="date"
                  v-model="deadline"
                  placeholder="Auswählen"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-1">
          <div class="col-span-2 md:col-span-1">
            <div class="flex bg-white dark:bg-slate-800 h-14">
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
            <div class="flex bg-white dark:bg-slate-800 h-14 py-1">
              <div class="py-2">
                <CloseIcon
                  v-if="__mv == 0"
                  class="h-6 w-24 stroke-1 stroke-wd-error"
                ></CloseIcon>
              </div>
              <div class="py-2">
                <CheckIcon
                  v-if="__mv > 0"
                  class="h-6 w-24 stroke-1 stroke-wd-green"
                ></CheckIcon>
              </div>
              <p
                class="w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
              >
                {{ __mvText }}
              </p>
            </div>
          </div>
        </div>

        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-24">
            <p
              class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm font-bold"
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

        <div class="grid flex gap-2 py-2">
          <button
            class="bg-wd-error shadow rounded-md h-10 w-full text-white font-bold"
            @click="removeFromLocalStorage()"
            :disabled="buttonDisabled"
          >
            Bewerbung entfernen
          </button>
          <button
            class="bg-wd-green hover:bg-transparent-green shadow h-16 text-white font-bold"
            @click="createMotivationNode()"
            :disabled="buttonDisabled"
          >
            Motivationsschreiben bearbeiten
          </button>
          <button
            class="bg-wd-green hover:bg-transparent-green shadow h-16 text-white font-bold"
            @click="sendJobApplication()"
            :disabled="buttonDisabled"
          >
            Bewerbungs Ansicht
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
            :currentApplMVid="__mv"
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
            :currentApplMVid="__mv"
          />
        </div>
      </div>
    </MVEditModal>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from "vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import { slideDown, sideBack } from "@/store.js";
import MotivationEdit from "./MotivationEdit.vue";
import MVEditModal from "@/components/Modals/MVEditModal.vue";
import ApplicationPreview from "./AppilcationPreview.vue";

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

let __mv = null;
let __mvText = null;

let buttonDisabled = false;
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
    const applications = ref(JSON.parse(localStorage.getItem("applications")));
    __mv = applications.value[props.editIndex][0].mv;
  }
});

onMounted(() => {
  console.log(props.editIndex);
  editIndex.value = props.editIndex;
  buttonDisabled = false;
  const applications = ref(JSON.parse(localStorage.getItem("applications")));
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
  __mv = applications.value[props.editIndex][0].mv;
  if (__mv == null) {
    __mvText = "Motivationsschreiben fehlt";
  } else {
    __mvText = "Motivationsschreiben angehaengt";
  }
  sideBack.value = false;
  slideDown.value = false;
});

const sendJobApplication = () => {
  applicationPreviewOpen.value = true;
  sideBack.value = true;
};
const removeFromLocalStorage = () => {
  if (buttonDisabled == false) {
    buttonDisabled = true;
    const applications = ref(JSON.parse(localStorage.getItem("applications")));
    applications.value.splice(props.editIndex, 1);
    localStorage.setItem("applications", JSON.stringify(applications.value));
    slideDown.value = true;
  }
};
const createMotivationNode = () => {
  motivationModalOpen.value = true;
  sideBack.value = true;
};
const saveToLocalStorage = () => {
  buttonDisabled = true;
  slideDown.value = true;
  const applications = ref(JSON.parse(localStorage.getItem("applications")));
  applications.value[props.editIndex][0].company = company.value;
  applications.value[props.editIndex][0].job = job.value;
  applications.value[props.editIndex][0].streetName = streetName.value;
  applications.value[props.editIndex][0].streetNumber = streetNumber.value;
  applications.value[props.editIndex][0].districtNumber = districtNumber.value;
  applications.value[props.editIndex][0].city = city.value;
  applications.value[props.editIndex][0].deadline = deadline.value;
  applications.value[props.editIndex][0].contactPerson = contactPerson.value;
  applications.value[props.editIndex][0].state = state.value;
  applications.value[props.editIndex][0].note = note.value;
  localStorage.setItem("applications", JSON.stringify(applications.value));
};
const closeModal = () => {
  buttonDisabled = true;
  slideDown.value = true;
};
</script>
