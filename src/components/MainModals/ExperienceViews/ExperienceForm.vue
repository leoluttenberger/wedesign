<template>
  <div class="px-2">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            v-model="workshop"
            label="Titel: *"
            type="text"
            placeholder="Workshop"
            validation="required"
            validation-label="Titel"
            validation-visibility="live"
          />
        </div>
      </div>

      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            v-model="description"
            label="Text: "
            type="textarea"
            placeholder="Beschreibung"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            type="date"
            label="Start: "
            v-model="workshopFrom"
            placeholder="Auswählen"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            type="date"
            label="Ende: "
            v-model="workshopTo"
            placeholder="Auswählen"
            :validation="[['date_after', workshopFrom]]"
            validation-visibility="live"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="grid flex gap-2 px-4">
    <button
      class="bg-wd-green shadow rounded-md h-16 w-full text-white font-bold"
      @click="saveToLocalStorage()"
    >
      Erfahrung hinzufügen
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { slideDown } from "@/store/store.js";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const workshop = ref(null);
const description = ref(null);
const workshopFrom = ref(null);
const workshopTo = ref(null);

const saveToLocalStorage = () => {
  const experience = [
    {
      workshop: workshop.value,
      description: description.value,
      workshopFrom: workshopFrom.value,
      workshopTo: workshopTo.value,
    },
  ];

  let dateCheck = false;

  if (workshopFrom.value != null && workshopTo.value != null) {
    if (workshopFrom.value <= workshopTo.value) {
      dateCheck = true;
    }
  } else if (workshopFrom.value != null || workshopTo.value != null) {
    dateCheck = true;
  } else {
    dateCheck = true;
  }
  if (dateCheck) {
    if (workshop.value != null) {
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
    } else {
      errorMessage();
    }
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
