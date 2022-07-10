<template>
  <div v-if="fetching">
    <p>Loading...</p>
  </div>
  <div v-else id="IndexView">
    <div>
      <div>
        <h1>Index</h1>
        <p v-if="$isLoggedin()">localUser: {{ localUser.email }}</p>
      </div>
      <div>
        <NuxtLink to="/poema/create">Create Poema</NuxtLink>
      </div>
    </div>
    <div v-if="poemas != null && poemas.length != 0">
      <p>Poemas:</p>
      <PoemaPortred v-for="poema in poemas" :poema="poema" />
    </div>
    <p v-else>No Poemas</p>
  </div>
</template>
<script setup lang="ts">
import { Poema } from "@prisma/client";
import PoemaPortred from "~~/components/PoemaPortred.vue";
const { $isLoggedin } = useNuxtApp();

let count = ref(0);
let localUser = ref(getLocalUser() as { email: string; password: string });
let poemas = ref([] as Poema[]);
let fetching = ref(false);

try {
  fetching.value = true;
  poemas = await useFetch("/api/poemas/getAllPoemas").data;
  fetching.value = false;
} catch (e) {
  alert(e);
}

function getLocalUser() {
  return useState("user").value as { email: string; password: string };
}
</script>
