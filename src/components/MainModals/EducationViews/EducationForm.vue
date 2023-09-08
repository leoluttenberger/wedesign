<template>
  <div class="px-2">
    <div class="flex">
      <div class="grow">
        <div class="px-2">
          <FormKit
            v-model="type"
            label="Typ & Name:"
            type="text"
            placeholder="Lehre, HTL, AHS, HAK, ..."
          />
        </div>
      </div>
      <div class="grow">
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

    <div class="grid grid-cols-3">
      <div class="col-span-3">
        <div class="px-2">
          <FormKit
            type="datepicker"
            label="Start: *"
            format="MM YYYY"
            v-model="educationFrom"
            :sequence="['year', 'month']"
            :validation="[['required']]"
            validation-visibility="live"
            picker-only
          />
        </div>
      </div>
      <div class="col-span-3">
        <div class="flex grow px-2">
          <div class="grow">
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
            />
          </div>

          <div class="flex">
            <div class="pt-10 px-2">
              <input
                id="ongoing"
                v-model="checked"
                type="checkbox"
                value="ongoing"
                class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="ongoing"
                class="w-5 h-5 text-black dark:text-white font-Montserrat text-base md:text-md font-bold"
              >
              </label>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="grow ..."></div>
          <div
            label
            class="text-black dark:text-white font-Montserrat text-xs font-bold md:text-base"
          >
            Laufend
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="px-2">
        <FormKit
          type="textarea"
          label="Adresse:"
          v-model="address"
          placeholder="Straße Nr., PLZ"
        />
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
  </div>

  <div class="grid flex gap-2 px-4">
    <button
      class="bg-wd-green shadow rounded-md h-16 w-full text-white font-bold"
      @click="saveToLocalStorage()"
    >
      Ausbildung hinzufügen
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { slideDown } from "@/store/store.js";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const type = ref(null);
const specialty = ref(null);
const address = ref(null);
const educationFrom = ref(null);
const educationTo = ref(null);
const checked = ref(false);
const note = ref(null);

onMounted(() => {
  checked.value = false;
});

const saveToLocalStorage = () => {
  if (educationFrom.value != null) {
    educationFrom.value = educationFrom.value.slice(0, 7);
  }
  if (educationTo.value != null) {
    educationTo.value = educationTo.value.slice(0, 7);
  }
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
  let dateCheck = false;
  if (checked.value) {
    if (educationFrom.value != null) {
      dateCheck = true;
    }
  } else {
    if (educationTo.value != null) {
      dateCheck = true;
    }
  }
  if (dateCheck) {
    if (localStorage.getItem("educations")) {
      const currentEducations = JSON.parse(localStorage.getItem("educations"));
      const newData = [...currentEducations, education];
      localStorage.setItem("educations", JSON.stringify(newData));
    } else {
      localStorage.setItem("educations", JSON.stringify([education]));
    }
    slideDown.value = true;
  } else {
    errorMessage();
  }
};
const toggleChecked = () => {
  if (checked.value == true) {
    checked.value = false;
  } else {
    checked.value = true;
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
