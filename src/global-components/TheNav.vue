<template>
  <aside class="sidenav">
    <button class="logo" @click="router.push({name: 'dashboard'})">
      <img src="../assets/brain.svg" alt="brain logo">
    </button>
    <nav>
      <ul>
        <template v-for="(value, key) in accessList">
          <li v-if="value">
            <router-link class="nav-link" :to="key">{{ key }}</router-link>
          </li>
        </template>
        
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import router from '../router';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();

const accessList = computed(() => userStore.accessList);

</script>

<style scoped>
.sidenav {
  height: 100dvh;
  background-color: #152259;
  width: clamp(250px, 20dvw, 350px);
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
  margin-top: 2rem;
}

.logo > img {
  width: 100%;
  height: 100%;
}
</style>