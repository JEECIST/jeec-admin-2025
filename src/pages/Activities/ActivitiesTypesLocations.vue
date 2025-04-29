<template>
  <div class="locations">
    <div :class="['content', { 'shrink': selectedLoc }]">
      <div class="header">
        <div class="search-container">
          <img class="search-icon" src="../../assets/search.svg">
          <input type="text" placeholder="Search for a location" class="search-bar" v-model="searchQuery" />
        </div>
        <button class="btn_header" @click="popup_addloc">Add Locations</button>
      </div>
      <div class="table-container" v-if="filteredActivityLoc.length > 0">
        <TheTable 
        :data="database_loc" 
        :tableHeaders="tableHeaders" 
        :searchInput="searchQuery"
        :tableButtons="tableButtons" 
        @onRowSelect="selectLoc"></TheTable>
        </div>
        <div v-if="filteredActivityLoc.length === 0" class="no-loc">
          No locations found
        </div>
      <AddLocPopUp v-if="isaddloc" @close="popup_addloc" @locAdded = "fetchData" />
    </div>
    <div class="right-popup-placeholder" v-if="selectedLoc && filteredActivityLoc.length > 0">
      <button class="btn_close_rpp" @click="close_rpp">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
            stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
      </button>
      <div class="items">
      <img  class="popup-logo" src="../../assets/jeec25.png" alt="Profile Image">
      <div class="popup-loc">{{ selectedLoc.name }}</div>
      <div class="popup-title">Location</div>
      <div class="popup-btns">
        <button class = "edit-btn" @click ="popup_editloc">
          <img src="../../assets/pencil.svg">
        </button>
        <button class = "edit-btn" @click = "deleteLoc(selectedLoc.name)">
          <img src="../../assets/trash.svg">
        </button>
      </div>
    </div>
    <EditLocPopUp v-if="iseditloc" :selectedLoc = "selectedLoc" @locEdited = "updatedSelectedLoc" @close="popup_editloc" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed , onMounted} from 'vue';
import TheTable from '../../global-components/TheTable.vue';
import AddLocPopUp from './AddLocPopUp.vue';
import EditLocPopUp from './EditLocPopUp.vue';
import axios from 'axios';

const database_loc = ref([
  {
    name: null,
    priority: null,
  }
]);

const tableHeaders = {
  name: "Name",
  priority: "Priority"
}

const fetchData = () => {
  axios
    .get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/activities/types/add-infos', {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    })
    .then((response) => {
      const data = response.data;
      database_loc.value = data.locations.map((location) => ({
        name: location.name,
        priority: location.priority,
      }));
    })
    .catch((error) => {
      console.error('Erro ao buscar os dados:', error);
    });
};

onMounted(fetchData)

const searchQuery = ref('');
const selectedLoc = ref(null);
const tableButtons = '';

function deleteLoc(name)  {
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + `/activities/types/delete_loc`, {name: name}, {
        auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
    })
    .then(() => {
        console.log("Location removida com sucesso!");
        fetchData();

        if (selectedLoc.value && selectedLoc.value.name === name) {
            selectedLoc.value = null;
        }
    })
    .catch(error => {
        console.error("Erro ao remover location:", error.response?.data || error);
    });
}
function selectLoc(row) {
  selectedLoc.value = row;
  //console.log('Selected Row: ', row);
}

const filteredActivityLoc = computed(() => {
  if (!searchQuery.value) {
    return database_loc.value;
  }

  const filtered = database_loc.value.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  // Se não houver resultados na busca, limpar o selectedType
  if (filtered.length === 0) {
    selectedLoc.value = null; 
  }

  return filtered;
});

function close_rpp() {
  selectedLoc.value = null;
}

const isaddloc = ref(false);
const iseditloc = ref(false);

function popup_addloc() {
  isaddloc.value = !isaddloc.value
}

function popup_editloc() {
  iseditloc.value = !iseditloc.value
}

function updatedSelectedLoc(updatedLoc){
  selectedLoc.value = null;
  fetchData();
}

</script>


<style scoped>
.locations {
  display: flex;
  width: calc(200dvh - var(--sidebar-width));
  background: #FFFFFF;
  height: calc(100vh - var(--header-height));
  overflow: hidden;
  box-sizing: border-box;
  padding: 50px 3ch 3ch 3ch;
}

.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}
.content.shrink {
  flex-grow: 0.7;
  width: calc(100% - 390px);
}

.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2vw;
  margin-bottom: 10px;
  color: #8A8A8A;
}

.search-container {
  display: flex;
  align-items: center;
  position: relative;
  min-width: 30%; /* Usando % para ser responsivo */
  height: 3.5rem;
  background-color: #EBF6FF;
  border-radius: 0.5rem;
  flex-grow: 1;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 1rem;
  height: 1.5rem;
  color: #8A8A8A;
}

.search-bar {
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem 0.5rem 3rem;
  border: none;
  border-radius: 0.5rem;
  outline-color: var(--c-select);
  color: #8A8A8A;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  background-color: #EBF6FF;
}

.btn_header {
  max-width: 9rem;
  height: 100%;
  align-self: center;
  border: none;
  border-radius: 0.5rem;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 0.3rem 1rem;
  cursor: pointer;
}


.table-container {
  flex-grow: 1;
  transition: flex-grow 0.3s ease;
  margin-top: 1vh;
  overflow-y:auto;
}

.no-loc{
  width: 100%;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #4F4F4F;
  background-color: #EBF6FF;
  border-radius: 2vh;
  margin-top: 2vh;
}

.right-popup-placeholder {
  display: flex;
  flex-direction: column;
  height: calc(92vh - var(--header-height));
  width: 380px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: -10px;
  border-radius: 10px;
  background-color: var(--c-accent);
  overflow-y: auto;
}

.btn_close_rpp {
  align-self: flex-end;
  position: relative;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
}

.popup-logo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 15px;
}

.items{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 7vh;
}

.popup-loc{
  color: rgb(32, 32, 32);
  font-size: x-large;
  font-weight: bold;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.popup-title{
  color: #4F4F4F;
}

.popup-btns {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.edit-btn {
  width: 36px;
  height: 36px;
  background: #FFFFFF;
  border-radius: 8px;
  border-color: #FFFFFF;
  cursor: pointer;
}

</style>