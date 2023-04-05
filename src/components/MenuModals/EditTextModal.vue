<template>
  <div class="flex justify-end">
    <button type="button" @click="closeModal" class="p-4">
      <CloseIcon
        class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
      ></CloseIcon>
    </button>
  </div>
  <div class="flex justify-left pb-2">
    <p
      v-if="itemIndex > 0"
      class="text-black px-1 dark:text-white font-Montserrat text-xl"
    >
      {{ textLabel }} {{ " - Textvorlage " + itemIndex + ":" }}
    </p>
    <p
      v-if="itemIndex == 0"
      class="text-black px-1 dark:text-white font-Montserrat text-xl"
    >
      {{ textLabel }} {{ " - Aktueller Text:" }}
    </p>
  </div>
  <Tiptap
    :itemCurrentIndex="props.itemIndex"
    :textEditIndex="props.buttonIndex"
    :indexOfMVid="props.indexOfMVid"
  ></Tiptap>
</template>
<script setup lang="ts">
import { onMounted, defineProps } from "vue";
import { sideBack, sideBackBack } from "@/store/store.js";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import Tiptap from "@/components/TipTapModals/Tiptap.vue";

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
