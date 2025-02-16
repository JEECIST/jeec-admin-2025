<template>
  <div class="wrapper">
    <div class="table">
      <form>
        <div class="search_style">
          <label>
            <img src="../../assets/search.svg">
          </label>
          <input v-model="message" placeholder="Search for a user" />
        </div>
      </form>
      <TheTable :data="datab" :tableHeaders="tablePref" :searchInput="message" :buttons="tableButtons"
        @QrRead="teste_merda">
      </TheTable>
    </div>
  </div>
</template>

<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref } from 'vue';
import Check from '../../assets/check.svg';
// import axios from 'axios';

const datab = ref([
  {
    id: "1",
    prize: "Chamuça",
    student: "Marco Curto"
  },
  {
    id: "2",
    prize: "Iphone 500",
    student: "Marco Curto"
  },
]);

const tablePref = {
  id: "ID",
  prize: "Prize",
  student: "Student",
};

const tableButtons = [{
  name: "Claim",
  eventName: "ClaimPrize",
  icon: Check
}];

function teste_merda() {
  console.log("merda");
};



</script>

<style scoped>
.wrapper {
  display: flex;
  position: relative;
  height: calc(100dvh - var(--header-height));
  padding: 5ch 3ch 3ch 3ch;
  overflow-y: hidden;
}

.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3ch;
  padding-right: 3ch;
}

form {
  display: flex;
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 3ch;
  padding-left: 1ch;
  border-radius: 10px;
}

.search_style {
  display: flex;
  background-color: var(--c-accent);
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 6px;
  width: 60%;
}

.search_style>label>img {
  width: 20px;
  position: relative;
  top: 4px;
  left: 3px;
}

.search_style>input {
  appearance: none;
  background-color: transparent;
  border: 0px;
  color: var(--c-ft-semi-light);
  font-style: inherit;
  font-variant: inherit;
  font-weight: inherit;
  font-stretch: inherit;
  line-height: inherit;
  font-family: inherit;
  font-size-adjust: inherit;
  font-kerning: inherit;
  font-optical-sizing: inherit;
  font-language-override: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  font-size: 1rem;
  height: 100%;
  outline: none;
  padding: 0px 0px 0px 8px;
  width: 100%;
}

.search_style input::placeholder {
  color: var(--c-ft-semi-light);
}
</style>