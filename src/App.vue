<template>
  <router-view></router-view>
  <section class="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
    <div class="flex justify-evenly">
      <div>
        <router-link to="/"
          ><HomeIcon class="stroke-black hover:stroke-wd-green"></HomeIcon>
        </router-link>
      </div>
      <div>
        <router-link to="/form">
          <UserIcon
            class="stroke-black focus:stroke-wd-green hover:stroke-wd-green"
          ></UserIcon>
        </router-link>
      </div>
      <div>
        <router-link to="/documents"
          ><DocumentsIcon
            class="stroke-black focus:stroke-wd-green hover:stroke-wd-green"
          ></DocumentsIcon>
        </router-link>
      </div>
      <div>
        <router-link to="/calendar">
          <NotificationsIcon
            class="stroke-black focus:stroke-wd-green hover:stroke-wd-green"
          ></NotificationsIcon
        ></router-link>
      </div>
    </div>
  </section>
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
<style>
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
