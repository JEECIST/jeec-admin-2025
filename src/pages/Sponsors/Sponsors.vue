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
        <select class="selection-box" v-model="eventselected">
          <option value="all">All</option>
          <option value="JEEC 23/24">JEEC 23/24</option>
          <option value="JEEC 24/25">JEEC 24/25</option>
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
        <h1 class="card-tier">{{ selectedRow.tier }}</h1>
        <img class='sponsor-logo' :src=selectedRow.logo alt="sponsor logo" />
        <div class="card-title">
          <p class="card-name">{{ selectedRow.name }}</p>
          <p class="card-subtitle">Sponsor</p>
        </div>
        <div class="card-buttons">
          <button @click="editRow(selectedRow)" class="icon-button">
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
          <p>{{ selectedRow.jeecresponsible }}</p>
        </div>
        <div class="card-paragraph">
          <h1>Description</h1>
          <p>{{ selectedRow.description }}</p>
        </div>
        <div class="card-paragraph">
          <h1>Event</h1>
          <p>{{ selectedRow.eventselected }}</p>
        </div>
        
      </div>
    </div>

    <AddSponsor v-if="isaddsponsor" @close="toogleadd"/>
    <EditSponsor v-if="iseditsponsor" @close="editRow(selectedRow)" :sponsorData="selectedRow" :isOpen="iseditsponsor"/>
  </div>
  
</template>

<script setup>
import { ref } from 'vue';
import TheTable from '../../global-components/TheTable.vue';
import AddSponsor from './AddSponsor.vue';
import EditSponsor from './EditSponsor.vue';
import pencilIcon from '../../assets/pencil.svg'
import trashIcon from '../../assets/trash.svg'

// Example data to be displayed in the table
const tableData = ref([
  { id: 1, name: 'Galp', tier: 'Gold', jeecresponsible: 'Maria Francisca', logo:"src/assets/Galp.png", description:'Forneceu combustivel para o carro de apoio lkwnljQ J+EHOQW NEDQBEVFI +ehpndbfowpodsnk', eventselected: 'JEEC 23/24', showInWebsite: false },
  { id: 2, name: 'Galp', tier: 'Silver', jeecresponsible: 'Maria Francisca', logo: "src/assets/Galp.png" , description:'Forneceu o pequeno almoço para a semana toda', eventselected: 'JEEC 23/24', showInWebsite: true },
  { id: 3, name: 'Galp', tier: 'Bronze', jeecresponsible: 'Maria Francisca', logo: "src/assets/Galp.png" , description:'Flopou não forneceu absolutamente nada', eventselected: 'JEEC 23/24', showInWebsite: true},
  { id: 4, name: 'Galp', tier: 'Gold', jeecresponsible: 'Maria Francisca', logo:"src/assets/Galp.png", description:'Forneceu combustivel para o carro de apoio lkwnljQ J+EHOQW NEDQBEVFI +ehpndbfowpodsnk sdclsd sacsd sdv', eventselected: 'JEEC 23/24', showInWebsite: false },
  { id: 5, name: 'Galp', tier: 'Silver', jeecresponsible: 'Maria Francisca', logo: "src/assets/Galp.png" , description:'Forneceu o pequeno almoço para a semana toda', eventselected: 'JEEC 23/24', showInWebsite: true },
  { id: 6, name: 'Galp', tier: 'Bronze', jeecresponsible: 'Maria Francisca', logo: "src/assets/Galp.png" , description:'Flopou não forneceu absolutamente nada', eventselected: 'JEEC 23/24', showInWebsite: true},
  { id: 7, name: 'Galp', tier: 'Gold', jeecresponsible: 'Maria Francisca', logo:"src/assets/Galp.png", description:'Forneceu combustivel para o carro de apoio lkwnljQ J+EHOQW NEDQBEVFI +ehpndbfowpodsnk sdclsd sacsd sdv', eventselected: 'JEEC 23/24', showInWebsite: false },
  { id: 8, name: 'Galp', tier: 'Silver', jeecresponsible: 'Maria Francisca', logo: "src/assets/Galp.png" , description:'Forneceu o pequeno almoço para a semana toda', eventselected: 'JEEC 23/24', showInWebsite: true },
  { id: 9, name: 'Galp', tier: 'Bronze', jeecresponsible: 'Maria Francisca', logo: "src/assets/Galp.png" , description:'Flopou não forneceu absolutamente nada', eventselected: 'JEEC 23/24', showInWebsite: true},
  { id: 10, name: 'Galp', tier: 'Gold', jeecresponsible: 'Maria Francisca', logo:"src/assets/Galp.png", description:'Forneceu combustivel para o carro de apoio lkwnljQ J+EHOQW NEDQBEVFI +ehpndbfowpodsnk sdclsd sacsd sdv ', eventselected: 'JEEC 23/24', showInWebsite: false },
  { id: 11, name: 'Galp', tier: 'Silver', jeecresponsible: 'Maria Francisca', logo: "src/assets/Galp.png" , description:'Forneceu o pequeno almoço para a semana toda', eventselected: 'JEEC 23/24', showInWebsite: true },
  { id: 12, name: 'Galp', tier: 'Bronze', jeecresponsible: 'Maria Francisca', logo: "src/assets/Galp.png" , description:'Flopou não forneceu absolutamente nada', eventselected: 'JEEC 23/24', showInWebsite: true},

]);

// Headers to map the data keys to table headers
const headers = {
  id: 'ID',
  name: 'Name',
  tier: 'Tier',
  jeecresponsible: 'JEEC Responsible',
};

const tableButtons = '';
const noSponsors = ref(false);
const cardDisplaying = ref(false);

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
  iseditsponsor.value= !iseditsponsor.value
  console.log(iseditsponsor.value)
  console.log('Edit button clicked for row:', row);
}

function deleteRow(row) {
  console.log('Delete button clicked for row:', row);
}


const isaddsponsor= ref(false);
const iseditsponsor= ref(false);

function toogleadd()
{
  isaddsponsor.value= !isaddsponsor.value
  console.log(isaddsponsor.value)
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
  padding: 14px 20px 20px 20px;
  gap: 15px;
}

.sponsor-card{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  padding: 10px 10px 10px 10px;
  align-self: flex-end;
  height: calc(75vh - 14px);
  max-height: 446px;
  width: 20%;
  min-width: 250px;
  background-color: var(--c-accent);
  border-radius: 10px;
  gap: 10px;
  flex-grow: 1;
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
  width: 8vw;
  height: 8vw;
  min-height: 50px;
  min-width: 50px;
  max-width: 100px;
  max-height: 100px;
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
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 10px 10px 10px 10px;
  gap: 10px;

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
  max-height: 460px;
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
  font-size: 10px;
  gap: 2px;
  height: 50px;
  min-width: 30px; 
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
    height: 90vh;
  }

  .sponsor-card {
    position: absolute; /* Position the sponsor card absolutely */
    top: 120px; /* Position the sponsor card 50px below the center */
    width: 90vw; /* Set the width to 100% */
    max-height: fit-content;
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