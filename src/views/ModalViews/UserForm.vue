<template>
  <div class="space-y-1">
    <p class="text-black px-1 py-2 dark:text-white font-Montserrat text-sm">
      Deine Daten
    </p>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-3 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Vortitel:
          </p>
          <FormKit
            v-model="titleBefore"
            type="text"
            placeholder="Dr."
            :disabled="false"
          />
        </div>
      </div>

      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-3 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Vorname:
          </p>
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
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-3 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Nachname:
          </p>
          <FormKit
            v-model="secondName"
            type="text"
            placeholder="Mustermann"
            validation="required|length:3"
            :disabled="false"
          />
        </div>
      </div>

      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-3 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Nachtitel:
          </p>
          <FormKit
            v-model="titleAfter"
            type="text"
            placeholder="BA"
            :disabled="false"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-3 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Geburtsdatum:
          </p>
          <FormKit v-model="birthDate" type="date" :disabled="false" />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-3 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Geburtsort:
          </p>
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

    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-3 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Familienstand:
          </p>
          <FormKit
            v-model="civilStatus"
            type="select"
            :options="['Auswahl', 'ledig', 'verheiratet', 'sonstig']"
            placeholder="ledig"
            :disabled="false"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-3 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Geschlecht:
          </p>
          <FormKit
            v-model="gender"
            type="select"
            :options="['Auswahl', 'weiblich', 'männlich', 'divers']"
            placeholder="weiblich"
            :disabled="false"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-3 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Straße:
          </p>
          <FormKit
            v-model="streetName"
            type="text"
            placeholder="Musterstraße"
            :disabled="false"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-3 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Nr:
          </p>
          <FormKit
            v-model="streetNumber"
            type="text"
            placeholder="1/1"
            :disabled="false"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 dark:bg-slate-800 h-10">
          <p
            class="py-3 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            PLZ:
          </p>
          <FormKit
            v-model="districtNumber"
            type="text"
            placeholder="1010"
            :disabled="false"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-3 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Ort:
          </p>
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
  <div class="space-y-1">
    <div class="mt-6">
      <p class="text-black px-1 dark:text-white font-Montserrat text-sm">
        Deine Kontaktdaten
      </p>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-5 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Telefon:
          </p>
          <div class="py-3">
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
            class="py-5 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            EMail:
          </p>
          <div class="py-3">
            <FormKit
              v-model="email"
              type="email"
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
        class="py-3 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
      >
        Hobbies:
      </p>
      <FormKit
        v-model="hobbies"
        type="text"
        placeholder="laufen, schwimmen, tanzen"
        :disabled="false"
      />
    </div>
  </div>
  <button
    class="bg-wd-green hover:bg-transparent-green shadow h-14 text-white py-2"
    @click="saveToLocalStorage"
  >
    Speichern
  </button>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { slideDown } from "@/store.js";
const userInfos = ref(JSON.parse(localStorage.getItem("userInfos")));
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
        streetNumber: streetNumber,
        districtNumber: districtNumber,
        city: city.value,
        hobbies: hobbies.value,
      },
    ];
    localStorage.setItem("userInfos", JSON.stringify([defaultUserInfos]));
  }

  slideDown.value = true;
};
</script>
