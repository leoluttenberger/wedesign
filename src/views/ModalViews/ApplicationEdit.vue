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
                class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
              >
                Firma:
              </p>
              <FormKit
                type="text"
                v-model="company"
                placeholder="Unternehmensname"
              />
            </div>
          </div>

          <div class="col-span-2 md:col-span-1">
            <div class="flex bg-white dark:bg-slate-800 h-10">
              <p
                class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
              >
                Beruf:
              </p>
              <FormKit
                type="text"
                v-model="job"
                placeholder="Beruf oder Lehre"
              />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-1">
          <div class="col-span-2 md:col-span-1">
            <div class="flex bg-white dark:bg-slate-800 h-10">
              <div
                class="px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
              >
                <p>Ansprechs</p>
                <p>person:</p>
              </div>

              <FormKit
                type="text"
                v-model="contactPerson"
                placeholder="Marlene Musterfrau"
              />
            </div>
          </div>

          <div class="col-span-2 md:col-span-1">
            <div class="flex bg-white dark:bg-slate-800 h-10">
              <p
                class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
              >
                Deadline:
              </p>
              <FormKit type="date" v-model="deadline" placeholder="Auswählen" />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-1">
          <div class="col-span-2 md:col-span-1">
            <div class="flex bg-white dark:bg-slate-800 h-10">
              <p
                class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
              >
                Status:
              </p>
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
                class="w-24 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm"
              >
                {{ __mvText }}
              </p>
            </div>
          </div>
        </div>

        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-24">
            <p
              class="py-3 px-1 w-24 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
            >
              Notiz:
            </p>
            <div class="py-2">
              <FormKit
                type="textarea"
                v-model="note"
                placeholder="Wichtige Informationen"
              />
            </div>
          </div>
        </div>

        <div class="grid flex gap-6 py-10">
          <button
            class="bg-wd-error shadow rounded-md h-10 w-full text-white"
            @click="removeFromLocalStorage()"
            :disabled="buttonDisabled"
          >
            Bewerbung entfernen
          </button>
          <button
            class="bg-wd-green hover:bg-transparent-green shadow h-16 text-white"
            @click="createMotivationNode()"
            :disabled="buttonDisabled"
          >
            Motivationsschreiben bearbeiten
          </button>
          <button
            class="bg-wd-green hover:bg-transparent-green shadow h-16 text-white"
            @click="sendJobApplication()"
            :disabled="buttonDisabled"
          >
            Bewerbung abschicken
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
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from "vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import { slideDown, sideBack } from "@/store.js";
import MotivationEdit from "./MotivationEdit.vue";
import MVEditModal from "@/components/Modals/MVEditModal.vue";
const company = ref(null);
const job = ref(null);
const deadline = ref(null);
const contactPerson = ref(null);
const state = ref(null);
const note = ref(null);
const motivationModalOpen = ref(false);

let __mv = null;
let __mvText = null;

let buttonDisabled = false;

const props = defineProps({
  editIndex: {
    type: Number,
    default: 0,
  },
});

watch(sideBack, () => {
  if (sideBack.value) {
    motivationModalOpen.value = true;
  } else {
    motivationModalOpen.value = false;
    const applications = ref(JSON.parse(localStorage.getItem("applications")));
    __mv = applications.value[props.editIndex][0].mv;
  }
});

onMounted(() => {
  buttonDisabled = false;
  const applications = ref(JSON.parse(localStorage.getItem("applications")));
  company.value = applications.value[props.editIndex][0].company;
  job.value = applications.value[props.editIndex][0].job;
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
  if (buttonDisabled == false) {
    buttonDisabled = true;
    slideDown.value = true;
  }
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
