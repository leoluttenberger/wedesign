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
        class="fixed z-10 inset-0 bg-black pt-16 bg-opacity-10"
      >
        <slot>I'm empty inside</slot>
      </div>
    </transition>
  </teleport>
</template>
<script setup lang="ts">
import { ref, watch, defineProps } from "vue";
import { isdark } from "@/store.js";

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
