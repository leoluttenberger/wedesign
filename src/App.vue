<template>
  <nav
    class="relative flex flex-wrap justify-between justify-between items-center px-2 py-3 bg-cyan-500 mb-3"
  >
    <div class="py-2 px-3 mx-auto max-w-screen-xl md:px-6">
      <div class="flex items-center">
        <div class="flex flex-row mt-0 mr-6 space-x-8 text-sm">
          <div
            class="flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
          >
            <router-link to="/"> Home </router-link>
          </div>
          <div
            class="flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
          >
            <router-link to="/documents"> Bewerbung </router-link>
          </div>

          <div
            class="flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
          >
            <router-link to="/calendar"> Erinnerungen </router-link>
          </div>

          <div
            class="flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
          >
            <router-link to="/form"> Lebenslauf </router-link>
          </div>

          <!-- <span v-if="isLoggedIn">
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
        --></div>
      </div>
    </div>
  </nav>
  <router-view />
  <tiptap />
</template>

<script>
import { Tiptap } from "./components";
export default {
  name: "sky-navbar",
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleNavbar: function () {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";
const isLoggedIn = ref(true);
const router = useRouter();
const auth = getAuth();

auth.onAuthStateChanged(function (user) {
  if (user) {
    isLoggedIn.value = true; // if we have a user
  } else {
    isLoggedIn.value = false; // if we do not
  }
});
const signOut = () => {
  auth.signOut();
  router.push("/");
};
</script>
