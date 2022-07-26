<template>
  <input-field type="text" name="user" label="Username" />
  <input-field type="text" name="age" label="Age" />
</template>
<script lang="ts" setup>
import { Form, InputField } from "jenesius-vue-form";
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router";
import { onBeforeUnmount } from "vue";
const form = new Form();
const router = useRouter();
const auth = getAuth();
const authListener = auth.onAuthStateChanged(function (user) {
  if (!user) {
    // not logged in
    alert("you must be logged in to view this. redirecting to the home page");
    router.push("/");
  }
});
onBeforeUnmount(() => {
  // clear up listener
  authListener();
});
</script>
