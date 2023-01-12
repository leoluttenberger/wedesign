<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen py-20 z-10">
    <section class="z-0">
      <component :is="mapListComponents[slideIndex]" v-if="renderComponent" />
      <div class="flex justify-end py-20 px-4">
        <button
          @click="openBottomCard()"
          class="bg-wd-green hover:bg-transparent-green shadow p-2 md:p-4 rounded-full"
        >
          <AddIcon></AddIcon>
        </button>
      </div>
    </section>
  </div>
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
          class="fixed z-10 inset-0 dark:bg-transparent-black bg-wd-white bg-opacity-50"
        >
          <BottomCard v-model:open="bottomCardOpen">
            <SwiperCard :items="items">
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
import { ref, defineProps, withDefaults, watch, onMounted } from "vue";
import SwiperCard from "@/components/SwiperCard.vue";
import BottomCard from "@/components/BottomCard.vue";
import AddIcon from "@/assets/icons/AddIcon.vue";

import ExperienceForm from "./ModalViews/ExperienceForm.vue";
import EducationForm from "./ModalViews/EducationForm.vue";

import ExperienceList from "./ModalViews/ExperienceList.vue";
import EducationList from "./ModalViews/EducationList.vue";

import ApplicationForm from "./ModalViews/ApplicationForm.vue";
import ApplicationList from "./ModalViews/ApplicationList.vue";

import KnowledgeForm from "./ModalViews/KnowledgeForm.vue";
import KnowledgeList from "./ModalViews/KnowledgeList.vue";

import UserFormInput from "@/components/UserFormInput.vue";

import { slideDown, sideBack, sideBackBack, isDarkMode } from "@/store.js";

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
});

const mapFormComponents = [
  EducationForm,
  ExperienceForm,
  KnowledgeForm,
  ApplicationForm,
];
const mapListComponents = [
  EducationList,
  ExperienceList,
  KnowledgeList,
  ApplicationList,
];

onMounted(() => {
  sideBackBack.value = false;
  sideBack.value = false;
  slideDown.value = true;
});

const bottomCardOpen = ref(false);
const renderComponent = ref(true);

const darkLightMode = ref(JSON.parse(localStorage.getItem("theme")));
if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  darkLightMode.value = "dark";
} else {
  darkLightMode.value = "light";
}

watch(isDarkMode, () => {
  if (isDarkMode == true) {
    darkLightMode.value = "dark";
  } else {
    darkLightMode.value = "light";
  }
});

watch(bottomCardOpen, () => {
  if (bottomCardOpen.value == false) {
    renderComponent.value = true;
  } else {
    renderComponent.value = false;
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
</script>
