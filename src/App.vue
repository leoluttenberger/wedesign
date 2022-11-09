<template>
  <router-view></router-view>
  <div class="w-full h-screen">
    <section class="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
      <div id="tabs" class="flex justify-between">
        <router-link
          to="/"
          class="content-center w-full focus:text-wd-green hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        >
          <span class="tab tab-home block text-xs">
            <HomeIcon
              class="stroke-black focus:stroke-wd-green hover:stroke-wd-green"
            ></HomeIcon>
          </span>
        </router-link>
        <router-link
          to="/form"
          class="w-full focus:text-teal-500 hover:text-wd-green justify-center inline-block text-center pt-2 pb-1"
        >
          <span class="tab tab-kategori block text-xs">
            <UserIcon
              class="stroke-black focus:stroke-wd-green hover:stroke-wd-green"
            ></UserIcon
          ></span>
        </router-link>
        <router-link
          to="/documents"
          class="w-full focus:text-wd-green hover:text-wd-green justify-center inline-block text-center pt-2 pb-1"
        >
          <span class="tab tab-explore block text-xs"
            ><DocumentsIcon
              class="stroke-black focus:stroke-wd-green hover:stroke-wd-green"
            ></DocumentsIcon
          ></span>
        </router-link>
        <router-link
          to="/calendar"
          class="w-full focus:text-wd-green hover:text-wd-green justify-center inline-block text-center pt-2 pb-1"
        >
          <span class="tab tab-whishlist block text-xs"
            ><NotificationsIcon
              class="stroke-black focus:stroke-wd-green hover:stroke-wd-green"
            ></NotificationsIcon
          ></span>
        </router-link>
      </div>
    </section>
  </div>

  <!-- <nav
    class="relative flex flex-wrap justify-between justify-between items-center px-2 py-3 bg-white"
  >
    <router-link to="/"><HomeIcon></HomeIcon>Home</router-link>
    <div class="navigation">
      <router-link to="/form"> <UserIcon></UserIcon> Lebenslauf </router-link>
    </div>
    <div class="navigation">
      <router-link to="/documents">
        <DocumentsIcon></DocumentsIcon> Bewerbung
      </router-link>
    </div>

    <div class="navigation">
      <router-link to="/calendar"
        ><NotificationsIcon></NotificationsIcon> Erinnerungen
      </router-link>
    </div>
    
          <span v-if="isLoggedIn">
            <button
              class="flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              @click="signOut"
            >
              Logout
            </button>
          </span>
          <span v-else>
            <div
              class="flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
            >
              <router-link to="/register"> Register </router-link> |
              <router-link to="/sign-in"> Login </router-link>
            </div>
          </span>
          
  </nav> -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";
import HomeIcon from "./assets/icons/HomeIcon.vue";
import UserIcon from "./assets/icons/UserIcon.vue";
import DocumentsIcon from "./assets/icons/DocumentsIcon.vue";
import NotificationsIcon from "./assets/icons/NotificationsIcon.vue";
const isLoggedIn = ref(true);
const router = useRouter();
const auth = getAuth();
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
</script>
