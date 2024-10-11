<template>
  <div class="squads-app-container">
    <div class="header">
      <div class="search-container">
        <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search for a squad" 
          class="search-bar" 
          v-model="searchQuery" 
        />
      </div>
    </div>

    <div class="content">
      <!-- Squads table on the left side -->
      <div :class="['squads-table-container', { 'full-width': !selectedSquad }]">
        <TheTable
          :data="filteredSquads"
          :tableHeaders="tableHeaders"
          :buttons="tableButtons"
          :searchInput="searchQuery"
          @onRowSelect="selectSquad"
        />
        <div v-if="!filteredSquads.length" class="no-squads">
          No Squads found
        </div>
      </div>

      <!-- Squad details on the right side -->
      <div class="squad-detail" v-if="selectedSquad">
        <p class="squad-name">{{ selectedSquad.name }}</p>
        <img class="squad-pic" src="../../assets/StudentApp/example_squad_photo.svg" alt="Squad Picture" />
        <h3>{{ selectedSquad.name }}</h3>
        <p class="role">Squad</p>
        <div class="squad-actions">
          <div class="action-button icon-combination">
            <img class="icon-base" src="../../assets/StudentApp/students3.svg" alt="Icon Base">
            <img class="icon-overlay" src="../../assets/StudentApp/squads1.svg" alt="Icon Overlay">
          </div>
          <div class="action-button">
            <img src="../../assets/StudentApp/students4.svg" alt="Icon 2">
          </div>
        </div>
        <p class="captain-username">Captain Username</p>
        <p class="captain">{{ selectedSquad.captainUsername }}</p>
        <p class="members-username">Members Usernames</p>
        <div class="members">
          <p v-for="(member, index) in selectedSquad.members" :key="index">{{ member }}</p>
        </div>
        <div class="points">
          <div>
            <p class="points-title">Daily Points</p>
            <p class="points-value">{{ selectedSquad.dailyPoints }}</p>
          </div>
          <div>
            <p class="points-title">Total Points</p>
            <p class="points-value">{{ selectedSquad.totalPoints }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TheTable from '../../global-components/TheTable.vue';

const squads = ref([
  {
    id: 1,
    name: 'Interracial Rangers',
    captainUsername: 'marco_looongo',
    dailyPoints: 420,
    totalPoints: 11111,
    members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delas'],
  },
  {
    id: 1,
    name: 'Interracial Rangersssssss',
    captainUsername: 'marco_looongo',
    dailyPoints: 420,
    totalPoints: 11111,
    members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delasssssssssssssssssssssssss'],
  },
  {
    id: 1,
    name: 'Interracial Rangers',
    captainUsername: 'marco_looongo',
    dailyPoints: 420,
    totalPoints: 11111,
    members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delas'],
  },
  {
    id: 1,
    name: 'Interracial Rangers',
    captainUsername: 'marco_looongo',
    dailyPoints: 420,
    totalPoints: 11111,
    members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delas'],
  },
  {
    id: 1,
    name: 'Interracial Rangers',
    captainUsername: 'marco_looongo',
    dailyPoints: 420,
    totalPoints: 11111,
    members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delas'],
  },
  {
    id: 1,
    name: 'Interracial Rangers',
    captainUsername: 'marco_looongo',
    dailyPoints: 420,
    totalPoints: 11111,
    members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delas'],
  },
  {
    id: 1,
    name: 'Interracial Rangers',
    captainUsername: 'marco_looongo',
    dailyPoints: 420,
    totalPoints: 11111,
    members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delas'],
  },
  {
    id: 1,
    name: 'Interracial Rangers',
    captainUsername: 'marco_looongo',
    dailyPoints: 420,
    totalPoints: 11111,
    members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delas'],
  },
  {
    id: 1,
    name: 'Interracial Rangers',
    captainUsername: 'marco_looongo',
    dailyPoints: 420,
    totalPoints: 11111,
    members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delas'],
  },
  {
    id: 1,
    name: 'Interracial Rangers',
    captainUsername: 'marco_looongo',
    dailyPoints: 420,
    totalPoints: 11111,
    members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delas'],
  },
  {
    id: 1,
    name: 'Interracial Rangers',
    captainUsername: 'marco_looongo',
    dailyPoints: 420,
    totalPoints: 11111,
    members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delas'],
  },
  {
    id: 1,
    name: 'Interracial Rangers',
    captainUsername: 'marco_looongo',
    dailyPoints: 420,
    totalPoints: 11111,
    members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delas'],
  },
  {
    id: 1,
    name: 'Interracial Rangers',
    captainUsername: 'marco_looongo',
    dailyPoints: 420,
    totalPoints: 11111,
    members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delas'],
  },
  {
    id: 1,
    name: 'Interracial Rangers',
    captainUsername: 'marco_looongo',
    dailyPoints: 420,
    totalPoints: 11111,
    members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delas'],
  },
  {
    id: 1,
    name: 'Interracial Rangers',
    captainUsername: 'marco_looongo',
    dailyPoints: 420,
    totalPoints: 11111,
    members: ['andregay', 'joel_big_wang', 'paradela_o_rei_delas'],
  },
]);

const searchQuery = ref('');
const selectedSquad = ref(null);

const tableHeaders = {
  id: "ID",
  name: "Name",
  captainUsername: "Captain Username",
  dailyPoints: "Daily Points",
  totalPoints: "Total Points"
};

const filteredSquads = computed(() => {
  if (!searchQuery.value.trim()) {
    // If the search query is empty or just spaces, return all squads
    return squads.value;
  }

  return squads.value.filter(squad =>
    squad.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    squad.captainUsername.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectSquad = (squad) => {
  selectedSquad.value = squad;
};
</script>

<style scoped>
.squads-app-container {
  background: #FFFFFF;
  display: flex;
  flex-direction: column; 
  width: 100%;
  margin: auto;
  padding: 60px 50px 50px 50px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem; 
}

.search-container {
  background-color: #EBF6FF; 
  position: relative;
  width: 100%; 
  max-width: 1500px; 
  height: 49px; 
  border-radius: 8px; 
  padding: 16px, 20px, 16px, 16px; 
}

.search-icon {
  color: #8A8A8A;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
}

.search-bar {
  color: #8A8A8A;
  width: 100%;
  height: 49px;
  padding: 16px 20px 16px 50px;
  border: none;
  border-radius: 8px;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 14px; 
  font-weight: 500;
  background-color: #EBF6FF;
}

.content {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start; 
}

.squads-table-container {
  flex: 1;
  overflow-x: auto;
}

.squad-actions {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.action-button {
  background-color: #FFFFFF;
  display: flex;
  width: 36px;
  height: 36px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  color: #1A1A1A;
}

.action-button img {
  width: 20px;
  height: 20px;
}

.icon-combination {
  position: relative;
  width: 36px;
  height: 36px;
}

.icon-base {
  width: 100%;
  height: 100%;
  position: relative;
}

.icon-overlay {
  width: 70%;
  height: 70%;
  position: absolute;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%); /* Center the overlay icon */
}

.no-squads {
  display: flex;
  background-color: #EBF6FF;
  font-size: 28px;
  width: 100%; 
  max-width: 1500px; 
  height: calc(100vh - 100px); /* viewport height - padding for the header */
  padding: 2rem;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #4F4F4F;
  border-radius: 8px;
  margin: -2rem auto; 
  box-sizing: border-box; 
}

.squad-detail {
  display: flex;
  background-color: #EBF6FF;
  width: 323px;
  height: auto; 
  border-radius: 16px;
  padding: 35px;
  flex-direction: column;
  align-items: center;
  margin: 0; 
  text-align: center; 
  max-height: 100vh;
  overflow-y: auto; 
}

.squad-pic {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

h3 {
  color: #1A1A1A;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  line-height: 29.77px; 
  margin-top: 10px;
}

.squad-name {
  color: #424242;
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 10px;
  word-wrap: break-word;
  max-width: 100%;
}

.role {
  color: #A7A7A7;
  font-size: 18px;
  width: 108px;
  height: 22px;
  font-weight: 500;
  text-align: center;
  margin: 10px 0;
}

.captain-username, .members-username {
  color: #1A1A1A;
  font-size: 12px;
  text-align: left;
  width: 100%; 
  font-weight: 600;
  margin: 5px 0;
}

.captain, .members {
  color: #A7A7A7;
  font-size: 14px;
  text-align: left; 
  width: 100%;
  font-weight: 500;
  margin: 5px 0;
  word-wrap: break-word;
}

.points {
  display: flex;
  justify-content: space-between;
  text-align: left; 
  width: 100%;
}

.points-title {
  color: #1A1A1A;
  font-size: 12px;
  font-weight: 700;
  margin: 5px 0;
}

.points-value {
  color: #A7A7A7;
  font-size: 14px;
  font-weight: 500;
  margin: 5px 0;
}
</style>
