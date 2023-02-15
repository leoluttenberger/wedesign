<template>
  <section
    class="fixed inset-x-0 z-10 shadow dark:text-white text-xl font-Montserrat bg-white dark:bg-slate-800 shadow"
  >
    <div class="flex justify-center p-2 font-bold">Erinnerungen</div>
  </section>
  <div class="py-14 px-4">
    <v-calendar :is-dark="theme" is-expanded :attributes="attributes" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
let theme = ref(false);
if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  theme.value = true;
} else {
  theme.value = false;
}
let attributes = ref([
  {
    key: "today",
    dot: true,
    dates: new Date(),
  },
]);
</script>
