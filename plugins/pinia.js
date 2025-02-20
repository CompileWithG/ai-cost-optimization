// plugins/pinia.js
import { defineNuxtPlugin } from "#app";
import { createPinia } from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
  if (!nuxtApp.$pinia) {
    const pinia = createPinia();
    nuxtApp.vueApp.use(pinia);
  }
});
