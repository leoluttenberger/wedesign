<template>
  <div class="px-2">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            v-model="type"
            label="Kenntnisse: *"
            type="select"
            placeholder="Auswahl"
            :options="['Sprachkenntnisse', 'Sonstige Kenntnisse']"
            label-class="$reset text-base text-black dark:text-white"
            validation="required"
            validation-label="Kenntnisse"
            validation-visibility="live"
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
    >
      Kenntnis hinzufügen
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { slideDown } from "@/store/store.js";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const type = ref(null);
const diversKnowledge = ref(null);
const languageKnowledge = ref(null);
const languageLevel = ref(null);

const saveToLocalStorage = () => {
  const knowledge = [
    {
      type: type.value,
      diversKnowledge: diversKnowledge.value,
      languageKnowledge: languageKnowledge.value,
      languageLevel: languageLevel.value,
    },
  ];
  if (type.value != null) {
    if (localStorage.getItem("knowledges")) {
      const currentknowledges = JSON.parse(localStorage.getItem("knowledges"));
      const newData = [...currentknowledges, knowledge];
      localStorage.setItem("knowledges", JSON.stringify(newData));
    } else {
      localStorage.setItem("knowledges", JSON.stringify([knowledge]));
    }
    slideDown.value = true;
  } else {
    errorMessage();
  }
};
const errorMessage = () => {
  createToast("Du hast nicht alle Felder richtig ausgefüllt.", {
    position: "top-center",
    transition: "zoom",
    type: "danger",
  });
};
</script>
