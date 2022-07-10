<template>
  <div id="CreatePoemaView">
    <h1>CreatePoemaView</h1>
    <form @submit.prevent="submit()">
      <input v-model="title" type="text" placeholder="Título" />
      <input v-model="content" type="text" placeholder="Conteúdo" />
      <button type="submit">Criar</button>
    </form>
    <p v-if="fetching">Loading...</p>
    <p v-if="error !== ''" style="color: red">{{ error }}</p>
  </div>
</template>
<script setup lang="ts">
import { Poema, User } from "@prisma/client";
definePageMeta({
  middleware: ["need-login"],
});

let fetching = ref(false);
let title = ref("");
let content = ref("");
let error = ref("");

async function submit() {
  error.value = "";
  fetching.value = true;

  if (!(title.value && content.value)) {
    error.value = "Preencha todos os campos";
    fetching.value = false;
    return;
  }

  let user = useState("user").value as User;
  try {
    await useFetch("/api/poemas/postCreatePoema", {
      method: "POST",
      body: {
        title: title.value,
        content: content.value,
        userId: user.userId,
      } as Poema,
    });
    fetching.value = false;

    refreshNuxtData();
    useRouter()
      .push("/")
      .then(() => {
        window.location.reload();
      });
  } catch (e) {
    error.value = "Erro ao criar poema";
    fetching.value = false;
  }
  fetching.value = false;
}
</script>
