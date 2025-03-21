<script setup>

import { ref, onMounted } from 'vue';
import dropdown from '../../global-components/dropdown.vue';
import axios from "axios"

const dailyPrizes = ref([]); 
const weeklyPrizes = ref([]); 
const squadPrizes = ref([]); 
const individualPrizes = ref([]); 
const cvPrizes = ref([]);

const rewardsArray = ref({
    Daily: [],
    Weekly: [],
    Squad: [],
    Individual: [],
    Cv: []
});

const selectedValues = ref({
    Daily: [],
    Weekly: [],
    Squad: [],
    Individual: [],
    Cv: []
});

const warning = ref({
    Daily: [],
    Weekly: [],
    Squad: [],
    Individual: [],
    Cv: []
});

const getPrizeArray = (type) => {
    switch (type) {
        case 'Daily': return dailyPrizes.value;
        case 'Weekly': return weeklyPrizes.value;
        case 'Squad': return squadPrizes.value;
        case 'Individual': return individualPrizes.value;
        case 'Cv': return cvPrizes.value;
        default: return [];
    }
};


function getPrizesSpecial() {
    axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/get-prizes-special', {
        auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
    }).then(response => {
        const rewardsList = response.data; 

        // Group prizes by type
        const groupedPrizes = {
            Daily: [],
            Weekly: [],
            Squad: [],
            Individual: [],
            Cv: []
        };

        rewardsList.forEach(prize => {
            if (groupedPrizes[prize.type]) {
                groupedPrizes[prize.type].push(prize.name);
            }
        });

        rewardsArray.value = groupedPrizes;

        // Create five tables (one per type)
        dailyPrizes.value = Array.from({ length: 5 }, (_, index) => ({
            date: `${19 + index}/02`, reward: null, winner: null
        }));
        weeklyPrizes.value = Array.from({ length: 5 }, (_, index) => ({
            date: `${19 + index}/02`, reward: null, winner: null
        }));
        squadPrizes.value = Array.from({ length: 5 }, (_, index) => ({
            date: `${19 + index}/02`, reward: null, winner: null
        }));
        individualPrizes.value = Array.from({ length: 5 }, (_, index) => ({
            date: `${19 + index}/02`, reward: null, winner: null
        }));
        cvPrizes.value = Array.from({ length: 5 }, (_, index) => ({
            date: `${19 + index}/02`, reward: null, winner: null
        }));

        console.log("Updated Prizes Data:", rewardsArray.value);
    }).catch(error => {
        console.error("Error fetching prizes:", error);
    });
}

const handleButtonClick = (type, index) => {
    if (!selectedValues.value[type][index]) {
        warning.value[type][index] = true;
        return;
    }
    warning.value[type][index] = false;
    alert(`Winner generated with reward: ${selectedValues.value[type][index]}`);
    //Set claim prize aqui
};

function setClaimedPrize(prizeName){
  // axios para dar set a true
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/claim-prize', {
    prizeName: prizeName,
    claimed: true,
  }, {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  }).then((response) => {
    if (!response.data.error) {
      console.log('prize details fetched', response.data);
      selectedRow.value.logo = import.meta.env.VITE_APP_JEEC_BRAIN_URL.replace('/admin', '') + response.data.image; // Update the logo in the selectedRow
      console.log(selectedRow.value.logo);
    } else {
      console.log('Error fetching prize details', response.data.error);
    }
  }).catch((error) => {
    console.log(error);
  });
}

onMounted(() => {
  getPrizesSpecial();
});


</script>

<template>
<div id="rewards">
  
  <div class="desktop">
    <div class="table-container">
      <div class="section">
        <h2>Special Prizes</h2>

        <div v-for="(prizes, type) in rewardsArray" :key="type">
          <h3>{{ type }} Prizes</h3>
          <table class="styled-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Reward</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(reward, index) in getPrizeArray(type)" :key="index">
                <td>{{ reward.date }}</td>
                <td>
                  <dropdown  
                    :options="rewardsArray[type]"
                    v-model="selectedValues[type][index]"
                  />
                  <p>Selected Option: {{ selectedValues[type][index] || "None selected" }}</p>
                </td>
                <td>
                  <div v-if="reward.winner">{{ reward.winner }}</div>
                  <div v-else>
                    <button 
                      class="genButton" 
                      :disabled="!selectedValues[type][index]"
                      @click="handleButtonClick(type, index)"
                    >
                      Let's Roll it
                    </button>
                    <p v-if="warning[type][index]" class="warning">⚠ Please select a prize first!</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="section">
        <h2>Weekly Rewards</h2>
        <table class="styled-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Reward</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(reward, index) in weeklyPrizes" :key="index">
              <td>{{ reward.date }}</td>
              <td>
                <!-- Dropdown for selecting reward -->
                <dropdown  
                  :options="rewardsArray"
                  v-model="selectedValues[index]"
                />
                <p>Selected Option: {{ selectedValues[index] || "None selected" }}</p>
              </td>
              <td>
                <div v-if="reward.winner">{{ reward.winner }}</div>
                <div v-else>
                  <!-- Disable button if no selection is made -->
                  <button 
                    class="genButton" 
                    :disabled="!selectedValues[index]"
                    @click="handleButtonClick(index)"
                  >
                    Let's Roll it
                  </button>
                  <!-- Warning message -->
                  <p v-if="warning[index]" class="warning">Please select a prize first!</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>

