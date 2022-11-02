<template>
  <h1></h1>
  <!--<img src="../assets/images/fabian.jpg" /> -->
  <!--  <img src="../assets/images/simon.jpg" /> -->
  <!-- <img src="../assets/images/felix.jpg" /> -->
  <!--<img src="../assets/images/nicole.jpg" /> -->
</template>

<script setup lang="ts">
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router";
import { onBeforeUnmount } from "vue";
const router = useRouter();
const auth = getAuth();
const authListener = auth.onAuthStateChanged((user) => {
  if (!user) {
    alert("you must be logged in to view this. redirecting to the home page");
    router.push("/");
  }
});
onBeforeUnmount(() => {
  authListener();
});
</script>
