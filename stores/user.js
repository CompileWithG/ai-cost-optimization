// stores/user.js
import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    email: "",
  }),
  actions: {
    login(email) {
      this.isLoggedIn = true;
      this.email = email;
    },
    logout() {
      this.isLoggedIn = false;
      this.email = "";
    },
  },
});
