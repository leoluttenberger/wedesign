<template>
  <div class="grid flex gap-6 px-4 pt-4 pt-10 pb-20">
    <button
      class="rounded-md bg-wd-green hover:bg-transparent-green h-14 text-white font-bold"
      @click="closeModal"
    >
      Gehe zum Tutorial!
    </button>
  </div>
  <div
    class="p-4 bg-wd-background text-black dark:text-white dark:bg-slate-500 text-center"
  >
    <ul>
      <li>
        Auf unserer Website findest du eine Foto- und Video Anleitung zur App:
        <button
          @click="openLinkInBrowser(url)"
          class="hover:text-blue-500 underline"
        >
          {{ url }}
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { slideDown } from "@/store/store.js";
const url = ref("https://we-design.at/tutorial/");
const closeModal = () => {
  localStorage.setItem("itemsSet", "false");
  slideDown.value = false;
  slideDown.value = true;
};
const openLinkInBrowser = async (url: string) => {
  window.open(url);
};
</script>
