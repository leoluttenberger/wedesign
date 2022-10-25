<template>
  <div class="min-h-screen bg-gray-100">
    <button @click="addAfter">Add after</button>
    <button @click="bottomCardOpen = true">Open</button>

    <BottomCard v-model:open="bottomCardOpen">
      <Swiper
        v-slot="{ id, index }"
        v-model:index="currentIndex"
        :items="items"
        :space-between="8"
      >
        <div
          class="mx-2 rounded-3xl flex flex-col items-center justify-center h-full shadow-lg-up bg-white"
        >
          {{ id }} | {{ index }}
        </div>
      </Swiper>
    </BottomCard>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import Swiper from "../components/SwiperCard.vue";
import BottomCard from "../components/BottomCard.vue";

interface SlideItem {
  id: string;
  index: number;
  text: string;
}

export default {
  components: {
    Swiper,
    BottomCard,
  },
  setup() {
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

    return {
      items,
      currentIndex,
      addBefore,
      addAfter,
      bottomCardOpen,
    };
  },
};
</script>
