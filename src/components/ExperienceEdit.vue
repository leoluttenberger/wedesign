<template>
  <div class="p-4" v-bind="editIndex">
    <FormKit
      v-model="workshop"
      type="text"
      label="Titel"
      placeholder="Workshop-Teilnahme"
    />
    <FormKit
      v-model="description"
      type="textarea"
      label="Text"
      placeholder="Beschreibung"
    />
    <FormKit
      type="date"
      v-model="workshopFrom"
      label="Von"
      placeholder="Auswählen"
    />
    <FormKit
      type="date"
      v-model="workshopTo"
      label="Bis"
      placeholder="Auswählen"
      :validation="[['date_after', workshopFrom]]"
      validation-visibility="live"
    />
  </div>

  <div class="flex p-4">
    <button
      class="bg-wd-error hover:bg-transparent-green shadow rounded-md h-8 w-full text-white"
      @click="removeFromLocalStorage()"
      :disabled="buttonDisabled"
    >
      Erfahrung entfernen
    </button>
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
import { ref, onMounted, defineProps, withDefaults } from "vue";
import { slideDown } from "../store.js";
const workshop = ref(null);
const description = ref(null);
const workshopFrom = ref(null);
const workshopTo = ref(null);
let buttonDisabled = false;
const experiences = ref(JSON.parse(localStorage.getItem("experiences")));

const props = withDefaults(
  defineProps<{
    editIndex: number;
  }>(),
  { editIndex: 0 }
);

onMounted(() => {
  buttonDisabled = false;
  workshop.value = experiences.value[props.editIndex][0].workshop;
  description.value = experiences.value[props.editIndex][0].description;
  workshopFrom.value = experiences.value[props.editIndex][0].workshopFrom;
  workshopTo.value = experiences.value[props.editIndex][0].workshopTo;
});

const saveToLocalStorage = () => {
  if (buttonDisabled == false) {
    buttonDisabled = true;
    if (localStorage.getItem("experiences")) {
      console.log("Update Education");
      experiences.value[props.editIndex][0].workshop = workshop.value;
      experiences.value[props.editIndex][0].description = description.value;
      experiences.value[props.editIndex][0].workshopFrom = workshopFrom.value;
      experiences.value[props.editIndex][0].workshopTo = workshopTo.value;
      localStorage.setItem("experiences", JSON.stringify(experiences.value));
    } else {
      const experience = [
        {
          workshop: workshop.value,
          description: description.value,
          workshopFrom: workshopFrom.value,
          workshopTo: workshopTo.value,
        },
      ];
      localStorage.setItem("experiences", JSON.stringify([experience]));
    }
    slideDown.value = true;
  }
};
const removeFromLocalStorage = () => {
  if (buttonDisabled == false) {
    experiences.value.splice(props.editIndex, 1);
    localStorage.setItem("experiences", JSON.stringify(experiences.value));
    slideDown.value = true;
  }
};
</script>
