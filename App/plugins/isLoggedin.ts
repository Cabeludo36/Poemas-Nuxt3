import { isLoggedin } from "~~/utils/util";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("isLoggedin", () => {
    return isLoggedin();
  });
});
