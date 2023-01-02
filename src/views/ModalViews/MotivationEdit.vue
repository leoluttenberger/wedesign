<template>
  <div class="flex">
    <button type="button" @click="closeModal" class="p-4">
      <BackIcon
        class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
      ></BackIcon>
    </button>
    <p class="text-black px-1 dark:text-white font-Montserrat text-xl p-4">
      Motivationsschreiben
    </p>
    <button type="button" @click="closeModal" class="p-4">
      <CheckIcon
        class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
      ></CheckIcon>
    </button>
  </div>
  <div class="space-y-1">
    <p class="text-black px-1 dark:text-white font-Montserrat text-sm">
      Einstieg
    </p>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
          <p
            class="py-3 px-1 w-32 h-16 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Betreff:
          </p>
          <div class="py-2">
            <FormKit
              v-model="subject"
              type="textarea"
              placeholder="Bewerbung Beruf"
            />
          </div>
        </div>
      </div>

      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
          <p
            class="py-3 px-1 w-32 h-16 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Anrede:
          </p>
          <div class="py-2">
            <FormKit
              v-model="salutaionBegining"
              type="textarea"
              placeholder="Sehr geehrte Frau/Herr"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="space-y-1">
    <p class="text-black px-1 dark:text-white font-Montserrat text-sm">
      Motivationsschreiben
    </p>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
          <p
            class="py-3 px-1 w-32 h-16 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Text:
          </p>
          <div class="py-2">
            <FormKit
              v-model="textfield"
              type="textarea"
              placeholder="Mit großen Interesse habe ich Ihre Anzeige im..."
            />
          </div>

          <button type="button" @click="textfieldEdit" class="p-4">
            <EditIcon
              class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
            ></EditIcon>
          </button>
        </div>
      </div>

      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
          <p
            class="py-3 px-1 w-32 h-16 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Abschluss:
          </p>
          <div class="py-2">
            <FormKit
              v-model="ending"
              type="textarea"
              placeholder="Ich freue mich Ihnen bei einem persönlichen..."
            />
          </div>
          <button type="button" @click="endingEdit" class="p-4">
            <EditIcon
              class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
            ></EditIcon>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="space-y-1">
    <p class="text-black px-1 dark:text-white font-Montserrat text-sm">
      Abschluss-Grußformel
    </p>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
          <p
            class="py-3 px-1 w-32 h-16 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Grußformel:
          </p>
          <div class="py-2">
            <FormKit
              v-model="salutationEnding"
              type="textarea"
              placeholder="Mit freundlichen Grüßen ..."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <CVEditModal :show="textfieldEditOpen">
      <div class="flex">
        <div
          class="rounded-lg w-screen h-screen overflow-hidden shadow-xl dark:bg-slate-700 bg-white"
        >
          <component
            v-bind="currentIndex"
            :is="TextfieldEditModal"
            :editIndex="currentIndex"
          />
        </div>
      </div>
    </CVEditModal>
  </div>

  <div>
    <CVEditModal :show="endingEditOpen">
      <div class="flex">
        <div
          class="rounded-lg w-screen h-screen overflow-hidden shadow-xl dark:bg-slate-700 bg-white"
        >
          <component
            v-bind="currentIndex"
            :is="EndingEditModal"
            :editIndex="currentIndex"
          />
        </div>
      </div>
    </CVEditModal>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults, watch } from "vue";
import BackIcon from "@/assets/icons/BackIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import EditIcon from "@/assets/icons/EditIcon.vue";

import EndingEditModal from "@/components/Modals/EndingEditModal.vue";
import TextfieldEditModal from "@/components/Modals/TextfieldEditModal.vue";
import { sideBack, sideBackBack } from "@/store.js";
const props = withDefaults(
  defineProps<{
    currentIndex: number;
  }>(),
  { currentIndex: 0 }
);

watch(sideBackBack, () => {
  if (sideBackBack.value == false) {
    textfieldEditOpen.value = false;
    endingEditOpen.value = false;
  }
});

let buttonDisabled = false;

const subject = ref(null);
const salutaionBegining = ref(null);
const textfield = ref(null);
const ending = ref(null);
const salutationEnding = ref(null);
const textfieldEditOpen = ref(false);
const endingEditOpen = ref(false);

onMounted(() => {
  buttonDisabled = false;
  sideBackBack.value = false;
  sideBack.value = true;
  textfieldEditOpen.value = false;
  endingEditOpen.value = false;
});

const closeModal = () => {
  buttonDisabled = true;
  sideBack.value = false;
};
const textfieldEdit = () => {
  sideBackBack.value = true;
  textfieldEditOpen.value = true;
};
const endingEdit = () => {
  sideBackBack.value = true;
  endingEditOpen.value = true;
};
</script>
