<template>
  <TwAccordion
    class="bg-white dark:bg-slate-700 rounded overflow-hidden"
    :data="accordion"
  >
    <template
      v-for="section in accordion"
      :key="section.ref"
      #[`header_${section.ref}`]="{ toggleAccordion, ref, isActive }"
    >
      <div
        class="text-black bg-gray-300 dark:text-white dark:bg-slate-600 p-4 flex justify-between items-center cursor-pointer"
        @click="toggleAccordion(ref)"
      >
        <div>{{ section.header }}</div>
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
              :key="`${section.ref}`"
              :ref="section.ref"
            >
              <ul>
                <li v-for="(item, itemIndex) in section.body" :key="itemIndex">
                  {{ item.text }}
                  <button
                    @click="openLinkInBrowser(item.url)"
                    class="hover:text-blue-500 underline"
                  >
                    {{ item.url }}
                  </button>
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

const openLinkInBrowser = async (url: string) => {
  window.open(url);
};
const accordion = ref([
  {
    ref: "Berufsorientierung allgemein",
    header: "Berufsorientierung allgemein",
    body: [
      {
        text: "AMS Informationen über einzelne Berufe: ",
        url: "https://www.berufslexikon.at/suche/",
      },
      {
        text: "AMS Fragebogen um einen passenden Beruf zu finden: ",
        url: "https://www.berufskompass.at/berufskompass/",
      },
      {
        text: "AK Fragebogen um einen passenden Beruf zu finden: ",
        url: "https://www.jopsy.at/intro-video",
      },
      {
        text: "Fragebogen um einen passenden Beruf zu finden, Videostories: ",
        url: "https://www.whatchado.com/de/",
      },
      {
        text: "Bewertungen Arbeitsgeber*innen: ",
        url: "https://www.kununu.com/at",
      },
      {
        text: "WKO Test, der Auskunft über eigene Fähigkeiten und Eignung für bestimmte Lehrstellen gibt: ",
        url: "https://site.wko.at/biwi/lehrstellencheck/lehrstellencheck.html",
      },
    ],
  },
  {
    ref: "Stellensuche",
    header: "Stellensuche",
    body: [
      {
        text: "AMS Portal für Stellensuche: ",
        url: "https://jobs.ams.at/public/emps/",
      },
      {
        text: "AMS Lehrstellenbörse: ",
        url: "https://www.ams.at/arbeitsuchende/arbeitslos-was-tun/lehrstellenboerse",
      },
      {
        text: "WKO Übersicht Lehrbetriebe: ",
        url: "https://lehrbetriebsuebersicht.wko.at/",
      },
      {
        text: "Öffentlicher Dienst - Stellenbörse:  ",
        url: "https://bund.jobboerse.gv.at/sap/bc/jobs/ ",
      },
    ],
  },
  {
    ref: "Bewerbung",
    header: "Bewerbung",
    body: [
      {
        text: "AMS Online-Bewerbungscoach und Mustervorlagen: ",

        url: "https://www.ams.at/arbeitsuchende/topicliste/bewerbungsvorlage",
      },
      {
        text: "Tipps für den Bewerbungsprozess: ",

        url: "https://www.akyoung.at/arbeit/bewerbung/",
      },
      {
        text: "Üben von Aufnahmetest: ",

        url: "https://www.playmit.com/",
      },
    ],
  },
  {
    ref: "Unterstützende Institutionen",
    header: "Unterstützende Institutionen",
    body: [
      {
        text: "Netzwerk Berufliche Assistenz: ",
        url: "https://www.neba.at/jugendcoaching",
      },
      {
        text: "AK Young: ",
        url: "https://www.akyoung.at/",
      },
      {
        text: "Verein Wiener Jugendzentren: ",
        url: "http://www.jugendzentren.at/",
      },
      {
        text: "Wien Extra: ",
        url: "https://www.wienxtra.at/",
      },
      {
        text: "18Plus Berufs- und Studienchecker: ",
        url: "https://www.18plus.at/",
      },
      {
        text: "BMBWF Beratungswegweiser: ",

        url: "http://www.bib-atlas.at",
      },
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
