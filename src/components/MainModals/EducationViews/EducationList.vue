<template>
  <div>
    <section class="z-0">
      <div class="grid gap-2" v-if="renderComponent2">
        <Container @drop="onDrop" v-if="dragActive">
          <Draggable
            v-for="(item, index) in educations"
            :key="index"
            class="p-2"
          >
            <div class="flex">
              <button @click="openBottomCard(index)" class="grow px-2">
                <div
                  class="p-2 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border border-wd-green"
                >
                  <div class="font-bold text-xl">{{ item[0].type }}</div>
                  <div>{{ item[0].address }}</div>
                  <div class="flex">
                    <div class="flex-none">
                      {{ item[0].educationFrom }}
                    </div>
                    <div class="grow py-2 px-2">
                      <ArrowIcon
                        class="dark:stroke-wd-white stroke-1 w-full h-2"
                      ></ArrowIcon>
                    </div>
                    <div class="flex-none">
                      {{ item[0].educationTo }}
                    </div>
                  </div>
                </div>
              </button>
              <div class="flex-none p-4">
                <SortIcon class="h-full"></SortIcon>
              </div>
            </div>
          </Draggable>
        </Container>
        <Container v-if="!dragActive">
          <div v-for="(item, index) in educations" :key="index" class="p-2">
            <div class="flex">
              <button @click="openBottomCard(index)" class="grow px-2">
                <div
                  class="p-2 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border border-wd-green"
                >
                  <div class="font-bold text-xl">{{ item[0].type }}</div>
                  <div>{{ item[0].address }}</div>
                  <div class="flex">
                    <div class="flex-none">
                      {{ item[0].educationFrom }}
                    </div>
                    <div class="grow py-2 px-2">
                      <ArrowIcon
                        class="dark:stroke-wd-white stroke-1 w-full h-2"
                      ></ArrowIcon>
                    </div>
                    <div class="flex-none">
                      {{ item[0].educationTo }}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
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
          v-if="bottomCardOpen2"
          class="fixed z-10 inset-0 dark:bg-transparent-black bg-wd-white bg-opacity-50"
        >
          <BottomCard v-model:open="bottomCardOpen2">
            <SwiperCard :items="items">
              <button @click="closeBottomCard()" class="p-2">
                <div class="flex justify-end">
                  <CloseIcon
                    class="h-10 w-10 dark:stroke-wd-white stroke-black stroke-1"
                  ></CloseIcon>
                </div>
                <div class="flex justify-left">
                  <h1
                    class="px-2 text-black dark:text-white font-Montserrat text-xl md:text-xxl font-bold"
                  >
                    Ausbildung
                  </h1>
                </div>
              </button>
              <div class="flex flex-col items-left shadow-lg-up">
                <component
                  v-bind="currentButtonIndex"
                  :is="EducationEdit"
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
import { slideDown, isDarkMode, dragOptionActive } from "@/store/store.js";

import ArrowIcon from "@/assets/icons/ArrowIcon.vue";
import SortIcon from "@/assets/icons/SortIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

import BottomCard from "@/components/MenuModals/BottomCard.vue";
import SwiperCard from "@/components/MenuModals/SwiperCard.vue";
import EducationEdit from "@/components/MainModals/EducationViews/EducationEdit.vue";

import { Container, Draggable } from "vue3-smooth-dnd";

const educations = ref(JSON.parse(localStorage.getItem("educations")));
const bottomCardOpen2 = ref(false);
const renderComponent2 = ref(true);
let currentButtonIndex = ref(0);
const dragActive = ref(false);

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

watch(dragOptionActive, () => {
  dragActive.value = dragOptionActive.value;
});
watch(isDarkMode, () => {
  if (isDarkMode.value == true) {
    darkLightMode.value = "dark";
  } else {
    darkLightMode.value = "light";
  }
});

watch(bottomCardOpen2, () => {
  if (bottomCardOpen2.value == false) {
    educations.value = JSON.parse(localStorage.getItem("educations"));
    renderComponent2.value = true;
  } else {
    renderComponent2.value = false;
  }
});
watch(slideDown, () => {
  if (slideDown.value == true) {
    bottomCardOpen2.value = false;
  }
});

const openBottomCard = (id) => {
  currentButtonIndex.value = id;
  slideDown.value = false;
  bottomCardOpen2.value = true;
};

const onDrop = (dropResult) => {
  const newData = applyDrag(educations, dropResult); // educations call by reference
  localStorage.setItem("educations", JSON.stringify(educations.value));
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
