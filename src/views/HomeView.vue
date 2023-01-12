<template>
  <section
    class="fixed inset-x-0 z-10 shadow dark:text-white text-xl font-Montserrat bg-white dark:bg-slate-800 shadow"
  >
    <div class="flex justify-center p-2">Home</div>
    <div class="flex justify-center text-md">
      <span>Hi &#128075; {{ firstname }}</span>
    </div>
  </section>
  <img class="absolute max-w-[20%] py-24" src="../assets/images/logo.png" />
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
const firstname = JSON.parse(localStorage.getItem("firstName"));
</script>
