<template>
  <div class="w-screen h-screen py-40 z-10">
    <section class="z-0">
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
        v-model:index="currentIndex"
        :items="items"
        :space-between="8"
      >
        <div class="flex flex-col items-left p-8 shadow-lg-up">
          {{ id }} | {{ index }}
          <FormKit
            v-model="workShop"
            type="text"
            label="Titel"
            placeholder="Workshop-Teilnahme"
          />
          <FormKit
            v-model="description"
            type="text"
            label="Text"
            placeholder="Beschreibung"
          />
          <FormKit
            type="date"
            v-model="workShopFrom"
            label="Von"
            placeholder="Auswählen"
          />
          <FormKit
            type="date"
            v-model="workShopTo"
            label="Bis"
            placeholder="Auswählen"
            :validation="[['date_after', educationFrom]]"
            validation-visibility="live"
          />
        </div>
      </Swiper>
    </BottomCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Swiper from "../components/SwiperCard.vue";
import BottomCard from "../components/BottomCard.vue";
import AddIcon from "../assets/icons/AddIcon.vue";
const workShop = ref(null);
const description = ref(null);
const workShopFrom = ref(null);
const workShopTo = ref(null);
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
