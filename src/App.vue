<template>
  <div class="app">
    <TheNav class="nav"></TheNav>
    <TheHeader class="header"></TheHeader>
    <main>
      <router-view :key="$route.fullPath"/>
    </main>
  </div>
</template>

<script setup>
import TheNav from './global-components/TheNav.vue';
import TheHeader from './global-components/TheHeader.vue';
import { useUserStore } from './stores/user';

useUserStore().getAccess();

</script>

<style scoped>
.app {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content 1fr;
  grid-template-areas: 
    'nav header'
    'nav main';
}

main {
  height: calc(100dvh - var(--header-height));
  grid-area: main;
}

.nav {
  grid-area: nav;
  position: sticky;
  top: 0;
}

.header {
  grid-area: header;
}
</style>