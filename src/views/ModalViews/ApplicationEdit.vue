<template>
  <div v-if="!motivationModalOpen">
    <div class="flex">
      <button type="button" @click="closeModal" class="p-4">
        <BackIcon
          class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
        ></BackIcon>
      </button>
      <p class="text-black px-1 dark:text-white font-Montserrat text-xl p-4">
        {{ company }}
      </p>
    </div>
    <div class="space-y-1">
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
          <FormKit type="text" v-model="job" placeholder="Beruf oder Lehre" />
        </div>
      </div>

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
            :options="['Entwurf', 'Erledigt', 'Zurückgewiesen']"
            placeholder="Entwurf"
          />
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

      <div class="flex bg-white dark:bg-slate-800 h-10">
        <div class="py-2">
          <CloseIcon v-if="!cv" class="w-24 stroke-wd-error"></CloseIcon>
        </div>
        <div class="py-2">
          <CheckIcon v-if="cv" class="w-24 stroke-wd-green"></CheckIcon>
        </div>
        <p
          class="w-24 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm"
        >
          {{ cvText }}
        </p>
      </div>

      <div class="grid flex gap-2">
        <button
          class="bg-wd-error shadow rounded-md h-8 w-full text-white"
          @click="removeFromLocalStorage()"
          :disabled="buttonDisabled"
        >
          Bewerbung entfernen
        </button>
        <button
          class="bg-wd-green hover:bg-transparent-green shadow h-14 text-white"
          @click="createMotivationNode()"
          :disabled="buttonDisabled"
        >
          Motivationsschreiben erstellen
        </button>
        <button
          class="bg-wd-green hover:bg-transparent-green shadow h-14 text-white"
          @click="sendJobApplication()"
          :disabled="buttonDisabled"
        >
          Bewerbung abschicken
        </button>
      </div>
    </div>
  </div>

  <CVEditModal :show="motivationModalOpen">
    <div class="flex">
      <div
        class="rounded-lg w-screen h-screen overflow-hidden shadow-xl dark:bg-slate-700 bg-white"
      >
        <component
          v-bind="editIndex"
          :is="MotivationEdit"
          :currentIndex="editIndex"
        />
      </div>
    </div>
  </CVEditModal>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults, watch } from "vue";
import BackIcon from "@/assets/icons/BackIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import { slideDown, sideBack } from "@/store.js";
import MotivationEdit from "./MotivationEdit.vue";
const company = ref(null);
const job = ref(null);
const deadline = ref(null);
const contactPerson = ref(null);
const state = ref(null);
const note = ref(null);
const motivationModalOpen = ref(false);

let cv = null;
let cvText = null;

let buttonDisabled = false;
const applications = ref(JSON.parse(localStorage.getItem("applications")));

const props = withDefaults(
  defineProps<{
    editIndex: number;
  }>(),
  { editIndex: 0 }
);

watch(sideBack, () => {
  if (sideBack.value) {
    motivationModalOpen.value = true;
  } else {
    motivationModalOpen.value = false;
  }
});

onMounted(() => {
  buttonDisabled = false;
  company.value = applications.value[props.editIndex][0].company;
  job.value = applications.value[props.editIndex][0].job;
  deadline.value = applications.value[props.editIndex][0].deadline;
  contactPerson.value = applications.value[props.editIndex][0].contactPerson;
  state.value = applications.value[props.editIndex][0].state;
  note.value = applications.value[props.editIndex][0].note;
  cv = applications.value[props.editIndex][0].cv;
  if (cv == false) {
    cvText = "Motivationsschreiben fehlt";
  } else {
    cvText = "Motivationsschreiben angehaengt";
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
    applications.value.splice(props.editIndex, 1);
    localStorage.setItem("applications", JSON.stringify(applications.value));
    slideDown.value = true;
  }
};
const createMotivationNode = () => {
  motivationModalOpen.value = true;
  sideBack.value = true;
};
const closeModal = () => {
  buttonDisabled = true;
  slideDown.value = true;
};
</script>
