<template>
  <div class="p-4">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Kenntnisse:
          </p>
          <div class="px-2">
            <FormKit
              v-model="type"
              type="select"
              placeholder="Auswahl"
              :options="['Sprachkenntnisse', 'Sonstige Kenntnisse']"
            />
          </div>
        </div>
      </div>

      <div v-if="type === 'Sonstige Kenntnisse'">
        <div class="px-2">
          <FormKit
            v-model="diversKnowledge"
            type="text"
            placeholder="z.B. Führerschein, Office etc."
          />
        </div>
      </div>
      <div v-if="type === 'Sprachkenntnisse'">
        <div class="col-span-2 md:col-span-1">
          <div class="flex bg-white dark:bg-slate-800 h-10">
            <p
              class="py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
            >
              Sprache:
            </p>
            <div class="px-2">
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
              class="py-2 w-24 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
            >
              Level:
            </p>
            <div class="px-2">
              <FormKit
                v-model="languageLevel"
                type="select"
                plaseholder="Auswahl"
                :options="[
                  'Basiskenntnisse',
                  'Fortgeschritten',
                  'Fließend',
                  'Muttersprache',
                ]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="fixed bottom-40">
    <button
      class="bg-wd-error shadow rounded-md h-14 w-screen text-white font-bold"
      @click="removeFromLocalStorage()"
      :disabled="buttonDisabled"
    >
      Kenntnisse entfernen
    </button>
  </div>
  <div class="fixed bottom-10 items-end justify-end">
    <button
      class="bg-wd-green hover:bg-transparent-green shadow h-24 w-screen text-white font-bold"
      @click="saveToLocalStorage()"
      :disabled="buttonDisabled"
    >
      Kenntnisse hinzufügen
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import { slideDown } from "@/store/store.js";

const type = ref(null);
const diversKnowledge = ref(null);
const languageKnowledge = ref(null);
const languageLevel = ref(null);
let buttonDisabled = false;
const knowledges = ref(JSON.parse(localStorage.getItem("knowledges")) || []);

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
