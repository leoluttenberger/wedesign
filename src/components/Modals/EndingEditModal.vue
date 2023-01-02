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
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults, watch } from "vue";
import { sideBack, sideBackBack } from "@/store.js";
import BackIcon from "@/assets/icons/BackIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
const props = withDefaults(
  defineProps<{
    editIndex: number;
  }>(),
  { editIndex: 0 }
);

onMounted(() => {
  sideBackBack.value = true;
  sideBack.value = true;
});

const closeModal = () => {
  sideBackBack.value = false;
};
</script>
