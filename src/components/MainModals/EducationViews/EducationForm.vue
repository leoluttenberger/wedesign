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
              type="text"
              placeholder="Lehre, HTL, AHS, HAK, ..."
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
            placeholder="Straße Nr., PLZ"
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
            Ende: *
          </p>
          <div class="px-2" v-if="!checked">
            <FormKit
              type="date"
              name="Ende"
              v-model="educationTo"
              placeholder="Auswählen"
              :validation="[['required'], ['date_after', educationFrom]]"
              validation-visibility="live"
              :disabled="checked"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex items-center py-2 px-">
          <input
            id="ongoing"
            v-model="checked"
            type="checkbox"
            value="ongoing"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="ongoing"
            class="px-2 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
            >laufend</label
          >
        </div>
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Anmerkungen:
          </p>

          <div class="flex bg-white dark:bg-slate-800 h-10">
            <div class="p-2">
              <FormKit
                type="textarea"
                v-model="note"
                placeholder="Wichtige Informationen"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="grid flex gap-2 p-2">
    <button
      class="bg-wd-green shadow rounded-md h-16 w-full text-white font-bold"
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
const checked = ref(false);
const note = ref(null);

onMounted(() => {
  buttonDisabled = false;
  checked.value = false;
});

const saveToLocalStorage = () => {
  const education = [
    {
      type: type.value,
      specialty: specialty.value,
      address: address.value,
      educationFrom: educationFrom.value,
      educationTo: educationTo.value,
      ongoing: checked.value,
      note: note.value,
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
