<template>
  <div class="app">
    <TheNav></TheNav>
    <TheHeader></TheHeader>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script setup>
import TheNav from './global-components/TheNav.vue';
import { useUserStore } from './stores/user';

useUserStore().getAccess();

</script>

<style scoped>
.app {
  display: flex;
}

main {
  /* border: 10px solid red; */
}
</style>