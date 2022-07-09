<template>
  <div id="LoginView">
    <h1>LoginView</h1>
    <form @submit.prevent="submit()">
      <input v-model="email" type="text" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Senha" />
      <button type="submit">Entrar</button>
    </form>
    <p v-if="fetching">Loading...</p>
    <p v-if="error !== ''" style="color: red">{{ error }}</p>
  </div>
</template>
<script setup lang="ts">
import { User } from "@prisma/client";

definePageMeta({
  middleware: ["is-register-or-login"],
});

let fetching = ref(false);
let email = ref("brepimentel2001@gmail.com");
let password = ref("pimentel");
let error = ref("");

async function submit() {
  error.value = "";
  fetching.value = true;

  if (!(email.value && password.value)) {
    error.value = "Preencha todos os campos";
    fetching.value = false;
    return;
  } else {
    try {
      useFetch("/api/users/loginRegister/postLoginData", {
        method: "POST",
        body: {
          email: email.value,
          password: password.value,
        },
      }).then((res) => {
        useCookie("user").value = JSON.stringify(res.data.value as User);
        useState("user").value = useCookie("user").value;
        fetching.value = false;

        refreshNuxtData();
        useRouter()
          .push("/")
          .then(() => {
            window.location.reload();
          });
      });

      fetching.value = false;
    } catch (e) {
      error.value = "Email ou senha incorretos";
      fetching.value = false;
    }
    fetching.value = false;
  }
}

/* 
let algorithm: RsaOaepParams = {
  name: 'RSA-OAEP',
  label: new TextEncoder().encode('label'),
};

let key:CryptoKeyPair;
createKey().then(k => key = k);

async function encrypt(msg: string) {
  let enc: ArrayBuffer = await crypto.subtle.encrypt(algorithm, key.publicKey, new TextEncoder().encode(msg));
  return new TextDecoder().decode(enc);
}

async function decrypt(msg: string) {
  let dec: ArrayBuffer = await crypto.subtle.decrypt(algorithm, key.privateKey, new TextEncoder().encode(msg));
  return new TextDecoder().decode(dec);
}

async function createKey(): Promise<CryptoKeyPair> {
  let Key: CryptoKeyPair = await crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: {name: 'SHA-256'},
    },
    true,
    ['encrypt', 'decrypt'],
  );
  return Key;
} */
</script>
