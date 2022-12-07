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
        ref="modal-backdrop"
        v-if="showModal"
        class="fixed z-10 inset-0 bg-black pt-10 bg-opacity-70"
      >
        <div class="flex items-start justify-center text-center">
          <div
            class="rounded-lg md:h-96 md:w-96 overflow-hidden shadow-xl bg-slate-900"
            role="dialog"
            ref="modal"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <slot>I'm empty inside</slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script setup lang="ts">
import { ref, watch, defineProps } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const showModal = ref(false);
watch(
  () => props.show,
  (show) => {
    showModal.value = show;
  }
);
</script>
