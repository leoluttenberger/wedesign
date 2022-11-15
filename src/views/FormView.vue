<template>
  <div class="flex grid place-items-center py-8">
    <AvatarInput
      class="rounded-full w-32 shadow-lg mb-2 border-[5px] border-white"
      v-model="form.avatar"
      :default-src="imagePreview"
      v-show="valueAvatarCropShow"
    />
    <img
      class="rounded-full w-32 shadow-lg mb-2 border-[5px] border-white"
      :src="image"
      default-src="../assets/images/logo.png"
      v-show="valueAvatarShow"
    />
    <ModalDialog :show="showModal">
      <button
        type="button"
        @click="closeModal"
        class="rounded-full hover:bg-black hover:bg-opacity-25 p-2 focus:outline-none transition duration-200"
      >
        <icon-profile name="x" class="h-6 w-6"></icon-profile>
      </button>
      <CropperItem></CropperItem>
    </ModalDialog>
    <div class="flex gap-4">
      <FormKit type="button" label="Edit" @click="onClickedEdit"></FormKit>
      <FormKit type="button" label="Save" @click="onClickedSave"></FormKit>
    </div>
  </div>
  <div class="space-y-1">
    <p class="text-black font-bold font-Montserrat text-base">Deine Daten</p>
    <div class="flex bg-white h-10">
      <p class="p-2 h-10 w-24 text-black font-Montserrat text-sm">Vorname:</p>
      <FormKit
        v-model="firstName"
        type="text"
        validation="required|length:3"
        :disabled="disableInput"
        :classes="{ input: 'content-center' }"
      />
    </div>
    <div class="flex bg-white h-10">
      <p class="p-2 h-10 w-24 text-black font-Montserrat text-sm">Nachname:</p>
      <FormKit
        v-model="secondName"
        type="text"
        validation="required|length:3"
        :disabled="disableInput"
        :classes="{ input: 'content-center' }"
      />
    </div>
    <div class="flex bg-white h-10">
      <p class="p-2 h-10 w-24 text-black font-Montserrat text-sm">E-Mail</p>
      <FormKit
        v-model="email"
        type="email"
        validation="length:5|*email"
        validation-visibility="live"
        placeholder="Email"
        :disabled="disableInput"
      />
      <div class="basis-1/2"></div>
    </div>
    <p class="text-black font-bold font-Montserrat text-base">
      Deine Kontaktdaten
    </p>
    <div class="flex bg-white h-10">
      <div class="flex basis-1/2">
        <p class="p-2 w-24 h-10 text-black font-Montserrat text-sm">Straße:</p>
        <FormKit
          v-model="streetName"
          type="text"
          placeholder="Straße"
          :disabled="disableInput"
        />
      </div>
      <div class="flex basis-1/2">
        <p class="p-2 h-10 w-24 text-black font-Montserrat text-sm">Nr:</p>
        <FormKit
          v-model="streetNumber"
          type="text"
          placeholder="Nr."
          :disabled="disableInput"
        />
      </div>
    </div>
    <div class="flex bg-white h-10">
      <div class="flex basis-1/2">
        <p class="p-2 h-10 w-24 text-black font-Montserrat text-sm">PLZ:</p>
        <FormKit
          v-model="districtNumber"
          type="text"
          placeholder="Bezirk"
          :disabled="disableInput"
        />
      </div>
      <div class="flex basis-1/2">
        <p class="p-2 h-10 w-24 text-black font-Montserrat text-sm">Ort:</p>
        <FormKit
          v-model="city"
          type="text"
          placeholder="Stadt"
          :disabled="disableInput"
        />
      </div>
    </div>
    <div class="flex bg-white h-10">
      <p class="p-2 h-10 w-24 text-black font-Montserrat text-sm">Telefon:</p>
      <FormKit
        v-model="phone"
        type="text"
        placeholder="xxxx-xxx-xxxx"
        :validation="[['required'], ['matches', /^\d{4}-\d{3}-\d{4}$/]]"
        validation-visibility="live"
        :validation-messages="{
          matches:
            'Ihre Telephonnumber muss wie folgt formatiert sein: xxxx-xxx-xxxx',
        }"
        :disabled="disableInput"
      />
    </div>
  </div>
  <div class="py-8"></div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, onMounted } from "vue";
import { AvatarInput } from "../components";
import CropperItem from "../components/CropperItem.vue";
import {
  canvasCoordinates,
  fileObject,
  imageObject,
  imagePreviewObject,
} from "../store.js";
import ModalDialog from "../components/ModalDialog.vue";
import { id } from "@formkit/i18n";
import IconProfile from "../components/IconProfile.vue";
import defaultImageDataURL from "../assets/images/defaultImageDataURL.txt";

const image = ref(JSON.parse(localStorage.getItem("profileImg")));
const imagePreview = ref(JSON.parse(localStorage.getItem("profileImg")));
imagePreviewObject.value = imagePreview.value;
const showModal = ref(false);
const MIME_TYPE = "image/png";
const QUALITY = 0.9;
const MAX_WIDTH = 600;
const MAX_HEIGHT = 600;

const form = ref({ avatar: null });
const disableInput = ref(true);
const firstName = ref(JSON.parse(localStorage.getItem("firstName")));
const secondName = ref(JSON.parse(localStorage.getItem("secondName")));
const email = ref(JSON.parse(localStorage.getItem("email")));
const phone = ref(JSON.parse(localStorage.getItem("phone")));
const streetName = ref(JSON.parse(localStorage.getItem("streetName")));
const streetNumber = ref(JSON.parse(localStorage.getItem("streetNumber")));
const districtNumber = ref(JSON.parse(localStorage.getItem("districtNumber")));
const city = ref(JSON.parse(localStorage.getItem("city")));
const valueAvatarShow = ref(true);
const valueAvatarCropShow = ref(false);

if (image.value == null) {
  image.value = defaultImageDataURL;
  imagePreview.value = defaultImageDataURL;
}

watch(imageObject, () => {
  image.value = imageObject.value;
  openModal();
  console.log("Open Modal");
});

watch(showModal, () => {
  if (showModal.value == false) {
    console.log("Create Blob Image!");
    createBlobImage();
  } else {
    console.log("show modal true");
  }
});
const onClickedSave = () => {
  valueAvatarCropShow.value = false;
  valueAvatarShow.value = true;
  localStorage.setItem("firstName", JSON.stringify(firstName.value));
  localStorage.setItem("secondName", JSON.stringify(secondName.value));
  localStorage.setItem("email", JSON.stringify(email.value));
  localStorage.setItem("phone", JSON.stringify(phone.value));
  localStorage.setItem("streetName", JSON.stringify(streetName.value));
  localStorage.setItem("streetNumber", JSON.stringify(streetNumber.value));
  localStorage.setItem("districtNumber", JSON.stringify(districtNumber.value));
  localStorage.setItem("city", JSON.stringify(city.value));
  localStorage.setItem("profileImg", JSON.stringify(image.value));
  disableInput.value = true;
};
const onClickedEdit = () => {
  disableInput.value = false;
  valueAvatarCropShow.value = true;
  valueAvatarShow.value = false;
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
        imagePreviewObject.value = image.value;
        imagePreview.value = imagePreviewObject.value;
      }
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
    imagePreviewObject.value = image.value;
    imagePreview.value = imagePreviewObject.value;
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
</script>
