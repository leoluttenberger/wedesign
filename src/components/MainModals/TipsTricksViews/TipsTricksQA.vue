<template>
  <TwAccordion
    class="bg-white rounded overflow-hidden"
    :data="accordion"
    keep-alive
  >
    <template
      v-for="item in accordion"
      :key="item.ref"
      #[`header_${item.ref}`]="{ toggleAccordion, ref, isActive }"
    >
      <div
        class="text-black bg-gray-300 dark:text-white dark:bg-slate-700 p-4 flex justify-between items-center cursor-pointer"
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
                >
                  {{ item.body[index] }}
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
    ref: "Bewerbungsprozess",
    header: "Bewerbungsprozess",
    body: [
      "Was soll ich zuerst machen?",
      "Wo finde ich Stellenausschreibungen? (auch direkt beim Betrieb, Initiativbewerbungen)",
    ],
  },
  {
    ref: "Lebenslauf erstellen",
    header: "Lebenslauf erstellen",
    body: [
      "Was ist der Unterschied zwischen Erfahrungen und Kenntnissen?",
      "Wie bearbeite ich den Lebenslauf?",
      "Kann ich meinen Lebenslauf nachträglich verändern?",
      "Gibt es unterschiedliche Vorlagen für den Lebenslauf?",
      "Kann ich den Lebenslauf in einem anderen Programm ändern?",
    ],
  },
  {
    ref: "Bewerbung erstellen",
    header: "Bewerbung erstellen",
    body: [
      "Wie erstelle ich eine Bewerbung?",
      "Was ist der Vorlagentext?",
      "Muss ich den Vorlagentext ändern?",
      "Wie viele Bewerbungen kann ich gleichzeitig speichern?",
      "Verändert sich der Status einer Bewerbung automatisch?",
      "Wie füge der Bewerbung Informationen über den Status hinzu (abgelehnt, abgeschickt, keine Rückmeldung, leider nein)",
    ],
  },
  {
    ref: "Bewerbung speichern und bearbeiten",
    header: "Bewerbung speichern und bearbeiten",
    body: [
      "Wie speichere ich meine Bewerbungen ab?",
      "Wo finde ich eine Übersicht aller gespeicherten Bewerbungen?",
      "Kann ich eine Bewerbung nachträglich bearbeiten?",
      "Wie viele Bewerbungen kann ich gleichzeitig speichern?",
      "Kann ich die Bewerbung in einem anderen Programm ändern?",
      "Wofür ist das Archiv (Bewerbungen)?",
    ],
  },
  {
    ref: "Bewerbung und Lebenslauf exportieren",
    header: "Bewerbung und Lebenslauf exportieren",
    body: [
      "Kann ich die Vorschau einer Bewerbung sehen?",
      "Wie exportiere ich die Bewerbung oder den Lebenslauf?",
    ],
  },
  {
    ref: "Kalender",
    header: "Kalender",
    body: [
      "Wofür ist der Kalender?",
      "Wie lege ich Termine an?",
      "(Anfang-Ende Funktion, visuelle Darstellung im Kalender)",
    ],
  },
  {
    ref: "Datenschutz und Datennutzung",
    header: "Datenschutz und Datennutzung",
    body: [
      "Wo werden meine Daten gespeichert?",
      "Wer hat Zugriff auf meine Daten?",
    ],
  },
  {
    ref: "Wer sind wir",
    header: "Wer sind wir",
    body: [
      "Wer hat die App gemacht?",
      "Wer finanziert das Projekt?",
      "Kann ich die App weiterentwickeln?",
      "Welche Lizenz hat die App",
      "Kontaktdaten (Website+Gmail?)",
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
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
