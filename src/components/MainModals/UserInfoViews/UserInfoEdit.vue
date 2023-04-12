<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen">
    <div class="grid grid-cols-3 gap-20 p-2 place-items-center">
      <button type="button" @click="closeModal()" class="p-4">
        <BackIcon
          class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
        ></BackIcon>
      </button>
      <p
        class="text-black px-2 dark:text-white font-Montserrat text-xl p-4 font-bold"
      >
        Lebenslauf
      </p>
      <button type="button" @click="saveToLocalStorage()" class="p-4">
        <CheckIcon
          class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
        ></CheckIcon>
      </button>
    </div>
    <div class="space-y-1">
      <p
        class="text-black px-1 py-2 dark:text-white font-Montserrat text-sm font-bold"
      >
        Deine Daten:
      </p>
      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-10">
            <p
              class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
            >
              Titel(vor N.):
            </p>
            <div class="px-2">
              <FormKit
                v-model="titleBefore"
                type="text"
                placeholder="Dr."
                :disabled="false"
              />
            </div>
          </div>
        </div>

        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-10">
            <p
              class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
            >
              Titel(nach N.):
            </p>
            <div class="px-2">
              <FormKit
                v-model="titleAfter"
                type="text"
                placeholder="BA"
                :disabled="false"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-10">
            <p
              class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
            >
              Vorname:
            </p>
            <div class="px-2">
              <FormKit
                v-model="firstName"
                type="text"
                placeholder="Max"
                validation="required|length:3"
                :disabled="false"
              />
            </div>
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-10">
            <p
              class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
            >
              Nachname:
            </p>
            <div class="px-2">
              <FormKit
                v-model="secondName"
                type="text"
                placeholder="Mustermann"
                validation="required|length:3"
                :disabled="false"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-10">
            <p
              class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
            >
              Geburtsdatum:
            </p>
            <div class="px-2">
              <FormKit v-model="birthDate" type="date" :disabled="false" />
            </div>
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-10">
            <p
              class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
            >
              Geburtsort:
            </p>
            <div class="px-2">
              <FormKit
                v-model="birthArea"
                type="text"
                placeholder="Stadt"
                validation="required|length:3"
                :disabled="false"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-10">
            <p
              class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
            >
              Familienstand:
            </p>
            <div class="px-2">
              <FormKit
                v-model="civilStatus"
                type="select"
                :options="[
                  'ledig',
                  'verheiratet',
                  'geschieden',
                  'verwitwet',
                  ' getrennt lebend',
                ]"
                placeholder="Auswahl"
                :disabled="false"
              />
            </div>
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-10">
            <p
              class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
            >
              Geschlecht:
            </p>
            <div class="px-2">
              <FormKit
                v-model="gender"
                type="select"
                :options="['weiblich', 'männlich', 'divers']"
                placeholder="Auswahl"
                :disabled="false"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-10">
            <p
              class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
            >
              Straße:
            </p>
            <div class="px-2">
              <FormKit
                v-model="streetName"
                type="text"
                placeholder="Musterstraße"
                :disabled="false"
              />
            </div>
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-10">
            <p
              class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
            >
              Nr:
            </p>
            <div class="px-2">
              <FormKit
                v-model="streetNumber"
                type="text"
                placeholder="1/1"
                :disabled="false"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 dark:bg-slate-800 h-10">
            <p
              class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
            >
              PLZ:
            </p>
            <div class="px-2">
              <FormKit
                v-model="districtNumber"
                type="text"
                placeholder="1010"
                :disabled="false"
              />
            </div>
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-10">
            <p
              class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
            >
              Ort:
            </p>
            <div class="px-2">
              <FormKit
                v-model="city"
                type="text"
                placeholder="Muserstadt"
                :disabled="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="space-y-1">
      <div class="mt-6">
        <p
          class="text-black px-1 dark:text-white font-Montserrat text-sm font-bold"
        >
          Deine Kontaktdaten
        </p>
      </div>
      <div class="grid grid-cols-2 gap-1">
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-10">
            <p
              class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
            >
              Telefon:
            </p>
            <div class="px-2">
              <FormKit
                v-model="phone"
                type="text"
                placeholder="xxxx-xxx-xxxx"
                :disabled="false"
              />
            </div>
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-10">
            <p
              class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
            >
              EMail:
            </p>
            <div class="px-2">
              <FormKit
                v-model="email"
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
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
        >
          Hobbies:
        </p>
        <div class="px-2">
          <FormKit
            v-model="hobbies"
            type="text"
            placeholder="laufen, schwimmen, tanzen"
            :disabled="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { slideDownUserInfo } from "@/store/store.js";
import BackIcon from "@/assets/icons/BackIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";

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
onMounted(() => {
  slideDownUserInfo.value = false;
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

  slideDownUserInfo.value = true;
};
const closeModal = () => {
  slideDownUserInfo.value = true;
};
</script>
