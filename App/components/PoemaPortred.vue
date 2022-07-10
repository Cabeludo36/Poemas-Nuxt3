<template>
  <div id="PoemaPortred">
    <h1>{{ poema.title }}</h1>
    <p>{{ poema.content }}</p>
  </div>
</template>
<script setup lang="ts">
import { Poema } from ".prisma/client";
const props = defineProps({
  poema: {
    type: Object,
    required: true,
  },
});

const poema = ref(props.poema as Poema);
</script>
