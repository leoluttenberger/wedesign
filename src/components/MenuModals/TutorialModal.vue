<template>
  <div class="flex justify-beginning">
    <button type="button" @click="closeModal" class="p-4">
      <CloseIcon
        class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
      ></CloseIcon>
    </button>
  </div>
  <div class="flex justify-left p-2">
    <p
      v-if="itemIndex > 0"
      class="text-black px-1 dark:text-white font-Montserrat text-xl"
    >
      {{ textLabel }} - {{ itemIndex + 1 }}
    </p>
    <p
      v-if="itemIndex == 0"
      class="text-black px-1 dark:text-white font-Montserrat text-xl"
    >
      {{ textLabel }} - {{ itemIndex + 1 }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { onMounted, defineProps } from "vue";
import { slideDown } from "@/store/store.js";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

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
