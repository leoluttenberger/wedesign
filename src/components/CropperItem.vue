<template>
  <cropper
    class="cropper"
    :src="image"
    :stencil-props="{
      aspectRatio: 12 / 12,
    }"
    @change="change"
  ></cropper>
</template>
<script setup lang="ts">
import { Cropper } from "vue-advanced-cropper";
import { ref, watch } from "vue";
import "vue-advanced-cropper/dist/style.css";
import { canvasCoordinates, imageObject } from "../store.js";

const image = ref(JSON.parse(localStorage.getItem("profileImg")));

watch(imageObject, () => {
  image.value = imageObject.value;
});

const change = ({ coordinates }) => {
  canvasCoordinates.width = coordinates.width;
  canvasCoordinates.height = coordinates.height;
  canvasCoordinates.left = coordinates.left;
  canvasCoordinates.top = coordinates.top;
  console.log(canvasCoordinates);
};
</script>
