<template>
  <p
    class="text-black px-2 dark:text-white font-Montserrat text-xl p-4 font-bold"
  >
    Bewerbungsprozess
  </p>
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
      <Transition name="nested">
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
  <p
    class="text-black px-2 dark:text-white font-Montserrat text-xl p-4 font-bold"
  >
    Lebenslauf erstellen
  </p>

  <TwAccordion
    class="bg-white dark:bg-slate-700 rounded overflow-hidden"
    :data="accordion2"
  >
    <template
      v-for="item in accordion2"
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
      <Transition name="nested">
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
  <p
    class="text-black px-2 dark:text-white font-Montserrat text-xl p-4 font-bold"
  >
    Bewerbung erstellen
  </p>

  <TwAccordion
    class="bg-white dark:bg-slate-700 rounded overflow-hidden"
    :data="accordion3"
  >
    <template
      v-for="item in accordion3"
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
      <Transition name="nested">
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
  <p
    class="text-black px-2 dark:text-white font-Montserrat text-xl p-4 font-bold"
  >
    Bewerbung speichern und bearbeiten
  </p>

  <TwAccordion
    class="bg-white dark:bg-slate-700 rounded overflow-hidden"
    :data="accordion4"
  >
    <template
      v-for="item in accordion4"
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
      <Transition name="nested">
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
  <p
    class="text-black px-2 dark:text-white font-Montserrat text-xl p-4 font-bold"
  >
    Erinnerungen und Kalender
  </p>

  <TwAccordion
    class="bg-white dark:bg-slate-700 rounded overflow-hidden"
    :data="accordion5"
  >
    <template
      v-for="item in accordion5"
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
      <Transition name="nested">
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
  <p
    class="text-black px-2 dark:text-white font-Montserrat text-xl p-4 font-bold"
  >
    Einstellungen
  </p>

  <TwAccordion
    class="bg-white dark:bg-slate-700 rounded overflow-hidden"
    :data="accordion6"
  >
    <template
      v-for="item in accordion6"
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
      <Transition name="nested">
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
  <p
    class="text-black px-2 dark:text-white font-Montserrat text-xl p-4 font-bold"
  >
    Datenschutz und Datennutzung
  </p>

  <TwAccordion
    class="bg-white dark:bg-slate-700 rounded overflow-hidden"
    :data="accordion7"
  >
    <template
      v-for="item in accordion7"
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
      <Transition name="nested">
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
  <p
    class="text-black px-2 dark:text-white font-Montserrat text-xl p-4 font-bold"
  >
    Wer sind wir
  </p>

  <TwAccordion
    class="bg-white dark:bg-slate-700 rounded overflow-hidden"
    :data="accordion8"
  >
    <template
      v-for="item in accordion8"
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
      <Transition name="nested">
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
/*eslint-disable*/
const accordion = ref([
  {
    ref: "Was kann ich mit APPly machen?",
    header: "Was kann ich mit APPly machen?",
    body: [
      "APPly hilft dir, deinen Lebenslauf zu erstellen, Bewerbungen zu verwalten und Motivationsschreiben zu erstellen. Du kannst deine Daten und dein Motivationsschreiben in der App verfassen und anschließend als PDF oder Word-Dokument teilen bzw. am Handy speichern. APPly stellt keine Stelleninserate bzw. Jobausschreibungen zur Verfügung. Wenn du mehr dazu wissen willst, lies dir den Abschnitt zu 'Wo finde ich Stellenausschreibungen?' durch.",
    ],
  },
  {
    ref: "Für wen ist APPly?",
    header: "Für wen ist APPly?",
    body: [
      "APPly ist speziell für Jugendliche bzw. gemeinsam mit Jugendlichen entwickelt worden. Es kann aber natürlich von allen Menschen kostenlos genutzt werden.",
    ],
  },
  {
    ref: "Wo finde ich Stellenausschreibungen?",
    header: "Wo finde ich Stellenausschreibungen?",
    body: [
      "Vor einer Bewerbung brauchst du zunächst eine Stellenausschreibung, auf die du dich bewirbst. Falls du Tipps brauchst, wo du eine Stellenausschreibung finden kannst, oder weitere Hinweise zum Bewerbungsprozess, schaue bitte unter 'Tipps & Tricks' unter dem Punkt 'Stellensuche' nach.",
    ],
  },
  {
    ref: "Wie kann ich APPly zum Schreiben einer Bewerbung nutzen?",
    header: "Wie kann ich APPly zum Schreiben einer Bewerbung nutzen?",
    body: [
      "Für eine Bewerbung brauchst du in der Regel einen Lebenslauf und ein Motivationsschreiben. Den Lebenslauf kannst du im Menüpunkt 'Lebenslauf' erstellen und jederzeit ändern oder ergänzen. Achte bitte darauf, dass der Lebenslauf immer aktuell ist und kontrolliere das, bevor du eine Bewerbung abschickst. Ein Motivationsschreiben kannst du im Menüpunkt 'Bewerbung' erstellen, ändern oder ergänzen. Beide Dateien kannst du im jeweiligen Menüpunkt unter 'Vorschau & Teilen' 'exportieren' - das heißt, als Datei am Smartphone speichern und entweder an einen Drucker oder zum Beispiel per E-Mail senden. Weitere Informationen und eine anschauliche Anleitung findest du im Video-Tutorial.",
    ],
  },
  {
    ref: "Was mache ich, wenn ich einen Lebenslauf fertig habe?",
    header: "Was mache ich, wenn ich einen Lebenslauf fertig habe?",
    body: [
      "Im Menüpunkt 'Lebenslauf' kannst du den fertigen Lebenslauf ansehen (klicke dazu auf 'Vorschau & Teilen') und dann entweder hochladen (z.B. auf eine Cloud), drucken (falls dein Smartphone mit einem Drucker verbunden ist) oder per E-Mail schicken. Das Dokument wird automatisch auf deinem Smartphone im .docx und PDF Format gespeichert. Das Gleiche gilt für das 'Motivationsschreiben' im Menüpunkt 'Bewerbung'. Normalerweise werden die Dokumente im 'Dokumenten' oder 'Download' Ordner gespeichert, das kann aber je nach Smartphone unterschiedlich sein. Hier kannst du jede einzelne Bewerbung ansehen, speichern, hochladen, drucken oder verschicken.",
    ],
  },
  {
    ref: "Wie verschicke ich eine Bewerbung direkt vom Smartphone per E-Mail? ",
    header:
      "Wie verschicke ich eine Bewerbung direkt vom Smartphone per E-Mail? ",
    body: [
      "Falls du den Lebenslauf und das Motivationsschreiben direkt vom Smartphone schicken magst, klicke bitte auf 'Vorschau & Teilen' und dann auf den 'Teilen'-Button rechts oben. Das Dokument wird dabei automatisch auf deinem Smartphone (z.B. unter Dokumenten oder Downloads - das ist bei jedem Smartphone anders) gespeichert. Öffne dein E-Mail-Programm, falls du mit deiner E-Mail-Adresse angemeldet bist (falls nicht, kannst du im Internet suchen, wie man ein E-Mail-Konto erstellt und dieses auch am Smartphone nutzen kann). Schreibe dann die E-Mail an die E-Mail Adresse der Arbeitgeber*innen. Diese steht in der Regel in der Stellenausschreibung. Hänge dann die Dateien (Lebenslauf und Motivationsschreiben) an - normalerweise gibt es dafür einen 'Anhängen'-Button, oder ein Büroklammer-Symbol in deinem E-Mail-Programm. Jetzt kannst du die E-Mail senden.",
    ],
  },
]);
const accordion2 = ref([
  {
    ref: "Was ist ein Lebenslauf?",
    header: "Was ist ein Lebenslauf?",
    body: [
      "Ein Lebenslauf soll Arbeitgeber*innen dabei helfen dich schnell kennenzulernen und herauszufinden, ob deine bisherige Ausbildung für die Stelle passend sein könnte. Der Lebenslauf gibt einen Überblick darüber, wie alt du bist, wie man dich kontaktieren kann, welche Schule du besucht hast oder welche anderen arbeitsrelevanten Erfahrungen oder Kenntnisse du hast.",
    ],
  },
  {
    ref: "Wie erstelle ich einen Lebenslauf?",
    header: "Wie erstelle ich einen Lebenslauf?",
    body: [
      "Einen Lebenslauf kannst du im Menüpunkt 'Lebenslauf' erstellen. Unter 'Über mich' kannst du deine persönlichen Daten, deine Kontaktdaten oder deine Hobbies angeben. Hier kannst du auch dein Bewerbungsfoto hochladen. Achte dabei bitte darauf, dass das Foto eine gute Qualität hat und seriös ausschaut. Wenn du nach rechts wischst, kannst du 'Ausbildungen', 'Erfahrungen' und 'Kenntnisse' hinzufügen durch das Klicken auf das Plus-Zeichen. Wenn du damit fertig bist, kannst du zurück zum Anfang ('Über mich') und dort auf 'Vorschau & Teilen' gehen und die Vorschau des Lebenslaufs (also wie der fertige Lebenslauf ausschaut) sehen. Durch das Klicken auf das Symbol zum Teilen, rechts oben in der Vorschau, kannst du den Lebenslauf speichern, drucken, hochladen, oder verschicken.",
    ],
  },
  {
    ref:
      "Was ist der Unterschied zwischen Ausbildungen, Erfahrungen und Kenntnissen?",
    header:
      "Was ist der Unterschied zwischen Ausbildungen, Erfahrungen und Kenntnissen?",
    body: [
      "In dem APPly Format wird zwischen 'Ausbildungen', 'Erfahrungen' und 'Kenntnissen' unterschieden, ein Lebenslauf muss aber nicht immer genauso aufgebaut sein. In diesem Fall verstehen wir unter 'Ausbildungen' z.B. Schule oder eine anschließende Ausbildung (z.B. eine Lehre zur Tischlerin). Unter 'Erfahrungen' verstehen wir z.B. Praktikas in einem Betrieb oder eine Teilnahme an einem Workshop, wo du etwas Arbeitsrelevantes gelernt hast. Unter 'Kenntnisse' kannst du z.B. deine Sprachkenntnisse einfügen oder angeben, dass du einen Führerschein hast, eine Software gut kannst, oder dass du bestimmte handwerkliche Fähigkeiten hast.",
    ],
  },
  {
    ref:
      "Kann ich meinen bereits vorhandenen Lebenslauf in die App hochladen und die Felder automatisch ausfüllen lassen?",
    header:
      "Kann ich meinen bereits vorhandenen Lebenslauf in die App hochladen und die Felder automatisch ausfüllen lassen?",
    body: [
      "Diese Funktion ist derzeit leider nicht vorgesehen. Du kannst nur manuell deine Daten angeben, um einen Lebenslauf zu erstellen.",
    ],
  },
  {
    ref: "Wie bearbeite ich den Lebenslauf?",
    header: "Wie bearbeite ich den Lebenslauf?",
    body: [
      "Den Lebenslauf kannst du jederzeit wieder bearbeiten, und zum Beispiel deine persönlichen Daten ändern, das Bild austauschen, die Ausbildungen, Erfahrungen oder Kenntnisse ändern, entfernen oder neue hinzufügen. Das kannst du aber nur in den Eingabefeldern (also da, wo du die Daten ursprünglich hinzugefügt hast) tun, nicht in der Vorschau. Falls du den Lebenslauf nachträglich am Computer oder mit einer anderen Software ändern magst, kannst du das Dokument im .docx Format jederzeit unter 'Vorschau & Teilen' hochladen oder verschicken und anschließend weiter bearbeiten.",
    ],
  },
  {
    ref: "Wie verschicke ich den fertigen Lebenslauf?",
    header: "Wie verschicke ich den fertigen Lebenslauf?",
    body: [
      "Den fertigen Lebenslauf kannst du unter 'Lebenslauf' und dann 'Über mich' in der Vorschau ansehen und dann über den Teilen-Button rechts oben speichern und senden. Der Lebenslauf wird automatisch sowohl im PDF als auch im .docx Format gespeichert. Das PDF Format empfiehlt sich, wenn der Lebenslauf fertig ist und du ihn so verschicken magst. Falls du ihn in einer anderen Software (z.B. Microsoft Word) ändern magst, empfiehlt sich das .docx Format.",
    ],
  },
  {
    ref: "Welches Format soll ein Lebenslauf haben?",
    header: "Welches Format soll ein Lebenslauf haben?",
    body: [
      "Ein Lebenslauf kann unterschiedlich aufgebaut sein, es kann Farben oder Muster haben oder auch nicht - oft hängt das vom Beruf ab. Manchmal gibt es von Arbeitgeber*innen Vorgaben dazu in der Stellenausschreibung. Das APPly Format ist nur ein Beispiel. Falls du den Lebenslauf anders gestalten magst, kannst du es jederzeit unter 'Vorschau & Teilen' hochladen und teilen (Button rechts oben) und im .docx Format in einer anderen Software (z.B. Microsoft Word) anpassen.",
    ],
  },
  {
    ref: "Gibt es unterschiedliche Vorlagen für den Lebenslauf?",
    header: "Gibt es unterschiedliche Vorlagen für den Lebenslauf?",
    body: [
      "Leider noch nicht :( Du kannst aber deine Dokumente wie unter 'Kann ich den Lebenslauf in einem anderen Programm ändern?' beschrieben speichern und in einem anderen Programm weiter bearbeiten.",
    ],
  },
  {
    ref: "Kann ich den Lebenslauf in einem anderen Programm ändern?",
    header: "Kann ich den Lebenslauf in einem anderen Programm ändern?",
    body: [
      "Ja, indem du auf 'Vorschau & Teilen' und dann auf das Teilen-Symbol (rechts oben) klickst. Der Lebenslauf wird damit automatisch im PDF und .docx Format auf deinem Smartphone gespeichert (je nach Smartphone in deinem Dokumenten- oder Download-Ordner). Du kannst es zum Beispiel an dich selbst schicken oder auf eine Cloud (z.B. Google Drive) hochladen. Dann kannst du es weiter bearbeiten. Zum Bearbeiten empfehlen wir das .docx Format.",
    ],
  },
]);
const accordion3 = ref([
  {
    ref: "Wie erstelle ich eine Bewerbung in der App?",
    header: "Wie erstelle ich eine Bewerbung in der App?",
    body: [
      "Zunächst einmal legst du unter 'Bewerbung' einen neuen Eintrag an, indem du auf das '+'' Symbol klickst, die Details zur Bewerbung ausfüllst und die Bewerbung hinzufügst. Mit dieser Funktion hast du einen Überblick, wenn du mehrere Bewerbungen gleichzeitig hast. Nachdem du eine Bewerbung angelegt hast, scheint diese in der Übersicht auf. Klicke nun die gewünschte Bewerbung an. Nun kannst du die Daten dieser angelegten Bewerbung noch einmal korrigieren und ändern oder den Status dieser Bewerbung hinzufügen. Jetzt kannst du noch den Bewerbungstext hinzufügen, indem du auf 'Motivationsschreiben bearbeiten' gehst.",
    ],
  },
  {
    ref: "Wie viele Bewerbungen kann ich gleichzeitig speichern?",
    header: "Wie viele Bewerbungen kann ich gleichzeitig speichern?",
    body: [
      "Du kannst so viele Bewerbungen speichern, wie du magst. Es empfiehlt sich aber, die nicht mehr gebrauchten Bewerbungen zu löschen.",
    ],
  },
  {
    ref: "Was ist mit 'Beruf' gemeint?",
    header: "Was ist mit 'Beruf' gemeint?",
    body: [
      "Damit ist der Name des Berufes/des Jobs gemeint, wie z.B. Bäcker*in, Tischler*in, Medienfachfrau*mann. In der Regel wird die genaue Berufs- oder Jobbezeichnung in der Stellenausschreibung genannt.",
    ],
  },
  {
    ref:
      "Was heißt 'Start' und 'Ende' und warum muss ich ein 'Ende' angeben, um die Bewerbung zu speichern?",
    header:
      "Was heißt 'Start' und 'Ende' und warum muss ich ein 'Ende' angeben, um die Bewerbung zu speichern?",
    body: [
      "'Start' und 'Ende' bezeichnet einen Zeitraum, der für die Bewerbung wichtig ist, zum Beispiel wenn es eine Bewerbungsfrist gibt. Diese Daten werden automatisch im Kalender (im Menüpunkt 'Erinnerungen') eingetragen. Das Feld 'Ende' muss ausgefüllt werden, um sicherzustellen, dass eine 'Deadline' (also der Tag, an dem die Bewerbung spätestens abgeschickt werden soll) eingehalten wird. Falls die Deadline nicht vom Arbeitgeber*innen vorgegeben wird, empfiehlt es sich trotzdem, ein Enddatum selbst zu wählen, um die Bewerbung nicht zu vergessen.",
    ],
  },
  {
    ref: "Was heißt 'Status'?",
    header: "Was heißt 'Status'?",
    body: [
      "Unter Status kannst du zwischen 'In Bearbeitung', 'Abgeschickt', 'Keine Rückmeldung' und  'Leider nein' wählen. Das soll dir dabei helfen, einen Überblick zu behalten, gerade wenn du viele Bewerbungen hast. - 'In Bearbeitung' heißt, dass die Bewerbung noch nicht abgeschickt wurde. - 'Abgeschickt' heißt, dass die Bewerbung schon fertig ist und abgeschickt wurde. - 'Keine Rückmeldung' heißt, dass die Arbeitgeber*innen sich nicht gemeldet haben, was leider oft vorkommt. In solchen Fällen empfiehlt es sich, nach ein paar Wochen nochmal nachzufragen. Damit kannst du zeigen, dass du die Stelle besonders gerne hättest. - Bei 'Leider nein' gab es eine Absage, aber das ist bei Bewerbungen leider normal.",
    ],
  },
  {
    ref: "Verändert sich der Status einer Bewerbung automatisch?",
    header: "Verändert sich der Status einer Bewerbung automatisch?",
    body: [
      "Nein, APPly weiß leider nicht, was der aktuelle Stand ist. Den Status musst du selbst ändern, wenn sich was verändert. Klicke dazu bitte auf das Feld unter 'Status' und wähle den passenden aktuellen Status aus.",
    ],
  },
  {
    ref: "Was ist ein Motivationsschreiben?",
    header: "Was ist ein Motivationsschreiben?",
    body: [
      "In einem Motivationsschreiben geht es darum, dass du die Arbeitgeber*innen überzeugst, dass du motiviert bist, dort zu arbeiten und warum genau du richtig für diese Stelle bist. Anders als ein Lebenslauf ist ein Motivationsschreiben ein Fließtext mit mehreren Absätzen. Ein Motivationsschreiben kann unterschiedlich aufgebaut sein. Bitte informiere dich, ob in der Stellenausschreibung bestimmte Vorgaben dazu stehen. Wenn nicht, kannst du dich auch vom Beispieltext in der App inspirieren lassen - achte aber darauf, dass du den Text an die Stellenausschreibung anpasst.",
    ],
  },
  {
    ref: "Wie erstelle ich ein Motivationsschreiben?",
    header: "Wie erstelle ich ein Motivationsschreiben?",
    body: [
      "Zunächst einmal legst du eine Bewerbung an, indem du auf das '+' Symbol klickst, die Details zur Bewerbung ausfüllst und die Bewerbung hinzufügst. Jetzt kannst du noch ein Motivationsschreiben hinzufügen, indem du auf 'Motivationsschreiben bearbeiten' gehst. Hier findest du mehrere Gliederungen, 'Einstieg' – 'Hauptteil' – 'Schlussteil'. Um diese Sparten auszufüllen, klicke auf das Symbol „Stift“ neben den einzelnen Ausfüllfeldern und trage hier deinen persönlichen Text ein oder passe die Vorlage an. Wenn du nach rechts wischt, findest du weitere Vorlagen. Klicke auf das Häkchen rechts oben und deine Daten werden gespeichert. In deiner angelegten Bewerbung siehst du nun den Status 'Motivationsschreiben angehängt' mit einem grünen Häkchen. Wenn du diese Bewerbung löschen willst, gehe auf 'Bewerbung entfernen'.",
    ],
  },
  {
    ref: "Muss oder kann ich den Vorlagentext ändern?",
    header: "Muss oder kann ich den Vorlagentext ändern?",
    body: [
      "Du kannst deinen eigenen Text schreiben, die bestehenden Vorlagen (Tipp: wenn du nach rechts wischt, findest du mehr Vorlagen) übernehmen oder den Vorlagentext ändern. In allen Fällen solltest du auf 'Speichern' klicken, damit der Text für dein Motivationsschreiben übernommen wird. Dieser Text wird dann als 'Aktueller Text' (oben, über dem Bearbeitungsfenster) angezeigt. Wenn du alles ausgefüllt hast, kannst du das Motivationsschreiben oben rechts speichern und kehrst damit zu deiner angelegten Bewerbung zurück.",
    ],
  },
  {
    ref:
      "Verändert sich der Vorlagentext dauerhaft, wenn ich ihn einmal ändere?",
    header:
      "Verändert sich der Vorlagentext dauerhaft, wenn ich ihn einmal ändere?",
    body: [
      "Nein. Der Vorlagentext wird nur in dieser bestimmten, von dir angelegten Bewerbung geändert, sobald du speicherst. Wenn du eine neue Bewerbung anlegst, wird der ursprüngliche Vorlagentext wieder angezeigt. Wenn du ein bestehendes Motivationsschreiben aufmachst, wird die erste Version immer die aktuelle Version sein - also die Version, die beim 'Vorschau & Teilen' gespeichert und geteilt wird. Diese erkennst du daran, dass oben 'Aktueller Text' steht. Wenn du weiter nach rechts wischt, werden die weiteren Vorlagen angezeigt.",
    ],
  },
  {
    ref:
      "Was ist jeweils mit Betreff, Anrede, Einleitung, Werdegang, Kompetenzen, Beitrag, Abschluss und Abschied gemeint?",
    header:
      "Was ist jeweils mit Betreff, Anrede, Einleitung, Werdegang, Kompetenzen, Beitrag, Abschluss und Abschied gemeint?",
    body: [
      "Mit 'Betreff' ist hier der Titel der Bewerbung gemeint - also das, was in der Überschrift angezeigt wird. In 'Anrede' kannst du die Ansprechperson adressieren. In der 'Einleitung' schreibst du, dass du dich auf eine bestimmte Stellenausschreibung bewerben möchtest. Im 'Werdegang' schreibst du, was du bisher gemacht hast und warum du an so einer Stelle interessiert bist. Unter 'Kompetenzen' kannst du zum Beispiel schreiben, was deine Fähigkeiten, Erfahrungen und Stärken sind. Unter 'Beitrag' kannst du schreiben, warum ausgerechnet du für die Stelle besonders geeignet bist und was du beitragen kannst. Unter 'Abschluss' kannst du ein paar abschließende Worte sagen und unter 'Abschied' eine Grußformel hinzufügen.",
    ],
  },
  {
    ref:
      "Muss ich in allen Feldern (Betreff, Anrede, Einleitung, Werdegang, Kompetenzen, Beitrag, Abschluss und Abschied) Text hinzufügen?",
    header:
      "Muss ich in allen Feldern (Betreff, Anrede, Einleitung, Werdegang, Kompetenzen, Beitrag, Abschluss und Abschied) Text hinzufügen?",
    body: [
      "Nein. Ein Motivationsschreiben muss nicht immer genauso wie hier aufgebaut sein. Die APPly Version ist nur ein Beispiel, du kannst es aber auch anders gestalten. Diese Unterscheidung soll dir nur helfen, das Motivationsschreiben zu strukturieren, du kannst aber auch etwas anderes in die Felder schreiben oder sie auch leer lassen. Hier findest du einige weitere Beispiele für Bewerbungsschreiben: Bewerbungsportal - Musterbewerbungen (ams.or.at).",
    ],
  },
]);
const accordion4 = ref([
  {
    ref: "Wie speichere ich meine Bewerbungen als Dokument ab?",
    header: "Wie speichere ich meine Bewerbungen als Dokument ab?",
    body: [
      "Wenn du eine Bewerbung angelegt hast und ein Motivationsschreiben angehängt hast, kannst du 'Vorschau & Teilen' anklicken und dort anschauen, wie das fertige Motivationsschreiben am Ende aussehen wird. Wenn es so passt, kannst du rechts oben auf das Teilen-Symbol klicken. Die Datei wird automatisch als .docx und PDF Datei auf deinem Smartphone gespeichert. Du kannst die Datei aber auch hochladen oder direkt per E-Mail schicken. Wenn es noch nicht passt, kannst du zurückgehen und den Text weiter bearbeiten.",
    ],
  },
  {
    ref: "Kann ich ein Motivationsschreiben nachträglich bearbeiten?",
    header: "Kann ich ein Motivationsschreiben nachträglich bearbeiten?",
    body: [
      "Natürlich kannst du das Motivationsschreiben jederzeit ändern, in der Vorschau ansehen und dann nochmal speichern, hochladen, drucken oder teilen.",
    ],
  },
  {
    ref: "Kann ich das Motivationsschreiben in einem anderen Programm ändern?",
    header:
      "Kann ich das Motivationsschreiben in einem anderen Programm ändern?",
    body: [
      "Ja, indem du auf 'Vorschau & Teilen' und dann auf das Teilen-Symbol (rechts oben) klickst. Der Lebenslauf wird damit automatisch im PDF und .docx Format auf deinem Smartphone gespeichert (je nach Smartphone in deinem Dokumenten- oder Download-Ordner).  Du kannst es zum Beispiel an dich selbst schicken oder auf eine Cloud (z.B. Google Drive) hochladen. Dann kannst du es weiter bearbeiten. Zum Bearbeiten empfehlen wir das .docx Format.",
    ],
  },
  {
    ref: "Kann ich die Vorschau einer Bewerbung sehen?",
    header: "Kann ich die Vorschau einer Bewerbung sehen?",
    body: [
      "Ja, bevor du die Bewerbung (oder den Lebenslauf) auf deinem Smartphone speicherst, druckst, oder hochlädst, kannst du dir das Dokument in einer Vorschau ansehen. Dabei kannst du auch zoomen, das heißt, das Dokument vergrößern, um es besser zu sehen. Wenn dir etwas nicht gefällt, kannst du wieder zurückgehen und den Text verändern. Wenn dir das Format nicht gefällt, kannst du das Dokument speichern, an sich selbst schicken oder auf deine Cloud hochladen und mit einer anderen Software (z.B. Microsoft Word) bearbeiten.",
    ],
  },
  {
    ref: "Wie verschicke ich das fertige Motivationsschreiben?",
    header: "Wie verschicke ich das fertige Motivationsschreiben?",
    body: [
      "Das fertige Motivationsschreiben kannst du hochladen oder verschicken. Dafür kannst du unter dem Menüpunkt 'Bewerbungen' die passende Bewerbung auswählen. Anschließend kannst du auf 'Vorschau & Teilen' gehen. Hier werden dir einige Fragen gestellt, um sicherzugehen, dass du nichts vergessen hast. Wenn du alles mit einem 'Häkchen' abgehakt hast, kannst du das Motivationsschreiben erstellen. Über den Teilen-Button rechts oben kannst du das Schreiben senden. Das Motivationsschreiben wird automatisch im PDF und im .docx Format auf deinem Smartphone gespeichert. Zum Verschicken empfehlen wir das PDF Format. Falls du das Schreiben aber noch in einer anderen Software ändern magst, empfiehlt sich das .docx Format.",
    ],
  },
]);
const accordion5 = ref([
  {
    ref: "Wozu ist der Menüpunkt 'Erinnerungen'?",
    header: "Wozu ist der Menüpunkt 'Erinnerungen'?",
    body: [
      "Hier findest du einen Kalender mit Terminen, die mit der Bewerbung etwas zu tun haben. Bei jeder Bewerbung kannst du ein Start- und ein Enddatum angeben. Diese Daten werden automatisch im Kalender eingetragen. Zudem kannst du im Menüpunkt 'Erinnerungen' auch andere Termine manuell eintragen. Dabei kann es sich z.B. um Praktikas, Aufnahmetests oder Bewerbungsgespräche handeln. Du kannst dir auch eigene Termine eintragen, um z.B. zu planen, bis wann du eine Bewerbung schreiben sollst, oder wann du bei Arbeitgeber*innen nachfragen solltest, ob sie deine Bewerbung erhalten haben oder eine Rückmeldung für dich haben ('Feedback'). Dieser Kalender wird aktuell leider noch nicht mit anderen Kalender Apps auf deinem Handy synchronisiert.",
    ],
  },
  {
    ref: "Warum haben die Termine unterschiedliche Farben?",
    header: "Warum haben die Termine unterschiedliche Farben?",
    body: [
      "Die schon angelegten Bewerbungen sind mit einer roten Umrandung gekennzeichnet. Termine, die du dir selbst anlegst, kannst du anlegen als 'Bewerbungsgespräch' (blaue Kennzeichnung), 'Aufnahmetest' (gelbe Kennzeichnung), 'Feedback' (rosa Kennzeichnung), und 'sonstige Termine' (grüne Kennzeichnung).",
    ],
  },
  {
    ref: "Was heißt 'Feedback'?",
    header: "Was heißt 'Feedback'?",
    body: [
      "Leider ist es häufig so, dass sich Arbeitgeber*innen nach einer Bewerbung nicht mehr melden, oder kein Feedback (Rückmeldung) geben, warum sie eine Person nicht genommen haben - das ist nicht deine Schuld und es heißt nicht, dass du was falsch gemacht hast. In manchen Fällen lohnt es sich von sich aus nachzufragen, z.B. ob sie die Bewerbung erhalten haben, oder ob sie schon eine Entscheidung getroffen haben. Falls du eine Absage bekommen hast, kannst du vielleicht nachfragen, ob sie dir Feedback oder Ratschläge für das nächste Mal geben können.",
    ],
  },
  {
    ref: "Wie lege ich einen Termin/eine Erinnerung an?",
    header: "Wie lege ich einen Termin/eine Erinnerung an?",
    body: [
      "Um eine Erinnerung zu erstellen, klicke auf das grüne Plus, wähle den passenden Typ ('Bewerbungsgespräch', 'Aufnahmetest', 'Feedback', 'sonstige Termine') aus und setze 'Start und Ende'. Mit 'Start und Ende' gibst du einen Zeitraum an, in dem die Erinnerung gilt und verschaffst dir damit einen Überblick, wann eine Aufgabe abgeschlossen ist. Klicke nun auf 'Termin hinzufügen'. Mit dem 'x' rechts oben schließt sich das Fenster, ohne etwas abzuspeichern.",
    ],
  },
]);
const accordion6 = ref([
  {
    ref: "Kann ich die Hintergrundfarbe der App ändern?",
    header: "Kann ich die Hintergrundfarbe der App ändern?",
    body: [
      "Leider noch nicht :( Derzeit gibt es nur einen hellen und einen dunklen Hintergrund ('Dark-Mode'). Dieser kann jederzeit im Menüpunkt 'Einstellungen' geändert werden.",
    ],
  },
  {
    ref: "Kann ich den Dark-Mode (de)aktivieren?",
    header: "Kann ich den Dark-Mode (de)aktivieren?",
    body: [
      "Unter dem Menüpunkt 'Einstellungen' findest du einen Regler, den du nach links (light=hell) oder nach rechts (dark=dunkel) schieben kannst. Damit ändert sich der Hintergrund in der ganzen App. Du kannst es jederzeit wieder ändern.",
    ],
  },
  {
    ref: "Was heißt 'Daten zurücksetzen'?",
    header: "Was heißt 'Daten zurücksetzen'?",
    body: [
      "Hier kannst du alle Daten, die du eingegeben hast, löschen. Achtung - diese können nicht mehr wiederhergestellt werden.",
    ],
  },
  {
    ref: "Gibt es die App auch in anderen Sprachen?",
    header: "Gibt es die App auch in anderen Sprachen?",
    body: ["Das wäre sehr schön - leider konnten wir das noch nicht machen."],
  },
]);
const accordion7 = ref([
  {
    ref: "Muss ich mich anmelden?",
    header: "Muss ich mich anmelden?",
    body: [
      "Nein, du musst kein Konto erstellen und dich auch nicht per E-Mail anmelden. Die Daten, die du unter 'Lebenslauf', 'Bewerbung'  oder 'Erinnerungen' eingibst, werden nur für deinen Lebenslauf gespeichert und genutzt.",
    ],
  },
  {
    ref: "Wo werden meine Daten gespeichert?",
    header: "Wo werden meine Daten gespeichert?",
    body: [
      "Uns ist Datenschutz wirklich sehr wichtig. Daher gibt es kein Konto und keine Anmeldung per E-Mail. Deine Daten werden ausschließlich lokal - also auf einem Smartphone - gespeichert. Niemand sonst sieht deine Daten. Das heißt allerdings auch, dass du die Daten in der Regel nicht 'mitnehmen' kannst, also z.B., wenn du das Smartphone wechselst oder verlierst oder die App auf einem anderen Gerät (z.B. Tablet, oder das Smartphone einer Freundin/eines Freundes) verwenden magst. In diesem Fall müsstest du alles nochmal eingeben.",
    ],
  },
  {
    ref: "Wer hat Zugriff auf meine Daten?",
    header: "Wer hat Zugriff auf meine Daten?",
    body: [
      "Niemand. Weder wir noch irgendwelche Firmen oder Regierungen…Nur du hast Zugriff auf alles, was du in der App eingibst.",
    ],
  },
  {
    ref:
      "Kann ich mich an einem anderen Gerät anmelden und auf meine Daten zugreifen?",
    header:
      "Kann ich mich an einem anderen Gerät anmelden und auf meine Daten zugreifen?",
    body: [
      "Nein. Da wir Datenschutz sehr ernst nehmen, werden alle Daten nur lokal, also auf deinem Smartphone und nicht im Internet gespeichert.",
    ],
  },
  {
    ref: "Kann ich meine Daten löschen?",
    header: "Kann ich meine Daten löschen?",
    body: [
      "Ja, du kannst deine Daten im Menüpunkt “Einstellungen” zurücksetzen und damit endgültig löschen. Diese können auch nicht mehr wiederhergestellt werden. Außerdem kannst du alle Daten und Cookies der App in den Einstellungen deines Smartphones löschen. In diesem Fall wird die App nicht gelöscht, die Daten aber schon. Und natürlich kannst du auch jederzeit einfach die App löschen.",
    ],
  },
]);
const accordion8 = ref([
  {
    ref: "Wer hat die App gemacht?",
    header: "Wer hat die App gemacht?",
    body: [
      "Die App war Teil eines Projekts der Universität Wien, das zwischen 2021 und 2023 lief. Die App wurde gemeinsam mit Schüler*innen der HAK AUL Flora Fries und den media.lab Teilnehmenden des WUK work.space entwickelt. Hier haben alle gemeinsam gedacht, designed, entwickelt, getestet und viel Herz in die App gesteckt.",
    ],
  },
  {
    ref: "Warum habt ihr die App gemacht?",
    header: "Warum habt ihr die App gemacht?",
    body: [
      "Wir haben in Gesprächen mit Jugendlichen, Jugendarbeiter*innen und jungen Erwachsenen herausgefunden, dass viele junge Menschen keinen Computer oder keine komplizierte und kostenpflichtige Software wie Microsoft Word haben oder nutzen. Diese sind aber zum Schreiben von Bewerbungen oft notwendig. Da haben wir uns gedacht, dass es Sinn machen könnte, eine relativ einfache App zum Schreiben von Bewerbungen am Smartphone zu entwickeln.",
    ],
  },
  {
    ref:
      "Muss ich nicht mehr andere Menschen um Hilfe bitten, wenn ich meine Bewerbung mit APPly schreibe?",
    header:
      "Muss ich nicht mehr andere Menschen um Hilfe bitten, wenn ich meine Bewerbung mit APPly schreibe?",
    body: [
      "Auf keinen Fall - die Idee ist es nicht alles alleine mit dem Smartphone zu machen, sondern nur eine zusätzliche Hilfestellung zu haben. Falls du mit Freund*innen, Familie, Lehrer*innen, Coaches, Trainer*innen, Jugendarbeiter*innen oder anderen Menschen aus deinem Umfeld eure Bewerbung besprechen und gemeinsam schreiben kannst - umso besser, vor allem, weil Bewerbungen (jetzt Mal ganz ehrlich) auch einfach fad sein können. Und je mehr Menschen sich eine Bewerbung anschauen, umso besser.",
    ],
  },
  {
    ref: "Wer finanziert das Projekt?",
    header: "Wer finanziert das Projekt?",
    body: [
      "Das Projekt wurde von Digifonds, dem Digitialisierungsfonds Arbeit 4.0 der AK Wien, Österreich, finanziert (2021-2023). Wir bedanken uns herzlich für die Unterstützung.",
    ],
  },
  {
    ref: "Wird die App was kosten?",
    header: "Wird die App was kosten?",
    body: [
      "Nein. Wir sind ein wissenschaftliches Projekt der Universität Wien und kein kommerzielles Unternehmen. Die App wurde ausserdem open-source entwickelt - d.h. der Code von APPly kann auf Github eingesehen, kopiert, heruntergeladen und weiterentwickelt werden. Es kann allerdings nicht verkauft oder kommerzialisiert werden.",
    ],
  },
  {
    ref: "Wird es weitere Updates geben?",
    header: "Wird es weitere Updates geben?",
    body: [
      "Leider sind derzeit keine weiteren Updates geplant, da das Projekt nicht weiter finanziert wird. In anderen Worten - das Geld ist leider alle…Wenn ihr aber viel Geld habt und was Gutes tun und das Projekt unterstützen möchtet, meldet euch gerne bei uns :) Die Jugendlichen haben nämlich noch viele weitere Ideen - ein Oktopus wäre auch dabei. ",
    ],
  },
  {
    ref: "Kann ich die App weiterentwickeln?",
    header: "Kann ich die App weiterentwickeln?",
    body: [
      "Ja, unbedingt! Wenn du programmieren kannst, oder lernen möchtest, könntest du jederzeit auf den Code zugreifen und eine bessere App machen. Wir würden uns sehr freuen!",
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
  transition: all 0.1s ease-in-out;
}
.nested-leave-active {
  transition: all 0.1s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.1s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
