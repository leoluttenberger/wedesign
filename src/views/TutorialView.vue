<template>
  <div class="grid flex gap-6 px-4 pt-4 pb-20">
    <button
      class="rounded-md bg-wd-green hover:bg-transparent-green h-14 text-white font-bold"
      @click="closeModal"
    >
      Gehe zum Tutorial!
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { slideDown } from "@/store/store.js";

const closeModal = () => {
  localStorage.setItem("itemsSet", "false");
  slideDown.value = false;
  slideDown.value = true;
};
</script>
