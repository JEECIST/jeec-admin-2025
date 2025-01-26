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
      <button class="button-add-sponsor" @click="toogleadd">Add Tier</button>
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
      <div class="nosponsors" v-if=noSponsors>No Tiers Found</div>
    </div>

    <div v-if="selectedRow" class="sponsor-card">
      <button @click="unselectRow" class="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="sponsor-card-header">
        <img class='sponsor-logo' :src="JEEC" alt="sponsor logo" />
        <div class="card-title">
          <p class="card-name">{{ selectedRow.name }}</p>
          <p class="card-subtitle">Sponsor Tier</p>
        </div>
        <div class="card-buttons">
          <button @click="editRow(selectedRow)" class="icon-button">
            <img :src="pencilIcon" alt="edit" class="icon" />
          </button>
          <button @click="tooglelist" class="icon-button">
            <img :src="briefcaseIcon" alt="list of sponsors in tier" class="icon">
          </button>
          <button @click="deleteRow(selectedRow)" class="icon-button">
            <img :src="trashIcon" alt="delete" class="icon" />
          </button>

        </div>
        
      </div>
      <div class="sponsor-card-body">
        <div class="card-collumn">
          <div class="card-paragraph">
            <h1>Priority</h1>
            <p>{{ selectedRow.priority }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Show in Website</h1>
            <p>{{ selectedRow.showInWebsite }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Logo in Canvas</h1>
            <p>{{ selectedRow.logoincanvas }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Exclusive Video</h1>
            <p>{{ selectedRow.exclusivevideo }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Exclusive Posts</h1>
            <p>{{ selectedRow.exclusiveposts }}</p>
          </div>
      </div>
      <div class="card-collumn">
          <div class="card-paragraph">
            <h1># Sponsors</h1>
            <p>{{ selectedRow.numberOfSponsors }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Social Media</h1>
            <p>{{ selectedRow.socialmedia }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Logo in Posters</h1>
            <p>{{ selectedRow.logoinposters }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Teaser</h1>
            <p>{{ selectedRow.teaser }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Included Meal</h1>
            <p>{{ selectedRow.includemeal }}</p>
          </div>
      </div>
        
        
      </div>
    </div>

    <SponsorsList v-if="listsponsors" @close="tooglelist" :type="selectedRow.name" />
    <AddSponsorTier v-if="isaddsponsortier" @close="toogleadd"/>
    <EditSponsorTier v-if="iseditsponsortier" @close="editRow(selectedRow)" :sponsorData="selectedRow" :isOpen="iseditsponsor"/>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TheTable from '../../global-components/TheTable.vue';
import pencilIcon from '../../assets/pencil.svg'
import trashIcon from '../../assets/trash.svg'
import JEEC from '../../assets/JEEC.png'
import AddSponsorTier from './AddSponsorTier.vue';
import EditSponsorTier from './EditSponsorTier.vue';
import briefcaseIcon from '../../assets/briefcase.svg'
import SponsorsList from './SponsorsList.vue';

// Example data to be displayed in the table
// const tableData = ref([
//   { name: 'Gold', priority: 1, sponsors: 3, includemeal:"Yes", showInWebsite: "No", socialmedia: "Yes", logoincanvas:"Yes", logoinposters:"Yes", exclusivevideo:"Yes", exclusiveposts: "Yes", teaser:"Yes" },
//   { name: 'Silver', priority: 2, sponsors: 15, includemeal:"Yes", showInWebsite: "No", socialmedia: "Yes", logoincanvas:"Yes", logoinposters:"Yes", exclusivevideo:"Yes", exclusiveposts: "Yes", teaser:"Yes" },
//   { name: 'Bronze', priority: 3, sponsors: 9, includemeal:"No", showInWebsite: "No", socialmedia: "Yes", logoincanvas:"Yes", logoinposters:"Yes", exclusivevideo:"Yes", exclusiveposts: "Yes", teaser:"Yes" },
// ]);

const tableData = ref([]);

const fetchData = () => {
    axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/sponsors_tiers_vue',{auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }}).then((response)=>{
          const data = response.data
          tableData.value = response.data.tiers
          console.log("Sponsor Tiers",tableData.value)
          events.value = response.data.events
          console.log("Events",events.value)
        }).catch((error)=>{
          console.log(error)
        })
}

onMounted(fetchData)



// Headers to map the data keys to table headers
const headers = {
  name: 'Name',
  priority: 'Priority',
  numberOfSponsors: '# Sponsors'
};

const tableButtons = '';
const noSponsors = ref(false);


// Search query for filtering the rows
const searchQuery = ref('');
const selectedRow = ref(null);

// Event handler for row selection
function handleRowSelect(row) {
  cardDisplaying.value = true;
  selectedRow.value = row;
}

function handleNosponsors(isEmpty){
  console.log('No sponsors found', isEmpty);
  noSponsors.value = isEmpty;
}

function unselectRow() {
  cardDisplaying.value = false;
  selectedRow.value = null;
}

// Event handlers for button clicks
function editRow(row) {
  iseditsponsortier.value= !iseditsponsortier.value
  console.log(iseditsponsortier.value)
  console.log('Edit button clicked for row:', row);
}

const isaddsponsortier= ref(false);
const iseditsponsortier= ref(false);
const listsponsors= ref(false);
const cardDisplaying = ref(false);


function toogleadd()
{
  isaddsponsortier.value= !isaddsponsortier.value
  console.log(isaddsponsortier.value)
  fetchData()
}

function tooglelist()
{
  listsponsors.value= !listsponsors.value
  console.log(listsponsors.value)
}

function deleteRow(row) {
  if (confirm('Are you sure you want to delete this sponsor tier?')) {
    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/delete_sponsor_tier', {
      tier_id: selectedRow.value.id
    }, {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
    }).then((response) => {
      console.log('Sponsor tier deleted', response.data);
      unselectRow();
      fetchData();
    }).catch((error) => {
      console.log(error);
    });
  }
  console.log('Delete button clicked for row:', row);
}



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
  max-height: 75vh;
  width: 50%;
  max-width: 300px;
  background-color: var(--c-accent);
  border-radius: 10px;
  gap: 10px;
  z-index: 3;
}

.sponsor-card-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap:10px;
}

.card-tier{
  text-transform: uppercase;
  font-size: 1.6em;
}

.sponsor-logo {
  width: 10vw;
  height: 10vw;
  min-height: 80px;
  min-width: 80px;
  max-width: 180px;
  max-height: 180px;
  border-radius: 50%;
  object-fit: cover;
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
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 15px 15px 15px 15px;
  gap: 40px;

}

.card-paragraph{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.sponsor-card-body h1{
  color: var(--c-ft-dark);
  font-size: 0.8em;
  font-weight: 700;
}
.sponsor-card-body p{
  font-size: 0.7em;
  color: var(--c-ft-semi-light);
}

.card-collumn{
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  min-width:200px;
  background-color: #EBF6FF; 
  border-radius: 4px; 
  flex-grow: 4;
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
  height: 36px; 
  padding: 5px 5px 5px 24px;
  border-radius: 4px;
  border: none;
  outline-color: var(--c-select);
  color: #8A8A8A;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.7em;
  font-weight: 500;
  line-height: 2.67vh;
  background-color: #EBF6FF;
  flex-grow: 1;
}



.selection-box {
  width: 100%;
  height: 100%;
  border: 1px solid #8A8A8A;
  border-radius: 4px;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 1px 1px;
  font-size: 1em;
  color: #8A8A8A;
  background-color: #FFFFFF;
}

.button-add-sponsor {
  min-width: 70px;
  height: 36px; 
  border: none;
  border-radius: 4px;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.8em;
  font-weight: 400;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 4px 4px;
  cursor: pointer;
  flex-grow: 1;
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
    top: 120px; /* Position the sponsor card 50px below the center */
    width: 90vw; /* Set the width to 100% */
    max-width: fit-content;
    max-height: 600px;
    height: 80vh; /* Set the height to 100% */
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
    width: 40vw;
    height: 40vw;
    max-width: 150px;
    max-height: 150px;
    border-radius: 50%;
    object-fit: cover;
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