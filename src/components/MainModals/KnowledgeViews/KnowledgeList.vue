<template>
  <div>
    <section class="z-0">
      <div class="grid gap-2" v-if="renderComponent4">
        <Container @drop="onDrop">
          <Draggable
            v-for="(item, index) in knowledges"
            :key="index"
            class="p-2"
          >
            <div class="flex">
              <button @click="openBottomCard(index)" class="w-full px-2">
                <div
                  class="p-2 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border border-wd-green"
                >
                  <div
                    v-if="item[0].type === 'Sprachkenntnisse'"
                    class="font-bold text-xl"
                  >
                    {{ item[0].languageKnowledge }}
                  </div>
                  <div v-if="item[0].type === 'Sprachkenntnisse'">
                    {{ item[0].languageLevel }}
                  </div>
                  <div
                    v-if="item[0].type === 'Sonstige Kenntnisse'"
                    class="font-bold text-xl"
                  >
                    {{ item[0].diversKnowledge }}
                  </div>
                </div>
              </button>
              <div class="flex-none p-4">
                <SortIcon class="h-full"></SortIcon>
              </div>
            </div>
          </Draggable>
        </Container>
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
          v-if="bottomCardOpen4"
          class="fixed z-10 inset-0 dark:bg-transparent-black bg-wd-white bg-opacity-50"
        >
          <BottomCard v-model:open="bottomCardOpen4">
            <SwiperCard :items="items">
              <button @click="closeBottomCard()" class="p-2">
                <div class="flex">
                  <CloseIcon
                    class="py-8 h-24 w-24 dark:stroke-wd-white stroke-black stroke-1"
                  ></CloseIcon>
                  <div class="flex justify-center">
                    <h1
                      class="py-10 px-10 text-black dark:text-white font-Montserrat text-xl md:text-xxl font-bold"
                    >
                      Kenntnisse
                    </h1>
                  </div>
                </div>
              </button>
              <div class="flex flex-col items-left shadow-lg-up">
                <component
                  v-bind="currentButtonIndex"
                  :is="KnowledgeEdit"
                  :editIndex="currentButtonIndex"
                />
              </div>
            </SwiperCard>
          </BottomCard>
        </div>
      </section>
    </transition>
  </teleport>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { slideDown, isDarkMode } from "@/store/store.js";

import SortIcon from "@/assets/icons/SortIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

import SwiperCard from "@/components/MenuModals/SwiperCard.vue";
import BottomCard from "@/components/MenuModals/BottomCard.vue";

import KnowledgeEdit from "@/components/MainModals/KnowledgeViews/KnowledgeEdit.vue";

import { Container, Draggable } from "vue3-smooth-dnd";

const knowledges = ref(JSON.parse(localStorage.getItem("knowledges")));
const bottomCardOpen4 = ref(false);
const renderComponent4 = ref(true);
let currentButtonIndex = ref(0);

interface SlideItem {
  id: string;
  index: number;
  text: string;
}
let idCounter = 0;
const getID = () => (idCounter++).toString();
let posIndexCounter = 0;
const getPosIndex = () => posIndexCounter++;

const items = ref<SlideItem[]>([
  { id: getID(), index: getPosIndex(), text: "First" },
]);

const darkLightMode = ref(JSON.parse(localStorage.getItem("theme")));
if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  darkLightMode.value = "dark";
} else {
  darkLightMode.value = "light";
}

watch(isDarkMode, () => {
  if (isDarkMode.value == true) {
    darkLightMode.value = "dark";
  } else {
    darkLightMode.value = "light";
  }
});
watch(bottomCardOpen4, () => {
  if (bottomCardOpen4.value == false) {
    knowledges.value = JSON.parse(localStorage.getItem("knowledges"));
    renderComponent4.value = true;
  } else {
    renderComponent4.value = false;
  }
});
watch(slideDown, () => {
  if (slideDown.value == true) {
    bottomCardOpen4.value = false;
  }
});

const openBottomCard = (id) => {
  currentButtonIndex.value = id;
  slideDown.value = false;
  bottomCardOpen4.value = true;
};

const onDrop = (dropResult) => {
  const newData = applyDrag(knowledges, dropResult); // knowledges call by reference
  localStorage.setItem("knowledges", JSON.stringify(knowledges.value));
};
const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;

  if (removedIndex === null && addedIndex === null) return arr;
  let itemToAdd = payload;
  if (removedIndex !== null) {
    itemToAdd = arr.value.splice(removedIndex, 1)[0];
  }
  if (addedIndex !== null) {
    arr.value.splice(addedIndex, 0, itemToAdd);
  }
  return arr;
};
const closeBottomCard = () => {
  slideDown.value = true;
};
</script>
