<template>
  <section
    class="fixed inset-x-0 z-10 shadow dark:text-white text-xl font-Montserrat bg-white dark:bg-slate-800 shadow"
  >
    <div class="flex justify-center p-2 font-bold">
      <span>Hi &#128075; {{ firstName }}</span>
    </div>
  </section>
  <Container>
    <div class="flex justify-center">
      <img class="absolute w-20 py-14" src="../assets/images/logo.png" />
    </div>
  </Container>
  <Container>
    <div class="flex pt-36 dark:text-white text-black text-l px-4">
      <DocumentsIcon
        class="dark:stroke-wd-white stroke-black stroke-1 w-8 h-8"
      ></DocumentsIcon>
      <p class="pt-2">Aktuelle Bewerbungen</p>
      <div class="grow ..."></div>

      <p class="px-3 mx-2 pt-1 bg-wd-green rounded-full">
        {{ applications.length }}
      </p>
    </div>
  </Container>

  <Container>
    <div
      class="relative w-full flex gap-4 snap-x snap-mandatory overflow-x-auto py-1"
    >
      <div
        v-for="(item, index) in applications"
        :key="index"
        class="px-4 snap-start w-52 h-30 rounded-lg shrink-0"
      >
        <button @click="saveApplicationIndex(index)">
          <router-link to="/documents"
            ><div
              class="px-2 w-52 h-30 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border border-wd-green"
            >
              <div class="flex top pt-2">
                <div class="grow ..."></div>
                <div
                  v-if="item[0].state == 'In Bearbeitung'"
                  class="font-none px-2 text-xs text-white font-bold rounded-2xl bg-wd-edit"
                >
                  {{ item[0].state }}
                </div>
                <div
                  v-if="item[0].state == 'Abgeschickt'"
                  class="font-none px-2 text-xs text-white font-bold rounded-2xl bg-wd-green"
                >
                  {{ item[0].state }}
                </div>
                <div
                  v-if="item[0].state == 'Keine Rückmeldung'"
                  class="font-none px-2 text-xs text-white font-bold rounded-2xl bg-wd-error"
                >
                  {{ item[0].state }}
                </div>
                <div
                  v-if="item[0].state == 'Leider nein'"
                  class="font-none px-2 text-xs text-white font-bold rounded-2xl bg-wd-error"
                >
                  {{ item[0].state }}
                </div>
              </div>

              <div class="font-bold text-xl">{{ item[0].company }}</div>
              <div class="flex text-base">
                <div class="flex-none">Ende</div>
                <div class="grow py-2 px-2">
                  <ArrowIcon
                    class="dark:stroke-wd-white stroke-1 w-full h-2"
                  ></ArrowIcon>
                </div>
                <div class="flex-none">
                  {{ item[0].end ? item[0].end.slice(8, 10) : "" }}.{{
                    item[0].end ? item[0].end.slice(5, 7) : ""
                  }}.{{ item[0].end ? item[0].end.slice(0, 4) : "" }}
                </div>
              </div>

              <div class="flex">
                <div class="flex-none">ansehen</div>
                <div class="grow py-2 px-2">
                  <ArrowIcon
                    class="dark:stroke-wd-white stroke-black stroke-1 w-full h-2"
                  ></ArrowIcon>
                </div>
              </div></div
          ></router-link>
        </button>
      </div>
    </div>
  </Container>
  <Container>
    <div class="flex pt-4 dark:text-white text-l px-4">
      <NotificationsIcon
        class="dark:stroke-wd-white stroke-black stroke-1 w-8 h-8"
      ></NotificationsIcon>
      <p class="flex-none pt-2">Wichtige Termine</p>
      <div class="grow ..."></div>
      <p class="flex-none px-3 mx-2 pt-1 bg-wd-green rounded-full">
        {{ appointments.length }}
      </p>
    </div>
  </Container>
  <Container>
    <div
      class="relative w-full flex gap-4 snap-x snap-mandatory overflow-x-auto py-1"
    >
      <div
        v-for="(item, index) in appointments"
        :key="index"
        class="px-4 snap-start w-52 h-30 rounded-lg shrink-0"
      >
        <button @click="saveCalendarIndex(index)">
          <router-link to="/calendar">
            <div
              class="p-2 w-52 h-30 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border-2"
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
                {{ item[0].type }}
              </div>
              <div class="font-bold text-base">
                {{ item[0].title }}
              </div>
              <div class="flex text-base">
                <div>
                  {{
                    item[0].appointmentFrom
                      ? item[0].appointmentFrom.slice(8, 10) +
                        "." +
                        item[0].appointmentFrom.slice(5, 7) +
                        "." +
                        item[0].appointmentFrom.slice(0, 4)
                      : ""
                  }}
                </div>
                <div class="grow ..."></div>
                <div>
                  {{
                    item[0].appointmentFrom
                      ? item[0].appointmentFrom.slice(11, 16) + " Uhr"
                      : ""
                  }}
                </div>
              </div>

              <div class="flex">
                <div class="flex-none">ansehen</div>
                <div class="grow py-2 px-2">
                  <ArrowIcon
                    class="dark:stroke-wd-white stroke-1 w-full h-2"
                  ></ArrowIcon>
                </div>
              </div></div
          ></router-link>
        </button>
      </div>
    </div>
  </Container>
  <Container>
    <div class="pt-4">
      <wrapper
        class="flex w-screen h-28 justify-center text-black dark:text-white text-base"
      >
        <Flicking
          :options="{ circular: true, horizontal: false }"
          :plugins="plugins"
        >
          <div class="flex justify-center px-4 py-8">
            <div class="pt-2 px-2">
              <span class="relative flex h-2 w-2">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"
                ></span>
              </span>
            </div>

            <div>
              Wusstest du, dass du die Bewertungen der Arbeitgeber online finden
              kannst?
            </div>
          </div>
          <div class="flex justify-center px-4 py-8">
            <div class="pt-2 px-2">
              <span class="relative flex h-2 w-2">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"
                ></span>
              </span>
            </div>

            <div>
              Wusstest du, dass AMS einen Berufskompass hat, wo du mehr über
              einzelne Jobbeschreibungen und Gehälter herausfinden kannst?
            </div>
          </div>
          <div class="flex justify-center px-4 py-8">
            <div class="pt-2 px-2">
              <span class="relative flex h-2 w-2">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"
                ></span>
              </span>
            </div>

            <div>
              Wusstest du, dass du eine Bewerbung für eine Lehrstelle schicken
              kannst, auch, ohne dass eine Bewerbung ausgeschrieben ist?
            </div>
          </div>
          <div class="flex justify-center px-4 py-8">
            <div class="pt-2 px-2">
              <span class="relative flex h-2 w-2">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"
                ></span>
              </span>
            </div>

            <div>Du magst vor dem Aufnahmetest üben: hier entlang</div>
          </div>
        </Flicking>
      </wrapper>
    </div>
  </Container>

  <Container>
    <div class="grid flex gap-6 px-4 pt-4 pb-20">
      <button
        class="rounded-md bg-wd-green hover:bg-transparent-green h-14 text-white font-bold"
        @click="openBottomCard()"
      >
        Tipps & Tricks
      </button>
    </div>
  </Container>

  <div>
    <MVEditModal :show="bottomCardOpen">
      <div class="flex">
        <div
          class="rounded-lg w-screen h-screen overflow-hidden shadow-xl dark:bg-slate-700 bg-white"
        >
          <component :is="TripsTricks" />
        </div>
      </div>
    </MVEditModal>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import {
  lastApplicationIndex,
  isQuickAccessApplication,
  lastCalendarIndex,
  isQuickAccessCalendar,
  slideDown,
  activeButtonIndex,
} from "@/store/store.js";
import Flicking from "@egjs/vue3-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import "@egjs/vue3-flicking/dist/flicking.css";

