<template>
  <div class="flex gap-2 py-2">
    <input
      @input="(event) => $emit('update:checked', event.target.checked)"
      type="checkbox"
      :checked="checked"
      :id="fieldId"
      class="w-4 h-4 md:h-6 md:w-6 text-green-600 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2"
    />
    <label
      :for="fieldId"
      class="flex flex-row items-center font-light dark:text-white text-black cursor-pointer select-none text-base md:text-2xl"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  label: String,
  fieldId: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
  },
});
</script>
<style></style>
