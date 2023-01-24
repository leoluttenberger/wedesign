<template>
  <section class="z-0 overflow-auto overflow-scroll w-screen h-screen py-20">
    <div class="flex justify-end px-4">
      <button
        @click="openBottomCard()"
        class="bg-wd-green hover:bg-transparent-green shadow p-2 md:p-4 rounded-full"
      >
        <AddIcon
          class="h-10 w-10 dark:stroke-wd-white stroke-black stroke-1"
        ></AddIcon>
      </button>
    </div>
    <component :is="mapListComponents[slideIndex]" :key="renderComponent" />
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
              <button @click="closeBottomCard()" class="p-2">
                <BackIcon
                  class="py-8 h-24 w-24 dark:stroke-wd-white stroke-black stroke-1"
                ></BackIcon>
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
import { ref, defineProps, withDefaults, watch, onMounted } from "vue";
import SwiperCard from "@/components/SwiperCard.vue";
import BottomCard from "@/components/BottomCard.vue";
import AddIcon from "@/assets/icons/AddIcon.vue";
import BackIcon from "@/assets/icons/BackIcon.vue";

import ExperienceForm from "@/views/ModalViews/ExperienceForm.vue";
import EducationForm from "@/views/ModalViews/EducationForm.vue";

import ExperienceList from "@/views/ModalViews/ExperienceList.vue";
import EducationList from "@/views/ModalViews/EducationList.vue";

import ApplicationForm from "@/views/ModalViews/ApplicationForm.vue";
import ApplicationList from "@/views/ModalViews/ApplicationList.vue";

import KnowledgeForm from "@/views/ModalViews/KnowledgeForm.vue";
import KnowledgeList from "@/views/ModalViews/KnowledgeList.vue";

import UserForm from "@/views/ModalViews/UserForm.vue";
import UserDisplay from "@/views/ModalViews/UserDisplay.vue";

import { slideDown, sideBack, sideBackBack, isDarkMode } from "@/store.js";
import { useEditor } from "@tiptap/vue-3";

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
];
const mapListComponents = [
  EducationList,
  ExperienceList,
  KnowledgeList,
  ApplicationList,
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

const darkLightMode = ref(JSON.parse(localStorage.getItem("theme")));
if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  darkLightMode.value = "dark";
} else {
  darkLightMode.value = "light";
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
