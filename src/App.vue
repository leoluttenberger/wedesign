<template>
  <section :class="darkLightMode">
    <div class="bg-wd-background dark:bg-slate-700">
      <div class="h-screen">
        <div class="bg-wd-white dark:bg-slate-800" :style="safeAreaStyle"></div>
        <router-view></router-view>
      </div>
      <section
        class="fixed z-10 inset-x-0 bottom-0 shadow bg-wd-white dark:bg-slate-800"
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
            <router-link to="/"
              ><HomeIcon
                :class="
                  activeButton1
                    ? 'stroke-wd-green dark:stroke-wd-green'
                    : 'stroke-black dark:stroke-white'
                "
              ></HomeIcon>
            </router-link>
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
              <UserIcon
                :class="
                  activeButton2
                    ? 'stroke-wd-green dark:stroke-wd-green'
                    : 'stroke-black dark:stroke-white'
                "
              ></UserIcon>
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
              ><DocumentsMenuIcon
                :class="
                  activeButton3
                    ? 'stroke-wd-green dark:stroke-wd-green'
                    : 'stroke-black dark:stroke-white'
                "
              ></DocumentsMenuIcon>
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
              <NotificationMenuIcon
                :class="
                  activeButton4
                    ? 'stroke-wd-green dark:stroke-wd-green'
                    : 'stroke-black dark:stroke-white'
                "
              ></NotificationMenuIcon
            ></router-link>
          </button>
          <button
            @click="onMenuTo(5)"
            :class="
              activeButton5
                ? 'border-wd-green dark:border-wd-green'
                : 'border-white dark:border-slate-800'
            "
            class="dark:hover:border-wd-green hover:border-wd-green border-t-[3px]"
          >
            <router-link to="/tools">
              <ToolIcon
                :class="
                  activeButton5
                    ? 'stroke-wd-green dark:stroke-wd-green'
                    : 'stroke-black dark:stroke-white'
                "
              ></ToolIcon
            ></router-link>
          </button>
          <div
            class="flex items-center text-base uppercase font-bold leading-snug text-white hover:opacity-75"
          ></div>
        </div>
      </section>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { isDarkMode, activeButtonIndex } from "@/store/store.js";
import HomeIcon from "@/assets/icons/HomeIcon.vue";
import UserIcon from "@/assets/icons/UserIcon.vue";
import DocumentsMenuIcon from "@/assets/icons/DocumentsMenuIcon.vue";
import NotificationMenuIcon from "@/assets/icons/NotificationMenuIcon.vue";
import ToolIcon from "@/assets/icons/ToolIcon.vue";

const router = useRouter();
const safeAreaTop = ref(0);
const safeAreaStyle = computed(() => ({
  paddingTop: `${safeAreaTop.value}px`,
}));
if (/(iPhone|iPod|iPad|iPad)/i.test(navigator.userAgent)) {
  safeAreaTop.value = window.innerWidth > 375 ? 44 : 20;
  console.log("iOS: iPhone iPad");
}
// Check for Android platform and set safe area for status bar
else if (/Android/i.test(navigator.userAgent)) {
  const androidStatusBarHeight = 20; // Adjust as needed
  console.log("Android");
  safeAreaTop.value = androidStatusBarHeight;
} else {
  console.log("!web!");

  safeAreaTop.value = 20;
}

const darkLightMode = ref(JSON.parse(localStorage.getItem("theme")) || "light");
let activeButton1 = ref(true);
let activeButton2 = ref(false);
let activeButton3 = ref(false);
let activeButton4 = ref(false);
let activeButton5 = ref(false);

if (darkLightMode.value == "dark") {
  isDarkMode.value = true;
} else if (JSON.parse(localStorage.getItem("theme")) == "light") {
  isDarkMode.value = false;
} else {
  darkLightMode.value = "light";
  isDarkMode.value = false;
  localStorage.setItem("theme", JSON.stringify("light"));
}

watch(isDarkMode, () => {
  swichtDarkLightMode();
});

watch(activeButtonIndex, () => {
  switchMenuIndex(activeButtonIndex.value);
});
const swichtDarkLightMode = () => {
  if (isDarkMode.value == true) {
    darkLightMode.value = "dark";
  } else {
    darkLightMode.value = "light";
  }
};
const onMenuTo = (index) => {
  activeButtonIndex.value = index;
};
const switchMenuIndex = (index) => {
  switch (index) {
    case 1:
      activeButton1.value = true;
      activeButton2.value = false;
      activeButton3.value = false;
      activeButton4.value = false;
      activeButton5.value = false;
      break;
    case 2:
      activeButton1.value = false;
      activeButton2.value = true;
      activeButton3.value = false;
      activeButton4.value = false;
      activeButton5.value = false;
      break;
    case 3:
      activeButton1.value = false;
      activeButton2.value = false;
      activeButton3.value = true;
      activeButton4.value = false;
      activeButton5.value = false;
      break;
    case 4:
      activeButton1.value = false;
      activeButton2.value = false;
      activeButton3.value = false;
      activeButton4.value = true;
      activeButton5.value = false;
      break;
    case 5:
      activeButton1.value = false;
      activeButton2.value = false;
      activeButton3.value = false;
      activeButton4.value = false;
      activeButton5.value = true;
      break;
  }
};
</script>
<style scoped>
.safe-area {
  padding-top: var(--safe-area-top, 0px);
  /* Other styles for your safe area container */
}
</style>
