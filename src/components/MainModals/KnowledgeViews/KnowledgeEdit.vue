<template>
  <div class="px-2">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2 text-black dark:text-white">
          <FormKit
            v-model="type"
            label="Kenntnisse: *"
            type="select"
            placeholder="Auswahl"
            :options="['Sprachkenntnisse', 'Sonstige Kenntnisse']"
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
    <div class="grid flex gap-2 px-4">
      <button
        class="bg-wd-error shadow rounded-md h-10 w-full text-white font-bold"
        @click="openDeteleModal()"
        :disabled="buttonDisabled"
      >
        Kenntnisse entfernen
      </button>
      <button
        class="bg-wd-green shadow rounded-md h-16 w-full text-white font-bold"
        @click="saveToLocalStorage()"
        :disabled="buttonDisabled"
      >
        Kenntnisse speichern
      </button>
    </div>
    <CropModal :show="showDeleteModal">
      <div class="place-items-center">
        <div class="text-white text-xl p-2">Entfernen?</div>
        <div class="text-white font-Montserrat text-base font-bold pb-2">
          <p>
            Bist du wirklich sicher, dass du diese Kenntnisse entfernen willst?
          </p>
        </div>
      </div>

      <div
        class="flex justify-evenly text-white font-Montserrat text-base font-bold h-10"
      >
        <button
          type="button"
          @click="returnToEdit()"
          class="bg-wd-error w-screen"
        >
          Nein
        </button>

        <button
          type="button"
          @click="deleteAndReturn()"
          class="bg-wd-green w-screen"
        >
          Ja
        </button>
      </div>
    </CropModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import { slideDown } from "@/store/store.js";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const type = ref(null);
const diversKnowledge = ref(null);
const languageKnowledge = ref(null);
const languageLevel = ref(null);
let buttonDisabled = false;
const knowledges = ref(JSON.parse(localStorage.getItem("knowledges")) || []);
const showDeleteModal = ref(false);

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
  if (type.value != null) {
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
  } else {
    errorMessage();
  }
};
const removeFromLocalStorage = () => {
  if (buttonDisabled == false) {
    knowledges.value.splice(props.editIndex, 1);
    localStorage.setItem("knowledges", JSON.stringify(knowledges.value));
    slideDown.value = true;
  }
};
const returnToEdit = () => {
  showDeleteModal.value = false;
};

const deleteAndReturn = () => {
  showDeleteModal.value = false;
  removeFromLocalStorage();
  slideDown.value = true;
};
const openDeteleModal = () => {
  showDeleteModal.value = true;
};
const errorMessage = () => {
  createToast("Du hast nicht alle Felder richtig ausgefüllt.", {
    position: "top-center",
    transition: "zoom",
    type: "danger",
  });
};
</script>
