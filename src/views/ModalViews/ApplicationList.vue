<template>
  <div>
    <section class="z-0">
      <div class="grid gap-2" v-if="renderComponent4">
        <Container @drop="onDrop">
          <Draggable
            v-for="(item, index) in applications"
            :key="index"
            class="p-2"
          >
            <div class="flex">
              <button @click="openBottomCard(index)" class="grow px-2">
                <div
                  class="p-2 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border border-wd-green"
                >
                  <div class="font-bold text-xl">{{ item[0].company }}</div>
                  <div>{{ item[0].job }}</div>
                  <div class="flex">
                    <div class="flex-none">Deadline</div>
                    <div class="grow py-2 px-2">
                      <ArrowIcon
                        class="dark:stroke-wd-white stroke-1 w-full h-2"
                      ></ArrowIcon>
                    </div>
                    <div class="flex-none">
                      {{ item[0].deadline }}
                    </div>
                  </div>
                  <div class="flex">
                    <div class="flex-none">Motivationsschreiben</div>
                    <div class="grow py-2 px-2">
                      <ArrowIcon
                        class="dark:stroke-wd-white stroke-1 w-full h-2"
                      ></ArrowIcon>
                    </div>
                    <div class="flex-none">
                      <CloseIcon
                        v-if="!item[0].mv"
                        class="w-24 stroke-wd-error"
                      ></CloseIcon>
                    </div>
                    <div class="flex-none">
                      <CheckIcon
                        v-if="item[0].mv"
                        class="w-24 stroke-wd-green"
                      ></CheckIcon>
                    </div>
                  </div>
                </div>
              </button>
              <div class="flex-none p-4">
                <SortIcon class="h-full"></SortIcon>
              </div>
            </div>
          </Draggable>
        </Container>
      </div>
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
            :is="ApplicationEdit"
            :editIndex="currentButtonIndex"
          />
        </div>
      </div>
    </MVEditModal>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import ApplicationEdit from "./ApplicationEdit.vue";
import MVEditModal from "@/components/Modals/MVEditModal.vue";
import SortIcon from "@/assets/icons/SortIcon.vue";
import ArrowIcon from "@/assets/icons/ArrowIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import CheckIcon from "@/assets/icons/CheckIcon.vue";

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
