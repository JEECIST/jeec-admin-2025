<template>
  <div class="sponsors-container">
    <div class="sponsors-table">
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
          class="table"
        />
        <div class="nosponsors" v-if="tableData.length == 0">No Tiers Found</div>
      </div>
    </div>

    <div v-if="selectedRow" class="sponsor-card">
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
            <p>{{ selectedRow.sponsors }}</p>
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
import { ref } from 'vue';
import TheTable from '../../global-components/TheTable.vue';
import pencilIcon from '../../assets/pencil.svg'
import trashIcon from '../../assets/trash.svg'
import JEEC from '../../assets/JEEC.png'
import AddSponsorTier from './AddSponsorTier.vue';
import EditSponsorTier from './EditSponsorTier.vue';
import briefcaseIcon from '../../assets/briefcase.svg'
import SponsorsList from './SponsorsList.vue';

// Example data to be displayed in the table
const tableData = ref([
  { name: 'Gold', priority: 1, sponsors: 3, includemeal:"Yes", showInWebsite: "No", socialmedia: "Yes", logoincanvas:"Yes", logoinposters:"Yes", exclusivevideo:"Yes", exclusiveposts: "Yes", teaser:"Yes" },
  { name: 'Silver', priority: 2, sponsors: 15, includemeal:"Yes", showInWebsite: "No", socialmedia: "Yes", logoincanvas:"Yes", logoinposters:"Yes", exclusivevideo:"Yes", exclusiveposts: "Yes", teaser:"Yes" },
  { name: 'Bronze', priority: 3, sponsors: 9, includemeal:"No", showInWebsite: "No", socialmedia: "Yes", logoincanvas:"Yes", logoinposters:"Yes", exclusivevideo:"Yes", exclusiveposts: "Yes", teaser:"Yes" },
]);

// Headers to map the data keys to table headers
const headers = {
  name: 'Name',
  priority: 'Priority',
  sponsors: '# Sponsors',
  includemeal: 'Include Meal',
};

const tableButtons = '';

// Search query for filtering the rows
const searchQuery = ref('');
const selectedRow = ref(null);

// Event handler for row selection
function handleRowSelect(row) {
  selectedRow.value = row;
}

// Event handlers for button clicks
function editRow(row) {
  iseditsponsortier.value= !iseditsponsortier.value
  console.log(iseditsponsortier.value)
  console.log('Edit button clicked for row:', row);
}

function deleteRow(row) {
  console.log('Delete button clicked for row:', row);
}

const isaddsponsortier= ref(false);
const iseditsponsortier= ref(false);
const listsponsors= ref(false);


function toogleadd()
{
  isaddsponsortier.value= !isaddsponsortier.value
  console.log(isaddsponsortier.value)
}

function tooglelist()
{
  listsponsors.value= !listsponsors.value
  console.log(listsponsors.value)
}



</script>

<style scoped>

.sponsors-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 5px 5px 5px 5px;
}

.sponsor-card{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 10px 10px 10px;
  margin: 10px 10px 10px 10px;
  max-height: max-content;
  width: 28%;
  min-width: 200px;
  background-color: var(--c-accent);
  border-radius: 10px;
  gap:15px;
  flex-grow: 1;
  max-width: 250px;
}

.sponsor-card-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px 5px 10px 5px;
  gap:20px;
}

.card-tier{
  text-transform: uppercase;
  font-size: 1.6em;
}

.sponsor-logo {
  width: 11vw;
  height: 11vw;
  min-width: 100px;
  min-height: 100px;
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
  min-width: 20px;
  padding: 1px 1px;
  gap: 10px;
}

.sponsor-card-body{
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 5px 5px 10px 5px;
  gap: 20%;
}

.card-paragraph{
  display: flex;
  flex-direction: column;
  gap:2px;
}
.sponsor-card-body h1{
  color: var(--c-ft-dark);
  font-size: 0.6em;
  font-weight: 700;
}
.sponsor-card-body p{
  font-size: 0.5em;
  color: var(--c-ft-semi-light);
}

.card-collumn{
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sponsors-table {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 70%;
  min-width: 380px;
  max-width: 70vw;
  flex-grow: 1;
}

.table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 10px;
  width: 100%;
}

.table{
  width: 100%;
  height: 100%;
  font-size: 0.8em;
  height: 70vh;
}

.nosponsors{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.6em;
  color: var(--c-tf);
  background-color: var(--c-accent);
  font-weight: 500; 
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
  padding: 10px 10px 10px 10px;
  gap: 7px;
  color: #8A8A8A;
}

.search-container {
  display: flex;
  align-content: center;
  position: relative;
  min-height: 36px;
  min-width:200px;
  width:40%; 
  background-color: #EBF6FF; 
  border-radius: 4px; 
  flex-grow: 4;
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
  min-width: 170px; 
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
  font-size: 0.6em;
  gap: 2px;
  width: 16%;
  height: 50px;
  min-width: 95px; 
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
  width: 16%;
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
  width: 18%;
  min-width: 80px;
  height: 36px; 
  border: none;
  border-radius: 4px;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.9em;
  font-weight: 400;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 4px 4px;
  cursor: pointer;
  flex-grow: 1;
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
  width:  2vw;
  height: 2vw;
  min-width: 20px;
  min-height: 20px;
  display:flex;
  justify-content: center;
  align-items: center;
  padding: 1px 1px 1px 1px;
}
.icon {
  width: 1.5vw;
  height: 1.5vw;
  min-width: 15px;
  min-height: 15px;
  color: var(--c-ft-dark);
}


  
</style>