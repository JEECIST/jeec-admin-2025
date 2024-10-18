<template>
  <div class="app">
    <template v-if="this.$route.name != 'login'">
        <div 
        v-show="stateStore.sideNavOpen"
        class="nav-backdrop" 
        :class="{ open: stateStore.sideNavOpen }"
        @click="stateStore.sideNavOpen = false">
      </div>
      <TheNav class="nav" :class="{ open: stateStore.sideNavOpen }"></TheNav>
      <TheHeader class="header"></TheHeader>
    </template>
    <main>
      <router-view :key="$route.fullPath"/>
    </main>
  </div>
</template>

<script setup>
import TheNav from './global-components/TheNav.vue';
import TheHeader from './global-components/TheHeader.vue';
import { useUserStore } from './stores/user';
import { useStateStore } from './stores/state';

useUserStore().getAccess();
const stateStore = useStateStore();

</script>

<style scoped>
main {
  padding-top: var(--header-height);
  padding-left: var(--sidenav-width);
}

.nav-backdrop {
  display: none;
  z-index: 3;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  padding-left: var(--sidenav-width);
}

@media screen and (max-width: 1000px) {
  main, .header {
    padding-left: 0;
  }

  .nav-backdrop {
    display: inline;
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    background-color: #000000e6;
    opacity: 0;
    transition: transform 0.5s ease-in;
  }

  .nav-backdrop.open {
    opacity: 1;
    transition: opacity 0.5s ease-out
  }

  .nav {
    transform: translateX(-100%);
    transition: transform 0.5s ease-in;
  }

  .nav.open {
    visibility: visible;
    transform: translateX(0);
    transition: transform 0.5s ease-out;
  }
}
</style>