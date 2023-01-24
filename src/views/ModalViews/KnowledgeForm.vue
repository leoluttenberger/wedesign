<template>
  <div class="p-4">
    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-base md:text-md"
        >
          Kenntnisse:
        </p>
        <FormKit
          v-model="type"
          type="select"
          placeholder="Auswahl"
          :options="['Sprachkenntnisse', 'Sonstige Kenntnisse']"
        />
      </div>
    </div>

    <div v-if="type === 'Sonstige Kenntnisse'">
      <FormKit
        v-model="diversKnowledge"
        type="text"
        placeholder="z.B. Führerschein, Office etc."
      />
    </div>
    <div v-if="type === 'Sprachkenntnisse'">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-base md:text-md"
          >
            Sprache:
          </p>
          <div class="px-0">
            <FormKit
              v-model="languageKnowledge"
              type="text"
              placeholder="z.B. Englisch, Deutsch etc."
            />
          </div>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-base md:text-md"
          >
            Level:
          </p>
          <FormKit
            v-model="languageLevel"
            type="select"
            :options="[
              'Basiskenntnisse',
              'Fortgeschritten',
              'Fließend',
              'Muttersprache',
            ]"
            placeholder="Auswahl"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="grid flex gap-6 py-10">
    <button
      class="bg-wd-green hover:bg-transparent-green shadow h-24 text-white"
      @click="saveToLocalStorage()"
      :disabled="buttonDisabled"
    >
      Erfahrung hinzufügen
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { slideDown } from "@/store.js";
const type = ref(null);
const diversKnowledge = ref(null);
const languageKnowledge = ref(null);
const languageLevel = ref(null);
let buttonDisabled = false;

onMounted(() => {
  buttonDisabled = false;
});

const saveToLocalStorage = () => {
  const knowledge = [
    {
      type: type.value,
      diversKnowledge: diversKnowledge.value,
      languageKnowledge: languageKnowledge.value,
      languageLevel: languageLevel.value,
    },
  ];
  if (buttonDisabled == false) {
    buttonDisabled = true;
    if (localStorage.getItem("knowledges")) {
      const currentknowledges = JSON.parse(localStorage.getItem("knowledges"));
      const newData = [...currentknowledges, knowledge];
      console.log(newData);
      localStorage.setItem("knowledges", JSON.stringify(newData));
    } else {
      localStorage.setItem("knowledges", JSON.stringify([knowledge]));
    }
    slideDown.value = true;
  }
};
</script>
