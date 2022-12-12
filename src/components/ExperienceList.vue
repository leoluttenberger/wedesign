<template>
  <ul>
    <li v-for="item in experiences" :key="item.index" class="p-4">
      <div
        class="p-2 grid bg-white dark:bg-slate-800 text-black dark:text-white font-Montserrat rounded-md"
      >
        <div class="font-bold text-xl">{{ item[0].workshop }}</div>
        <div>{{ item[0].description }}</div>
        <div>{{ item[0].workshopFrom }} -> {{ item[0].workshopTo }}</div>
      </div>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref } from "vue";
const experiences = ref(JSON.parse(localStorage.getItem("experiences")));
</script>
