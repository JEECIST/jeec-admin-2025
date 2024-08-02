<template>
  <div>
    <template v-for="route in routes">
      <router-link v-if="isAccessible(route)" :to="({ name: route.name })">{{ route.meta.title }}</router-link>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const Route = useRoute();
const Router = useRouter();

const routes = computed(() => {
  let arr = [];

  Route.meta.children.forEach(child => {
    arr.push(Router.getRoutes().find(rte => rte.name === child))
  });

  return arr
})

function isAccessible(route) {
  const rootName = Router.getRoutes().find(rte => rte.path === ('/' + route.path.split('/')[1])).name
  return userStore.accessList[rootName]
}
</script>