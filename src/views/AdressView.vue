<template>
  <div>
    <p>Address</p>
    <input-field name="city" label="City" />
    <input-field name="street" label="Street" />
    <input-field name="country" label="Country" />
  </div>
</template>
<script lang="ts" setup>
import { InputField, useProxyState } from "jenesius-vue-form";

const props = defineProps();
useProxyState(props.name);
</script>
