<template>
  <teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <section :class="darkLightMode">
        <div
          ref="modal-backdrop"
          v-if="showModal"
          class="fixed z-10 inset-0 bg-black bg-opacity-10"
        >
          <div
            class="bg-wd-white dark:bg-slate-800"
            :style="safeAreaStyle"
          ></div>

          <slot>I'm empty inside</slot>
        </div>
      </section>
    </transition>
  </teleport>
</template>
<script setup lang="ts">
import { ref, watch, defineProps, computed } from "vue";
import { isDarkMode } from "@/store/store.js";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const safeAreaTop = ref(0);
const safeAreaStyle = computed(() => ({
  paddingTop: `${safeAreaTop.value}px`,
}));

// Check if the app is running on a mobile device
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // Check for iOS platform and set safe area for status bar
  if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
    console.log("ios");
    safeAreaTop.value = window.innerWidth > 375 ? 44 : 20;
  }
  // Check for Android platform and set safe area for status bar
  else if (/Android/i.test(navigator.userAgent)) {
    const androidStatusBarHeight = 0; // Adjust as needed
    safeAreaTop.value = androidStatusBarHeight;
  } else {
    safeAreaTop.value = 0;
  }
} else {
  safeAreaTop.value = 0;
}
const darkLightMode = ref(JSON.parse(localStorage.getItem("theme")) || []);
if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  darkLightMode.value = "dark";
} else if (JSON.parse(localStorage.getItem("theme")) == "light") {
  darkLightMode.value = "light";
} else {
  darkLightMode.value = "dark";
  isDarkMode.value = "dark";
}
watch(isDarkMode, () => {
  if (isDarkMode.value == true) {
    darkLightMode.value = "dark";
  } else {
    darkLightMode.value = "light";
  }
});

const showModal = ref(false);
watch(
  () => props.show,
  (show) => {
    showModal.value = show;
  }
);
</script>
