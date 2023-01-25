<template>
  <div class="flex">
    <button type="button" @click="closeModal" class="p-4">
      <CloseIcon
        class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
      ></CloseIcon>
    </button>
    <p class="text-black px-1 dark:text-white font-Montserrat text-xl p-4">
      {{ textLabel }} {{ "Textvorlage " + (itemIndex + 1) + " bearbeiten" }}
    </p>
  </div>
  <Tiptap
    :itemCurrentIndex="props.itemIndex"
    :textEditIndex="props.buttonIndex"
    :indexOfMVid="props.indexOfMVid"
    :lastIndex="props.lastIndex"
  ></Tiptap>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import { sideBack, sideBackBack } from "@/store.js";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import Tiptap from "@/components/Tiptap.vue";

const props = defineProps({
  itemIndex: {
    type: Number,
    default: 0,
  },
  buttonIndex: {
    type: Number,
    default: 0,
  },
  indexOfMVid: {
    type: Number,
    default: 0,
  },
  lastIndex: {
    type: Number,
    default: 0,
  },
  textLabel: {
    type: String,
    default: "Text bearbeiten",
  },
});

onMounted(() => {
  sideBackBack.value = true;
  sideBack.value = true;
});

const closeModal = () => {
  sideBackBack.value = false;
};
</script>
