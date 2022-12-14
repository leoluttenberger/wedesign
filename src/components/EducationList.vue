<template>
  <div>
    <section class="z-0">
      <div class="grid gap-2" v-if="renderComponent2">
        <Container @drop="onDrop">
          <Draggable
            v-for="(item, index) in educations"
            :key="index"
            class="p-2"
          >
            <button @click="openBottomCard(index)" class="w-full px-2">
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
          </Draggable>
        </Container>
      </div>
    </section>
  </div>

  <BottomCard v-model:open="bottomCardOpen2">
    <Swiper v-slot="{ id, index }" :items="items" :space-between="8">
      <div class="flex flex-col items-left shadow-lg-up">
        <component
          v-bind="currentButtonIndex"
          :is="EducationEdit"
          :editIndex="currentButtonIndex"
        />
        <div hidden="true">{{ id }} | {{ index }}</div>
      </div>
    </Swiper>
  </BottomCard>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import Swiper from "../components/SwiperCard.vue";
import BottomCard from "../components/BottomCard.vue";
import EducationEdit from "../components/EducationEdit.vue";
import ArrowIcon from "../assets/icons/ArrowIcon.vue";
import { slideDown } from "../store.js";
const educations = ref(JSON.parse(localStorage.getItem("educations")));
const bottomCardOpen2 = ref(false);
const renderComponent2 = ref(true);
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
  educations.value = applyDrag(educations.value, dropResult);
  //localStorage.setItem("educations", JSON.stringify(educations));
};
const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;

  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];
  let itemToAdd = payload;
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
    console.log("add:", itemToAdd);
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
    console.log("result:", result);
  }
  return result;
};
</script>
