<template>
  <div class="px-2" v-bind="editIndex">
    <div class="flex gap-1">
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
    <div class="flex">
      <div class="grow px-2">
        <FormKit
          v-model="address"
          label="Adresse:"
          type="text"
          placeholder="Straße Nr., PLZ"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
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
            label-class="$reset h-10 bg-white dark:bg-slate-800 text-base dark:text-white text-black"
            input-class="$reset h-10 dark:bg-slate-800 text-base text-black dark:text-white"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-2" v-if="!checked">
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
            label-class="$reset h-10 bg-white dark:bg-slate-800 text-base dark:text-white text-black"
            input-class="$reset h-10 dark:bg-slate-800 text-base text-black dark:text-white"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="px-2">
        <FormKit
          type="textarea"
          label="Anmerkungen: "
          v-model="note"
          placeholder="Wichtige Informationen"
        />
      </div>
      <div class="flex">
        <div class="px-2 pt-6">
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
        <div class="pt-1 px-2">
          <div
            label
            class="px-2 align-middle text-black dark:text-white font-Montserrat text-base font-bold md:text-lg pt-5"
          >
            Laufend
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="grid flex gap-2 px-4">
    <button
      class="bg-wd-error shadow rounded-md h-10 w-full text-white font-bold"
      @click="openDeteleModal()"
    >
      Ausbildung entfernen
    </button>
    <button
      class="bg-wd-green shadow rounded-md h-16 w-full text-white font-bold"
      @click="saveToLocalStorage()"
    >
      Ausbildung speichern
    </button>
  </div>

  <CropModal :show="showDeleteModal">
    <div class="place-items-center">
      <div class="text-white text-xl p-2">Entfernen?</div>
      <div class="text-white font-Montserrat text-base font-bold pb-2">
        <p>Bist du wirklich sicher, dass diese Ausbildung entfernen willst?</p>
      </div>
    </div>

    <div
      class="flex justify-evenly text-white font-Montserrat text-base font-bold h-10"
    >
      <button
        type="button"
        @click="returnToEdit()"
        class="bg-wd-error w-screen"
      >
        Nein
      </button>

      <button
        type="button"
        @click="deleteAndReturn()"
        class="bg-wd-green w-screen"
      >
        Ja
      </button>
    </div>
  </CropModal>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults } from "vue";
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
const educations = ref(JSON.parse(localStorage.getItem("educations")) || []);
const showDeleteModal = ref(false);

const props = withDefaults(
  defineProps<{
    editIndex: number;
  }>(),
  { editIndex: 0 }
);

onMounted(() => {
  type.value = educations.value[props.editIndex][0].type;
  specialty.value = educations.value[props.editIndex][0].specialty;
  address.value = educations.value[props.editIndex][0].address;
  educationFrom.value = educations.value[props.editIndex][0].educationFrom;
  educationTo.value = educations.value[props.editIndex][0].educationTo;
  note.value = educations.value[props.editIndex][0].note;
  checked.value = educations.value[props.editIndex][0].ongoing;
});

const saveToLocalStorage = () => {
  let dateCheck = false;
  if (educationFrom.value != null) {
    educationFrom.value = educationFrom.value.slice(0, 7);
  }
  if (educationTo.value != null) {
    educationTo.value = educationTo.value.slice(0, 7);
  }
  if (checked.value) {
    if (educationFrom.value != null) {
      dateCheck = true;
    }
  } else {
    if (educationTo.value != null) {
      dateCheck = true;
    }
    if (educationFrom.value != null && educationTo.value != null) {
      if (educationFrom.value <= educationTo.value) {
        dateCheck = true;
      }
    } else if (educationFrom.value != null || educationTo.value != null) {
      dateCheck = true;
    }
  }
  if (dateCheck) {
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
  } else {
    errorMessage();
  }
};
const removeFromLocalStorage = () => {
  educations.value.splice(props.editIndex, 1);
  localStorage.setItem("educations", JSON.stringify(educations.value));
  slideDown.value = true;
};
const errorMessage = () => {
  createToast("Du hast nicht alle Felder richtig ausgefüllt.", {
    position: "top-center",
    transition: "zoom",
    type: "danger",
  });
};
const returnToEdit = () => {
  showDeleteModal.value = false;
};

const deleteAndReturn = () => {
  showDeleteModal.value = false;
  removeFromLocalStorage();
  slideDown.value = true;
};
const openDeteleModal = () => {
  showDeleteModal.value = true;
};
</script>
