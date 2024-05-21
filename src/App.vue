<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import CartComponent from "./components/CheckOut.vue";
import { loginStore } from "./stores/login";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import ValidComponent from "./components/ValidComponent.vue";

// When using the Tauri API npm package:
//import { invoke } from '@tauri-apps/api/tauri'

const loginInstance = loginStore();

const loggedIn = computed(() => loginInstance.isLoggedIn);

function logOut() {
  loginInstance.logOut();

  const invoke = window.__TAURI__?.invoke;

  if (invoke == undefined) {
    return;
  }

  invoke("my_custom_command");
}

const { user } = storeToRefs(loginInstance);
</script>

<template>
  <div class="header">
    <div class="logos">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <div class="message">
      <HelloWorld msg="Vite + Vue" />
    </div>
  </div>
  <div class="menu">
    <RouterLink v-if="loggedIn" class="login" :to="{ name: 'home' }">
      <button @click="logOut">Log out</button>
    </RouterLink>
    <RouterLink v-else class="login" :to="{ name: 'log' }">
      <button>Login</button>
    </RouterLink>
    <nav>
      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink :to="{ name: 'finished' }">Order Custom Item</RouterLink>
      <RouterLink :to="{ name: 'hardware' }">Hardware</RouterLink>
      <RouterLink :to="{ name: 'blog' }">Blog</RouterLink>
      <RouterLink v-if="loggedIn" :to="{ name: 'sales' }">SalesInfo</RouterLink>
    </nav>
  </div>
  <main>
    <RouterView />
  </main>
  <section class="Username">
    <h1>{{ user }}</h1>
  </section>
  <section class="Cart">
    <CartComponent></CartComponent>
  </section>
  <section>
    <ValidComponent></ValidComponent>
  </section>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.header {
  display: grid;
  grid-template-areas: "A" "B";
  justify-items: center;
}

.logos {
  grid-area: "A";
  margin: auto;
}

.message {
  grid-area: "B";
  margin: auto;
}

.header {
  grid-area: B;
  align-self: center;
}

main {
  grid-area: G;
}

.menu {
  grid-area: E;
  display: grid;
  grid-template-areas: "a b";
  background-color: seagreen;
  opacity: 50%;
  gap: 250px;
}

.login {
  align-self: flex-start;
  grid-area: a;
  display: flex;
  align-self: center;
}

.nav {
  grid-area: b;
  flex-wrap: nowrap;
  align-self: center;
  justify-content: space-between;
  gap: 30px;
  background-color: seagreen;
  opacity: 50%;
}
nav {
  display: flex;
  align-self: center;
}

.Username {
  grid-area: C;
}

.Cart {
  grid-area: H;
}


nav > a {
  white-space: nowrap;
  font-size: 3em;
  border: 10px solid darkgreen;
  background-color: rgb(36, 36, 36);
}

nav:hover {
  opacity: 100%;
}

.router-link-active {
  color: aliceblue;
}

</style>
