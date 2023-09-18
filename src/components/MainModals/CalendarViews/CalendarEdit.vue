<template>
  <div class="px-2">
    <div class="flex gap-1">
      <div class="grow" v-if="!isEnd">
        <div class="px-2">
          <FormKit
            v-model="type"
            label="Label:"
            type="select"
            placeholder="Auswahl"
            :options="[
              'Bewerbungsgespräch',
              'Aufnahmetest',
              'Feedback',
              'Sonstige Termine',
            ]"
          />
        </div>
      </div>
      <div class="grow" v-if="isEnd">
        <div class="px-2">
          <FormKit
            v-model="type"
            label="Label:"
            type="select"
            value="Ende"
            placeholder="Ende"
            :options="['Ende']"
          />
        </div>
      </div>
      <div class="grow">
        <div class="px-2">
          <FormKit
            label="Titel:"
            type="text"
            placeholder="Titel des Termins"
            v-model="titleText"
            :value="titleText"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            type="datetime-local"
            label="Start:"
            v-model="appointmentFrom"
            :value="appointmentFrom"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            type="datetime-local"
            label="Ende:"
            v-model="appointmentTo"
            :validation="
              appointmentFrom ? [['date_after', appointmentFrom]] : []
            "
            validation-visibility="live"
            :value="appointmentTo"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            v-model="address"
            label="Adresse: "
            type="text"
            placeholder="Straße Nr., PLZ"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            type="textarea"
            label="Notizen: "
            v-model="note"
            placeholder="Wichtige Informationen"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="grid flex gap-2 px-4">
    <div v-if="!isEnd">
      <button
        class="bg-wd-error shadow rounded-md h-10 w-full text-white font-bold"
        @click="openDeteleModal()"
      >
        Termin entfernen
      </button>
    </div>
    <button
      class="bg-wd-green shadow rounded-md h-16 w-full text-white font-bold"
      @click="saveToLocalStorage()"
      :disabled="buttonDisabled"
    >
      Termin speichern
    </button>
  </div>
  <CropModal :show="showDeleteModal">
    <div class="place-items-center">
      <div class="text-white text-xl p-2">Entfernen?</div>
      <div class="text-white font-Montserrat text-base font-bold pb-2">
        <p>Bist du wirklich sicher, dass du den Termin entfernen willst?</p>
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
import { slideDown, changedDate } from "@/store/store.js";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const type = ref(null);
const titleText = ref("");
const appointmentFrom = ref(null);
const appointmentTo = ref(null);
const address = ref("");
const note = ref(null);
const showDeleteModal = ref(false);
const buttonDisabled = ref(false);
const appointments = ref(
  JSON.parse(localStorage.getItem("appointments")) || []
);
let isEnd = false;
const props = withDefaults(
  defineProps<{
    editIndex: number;
  }>(),
  { editIndex: 0 }
);

onMounted(() => {
  changedDate.value = false;
  showDeleteModal.value = false;
  type.value = appointments.value[props.editIndex][0].type;
  titleText.value = appointments.value[props.editIndex][0].title;
  appointmentFrom.value =
    appointments.value[props.editIndex][0].appointmentFrom;
  appointmentTo.value = appointments.value[props.editIndex][0].appointmentTo;
  address.value = appointments.value[props.editIndex][0].address;
  note.value = appointments.value[props.editIndex][0].note;
  if (type.value == "Ende") {
    isEnd = true;
    buttonDisabled.value = true;
  } else {
    isEnd = false;
    buttonDisabled.value = false;
  }
});

const saveToLocalStorage = () => {
  let dateCheck = false;
  if (appointmentFrom.value != null && appointmentTo.value != null) {
    if (appointmentFrom.value <= appointmentTo.value) {
      dateCheck = true;
    }
  } else if (appointmentFrom.value != null || appointmentTo.value != null) {
    dateCheck = true;
  }

  if (dateCheck) {
    if (localStorage.getItem("appointments")) {
      console.log("Update Appointments");
      const applications = ref(
        JSON.parse(localStorage.getItem("applications"))
      );

      appointments.value[props.editIndex][0].type = type.value;
      appointments.value[props.editIndex][0].title = titleText.value;
      appointments.value[props.editIndex][0].appointmentFrom =
        appointmentFrom.value;
      appointments.value[props.editIndex][0].appointmentTo =
        appointmentTo.value;

      appointments.value[props.editIndex][0].address = address.value;
      appointments.value[props.editIndex][0].note = note.value;

      if (type.value == "Ende") {
        if (appointments.value.length > 0) {
          for (let i = 0; i < applications.value.length; i++) {
            if (
              applications.value[i][0].id ==
              appointments.value[props.editIndex][0].endId
            ) {
              applications.value[i][0].start = appointmentFrom.value;
            }
          }

          localStorage.setItem(
            "applications",
            JSON.stringify(applications.value)
          );
        }
      }

      localStorage.setItem("appointments", JSON.stringify(appointments.value));
      slideDown.value = true;
      changedDate.value = true;
    }
  } else {
    errorMessage();
  }
};
const removeFromLocalStorage = () => {
  const applications = ref(
    JSON.parse(localStorage.getItem("applications")) || []
  );
  for (let i = 0; i < applications.value.length; i++) {
    if (
      applications.value[i][0].id ==
        appointments.value[props.editIndex][0].endId &&
      appointments.value[props.editIndex][0].endId != 0
    ) {
      applications.value[i][0].end = null;
      applications.value[i][0].start = null;
    }
  }
  appointments.value.splice(props.editIndex, 1);
  localStorage.setItem("appointments", JSON.stringify(appointments.value));
  localStorage.setItem("applications", JSON.stringify(applications.value));

  changedDate.value = true;
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
