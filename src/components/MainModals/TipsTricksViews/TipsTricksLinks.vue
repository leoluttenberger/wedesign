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
              class="p-4 bg-wd-background text-black dark:text-white dark:bg-slate-500"
              :key="`${item.ref}`"
              :ref="item.ref"
            >
              <ul>
                <li
                  v-for="(n, index) in item.body"
                  v-bind:key="item.body[index]"
                  class="hover:text-blue-500 hover:underline"
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
      "AMS Informationen über einzelne Berufe: https://www.berufslexikon.at/suche/",
      "AMS Fragebogen um einen passenden Beruf zu finden: https://www.berufskompass.at/berufskompass/",
      "AK Fragebogen um einen passenden Beruf zu finden: https://www.jopsy.at/intro-video",
      "Fragebogen um einen passenden Beruf zu finden, Videostories: https://www.whatchado.com/de/",
      "Bewertungen Arbeitsgeber*innen: https://www.kununu.com/at",
      "WKO Test, der Auskunft über eigene Fähigkeiten und Eignung für bestimmte Lehrstellen gibt: https://site.wko.at/biwi/lehrstellencheck/lehrstellencheck.html",
    ],
  },
  {
    ref: "Stellensuche",
    header: "Stellensuche",
    body: [
      "AMS Portal für Stellensuche: https://jobs.ams.at/public/emps/",
      "AMS Lehrstellenbörse https://www.ams.at/arbeitsuchende/arbeitslos-was-tun/lehrstellenboerse",
      "WKO Übersicht Lehrbetriebe: https://lehrbetriebsuebersicht.wko.at/",
      "Öffentlicher Dienst - Stellenbörse: https://bund.jobboerse.gv.at/sap/bc/jobs/ ",
    ],
  },
  {
    ref: "Bewerbung",
    header: "Bewerbung",
    body: [
      "AMS Online-Bewerbungscoach und Mustervorlagen: https://www.ams.at/arbeitsuchende/topicliste/bewerbungsvorlage",
      "Tipps für den Bewerbungsprozess: https://www.akyoung.at/arbeit/bewerbung/",
      "Üben von Aufnahmetest: https://www.playmit.com/",
    ],
  },
  {
    ref: "Unterstützende Institutionen",
    header: "Unterstützende Institutionen",
    body: [
      "Netzwerk Berufliche Assistenz: https://www.neba.at/jugendcoaching",
      "AK Young: https://www.akyoung.at/",
      "Verein Wiener Jugendzentren: http://www.jugendzentren.at/",
      "Wien Extra: https://www.wienxtra.at/",
      "18Plus Berufs- und Studienchecker: https://www.18plus.at/",
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
