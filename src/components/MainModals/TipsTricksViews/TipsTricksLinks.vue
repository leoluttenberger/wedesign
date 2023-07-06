<template>
  <TwAccordion
    class="bg-white dark:bg-slate-700 rounded overflow-hidden"
    :data="accordion"
  >
    <template
      v-for="item in accordion"
      :key="item.ref"
      #[`header_${item.ref}`]="{ toggleAccordion, ref, isActive }"
    >
      <div
        class="text-black bg-gray-300 dark:text-white dark:bg-slate-600 p-4 flex justify-between items-center cursor-pointer"
        @click="toggleAccordion(ref)"
      >
        <div>{{ item.header }}</div>
        <button class="flex items-center">
          <TwFeather
            class="transition-all duration-400"
            type="chevron-down"
            :class="{
              'rotate-180': isActive,
            }"
          ></TwFeather>
        </button>
      </div>
      <Transition duration="550" name="nested">
        <div v-if="isActive">
          <div>
            <div
              class="p-4 bg-wd-background text-black dark:text-white dark:bg-slate-500 hover:text-blue-500 underline hover:underline-offset-2"
              :key="`${item.ref}`"
              :ref="item.ref"
            >
              <ul>
                <li
                  v-for="(n, index) in item.body"
                  v-bind:key="item.body[index]"
                >
                  <a
                    :href="item.body[index]"
                    target="_blank"
                    rel="noopener noreferrer"
                    >{{ item.body[index] }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Transition>
    </template>
  </TwAccordion>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { TwAccordion, TwFeather } from "vue3-tailwind";
const show = ref(true);

const accordion = ref([
  {
    ref: "Berufsorientierung allgemein",
    header: "Berufsorientierung allgemein",
    body: [
      "https://www.berufslexikon.at/suche/ (AMS Informationen über einzelne Berufe)",
      "https://www.berufskompass.at/berufskompass/ (AMS Fragebogen um einen passenden Beruf zu finden)",
      "https://www.jopsy.at/intro-video (AK Fragebogen um einen passenden Beruf zu finden)",
      "https://www.whatchado.com/de/  (Fragebogen um einen passenden Beruf zu finden, Videostories)",
      "https://www.kununu.com/at (Bewertungen Arbeitsgeber*innen)",
      "https://site.wko.at/biwi/lehrstellencheck/lehrstellencheck.html (WKO Test, der Auskunft über eigene Fähigkeiten und Eignung für bestimmte Lehrstellen gibt)",
    ],
  },
  {
    ref: "Stellensuche",
    header: "Stellensuche",
    body: [
      "https://jobs.ams.at/public/emps/ (AMS Portal für Stellensuche)",
      "https://www.ams.at/arbeitsuchende/arbeitslos-was-tun/lehrstellenboerse (AMS Lehrstellenbörse)",
      "https://lehrbetriebsuebersicht.wko.at/ (WKO Übersicht Lehrbetriebe)",
      "https://bund.jobboerse.gv.at/sap/bc/jobs/ (Öffentlicher Dienst - Stellenbörse)",
    ],
  },
  {
    ref: "Bewerbung",
    header: "Bewerbung",
    body: [
      "https://www.ams.at/arbeitsuchende/topicliste/bewerbungsvorlage (AMS Online-Bewerbungscoach und Mustervorlagen)",
      "https://www.akyoung.at/arbeit/bewerbung/ (Tipps für den Bewerbungsprozess)",
      "https://www.playmit.com/ (Üben von Aufnahmetest)",
    ],
  },
  {
    ref: "Unterstützende Institutionen",
    header: "Unterstützende Institutionen",
    body: [
      "Netzwerk Berufliche Assistenz: https://www.neba.at/jugendcoaching",
      "AK Young, https://www.akyoung.at/",
      "Verein Wiener Jugendzentren, http://www.jugendzentren.at/",
      "Wien Extra, https://www.wienxtra.at/",
      "18Plus Berufs- und Studienchecker, https://www.18plus.at/",
      "BMBWF Beratungswegweiser: www.bib-atlas.at",
    ],
  },
]);

const isActiveCheck = ref("");

const toggleAccordion = (ref) => {
  isActiveCheck.value = isActiveCheck.value === ref ? "" : ref;
};

watch(isActiveCheck, (newValue, oldValue) => {
  if (newValue !== "") {
    const element = document.getElementById(newValue);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
});
</script>

<style scoped>
.nested-enter-active {
  transition: all 0.5s ease-in-out;
}
.nested-leave-active {
  transition: all 0.1s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.5s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
