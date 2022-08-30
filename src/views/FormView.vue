<template>
  <div>
    <p>Bild</p>
    <img :src="image" class="uploading-image" />
    <input
      @change="handleImage"
      class="custom-input"
      type="file"
      accept="image/*"
    />
    <p>Vorname</p>
    <input
      v-model="firstName"
      type="text"
      placeholder="Vorname"
      :disabled="disableInput"
    />
    <button @click="onClickedEdit">Edit</button>
    <button @click="onClickedSave">Save</button>
    <p>Nachname</p>
    <input
      v-model="secondName"
      type="text"
      placeholder="Nachname"
      :disabled="disableInput"
    />
    <p>Kontakt</p>
    <input
      v-model="email"
      type="text"
      placeholder="Email"
      :disabled="disableInput"
    />
    <input
      v-model="phone"
      type="text"
      placeholder="Mobilnummer"
      :disabled="disableInput"
    />
    <p>Addresse</p>
    <input
      v-model="streetName"
      type="text"
      placeholder="Straßenname"
      :disabled="disableInput"
    />
    <input
      v-model="streetNumber"
      type="text"
      placeholder="Straßenummer"
      :disabled="disableInput"
    />
    <input
      v-model="doorNumber"
      type="text"
      placeholder="Tür"
      :disabled="disableInput"
    />
    <input
      v-model="districtNumber"
      type="text"
      placeholder="Bezirk"
      :disabled="disableInput"
    />
    <input
      v-model="city"
      type="text"
      placeholder="Stadt"
      :disabled="disableInput"
    />
    <input
      v-model="country"
      type="text"
      placeholder="Land"
      :disabled="disableInput"
    />
    <p>Ausbildung</p>
    <input
      v-model="highestSchoolEdu"
      type="text"
      placeholder="Schulabschluß"
      :disabled="disableInput"
    />
    <input
      v-model="universityEdu"
      type="text"
      placeholder="Universitätsabschluß"
      :disabled="disableInput"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      disableInput: true,
      firstName: JSON.parse(localStorage.getItem("firstName")),
      secondName: JSON.parse(localStorage.getItem("secondName")),
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
  mounted() {
    console.log(new Blob(Object.values(localStorage)).size / 1024 + " KB");
  },
  methods: {
    async onClickedSave() {
      localStorage.setItem("firstName", JSON.stringify(this.firstName));
      localStorage.setItem("secondName", JSON.stringify(this.secondName));
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
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.image = event.target.result;
        localStorage.setItem("profileImg", JSON.stringify(this.image));
        console.log(JSON.parse(localStorage.getItem("profileImg")));
        console.log(JSON.stringify(this.image));
      };
      reader.readAsDataURL(fileObject);
    },
  },
};
</script>
<style>
.uploading-image {
  width: 10rem;
}
</style>
