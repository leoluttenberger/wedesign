<template>
  <div></div>
  <div class="p-4" v-bind="editIndex">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md"
          >
            Typ:
          </p>
          <FormKit
            v-model="type"
            type="select"
            placeholder="Auswahl"
            :options="['Mittelschule', 'Lehre', 'HTL', 'AHS', 'HAK', 'HBLA']"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md"
          >
            Schwerpunkt:
          </p>
          <FormKit
            v-model="specialty"
            type="text"
            placeholder="zB. Sprachen, BE, IT"
          />
        </div>
      </div>
    </div>

    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md"
        >
          Adresse:
        </p>
        <FormKit
          v-model="address"
          type="text"
          placeholder="PLZ, Ort, Adresse"
        />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md"
          >
            Von:
          </p>
          <FormKit
            type="date"
            v-model="educationFrom"
            placeholder="Auswählen"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md"
          >
            Bis:
          </p>
          <FormKit
            type="date"
            v-model="educationTo"
            placeholder="Auswählen"
            :validation="[['date_after', educationFrom]]"
            validation-visibility="live"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="grid flex gap-6 py-10">
    <button
      class="bg-wd-error shadow rounded-md h-14 w-full text-white"
      @click="removeFromLocalStorage()"
      :disabled="buttonDisabled"
    >
      Ausbildung entfernen
    </button>
    <button
      class="bg-wd-green hover:bg-transparent-green shadow h-24 text-white"
      @click="saveToLocalStorage()"
      :disabled="buttonDisabled"
    >
      Ausbildung speichern
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";
import { slideDown } from "@/store.js";
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
