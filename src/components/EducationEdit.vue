<template>
  <div class="p-4" v-bind="editIndex">
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
  <div class="flex p-4">
    <button
      class="bg-wd-error shadow rounded-md h-8 w-full text-white"
      @click="removeFromLocalStorage()"
      :disabled="buttonDisabled"
    >
      Ausbildung entfernen
    </button>
  </div>

  <button
    class="bg-wd-green hover:bg-transparent-green shadow h-14 text-white"
    @click="saveToLocalStorage()"
    :disabled="buttonDisabled"
  >
    Ausbildung speichern
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";
import { slideDown } from "../store.js";
const type = ref(null);
const specialty = ref(null);
const address = ref(null);
const educationFrom = ref(null);
const educationTo = ref(null);
let buttonDisabled = false;
const educations = ref(JSON.parse(localStorage.getItem("educations")));

const props = withDefaults(
  defineProps<{
    editIndex: number;
  }>(),
  { editIndex: 0 }
);

onMounted(() => {
  buttonDisabled = false;
  type.value = educations.value[props.editIndex][0].type;
  specialty.value = educations.value[props.editIndex][0].specialty;
  address.value = educations.value[props.editIndex][0].address;
  educationFrom.value = educations.value[props.editIndex][0].educationFrom;
  educationTo.value = educations.value[props.editIndex][0].educationTo;
});

const saveToLocalStorage = () => {
  if (buttonDisabled == false) {
    buttonDisabled = true;
    if (localStorage.getItem("educations")) {
      console.log("Update Education");
      educations.value[props.editIndex][0].type = type.value;
      educations.value[props.editIndex][0].specialty = specialty.value;
      educations.value[props.editIndex][0].address = address.value;
      educations.value[props.editIndex][0].educationFrom = educationFrom.value;
      educations.value[props.editIndex][0].educationTo = educationTo.value;
      console.log(educations.value);
      localStorage.setItem("educations", JSON.stringify(educations.value));
    } else {
      const education = [
        {
          type: type.value,
          specialty: specialty.value,
          address: address.value,
          educationFrom: educationFrom.value,
          educationTo: educationTo.value,
        },
      ];
      localStorage.setItem("educations", JSON.stringify([education]));
    }
    slideDown.value = true;
  }
};
const removeFromLocalStorage = () => {
  if (buttonDisabled == false) {
    educations.value.splice(props.editIndex, 1);
    localStorage.setItem("educations", JSON.stringify(educations.value));
    slideDown.value = true;
  }
};
</script>
