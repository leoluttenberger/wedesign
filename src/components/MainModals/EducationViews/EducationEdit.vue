<template>
  <div class="px-2" v-bind="editIndex">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            v-model="type"
            label="Typ:"
            type="text"
            placeholder="Lehre, HTL, AHS, HAK, ..."
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            v-model="specialty"
            label="Schwerpunkt:"
            type="text"
            placeholder="zB. Sprachen, BE, IT"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-1">
      <div class="px-2">
        <FormKit
          v-model="address"
          label="Adresse:"
          type="text"
          placeholder="Straße Nr., PLZ"
        />
      </div>
      <div class="flex">
        <div class="px-2 pt-6">
          <input
            id="ongoing"
            v-model="checked"
            type="checkbox"
            value="ongoing"
            class="p-10 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="ongoing"
            class="h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
          </label>
        </div>
        <div
          label
          class="px-2 align-middle text-black dark:text-white font-Montserrat text-base font-bold md:text-lg pt-5"
        >
          Laufend
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2 text-black dark:text-white">
          <FormKit
            type="datepicker"
            label="Start:"
            format="MM YYYY"
            v-model="educationFrom"
            :sequence="['year', 'month']"
            picker-only
            input-class="$reset h-10 bg-white dark:bg-slate-800 text-base dark:text-white"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-2 text-black dark:text-white" v-if="!checked">
          <FormKit
            type="datepicker"
            label="Ende: *"
            format="MM YYYY"
            v-model="educationTo"
            :validation="[['required'], ['date_after', educationFrom]]"
            validation-visibility="live"
            :sequence="['year', 'month']"
            :disabled="checked"
            picker-only
            input-class="$reset h-10 bg-white dark:bg-slate-800 text-base dark:text-white"
          />
        </div>
      </div>
    </div>
    <div class="px-2">
      <FormKit
        type="textarea"
        label="Anmerkungen: "
        v-model="note"
        placeholder="Wichtige Informationen"
      />
    </div>
  </div>

  <div class="grid flex gap-2 px-4">
    <button
      class="bg-wd-error shadow rounded-md h-10 w-full text-white font-bold"
      @click="removeFromLocalStorage()"
      :disabled="buttonDisabled"
    >
      Ausbildung entfernen
    </button>
    <button
      class="bg-wd-green shadow rounded-md h-16 w-full text-white font-bold"
      @click="saveToLocalStorage()"
      :disabled="buttonDisabled"
    >
      Ausbildung speichern
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";
import { slideDown } from "@/store/store.js";

const type = ref(null);
const specialty = ref(null);
const address = ref(null);
const educationFrom = ref(null);
const educationTo = ref(null);
const checked = ref(false);
const note = ref(null);
let buttonDisabled = false;
const educations = ref(JSON.parse(localStorage.getItem("educations")) || []);

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
  note.value = educations.value[props.editIndex][0].note;
  checked.value = educations.value[props.editIndex][0].ongoing;
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
      educations.value[props.editIndex][0].ongoing = checked.value;
      educations.value[props.editIndex][0].note = note.value;

      localStorage.setItem("educations", JSON.stringify(educations.value));
    } else {
      const education = [
        {
          type: type.value,
          specialty: specialty.value,
          address: address.value,
          educationFrom: educationFrom.value,
          educationTo: educationTo.value,
          ongoing: checked.value,
          note: note.value,
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
