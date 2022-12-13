<template>
  <div>
    <section class="z-0">
      <ul class="grid gap-2" v-if="renderComponent2">
        <li v-for="(item, index) in educations" :key="index">
          <button @click="openBottomCard(index)" class="w-full px-2">
            <div
              class="p-2 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md"
            >
              <div class="font-bold text-xl">{{ item[0].type }}</div>
              <div>{{ item[0].address }}</div>
              <div>
                {{ item[0].educationFrom }} -> {{ item[0].educationTo }}
              </div>
            </div>
          </button>
        </li>
      </ul>
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
import { ref, watch, defineAsyncComponent } from "vue";
import Swiper from "../components/SwiperCard.vue";
import BottomCard from "../components/BottomCard.vue";
import EducationEdit from "../components/EducationEdit.vue";
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
let negIndexCounter = -1;
const getNegIndex = () => negIndexCounter--;
const index = ref(0);
const items = ref<SlideItem[]>([
  { id: getID(), index: getPosIndex(), text: "First" },
]);

const currentIndex = ref(0);
let currentButtonIndex = ref(0);

watch(bottomCardOpen2, () => {
  if (bottomCardOpen2.value == false) {
    educations.value = JSON.parse(localStorage.getItem("educations"));
    renderComponent2.value = true;
  } else {
    renderComponent2.value = false;
  }
  console.log(bottomCardOpen2.value);
  console.log(renderComponent2.value);
});

const openBottomCard = (id) => {
  currentButtonIndex.value = id;
  bottomCardOpen2.value = true;
};
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
</script>
