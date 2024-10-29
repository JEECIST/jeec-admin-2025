<template>
  <div>
    <h1>Team Members</h1>
    <p>Team ID: {{ teamId }}</p>
    <!-- Conteúdo da página Team Members -->
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const teamId = route.params.teamId;
</script>

<style scoped>
/* Estilos para a página Team Members */
</style>