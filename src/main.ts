import { createApp } from "vue";
import { plugin, defaultConfig } from "@formkit/vue";
import { de, en } from "@formkit/i18n";
import { generateClasses } from "@formkit/themes";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import theme from "./theme";
import "./index.css";
import { initializeApp } from "firebase/app";
import * as Figma from "vue-low-code";
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};
const figmaID = process.env.FIGMA_DESIGN_ID;
const figmaToken = process.env.FIGMA_DESIGN_ID;
const init = async () => {
  // Initialize Firebase
  console.log("Firebase started");
  const firebase = initializeApp(firebaseConfig);
  // Init Figma
  console.log("Figma started");
  //await Figma.createFigmaDesignlets(figmaID, figmaToken);
};
init();
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
app.mount("#app");
