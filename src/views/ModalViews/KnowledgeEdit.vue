<template>
  <div class="p-4">
    <FormKit
      v-model="type"
      type="select"
      label="Typ"
      :options="['Sprachkenntnisse', 'Sonstige Kenntnisse']"
      value="Sonstige Kenntnisse"
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
          'Basiskenntnisse',
          'Fortgeschritten',
          'Fließend',
          'Muttersprache',
        ]"
        value="Basiskenntnisse"
      />
    </div>
  </div>

  <div class="grid flex gap-2">
    <button
      class="bg-wd-error hover:bg-transparent-green shadow rounded-md h-8 w-full text-white"
      @click="removeFromLocalStorage()"
      :disabled="buttonDisabled"
    >
      Kenntnisse entfernen
    </button>
    <button
      class="bg-wd-green hover:bg-transparent-green shadow h-14 text-white"
      @click="saveToLocalStorage()"
      :disabled="buttonDisabled"
    >
      Kenntnisse hinzufügen
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import { slideDown } from "@/store.js";
const type = ref(null);
const diversKnowledge = ref(null);
const languageKnowledge = ref(null);
const languageLevel = ref(null);
let buttonDisabled = false;
const knowledges = ref(JSON.parse(localStorage.getItem("knowledges")));

const props = defineProps({
  editIndex: {
    type: Number,
    default: 0,
  },
});

onMounted(() => {
  buttonDisabled = false;
  type.value = knowledges.value[props.editIndex][0].type;
  diversKnowledge.value = knowledges.value[props.editIndex][0].diversKnowledge;
  languageKnowledge.value =
    knowledges.value[props.editIndex][0].languageKnowledge;
  languageLevel.value = knowledges.value[props.editIndex][0].languageLevel;
});

const saveToLocalStorage = () => {
  if (buttonDisabled == false) {
    buttonDisabled = true;
    if (localStorage.getItem("knowledges")) {
      console.log("Update Education");
      knowledges.value[props.editIndex][0].type = type.value;
      knowledges.value[props.editIndex][0].diversKnowledge =
        diversKnowledge.value;
      knowledges.value[props.editIndex][0].languageKnowledge =
        languageKnowledge.value;
      knowledges.value[props.editIndex][0].languageLevel = languageLevel.value;
      localStorage.setItem("knowledges", JSON.stringify(knowledges.value));
    } else {
      const knowledge = [
        {
          type: type.value,
          diversKnowledge: diversKnowledge.value,
          languageKnowledge: languageKnowledge.value,
          languageLevel: languageLevel.value,
        },
      ];
      localStorage.setItem("knowledges", JSON.stringify([knowledge]));
    }
    slideDown.value = true;
  }
};
const removeFromLocalStorage = () => {
  if (buttonDisabled == false) {
    knowledges.value.splice(props.editIndex, 1);
    localStorage.setItem("knowledges", JSON.stringify(knowledges.value));
    slideDown.value = true;
  }
};
</script>
