<template>
  <section
    class="fixed inset-x-0 z-10 shadow dark:text-white text-xl font-Montserrat bg-white dark:bg-slate-800"
  >
    <div class="flex justify-center p-2 font-bold">Erinnerungen</div>
  </section>
  <div class="fixed inset-x-0 z-10 pt-12" v-if="renderComponent">
    <VCalendar
      expanded
      ref="calendar"
      :is-dark="theme"
      :attributes="attributes"
      :locale="locale"
      @dayclick="dayClicked"
      @update:pages="onPageChanged"
    >
      <template #footer>
        <div class="w-full px-2 pb-3">
          <button
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full px-3 py-1 rounded-md"
            @click="setMonth"
          >
            <div v-if="toggleMonth == true">Alle Termine im Monat</div>
            <div v-if="toggleMonth == false">Zuletzt ausgewählter Tag</div>
          </button>
        </div>
      </template></VCalendar
    >
    <div class="px-2 flex bg-white dark:bg-slate-800">
      <BellIcon
        class="h-10 w-8 dark:stroke-wd-white stroke-black stroke-1"
      ></BellIcon>
      <div
        v-if="!pickedDate"
        class="selected-day py-3 px-3 text-black dark:text-white font-Montserrat text-base md:text-base font-bold"
      >
        Nächste Termine
      </div>
      <div
        v-if="pickedDate"
        class="selected-day py-3 px-3 text-black dark:text-white font-Montserrat text-base md:text-base font-bold"
      >
        <h3>{{ pickedDate.date.toDateString() }}</h3>
      </div>
    </div>
  </div>

  <swiper class="applicationSwiper py-20">
    <swiper-slide>
      <SwipeView :slideIndex="5"> </SwipeView>
    </swiper-slide>
  </swiper>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import BellIcon from "@/assets/icons/BellIcon.vue";
import SwipeView from "./SwipeView.vue";

import {
  slideDown,
  selectedDay,
  selectedMonth,
  selectedYear,
  addedDate,
  addedType,
  isMonthEvent,
  changedDate,
  isQuickAccessCalendar,
  lastCalendarIndex,
} from "@/store/store.js";
import { month } from "@formkit/inputs";
import { attr } from "dom7";

let theme = ref(true);
const calendar = ref(null);
const locale = "de-AT";
const renderComponent = ref(true);
const pickedDate = ref(null);
let lastPickedDate = null;
const toggleMonth = ref(true);
const appointments = ref(
  JSON.parse(localStorage.getItem("appointments")) || []
);

interface HighlightDate {
  color: string;
  fillMode: string;
}

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

interface TodoDate {
  dot: Dot;
  highlight: HighlightDate;
  dates: Date;
}

// Define the initial list of todos
const todos: Todo[] = [];
const todosDate: TodoDate[] = [];

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
const addTodoDate = (
  color: string | undefined,
  date: Date,
  todosDate: TodoDate[]
) => {
  // Otherwise, create a new todo item with the specified date and highlight
  todosDate.push({
    dot: {
      style: {
        backgroundColor: color,
      },
    },
    highlight: {
      color: color,
      fillMode: "outline",
    },
    dates: date,
  });
};
const clearTodo = () => {
  for (let i = 0; i < todos.length; i++) {
    todos.pop();
  }
};
const clearTodoDate = () => {
  for (let i = 0; i < todosDate.length; i++) {
    todosDate.pop();
  }
};
const loadAppointments = () => {
  // Add a new todo with a new date and highlight
  if (localStorage.getItem("appointments")) {
    for (let i = 0; i < appointments.value.length; i++) {
      let color = "";
      if (appointments.value[i][0].type == "Bewerbungsgespräch") {
        color = "#0094FF";
      } else if (appointments.value[i][0].type == "Ende") {
        color = "red";
      } else if (appointments.value[i][0].type == "Aufnahmetest") {
        color = "#FAC643";
      } else if (appointments.value[i][0].type == "Feedback") {
        color = "#FF1787";
      } else {
        color = "#00e0ac";
      }
      if (
        !appointments.value[i][0].appointmentFrom &&
        !appointments.value[i][0].appointmentTo
      ) {
        console.log("Dates empty!");
      } else if (
        appointments.value[i][0].appointmentFrom &&
        appointments.value[i][0].appointmentTo
      ) {
        const yearStart = appointments.value[i][0].appointmentFrom.slice(0, 4)
          ? appointments.value[i][0].appointmentFrom.slice(0, 4)
          : 0;
        const monthStart = appointments.value[i][0].appointmentFrom.slice(5, 7)
          ? appointments.value[i][0].appointmentFrom.slice(5, 7) - 1
          : 0;
        const dayStart = appointments.value[i][0].appointmentFrom.slice(8, 10)
          ? appointments.value[i][0].appointmentFrom.slice(8, 10)
          : 0;
        const yearEnd = appointments.value[i][0].appointmentTo.slice(0, 4)
          ? appointments.value[i][0].appointmentTo.slice(0, 4)
          : 0;
        const monthEnd = appointments.value[i][0].appointmentTo.slice(5, 7)
          ? appointments.value[i][0].appointmentTo.slice(5, 7) - 1
          : 0;
        const dayEnd = appointments.value[i][0].appointmentTo.slice(8, 10)
          ? appointments.value[i][0].appointmentTo.slice(8, 10)
          : 0;

        const dates: Dates = {
          start: new Date(yearStart, monthStart, dayStart),
          end: new Date(yearEnd, monthEnd, dayEnd),
        };
        addTodo(color, dates, todos);
      } else if (!appointments.value[i][0].appointmentFrom) {
        const yearEnd = appointments.value[i][0].appointmentTo.slice(0, 4)
          ? appointments.value[i][0].appointmentTo.slice(0, 4)
          : 0;
        const monthEnd = appointments.value[i][0].appointmentTo.slice(5, 7)
          ? appointments.value[i][0].appointmentTo.slice(5, 7) - 1
          : 0;
        const dayEnd = appointments.value[i][0].appointmentTo.slice(8, 10)
          ? appointments.value[i][0].appointmentTo.slice(8, 10)
          : 0;
        addTodoDate(color, new Date(yearEnd, monthEnd, dayEnd), todosDate);
        console.log("EndDate");
      } else if (!appointments.value[i][0].appointmentEnd) {
        const yearStart = appointments.value[i][0].appointmentFrom.slice(0, 4)
          ? appointments.value[i][0].appointmentFrom.slice(0, 4)
          : 0;
        const monthStart = appointments.value[i][0].appointmentFrom.slice(5, 7)
          ? appointments.value[i][0].appointmentFrom.slice(5, 7) - 1
          : 0;
        const dayStart = appointments.value[i][0].appointmentFrom.slice(8, 10)
          ? appointments.value[i][0].appointmentFrom.slice(8, 10)
          : 0;
        addTodoDate(
          color,
          new Date(yearStart, monthStart, dayStart),
          todosDate
        );
        console.log("EndDate");
      }
    }
  } else {
    const dates: Dates = {
      start: new Date(),
      end: new Date(),
    };
    addTodo("blue", dates, todos);
  }
};

