<template>
  <div class="relative inline-block overflow-hidden">
    <input
      type="file"
      accept="image/*"
      class="hidden"
      ref="file"
      @change="change"
    />
    <img :src="imageAvatar" class="h-full w-full object-cover" />
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { fileObject, imageObject } from "@/store/store.js";
import IconProfile from "@/components/MenuModals/IconProfile.vue";

const props = defineProps({
  defaultSrc: String,
});

let imageAvatar = ref(props.defaultSrc);

const file = ref(null);
const isFileSelected = ref(false);

const browse = () => {
  console.log("browse");
  file.value.click();
};
const change = (e) => {
  if (!e.target.files[0]) {
    console.log("no file");
    imageAvatar.value = props.defaultSrc;
    file.value = "";
    isFileSelected.value = false;
  } else {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    fileObject.file = e.target.files[0];
    isFileSelected.value = true;
    reader.onload = (e) => {
      console.log("file read");
      imageObject.value = null;
      imageObject.value = e.target.result as string;
    };
  }
};
</script>
