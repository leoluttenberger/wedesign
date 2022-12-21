<template>
  <div>
    <section class="z-0">
      <div class="grid gap-2" v-if="renderComponent3">
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

  <BottomCard v-model:open="bottomCardOpen3">
    <Swiper v-slot="{ id, index }" :items="items" :space-between="8">
      <div class="flex flex-col items-left shadow-lg-up">
        <component
          v-bind="currentButtonIndex"
          :is="KnowledgeEdit"
          :editIndex="currentButtonIndex"
        />
        <div hidden="true">{{ id }} | {{ index }}</div>
      </div>
    </Swiper>
  </BottomCard>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import Swiper from "@/components/SwiperCard.vue";
import BottomCard from "@/components/BottomCard.vue";
import KnowledgeEdit from "./KnowledgeEdit.vue";
import ArrowIcon from "@/assets/icons/ArrowIcon.vue";
import SortIcon from "@/assets/icons/SortIcon.vue";
import { slideDown } from "@/store.js";
import { Container, Draggable } from "vue3-smooth-dnd";
import exp from "constants";
const knowledges = ref(JSON.parse(localStorage.getItem("knowledges")));
const bottomCardOpen3 = ref(false);
const renderComponent3 = ref(true);
interface SlideItem {
  id: string;
  index: number;
  text: string;
}
let idCounter = 1;
const getID = () => (idCounter++).toString();
let posIndexCounter = 0;
const getPosIndex = () => posIndexCounter++;
const items = ref<SlideItem[]>([
  { id: getID(), index: getPosIndex(), text: "First" },
]);

let currentButtonIndex = ref(0);

watch(bottomCardOpen3, () => {
  if (bottomCardOpen3.value == false) {
    knowledges.value = JSON.parse(localStorage.getItem("knowledges"));
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
</script>
