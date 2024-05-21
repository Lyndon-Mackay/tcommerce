import { defineStore } from "pinia";
import { computed, ref } from "vue";

const user = ref("");
const storedUser = localStorage.getItem("user");

if (storedUser != null) {
  user.value = storedUser;
}

export const loginStore = defineStore("login", () => {
  const isLoggedIn = computed(() => user.value.length > 0);

  function logIn(username: string) {
    user.value = username;
    localStorage.setItem("user", username);
  }
  function logOut() {
    user.value = "";
    localStorage.removeItem("user");
  }

  return { user, logIn, logOut, isLoggedIn };
});
