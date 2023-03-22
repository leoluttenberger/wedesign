<template>
  <div class="space-y-1">
    <p
      class="text-black px-1 py-2 dark:text-white font-Montserrat text-sm font-bold"
    >
      Deine Daten
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
              :disabled="true"
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
              :disabled="true"
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
              :disabled="true"
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
              :disabled="true"
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
            <FormKit v-model="birthDate" type="date" :disabled="true" />
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
              :disabled="true"
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
              :disabled="true"
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
              :disabled="true"
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
              :disabled="true"
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
              :disabled="true"
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
              :disabled="true"
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
              :disabled="true"
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
          <FormKit
            v-model="phone"
            type="text"
            placeholder="xxxx-xxx-xxxx"
            :disabled="true"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
          >
            EMail:
          </p>
          <FormKit
            v-model="email"
            type="email"
            validation="length:5|*email"
            validation-visibility="live"
            placeholder="Email"
            :disabled="true"
          />
        </div>
      </div>
    </div>
    <div class="flex bg-white dark:bg-slate-800 h-10">
      <p
        class="py-3 px-1 w-36 h-10 text-black dark:text-white font-Montserrat text-base md:text-sm font-bold"
      >
        Hobbies:
      </p>
      <FormKit
        v-model="hobbies"
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
  const userInfos = ref(JSON.parse(localStorage.getItem("userInfos")));
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
