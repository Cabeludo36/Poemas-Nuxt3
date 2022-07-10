<template>
  <div id="RegisterView">
    <h1>RegisterView</h1>
    <form @submit.prevent="submit()">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" name="password" type="password" placeholder="Password" />
      <input
        v-model="passwordConfirmation"
        type="password"
        placeholder="Password Confirmation"
      />
      <br />
      <button type="submit">Register</button>
    </form>
  </div>
  <span v-if="fetching">Loading...</span>
  <span v-if="error" style="color: red">{{ error }}</span>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["is-loggedin-in-login-register"],
});
let fetching = ref(false);
let error = ref("");
let username = ref("");
let email = ref("");
let password = ref("");
let passwordConfirmation = ref("");

function submit() {
  error.value = "";
  fetching.value = true;

  if (password.value !== passwordConfirmation.value) {
    error.value = "Passwords do not match";
    fetching.value = false;
    return;
  }

  useFetch("/api/users/loginRegister/postCreateUser", {
    method: "POST",
    body: {
      name: username.value,
      email: email.value,
      password: password.value,
    },
  })
    .then(() => {
      fetching.value = false;
      refreshNuxtData();
      useRouter()
        .push("/")
        .then(() => {
          window.location.reload();
        });
    })
    .catch(() => {
      error.value = "Username or email already exists";
      fetching.value = false;
    });
}
</script>
