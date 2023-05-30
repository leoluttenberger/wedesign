<template>
  <div class="space-y-1">
    <p
      class="text-black px-10 py-2 dark:text-white font-Montserrat text-base font-bold"
    >
      Deine Daten:
    </p>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-10">
          <FormKit
            v-model="titleBefore"
            label="Titel(vor N.):"
            type="text"
            placeholder="Dr."
            :disabled="true"
          />
        </div>
      </div>

      <div class="col-span-2 md:col-span-1">
        <div class="px-10">
          <FormKit
            v-model="titleAfter"
            label="Titel(nach N.):"
            type="text"
            placeholder="BA"
            :disabled="true"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-10">
          <FormKit
            v-model="firstName"
            label="Vorname: *"
            type="text"
            placeholder="Max"
            validation="required|length:3"
            :disabled="true"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-10">
          <FormKit
            v-model="secondName"
            label="Nachname: *"
            type="text"
            placeholder="Mustermann"
            validation="required|length:3"
            :disabled="true"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-10">
          <FormKit
            v-model="birthDate"
            label="Geburtsdatum:"
            type="date"
            :disabled="true"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-10">
          <FormKit
            v-model="birthArea"
            label="Geburtsort:"
            type="text"
            placeholder="Stadt"
            validation="required|length:3"
            :disabled="true"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-10">
          <FormKit
            v-model="civilStatus"
            label="Familienstand:"
            type="select"
            :options="[
              'ledig',
              'verheiratet',
              'geschieden',
              'verwitwet',
              ' getrennt lebend',
            ]"
            placeholder="Auswahl"
            :disabled="true"
            input-class="$reset h-10 bg-white dark:bg-slate-800 text-base dark:text-white"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-10">
          <FormKit
            v-model="gender"
            label="Geschlecht:"
            type="select"
            :options="['weiblich', 'männlich', 'divers']"
            placeholder="Auswahl"
            :disabled="true"
            input-class="$reset h-10 bg-white dark:bg-slate-800 text-base dark:text-white"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-10">
          <FormKit
            v-model="streetName"
            label="Straße:"
            type="text"
            placeholder="Musterstraße"
            :disabled="true"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-10">
          <FormKit
            v-model="streetNumber"
            label="Nr:"
            type="text"
            placeholder="1/1"
            :disabled="true"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-10">
          <FormKit
            v-model="districtNumber"
            label="PLZ:"
            type="text"
            placeholder="1010"
            :disabled="true"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-10">
          <FormKit
            v-model="city"
            label="Ort:"
            type="text"
            placeholder="Musterstadt"
            :disabled="true"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="space-y-1">
    <div class="mt-6">
      <p
        class="px-10 text-black px-1 dark:text-white font-Montserrat text-base font-bold"
      >
        Deine Kontaktdaten
      </p>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-10">
          <FormKit
            v-model="phone"
            label="Telefon:"
            type="text"
            placeholder="xxxx-xxx-xxxx"
            :disabled="true"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-10">
          <FormKit
            v-model="email"
            label="EMail:"
            type="email"
            name="Email"
            validation="length:5|*email"
            validation-visibility="live"
            placeholder="Email"
            :disabled="true"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="space-y-1">
    <div class="mt-6">
      <p
        class="px-10 text-black px-1 dark:text-white font-Montserrat text-base font-bold"
      >
        Sonstiges:
      </p>
    </div>
    <div class="px-10">
      <FormKit
        v-model="hobbies"
        label="Hobbies:"
        type="text"
        placeholder="laufen, schwimmen, tanzen"
        :disabled="true"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { slideDown } from "@/store/store.js";

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
  slideDown.value = false;
  const userInfos = ref(JSON.parse(localStorage.getItem("userInfos")) || []);
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
</script>
