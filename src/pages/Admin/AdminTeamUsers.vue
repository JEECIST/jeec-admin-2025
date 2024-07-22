<template>
  <div>
    <TheTable :data="datab" :filter="tablePref" :buttons="tableButtons"></TheTable>
  </div>
</template>

<script setup>
import TheTable from '../../global-components/TheTable.vue';


import { ref } from 'vue';

const datab = ref([
  {
    User: "Deco",
    Role: "Webdev",
    Name: "André Santos",
    Day: "123"
  },
  {
    User: "DD",
    Role: "Webdeb",
    Name: "Andrév Santos"
  },
  {
    User: "DD",
    Role: "Webdeb",
    Name: "Andrév Santos"
  },
  {
    User: "DD",
    Role: "Webdeb",
    Name: "Andrév Santos",
  },
]);

const tablePref = ref(["User", "Name"]);

const tableButtons = ref(["Ban", "Hi"]);



</script>