<template>
  <div class="grid place-items-center h-screen">
    <div class="flex flex-row">
      <div class="flex flex-col">
        <img :src="image" class="uploading-image" />
        <FormKit
          @change="handleImage"
          type="file"
          label="Profil Bild"
          accept=".jpg,.png"
          single
        />
        <FormKit type="button" label="Edit" @click="onClickedEdit"></FormKit>
        <FormKit type="button" label="Save" @click="onClickedSave"></FormKit>
      </div>
      <div class="flex-auto">
        <FormKit
          v-model="fullName"
          type="text"
          label="Fullname"
          validation="required|length:3"
          :disabled="disableInput"
          help="Enter your full name."
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
            matches: 'Phone number must be formatted: xxxx-xxx-xxxx',
          }"
          :disabled="disableInput"
        />
        <FormKit
          v-model="streetName"
          type="text"
          placeholder="Straßenname"
          :disabled="disableInput"
        />
        <FormKit
          v-model="streetNumber"
          type="text"
          placeholder="Straßenummer"
          :disabled="disableInput"
        />
        <FormKit
          v-model="doorNumber"
          type="text"
          placeholder="Tür"
          :disabled="disableInput"
        />
        <FormKit
          v-model="districtNumber"
          type="text"
          placeholder="Bezirk"
          :disabled="disableInput"
        />
        <FormKit
          v-model="city"
          type="text"
          placeholder="Stadt"
          :disabled="disableInput"
        />
        <FormKit
          v-model="country"
          type="text"
          placeholder="Land"
          :disabled="disableInput"
        />
        <FormKit
          v-model="highestSchoolEdu"
          type="text"
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
    </div>
  </div>
</template>
<script>
const MAX_WIDTH = 600;
const MAX_HEIGHT = 600;
const MIME_TYPE = "image/png";
const QUALITY = 0.9;
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
    };
  },
  methods: {
    async onClickedSave() {
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
      console.log("input disabled");
    },
    async onClickedEdit() {
      this.disableInput = false;
      console.log("input enabled");
    },
    handleImage(event) {
      const selectedImage = event.target.files[0];
      //this.createBase64Image(selectedImage);
      this.createBlogImage(selectedImage);
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
  },
};
</script>
<style>
.uploading-image {
  width: 10rem;
  padding: 10px;
  position: center;
}
</style>
