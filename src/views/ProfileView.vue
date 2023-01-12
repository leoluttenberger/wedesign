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
        <button
          type="button"
          @click="closeModal"
          class="rounded-full hover:bg-white hover:bg-opacity-25 focus:outline-none transition duration-200"
        >
          <icon-profile name="x" class="h-6 w-6 text-white"></icon-profile>
        </button>
        <CropperItem></CropperItem>
      </CropModal>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { AvatarInput } from "@/components";
import CropModal from "@/components/Modals/CropModal.vue";
import IconProfile from "@/components/IconProfile.vue";
import defaultImageDataURL from "@/assets/images/defaultImageDataURL.txt";
import CropperItem from "@/components/CropperItem.vue";
import SwiperCard from "@/components/SwiperCard.vue";
import BottomCard from "@/components/BottomCard.vue";
import UserFormInput from "@/views/ModalViews/UserForm.vue";
import UserFormDisplay from "@/views/ModalViews/UserDisplay.vue";

import {
  canvasCoordinates,
  fileObject,
  imageObject,
  isDarkMode,
  slideDown,
} from "@/store.js";

const image = ref(JSON.parse(localStorage.getItem("profileImg")));
const showModal = ref(false);
const MIME_TYPE = "image/png";
const QUALITY = 0.9;
const MAX_WIDTH = 600;
const MAX_HEIGHT = 600;

const form = ref({ avatar: null });
const disableInput = ref(true);
const disableEdit = ref(false);

const valueAvatarShow = ref(true);
const valueAvatarCropShow = ref(false);
valueAvatarCropShow.value = false;
valueAvatarShow.value = true;
disableInput.value = true;
disableEdit.value = false;

const bottomCardOpen = ref(false);

const darkLightMode = ref(JSON.parse(localStorage.getItem("theme")));
if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  darkLightMode.value = "dark";
} else {
  darkLightMode.value = "light";
}

if (image.value == null) {
  console.log("Setting Default ProfileImage!");
  image.value = defaultImageDataURL;
  localStorage.setItem("profileImg", JSON.stringify(image.value));
}

watch(isDarkMode, () => {
  if (isDarkMode == true) {
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

watch(showModal, () => {
  if (showModal.value == false) {
    createBlobImage();
    console.log("Saved Profile Image to LocalStorage.");
    valueAvatarCropShow.value = false;
    valueAvatarShow.value = true;
  } else {
    console.log("show modal true");
  }
});

const onClickedSave = () => {
  valueAvatarCropShow.value = false;
  valueAvatarShow.value = true;
  localStorage.setItem("profileImg", JSON.stringify(image.value));
  disableInput.value = true;
  disableEdit.value = false;
};

const onClickedEdit = () => {
  bottomCardOpen.value = true;
  slideDown.value = false;
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
  showModal.value = false;
};
const openModal = () => {
  showModal.value = true;
};

const showEditImage = () => {
  valueAvatarCropShow.value = true;
  valueAvatarShow.value = false;
};
</script>
