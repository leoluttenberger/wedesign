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
        {{ textLabel }} - {{ itemIndex + 1 }}
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
import { onMounted, defineProps } from "vue";
import { slideDown } from "@/store/store.js";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import SwipeRightIcon from "@/assets/icons/SwipeRight.vue";
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
