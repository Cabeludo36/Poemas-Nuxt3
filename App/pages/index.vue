<template>
  <div v-if="fetching">
    <p>Loading...</p>
  </div>
  <div v-else id="IndexView">
    <h1>Index</h1>
    <div>{{ count }} <button @click="count++">+</button></div>
    <p v-if="$isLoggedin()">localUser: {{ localUser.email }}</p>

    <div v-if="otherUsers != null && otherUsers.length != 0">
      <p>OtherUsers:</p>
      <ul>
        <li v-for="user in otherUsers">
          {{ user.name }}
        </li>
      </ul>
    </div>
    <p v-else>No other users</p>
  </div>
</template>
<script setup lang="ts">
//#region imports
const { $isLoggedin } = useNuxtApp();
//#endregion

//#region atributos
let count = ref(0);
let localUser = ref(getLocalUser() as { email: string; password: string });
let otherUsers = ref([] as { name: string; userId: number }[]);
let fetching = ref(false);
//#endregion

//#region setup
try {
  fetching.value = true;
  otherUsers = await useFetch("/api/users/getAllUserNames").data;
  fetching.value = false;
} catch (e) {
  alert(e);
}
//#endregion

//#region metodos
function getLocalUser() {
  return useState("user").value as { email: string; password: string };
}
//#endregion
</script>
