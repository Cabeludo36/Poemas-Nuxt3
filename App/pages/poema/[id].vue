<template>
  <div v-if="fetching">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else id="PoemaView">
    <h1>PoemaView {{ $route.params.id }}</h1>
    <h2>{{ poema.title }}</h2>
    <p>{{ poema.content }}</p>
  </div>
</template>
<script setup lang="ts">
import { Poema } from "@prisma/client";

let fetching = ref(false);
let poema = ref({} as Poema);
let error = ref("");

async function fetchPoema() {
  error.value = "";
  fetching.value = true;
  let id = useRoute().params.id;
  try {
    useFetch(`/api/poemas/getPoema/${id}`, {
      method: "GET",
      params: {
        id: id,
      },
    })
      .then((res) => {
        poema.value = res.data.value as Poema;
        fetching.value = false;
      })
      .catch((err) => {
        error.value = err.message;
        fetching.value = false;
      });
  } catch (e) {
    error.value = "Erro ao carregar poema";
    fetching.value = false;
  }
}

await fetchPoema();
</script>
