<template>
  <div class="inset-0 h-screen dark:bg-slate-800">
    <div class="flex">
      <h1
        class="px-3 p-2 text-black dark:text-white font-Montserrat md:text-2xl font-bold"
      ></h1>
      <div class="grow ..."></div>
      <button type="button" @click="closeModal()" class="p-4">
        <CloseIcon
          class="h-10 w-10 dark:stroke-wd-white stroke-black stroke-1"
        ></CloseIcon>
      </button>
    </div>

    <div class="absolute flex flex-col items-center justify-center">
      <div
        class="flex flex-row items-center font-light dark:text-white text-black cursor-pointer select-none text-2xl md:text-4xl p-4"
      >
        Bitte kontrolliere deine Unterlagen, {{ userName }}
      </div>
      <MultiCheckbox v-model:value="checklist" :options="options" />
      <div class="grid flex pt-10 px-4 w-screen">
        <button
          class="bg-wd-green shadow rounded-md h-16 w-full text-white font-bold"
          @click="gotoPreview()"
        >
          Bewerbungsschreiben erstellen
        </button>
      </div>

      <MultiCheckbox
        v-model:value="checkListDisable"
        :options="enableDisable"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import MultiCheckbox from "@/components/MenuModals/MultiCheckbox.vue";
import { sideBack, sideBackBack } from "@/store/store.js";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const allchecked = ref(false);
const checklist = ref([]);
const checkListDisable = ref([]);
const checkListOffOn = ref(true);
const enableDisable = ref([]);
const options = ref([]);
const userName = ref("");

const getCheckList = () => {
  checklist.value = [0, 0, 0];
  checkListDisable.value = [0];
};
const getCheckOptions = () => {
  options.value = [
    { name: "Hast du die Ansprechperson angepasst?", id: 1 },
    { name: "Sind deine Kontaktdaten aktuell?", id: 2 },
    { name: "Hast du ein Motivationsschreiben erstellt?", id: 3 },
  ];
  enableDisable.value = [
    {
      name: "Diese Checkliste nicht mehr Anzeigen!",
    },
  ];
};
onMounted(() => {
  const userInfos = ref(JSON.parse(localStorage.getItem("userInfos")) || []);
  if (localStorage.getItem("userInfos")) {
    userName.value = userInfos.value[0][0].firstName;
  } else {
    userName.value = "";
  }
  sideBackBack.value = true;
  sideBack.value = true;
  getCheckOptions();
  getCheckList();
  if (localStorage.getItem("previewshow") == "false") {
    sideBackBack.value = false;
    console.log("Bewerbungsschreiben erstellen");
  }
});
const gotoPreview = async () => {
  for (let i = 0; i < checklist.value.length; i++) {
    if (checklist.value[i] == 0) {
      allchecked.value = false;
    } else {
      allchecked.value = true;
    }
  }
  if (allchecked.value == true) {
    sideBackBack.value = false;
    console.log("Bewerbungsschreiben erstellen");
  } else {
    errorMessage();
  }
  for (let i = 0; i < checkListDisable.value.length; i++) {
    if (checkListDisable.value[i] == 0) {
      checkListOffOn.value = false;
    } else {
      checkListOffOn.value = true;
    }
  }

  if (checkListOffOn.value == false) {
    localStorage.setItem("previewshow", "true");
  } else {
    localStorage.setItem("previewshow", "false");
  }
};
const closeModal = () => {
  sideBack.value = false;
};
const errorMessage = () => {
  createToast("Du hast nicht alle drei Kästchen angeklickt!", {
    type: "danger",
    position: "bottom-center",
  });
};
</script>
