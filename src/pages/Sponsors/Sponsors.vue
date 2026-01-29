<template>
  <div class="backdrop" v-if="cardDisplaying"></div>
  <div class="sponsors-container">
    <div class="sponsors-table" :class="{ 'hide-on-mobile': cardDisplaying }">
      <div class="header">
        <div class="search-container">
          <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
          </svg>
          <input 
            placeholder="Search for a sponsor" 
            class="search-bar" 
            v-model="searchQuery"
          />
        </div>
      <div class="event-filter">  
        <p>Event</p>
        <select class="selection-box" v-model="eventselected" @change="filterByEvent">
          <option value="all">All</option>
          <option v-for="event in events" :key="event.id" :value="event.name">{{ event.name }}</option>
        </select>   
      </div>
      <button class="button-add-sponsor" @click="toogleadd">Add Sponsor</button>
      <router-link to="/sponsors/tiers" class="button-sponsor-tiers" style="text-decoration: none;">Sponsor Tiers
        <svg xmlns="http://www.w3.org/2000/svg" class="chevron-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
      </div>
      <div class="table-container">
        <TheTable 
          :data="tableData"
          :tableHeaders="headers"
          :buttons="tableButtons"
          :searchInput="searchQuery"
          :isSelectable="true"
          @onRowSelect="handleRowSelect"
          @notFound="handleNosponsors"
          class="table"
        />
      </div>
      <div class="nosponsors" v-if=noSponsors>No Sponsors Found</div>
    </div>

    <div v-if="selectedRow" class="sponsor-card">
      <button @click="unselectRow" class="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="sponsor-card-header">
        <h1 class="card-tier">{{ selectedRow.tier_name }}</h1>
        <img v-if="selectedRow.logo" class='sponsor-logo' :src="selectedRow.logo" alt="sponsor logo" />
        <div v-else class='sponsor-no-logo'>No logo</div>
        <div class="card-title">
          <p class="card-name">{{ selectedRow.name }}</p>
          <p class="card-subtitle">Sponsor</p>
        </div>
        <div class="card-buttons">
          <button @click="toogleedit()" class="icon-button">
            <img :src="pencilIcon" alt="edit" class="icon" />
          </button>
          <button @click="deleteRow(selectedRow)" class="icon-button">
            <img :src="trashIcon" alt="delete" class="icon" />
          </button>
        </div>
        
      </div>
      <div class="sponsor-card-body">
        <div class="card-paragraph">
          <h1>JEEC Responsible</h1>
          <p>{{ selectedRow.jeec_responsible }}</p>
        </div>
        <div class="card-paragraph">
          <h1>Description</h1>
          <p>{{ selectedRow.description }}</p>
        </div>
        <div class="card-paragraph">
          <h1>Event</h1>
          <p>{{ selectedRow.event_name }}</p>
        </div>
        
      </div>
    </div>

    <AddSponsor v-if="isaddsponsor" @close="toogleadd" :events="events" :tiers="tiers" :isOpen="isaddsponsor"/>
    <EditSponsor v-if="iseditsponsor" @close="toogleedit" :sponsorData="selectedRow" :events="events" :tiers="tiers" :isOpen="iseditsponsor"/>
   
  </div>
  
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import TheTable from '../../global-components/TheTable.vue';
import AddSponsor from './AddSponsor.vue';
import EditSponsor from './EditSponsor.vue';
import pencilIcon from '../../assets/pencil.svg'
import trashIcon from '../../assets/trash.svg'

// Example data to be displayed in the table
const tableData = ref([])
const originalTableData = ref([])

const events = ref([])
const tiers = ref([])

const fetchData = () => {
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/sponsors_vue',{auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }}).then((response)=>{
      events.value = response.data.events


      tiers.value = response.data.tiers


      originalTableData.value = response.data.sponsors
      tableData.value = response.data.sponsors


      if (response.data.error == 'No sponsors found'){
        noSponsors.value = true
      }
    }).catch((error)=>{
      console.log(error)
    })
}

onMounted(fetchData)

// Headers to map the data keys to table headers
const headers = {
  id: 'ID',
  name: 'Name',
  tier_name: 'Tier',
  jeec_responsible: 'JEEC Responsible',
};

