<template>
  <div class="relative inline-block overflow-hidden">
    <input
      type="file"
      accept="image/*"
      class="hidden"
      ref="file"
      @change="change"
    />
    <img :src="image" class="h-full w-full object-cover" />
    <div
      class="absolute top-0 h-full w-full bg-black bg-opacity-25 flex items-center justify-center"
    >
      <button
        type="button"
        @click="browse()"
        class="rounded-full hover:bg-white hover:bg-opacity-25 p-2 focus:outline-none text-white transition duration-200"
      >
        <icon-profile name="camera" class="h-6 w-6"></icon-profile>
      </button>
      <button
        type="button"
        v-if="isFileSelected"
        @click="remove()"
        class="rounded-full hover:bg-white hover:bg-opacity-25 p-2 focus:outline-none text-white transition duration-200"
      >
        <icon-profile name="x" class="h-6 w-6"></icon-profile>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconProfile from "./IconProfile.vue";
import { defineProps, ref } from "vue";
import { fileObject, imageObject } from "../store.js";

const props = defineProps({
  defaultSrc: String,
});

let image = ref(props.defaultSrc);
const file = ref(null);
const isFileSelected = ref(false);

const browse = () => {
  console.log("browse");
  file.value.click();
};
const remove = () => {
  console.log("remove");
  image.value = props.defaultSrc;
  file.value = "";
};
const change = (e) => {
  if (!e.target.files[0]) {
    console.log("no file");
    image.value = props.defaultSrc;
    imageObject.value = image.value;
    file.value = "";
    isFileSelected.value = false;
  } else {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    fileObject.file = e.target.files[0];
    isFileSelected.value = true;
    reader.onload = (e) => {
      console.log("file read");
      image.value = e.target.result as string;
      imageObject.value = image.value;
      localStorage.setItem("profileImg", JSON.stringify(image.value));
    };
  }
};
</script>
