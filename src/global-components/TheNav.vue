<template>
  <aside class="sidenav">
    <a class="logo" @click="Router.push({ name: 'dashboard' })">
      <img src="../assets/brain.svg" alt="brain logo">
    </a>
    <nav>
      <ul>
        <li>
          <button class="nav-link" @click="backCallback">
            <img src="/src/assets/back.svg" aria-hidden="true"> <span>Back</span>
          </button>
        </li>
        <li>
          <router-link class="nav-link" activeClass="selected" @click="stateStore.sideNavOpen = false"
            :to="({ name: dashboardRoute.name })">
            <img :src="'/assets/pages/' + dashboardRoute.name + '.svg'" aria-hidden="true"><span>{{
              dashboardRoute.meta.title }}</span>
          </router-link>
        </li>

        <template v-for="route in routes">
          <li v-if="userStore.accessList[route.name]">
            <router-link class="nav-link" activeClass="selected" @click="stateStore.sideNavOpen = false"
              :to="({ name: route.name })">
              <img :src="'src/assets/pages/' + route.name + '.svg'" aria-hidden="true">
              <span>{{ route.meta.title}}</span>
            </router-link>
            <ul class="child-routes" v-if="parentRoute.name === route.name && parentRoute.meta.children !== false">
              <li v-for="child in childRoutes">
                <router-link class="nav-link" activeClass="selected" :to="({ name: child.name })">{{ child.meta.title
                }}</router-link>
              </li>
            </ul>
          </li>
        </template>
      </ul>

      <div class="user">
        <div class="user-info">
          <p>{{ username }}</p>
          <p>{{ role }}</p>
        </div>
        <button class="logout-button" @click="logout()">Log out</button>
      </div>

    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '../stores/user';
import { useStateStore } from '../stores/state';
import router from '../router';

const stateStore = useStateStore();
const Router = useRouter();
const Route = useRoute();
const dashboardRoute = Router.getRoutes().find(rte => rte.name === "dashboard");
const userStore = useUserStore();
const username = computed(() => userStore.username);
const role = computed(() => userStore.role);

const routes = computed(() => {
  let arr = [];

  dashboardRoute.meta.children.forEach(child => {
    arr.push(Router.getRoutes().find(x => x.name === child))
  });

  return arr
})

const parentRoute = computed(() => {
  if (Route.path === "/")
    return {}
  else
    return Router.getRoutes().find(rte => rte.path === ('/' + Route.path.split('/')[1]))
})

const childRoutes = computed(() => {
  let arr = [];

  parentRoute.value.meta.children.forEach(child => {
    arr.push(Router.getRoutes().find(x => x.name === child))
  });

  return arr
})

function logout(){
  userStore.logoutUser();
  router.go();
}

function backCallback() {
  if (window.matchMedia("screen and (max-width: 700px)").matches) {
    stateStore.sideNavOpen = false;
  } else {
    router.go(-1);
  }
}
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

.logo>img {
  width: 100%;
  height: 100%;
}

.sidenav>nav {
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

.nav-link>img {
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

.user {
  display: none;
  visibility: hidden;
  position: absolute;
}

.user>button {
  font-size: 1rem;
  font-weight: 600;
  border: none;
  background-color: var(--c-select);
  border-radius: 10px;
  color: var(--c-bg-light);
  cursor: pointer;
  padding: 0.5ch 3ch;
}

.mobile .user>button {
  font-size: 0.75rem;
  font-weight: 400;
  border: none;
  background-color: var(--c-select);
  border-radius: 10px;
  color: var(--c-bg-light);
  cursor: pointer;
  padding: 0.25ch 2ch;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
}

.user-info>p:first-child {
  font-size: 1.3rem;
}

.mobile .user-info>p:first-child {
  font-size: 0.7rem;
}

@media screen and (max-width: 700px) {
  .user {
    padding: 2rem 0;
    position: relative;
    display: flex;
    visibility: visible;
    flex-direction: column;
  }

  .user-info>p:last-of-type {
    font-weight: 300;
  }

  .user>button {
    margin-top: 1rem;
    padding: .6rem;
  }
}

@media screen and (max-width: 460px) {
  .sidenav {
    width: 100%;
  }
}
</style>