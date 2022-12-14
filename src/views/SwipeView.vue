<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen py-20 z-10">
    <section class="z-0">
      <component
        :is="mapListComponents[slideIndex - 1]"
        v-if="renderComponent"
      />
      <div class="flex justify-end py-20 px-4">
        <button
          @click="openBottomCard()"
          class="bg-wd-green hover:bg-transparent-green shadow p-2 md:p-4 rounded-full"
        >
          <AddIcon></AddIcon>
        </button>
      </div>
    </section>
    <BottomCard v-model:open="bottomCardOpen">
      <Swiper
        v-slot="{ id, index }"
        v-bind="slideIndex"
        :items="items"
        :space-between="8"
      >
        <div class="flex flex-col items-left shadow-lg-up">
          <component :is="mapFormComponents[slideIndex - 1]" />
          <div hidden="true">{{ id }} | {{ index }}</div>
        </div>
      </Swiper>
    </BottomCard>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults, watch } from "vue";
import Swiper from "../components/SwiperCard.vue";
import BottomCard from "../components/BottomCard.vue";
import AddIcon from "../assets/icons/AddIcon.vue";
import ExperienceForm from "../components/ExperienceForm.vue";
import EducationForm from "../components/EducationForm.vue";
import ExperienceList from "../components/ExperienceList.vue";
import EducationList from "../components/EducationList.vue";
import { slideDown } from "../store.js";
import { bottom } from "@popperjs/core";
interface SlideItem {
  id: string;
  index: number;
  text: string;
}
let idCounter = 1;
const getID = () => (idCounter++).toString();
let posIndexCounter = 0;
const getPosIndex = () => posIndexCounter++;
let negIndexCounter = -1;
const getNegIndex = () => negIndexCounter--;
const props = withDefaults(
  defineProps<{
    slideIndex: number;
  }>(),
  { slideIndex: 1 }
);
const mapFormComponents = [EducationForm, ExperienceForm];
const mapListComponents = [EducationList, ExperienceList];

const bottomCardOpen = ref(false);
const renderComponent = ref(true);

watch(bottomCardOpen, () => {
  if (bottomCardOpen.value == false) {
    renderComponent.value = true;
  } else {
    renderComponent.value = false;
  }
  console.log(bottomCardOpen.value);
  console.log(renderComponent.value);
});
watch(slideDown, () => {
  if (slideDown.value == true) {
    bottomCardOpen.value = false;
  }
});

const items = ref<SlideItem[]>([
  { id: getID(), index: getPosIndex(), text: "First" },
]);

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
