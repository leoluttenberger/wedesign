<template>
  <section
    class="fixed inset-x-0 z-10 shadow dark:text-white text-xl font-Montserrat bg-white dark:bg-slate-800 shadow"
  >
    <div class="flex justify-center p-2 font-bold">Erinnerungen</div>
  </section>
  <div class="flex pt-12 px-2" v-if="renderComponent">
    <v-calendar
      ref="calendar"
      :is-dark="theme"
      is-expanded
      :attributes="attributes"
      :locale="locale"
      @dayclick="dayClicked"
      @change-page="onPageChange"
    >
      <template #footer>
        <div class="w-full px-2 pb-3">
          <button
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full px-3 py-1 rounded-md"
            @click="moveToAll"
          >
            Termine im Monat
          </button>
        </div>
      </template></v-calendar
    >
  </div>
  <div class="flex px-2">
    <BellIcon
      class="h-10 w-8 dark:stroke-wd-white stroke-black stroke-1"
    ></BellIcon>
    <div
      v-if="!pickedDate"
      class="selected-day py-3 px-3 text-black dark:text-white font-Montserrat text-sm md:text-base font-bold"
    >
      Nächste Termine
    </div>
    <div
      v-if="pickedDate"
      class="selected-day py-3 px-3 text-black dark:text-white font-Montserrat text-sm md:text-base font-bold"
    >
      <h3>{{ pickedDate.date.toDateString() }}</h3>
    </div>
  </div>
  <section class="z-0 overflow-auto overflow-scroll w-screen h-1/2">
    <div>
      <component :is="CalendarList" :key="renderComponent" />
    </div>
    <div class="flex justify-end p-2 pb-20">
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
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import BellIcon from "@/assets/icons/BellIcon.vue";
import AddIcon from "@/assets/icons/AddIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

import BottomCard from "@/components/MenuModals/BottomCard.vue";

import CalendarForm from "@/components/MainModals/CalendarForm.vue";
import CalendarList from "@/components/MainModals/CalendarList.vue";

import {
  slideDown,
  selectedDay,
  selectedMonth,
  addedDate,
  addedType,
} from "@/store/store.js";
interface SlideItem {
  id: string;
  index: number;
  text: string;
}

let theme = ref(false);
const calendar = ref(null);
const locale = "de-AT";
const bottomCardOpen = ref(false);
const renderComponent = ref(true);
const pickedDate = ref(null);
const appointments = ref(JSON.parse(localStorage.getItem("appointments")));
const month = ref(0);

interface Highlight {
  start: { fillMode: string; color: string };
  base: { fillMode: string; color: string };
  end: { fillMode: string; color: string };
}
interface Dates {
  start: Date;
  end: Date;
}
interface Dot {
  style: {
    backgroundColor: string;
  };
}

interface Todo {
  dot: Dot;
  highlight: Highlight;
  dates: Dates;
}
// Define the initial list of todos
const todos: Todo[] = [];

const addTodo = (color: string | undefined, dates: Dates, todos: Todo[]) => {
  // Otherwise, create a new todo item with the specified date and highlight
  todos.push({
    dot: {
      style: {
        backgroundColor: color,
      },
    },
    highlight: {
      start: { fillMode: "outline", color: color },
      base: { fillMode: "dot", color: color },
      end: { fillMode: "outline", color: color },
    },
    dates: dates,
  });
};
// Add a new todo with a new date and highlight
if (localStorage.getItem("appointments")) {
  for (let i = 0; i < appointments.value.length; i++) {
    const yearStart = appointments.value[i][0].appointmentFrom.slice(0, 4);
    const monthStart = appointments.value[i][0].appointmentFrom.slice(5, 7) - 1;
    const dayStart = appointments.value[i][0].appointmentFrom.slice(8, 10);
    const yearEnd = appointments.value[i][0].appointmentTo.slice(0, 4);
    const monthEnd = appointments.value[i][0].appointmentTo.slice(5, 7) - 1;
    const dayEnd = appointments.value[i][0].appointmentTo.slice(8, 10);
    const dates: Dates = {
      start: new Date(yearStart, monthStart, dayStart),
      end: new Date(yearEnd, monthEnd, dayEnd),
    };

    if (appointments.value[i][0].type == "Bewerbungsgespräch") {
      addTodo("green", dates, todos);
    } else if (appointments.value[i][0].type == "Deadline") {
      addTodo("red", dates, todos);
    } else {
      addTodo("orange", dates, todos);
    }
  }
} else {
  const dates: Dates = {
    start: new Date(),
    end: new Date(),
  };
  addTodo("blue", dates, todos);
}

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

onMounted(() => {
  selectedMonth.value = new Date().getMonth();
});

watch(bottomCardOpen, () => {
  if (bottomCardOpen.value == false) {
    renderComponent.value = true;
    if (addedDate.value != "") {
      const yearStart = addedDate.value.slice(0, 4);
      const monthStart = addedDate.value.slice(5, 7) - 1;
      const dayStart = addedDate.value.slice(8, 10);
      const yearEnd = addedDate.value.slice(0, 4);
      const monthEnd = addedDate.value.slice(5, 7) - 1;
      const dayEnd = addedDate.value.slice(8, 10);
      const dates: Dates = {
        start: new Date(yearStart, monthStart, dayStart),
        end: new Date(yearEnd, monthEnd, dayEnd),
      };

      if (addedType.value == "Bewerbungsgespräch") {
        addTodo("green", dates, todos);
      } else {
        addTodo("blue", dates, todos);
      }
      attributes.value = [
        {
          key: "today",
          dot: true,
          dates: new Date(),
        },
        ...todos,
      ];
    }
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
  ...todos,
]);

const dayClicked = (day) => {
  pickedDate.value = day;
  selectedDay.value = day.day;
};
const openBottomCard = () => {
  bottomCardOpen.value = true;
  slideDown.value = false;
};
const closeBottomCard = () => {
  bottomCardOpen.value = false;
  slideDown.value = true;
};
const moveToAll = () => {
  selectedMonth.value = calendar.value.getPageDays()[8].id.slice(5, 7) - 1;
  renderComponent.value = false;
  renderComponent.value = true;
  pickedDate.value = null;
  selectedDay.value = 0;
};
const onPageChange = (pageDate: Date) => {
  console.log(`Changed to page: ${pageDate}`);
};
</script>
