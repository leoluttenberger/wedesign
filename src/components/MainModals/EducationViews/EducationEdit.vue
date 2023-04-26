<template>
  <div class="p-4" v-bind="editIndex">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Typ:
          </p>
          <div class="px-2">
            <FormKit
              v-model="type"
              type="select"
              placeholder="Auswahl"
              :options="['Mittelschule', 'Lehre', 'HTL', 'AHS', 'HAK', 'HBLA']"
            />
          </div>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Schwerpunkt:
          </p>
          <div class="px-2">
            <FormKit
              v-model="specialty"
              type="text"
              placeholder="zB. Sprachen, BE, IT"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-2 md:col-span-1">
      <div class="flex bg-white dark:bg-slate-800 h-10">
        <p
          class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
        >
          Adresse:
        </p>
        <div class="px-2">
          <FormKit
            v-model="address"
            type="text"
            placeholder="PLZ, Ort, Adresse"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Start:
          </p>
          <div class="px-2">
            <FormKit
              type="date"
              v-model="educationFrom"
              placeholder="Auswählen"
            />
          </div>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Ende: *
          </p>
          <div class="px-2">
            <FormKit
              type="date"
              name="Ende"
              v-model="educationTo"
              placeholder="Auswählen"
              :validation="[['required'], ['date_after', educationFrom]]"
              validation-visibility="live"
              :disabled="checked"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="flex items-center py-2 px-">
          <input
            id="ongoing"
            v-model="checked"
            type="checkbox"
            value="ongoing"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="ongoing"
            class="px-2 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
            >laufend</label
          >
        </div>
        <div class="flex bg-white dark:bg-slate-800 h-10">
          <p
            class="px-0 py-2 w-32 h-10 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
          >
            Anmerkungen:
          </p>

          <div class="flex bg-white dark:bg-slate-800 h-10">
            <div class="p-2">
              <FormKit
                type="textarea"
                v-model="note"
                placeholder="Wichtige Informationen"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex bottom-40 p-4">
    <button
      class="bg-wd-error shadow rounded-md h-14 w-screen text-white font-bold"
      @click="removeFromLocalStorage()"
      :disabled="buttonDisabled"
    >
      Ausbildung entfernen
    </button>
  </div>
  <div class="flex bottom-10 pt-4 items-end justify-end">
    <button
      class="bg-wd-green hover:bg-transparent-green shadow h-24 w-screen text-white font-bold"
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
