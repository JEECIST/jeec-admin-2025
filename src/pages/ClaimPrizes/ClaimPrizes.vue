<template>
  <div class="wrapper">
    <div class="table">
      <form @submit.prevent="search_student(student)">
        <div class="search_style">
          <label>
            <img src="../../assets/search.svg">
          </label>
          <input v-model="student" placeholder="Search for a user" />
        </div>
        <button class="search_button" @click="search_student(student)">Search</button>
      </form>
      <TheTable :data="student_prizes" :tableHeaders="tablePref" :buttons="tableButtons"
         @onClaimPrize="claim_prize">
      </TheTable>
    </div>
  </div>
</template>

<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { onMounted, ref } from 'vue';
import Check from '../../assets/check.svg';
import axios from 'axios';

const student_prizes = ref([]);

const student = ref("");

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
  reward_name: "Prize",
  student_id: "Student",
};

const tableButtons = [{
  name: "Claim",
  eventName: "onClaimPrize",
  icon: Check
}];

function teste(teste) {
  console.log("merda");
  console.log(teste);
};

function claim_prize(prize) {
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL+'/student_rewards/update',{
    external_id: prize.ext_id},
    {auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }}).then(response => {
      student_prizes.value = response.data.rewards
    })
}

function search_student(student){
  console.log(student)
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL+'/student_rewards', 
    {search: student},
    {auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }}).then(response => {
      console.log(response.data)
      student_prizes.value = response.data.rewards/*TODO OBJETO */
      console.log(student_prizes)
    });
}

onMounted(() => {
  console.log("Claim Prizes")
});



</script>

<style scoped>
.search_button{
  font-size: 1rem;
  font-weight: 600;
  border: none;
  background-color: var(--c-select);
  border-radius: 10px;
  color: var(--c-bg-light);
  cursor: pointer;
  padding: 0.5ch 3ch;
  height: 100%;
}

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