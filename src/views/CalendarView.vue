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
    <div class="">
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
import BellIcon from "../assets/icons/BellIcon.vue";
import AddIcon from "@/assets/icons/AddIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import BottomCard from "@/components/BottomCard.vue";
import CalendarForm from "@/views/ModalViews/CalendarForm.vue";
import CalendarList from "@/views/ModalViews/CalendarList.vue";
import { slideDown, selectedDay, selectedMonth, addedDate } from "@/store.js";
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

interface Todo {
  highlight?: string;
  dates: Date[];
}
// Define the initial list of todos
const todos: Todo[] = [];

const addTodo = (highlight: string | undefined, date: Date, todos: Todo[]) => {
  // Check if the current date already exists in the list of todos
  const existingTodo = todos.find((todo) => {
    return todo.dates.some((d) => d.getTime() === date.getTime());
  });

  if (existingTodo) {
    // If the date already exists, set the highlight for that todo
    existingTodo.highlight = highlight;
  } else {
    // Otherwise, create a new todo item with the specified date and highlight
    todos.push({
      highlight: highlight,
      dates: [date],
    });
  }
};
// Add a new todo with a new date and highlight
if (localStorage.getItem("appointments")) {
  for (let i = 0; i < appointments.value.length; i++) {
    const year = appointments.value[i][0].appointmentFrom.slice(0, 4);
    const month = appointments.value[i][0].appointmentFrom.slice(5, 7) - 1;
    const day = appointments.value[i][0].appointmentFrom.slice(8, 10);
    const newDate = new Date(year, month, day);
    addTodo("blue", newDate, todos);
  }
} else {
  addTodo("blue", new Date(), todos);
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
  console.log("Month", selectedMonth.value);
  console.log("Month", month.value);
});

watch(bottomCardOpen, () => {
  if (bottomCardOpen.value == false) {
    renderComponent.value = true;
    if (addedDate != "") {
      const year = addedDate.value.slice(0, 4);
      const month = addedDate.value.slice(5, 7) - 1;
      const day = addedDate.value.slice(8, 10);
      const newDate = new Date(year, month, day);
      addTodo("blue", newDate, todos);
      attributes.value = [
        {
          key: "today",
          dot: true,
          dates: new Date(),
        },
        ...todos.flatMap((todo) =>
          todo.dates.map((date) => ({
            highlight: todo.highlight,
            dates: date,
          }))
        ),
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
  ...todos.flatMap((todo) =>
    todo.dates.map((date) => ({
      highlight: todo.highlight,
      dates: date,
    }))
  ),
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
