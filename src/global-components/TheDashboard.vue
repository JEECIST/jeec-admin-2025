<template>
  <nav class="dashnav">
    <template v-for="route in routes">
      <router-link v-if="isAccessible(route)" :to="({ name: route.name })">{{ route.meta.title }}</router-link>
    </template>
  </nav>
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
});

function isAccessible(route) {
  const parentRoute = Router.getRoutes().find(rte => rte.path === ('/' + route.path.split('/')[1]));
  return userStore.accessList[parentRoute.name]
}
</script>

<style scoped>
.dashnav {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 3rem 5rem;
  font-size: 1.8rem;
  font-weight: 600;
  gap: 1.5rem;
}

.dashnav > a {
  flex-basis: calc(50% - 0.75rem);
  flex-grow: 1;
  min-width: fit-content;
  text-decoration: none;
  color: var(--c-ft);
  background-color: var(--c-accent);
  padding: 2rem 1ch;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.dashnav > a:hover {
  filter: brightness(0.9);
}

</style>