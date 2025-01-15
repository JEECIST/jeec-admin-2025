<script setup>
import { ref } from 'vue';
import Form from '../../components/Form.vue'
import AddBillPopup from '../../components/AddBillPopup.vue';
import * as httpAdmin from '@utils/http-admin'

const isModalOpened = ref(false);

const toggleModal = () => {  
    isModalOpened.value = !isModalOpened.value;
};
 async function getBills(){
    const response = await httpAdmin.GET('/bills');
    bills_data.value = await response.data.bills;
    loaded.value=true; 
}
const message = defineModel();

</script>



<template>
<div class="topbar">
    <form>
        <label>
        <img src="../../../../assets/search.svg">
        </label>
        <input v-model="message" placeholder="Search for a bill">
    </form>

    <button class="topbtn" @click="toggleModal">Add Bill</button>
    <button class="topbtn" @click="getBills">Refresh</button>

    <Transition name="fade" appear>
        <AddBillPopup :isOpen="isModalOpened" @modal-close="toggleModal"></AddBillPopup>
    </Transition>

</div>
</template>

<style scoped>
.topbar {
    display: flex;
    flex-direction: row;
    gap: 15px;
}
form {
  display: flex;
  width: 60%;
  background-color: var(--c-accent);
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 10px;
  flex-grow: 0.7;
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
.topbtn {
    background-color: var(--c-select);
    color: white;
    border: none;
    border-radius: 7px;
    align-items: center;
    height: 50px;
    font-weight: 500;
    font-size: small;
    flex-grow: 1;
    width: 10%;
    cursor: pointer;
}
</style>