</div>


</template>


<style scoped>

.warning {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.genButton:disabled {
  background-color: grey;
  cursor: not-allowed;
}

.genButton {
    background-color: var(--c-select);
    color: white;
    border: none;
    border-radius: 7px;
    align-items: center;
    height: 45px;
    font-weight: 500;
    font-size: small;
    flex-grow: 1;
    width: 30%;
    cursor: pointer;
}

td {
  text-align: center;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  font-size: 0.9rem;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 8px 12px;
}

.styled-table th {
  background-color: #f9f9f9;
  font-weight: bold;
  text-align: left;
  border-bottom: 2px solid #ddd;
}

.styled-table tbody tr {
  border-bottom: none;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #eaf4fc; /* Light blue */
}

.styled-table tbody tr:hover {
  background-color: #d6eaff; /* Slightly darker blue for hover */
}

.styled-table td select {
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

th {
  text-align: center !important;
}

thead {
  background-color: white;
}

.desktop{
  width: 90%;
}

#rewards > h2 {
  font-weight: bold;
  font-size: 2rem;
}

.section > h2 {
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  padding-top: 5%;
}

#rewards {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-top: 10%;
}

.mobile-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  height: calc(100dvh - var(--header-height));
  padding: 3ch 1ch 1ch 1ch;
  margin-right: -7vw;
  overflow-x: hidden;
}

.wrapper {
  display: flex;
  position: relative;
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

.mobile-topbar > form {
  display: flex;
  width: 21%;
  background-color: var(--c-accent);
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 10px;
  flex-grow: 0.7;
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

.right-popup-placeholder-mobile {
  width: 94.5vw;
  height: 93vh;
  border-radius: 30px;
  background-color: var(--c-accent);
  margin-right: -0vw;

}

.items {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 7vh;
}

.prize-photo {
    height: 165px;
    width: 165px;
    background-color: var(--c-select);
    border-radius: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    color: white;

}

.text1 {
    color: black;
    font-size: x-large;
}

.text2 {
    color: var(--c-ft-semi-light);
}

.title {
    font-size: larger;
    font-weight: 550;
}

.row {
    display: flex;
    flex-direction: row;
    gap: 3.5vw;
}

.col {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

#info {
    margin-left: -2.5vw;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 1.3vh;
}

.btns-row {
    display: flex;
    flex-direction: row;
    gap: 15px;
}

.btn {
    width: 36px;
    height: 36px;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

p {
    color: black;
    font-weight: 500;
    font-size: small;
}

select {
    border-style: solid;
    border-width: thin;
    border-radius: 7px;
    height: 50px;
    padding: 12px;
    opacity: 60%;
    border-color: #8a8a8a;
    background-color: white;
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

.topbar, .mobile-topbar {
    display: flex;
    flex-direction: row;
    gap: 15px;
}

.imsosickofdivs {
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
    width: 10%;
}

.imsosickofdivs > label {
  position: absolute;
  bottom: 100%;
}

button {
  outline: none;
  border: none;
  cursor: pointer;
}

.popup-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.425);
}

.description-mobile {
  display: flex;
  justify-content: left;
  background-color: white;
  width: 94.5vw;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 46.5%;
  translate: -50% -50%;
  border-radius: 15px;
}

.description-mobile > p {
   display: flex;
   align-items: center;
   vertical-align: center;
   justify-content: center;
   padding: 3.5vw;
   font-weight: 350;
   color: (--c-ft-semi-light);
}

.description {
  display: flex;
  justify-content: center;
  background-color: white;
  width: 30vw;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border-radius: 15px;
}

.description > p {
   display: flex;
   align-items: center;
   vertical-align: center;
   justify-content: center;
   padding: 3.5vw;
   font-weight: 350;
   color: (--c-ft-semi-light);
}

.closedescription {
  background-color: #152259;
  color: white;
  border-radius: 5px;
  border: none;
  margin-right: 0.75vw;
  margin-top: 2%;
  margin-bottom: 2%;
  display: flex;
  margin-left: auto;
  width: 8.4vw;
  height: 3.5vh;
  align-items: center;
  justify-content: center;
  gap: 10vh;
  cursor: pointer;
  padding: 0.5vw;
}

.mobile-closedescription {
  background-color: #152259;
  color: white;
  border-radius: 5px;
  border: none;
  margin-right: 3vw;
  margin-top: 2%;
  margin-bottom: 2%;
  display: flex;
  margin-left: auto;
  width: 90vw;
  height: 3.5vh;
  align-items: center;
  justify-content: center;
  gap: 10vh;
  cursor: pointer;
  padding: 0.5vw;
}

</style>
