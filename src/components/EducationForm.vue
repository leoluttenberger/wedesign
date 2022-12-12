<template>
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
  <button
    class="bg-wd-green hover:bg-transparent-green shadow"
    @click="saveToLocalStorage()"
    :isdisabled="buttonDisabled"
  >
    Save this user
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const type = ref(null);
const specialty = ref(null);
const address = ref(null);
const educationFrom = ref(null);
const educationTo = ref(null);
const slideValue = ref(null);
let buttonDisabled = false;

onMounted(() => {
  buttonDisabled = false;
});

const saveToLocalStorage = () => {
  let index = 0;
  console.log("buttonDisabled: ", buttonDisabled);
  if (buttonDisabled == false) {
    buttonDisabled = true;
    if (localStorage.getItem("educations")) {
      const currentEducations = JSON.parse(localStorage.getItem("educations"));
      index = currentEducations.length;
      const education = [
        {
          index: index,
          type: type.value,
          specialty: specialty.value,
          address: address.value,
          educationFrom: educationFrom.value,
          educationTo: educationTo.value,
        },
      ];
      const newData = [...currentEducations, education];
      console.log(newData);
      localStorage.setItem("educations", JSON.stringify(newData));
    } else {
      const education = [
        {
          index: index,
          type: type.value,
          specialty: specialty.value,
          address: address.value,
          educationFrom: educationFrom.value,
          educationTo: educationTo.value,
        },
      ];
      localStorage.setItem("educations", JSON.stringify([education]));
    }
  }
};
</script>
