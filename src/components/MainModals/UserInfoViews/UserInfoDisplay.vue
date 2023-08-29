<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen">
    <section class="z-0 py-20">
      <ProfileView></ProfileView>
      <div class="flex grid place-items-end px-6">
        <button
          @click="openBottomCard"
          class="bg-wd-green hover:bg-transparent-green shadow p-2 md:p-4 rounded-full"
        >
          <EditIcon
            class="h-6 w-6 dark:stroke-wd-white stroke-black stroke-1"
          ></EditIcon>
        </button>
      </div>

      <UserForm v-if="renderComponent5"></UserForm>
      <div
        class="group fixed bottom-20 p-6 flex flex-col items-center justify-center w-full h-24 mx-auto md:text-2xl text-base"
      >
        <button
          @click="openCVExport()"
          class="bg-wd-green hover:bg-transparent-green shadow p-2 text-white font-Montserrat font-bold rounded-md"
        >
          Vorschau & Teilen
        </button>
      </div>
    </section>
  </div>
  <div>
    <MVEditModal :show="bottomCardOpen5">
      <div class="flex">
        <div
          class="rounded-lg w-screen h-screen overflow-hidden shadow-xl dark:bg-slate-700 bg-white"
        >
          <component :is="UserInfoEdit" />
        </div>
      </div>
    </MVEditModal>
  </div>
  <div>
    <MVEditModal :show="bottomCardOpen6">
      <div class="flex">
        <div
          class="rounded-lg w-screen h-screen overflow-hidden shadow-xl dark:bg-slate-700 bg-white"
        >
          <component :is="UserInfoPreview" />
        </div>
      </div>
    </MVEditModal>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { slideDownUserInfo } from "@/store/store.js";

import EditIcon from "@/assets/icons/EditIcon.vue";

import MVEditModal from "@/components/MenuModals/MVEditModal.vue";
import UserInfoEdit from "@/components/MainModals/UserInfoViews/UserInfoEdit.vue";
import UserInfoPreview from "@/components/MainModals/UserInfoViews/UserInfoPreview.vue";
import UserForm from "@/components/MainModals/UserInfoViews/UserForm.vue";
import ProfileView from "@/views/ProfileView.vue";

const applications = ref(
  JSON.parse(localStorage.getItem("applications")) || []
);
const bottomCardOpen5 = ref(false);
const bottomCardOpen6 = ref(false);
const renderComponent5 = ref(true);
let currentButtonIndex = ref(0);
watch(slideDownUserInfo, () => {
  if (slideDownUserInfo.value == true) {
    bottomCardOpen5.value = false;
    bottomCardOpen6.value = false;
  }
});

watch(bottomCardOpen5, () => {
  if (bottomCardOpen5.value == false) {
    applications.value = JSON.parse(localStorage.getItem("applications"));
    renderComponent5.value = true;
  } else {
    renderComponent5.value = false;
  }
});

onMounted(() => {
  slideDownUserInfo.value = true;
  bottomCardOpen5.value = false;
  bottomCardOpen6.value = false;
});

const openBottomCard = (id) => {
  currentButtonIndex.value = id;
  bottomCardOpen5.value = true;
  bottomCardOpen6.value = false;
};

const onDrop = (dropResult) => {
  const newData = applyDrag(applications, dropResult); // educations call by reference
  localStorage.setItem("applications", JSON.stringify(applications.value));
};
const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;

  if (removedIndex === null && addedIndex === null) return arr;
  let itemToAdd = payload;
  if (removedIndex !== null) {
    itemToAdd = arr.value.splice(removedIndex, 1)[0];
  }
  if (addedIndex !== null) {
    arr.value.splice(addedIndex, 0, itemToAdd);
  }
  return arr;
};
const closeModal = () => {
  bottomCardOpen5.value = false;
};
const openCVExport = () => {
  bottomCardOpen6.value = true;
  bottomCardOpen5.value = false;
};
</script>
