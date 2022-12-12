<template>
  <FormKit
    v-model="type"
    type="select"
    label="Typ"
    :options="['HTL', 'AHS', 'HAK', 'HBLA']"
  />

  <FormKit
    v-model="specialty"
    type="select"
    label="Schwerpunkt"
    :options="['IT', 'BE', 'Sprachen', 'Wirtschaft']"
  />
  <FormKit
    v-model="address"
    type="text"
    label="Adresse"
    placeholder="PLZ, Ort, Adresse"
  />
  <FormKit
    type="date"
    v-model="educationFrom"
    label="Von"
    placeholder="Auswählen"
  />
  <FormKit
    type="date"
    v-model="educationTo"
    label="Bis"
    placeholder="Auswählen"
    :validation="[['date_after', educationFrom]]"
    validation-visibility="live"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
const type = ref(null);
const specialty = ref(null);
const address = ref(null);
const educationFrom = ref(null);
const educationTo = ref(null);
const slideValue = ref(null);
</script>
