<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen py-20 z-10">
    <section class="z-0">
      <div v-for="(item, index) in applications" :key="index" class="p-2">
        <div class="flex">
          <div
            class="p-2 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border border-wd-green"
          >
            <div class="font-bold text-xl">{{ item[0].company }}</div>
            <div>{{ item[0].job }}</div>
            <div class="flex">
              <div class="flex-none">
                {{ item[0].deadline }}
              </div>
              <div class="grow py-2 px-2">
                Motivationsschreiben
                <ArrowIcon
                  class="dark:stroke-wd-white stroke-1 w-full h-2"
                ></ArrowIcon>
              </div>
              <div class="flex-none">
                {{ item[0].cv }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import ArrowIcon from "@/assets/icons/ArrowIcon.vue";
const applications = ref(JSON.parse(localStorage.getItem("applications")));
</script>
