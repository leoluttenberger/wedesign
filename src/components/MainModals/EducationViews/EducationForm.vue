<template>
  <div class="p-4">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Typ:
          </p>
          <div class="px-2">
            <FormKit
              v-model="type"
              type="select"
              placeholder="Auswahl"
              :options="['Mittelschule', 'Lehre', 'HTL', 'AHS', 'HAK', 'HBLA']"
            />
          </div>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Schwerpunkt:
          </p>
          <div class="px-2">
            <FormKit
              v-model="specialty"
              type="text"
              placeholder="zB. Sprachen, BE, IT"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
        >
          Adresse:
        </p>
        <div class="px-2">
          <FormKit
            v-model="address"
            type="text"
            placeholder="PLZ, Ort, Adresse"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Start:
          </p>
          <div class="px-2">
            <FormKit
              type="date"
              name="Start"
              v-model="educationFrom"
              placeholder="Auswählen"
            />
          </div>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Ende:
          </p>
          <div class="px-2">
            <FormKit
              type="date"
              name="Ende"
              v-model="educationTo"
              placeholder="Auswählen"
              :validation="[['date_after', educationFrom]]"
              validation-visibility="live"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="group flex bottom-10 pt-4 items-end justify-end">
    <button
      class="bg-wd-green hover:bg-transparent-green shadow h-24 w-screen text-white font-bold"
      @click="saveToLocalStorage()"
      :disabled="buttonDisabled"
    >
      Ausbildung hinzufügen
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { slideDown } from "@/store/store.js";

const type = ref(null);
const specialty = ref(null);
const address = ref(null);
const educationFrom = ref(null);
const educationTo = ref(null);
let buttonDisabled = false;

onMounted(() => {
  buttonDisabled = false;
});

const saveToLocalStorage = () => {
  const education = [
    {
      type: type.value,
      specialty: specialty.value,
      address: address.value,
      educationFrom: educationFrom.value,
      educationTo: educationTo.value,
    },
  ];
  if (buttonDisabled == false) {
    buttonDisabled = true;
    if (localStorage.getItem("educations")) {
      const currentEducations = JSON.parse(localStorage.getItem("educations"));
      const newData = [...currentEducations, education];
      localStorage.setItem("educations", JSON.stringify(newData));
    } else {
      localStorage.setItem("educations", JSON.stringify([education]));
    }
    slideDown.value = true;
  }
};
</script>
