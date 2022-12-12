<template>
  <FormKit
    v-model="workShop"
    type="text"
    label="Titel"
    placeholder="Workshop-Teilnahme"
  />
  <FormKit
    v-model="description"
    type="text"
    label="Text"
    placeholder="Beschreibung"
  />
  <FormKit
    type="date"
    v-model="workShopFrom"
    label="Von"
    placeholder="Auswählen"
  />
  <FormKit
    type="date"
    v-model="workShopTo"
    label="Bis"
    placeholder="Auswählen"
    :validation="[['date_after', workShopFrom]]"
    validation-visibility="live"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
const workShop = ref(null);
const description = ref(null);
const workShopFrom = ref(null);
const workShopTo = ref(null);
</script>
