<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen">
    <div class="grid grid-cols-3 gap-20 p-2 place-items-center">
      <button type="button" @click="openQueryModal()" class="p-4">
        <BackIcon
          class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
        ></BackIcon>
      </button>
      <p
        class="text-black px-2 dark:text-white font-Montserrat text-xl p-4 font-bold"
      >
        Lebenslauf
      </p>
      <button type="button" @click="closeAfterSave()" class="p-4">
        <CheckIcon
          class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
        ></CheckIcon>
      </button>
    </div>
    <div class="space-y-1">
      <p
        class="text-black px-1 py-2 dark:text-white font-Montserrat text-base font-bold"
      >
        Deine Daten:
      </p>
      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="titleBefore"
              label="Titel(vor N.):"
              type="text"
              placeholder="Dr."
              :disabled="false"
            />
          </div>
        </div>

        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="titleAfter"
              label="Titel(nach N.):"
              type="text"
              placeholder="BA"
              :disabled="false"
            />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="firstName"
              label="Vorname: *"
              type="text"
              placeholder="Max"
              validation="required|length:3"
              :disabled="false"
            />
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="secondName"
              label="Nachname: *"
              type="text"
              placeholder="Mustermann"
              validation="required|length:3"
              :disabled="false"
            />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="birthDate"
              label="Geburtsdatum:"
              type="date"
              :disabled="false"
            />
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="birthArea"
              label="Geburtsort:"
              type="text"
              placeholder="Stadt"
              validation="required|length:3"
              :disabled="false"
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="civilStatus"
              label="Familienstand:"
              type="select"
              :options="[
                'ledig',
                'verheiratet',
                'geschieden',
                'verwitwet',
                'getrennt lebend',
                'verpartnert',
              ]"
              placeholder="Auswahl"
              :disabled="false"
            />
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="gender"
              label="Geschlecht:"
              type="select"
              :options="['weiblich', 'männlich', 'divers']"
              placeholder="Auswahl"
              :disabled="false"
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="streetName"
              label="Straße:"
              type="text"
              placeholder="Musterstraße"
              :disabled="false"
            />
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="streetNumber"
              label="Nr:"
              type="text"
              placeholder="1/1"
              :disabled="false"
            />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="districtNumber"
              label="PLZ:"
              type="text"
              placeholder="1010"
              :disabled="false"
            />
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="city"
              label="Ort:"
              type="text"
              placeholder="Musterstadt"
              :disabled="false"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="space-y-1">
      <div class="mt-6">
        <p
          class="px-2 text-black px-1 dark:text-white font-Montserrat text-base font-bold"
        >
          Deine Kontaktdaten
        </p>
      </div>
      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="phone"
              label="Telefon:"
              type="text"
              placeholder="xxxx-xxx-xxxx"
              :disabled="false"
            />
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="email"
              label="EMail:"
              type="email"
              name="Email"
              validation="length:5|*email"
              validation-visibility="live"
              placeholder="Email"
              :disabled="false"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="space-y-1">
      <div class="mt-6">
        <p
          class="px-2 text-black px-1 dark:text-white font-Montserrat text-base font-bold"
        >
          Sonstiges:
        </p>
      </div>
      <div class="px-2">
        <FormKit
          v-model="hobbies"
          label="Hobbies:"
          type="text"
          placeholder="laufen, schwimmen, tanzen"
          :disabled="false"
        />
      </div>
    </div>
  </div>
  <CropModal :show="showModal">
    <div class="place-items-center">
      <div class="text-white text-xl p-2">Schließen?</div>
      <div class="text-white font-Montserrat text-base font-bold pb-2">
        <p>
          Bist du wirklich sicher, dass du das Fenster schließen willst ohne zu
          speichern?
        </p>
      </div>
    </div>

    <div
      class="flex justify-evenly text-white font-Montserrat text-base font-bold h-10"
    >
      <button
        type="button"
        @click="returnToEdit()"
        class="bg-wd-error w-screen"
      >
        Nein
      </button>

      <button type="button" @click="closeModal()" class="bg-wd-green w-screen">
        Ja
      </button>
    </div>
  </CropModal>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { slideDownUserInfo } from "@/store/store.js";
