<template>
  <section
    v-if="props.slideIndex != 4"
    class="z-0 overflow-auto overflow-scroll w-screen h-screen py-20 pb-32"
  >
    <component :is="mapListComponents[slideIndex]" :key="renderComponent" />
    <div
      class="group fixed bottom-24 right-0 p-6 flex items-end justify-end w-24 h-24"
    >
      <div class="">
        <button
          @click="openBottomCard()"
          class="bg-wd-green hover:bg-transparent-green shadow p-2 md:p-4 rounded-full"
        >
          <AddIcon
            class="h-10 w-10 dark:stroke-wd-white stroke-black stroke-1"
          ></AddIcon>
        </button>
      </div>
    </div>
  </section>
  <section
    v-if="props.slideIndex == 4"
    class="z-0 overflow-auto overflow-scroll w-screen h-screen py-96 pb-32 bg-wd-background dark:bg-slate-700"
  >
    <div class="py-10">
      <component :is="mapListComponents[4]" :key="renderComponent" />
    </div>
    <div
      class="group fixed bottom-24 right-0 p-6 flex items-end justify-end w-24 h-24"
    >
      <div class="">
        <button
          @click="openBottomCard()"
          class="bg-wd-green hover:bg-transparent-green shadow p-2 md:p-4 rounded-full"
        >
          <AddIcon
            class="h-10 w-10 dark:stroke-wd-white stroke-black stroke-1"
          ></AddIcon>
        </button>
      </div>
    </div>
  </section>
  <teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <section :class="darkLightMode">
        <div
          v-if="bottomCardOpen"
          class="fixed z-10 inset-0 bg-black bg-opacity-10"
        >
          <BottomCard v-model:open="bottomCardOpen">
            <SwiperCard :items="items">
              <button @click="closeBottomCard()">
                <div class="flex">
                  <h1
                    class="px-3 p-2 text-black dark:text-white font-Montserrat text-2xl md:text-xxl font-bold"
                  >
                    {{ mapFormComponentsNames[props.slideIndex] }}
                  </h1>
                  <div class="grow ..."></div>
                  <div class="px-2 py-2">
                    <CloseIcon
                      class="h-10 w-10 dark:stroke-wd-white stroke-black stroke-1"
                    ></CloseIcon>
                  </div>
                </div>
              </button>

              <div class="flex flex-col items-left shadow-lg-up">
                <component :is="mapFormComponents[props.slideIndex]" />
              </div>
            </SwiperCard>
          </BottomCard>
        </div>
      </section>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, onMounted } from "vue";
import AddIcon from "@/assets/icons/AddIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

import SwiperCard from "@/components/MenuModals/SwiperCard.vue";
import BottomCard from "@/components/MenuModals/BottomCard.vue";

import ExperienceForm from "@/components/MainModals/ExperienceViews/ExperienceForm.vue";
import EducationForm from "@/components/MainModals/EducationViews/EducationForm.vue";

import ExperienceList from "@/components/MainModals/ExperienceViews/ExperienceList.vue";
import EducationList from "@/components/MainModals/EducationViews/EducationList.vue";

import ApplicationForm from "@/components/MainModals/ApplicationViews/ApplicationForm.vue";
import ApplicationList from "@/components/MainModals/ApplicationViews/ApplicationList.vue";

import KnowledgeForm from "@/components/MainModals/KnowledgeViews/KnowledgeForm.vue";
import KnowledgeList from "@/components/MainModals/KnowledgeViews/KnowledgeList.vue";

import CalendarForm from "@/components/MainModals/CalendarViews/CalendarForm.vue";
import CalendarList from "@/components/MainModals/CalendarViews/CalendarList.vue";

import {
  slideDown,
  sideBack,
  sideBackBack,
  isDarkMode,
} from "@/store/store.js";

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
]);

const props = defineProps({
  slideIndex: {
    type: Number,
    default: 0,
  },
  useEditButton: {
    type: Boolean,
    default: false,
  },
});

const mapFormComponents = [
  EducationForm,
  ExperienceForm,
  KnowledgeForm,
  ApplicationForm,
  CalendarForm,
];
const mapListComponents = [
  EducationList,
  ExperienceList,
  KnowledgeList,
  ApplicationList,
  CalendarList,
];
const mapFormComponentsNames = [
  "Ausbildungen",
  "Erfahrung",
  "Kenntnisse",
  "Bewerbung",
  "Erinnerungen",
];

onMounted(() => {
  isEdit.value = props.useEditButton;
  sideBackBack.value = false;
  sideBack.value = false;
  slideDown.value = true;
  renderComponent.value = true;
});

const bottomCardOpen = ref(false);
const renderComponent = ref(true);
const isEdit = ref(false);

const darkLightMode = ref(JSON.parse(localStorage.getItem("theme")) || []);
if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  darkLightMode.value = "dark";
} else if (JSON.parse(localStorage.getItem("theme")) == "light") {
  darkLightMode.value = "light";
} else {
  darkLightMode.value = "dark";
  isDarkMode.value = "dark";
}

watch(bottomCardOpen, () => {
  if (bottomCardOpen.value == false) {
    renderComponent.value = true;
  } else {
    renderComponent.value = false;
  }
});

watch(isDarkMode, () => {
  if (isDarkMode.value == true) {
    darkLightMode.value = "dark";
  } else {
    darkLightMode.value = "light";
  }
});

watch(slideDown, () => {
  if (slideDown.value == true) {
    bottomCardOpen.value = false;
  }
});

const addBefore = () => {
  items.value = [
    {
      id: getID(),
      index: getNegIndex(),
      text: "Before",
    },
    ...items.value,
  ];
};

const addAfter = () => {
  items.value = [
    ...items.value,
    {
      id: getID(),
      index: getPosIndex(),
      text: "After",
    },
  ];
};

const openBottomCard = () => {
  bottomCardOpen.value = true;
  slideDown.value = false;
};
const closeBottomCard = () => {
  bottomCardOpen.value = false;
  slideDown.value = true;
};
</script>
