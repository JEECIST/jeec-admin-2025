<template>
  <header :class="{'mobile': isMobile()}">
  <div class="header-wrapper" :class="{'mobile': isMobile()}">
      <div class="left-wrapper">
        <button class="nav-button" @click="stateStore.sideNavOpen = !stateStore.sideNavOpen">
          <img src="/src/assets/nav-menu.svg" alt="Menu">
        </button>
        <h1>{{ title }}</h1>
      </div>
      <div class="user">
        <div class="user-info">
          <p>{{ username }}</p>
          <p>{{ role }}</p>
        </div>
        <button class="logout-button" @click="logout">Log out</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const route = useRoute();
const router = useRouter();
const title = computed(() => route.meta.title);

import { useUserStore } from '../stores/user';
const userStore = useUserStore();
const username = computed(() => userStore.username);
const role = computed(() => userStore.role);

import { useStateStore } from '../stores/state';
const stateStore = useStateStore();

import { isMobile } from '@utils/utils'


function logout(){
  userStore.logoutUser();
  router.go();
}
</script>

<style scoped>
header {
  height: var(--header-height);
  background-color: var(--c-accent);
  width: 100%;
}

header.mobile{
  height: var(--mobile-header-height);
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3ch;
  height: 100%;
  width: 100%;
}

.mobile .header-wrapper {
  padding: 0 2ch;
}

.nav-button {
  display: none;
  visibility: hidden;
}

.user {
  display: flex;
  gap: 2ch;
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

@media screen and (max-width: 1000px) {
  .left-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2ch;
  }

  .nav-button {
    display: inline;
    visibility: visible;
    height: 2rem;
    aspect-ratio: 1;
    border: none;
    background: none;
  }

  .nav-button>img {
    color: var(--c-ft);
  }
}

@media screen and (max-width: 700px) {
  .left-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-basis: 100%;
  }

  .user {
    display: none;
    visibility: hidden;
  }
}
</style>