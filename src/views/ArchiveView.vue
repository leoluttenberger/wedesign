<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen py-20 z-10">
    <section class="z-0">
      <div v-for="(item, index) in archives" :key="index" class="p-2">
        <div class="grow px-2">
          <div
            class="p-2 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border border-wd-green"
          >
            <div class="flex">
              <div class="font-bold text-xl">{{ item[0].company }}</div>
              <div class="grow py-2 px-2"></div>
              <div
                v-if="item[0].state == 'Entwurf'"
                class="font-none px-5 py-2 text-xs text-white font-bold rounded-2xl bg-wd-edit"
              >
                {{ item[0].state }}
              </div>
              <div
                v-if="item[0].state == 'Erledigt'"
                class="font-none px-5 py-2 text-xs text-white font-bold rounded-2xl bg-wd-green"
              >
                {{ item[0].state }}
              </div>
              <div
                v-if="item[0].state == 'Keine Rückmeldung'"
                class="font-none px-5 py-2 text-xs text-white font-bold rounded-2xl bg-wd-error"
              >
                {{ item[0].state }}
              </div>
              <div
                v-if="item[0].state == 'Leider nein'"
                class="font-none px-5 py-2 text-xs text-white font-bold rounded-2xl bg-wd-error"
              >
                {{ item[0].state }}
              </div>
            </div>
            <div>{{ item[0].job }}</div>
            <div>{{ item[0].date }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import ArrowIcon from "@/assets/icons/ArrowIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
const archives = ref(JSON.parse(localStorage.getItem("archives")));
</script>