import BackIcon from "@/assets/icons/BackIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const userInfos = ref(JSON.parse(localStorage.getItem("userInfos")) || []);
const titleBefore = ref(null);
const titleAfter = ref(null);
const firstName = ref(null);
const secondName = ref(null);
const birthDate = ref(null);
const birthArea = ref(null);
const civilStatus = ref(null);
const gender = ref(null);
const email = ref(null);
const phone = ref(null);
const streetName = ref(null);
const streetNumber = ref(null);
const districtNumber = ref(null);
const city = ref(null);
const hobbies = ref(null);
const showModal = ref(false);

onMounted(() => {
  slideDownUserInfo.value = false;
  showModal.value = false;
  if (localStorage.getItem("userInfos")) {
    titleBefore.value = userInfos.value[0][0].titleBefore;
    titleAfter.value = userInfos.value[0][0].titleAfter;
    firstName.value = userInfos.value[0][0].firstName;
    secondName.value = userInfos.value[0][0].secondName;
    birthDate.value = userInfos.value[0][0].birthDate;
    birthArea.value = userInfos.value[0][0].birthArea;
    civilStatus.value = userInfos.value[0][0].civilStatus;
    gender.value = userInfos.value[0][0].gender;
    email.value = userInfos.value[0][0].email;
    phone.value = userInfos.value[0][0].phone;
    streetName.value = userInfos.value[0][0].streetName;
    streetNumber.value = userInfos.value[0][0].streetNumber;
    districtNumber.value = userInfos.value[0][0].districtNumber;
    city.value = userInfos.value[0][0].city;
    hobbies.value = userInfos.value[0][0].hobbies;
  }
});

const saveToLocalStorage = () => {
  let formCheck = false;
  if (firstName.value.length >= 3 && secondName.value.length >= 3) {
    formCheck = true;
  }
  if (formCheck) {
    if (localStorage.getItem("userInfos")) {
      userInfos.value[0][0].titleBefore = titleBefore.value;
      userInfos.value[0][0].titleAfter = titleAfter.value;
      userInfos.value[0][0].firstName = firstName.value;
      userInfos.value[0][0].secondName = secondName.value;
      userInfos.value[0][0].birthDate = birthDate.value;
      userInfos.value[0][0].birthArea = birthArea.value;
      userInfos.value[0][0].civilStatus = civilStatus.value;
      userInfos.value[0][0].gender = gender.value;
      userInfos.value[0][0].email = email.value;
      userInfos.value[0][0].phone = phone.value;
      userInfos.value[0][0].streetName = streetName.value;
      userInfos.value[0][0].streetNumber = streetNumber.value;
      userInfos.value[0][0].districtNumber = districtNumber.value;
      userInfos.value[0][0].city = city.value;
      userInfos.value[0][0].hobbies = hobbies.value;
      localStorage.setItem("userInfos", JSON.stringify(userInfos.value));
    } else {
      console.log("userinfo new save");
      const defaultUserInfos = [
        {
          titleBefore: titleBefore.value,
          firstName: firstName.value,
          secondName: secondName.value,
          titleAfter: titleAfter.value,
          birthDate: birthDate.value,
          birthArea: birthArea.value,
          civilStatus: civilStatus.value,
          gender: gender.value,
          email: email.value,
          phone: phone.value,
          streetName: streetName.value,
          streetNumber: streetNumber.value,
          districtNumber: districtNumber.value,
          city: city.value,
          hobbies: hobbies.value,
        },
      ];
      localStorage.setItem("userInfos", JSON.stringify([defaultUserInfos]));
    }
  } else {
    errorMessage();
  }
};
const closeModal = () => {
  slideDownUserInfo.value = true;
};
const errorMessage = () => {
  createToast("Du hast nicht alle Felder richtig ausgefüllt.", {
    type: "danger",
    position: "bottom-center",
  });
};
const returnToEdit = () => {
  showModal.value = false;
};

const openQueryModal = () => {
  showModal.value = true;
};
const closeAfterSave = () => {
  saveToLocalStorage();
  slideDownUserInfo.value = true;
};
</script>
