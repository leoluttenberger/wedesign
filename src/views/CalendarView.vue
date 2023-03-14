<template>
  <section
    class="fixed inset-x-0 z-10 shadow dark:text-white text-xl font-Montserrat bg-white dark:bg-slate-800 shadow"
  >
    <div class="flex justify-center p-2 font-bold">Erinnerungen</div>
  </section>
  <div class="overflow-auto overflow-scroll w-screen h-screen">
    <div class="py-14 px-4">
      <v-calendar
        ref="calendar"
        :is-dark="theme"
        is-expanded
        :attributes="attributes"
        :locale="locale"
        @dayclick="dayClicked"
      />
      <div class="flex">
        <BellIcon
          class="h-10 w-8 dark:stroke-wd-white stroke-black stroke-1"
        ></BellIcon>
        <div
          v-if="!selectedDay"
          class="selected-day py-3 px-3 text-black dark:text-white font-Montserrat text-sm md:text-base font-bold"
        >
          Nächste Termine
        </div>
        <div
          v-if="selectedDay"
          class="selected-day py-3 px-3 text-black dark:text-white font-Montserrat text-sm md:text-base font-bold"
        >
          <h3>{{ selectedDay.date.toDateString() }}</h3>
          <ul>
            <li v-for="attr in selectedDay.attributes" :key="attr.key">
              {{ attr.customData.description }}
            </li>
          </ul>
        </div>
      </div>
      <section
        class="z-0 overflow-auto overflow-scroll w-screen h-screen py-20"
      >
        <component :is="CalendarList" :key="renderComponent" />
        <div class="flex justify-center p-4">
          <button
            @click="openBottomCard()"
            class="bg-wd-green hover:bg-transparent-green shadow p-2 md:p-4 rounded-full"
          >
            <AddIcon
              class="h-10 w-10 dark:stroke-wd-white stroke-black stroke-1"
            ></AddIcon>
          </button>
        </div>
      </section>
      <div>
        <div
          v-if="bottomCardOpen"
          class="fixed z-10 inset-0 bg-black bg-opacity-10"
        >
          <BottomCard v-model:open="bottomCardOpen">
            <SwiperCard :items="items">
              <button @click="closeBottomCard()" class="p-2">
                <div class="flex">
                  <CloseIcon
                    class="py-8 h-24 w-24 dark:stroke-wd-white stroke-black stroke-1"
                  ></CloseIcon>
                  <div class="flex justify-center">
                    <h1
                      class="py-10 px-10 text-black dark:text-white font-Montserrat text-xl md:text-xxl font-bold"
                    >
                      Erinnerungen
                    </h1>
                  </div>
                </div>
              </button>
              <div class="flex flex-col items-left shadow-lg-up">
                <component :is="CalendarForm" />
              </div>
            </SwiperCard>
          </BottomCard>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import BellIcon from "../assets/icons/BellIcon.vue";
import AddIcon from "@/assets/icons/AddIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import BottomCard from "@/components/BottomCard.vue";
import CalendarForm from "@/views/ModalViews/CalendarForm.vue";
import CalendarList from "@/views/ModalViews/CalendarList.vue";
import { slideDown } from "@/store.js";
interface SlideItem {
  id: string;
  index: number;
  text: string;
}

let theme = ref(false);
const calendar = ref("");
const locale = "de-AT";
const selectedDay = ref(null);
const bottomCardOpen = ref(false);
const renderComponent = ref(true);

let idCounter = 0;
const getID = () => (idCounter++).toString();
let posIndexCounter = 0;
const getPosIndex = () => posIndexCounter++;
const items = ref<SlideItem[]>([
  { id: getID(), index: getPosIndex(), text: "First" },
]);

if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  theme.value = true;
} else {
  theme.value = false;
}
watch(bottomCardOpen, () => {
  if (bottomCardOpen.value == false) {
    renderComponent.value = true;
  } else {
    renderComponent.value = false;
  }
});

let attributes = ref([
  {
    key: "today",
    dot: true,
    dates: new Date(),
  },
]);

const dayClicked = (day) => {
  selectedDay.value = day;
};
const openBottomCard = () => {
  bottomCardOpen.value = true;
  slideDown.value = false;
};
const closeBottomCard = () => {
  bottomCardOpen.value = false;
  slideDown.value = true;
};
</script>
