<script setup>
// Imports
import { isMobile } from '@utils/utils';
import DesktopWrapper from './desktop/DesktopWrapper.vue';
import MobileWrapper from './mobile/MobileWrapper.vue';



</script>


<!-- ----------------------------------------- TEMPLATE ---------------------------------------- -->
<template>
<div>
  <DesktopWrapper v-if="!isMobile()"></DesktopWrapper>
  <MobileWrapper v-else></MobileWrapper>
</div>
</template>

<!-- ----------------------------------------- STYLING ---------------------------------------- -->
<style scoped>


</style>
