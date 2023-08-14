<template>
  <div>
    <section class="z-0">
      <div class="grid gap-2">
        <Container @drop="onDrop" v-if="!isPicked">
          <div v-for="(item, index) in appointments" :key="index">
            <div
              v-if="
                ((item[0].appointmentFrom
                  ? item[0].appointmentFrom.slice(5, 7) == currentMonth
                  : false) ||
                  (item[0].appointmentTo
                    ? item[0].appointmentTo.slice(5, 7) == currentMonth
                    : false)) &&
                ((item[0].appointmentFrom
                  ? item[0].appointmentFrom.slice(0, 4) == currentYear
                  : false) ||
                  (item[0].appointmentTo
                    ? item[0].appointmentTo.slice(0, 4) == currentYear
                    : false))
              "
            >
              <div class="flex">
                <button @click="openBottomCard(index)" class="grow p-2">
                  <div
                    class="p-2 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border-2"
                    :class="
                      item[0].type == blueType
                        ? 'border-wd-blue'
                        : item[0].type == redType
                        ? 'border-red-500'
                        : item[0].type == yellowType
                        ? 'border-wd-yellow'
                        : item[0].type == pinkType
                        ? 'border-wd-pink'
                        : 'border-wd-green'
                    "
                  >
                    <div class="font-bold text-base">
                      {{ item[0].type + ": " + item[0].title }}
                    </div>
                    <div class="flex">
                      <div class="flex-none text-sm">
                        {{
                          item[0].appointmentFrom
                            ? item[0].appointmentFrom.slice(8, 10) +
                              "." +
                              item[0].appointmentFrom.slice(5, 7) +
                              "." +
                              item[0].appointmentFrom.slice(0, 4) +
                              " " +
                              item[0].appointmentFrom.slice(11, 16) +
                              " Uhr"
                            : ""
                        }}
                      </div>
                      <div class="grow py-2 px-2">
                        <ArrowIcon
                          class="dark:stroke-wd-white stroke-1 w-full h-2"
                        ></ArrowIcon>
                      </div>
                      <div class="flex-none text-sm">
                        {{
                          item[0].appointmentTo
                            ? item[0].appointmentTo.slice(8, 10) +
                              "." +
                              item[0].appointmentTo.slice(5, 7) +
                              "." +
                              item[0].appointmentTo.slice(0, 4) +
                              " " +
                              item[0].appointmentTo.slice(11, 16) +
                              " Uhr"
                            : ""
                        }}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </Container>
        <Container @drop="onDrop" v-if="isPicked">
          <div v-for="(item, index) in appointments" :key="index">
            <div v-if="checkFilter(item)">
              <button @click="openBottomCard(index)" class="grow p-2">
                <div
                  class="p-2 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border-2"
                  :class="
                    item[0].type == blueType
                      ? 'border-wd-blue'
                      : item[0].type == redType
                      ? 'border-red-500'
                      : item[0].type == yellowType
                      ? 'border-wd-yellow'
                      : item[0].type == pinkType
                      ? 'border-wd-pink'
                      : 'border-wd-green'
                  "
                >
                  <div class="font-bold text-base">
                    {{ item[0].type + ": " + item[0].title }}
                  </div>
                  <div class="flex">
                    <div class="flex-none text-sm">
                      {{
                        item[0].appointmentFrom
                          ? item[0].appointmentFrom.slice(8, 10) +
                            "." +
                            item[0].appointmentFrom.slice(5, 7) +
                            "." +
                            item[0].appointmentFrom.slice(0, 4) +
                            " " +
                            item[0].appointmentFrom.slice(11, 16) +
                            " Uhr"
                          : ""
                      }}
                    </div>
                    <div class="grow py-2 px-2">
                      <ArrowIcon
                        class="dark:stroke-wd-white stroke-1 w-full h-2"
                      ></ArrowIcon>
                    </div>
                    <div class="flex-none text-sm">
                      {{
                        item[0].appointmentTo
                          ? item[0].appointmentTo.slice(8, 10) +
                            "." +
                            item[0].appointmentTo.slice(5, 7) +
                            "." +
                            item[0].appointmentTo.slice(0, 4) +
                            " " +
                            item[0].appointmentTo.slice(11, 16) +
                            " Uhr"
                          : ""
                      }}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  </div>

  <teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <section :class="darkLightMode">
        <div
          v-if="bottomCardOpen2"
          class="fixed z-10 inset-0 dark:bg-transparent-black bg-wd-white bg-opacity-50"
        >
          <BottomCard v-model:open="bottomCardOpen2">
            <SwiperCard :items="items">
              <button @click="closeBottomCard()">
                <div class="flex">
                  <p
                    class="px-3 p-2 text-black dark:text-white font-Montserrat text-2xl md:text-xxl font-bold"
                  >
                    Erinnerungen
                  </p>
                  <div class="grow ..."></div>
                  <div class="px-2 py-2">
                    <CloseIcon
                      class="h-10 w-10 dark:stroke-wd-white stroke-black stroke-1"
                    ></CloseIcon>
                  </div>
                </div>
              </button>
              <div class="flex flex-col items-left shadow-lg-up">
                <component
                  v-bind="currentButtonIndex"
                  :is="CalendarEdit"
                  :editIndex="currentButtonIndex"
                />
              </div>
            </SwiperCard>
          </BottomCard>
        </div>
      </section>
    </transition>
  </teleport>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import {
  slideDown,
  isDarkMode,
  selectedDay,
  selectedMonth,
  selectedYear,
  isMonthEvent,
  isQuickAccessCalendar,
  lastCalendarIndex,
} from "@/store/store.js";
import ArrowIcon from "@/assets/icons/ArrowIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

