<template>
  <div class="p-4">
    <FormKit
      v-model="type"
      type="select"
      label="Typ"
      :options="['HTL', 'AHS', 'HAK', 'HBLA']"
      value="HTL"
    />
    <FormKit
      v-model="specialty"
      type="select"
      label="Schwerpunkt"
      :options="['IT', 'BE', 'Sprachen', 'Wirtschaft']"
      value="IT"
    />
    <FormKit
      v-model="address"
      type="text"
      label="Adresse"
      placeholder="PLZ, Ort, Adresse"
    />
    <FormKit
      type="date"
      v-model="educationFrom"
      label="Von"
      placeholder="Auswählen"
    />
    <FormKit
      type="date"
      v-model="educationTo"
      label="Bis"
      placeholder="Auswählen"
      :validation="[['date_after', educationFrom]]"
      validation-visibility="live"
    />
  </div>
  <button
    class="bg-wd-green hover:bg-transparent-green shadow h-14"
    @click="saveToLocalStorage()"
    :isdisabled="buttonDisabled"
  >
    Ausbildung hinzufügen
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const type = ref(null);
const specialty = ref(null);
const address = ref(null);
const educationFrom = ref(null);
const educationTo = ref(null);
let buttonDisabled = false;

onMounted(() => {
  buttonDisabled = false;
});

const saveToLocalStorage = () => {
  const education = [
    {
      type: type.value,
      specialty: specialty.value,
      address: address.value,
      educationFrom: educationFrom.value,
      educationTo: educationTo.value,
    },
  ];
  if (buttonDisabled == false) {
    buttonDisabled = true;
    if (localStorage.getItem("educations")) {
      const currentEducations = JSON.parse(localStorage.getItem("educations"));
      const newData = [...currentEducations, education];
      console.log(newData);
      localStorage.setItem("educations", JSON.stringify(newData));
    } else {
      localStorage.setItem("educations", JSON.stringify([education]));
    }
  }
};
</script>
