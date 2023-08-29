<template>
  <section
    class="fixed inset-x-0 z-10 shadow dark:text-white text-xl font-Montserrat bg-white dark:bg-slate-800 shadow"
  >
    <div class="flex justify-center p-2">
      <div class="px-2 font-bold">Einstellungen</div>
    </div>
  </section>
  <div class="max-w-[100%] py-20">
    <div class="flex justify-evenly">
      <p class="text-black dark:text-white font-Montserrat text-md font-bold">
        Light
      </p>
      <Toggle
        v-model="toggleOnDark"
        :classes="{
          container: 'inline-block',
          toggle:
            'flex w-12 h-5 rounded-full relative cursor-pointer transition items-center box-content border-2 text-xs leading-none',
          toggleOn:
            'bg-wd-green border-wd-green justify-start text-black bg-slate-800',
          toggleOff: 'bg-gray-200 border-gray-200 justify-end',
          handle:
            'inline-block bg-white w-5 h-5 rounded-full absolute transition-all',
          handleOn: 'left-full transform -translate-x-full bg-shite',
          handleOff: 'left-0 bg-slate-600',
          label: 'text-center w-8 border-box whitespace-nowrap select-none',
        }"
      />
      <p class="text-black dark:text-white font-Montserrat text-md font-bold">
        Dark
      </p>
    </div>
  </div>
  <div class="max-w-[100%] pb-20">
    <div class="flex justify-evenly">
      <p class="text-black dark:text-white font-Montserrat text-md font-bold">
        Checkliste aus
      </p>
      <Toggle
        v-model="checklistOnOff"
        :classes="{
          container: 'inline-block',
          toggle:
            'flex w-12 h-5 rounded-full relative cursor-pointer transition items-center box-content border-2 text-xs leading-none',
          toggleOn:
            'bg-wd-green border-wd-green justify-start text-black bg-slate-800',
          toggleOff: 'bg-gray-200 border-gray-200 justify-end',
          handle:
            'inline-block bg-white w-5 h-5 rounded-full absolute transition-all',
          handleOn: 'left-full transform -translate-x-full bg-shite',
          handleOff: 'left-0 bg-slate-600',
          label: 'text-center w-8 border-box whitespace-nowrap select-none',
        }"
      />
      <p class="text-black dark:text-white font-Montserrat text-md font-bold">
        Checkliste an
      </p>
    </div>
  </div>
  <div class="grid flex gap-2 px-4">
    <button
      class="bg-wd-error shadow rounded-md h-10 w-full text-white font-bold"
      @click="openQueryModal()"
    >
      Daten zurücksetzen
    </button>
  </div>
  <CropModal :show="showModal">
    <div class="place-items-center">
      <div class="text-white text-xl p-2">Daten zurücksetzen?</div>
      <div class="text-white font-Montserrat text-base font-bold pb-2">
        <p>
          Bist du sicher, dass du alle Daten löschen willst? Die Daten können
          nicht mehr wiederhergestellt werden!
        </p>
      </div>
    </div>

    <div
      class="flex justify-evenly text-white font-Montserrat text-base font-bold h-10"
    >
      <button type="button" @click="closeModal()" class="bg-wd-error w-screen">
        Nein
      </button>

      <button
        type="button"
        @click="removeAllData()"
        class="bg-wd-green w-screen"
      >
        Ja
      </button>
    </div>
  </CropModal>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Toggle from "@vueform/toggle";
import { isDarkMode } from "@/store/store.js";

const toggleOnDark = ref(false);
const checklistOnOff = ref(true);
const showModal = ref(false);

if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  toggleOnDark.value = true;
} else if (JSON.parse(localStorage.getItem("theme")) == "light") {
  toggleOnDark.value = false;
} else {
  toggleOnDark.value = true;
}
watch(toggleOnDark, () => {
  isDarkMode.value = toggleOnDark.value;
  if (isDarkMode.value == true) {
    localStorage.setItem("theme", JSON.stringify("dark"));
  } else {
    localStorage.setItem("theme", JSON.stringify("light"));
  }
});
watch(checklistOnOff, () => {
  if (checklistOnOff.value == false) {
    localStorage.setItem("previewshow", "false");
  } else {
    localStorage.setItem("previewshow", "true");
  }
});
const userInfos = ref(JSON.parse(localStorage.getItem("userInfos")) || []);
const firstName = ref(null);
onMounted(() => {
  if (localStorage.getItem("userInfos")) {
    firstName.value = userInfos.value[0][0].firstName;
  }
  if (localStorage.getItem("previewshow") == "false") {
    checklistOnOff.value = false;
  } else {
    checklistOnOff.value = true;
  }
});
const removeAllData = () => {
  localStorage.clear();
  localStorage.setItem("theme", JSON.stringify("dark"));
  toggleOnDark.value = true;
  isDarkMode.value = false;
  isDarkMode.value = true;
  closeModal();
};
const closeModal = () => {
  showModal.value = false;
};
const openQueryModal = () => {
  showModal.value = true;
};
</script>
