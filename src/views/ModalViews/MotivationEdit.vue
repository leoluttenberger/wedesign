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
    <BottomCard v-model:open="showBottomSlide">
      <SwiperCard :items="items">
        <div class="flex flex-col items-left shadow-lg-up">
          <component
            :is="mapEditModals[buttonIndex]"
            :editIndex="currentIndex"
          />
        </div>
      </SwiperCard>
    </BottomCard>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults, watch } from "vue";
import BackIcon from "@/assets/icons/BackIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import EditIcon from "@/assets/icons/EditIcon.vue";

import BottomCard from "@/components/BottomCard.vue";

import EndingEditModal from "@/components/Modals/EndingEditModal.vue";
import TextfieldEditModal from "@/components/Modals/TextfieldEditModal.vue";
import { sideBack, sideBackBack } from "@/store.js";
const props = withDefaults(
  defineProps<{
    currentIndex: number;
  }>(),
  { currentIndex: 0 }
);

interface SlideItem {
  id: string;
  index: number;
  text: string;
}
let idCounter = 0;
const getID = () => (idCounter++).toString();
let posIndexCounter = 0;
let negIndexCounter = 0;
const getPosIndex = () => posIndexCounter++;
const getNegIndex = () => negIndexCounter--;
const items = ref<SlideItem[]>([
  { id: getID(), index: getPosIndex(), text: "First" },
  { id: getID(), index: getPosIndex(), text: "Seconds" },
]);

const subject = ref(null);
const salutaionBegining = ref(null);
const textfield = ref(null);
const ending = ref(null);
const salutationEnding = ref(null);
const showBottomSlide = ref(false);
let buttonIndex = 0;
let buttonDisabled = false;

const mapEditModals = [EndingEditModal, TextfieldEditModal];

watch(sideBackBack, () => {
  if (sideBackBack.value == false) {
    showBottomSlide.value = false;
    buttonIndex = 0;
  }
});

onMounted(() => {
  buttonDisabled = false;
  sideBackBack.value = false;
  sideBack.value = true;
  showBottomSlide.value = false;
  buttonIndex = 0;
});

const closeModal = () => {
  buttonDisabled = true;
  sideBack.value = false;
};
const textfieldEdit = () => {
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 0;
};
const endingEdit = () => {
  sideBackBack.value = true;
  showBottomSlide.value = true;
  buttonIndex = 1;
};
</script>
