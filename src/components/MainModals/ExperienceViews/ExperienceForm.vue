<template>
  <div class="p-4">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-2 px-0 w-14 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Titel:
          </p>
          <div class="px-2">
            <FormKit v-model="workshop" type="text" placeholder="Workshop" />
          </div>
        </div>
      </div>

      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10 h-24">
          <p
            class="py-2 px-0 w-14 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Text:
          </p>
          <div class="p-2">
            <FormKit
              v-model="description"
              type="textarea"
              placeholder="Beschreibung"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-2 px-0 w-14 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Start:
          </p>
          <div class="px-2">
            <FormKit
              type="date"
              v-model="workshopFrom"
              placeholder="Auswählen"
            />
          </div>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-2 px-0 w-14 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Ende:
          </p>
          <div class="px-2">
            <FormKit
              type="date"
              name="Ende"
              v-model="workshopTo"
              placeholder="Auswählen"
              :validation="[['date_after', workshopFrom]]"
              validation-visibility="live"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="grid flex gap-6 py-10">
    <button
      class="bg-wd-green hover:bg-transparent-green shadow h-24 text-white font-bold"
      @click="saveToLocalStorage()"
      :disabled="buttonDisabled"
    >
      Erfahrung hinzufügen
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { slideDown } from "@/store/store.js";

const workshop = ref(null);
const description = ref(null);
const workshopFrom = ref(null);
const workshopTo = ref(null);
let buttonDisabled = false;

onMounted(() => {
  buttonDisabled = false;
});

const saveToLocalStorage = () => {
  const experience = [
    {
      workshop: workshop.value,
      description: description.value,
      workshopFrom: workshopFrom.value,
      workshopTo: workshopTo.value,
    },
  ];
  if (buttonDisabled == false) {
    buttonDisabled = true;
    if (localStorage.getItem("experiences")) {
      const currentExperiences = JSON.parse(
        localStorage.getItem("experiences")
      );
      const newData = [...currentExperiences, experience];
      localStorage.setItem("experiences", JSON.stringify(newData));
    } else {
      localStorage.setItem("experiences", JSON.stringify([experience]));
    }
    slideDown.value = true;
  }
};
</script>
