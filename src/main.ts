import { createApp } from "vue";
import { plugin, defaultConfig } from "@formkit/vue";
import { de, en } from "@formkit/i18n";
import { generateClasses } from "@formkit/themes";
import App from "./App.vue";
import router from "./router";
import theme from "./theme";
import "./index.css";
import "v-calendar/dist/style.css";
import VCalendar from "v-calendar";

//Create and configure App
const app = createApp(App);
// Formkit and tailwind css config
app.use(
  plugin,
  defaultConfig({
    config: {
      classes: generateClasses(theme),
    },
    locales: { de, en },
    locale: "de",
  })
);
app.use(router);
app.use(VCalendar, {});
app.mount("#app");
