<template>
  <div class="wrapper">
    <div class="table">
      <form>
        <label>
          <img src="../../assets/search.svg">
        </label>
        <input v-model="message" placeholder="Search for a user">
      </form>
      <TheTable
        :data="datab"
        :toShow="tablePref"
        :searchInput="message"
        :buttons="tableButtons" 
        @onRowSelect="selectCallback"
        @onBan="banCallback"
        @onHiEvent="console.log('hi')"
      ></TheTable>
    </div>
    <div class="right-popup-placeholder"></div>
  </div>
</template>

<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref } from 'vue';

const message = ref();

function banCallback(user) {
  console.log("banned " + user.name + "..... nah");
}

function selectCallback(row) {
  console.log(row)
}

const datab = [
  {
    user: "Deco",
    role: "Webdev",
    name: "André Santos the Feeble",
    day: "123"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos",
  },
  {
    user: "Deco",
    role: "Webdev",
    name: "André Santos the Feeble",
    day: "123"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos",
  },
  {
    user: "Deco",
    role: "Webdev",
    name: "André Santos the Feeble",
    day: "123"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos",
  },
  {
    user: "Deco",
    role: "Webdev",
    name: "André Santos the Feeble",
    day: "123"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos",
  },
  {
    user: "Deco",
    role: "Webdev",
    name: "André Santos the Feeble",
    day: "123"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos",
  },
];

const tablePref = {
  user: "User",
  name: "First Name"
};

const tableButtons = [
  {
    name: "Ban",
    icon: false,
    eventName: "onBan",
  },
  {
    name: "Hi",
    icon: false,
    eventName: "onHiEvent",
  }
];

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
  background-color: var(--c-accent);
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 10px;
}

form > label > img {
  width: 20px;
  position: relative;
  top: 4px;
  left: 3px;
}

form > input {
  appearance: none;
  background: transparent;
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

form > input::placeholder {
  color: var(--c-ft-semi-light)
}

.right-popup-placeholder {
  position: sticky;
  top: 0;
  right: 0;
  width: 500px;
  border-radius: 30px;
  background-color: var(--c-accent);
  height: 100%;
}
</style>