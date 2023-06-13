<template>
  <div class="text-black">
    <vue-collapsible-panel-group>
      <vue-collapsible-panel :expanded="false">
        <template #title>Bewerbungsprozess </template>
        <template #content
          ><ul>
            <li>Was soll ich zuerst machen?</li>
            <li>
              Wo finde ich Stellenausschreibungen? (auch direkt beim Betrieb,
              Initiativbewerbungen)
            </li>
          </ul>
        </template>
      </vue-collapsible-panel>
      <vue-collapsible-panel :expanded="false">
        <template #title> Lebenslauf erstellen </template>
        <template #content>
          <li>Was ist der Unterschied zwischen Erfahrungen und Kenntnissen?</li>
          <li>Wie bearbeite ich den Lebenslauf?</li>
          <li>Kann ich meinen Lebenslauf nachträglich verändern?</li>
          <li>Gibt es unterschiedliche Vorlagen für den Lebenslauf?</li>
          <li>Kann ich den Lebenslauf in einem anderen Programm ändern?</li>
        </template>
      </vue-collapsible-panel>
      <vue-collapsible-panel :expanded="false">
        <template #title> Bewerbung erstellen </template>
        <template #content>
          <li>Wie erstelle ich eine Bewerbung?</li>
          <li>Was ist der Vorlagentext?</li>
          <li>Muss ich den Vorlagentext ändern?</li>
          <li>Wie viele Bewerbungen kann ich gleichzeitig speichern?</li>
          <li>Verändert sich der Status einer Bewerbung automatisch?</li>
          <li>
            Wie füge der Bewerbung Informationen über den Status hinzu
            (abgelehnt, abgeschickt, keine Rückmeldung, leider nein)
          </li>
        </template>
      </vue-collapsible-panel>
      <vue-collapsible-panel :expanded="false">
        <template #title> Bewerbung speichern und bearbeiten </template>
        <template #content>
          <li>Wie speichere ich meine Bewerbungen ab?</li>
          <li>Wo finde ich eine Übersicht aller gespeicherten Bewerbungen?</li>
          <li>Kann ich eine Bewerbung nachträglich bearbeiten?</li>
          <li>Kann ich die Bewerbung in einem anderen Programm ändern?</li>
          <li>Wofür ist das Archiv (Bewerbungen)?</li>
        </template>
      </vue-collapsible-panel>
      <vue-collapsible-panel :expanded="false">
        <template #title> Bewerbung und Lebenslauf exportieren </template>
        <template #content>
          <li>Kann ich die Vorschau einer Bewerbung sehen?</li>
          <li>Wie exportiere ich die Bewerbung oder den Lebenslauf?</li>
        </template>
      </vue-collapsible-panel>
      <vue-collapsible-panel :expanded="false">
        <template #title> Kalender </template>
        <template #content>
          <li>Wofür ist der Kalender?</li>
          <li>Wie lege ich Termine an?</li>
          <li>(Anfang-Ende Funktion, visuelle Darstellung im Kalender)</li>
        </template>
      </vue-collapsible-panel>
      <vue-collapsible-panel :expanded="false">
        <template #title> Einstellungen </template>
        <template #content>
          <li>Wie kann ich den Dark-Mode (de)aktivieren?</li>
        </template>
      </vue-collapsible-panel>
      <vue-collapsible-panel :expanded="false">
        <template #title> Datenschutz und Datennutzung </template>
        <template #content>
          <li>Wo werden meine Daten gespeichert?</li>
          <li>Wer hat Zugriff auf meine Daten?</li>
        </template>
      </vue-collapsible-panel>
      <vue-collapsible-panel :expanded="false">
        <template #title> Wer sind wir </template>
        <template #content>
          <li>Wer hat die App gemacht?</li>
          <li>Wer finanziert das Projekt?</li>
          <li>Kann ich die App weiterentwickeln?</li>
          <li>Welche Lizenz hat die App</li>
          <li>Kontaktdaten (Website+Gmail?)</li>
        </template>
      </vue-collapsible-panel>
    </vue-collapsible-panel-group>
  </div>
</template>
<script setup lang="ts">
import {
  VueCollapsiblePanelGroup,
  VueCollapsiblePanel,
} from "@dafcoe/vue-collapsible-panel";
import "@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css";
</script>
