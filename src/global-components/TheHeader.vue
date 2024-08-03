<template>
  <header>
    <h1>{{ title }}</h1>
    <div class="user">
      <div class="user-info">
        <p>{{ name }}</p>
        <p>{{ role }}</p>
      </div>
      <button>Log out</button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const title = computed(() => route.meta.title );

import { useUserStore } from '../stores/user';
const userStore = useUserStore();
const name = computed(() => userStore.name);
const role = computed(() => userStore.role);
</script>

<style scoped>
header {
  height: var(--header-height);
  background-color: var(--c-accent);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3ch;
  position: sticky;
  top: 0;
}

.user {
  display: flex;
  gap: 2ch;
}

.user > button {
  font-size: 1rem;
  font-weight: 600;
  border: none;
  background-color: var(--c-select);
  border-radius: 10px;
  color: var(--c-bg-light);
  cursor: pointer;
  padding: 0.5ch 3ch;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
}

.user-info > p:first-child {
  font-size: 1.3rem;
}
</style>