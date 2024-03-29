<template>
  <div>
    <section class="z-0">
      <div class="grid gap-2" v-if="renderComponent4">
        <Container @drop="onDrop" v-if="dragActive && !isEmpty">
          <Draggable
            v-for="(item, index) in knowledges"
            :key="index"
            class="p-8"
          >
            <div class="flex">
              <button @click="openBottomCard(index)" class="w-full px-2">
                <div
                  class="p-2 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border border-wd-green"
                >
                  <div class="font-bold text-xl">{{ item[0].type }}</div>
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
              <div class="flex-none pt-6">
                <div class="flex gap-2">
                  <div class="text-black dark:text-white">
                    {{ index + 1 }}
                  </div>
                  <SortIcon class="h-full"></SortIcon>
                </div>
              </div>
            </div>
          </Draggable>
        </Container>
        <Container v-if="!dragActive && !isEmpty">
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
                  <div class="font-bold text-xl">{{ item[0].type }}</div>

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
            </div>
          </Draggable>
        </Container>
        <Container v-if="isEmpty">
          <div class="flex">
            <button :disabled="true" class="grow px-2">
              <div
                class="p-2 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border border-gray-300"
              >
                <div class="font-bold text-xl text-gray-300">
                  Sprachkenntnisse
                </div>
                <div class="text-base text-gray-300">Sprache</div>
                <div class="text-base text-gray-300 flex-none">Level</div>
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
          v-if="bottomCardOpen4"
          class="fixed z-10 inset-0 dark:bg-transparent-black bg-wd-white bg-opacity-50"
        >
          <BottomCard v-model:open="bottomCardOpen4">
            <SwiperCard :items="items">
              <button @click="closeBottomCard()">
                <div class="flex">
                  <h1
                    class="px-3 p-2 text-black dark:text-white font-Montserrat text-2xl md:text-xxl font-bold"
                  >
                    Kenntnisse
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
import { ref, watch, onMounted } from "vue";
import { slideDown, isDarkMode, dragOptionActive } from "@/store/store.js";

import SortIcon from "@/assets/icons/SortIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

import SwiperCard from "@/components/MenuModals/SwiperCard.vue";
import BottomCard from "@/components/MenuModals/BottomCard.vue";

import KnowledgeEdit from "@/components/MainModals/KnowledgeViews/KnowledgeEdit.vue";

import { Container, Draggable } from "vue3-smooth-dnd";

const knowledges = ref(JSON.parse(localStorage.getItem("knowledges")) || []);
const bottomCardOpen4 = ref(false);
const renderComponent4 = ref(true);
let currentButtonIndex = ref(0);
const dragActive = ref(false);
const isEmpty = ref(true);

interface SlideItem {
  id: string;
  index: number;
  text: string;
}

if (localStorage.getItem("knowledges") == null) {
  isEmpty.value = true;
} else {
  if (knowledges.value.length == 0) {
    isEmpty.value = true;
  } else {
    isEmpty.value = false;
  }
}

onMounted(() => {
  if (localStorage.getItem("knowledges") == null) {
    isEmpty.value = true;
  } else {
    if (knowledges.value.length == 0) {
      isEmpty.value = true;
    } else {
      isEmpty.value = false;
    }
  }
});

let idCounter = 0;
const getID = () => (idCounter++).toString();
let posIndexCounter = 0;
const getPosIndex = () => posIndexCounter++;

const items = ref<SlideItem[]>([
  { id: getID(), index: getPosIndex(), text: "First" },
]);

const darkLightMode = ref(JSON.parse(localStorage.getItem("theme")) || "light");

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
  const newData = applyDrag(knowledges, dropResult);
  localStorage.setItem("knowledges", JSON.stringify(newData));
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