loadAppointments();

if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  theme.value = true;
} else {
  theme.value = false;
}

onMounted(() => {
  selectedMonth.value = new Date().getMonth();
});

watch(isQuickAccessCalendar, () => {
  if (isQuickAccessCalendar.value == true) {
    const appointments = ref(
      JSON.parse(localStorage.getItem("appointments")) || []
    );
    if (appointments.value[lastCalendarIndex.value][0].appointmentFrom) {
      selectedMonth.value = appointments.value[
        lastCalendarIndex.value
      ][0].appointmentFrom.slice(5, 7);
      calendar.value.move(
        appointments.value[lastCalendarIndex.value][0].appointmentFrom
      );
    } else {
      selectedMonth.value = appointments.value[
        lastCalendarIndex.value
      ][0].appointmentTo.slice(5, 7);
      calendar.value.move(
        appointments.value[lastCalendarIndex.value][0].appointmentTo
      );
    }
    isMonthEvent.value = false;
    isMonthEvent.value = true;
  } else {
    selectedMonth.value = new Date().getMonth();
  }
});

watch(slideDown, () => {
  if (slideDown.value) {
    renderComponent.value = false;
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
      let color = "#00e0ac";
      if (addedType.value == "Bewerbungsgespräch") {
        color = "#0094FF";
      } else if (addedType.value == "Ende") {
        color = "red";
      } else if (addedType.value == "Aufnahmetest") {
        color = "#FAC643";
      } else if (addedType.value == "Feedback") {
        color = "#FF1787";
      } else {
        color = "#00e0ac";
      }
      addTodo(color, dates, todos);

      attributes.value = [
        {
          key: "today",
          highlight: true,
          dates: new Date(),
        },
        ...todos,
        ...todosDate,
      ];
    }
    addedDate.value = "";
  }
});

watch(changedDate, () => {
  if (changedDate.value == true) {
    appointments.value = JSON.parse(localStorage.getItem("appointments"));
    clearTodo();
    clearTodoDate();
    loadAppointments();
    attributes.value = [];
    attributes.value = [
      {
        key: "today",
        highlight: true,
        dates: new Date(),
      },
      ...todos,
      ...todosDate,
    ];
    renderComponent.value = false;
    renderComponent.value = true;
    console.log("Deleted Date in Calendar");
  }
});

let attributes = ref([
  {
    key: "today",
    highlight: true,
    dates: new Date(),
  },
  ...todos,
  ...todosDate,
]);

const dayClicked = (date) => {
  //console.log("date:", date);
  renderComponent.value = false;
  pickedDate.value = null;
  selectedDay.value = null;
  toggleMonth.value = true;
  isMonthEvent.value = false;

  pickedDate.value = date;
  selectedDay.value = date.day;
  lastPickedDate = pickedDate.value;

  renderComponent.value = true;
};

const setMonth = () => {
  if (toggleMonth.value == true) {
    pickedDate.value = null;
    if (lastPickedDate != null) {
      toggleMonth.value = false;
    }
    isMonthEvent.value = false;
    isMonthEvent.value = true;
  } else {
    if (lastPickedDate != null) {
      dayClicked(lastPickedDate);
    }
  }
};

const onPageChanged = (page) => {
  selectedMonth.value = page[0].id.slice(5, 7) - 1;
  selectedYear.value = page[0].id.slice(0, 4);
  isMonthEvent.value = false;
  isMonthEvent.value = true;
};
</script>
