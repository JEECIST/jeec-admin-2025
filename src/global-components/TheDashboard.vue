<template>
  <div>
    <router-link v-for="route in routes" :to="({ name: route.name })">{{ route.meta.title }}</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const routes = computed(() => {
  let arr = [];

  route.meta.children.forEach(child => {
    arr.push(router.getRoutes().find(x => x.name === child))
  });

  return arr
})

console.log(route)
</script>