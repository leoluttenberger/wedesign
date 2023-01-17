<template>
  <div class="overflow-auto overflow-scroll w-screen h-screen">
    <section class="z-0 py-20">
      <ProfileView></ProfileView>
      <div class="flex grid place-items-center">
        <button
          @click="openBottomCard"
          class="bg-wd-green hover:bg-transparent-green shadow p-2 md:p-4 rounded-full"
        >
          <EditIcon
            class="h-10 w-10 dark:stroke-wd-white stroke-black stroke-1"
          ></EditIcon>
        </button>
      </div>

      <UserForm></UserForm>
    </section>
  </div>
  <div>
    <MVEditModal :show="bottomCardOpen4">
      <div class="flex">
        <div
          class="rounded-lg w-screen h-screen overflow-hidden shadow-xl dark:bg-slate-700 bg-white"
        >
          <component
            v-bind="currentButtonIndex"
            :is="UserInfoEdit"
            :editIndex="currentButtonIndex"
          />
        </div>
      </div>
    </MVEditModal>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import MVEditModal from "@/components/Modals/MVEditModal.vue";
import UserInfoEdit from "./UserInfoEdit.vue";
import UserForm from "./UserForm.vue";
import ArrowIcon from "@/assets/icons/ArrowIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import EditIcon from "@/assets/icons/EditIcon.vue";
import ProfileView from "../ProfileView.vue";

import { slideDown } from "@/store.js";
import { Container, Draggable } from "vue3-smooth-dnd";

const applications = ref(JSON.parse(localStorage.getItem("applications")));
const bottomCardOpen4 = ref(false);
const renderComponent4 = ref(true);
let currentButtonIndex = ref(0);

watch(slideDown, () => {
  if (slideDown.value) {
    bottomCardOpen4.value = false;
  } else {
    bottomCardOpen4.value = true;
  }
});

watch(bottomCardOpen4, () => {
  if (bottomCardOpen4.value == false) {
    applications.value = JSON.parse(localStorage.getItem("applications"));
    renderComponent4.value = true;
  } else {
    renderComponent4.value = false;
  }
});

const openBottomCard = (id) => {
  currentButtonIndex.value = id;
  slideDown.value = false;
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
  bottomCardOpen4.value = false;
};
</script>
