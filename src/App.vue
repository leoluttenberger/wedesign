<template>
  <Html :class="darkLightMode">
    <body class="bg-wd-background dark:bg-slate-700">
      <div class="h-screen overflow-auto overflow-scroll">
        <router-view></router-view>
      </div>
      <section
        class="block fixed inset-x-0 bottom-0 z-10 bg-white dark:bg-slate-800 shadow"
      >
        <div class="flex justify-evenly">
          <button
            @click="onMenuTo(1)"
            :class="
              activeButton1
                ? 'border-wd-green dark:border-wd-green'
                : 'border-white dark:border-slate-800'
            "
            class="dark:hover:border-wd-green hover:border-wd-green border-t-[3px]"
          >
            <router-link to="/"><HomeIcon></HomeIcon> </router-link>
          </button>
          <button
            @click="onMenuTo(2)"
            :class="
              activeButton2
                ? 'border-wd-green dark:border-wd-green'
                : 'border-white dark:border-slate-800'
            "
            class="dark:hover:border-wd-green hover:border-wd-green border-t-[3px]"
          >
            <router-link to="/form">
              <UserIcon></UserIcon>
            </router-link>
          </button>
          <button
            @click="onMenuTo(3)"
            :class="
              activeButton3
                ? 'border-wd-green dark:border-wd-green'
                : 'border-white dark:border-slate-800'
            "
            class="dark:hover:border-wd-green hover:border-wd-green border-t-[3px]"
          >
            <router-link to="/documents"
              ><DocumentsIcon></DocumentsIcon>
            </router-link>
          </button>
          <button
            @click="onMenuTo(4)"
            :class="
              activeButton4
                ? 'border-wd-green dark:border-wd-green'
                : 'border-white dark:border-slate-800'
            "
            class="dark:hover:border-wd-green hover:border-wd-green border-t-[3px]"
          >
            <router-link to="/calendar">
              <NotificationsIcon></NotificationsIcon
            ></router-link>
          </button>
          <div
            class="flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
          ></div>
        </div>
      </section>
    </body>
  </Html>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";
import HomeIcon from "./assets/icons/HomeIcon.vue";
import UserIcon from "./assets/icons/UserIcon.vue";
import DocumentsIcon from "./assets/icons/DocumentsIcon.vue";
import NotificationsIcon from "./assets/icons/NotificationsIcon.vue";
import { isDarkMode } from "./store.js";
const isLoggedIn = ref(true);
const router = useRouter();
const auth = getAuth();
const darkLightMode = ref(JSON.parse(localStorage.getItem("theme")));
let activeButton1 = ref(true);
let activeButton2 = ref(false);
let activeButton3 = ref(false);
let activeButton4 = ref(false);
if (JSON.parse(localStorage.getItem("theme")) == "dark") {
  darkLightMode.value = "dark";
} else {
  darkLightMode.value = "light";
}
watch(isDarkMode, () => {
  swichtDarkLightMode();
});

let showMenu = false;
const toogleNavbar = () => (showMenu = !showMenu);
auth.onAuthStateChanged((user) => {
  if (user) {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
});
const signOut = () => {
  auth.signOut();
  router.push("/");
};
const swichtDarkLightMode = () => {
  if (isDarkMode.value == true) {
    darkLightMode.value = "dark";
  } else {
    darkLightMode.value = "light";
  }
};
const onMenuTo = (index) => {
  switch (index) {
    case 1:
      activeButton1.value = true;
      activeButton2.value = false;
      activeButton3.value = false;
      activeButton4.value = false;
      break;
    case 2:
      activeButton1.value = false;
      activeButton2.value = true;
      activeButton3.value = false;
      activeButton4.value = false;
      break;
    case 3:
      activeButton1.value = false;
      activeButton2.value = false;
      activeButton3.value = true;
      activeButton4.value = false;
      break;
    case 4:
      activeButton1.value = false;
      activeButton2.value = false;
      activeButton3.value = false;
      activeButton4.value = true;
      break;
  }
};
</script>
<style>
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
