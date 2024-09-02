<template>
  <div class="sponsors-container">
    <div class="sponsors-table">
      <div class="header">
        <div class="search-container">
          <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
          </svg>
          <input 
            type="text" 
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
      <button class="button-add-sponsor">Add Sponsor</button>
      <button class="button-sponsor-tiers">Sponsor Tiers
        <svg xmlns="http://www.w3.org/2000/svg" class="chevron-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
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
        <div class="nosponsors" v-if="!tableData && tableData.length == 0">No Sponsors Found</div>
      </div>
    </div>

    <div v-if="selectedRow" class="sponsor-card">
      <div class="sponsor-card-header">
        <h1 class="card-tier">{{ selectedRow.tier }}</h1>
        <img class='sponsor-logo' :src=selectedRow.logo alt="sponsor logo" />
        <div class="card-title">
          <p class="card-name">{{ selectedRow.name }}</p>
          <p class="card-subtitle">Sponsor</p>
        </div>
        <div class="card-buttons">
          <button @click="editRow(selectedRow)" class="icon-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon" width="16" height="16">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
            </svg>
          </button>
          <button @click="deleteRow(selectedRow)" class="icon-button">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 25 24.8" style="enable-background:new 0 0 25 24.8;" xml:space="preserve" data-ember-action="" data-ember-action-1015="1015">
              <g class="icon">
                <path d="M6.8,8.8h11L17,22.6
                        H7.6L6.8,8.8z 
                        M4.9,7l1,17.4h12.8
                        l1-17.4
                        H4.9z"></path>
                <polygon points="13.6,10.3 13.1,21.2 14.9,21.2 15.4,10.3 "></polygon>
                <polygon points="11.5,21.2 11,10.3 9.2,10.3 9.7,21.2 "></polygon>
                <path d="M20.4,4h-4.8l-0.5-1.6
                        H9.5L9,4
                        H4.2
                        L3.5,8.6h17.6
                        L20.4,4z 
                        
                        M9.9,3.2h4.8
                        L14.9,3.9h-5.2z
                        
                        M5.6,6.7l0.2-1 h13l0.2,1
                        H5.6z"></path>
              </g>
            </svg>
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
          <p>{{ selectedRow.event }}</p>
        </div>
        
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref } from 'vue';
import TheTable from '../../global-components/TheTable.vue';

// Example data to be displayed in the table
const tableData = ref([
  { id: 1, name: 'Galp', tier: 'Gold', jeecresponsible: 'Maria Francisca', logo:"src/assets/Galp.png", description:'Forneceu combustivel para o carro de apoio', event: 'JEEC 23/24' },
  { id: 2, name: 'Galp', tier: 'Silver', jeecresponsible: 'Maria Francisca', logo: "src/assets/Galp.png" , description:'Forneceu o pequeno almoço para a semana toda', event: 'JEEC 23/24' },
  { id: 3, name: 'Galp', tier: 'Bronze', jeecresponsible: 'Maria Francisca', logo: "src/assets/Galp.png" , description:'Flopou não forneceu absolutamente nada', event: 'JEEC 23/24'},
]);

// Headers to map the data keys to table headers
const headers = {
  id: 'ID',
  name: 'Name',
  tier: 'Tier',
  jeecresponsible: 'JEEC Responsible',
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
  console.log('Edit button clicked for row:', row);
}

function deleteRow(row) {
  console.log('Delete button clicked for row:', row);
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
  height: 100%;
  padding: 3vh 2vw;
}

.sponsor-card{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 3vh 2.5vw;
  max-height: max-content;
  width: 25vw;
  background-color: var(--c-accent);
  border-radius: 2vh;
  gap:1.8vh;
}

.sponsor-card-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5vw 1vw;
  gap:1vw;
}

.card-tier{
  text-transform: uppercase;
  font-size: 1.7vw;
}

.sponsor-logo {
  width: 11vw;
  height: 11vw;
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
  font-size:1.5vw;
}

.card-subtitle{
  color: var(--c-ft-semi-light);
  font-size:1.1vw;
}

.card-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5vw 1vw;
  gap: 1vw;
}

.sponsor-card-body{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  gap: 1.5vh;
}
.sponsor-card-body h1{
  color: var(--c-ft-dark);
  font-size: 0.9vw;
  font-weight: 700;
}
.sponsor-card-body p{
  font-size: 0.8vw;
}

.sponsors-table {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2vh 2vw;
  width: 100%;
}

.table{
  width: 100%;
  height: 100%;
}

.nosponsors{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
  color: var(--c-tf);
  background-color: var(--c-accent);
  font-weight: 500; 
}

.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  padding: 0vh 2vw; 
  gap: 1vw;
  color: #8A8A8A;
}

.search-container {
  display: flex;
  align-content: center;
  position: relative;
  min-width: 19vw;
  height: 3vw; 
  background-color: #EBF6FF; 
  border-radius: 1vh; 
  flex-grow: 4;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 1vw;
  transform: translateY(-50%);
  width: 1.33vw;
  height: 3.5vh;
  color: #8A8A8A;
}

.search-bar {
  width: 100%;
  height: 100%;
  padding: 0.5vh 1vw 0.5vh 4vw;
  border: none;
  border-radius: 1vh;
  outline-color: var(--c-select);
  color: #8A8A8A;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 1vw;
  font-weight: 500;
  line-height: 2.67vh;
  background-color: #EBF6FF;
  flex-grow: 1;
}

.event-filter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.8vw;
  gap: 0.5vh;
  width: 7vw; 
}

.selection-box {
  width: 100%;
  height: 3vw; 
  border: 1px solid #8A8A8A;
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 0.5vh 0.5vw;
  font-size: 0.8vw;
  color: #8A8A8A;
  background-color: #FFFFFF;
}

.button-add-sponsor {
  max-width: 9vw;
  height: 3vw; 
  border: none;
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.9vw;
  font-weight: 500;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 0.2vw 1vw;
}

.button-sponsor-tiers {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-width: 12vw;
  height: 3vw; 
  border: none;
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.9vw;
  font-weight: 500;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 0.2vw 1vw;
}

.chevron-icon {
  height: 1.5vw;
  width: 1.5vw;
}

.icon-button {
  background-color: var(--c-bg-light);
  border: none;
  border-radius: 20%;
  cursor: pointer;
  align-content: space-between;
  width:  2vw;
  height: 2vw;
  display:flex;
  justify-content: center;
  padding: 1%;
}
.icon {
  width: 1.5vw;
  height: 1.5vw;
  color: var(--c-ft-dark);
}


  
</style>