import CalendarEdit from "@/components/MainModals/CalendarViews/CalendarEdit.vue";
import BottomCard from "@/components/MenuModals/BottomCard.vue";
import SwiperCard from "@/components/MenuModals/SwiperCard.vue";

import { Container } from "vue3-smooth-dnd";
import { select } from "@formkit/inputs";

const appointments = ref(
  JSON.parse(localStorage.getItem("appointments")) || []
);
const bottomCardOpen2 = ref(false);
let currentButtonIndex = ref(0);
const currentDay = ref(0);
const currentMonth = ref(new Date().getMonth() + 1);
const currentYear = ref(new Date().getFullYear());
const isPicked = ref(false);
const blueType = ref("Bewerbungsgespräch");
const redType = ref("Ende");
const yellowType = ref("Aufnahmetest");
const pinkType = ref("Feedback");
const greenType = ref("Sonstige text-basee");

interface SlideItem {
  id: string;
  index: number;
  text: string;
}

let idCounter = 0;
const getID = () => (idCounter++).toString();
let posIndexCounter = 0;
const getPosIndex = () => posIndexCounter++;

const items = ref<SlideItem[]>([
  { id: getID(), index: getPosIndex(), text: "First" },
]);

const darkLightMode = ref(JSON.parse(localStorage.getItem("theme")) || []);
if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  darkLightMode.value = "dark";
} else if (JSON.parse(localStorage.getItem("theme")) == "light") {
  darkLightMode.value = "light";
} else {
  darkLightMode.value = "dark";
  isDarkMode.value = "dark";
}

watch(isQuickAccessCalendar, () => {
  if (isQuickAccessCalendar.value == true) {
    openBottomCard(lastCalendarIndex.value);
  }
});

watch(isDarkMode, () => {
  if (isDarkMode.value == true) {
    darkLightMode.value = "dark";
  } else {
    darkLightMode.value = "light";
  }
});

watch(bottomCardOpen2, () => {
  if (bottomCardOpen2.value == false) {
    appointments.value = JSON.parse(localStorage.getItem("appointments"));
  }
});
watch(slideDown, () => {
  if (slideDown.value == true) {
    bottomCardOpen2.value = false;
  }
});
watch(selectedDay, () => {
  if (selectedDay.value > 0) {
    isPicked.value = true;
    currentDay.value = selectedDay.value;
  } else {
    isPicked.value = false;
    currentDay.value = 0;
  }
});
watch(isMonthEvent, () => {
  isPicked.value = false;
  currentMonth.value = selectedMonth.value + 1;
  currentYear.value = selectedYear.value;
});

const openBottomCard = (id) => {
  currentButtonIndex.value = id;
  slideDown.value = false;
  bottomCardOpen2.value = true;
  isQuickAccessCalendar.value = false;
  lastCalendarIndex.value = 0;
};

const onDrop = (dropResult) => {
  const newData = applyDrag(appointments, dropResult);
  localStorage.setItem("appointments", JSON.stringify(newData.value));
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
const closeBottomCard = () => {
  slideDown.value = true;
};
const checkFilter = (item: any) => {
  if (item[0].appointmentFrom != null && item[0].appointmentTo != null) {
    if (
      item[0].appointmentFrom.slice(5, 7) <= currentMonth.value &&
      item[0].appointmentFrom.slice(0, 4) <= currentYear.value
    ) {
      if (
        item[0].appointmentTo.slice(5, 7) >= currentMonth.value &&
        item[0].appointmentTo.slice(0, 4) >= currentYear.value
      ) {
        if (
          item[0].appointmentFrom.slice(8, 10) <= selectedDay.value &&
          item[0].appointmentTo.slice(8, 10) >= selectedDay.value
        ) {
          return true;
        }
      }
    }
  } else {
    if (item[0].appointmentFrom != null) {
      if (
        item[0].appointmentFrom.slice(0, 4) == currentYear.value &&
        item[0].appointmentFrom.slice(5, 7) == currentMonth.value
      ) {
        if (item[0].appointmentFrom.slice(8, 10) == selectedDay.value) {
          return true;
        }
      }
    }
    if (item[0].appointmentTo != null) {
      if (
        item[0].appointmentTo.slice(0, 4) == currentYear.value &&
        item[0].appointmentTo.slice(5, 7) == currentMonth.value
      ) {
        if (item[0].appointmentTo.slice(8, 10) == selectedDay.value) {
          return true;
        }
      }
    }
  }
  return false;
};
</script>
