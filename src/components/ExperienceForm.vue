<template>
  <div class="p-4">
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

  <button
    class="bg-wd-green hover:bg-transparent-green shadow h-14"
    @click="saveToLocalStorage()"
    :isdisabled="buttonDisabled"
  >
    Erfahrung hinzufügen
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const workshop = ref(null);
const description = ref(null);
const workshopFrom = ref(null);
const workshopTo = ref(null);
let buttonDisabled = false;

onMounted(() => {
  buttonDisabled = false;
});

const saveToLocalStorage = () => {
  const experience = [
    {
      workshop: workshop.value,
      description: description.value,
      workshopFrom: workshopFrom.value,
      workshopTo: workshopTo.value,
    },
  ];
  if (buttonDisabled == false) {
    buttonDisabled = true;
    if (localStorage.getItem("experiences")) {
      const currentExperiences = JSON.parse(
        localStorage.getItem("experiences")
      );
      const newData = [...currentExperiences, experience];
      console.log(newData);
      localStorage.setItem("experiences", JSON.stringify(newData));
    } else {
      localStorage.setItem("experiences", JSON.stringify([experience]));
    }
  }
};
</script>
