<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen py-20 z-10">
    <section class="z-0">
      <component :is="mapListComponents[slideIndex - 1]" />
      <div class="flex justify-end p-4">
        <button
          @click="bottomCardOpen = true"
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
        v-model:index="currentIndex"
        :items="items"
        :space-between="8"
      >
        <div class="flex flex-col items-left p-8 shadow-lg-up">
          <component :is="mapFormComponents[slideIndex - 1]" />
          <div hidden="true">{{ id }} | {{ index }}</div>
        </div>
      </Swiper>
    </BottomCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, withDefaults } from "vue";
import Swiper from "../components/SwiperCard.vue";
import BottomCard from "../components/BottomCard.vue";
import AddIcon from "../assets/icons/AddIcon.vue";
import ExperienceForm from "../components/ExperienceForm.vue";
import EducationForm from "../components/EducationForm.vue";
import ExperienceList from "../components/ExperienceList.vue";
import EducationList from "../components/EducationList.vue";
interface SlideItem {
  id: string;
  index: number;
  text: string;
}
let idCounter = 1;
const getID = () => (idCounter++).toString();
const educations = ref(JSON.parse(localStorage.getItem("educations")));
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

const items = ref<SlideItem[]>([
  { id: getID(), index: getPosIndex(), text: "First" },
]);

const currentIndex = ref(0);

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
const bottomCardOpen = ref(false);
</script>
