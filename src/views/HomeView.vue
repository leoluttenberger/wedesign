<template>
  <section
    class="fixed inset-x-0 z-10 shadow dark:text-white text-xl font-Montserrat bg-white dark:bg-slate-800 shadow"
  >
    <div class="flex justify-center p-2 font-bold">Home</div>
    <div class="flex justify-center text-md">
      <span>Hi &#128075; {{ firstName }}</span>
    </div>
  </section>
  <Container>
    <div class="flex justify-center">
      <img class="absolute w-32 py-24" src="../assets/images/logo.png" />
    </div>
  </Container>
  <Container>
    <div class="flex pt-56 dark:text-white text-black text-xl px-2">
      <DocumentsIcon
        class="dark:stroke-wd-white stroke-black stroke-1 w-10 h-10"
      ></DocumentsIcon>
      <p class="pt-2">Aktuelle Bewerbungen</p>
    </div>
  </Container>
  <Container>
    <div
      class="relative w-full flex gap-4 snap-x snap-mandatory overflow-x-auto"
    >
      <div
        v-for="(item, index) in applications"
        :key="index"
        class="p-2 snap-start w-60 h-32 rounded-lg shrink-0"
      >
        <button>
          <div
            class="p-4 w-60 h-30 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border border-wd-green"
          >
            <div class="font-bold text-xl">{{ item[0].company }}</div>
            <div class="font-bold text-xl">{{ item[0].job }}</div>
            <div class="flex">
              <div class="flex-none">ansehen</div>
              <div class="grow py-2 px-2">
                <ArrowIcon
                  class="dark:stroke-wd-white stroke-black stroke-1 w-full h-2"
                ></ArrowIcon>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  </Container>
  <Container>
    <div class="flex pt-4 dark:text-white text-xl px-2">
      <NotificationsIcon
        class="dark:stroke-wd-white stroke-black stroke-1 w-10 h-10"
      ></NotificationsIcon>
      <p class="pt-2">Wichtige Termine</p>
    </div>
  </Container>
  <Container>
    <div
      class="relative w-full flex gap-2 snap-x snap-mandatory overflow-x-auto"
    >
      <div
        v-for="(item, index) in appointments"
        :key="index"
        class="p-2 snap-start w-60 h-32 rounded-lg shrink-0"
      >
        <button>
          <div
            class="p-2 bg-white dark:bg-slate-800 text-black text-left dark:text-white font-Montserrat rounded-md border-2"
            :class="
              item[0].type == greenType
                ? 'border-green-500'
                : item[0].type == redType
                ? 'border-red-500'
                : item[0].type == orangeType
                ? 'border-orange-500'
                : item[0].type == purpleType
                ? 'border-purple-500'
                : 'border-blue-500'
            "
          >
            <div class="font-bold text-base">
              {{ item[0].type }}
            </div>
            <div class="font-bold text-base">
              {{ item[0].title }}
            </div>

            <div class="flex">
              <div class="flex-none">ansehen</div>
              <div class="grow py-2 px-2">
                <ArrowIcon
                  class="dark:stroke-wd-white stroke-1 w-full h-2"
                ></ArrowIcon>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  </Container>
  <Container>
    <div class="grid flex gap-6 px-6 pt-4 pb-20">
      <button
        class="rounded-md bg-wd-green hover:bg-transparent-green h-14 text-white font-bold"
      >
        Tips & Tricks
      </button>
    </div>
  </Container>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import ArrowIcon from "@/assets/icons/ArrowIcon.vue";
import DocumentsIcon from "@/assets/icons/DocumentsIcon.vue";
import NotificationsIcon from "@/assets/icons/NotificationsIcon.vue";

const userInfos = ref(JSON.parse(localStorage.getItem("userInfos")));
const applications = ref(JSON.parse(localStorage.getItem("applications")));
const appointments = ref(JSON.parse(localStorage.getItem("appointments")));

const greenType = ref("Bewerbungsgespräch");
const redType = ref("Deadline");
const orangeType = ref("Aufnahmetest");
const purpleType = ref("Feedback");
const blueType = ref("Sonstige Termine");

const firstName = ref(null);
onMounted(() => {
  if (localStorage.getItem("userInfos")) {
    firstName.value = userInfos.value[0][0].firstName;
  }
});
</script>
