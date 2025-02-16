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
      <AddLocPopUp v-if="isaddloc" @close="popup_addloc" />
    </div>
    <div class="right-popup-placeholder" v-if="selectedLoc && filteredActivityLoc.length > 0">
      <div class="items">
      <div class="popup-type">{{ selectedLoc.name }}</div>
      <div class="popup-title">Location</div>
      <div class="popup-btns">
        <button class = "edit-btn">
          <img src="../../assets/pencil.svg">
        </button>
        <button class = "edit-btn">
          <img src="../../assets/trash.svg">
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TheTable from '../../global-components/TheTable.vue';
import AddLocPopUp from './AddLocPopUp.vue';

const database_loc = ref([
  {
    name: "Main Speaker1",
    priority: 1,
  },
  {
    name: "Main Speaker1",
    priority: 2,
  },
  {
    name: "Main Speaker1",
    priority: 3,
  },
  {
    name: "Main Speaker1",
    priority: 4,
  }
]);


const tableHeaders = {
  name: "Name",
  priority: "Priority"
}

const searchQuery = ref('');
const selectedLoc = ref(null);
const tableButtons = '';

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

const isaddloc = ref(false);

function popup_addloc() {
  isaddloc.value = !isaddloc.value
  console.log(isaddloc.value)
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
  align-content: center;
  position: relative;
  min-width: 19vw;
  height: 3vw;
  background-color: #EBF6FF;
  border-radius: 1vh;
  flex-grow: 1;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 1vw;
  transform: translateY(-50%);
  width: 1.1vw;
  height: 3vh;
  color: #8A8A8A;
}

.search-bar {
  width: 100%;
  height: 100%;
  padding: 0.5vh 1vw 0.5vh 3vw;
  border: none;
  border-radius: 1vh;
  outline-color: var(--c-select);
  color: #8A8A8A;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.9vw;
  font-weight: 500;
  line-height: 2.67vh;
  background-color: #EBF6FF;
  flex-grow: 1;
}

.btn_header {
  max-width: 9vw;
  height: 2.7vw; 
  align-self: center;
  border: none;
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.9vw;
  font-weight: 500;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 0.2vw 1.5vw;
  cursor: pointer;
}

.table-container {
  flex-grow: 1;
  transition: flex-grow 0.3s ease;
  margin-top: 1vh;
  overflow-y:scroll;
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
  height: calc(92vh - var(--header-height));
  width: 370px;
  margin-left: 35px;
  margin-top: -10px;
  border-radius: 10px;
  background-color: var(--c-accent);
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

.popup-type{
  color: rgb(32, 32, 32);
  font-size: x-large;
  font-weight: bold;
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
}

</style>