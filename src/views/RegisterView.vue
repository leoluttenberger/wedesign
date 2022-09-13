<template>
  <div class="px-2 py-3">Create an Account</div>
  <FormKit type="text" placeholder="Email" v-model="email" />
  <FormKit type="password" placeholder="Password" v-model="password" />
  <FormKit type="button" @click="register">Submit</FormKit>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();
const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully registered!");
      router.push("/feed"); // redirect to the feed
      const user = data;
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>
