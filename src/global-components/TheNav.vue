<template>
  <aside class="sidenav">
    <a class="logo" @click="Router.push({name: 'dashboard'})">
      <img src="../assets/brain.svg" alt="brain logo">
    </a>
    <nav>
      <ul>
        <li>
          <button class="nav-link" @click="Router.go(-1)"><img src="/src/assets/back.svg" aria-hidden="true"><span>Back</span></button>
          <router-link class="nav-link" activeClass="selected" :to="({ name: dashboardRoute.name })">
            <img :src="'/src/assets/pages/' + dashboardRoute.name + '.svg'" aria-hidden="true"><span>{{ dashboardRoute.meta.title }}</span>
          </router-link>
        </li>
        <template v-for="route in routes">
          <li v-if="userStore.accessList[route.name]">
            <router-link class="nav-link" activeClass="selected" :to="({ name: route.name })">
              <img :src="'/src/assets/pages/' + route.name + '.svg'" aria-hidden="true"><span>{{ route.meta.title }}</span>
            </router-link>
            <ul class="child-routes" v-if="parentRoute.name === route.name && parentRoute.meta.children !== false">
              <li v-for="child in childRoutes">
                <router-link class="nav-link" activeClass="selected" :to="({ name: child.name })">{{ child.meta.title }}</router-link>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const Router = useRouter();
const Route = useRoute();
const dashboardRoute = Router.getRoutes().find(rte => rte.name === "dashboard");

const routes = computed(() => {
  let arr = [];

  dashboardRoute.meta.children.forEach(child => {
    arr.push(Router.getRoutes().find(x => x.name === child))
  });

  return arr
})

const parentRoute = computed(() => {
  return Router.getRoutes().find(rte => rte.path === ('/' + Route.path.split('/')[1]))
})

const childRoutes = computed(() => {
  let arr = [];

  parentRoute.value.meta.children.forEach(child => {
    arr.push(Router.getRoutes().find(x => x.name === child))
  });

  return arr
})
</script>

<style scoped>
.sidenav {
  height: 100dvh;
  background-color: #152259;
  width: var(--sidenav-width);
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

.sidenav > nav {
  width: 100%;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0 3ch;
  overflow: auto;
}

.sidenav ul {
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
  background: none;
  border: none;
  width: 100%;
  font-size: 1em;
  font-family: var(--font-family);
  font-weight: 500;
  cursor: pointer;
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

.child-routes {
  padding-left: 3ch;
}

.child-routes .nav-link {
  font-size: 0.85em;
  padding: 0.4rem 2ch;
}
</style>