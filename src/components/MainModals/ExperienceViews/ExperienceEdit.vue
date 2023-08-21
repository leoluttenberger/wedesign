<template>
  <div class="px-2">
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            v-model="workshop"
            label="Titel: "
            type="text"
            placeholder="Workshop"
          />
        </div>
      </div>

      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            v-model="description"
            label="Text: "
            type="textarea"
            placeholder="Beschreibung"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            type="date"
            label="Start: "
            v-model="workshopFrom"
            placeholder="Auswählen"
          />
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="px-2">
          <FormKit
            type="date"
            label="Ende: "
            v-model="workshopTo"
            placeholder="Auswählen"
            :validation="[['date_after', workshopFrom]]"
            validation-visibility="live"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="grid flex gap-2 px-4">
    <button
      class="bg-wd-error shadow rounded-md h-10 w-full text-white font-bold"
      @click="openDeteleModal()"
    >
      Erfahrung entfernen
    </button>
    <button
      class="bg-wd-green shadow rounded-md h-16 w-full text-white font-bold"
      @click="saveToLocalStorage()"
    >
      Erfahrung speichern
    </button>
  </div>

  <CropModal :show="showDeleteModal">
    <div class="place-items-center">
      <div class="text-white text-xl p-2">Entfernen?</div>
      <div class="text-white font-Montserrat text-base font-bold pb-2">
        <p>
          Bist du wirklich sicher, dass du diese Erfahrung entfernen willst?
        </p>
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
import { ref, onMounted, defineProps } from "vue";
import { slideDown } from "@/store/store.js";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const workshop = ref(null);
const description = ref(null);
const workshopFrom = ref(null);
const workshopTo = ref(null);
const experiences = ref(JSON.parse(localStorage.getItem("experiences")) || []);
const showDeleteModal = ref(false);

const props = defineProps({
  editIndex: {
    type: Number,
    default: 0,
  },
});

onMounted(() => {
  workshop.value = experiences.value[props.editIndex][0].workshop;
  description.value = experiences.value[props.editIndex][0].description;
  workshopFrom.value = experiences.value[props.editIndex][0].workshopFrom;
  workshopTo.value = experiences.value[props.editIndex][0].workshopTo;
});

const saveToLocalStorage = () => {
  let dateCheck = false;

  if (workshopFrom.value != null && workshopTo.value != null) {
    if (workshopFrom.value <= workshopTo.value) {
      dateCheck = true;
    }
  } else if (workshopFrom.value != null || workshopTo.value != null) {
    dateCheck = true;
  }
  if (dateCheck) {
    if (localStorage.getItem("experiences")) {
      console.log("Update Education");
      experiences.value[props.editIndex][0].workshop = workshop.value;
      experiences.value[props.editIndex][0].description = description.value;
      experiences.value[props.editIndex][0].workshopFrom = workshopFrom.value;
      experiences.value[props.editIndex][0].workshopTo = workshopTo.value;
      localStorage.setItem("experiences", JSON.stringify(experiences.value));
    } else {
      const experience = [
        {
          workshop: workshop.value,
          description: description.value,
          workshopFrom: workshopFrom.value,
          workshopTo: workshopTo.value,
        },
      ];
      localStorage.setItem("experiences", JSON.stringify([experience]));
    }
    slideDown.value = true;
  } else {
    errorMessage();
  }
};
const removeFromLocalStorage = () => {
  experiences.value.splice(props.editIndex, 1);
  localStorage.setItem("experiences", JSON.stringify(experiences.value));
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
