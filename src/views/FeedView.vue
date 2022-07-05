<template>
  <h1>Feed</h1>
  <!--<img src="../assets/fabian.jpg" /> -->
  <!--  <img src="../assets/simon.jpg" /> -->
  <!-- <img src="../assets/felix.jpg" /> -->
  <!--<img src="../assets/nicole.jpg" /> -->
</template>

<script setup>
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router";
import { onBeforeUnmount } from "vue";
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
