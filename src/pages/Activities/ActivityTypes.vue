<template>
  <div class="activity_types">
    <div :class="['content', { 'shrink': selectedType }]">
      <div class="header">
        <div class="search-container">
          <img class="search-icon" src="../../assets/search.svg">
          <input type="text" placeholder="Search for an activity type" class="search-bar" v-model="searchQuery" />
        </div>
        <button class="btn_header">Add Type</button>
        <button class="btn_header" @click="goToLocations">Locations 〉</button>
      </div>
      <div class="table-container" v-if="filteredActivityType.length > 0">
        <TheTable 
        :data="database_type" 
        :tableHeaders="tableHeaders" 
        :searchInput="searchQuery"
        @onRowSelect="selectType"></TheTable>
      </div>
      <div v-if="filteredActivityType.length === 0" class="no-act-type">
        No activity type found
      </div>
    </div>
    <div class="right-popup-placeholder" v-if="selectedType && filteredActivityType.length > 0">
      <div class="items">
        <div class="popup-type">{{ selectedType.name }}</div>
        <div class="popup-title">Activity Type</div>
        <div class="popup-btns">
          <button class="edit-btn">
            <img src="../../assets/pencil.svg">
          </button>
          <button class="edit-btn">
            <img src="../../assets/sheet.svg">
          </button>
          <button class="edit-btn">
            <img src="../../assets/trash.svg">
          </button>
        </div>
        <div class="info"> <!--FAZER-->
          <div class="col1">
            <p>Priority</p>
            <div class="text"> {{ selectedType.priority }}</div>
            <p>Points</p>
            <div class="text"> {{ selectedType.points }}</div>
            <p>Show in Website</p>
            <div class="text">Yes</div>
            <p>Esclusive Video</p>
            <div class="text">No</div>
          </div>
          <div class="col2">
            <p># Activities</p>
            <div class="text"> {{ selectedType.number_act }}</div>
            <p>Location</p>
            <div class="text"> {{ selectedType.location }}</div>
            <p>Show in Social Media</p>
            <div class="text">Yes</div>
            <p>Esclusive Posts</p>
            <div class="text">No</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import TheTable from '../../global-components/TheTable.vue';

const database_type = ref([
  {
    name: "Main Speaker1",
    priority: 1,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker2",
    priority: 2,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker3",
    priority: 3,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker4",
    priority: 4,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker1",
    priority: 1,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker2",
    priority: 2,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker3",
    priority: 3,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker4",
    priority: 4,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker4",
    priority: 4,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker1",
    priority: 1,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker2",
    priority: 2,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker3",
    priority: 3,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker4",
    priority: 4,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker4",
    priority: 4,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker1",
    priority: 1,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker2",
    priority: 2,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker3",
    priority: 3,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  },
  {
    name: "Main Speaker4",
    priority: 4,
    number_act: 5,
    points: 500,
    location: "Main Stage"
  }
]);

const tableHeaders = {
  name: "Name",
  priority: "Priority",
  number_act: "# Activities",
  points: "Points",
  location: "Location"
};


const searchQuery = ref('');
const selectedType = ref(null);

function selectType(row) {
  selectedType.value = row;
  //console.log('Selected Row: ', row);
}

const filteredActivityType = computed(() => {
  if (!searchQuery.value) {
    return database_type.value;
  }

  const filtered = database_type.value.filter((activity) =>
    activity.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    activity.location.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  // Se não houver resultados na busca, limpar o selectedType
  if (filtered.length === 0) {
    selectedType.value = null;
  }

  return filtered;
});


const router = useRouter();

function goToLocations() {
  router.push("/activities/types/locations");
}
</script>

<style scoped>
.activity_types {
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
  overflow-y: scroll;
}

.no-act-type {
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

.items {
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

.info {
  display: flex;
  gap: 40px;
  margin-top: 1.3vh;
  margin-left: 2vh;
}

.col1 {
  display: flex;
  flex-direction: column;
  justify-self: flex-start;
  gap: 12px;
}

.col2 {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-self: flex-start;
}

.text {
  font-size: small;
  color: #4F4F4F;
}

p {
  color: rgb(32, 32, 32);
  font-weight: bold;
  font-size: small;
}
</style>