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
      >
        <template #footer>
          <div class="w-full px-4 pb-3">
            <button
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full px-3 py-1 rounded-md"
              @click="moveToAll"
            >
              Alle Termine
            </button>
          </div>
        </template></v-calendar
      >
      <div class="flex">
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
import { ref, watch, onMounted } from "vue";
import BellIcon from "../assets/icons/BellIcon.vue";
import AddIcon from "@/assets/icons/AddIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import BottomCard from "@/components/BottomCard.vue";
import CalendarForm from "@/views/ModalViews/CalendarForm.vue";
import CalendarList from "@/views/ModalViews/CalendarList.vue";
import { slideDown, selectedDay } from "@/store.js";
interface SlideItem {
  id: string;
  index: number;
  text: string;
}

let theme = ref(false);
const calendar = ref("");
const locale = "de-AT";
const bottomCardOpen = ref(false);
const renderComponent = ref(true);
const pickedDate = ref(null);
const appointments = ref(JSON.parse(localStorage.getItem("appointments")));

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
for (let i = 0; i < appointments.value.length; i++) {
  const year = appointments.value[i][0].appointmentFrom.slice(0, 4);
  const month = appointments.value[i][0].appointmentFrom.slice(5, 7) - 1;
  const day = appointments.value[i][0].appointmentFrom.slice(8, 10);
  const newDate = new Date(year, month, day);
  addTodo("blue", newDate, todos);
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
  pickedDate.value = null;
  selectedDay.value = 0;
};
</script>
