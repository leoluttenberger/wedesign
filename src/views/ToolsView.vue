<template>
  <section
    class="fixed inset-x-0 z-10 shadow dark:text-white text-xl font-Montserrat bg-white dark:bg-slate-800 shadow"
  >
    <div class="flex justify-center p-2">
      <div class="px-2 font-bold">Einstellungen</div>
    </div>
  </section>
  <div class="max-w-[100%] py-20">
    <div class="flex justify-evenly">
      <p class="text-black dark:text-white font-Montserrat text-md font-bold">
        Light
      </p>
      <Toggle
        v-model="toggleOnDark"
        :classes="{
          container: 'inline-block',
          toggle:
            'flex w-12 h-5 rounded-full relative cursor-pointer transition items-center box-content border-2 text-xs leading-none',
          toggleOn:
            'bg-wd-green border-wd-green justify-start text-black bg-slate-800',
          toggleOff: 'bg-gray-200 border-gray-200 justify-end',
          handle:
            'inline-block bg-white w-5 h-5 top-0 rounded-full absolute transition-all',
          handleOn: 'left-full transform -translate-x-full bg-shite',
          handleOff: 'left-0 bg-slate-600',
          label: 'text-center w-8 border-box whitespace-nowrap select-none',
        }"
      />
      <p class="text-black dark:text-white font-Montserrat text-md font-bold">
        Dark
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Toggle from "@vueform/toggle";
import { isDarkMode } from "@/store/store.js";

const toggleOnDark = ref(false);
if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  toggleOnDark.value = true;
}
watch(toggleOnDark, () => {
  isDarkMode.value = toggleOnDark.value;
  if (isDarkMode.value == true) {
    localStorage.setItem("theme", JSON.stringify("dark"));
  } else {
    localStorage.setItem("theme", JSON.stringify("light"));
  }
});
const userInfos = ref(JSON.parse(localStorage.getItem("userInfos")));
const firstName = ref(null);
onMounted(() => {
  if (localStorage.getItem("userInfos")) {
    firstName.value = userInfos.value[0][0].firstName;
  }
});
</script>
