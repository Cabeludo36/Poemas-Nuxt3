<template>
  <div id="AppView">
    <nav>
      <ul>
        <li><nuxt-link to="/">Home</nuxt-link></li>
        <li><nuxt-link to="/about">About</nuxt-link></li>
        <li><nuxt-link to="/contact">Contact</nuxt-link></li>
      </ul>
      <client-only placeholder="Loading...">
        <div id="Login" v-if="!$isLoggedin()">
          <nuxt-link style="margin-right: 5px" to="/login/login">Login</nuxt-link> |
          <nuxt-link style="margin-left: 5px" to="/login/register">Register</nuxt-link>
        </div>
        <div v-else>
          <button @click="logout()">Logout</button>
        </div>
      </client-only>
    </nav>
    <router-view />
  </div>
</template>
<script setup lang="ts">import { User } from '@prisma/client';

useHead({
  title: "Poemas",
  htmlAttrs: {
    lang: "en",
  },
});
useCookie("user", {
  default: () => {
    return {
      email: "",
      password: "",
    };
  },
});
const { $isLoggedin } = useNuxtApp();
useState("user").value = useCookie("user").value ? useCookie("user").value : null;

function logout() {
  useCookie("user").value = JSON.stringify(null);
  useState("user").value = useCookie("user").value;

  refreshNuxtData();
  useRouter().push("/").then(() => window.location.reload());
  
}
</script>
<style>
#AppView {
  padding: 20px;
}
#AppView nav {
  display: flex;
  justify-content: space-between;
}
#AppView nav #Login {
  display: flex;
  justify-content: space-between;
}
#AppView nav ul {
  display: flex;
  list-style: none;
}
#AppView nav ul li {
  margin-right: 20px;
}

#AppView nav ul li a {
  color: #333;
}

#AppView nav ul li a:hover {
  text-decoration: underline;
}
</style>
