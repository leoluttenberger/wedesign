<template>
  <nav
    text
    class="relative flex flex-wrap justify-between justify-between items-center px-2 py-3 bg-white mb-3"
  >
    <div class="py-2 px-3 mx-auto max-w-screen-xl md:px-6">
      <div class="flex items-center">
        <div class="flex flex-row mt-0 mr-6 space-x-8 text-sm">
          <div class="navigation">
            <router-link to="/"> Home </router-link>
          </div>
          <div class="navigation">
            <router-link to="/documents"> Bewerbung </router-link>
          </div>

          <div class="navigation">
            <router-link to="/calendar"> Erinnerungen </router-link>
          </div>

          <div class="navigation">
            <router-link to="/form"> Lebenslauf </router-link>
          </div>
          <!--
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
          -->
        </div>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";
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
<style lang="scss" scoped>
body {
  background-color: rgb(250, 28, 65);
}
</style>
