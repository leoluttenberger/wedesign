<template>
  <ul>
    <li v-for="item in educations" :key="item.index" class="p-4">
      <div
        class="p-2 grid bg-white dark:bg-slate-800 text-black dark:text-white font-Montserrat rounded-md"
      >
        <div class="font-bold text-xl">{{ item[0].type }}</div>
        <div>{{ item[0].specialty }}</div>
        <div>{{ item[0].adress }}</div>
        <div>{{ item[0].educationFrom }} -> {{ item[0].educationTo }}</div>
      </div>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref } from "vue";
const educations = ref(JSON.parse(localStorage.getItem("educations")));
</script>
