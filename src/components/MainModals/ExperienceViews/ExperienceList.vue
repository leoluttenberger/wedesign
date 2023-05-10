<template>
  <div>
    <section class="z-0">
      <div class="grid gap-2" v-if="renderComponent3">
        <Container @drop="onDrop" v-if="dragActive && !isEmpty">
          <Draggable
            v-for="(item, index) in experiences"
            :key="index"
            class="p-2"
          >
            <div class="flex">
              <button @click="openBottomCard(index)" class="w-full px-2">
                <div
                  class="p-2 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border border-wd-green"
                >
                  <div class="font-bold text-xl">{{ item[0].workshop }}</div>
                  <div>{{ item[0].description }}</div>
                  <div class="flex">
                    <div class="flex-none">
                      {{ item[0].workshopFrom }}
                    </div>
                    <div class="grow py-2 px-2">
                      <ArrowIcon
                        class="dark:stroke-wd-white stroke-1 w-full h-2"
                      ></ArrowIcon>
                    </div>
                    <div class="flex-none">
                      {{ item[0].workshopTo }}
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
        <Container v-if="!dragActive && !isEmpty">
          <Draggable
            v-for="(item, index) in experiences"
            :key="index"
            class="p-2"
          >
            <div class="flex">
              <button @click="openBottomCard(index)" class="w-full px-2">
                <div
                  class="p-2 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border border-wd-green"
                >
                  <div class="font-bold text-xl">{{ item[0].workshop }}</div>
                  <div>{{ item[0].description }}</div>
                  <div class="flex">
                    <div class="flex-none">
                      {{ item[0].workshopFrom }}
                    </div>
                    <div class="grow py-2 px-2">
                      <ArrowIcon
                        class="dark:stroke-wd-white stroke-1 w-full h-2"
                      ></ArrowIcon>
                    </div>
                    <div class="flex-none">
                      {{ item[0].workshopTo }}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </Draggable>
        </Container>
        <Container v-if="isEmpty">
          <div class="flex">
            <button :disabled="true" class="grow px-2">
              <div
                class="p-2 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border border-gray-300"
              >
                <div class="font-bold text-xl text-gray-300">Workshop</div>
                <div class="text-base text-gray-300">Beschreibung</div>
                <div class="flex">
                  <div class="text-base text-gray-300 flex-none">Start</div>
                  <div class="grow py-2 px-2">
                    <ArrowIcon
                      class="dark:stroke-wd-white stroke-1 w-full h-2"
                    ></ArrowIcon>
                  </div>
                  <div class="text-base text-gray-300 flex-none">Ende</div>
                </div>
              </div>
            </button>
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
          v-if="bottomCardOpen3"
          class="fixed z-10 inset-0 dark:bg-transparent-black bg-wd-white bg-opacity-50"
        >
          <BottomCard v-model:open="bottomCardOpen3">
            <SwiperCard :items="items">
              <button @click="closeBottomCard()">
                <div class="flex">
                  <h1
                    class="pt-8 px-4 text-black dark:text-white font-Montserrat text-xl md:text-2xl font-bold"
                  >
                    Erfahrung
                  </h1>
                  <div class="grow ..."></div>
                  <div class="p-4">
                    <CloseIcon
                      class="h-10 w-10 dark:stroke-wd-white stroke-black stroke-1"
                    ></CloseIcon>
                  </div>
                </div>
              </button>
              <div class="flex flex-col items-left shadow-lg-up">
                <component
                  v-bind="currentButtonIndex"
                  :is="ExperienceEdit"
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
import { ref, watch, onMounted } from "vue";
import { slideDown, isDarkMode, dragOptionActive } from "@/store/store.js";

import BottomCard from "@/components/MenuModals/BottomCard.vue";
import ArrowIcon from "@/assets/icons/ArrowIcon.vue";
import SortIcon from "@/assets/icons/SortIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

import ExperienceEdit from "@/components/MainModals/ExperienceViews/ExperienceEdit.vue";
import SwiperCard from "@/components/MenuModals/SwiperCard.vue";

import { Container, Draggable } from "vue3-smooth-dnd";

const experiences = ref(JSON.parse(localStorage.getItem("experiences")) || []);
const bottomCardOpen3 = ref(false);
const renderComponent3 = ref(true);
let currentButtonIndex = ref(0);
const dragActive = ref(false);
const isEmpty = ref(true);

interface SlideItem {
  id: string;
  index: number;
  text: string;
}

if (localStorage.getItem("experiences") == null) {
  isEmpty.value = true;
} else {
  if (experiences.value.length == 0) {
    isEmpty.value = true;
  } else {
    isEmpty.value = false;
  }
}
let idCounter = 0;
const getID = () => (idCounter++).toString();
let posIndexCounter = 0;
const getPosIndex = () => posIndexCounter++;

const items = ref<SlideItem[]>([
  { id: getID(), index: getPosIndex(), text: "First" },
]);

onMounted(() => {
  if (localStorage.getItem("experiences") == null) {
    isEmpty.value = true;
  } else {
    if (experiences.value.length == 0) {
      isEmpty.value = true;
    } else {
      isEmpty.value = false;
    }
  }
});

const darkLightMode = ref(JSON.parse(localStorage.getItem("theme")) || []);
if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  darkLightMode.value = "dark";
} else if (JSON.parse(localStorage.getItem("theme")) == "light") {
  darkLightMode.value = "light";
} else {
  darkLightMode.value = "dark";
  isDarkMode.value = "dark";
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
watch(bottomCardOpen3, () => {
  if (bottomCardOpen3.value == false) {
    experiences.value = JSON.parse(localStorage.getItem("experiences"));
    renderComponent3.value = true;
  } else {
    renderComponent3.value = false;
  }
});
watch(slideDown, () => {
  if (slideDown.value == true) {
    bottomCardOpen3.value = false;
  }
});

const openBottomCard = (id) => {
  currentButtonIndex.value = id;
  slideDown.value = false;
  bottomCardOpen3.value = true;
};

const onDrop = (dropResult) => {
  const newData = applyDrag(experiences, dropResult); // experiences call by reference
  localStorage.setItem("experiences", JSON.stringify(experiences.value));
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
