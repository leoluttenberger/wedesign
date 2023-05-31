<template>
  <div class="inset-0 h-screen dark:bg-slate-800">
    <div class="flex">
      <h1
        class="px-3 p-2 text-black dark:text-white font-Montserrat text-2xl md:text-xxl font-bold"
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
        class="flex flex-row items-center font-light dark:text-white text-black cursor-pointer select-none text-4xl p-4"
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
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import MultiCheckbox from "@/components/MenuModals/MultiCheckbox.vue";
import { sideBack, sideBackBack } from "@/store/store.js";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

const allchecked = ref(false);
const checklist = ref([]);
const options = ref([]);
const userName = ref("");
const getCheckList = () => {
  checklist.value = [0, 0, 0];
};
const getCheckOptions = () => {
  options.value = [
    { name: "Hast du die Ansprechperson angepasst?", id: 1 },
    { name: "Sind deine Kontaktdaten aktuell?", id: 2 },
    { name: "Hast du ein Motivationschreiben erstellt?", id: 3 },
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
});
const gotoPreview = () => {
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
  }
};
const closeModal = () => {
  sideBack.value = false;
  console.log("close modal");
};
</script>
