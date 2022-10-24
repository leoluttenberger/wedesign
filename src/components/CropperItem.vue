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
import "vue-advanced-cropper/dist/style.css";
import { canvasCoordinates, imageObject } from "../store.js";

const imageCrop = ref(JSON.parse(localStorage.getItem("profileImg")));

const change = ({ coordinates }) => {
  canvasCoordinates.width = coordinates.width;
  canvasCoordinates.height = coordinates.height;
  canvasCoordinates.left = coordinates.left;
  canvasCoordinates.top = coordinates.top;
  console.log(canvasCoordinates);
};
</script>
