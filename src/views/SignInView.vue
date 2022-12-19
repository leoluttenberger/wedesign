<template>
  <h1>Login to Your Account</h1>
  <FormKit type="text" placeholder="Email" v-model="email" />
  <FormKit type="password" placeholder="Password" v-model="password" />
  <p v-if="errMsg">{{ errMsg }}</p>
  <FormKit type="button" @click="signIn">Submit</FormKit>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();
const errMsg = ref();
const signIn = () => {
  console.log("signinlo");
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully logged in!");
      router.push("/feed");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};
</script>
