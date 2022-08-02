<template>
  <div>
    <input-field type="text" name="firstName" label="Firstname" />
    <input-field type="text" name="secondName" label="Secondname" />
    <input-field type="text" name="email" label="Email" />
    <p>Address</p>
    <input-field name="city" label="City" />
    <input-field name="street" label="Street" />
    <input-field name="country" label="Country" />
    <input-field name="address" label="Address" />
    <input-field name="email" label="Email" />
  </div>
</template>
<script lang="ts" setup>
import { Form, InputField } from "jenesius-vue-form";
const form = new Form();
</script>
