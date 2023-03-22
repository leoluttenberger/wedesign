<template>
  <cropper
    class="cropper"
    :src="imageCrop"
    :stencil-props="{
      aspectRatio: 12 / 12,
    }"
    @change="change"
  ></cropper>
</template>
<script setup lang="ts">
import { Cropper } from "vue-advanced-cropper";
import { ref } from "vue";
import { canvasCoordinates, imageObject } from "@/store/store.js";

import "vue-advanced-cropper/dist/style.css";
import "vue-advanced-cropper/dist/theme.compact.css";

const imageCrop = ref(imageObject.value);

const change = ({ coordinates }) => {
  canvasCoordinates.width = coordinates.width;
  canvasCoordinates.height = coordinates.height;
  canvasCoordinates.left = coordinates.left;
  canvasCoordinates.top = coordinates.top;
};
</script>
