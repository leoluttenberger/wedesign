<template>
  <div class="flex justify-end">
    <button type="button" @click="closeModal" class="p-4">
      <CloseIcon
        class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
      ></CloseIcon>
    </button>
  </div>
  <div v-if="itemIndex >= 0 && itemIndex < 7">
    <div class="flex justify-left p-2">
      <p class="text-black px-1 dark:text-white font-Montserrat text-xl">
        {{ textLabel }} - {{ itemIndex + 1 }}
      </p>
    </div>
    <div class="flex justify-center">
      <img
        class="object-contain h-screen w-screen"
        :src="imageArray[itemIndex]"
        :default-src="imageArray[itemIndex]"
      />
    </div>

    <div class="flex justify-center">
      <button type="button" class="p-4">
        <SwipeRightIcon
          class="animate-pulse h-10 w-10 dark:stroke-wd-white stroke-black stroke-1"
        ></SwipeRightIcon>
      </button>
    </div>
  </div>
  <div v-if="itemIndex == 7">
    <div class="flex justify-left p-2">
      <p class="text-black px-1 dark:text-white font-Montserrat text-xl">
        {{ textLabel }} Ende
      </p>
    </div>

    <div class="grid flex gap-6 px-4 pt-4 pb-20">
      <button
        class="rounded-md bg-wd-green hover:bg-transparent-green h-14 text-white font-bold"
        @click="closeModal"
      >
        Erledigt & Schließen!
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, defineProps, ref } from "vue";
import { slideDown } from "@/store/store.js";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import SwipeRightIcon from "@/assets/icons/SwipeRight.vue";
import image1 from "@/assets/images/01_v2.png";
import image2 from "@/assets/images/02_v2.png";
import image3 from "@/assets/images/03_v2.png";
import image4 from "@/assets/images/04_v2.png";
import image5 from "@/assets/images/05_v2.png";
import image6 from "@/assets/images/06_v2.png";
import image7 from "@/assets/images/07_v2.png";
import image8 from "@/assets/images/08_v2.png";

const imageArray = ref<string[]>([
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
]);

const props = defineProps({
  itemIndex: {
    type: Number,
    default: 0,
  },
  textLabel: {
    type: String,
    default: "Text bearbeiten",
  },
});

onMounted(() => {
  slideDown.value = false;
});

const closeModal = () => {
  slideDown.value = true;
};
</script>
