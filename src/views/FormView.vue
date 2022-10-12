<template>
  <tiptap />
  <vue-avatar
    class="px-2 py-3 max-w-xs"
    :width="270"
    :height="270"
    ref="vueavatar"
    :borderRadius="borderRadius"
    @select-file="onSelectFile($event)"
    v-show="valueAvatarCropShow"
  >
  </vue-avatar>
  <img :src="image" class="px-2 py-3 max-w-xs" v-show="valueAvatarShow" />
  <div class="flex gap-4 px-2 py-3">
    <FormKit type="button" label="Edit" @click="onClickedEdit"></FormKit>
    <FormKit type="button" label="Save" @click="onClickedSave"></FormKit>
  </div>
  <div class="flex-auto px-2 py-3">
    <FormKit
      v-model="fullName"
      type="text"
      label="Voller Name"
      validation="required|length:3"
      :disabled="disableInput"
      :classes="{ input: 'content-center' }"
    />
    <FormKit
      v-model="email"
      type="email"
      label="Email address"
      validation="length:5|*email"
      validation-visibility="live"
      placeholder="Email"
      :disabled="disableInput"
    />
    <FormKit
      v-model="phone"
      type="text"
      label="Phone"
      placeholder="xxxx-xxx-xxxx"
      :validation="[['required'], ['matches', /^\d{4}-\d{3}-\d{4}$/]]"
      validation-visibility="live"
      :validation-messages="{
        matches:
          'Ihre Telephonnumber muss wie folgt formatiert sein: xxxx-xxx-xxxx',
      }"
      :disabled="disableInput"
    />
    <FormKit type="group" label="Adresse">
      <div class="flex gap-4">
        <div class="basis-1/2">
          <FormKit
            v-model="streetName"
            type="text"
            placeholder="Straßenname"
            :disabled="disableInput"
          />
        </div>
        <div class="basis-1/4">
          <FormKit
            v-model="streetNumber"
            type="text"
            placeholder="Straßenummer"
            :disabled="disableInput"
          />
        </div>
        <div class="basis-1/4">
          <FormKit
            v-model="doorNumber"
            type="text"
            placeholder="Tür"
            :disabled="disableInput"
          />
        </div>
      </div>
      <div class="flex gap-4">
        <div class="basis-1/5">
          <FormKit
            v-model="districtNumber"
            type="text"
            placeholder="Bezirk"
            :disabled="disableInput"
          />
        </div>
        <div class="basis-2/5">
          <FormKit
            v-model="city"
            type="text"
            placeholder="Stadt"
            :disabled="disableInput"
          />
        </div>
        <div class="basis-2/5">
          <FormKit
            v-model="country"
            type="text"
            placeholder="Land"
            :disabled="disableInput"
          />
        </div>
      </div>
    </FormKit>
    <FormKit
      v-model="highestSchoolEdu"
      type="text"
      label="Ausbildung"
      placeholder="Schulabschluß"
      :disabled="disableInput"
    />
    <FormKit
      v-model="universityEdu"
      type="text"
      placeholder="Universitätsabschluß"
      :disabled="disableInput"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { VueAvatar } from "vue-avatar-editor-improved";
const MAX_WIDTH = 600;
const MAX_HEIGHT = 600;
const MIME_TYPE = "image/png";
const QUALITY = 0.9;
const fileSelected = ref(false);
const disableInput = ref(true);
const fullName = ref(JSON.parse(localStorage.getItem("fullName")));
const email = ref(JSON.parse(localStorage.getItem("email")));
const phone = ref(JSON.parse(localStorage.getItem("phone")));
const streetName = ref(JSON.parse(localStorage.getItem("streetName")));
const streetNumber = ref(JSON.parse(localStorage.getItem("streetNumber")));
const doorNumber = ref(JSON.parse(localStorage.getItem("doorNumber")));
const districtNumber = ref(JSON.parse(localStorage.getItem("districtNumber")));
const city = ref(JSON.parse(localStorage.getItem("city")));
const country = ref(JSON.parse(localStorage.getItem("country")));
const highestSchoolEdu = ref(
  JSON.parse(localStorage.getItem("highestSchoolEdu"))
);
const universityEdu = ref(JSON.parse(localStorage.getItem("universityEdu")));
let image = ref(JSON.parse(localStorage.getItem("profileImg")));
const borderRadius = 200;
const valueAvatarShow = ref(true);
const valueAvatarCropShow = ref(false);
const vueavatar = ref(null);

const onClickedSave = () => {
  valueAvatarCropShow.value = false;
  valueAvatarShow.value = true;
  localStorage.setItem("fullName", JSON.stringify(fullName.value));
  localStorage.setItem("email", JSON.stringify(email.value));
  localStorage.setItem("phone", JSON.stringify(phone.value));
  localStorage.setItem("streetName", JSON.stringify(streetName.value));
  localStorage.setItem("streetNumber", JSON.stringify(streetNumber.value));
  localStorage.setItem("doorNumber", JSON.stringify(doorNumber.value));
  localStorage.setItem("districtNumber", JSON.stringify(districtNumber.value));
  localStorage.setItem("city", JSON.stringify(city.value));
  localStorage.setItem("country", JSON.stringify(country.value));
  localStorage.setItem(
    "highestSchoolEdu",
    JSON.stringify(highestSchoolEdu.value)
  );
  localStorage.setItem("universityEdu", JSON.stringify(universityEdu));
  disableInput.value = true;
  if (fileSelected.value == true) {
    const reader = new Image();
    reader.src = image.value;
    const cropRect = vueavatar.value.getCroppingRect();
    cropRect.x *= MAX_WIDTH;
    cropRect.y *= MAX_HEIGHT;
    if (cropRect.width == 1) {
      cropRect.width = cropRect.height;
    }
    if (cropRect.height == 1) {
      cropRect.height = cropRect.width;
    }
    cropRect.width *= MAX_WIDTH;
    cropRect.height *= MAX_HEIGHT;
    const canvas = document.createElement("canvas");
    canvas.width = cropRect.width;
    canvas.height = cropRect.height;
    canvas.getContext("2d").drawImage(reader, -cropRect.x, -cropRect.y);
    image.value = canvas.toDataURL();
    localStorage.setItem("profileImg", JSON.stringify(image.value));
    console.log(JSON.stringify(image.value));
    console.log(new Blob(Object.values(localStorage)).size / 1024 + " KB");
  } else {
    image.value = vueavatar.value.getImage();
  }
  console.log("input disabled");
  fileSelected.value = false;
};
const onClickedEdit = () => {
  disableInput.value = false;
  valueAvatarCropShow.value = true;
  valueAvatarShow.value = false;
  console.log("input enabled");
};
const createBlogImage = (fileObject) => {
  const blobURL = URL.createObjectURL(fileObject);
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
const onSelectFile = (file) => {
  console.log("here is your file");
  createBlogImage(file[0]);
  fileSelected.value = true;
};
</script>
