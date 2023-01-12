<template>
  <div class="space-y-1">
    <p class="text-black px-1 dark:text-white font-Montserrat text-sm">
      Deine Daten
    </p>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-3 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Titel vor:
          </p>
          <FormKit
            v-model="titelBefore"
            type="text"
            placeholder="Dr."
            :disabled="props.disableInput"
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
            :disabled="props.disableInput"
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
            :disabled="props.disableInput"
          />
        </div>
      </div>

      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-3 px-1 w-32 h-10 text-black dark:text-white font-Montserrat text-xs md:text-sm"
          >
            Titel nach:
          </p>
          <FormKit
            v-model="titelAfter"
            type="text"
            placeholder="BA"
            :disabled="props.disableInput"
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
          <FormKit
            v-model="birthDate"
            type="text"
            placeholder="2000"
            validation="required|length:4"
            :disabled="props.disableInput"
          />
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
            :disabled="props.disableInput"
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
            type="text"
            placeholder="ledig"
            :disabled="props.disableInput"
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
            type="text"
            placeholder="weiblich/männlich/divers"
            :disabled="props.disableInput"
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
            :disabled="props.disableInput"
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
            :disabled="props.disableInput"
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
            :disabled="props.disableInput"
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
            :disabled="props.disableInput"
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
        <div class="flex bg-white dark:bg-slate-800 h-16">
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
              :validation="[['required'], ['matches', /^\d{4}-\d{3}-\d{4}$/]]"
              validation-visibility="live"
              :validation-messages="{
                matches:
                  'Ihre Telephonnumber muss wie folgt formatiert sein: xxxx-xxx-xxxx',
              }"
              :disabled="props.disableInput"
            />
          </div>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-16">
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
              :disabled="props.disableInput"
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
        :disabled="props.disableInput"
      />
    </div>
    <div class="grid flex gap-2 py-10">
      <button
        class="bg-wd-green hover:bg-transparent-green shadow h-14 text-white"
        @click="saveToLocalStorage()"
        v-if="!props.disableInput"
      >
        Speichern
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";
import { slideDown } from "@/store.js";

const props = defineProps({
  disableInput: {
    type: Boolean,
    default: false,
  },
});
const titelBefore = ref(JSON.parse(localStorage.getItem("titelBefore")));
const titelAfter = ref(JSON.parse(localStorage.getItem("titelAfter")));
const firstName = ref(JSON.parse(localStorage.getItem("firstName")));
const secondName = ref(JSON.parse(localStorage.getItem("secondName")));
const birthDate = ref(JSON.parse(localStorage.getItem("birthDate")));
const birthArea = ref(JSON.parse(localStorage.getItem("birthArea")));
const civilStatus = ref(JSON.parse(localStorage.getItem("civilStatus")));
const gender = ref(JSON.parse(localStorage.getItem("gender")));
const email = ref(JSON.parse(localStorage.getItem("email")));
const phone = ref(JSON.parse(localStorage.getItem("phone")));
const streetName = ref(JSON.parse(localStorage.getItem("streetName")));
const streetNumber = ref(JSON.parse(localStorage.getItem("streetNumber")));
const districtNumber = ref(JSON.parse(localStorage.getItem("districtNumber")));
const city = ref(JSON.parse(localStorage.getItem("city")));
const hobbies = ref(JSON.parse(localStorage.getItem("hobbies")));
onMounted(() => {
  slideDown.value = false;
});
const saveToLocalStorage = () => {
  localStorage.setItem("titelBefore", JSON.stringify(titelBefore.value));
  localStorage.setItem("titelAfter", JSON.stringify(titelAfter.value));
  localStorage.setItem("firstName", JSON.stringify(firstName.value));
  localStorage.setItem("secondName", JSON.stringify(secondName.value));
  localStorage.setItem("birthDate", JSON.stringify(birthDate.value));
  localStorage.setItem("birthArea", JSON.stringify(birthArea.value));
  localStorage.setItem("civilStatus", JSON.stringify(civilStatus.value));
  localStorage.setItem("gender", JSON.stringify(gender.value));
  localStorage.setItem("email", JSON.stringify(email.value));
  localStorage.setItem("phone", JSON.stringify(phone.value));
  localStorage.setItem("streetName", JSON.stringify(streetName.value));
  localStorage.setItem("streetNumber", JSON.stringify(streetNumber.value));
  localStorage.setItem("districtNumber", JSON.stringify(districtNumber.value));
  localStorage.setItem("city", JSON.stringify(city.value));
  localStorage.setItem("hobbies", JSON.stringify(hobbies));
  slideDown.value = true;
};
</script>
