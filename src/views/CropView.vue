<template>
  <router-link to="/form" @click="onClickedSave"> Form </router-link>
  <cropper
    class="cropper"
    :src="img"
    :stencil-props="{
      aspectRatio: 12 / 12,
    }"
    @change="change"
  ></cropper>
</template>
<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
var canvasCoordinates;
export default {
  data() {
    return {
      img: JSON.parse(localStorage.getItem("profileImg")),
    };
  },
  methods: {
    change({ coordinates }) {
      canvasCoordinates = coordinates;
    },
    onClickedSave() {
      localStorage.setItem(
        "canvasCoordinates",
        JSON.stringify(canvasCoordinates)
      );
      console.log(JSON.parse(localStorage.getItem("canvasCoordinates")));
    },
  },
  components: {
    Cropper,
  },
};
</script>