// Function to filter the table data by event
function filterByEvent() {
  const selectedEvent = eventselected.value;
  if (selectedEvent == 'all') {
    unselectRow();
    tableData.value =  originalTableData.value
  } else {
    unselectRow();
    tableData.value =  originalTableData.value.filter(sponsor => sponsor.event_name === selectedEvent);

  }
}

function fetchSponsorDetails(){

  const sponsorName = selectedRow.value.name;
  const eventName = selectedRow.value.event_name;

  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/get_image_sponsor', {
    sponsor_name: sponsorName,
    event_name: eventName
  }, {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  }).then((response) => {
    if (!response.data.error) {

      selectedRow.value.logo = import.meta.env.VITE_APP_JEEC_BRAIN_URL.replace('/admin', '') + response.data.image; // Update the logo in the selectedRow

    } else {
      console.log('Error fetching sponsor details', response.data.error);
    }
  }).catch((error) => {
    console.log(error);
  });
}

const tableButtons = '';
const noSponsors = ref(false);
const cardDisplaying = ref(false);

// Search query for filtering the rows
const searchQuery = ref('');
const selectedRow = ref(null);

// Watch for changes in selectedRow and fetch sponsor details
watch(selectedRow, (newValue, oldValue) => {
  if (newValue) {
    fetchSponsorDetails();
  }
});

// Event handler for row selection
function handleRowSelect(row) {
  cardDisplaying.value = true;
  selectedRow.value = row;
}

function handleNosponsors(isEmpty){

  noSponsors.value = isEmpty;
}

function unselectRow() {
  cardDisplaying.value = false;
  selectedRow.value = null;
}

function deleteRow(row) {
  if (confirm('Are you sure you want to delete this sponsor?')) {
    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/delete_sponsor', {
      sponsor_id: selectedRow.value.id,
      event_name: selectedRow.value.event_name
    }, {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
    }).then((response) => {

      unselectRow();
      fetchData();
      filterByEvent();
    }).catch((error) => {
      console.log(error);
    });
  }
}


const isaddsponsor= ref(false);
const iseditsponsor= ref(false);

function toogleadd() {
  isaddsponsor.value = !isaddsponsor.value;
  if (!isaddsponsor.value) {
    fetchData();
    filterByEvent();
  }
}

function toogleedit() {
  iseditsponsor.value = !iseditsponsor.value;
  if (!iseditsponsor.value) {
    fetchData();
    filterByEvent();
  }
}


const eventselected = ref('');

</script>

<style scoped>

.sponsors-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 15px 40px 15px 40px;
  gap: 15px;
}

.sponsor-card{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  padding: 10px 10px 10px 10px;
  align-self: flex-start;
  height: fit-content;
  max-height: calc(75vh - 14px);
  width: 20%;
  min-width: 250px;
  background-color: var(--c-accent);
  border-radius: 10px;
  gap: 10px;
  z-index: 3;
  margin-top: 13px;
}

.sponsor-card-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  gap:10px;
}

.card-tier{
  text-transform: uppercase;
  font-size: 1.6em;
}

.sponsor-logo {
  width: 18vh;
  height: 18vh;
  min-height: 70px;
  min-width: 70px;
  max-width: 150px;
  max-height: 150px;
  object-fit: scale-down; /* Ensure the whole image is visible */
}

.sponsor-no-logo {
  width: 18vh;
  height: 18vh;
  min-height:100px;
  min-width: 100px;
  max-width: 150px;
  max-height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #888;
  font-size: 14px;
  text-align: center;
}

.card-title{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:fit-content;
}

.card-name{
  font-weight: 800;
  color: var(--c-ft-dark);
  font-size:1.3em;
}

.card-subtitle{
  color: var(--c-ft-semi-light);
  font-size:1em;
}

.card-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 30px;
  padding: 1px 1px;
  gap: 10px;
}

.sponsor-card-body{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 10px 10px 10px 10px;
  gap: 10px;
  overflow: hidden;

}

.card-paragraph{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap:5px;
}
.sponsor-card-body h1{
  color: var(--c-ft-dark);
  font-size: 0.9em;
  font-weight: 700;
}
.sponsor-card-body p{
  font-size: 0.8em;
  color: var(--c-ft-semi-light);
}

