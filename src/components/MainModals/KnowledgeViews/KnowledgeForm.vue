<template>
  <div class="px-2">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            v-model="type"
            label="Kenntnisse: "
            type="select"
            placeholder="Auswahl"
            :options="['Sprachkenntnisse', 'Sonstige Kenntnisse']"
            label-class="$reset text-base text-black dark:text-white"
            input-class="$reset h-10 bg-white dark:bg-slate-800 text-base dark:text-white"
          />
        </div>
      </div>

      <div v-if="type === 'Sonstige Kenntnisse'">
        <div class="px-2">
          <FormKit
            v-model="diversKnowledge"
            label="Sonstige Kenntnisse"
            type="text"
            placeholder="z.B. Führerschein, Office etc."
          />
        </div>
      </div>
      <div v-if="type === 'Sprachkenntnisse'">
        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="languageKnowledge"
              label="Sprache: "
              type="text"
              placeholder="z.B. Englisch, Deutsch etc."
            />
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="px-2">
            <FormKit
              v-model="languageLevel"
              label="Level: "
              type="select"
              :options="[
                'Basiskenntnisse',
                'Fortgeschritten',
                'Fließend',
                'Muttersprache',
              ]"
              placeholder="Auswahl"
              input-class="$reset h-10 bg-white dark:bg-slate-800 text-base dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="grid flex gap-2 px-4">
    <button
      class="bg-wd-green shadow rounded-md h-16 w-full text-white font-bold"
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
      localStorage.setItem("knowledges", JSON.stringify(newData));
    } else {
      localStorage.setItem("knowledges", JSON.stringify([knowledge]));
    }
    slideDown.value = true;
  }
};
</script>
