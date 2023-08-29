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
      <div
        v-if="showModal"
        class="fixed z-10 inset-0 bg-white dark:bg-black pt-20 bg-opacity-70"
      >
        <div class="flex items-start justify-center text-center">
          <div
            class="rounded-lg md:h-96 md:w-96 overflow-hidden shadow-xl bg-slate-900"
            role="dialog"
            ref="modal"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div
              class="bg-wd-white dark:bg-slate-800"
              :style="safeAreaStyle"
            ></div>
            <slot>I'm empty inside</slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script setup lang="ts">
import { ref, watch, defineProps, computed } from "vue";

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
const showModal = ref(false);
watch(
  () => props.show,
  (show) => {
    showModal.value = show;
  }
);
</script>
