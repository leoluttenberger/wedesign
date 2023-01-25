<template>
  <div>
    <template v-for="(item, index) in items">
      <div
        class="divider"
        v-if="item.type === 'divider'"
        :key="`divider${index}`"
      />
      <menu-item v-else :key="index" v-bind="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import MenuItem from "./MenuItem.vue";
import { defineProps, ref } from "vue";

const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
});
const items = ref([
  {
    icon: "bold",
    title: "Bold",
    action: () => props.editor.chain().focus().toggleBold().run(),
    isActive: () => props.editor.isActive("bold"),
  },
  {
    type: "divider",
  },
  {
    icon: "arrow-go-back-line",
    title: "Undo",
    action: () => props.editor.chain().focus().undo().run(),
  },
  {
    icon: "arrow-go-forward-line",
    title: "Redo",
    action: () => props.editor.chain().focus().redo().run(),
  },
]);
</script>

<style lang="scss">
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(#000, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
</style>
