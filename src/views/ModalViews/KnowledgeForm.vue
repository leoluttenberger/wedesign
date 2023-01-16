<template>
  <div class="p-4">
    <FormKit
      v-model="type"
      type="select"
      label="Typ"
      :options="['Auswahl', 'Sprachkenntnisse', 'Sonstige Kenntnisse']"
    />
    <div v-if="type === 'Sonstige Kenntnisse'">
      <FormKit
        v-model="diversKnowledge"
        type="text"
        label="Sonstige Kenntnisse"
        placeholder="z.B. Führerschein, Office etc."
      />
    </div>
    <div v-if="type === 'Sprachkenntnisse'">
      <FormKit
        v-model="languageKnowledge"
        type="text"
        label="Sprachkenntnisse"
        placeholder="z.B. Englisch, Deutsch etc."
      />
      <FormKit
        v-model="languageLevel"
        type="select"
        label="Typ"
        :options="[
          'Auswahl',
          'Basiskenntnisse',
          'Fortgeschritten',
          'Fließend',
          'Muttersprache',
        ]"
      />
    </div>
  </div>

  <button
    class="bg-wd-green hover:bg-transparent-green shadow h-14 text-white"
    @click="saveToLocalStorage()"
    :disabled="buttonDisabled"
  >
    Erfahrung hinzufügen
  </button>
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
