import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import theme from "./theme";
import "./index.css";
import "v-calendar/dist/style.css";
import VCalendar from "v-calendar";
import "@formkit/themes/genesis";
import "@formkit/pro/genesis";
import { plugin, defaultConfig } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";
import { de, en } from "@formkit/i18n";
import { createProPlugin, inputs } from "@formkit/pro";
import Vue3Tailwind from "vue3-tailwind";

import { FORMKIT_PRO_ID } from "./env";
//Create and configure App
const app = createApp(App);
//Create Formkit Pro
const pro = createProPlugin(FORMKIT_PRO_ID, inputs);
// Formkit and tailwind css config
app.use(
  plugin,
  Vue3Tailwind,
  defaultConfig({
    config: {
      classes: generateClasses(theme),
    },
    locales: { de, en },
    locale: "de",
    plugins: [pro],
  })
);
app.use(router);
app.use(VCalendar, {});
app.mount("#app");
