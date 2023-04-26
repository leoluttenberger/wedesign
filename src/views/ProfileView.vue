<template>
  <div class="py-4">
    <div class="flex grid place-items-center">
      <AvatarInput
        class="outline:none rounded-full min-w-24 w-1/2 md:w-60 shadow-lg border-[5px] border-white"
        v-model="form.avatar"
        :default-src="image"
        v-show="valueAvatarCropShow"
      />
      <button
        class="outline:none rounded-full min-w-24 w-1/2 md:w-60 shadow-lg border-[5px] border-white"
        @click="showEditImage()"
      >
        <img
          class="rounded-full"
          :src="image"
          :default-src="image"
          v-show="valueAvatarShow"
        />
      </button>

      <CropModal :show="showModal">
        <div class="grid grid-cols-3 gap-8 p-2 place-items-center justify-end">
          <div>
            <button
              type="button"
              @click="closeModal()"
              class="rounded-full hover:bg-white hover:bg-opacity-25 focus:outline-none transition duration-200"
            >
              <CloseIcon
                class="h-6 w-6 stroke-wd-white stroke-black stroke-1"
              ></CloseIcon>
            </button>
          </div>
          <div class="text-left text-white">Speichern!</div>
          <div>
            <button
              type="button"
              @click="onClickedSave()"
              class="rounded-full hover:bg-white hover:bg-opacity-25 focus:outline-none transition duration-200"
            >
              <CheckIcon
                class="h-6 w-6 stroke-wd-white stroke-black stroke-1"
              ></CheckIcon>
            </button>
          </div>
        </div>
        <CropperItem></CropperItem>
      </CropModal>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

import CheckIcon from "@/assets/icons/CheckIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import defaultImageDataURL from "@/assets/images/defaultImageDataURL.txt";

import { AvatarInput } from "@/components/TipTapModals";
import CropModal from "@/components/MenuModals/CropModal.vue";
import CropperItem from "@/components/MenuModals/CropperItem.vue";

import {
  canvasCoordinates,
  fileObject,
  imageObject,
  isDarkMode,
  slideDown,
} from "@/store/store.js";

const showModal = ref(false);
const MIME_TYPE = "image/png";
const QUALITY = 0.9;
const MAX_WIDTH = 600;
const MAX_HEIGHT = 600;

const form = ref({ avatar: null });
const image = ref(null);
const valueAvatarShow = ref(true);
const valueAvatarCropShow = ref(false);
valueAvatarCropShow.value = false;
valueAvatarShow.value = true;

const bottomCardOpen = ref(false);

const darkLightMode = ref(JSON.parse(localStorage.getItem("theme")) || []);
if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  darkLightMode.value = "dark";
} else if (JSON.parse(localStorage.getItem("theme")) == "light") {
  darkLightMode.value = "light";
} else {
  darkLightMode.value = "dark";
  isDarkMode.value = "dark";
}
if (localStorage.getItem("profileImg")) {
  image.value = JSON.parse(localStorage.getItem("profileImg"));
} else {
  console.log("Setting Default ProfileImage!");
  image.value = defaultImageDataURL;
  localStorage.setItem("profileImg", JSON.stringify(image.value));
}

watch(isDarkMode, () => {
  if (isDarkMode.value == true) {
    darkLightMode.value = "dark";
  } else {
    darkLightMode.value = "light";
  }
});

watch(slideDown, () => {
  if (slideDown.value) {
    bottomCardOpen.value = false;
  } else {
    bottomCardOpen.value = true;
  }
});
watch(imageObject, () => {
  image.value = imageObject.value;
  openModal();
  console.log("Open Modal");
});

onMounted(() => {
  valueAvatarCropShow.value = false;
  valueAvatarShow.value = true;
});

const onClickedSave = () => {
  createBlobImage();
  showModal.value = false;
  valueAvatarCropShow.value = false;
  valueAvatarShow.value = true;
};

const createBlobImage = () => {
  if (fileObject.file) {
    const blobURL = URL.createObjectURL(fileObject.file);
    const reader = new Image();
    reader.src = blobURL;
    reader.onload = () => {
      URL.revokeObjectURL(reader.src);
      const canvas = document.createElement("canvas");
      canvas.width = canvasCoordinates.width;
      canvas.height = canvasCoordinates.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(reader, -canvasCoordinates.left, -canvasCoordinates.top);
      canvas.toBlob(
        (blob) => {
          console.log(blob.size / 1024 + " KB");
        },
        MIME_TYPE,
        QUALITY
      );
      image.value = canvas.toDataURL();
      let blob = JSON.stringify(image.value);
      if (blob.length / 1028 >= 2048) {
        downSampleImage(image.value);
      } else {
        localStorage.setItem("profileImg", JSON.stringify(image.value));
      }
      console.log("Create Blob Image!");
    };
  } else {
    console.log("Error reading File!");
  }
};
const downSampleImage = (blobURL) => {
  const reader = new Image();
  reader.src = blobURL;
  reader.onload = () => {
    URL.revokeObjectURL(reader.src);
    const [newWidth, newHeight] = calculateSize(reader, MAX_WIDTH, MAX_HEIGHT);
    const canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(reader, 0, 0, newWidth, newHeight);
    canvas.toBlob(
      (blob) => {
        console.log(blob.size / 1024 + " KB");
      },
      MIME_TYPE,
      QUALITY
    );
    image.value = canvas.toDataURL();
    localStorage.setItem("profileImg", JSON.stringify(image.value));
  };
};

const calculateSize = (img, maxWidth, maxHeight) => {
  let width = img.width;
  let height = img.height;
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
};

const closeModal = () => {
  valueAvatarCropShow.value = false;
  valueAvatarShow.value = true;
  showModal.value = false;
  image.value = JSON.parse(localStorage.getItem("profileImg"));
};
const openModal = () => {
  valueAvatarCropShow.value = true;
  valueAvatarShow.value = false;
  showModal.value = true;
};
const showEditImage = () => {
  valueAvatarCropShow.value = true;
  valueAvatarShow.value = false;
};
</script>