.sponsors-table {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 75vh;
  width: 80%;
  min-width: 300px;
  overflow: hidden;
  flex-grow: 1;
  gap: 4px;
}

.table-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;
}

.table{
  width: 100%;
  height: 100%;
  font-size: 0.8em;
}

.nosponsors{
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  color: var(--c-tf);
  background-color: var(--c-accent);
  font-weight: 600; 
}

.header {
  top:0;
  position: sticky;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: end;
  gap: 7px;
  color: #8A8A8A;
}

.search-container {
  display: flex;
  align-content: center;
  position: relative;
  min-height: 36px;
  width: 30px;
  background-color: #EBF6FF; 
  border-radius: 4px; 
  flex-grow: 1;
  padding: 1px 1px 1px 1px;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  color: #8A8A8A;
}

.search-bar {
  padding: 0.5px 1px 0.5px 24px;
  border: none;
  border-radius: 4px;
  outline-color: var(--c-select);
  color: #8A8A8A;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.7em;
  font-weight: 500;
  line-height: 2.67vh;
  background-color: #EBF6FF;
  flex-grow: 1;
}

.event-filter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 11px;
  gap: 2px;
  height: 50px;
  min-width: 70px; 
}

.selection-box {
  width: 100%;
  height: 100%;
  border: 1px solid #8A8A8A;
  border-radius: 4px;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 3px 3px;
  font-size: 1em;
  color: #8A8A8A;
  background-color: #FFFFFF;
}

.button-add-sponsor {
  min-width: 80px;
  height: 36px; 
  border: none;
  border-radius: 4px;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.7em;
  font-weight: 400;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 4px 4px;
  cursor: pointer;
}

.button-sponsor-tiers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap:2px;
  min-width: 95px;
  height: 36px; 
  border: none;
  border-radius: 4px;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.7em;
  font-weight: 400;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 4px 4px;
  cursor: pointer;
}

.chevron-icon {
  height: 15px;
  width: 15px;
}

.icon-button {
  background-color: var(--c-bg-light);
  border: none;
  border-radius: 20%;
  cursor: pointer;
  align-content: space-between;
  width:  8vw;
  height: 8vw;
  min-width: 20px;
  min-height: 20px;
  max-height: 25px;
  max-width: 25px;
  display:flex;
  justify-content: center;
  align-items: center;
  padding: 2px 2px 2px 2px;
}
.icon {
  width: 6.5vw;
  height: 6.5vw;
  max-width: 25px;
  max-height: 15px;
  color: var(--c-ft-dark);
}

.close-button{
  z-index: 3;
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: -20px;
}

@media (max-width: 700px) {

  .hide-on-mobile {
    display: none;
    background: rgba(0,0,0,0.5);
  }

  .search-container {
    width: 100%;
  }

  .button-sponsor-tiers{
    flex-grow: 1;
  }

  .button-add-sponsor {
    flex-grow: 1;
  }

  .backdrop{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
  }

  .container {
    flex-direction: column; /* Stack the elements vertically */
  }

  .sponsors-table {
    max-height: 700px;
    height: 78vh;
  }

  .sponsor-card {
    position: absolute; /* Position the sponsor card absolutely */
    top: 118px; /* Position the sponsor card 50px below the center */
    width: 90vw; /* Set the width to 100% */
    max-width: 500px;
    max-height: 80vh;
    height: fit-content; /* Set the height to 100% */
    margin-top: 0;
  }
  .sponsor-card-body h1{
    font-size: 1em;
  }
  .sponsor-card-body p{
    font-size: 0.9em;
  }

  .card-name{
    font-size:1.9em;
  }

  .card-subtitle{
    font-size:1.3em;
  }

  .card-tier{
    font-size: 1.9em;
  }

  .sponsor-logo {
    width: 18vh;
    height: 18vh;
    max-width: 150px;
    max-height: 150px;
    border-radius: 50%;
    object-fit: scale-down; /* Ensure the whole image is visible */
  }

  .icon-button {
    max-height: 40px;
    max-width: 40px;
  }

  .icon {
    max-width: 35px;
    max-height: 20px;
  }

}


  
</style>