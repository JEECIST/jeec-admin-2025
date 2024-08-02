<template>
  <aside class="sidenav">
    <a class="logo" @click="router.push({name: 'dashboard'})">
      <img src="../assets/brain.svg" alt="brain logo">
    </a>
    <nav>
      <ul>
        <li>
          <router-link class="nav-link" activeClass="selected" :to="({ name: route.name })">
            <img :src="'/src/assets/pages/' + route.name + '.svg'" aria-hidden="true"><span>{{ route.meta.title }}</span>
          </router-link>
        </li>
        <template v-for="route in routes">
          <li v-if="userStore.accessList[route.name]">
            <router-link class="nav-link" activeClass="selected" :to="({ name: route.name })">
              <img :src="'/src/assets/pages/' + route.name + '.svg'" aria-hidden="true"><span>{{ route.meta.title }}</span>
            </router-link>
          </li>
        </template>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const router = useRouter();
const route = router.getRoutes().find(rte => rte.name === "dashboard");

const routes = computed(() => {
  let arr = [];

  route.meta.children.forEach(child => {
    arr.push(router.getRoutes().find(x => x.name === child))
  });

  return arr
})
</script>

<style scoped>
.sidenav {
  height: 100dvh;
  background-color: #152259;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.logo {
  border: none;
  background: none;
  cursor: pointer;
  width: 110px;
  aspect-ratio: 1;
  margin: 2rem 0;
}

.logo > img {
  width: 100%;
  height: 100%;
}

nav {
  width: 100%;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0 3ch;
}

nav > ul {
  list-style-type: none;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 1ch;
  text-decoration: none;
  color: var(--c-bg-light);
  padding: 0.6rem 2ch;
  border-radius: 4px;
  margin-bottom: 0.2rem;
}

.nav-link.selected {
  background-color: var(--c-select);
}

.nav-link:hover {
  background-color: var(--c-select);
}

.nav-link > img {
  height: 1.3em;
  aspect-ratio: 1;
}

@media screen and (max-width: 1000px) {
  
}
</style>