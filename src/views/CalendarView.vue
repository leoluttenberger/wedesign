<template>
  <div class="p-4">
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
