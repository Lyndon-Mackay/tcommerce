<script setup lang="ts">
import { ref } from "vue";
import { loginStore } from "../stores/login";
import { useRoute, useRouter } from "vue-router";

const account = loginStore();
const inputUser = ref("");

const router = useRouter();
const route = useRoute();

function logIn() {
  account.logIn(inputUser.value);

  const redirect = route.query.redirect;
  if (Array.isArray(redirect)) {
    router.push({ name: "login" });
    return;
  }

  let redirect2 = redirect || "home";

  router.push({ name: redirect2 });
}
</script>
<template>
  <form @submit.prevent="logIn()">
    <h1>Login</h1>
    <fieldset>
      <legend>Details</legend>
      <label for="username">Username</label>
      <input required id="username" v-model="inputUser" type="text" />
    </fieldset>
    <button>Submit</button>
  </form>
</template>
<style scoped>
input {
  width: 9em;
}
</style>