import ArrowIcon from "@/assets/icons/ArrowIcon.vue";
import DocumentsIcon from "@/assets/icons/DocumentsIcon.vue";
import NotificationsIcon from "@/assets/icons/NotificationsIcon.vue";
import TripsTricks from "./TipsTricksView.vue";
import MVEditModal from "@/components/MenuModals/MVEditModal.vue";

const userInfos = ref(JSON.parse(localStorage.getItem("userInfos")) || []);
const applications = ref(
  JSON.parse(localStorage.getItem("applications")) || []
);
const appointments = ref(
  JSON.parse(localStorage.getItem("appointments")) || []
);

const blueType = ref("Bewerbungsgespräch");
const redType = ref("Ende");
const yellowType = ref("Aufnahmetest");
const pinkType = ref("Feedback");
const greenType = ref("Sonstige Termine");
const firstName = ref(null);
const router = useRouter();
const bottomCardOpen = ref(false);

const plugins = ref([new AutoPlay({ duration: 30000 })]);

watch(slideDown, () => {
  if (slideDown.value == true) {
    bottomCardOpen.value = false;
    slideDown.value = true;
  }
});

onMounted(() => {
  bottomCardOpen.value = false;
  lastApplicationIndex.value = 0;
  isQuickAccessApplication.value = false;
  lastCalendarIndex.value = 0;
  isQuickAccessCalendar.value = false;
  if (localStorage.getItem("userInfos")) {
    firstName.value = userInfos.value[0][0].firstName;
  }
});
const saveApplicationIndex = (index) => {
  lastApplicationIndex.value = index;
  isQuickAccessApplication.value = true;
  activeButtonIndex.value = 3;
};

const saveCalendarIndex = (index) => {
  lastCalendarIndex.value = index;
  isQuickAccessCalendar.value = true;
  activeButtonIndex.value = 4;
};

const openBottomCard = () => {
  bottomCardOpen.value = true;
};
</script>
