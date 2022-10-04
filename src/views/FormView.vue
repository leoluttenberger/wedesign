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
<script>
const MAX_WIDTH = 600;
const MAX_HEIGHT = 600;
const MIME_TYPE = "image/png";
const QUALITY = 0.9;
var fileSelected = false;
import { VueAvatar } from "vue-avatar-editor-improved";
export default {
  data() {
    return {
      disableInput: true,
      fullName: JSON.parse(localStorage.getItem("fullName")),
      email: JSON.parse(localStorage.getItem("email")),
      phone: JSON.parse(localStorage.getItem("phone")),
      streetName: JSON.parse(localStorage.getItem("streetName")),
      streetNumber: JSON.parse(localStorage.getItem("streetNumber")),
      doorNumber: JSON.parse(localStorage.getItem("doorNumber")),
      districtNumber: JSON.parse(localStorage.getItem("districtNumber")),
      city: JSON.parse(localStorage.getItem("city")),
      country: JSON.parse(localStorage.getItem("country")),
      highestSchoolEdu: JSON.parse(localStorage.getItem("highestSchoolEdu")),
      universityEdu: JSON.parse(localStorage.getItem("universityEdu")),
      image: JSON.parse(localStorage.getItem("profileImg")),
      borderRadius: 200,
      valueAvatarShow: true,
      valueAvatarCropShow: false,
    };
  },
  components: {
    VueAvatar,
  },
  methods: {
    async onClickedSave() {
      this.valueAvatarCropShow = false;
      this.valueAvatarShow = true;
      localStorage.setItem("fullName", JSON.stringify(this.fullName));
      localStorage.setItem("email", JSON.stringify(this.email));
      localStorage.setItem("phone", JSON.stringify(this.phone));
      localStorage.setItem("streetName", JSON.stringify(this.streetName));
      localStorage.setItem("streetNumber", JSON.stringify(this.streetNumber));
      localStorage.setItem("doorNumber", JSON.stringify(this.doorNumber));
      localStorage.setItem(
        "districtNumber",
        JSON.stringify(this.districtNumber)
      );
      localStorage.setItem("city", JSON.stringify(this.city));
      localStorage.setItem("country", JSON.stringify(this.country));
      localStorage.setItem(
        "highestSchoolEdu",
        JSON.stringify(this.highestSchoolEdu)
      );
      localStorage.setItem("universityEdu", JSON.stringify(this.universityEdu));
      this.disableInput = true;
      if (this.fileSelected == true) {
        const reader = new Image();
        reader.src = this.image;
        const cropRect = this.$refs.vueavatar.getCroppingRect();
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
        this.image = canvas.toDataURL();
        localStorage.setItem("profileImg", JSON.stringify(this.image));
        console.log(JSON.parse(localStorage.getItem("profileImg")));
        console.log(JSON.stringify(this.image));
        console.log(new Blob(Object.values(localStorage)).size / 1024 + " KB");
      } else {
        var img = this.$refs.vueavatar.getImage();
      }
      console.log("input disabled");
      this.fileSelected = false;
    },
    async onClickedEdit() {
      this.disableInput = false;
      this.valueAvatarCropShow = true;
      this.valueAvatarShow = false;
      console.log("input enabled");
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.image = event.target.result;
        localStorage.setItem("profileImg", JSON.stringify(this.image));
        console.log(JSON.parse(localStorage.getItem("profileImg")));
        console.log(JSON.stringify(this.image));
        console.log(new Blob(Object.values(localStorage)).size / 1024 + " KB");
      };
      reader.readAsDataURL(fileObject);
    },
    createBlogImage(fileObject) {
      const blobURL = URL.createObjectURL(fileObject);
      const reader = new Image();
      reader.src = blobURL;
      reader.onload = () => {
        URL.revokeObjectURL(this.src);
        const [newWidth, newHeight] = this.calculateSize(
          reader,
          MAX_WIDTH,
          MAX_HEIGHT
        );
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
        this.image = canvas.toDataURL();
        localStorage.setItem("profileImg", JSON.stringify(this.image));
        console.log(JSON.parse(localStorage.getItem("profileImg")));
        console.log(JSON.stringify(this.image));
        console.log(new Blob(Object.values(localStorage)).size / 1024 + " KB");
      };
    },
    calculateSize(img, maxWidth, maxHeight) {
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
    },
    onSelectFile(file) {
      console.log("here is your file");
      this.createBlogImage(file[0]);
      this.fileSelected = true;
    },
  },
};
</script>
