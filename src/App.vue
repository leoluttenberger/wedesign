<template>
  <Html :class="darkLightMode">
    <body class="bg-wd-background dark:bg-slate-700">
      <div class="h-screen px-2 py-3 overflow-auto overflow-scroll">
        <router-view></router-view>
      </div>
      <section
        class="block fixed inset-x-0 bottom-0 z-10 bg-white dark:bg-slate-800 shadow"
      >
        <div class="flex justify-evenly">
          <div
            class="dark:hover:border-wd-green hover:border-wd-green border-t-[3px] border-white dark:border-slate-800"
          >
            <router-link to="/"><HomeIcon></HomeIcon> </router-link>
          </div>
          <div
            class="dark:hover:border-wd-green hover:border-wd-green border-t-[3px] border-white dark:border-slate-800"
          >
            <router-link to="/form">
              <UserIcon></UserIcon>
            </router-link>
          </div>
          <div
            class="dark:hover:border-wd-green hover:border-wd-green border-t-[3px] border-white dark:border-slate-800"
          >
            <router-link to="/documents"
              ><DocumentsIcon></DocumentsIcon>
            </router-link>
          </div>
          <div
            class="dark:hover:border-wd-green hover:border-wd-green border-t-[3px] border-white dark:border-slate-800"
          >
            <router-link to="/calendar">
              <NotificationsIcon></NotificationsIcon
            ></router-link>
          </div>
          <div
            class="flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
          >
            <router-link to="/swipe"> Swipe</router-link>
          </div>
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
</script>
<style>
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
