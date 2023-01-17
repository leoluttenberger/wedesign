<template>
  <div class="p-4">
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-1 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md"
        >
          Typ:
        </p>
        <FormKit
          v-model="type"
          type="select"
          :options="['Auswahl', 'HTL', 'AHS', 'HAK', 'HBLA']"
        />
      </div>
    </div>
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-1 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md"
        >
          Schwerpunkt:
        </p>
        <FormKit
          v-model="specialty"
          type="select"
          :options="['Auswahl', 'IT', 'BE', 'Sprachen', 'Wirtschaft']"
        />
      </div>
    </div>
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-1 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md"
        >
          Adresse:
        </p>
        <FormKit
          v-model="address"
          type="text"
          placeholder="PLZ, Ort, Adresse"
        />
      </div>
    </div>
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-1 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md"
        >
          Von:
        </p>
        <FormKit type="date" v-model="educationFrom" placeholder="Auswählen" />
      </div>
    </div>
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-1 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md"
        >
          Bis:
        </p>
        <FormKit
          type="date"
          v-model="educationTo"
          placeholder="Auswählen"
          :validation="[['date_after', educationFrom]]"
          validation-visibility="live"
        />
      </div>
    </div>
  </div>
  <div class="grid flex fixed z-10 inset-x-0 bottom-0">
    <button
      class="bg-wd-green hover:bg-transparent-green shadow h-32 text-white"
      @click="saveToLocalStorage()"
      :disabled="buttonDisabled"
    >
      Ausbildung hinzufügen
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { slideDown } from "@/store.js";
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
      console.log(currentEducations);
      const newData = [...currentEducations, education];
      console.log(newData);
      localStorage.setItem("educations", JSON.stringify(newData));
    } else {
      localStorage.setItem("educations", JSON.stringify([education]));
    }
    slideDown.value = true;
  }
};
</script>
