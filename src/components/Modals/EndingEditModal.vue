<template>
  <div class="flex">
    <button type="button" @click="closeModal" class="p-4">
      <BackIcon
        class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
      ></BackIcon>
    </button>
    <p class="text-black px-1 dark:text-white font-Montserrat text-xl p-4">
      Abschluss bearbeiten
    </p>
  </div>
  <Tiptap
    :itemCurrentIndex="props.itemIndex"
    :isEndingEditModal="true"
  ></Tiptap>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import { sideBack, sideBackBack } from "@/store.js";
import BackIcon from "@/assets/icons/BackIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import Tiptap from "@/components/Tiptap.vue";

const props = defineProps({
  itemIndex: {
    type: Number,
    default: 0,
  },
});
onMounted(() => {
  sideBackBack.value = true;
  sideBack.value = true;
});

const closeModal = () => {
  sideBackBack.value = false;
  console.log(props.itemIndex);
};
</script>
