<template>
  <div class="teams">
    <div :class="{'headerteams': true, 'headerteams-shrink': showPopup}">
      <div class="searchteam">
        <svg xmlns="http://www.w3.org/2000/svg" class="searchicon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search for a team" 
          class="searchbar" 
          v-model="searchQuery" 
        />
      </div>

      <div class="evento">
        <select v-model="selectedEvent" id="event" @change="handleEventChange">
          <option v-for="event in events" :key="event.id" :value="event.name"> 
            {{ event.name }}
          </option>
        </select>
      </div>
      <button class="add-team">Add Team</button>
    </div>

    <div class="content-container">
      <div :class="{'table-wrapper': true, 'table-wrapper-shrink': showPopup}">
        <TheTable
          :data="filteredTeams"
          :tableHeaders="{ name: 'Name', event: 'Event', priority: 'Priority', members: 'Members' }"
          :searchInput="searchQuery"
          @onRowSelect="selectTeam"
        ></TheTable>
      </div>

      <div v-if="showPopup" class="right-popup-placeholder">
        <div class="right-popup">
          <button class="closeX" @click="closePopup">&times;</button>
          <div class="popup-content">
            <h2 class="titulo">Team Details</h2>
            <p class="inf">Team Name: {{ selectedTeam.name }}</p>
            <p class="inf">Event: {{ selectedTeam.event }}</p>
            <p class="inf">Priority: {{ selectedTeam.priority }}</p>
            <p class="inf">Members: {{ selectedTeam.members }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredTeams.length === 0" class="form">
      <label class="no-teams">No teams found</label>
    </div>
  </div>
</template>

<script>
import TheTable from '../../global-components/TheTable.vue';

export default {
  name: 'Teams',
  components: {
    TheTable,
  },
  data() {
    return {
      selectedEvent: 'Select an event',
      searchQuery: '',
      teams: [
        { id: 1, name: 'Team 1', event: 'Evento 1', priority: '100', members: '3' },
        { id: 2, name: 'Team 2', event: 'Evento 2', priority: '100', members: '5' },
        { id: 3, name: 'Team 3', event: 'Evento 3', priority: '100', members: '2' },
      ],
      events: [
        { id: 1, name: 'Evento 1' },
        { id: 2, name: 'Evento 2' },
        { id: 3, name: 'Evento 3' },
      ],
      showPopup: false,
      selectedTeam: {},
    };
  },
  computed: {
    filteredTeams() {
      const filtered = this.teams.filter(team => 
        team.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      if (filtered.length === 0) {
        this.closePopup();
      }
      return filtered;
    },
  },
  methods: {
    handleEventChange() {
      console.log(this.selectedEvent);
    },
    selectTeam(row) {
      this.selectedTeam = row;
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
      this.selectedTeam = {}; // Deselect the team
    },
  },
};
</script>

<style scoped>
.teams {
  display: flex;
  flex-direction: column;
  width: calc(200dvh - var(--sidebar-width));
  background: #FFFFFF;
  height: calc(100vh - var(--header-height));
  overflow: hidden;
  box-sizing: border-box;
  padding: 49px 3ch 3ch 3ch;
}

.headerteams {
  display: flex;
  justify-content: space-between; 
  margin-bottom: 20px;
  transition: width 0.3s ease;
}

.headerteams-shrink {
  width: calc(100% - 320px); /* 300px popup + 20px margem */
}

.searchteam {
  display: flex;
  position: relative;
  width: 100%;
  height: 49px;
  background-color: #EBF6FF;
  border-radius: 10px;
  margin-right: 10px;
}

.searchicon {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #8A8A8A;
}

.searchbar {
  width: 100%;
  height: 100%;
  padding-left: 40px;
  border: none;
  background-color: #EBF6FF;
  border-radius: 10px;
  outline: none;
}

.evento {
  display: flex;
}

.evento select {
  width: 100%; 
  height: 49px; 
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  padding: 1.5rem;
  margin-right: 10px;
  padding-left: 1.5rem;
}

.add-team {
  height: 49px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  background-color: var(--c-select);
  border-radius: 10px;
  color: white;
  padding: 0.5ch 3ch;
  cursor: pointer;
  outline: none;
}

.content-container {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
}

.table-wrapper {
  flex-grow: 1;
  transition: flex-grow 0.3s ease;
}

.table-wrapper-shrink {
  flex-grow: 0.7;
  width: calc(100% - 320px);
}

.right-popup-placeholder {
  width: 300px;
  margin-left: 20px;
  border-radius: 10px;
  background-color: var(--c-accent);
  height: calc(100% + 70px);
  margin-top: -70px; /*conteiners errados*/
}

.right-popup {
  padding: 20px;
  position: relative;
}

.popup-content {
  padding: 20px;
  border-radius: 10px;
}

.form {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--c-accent);
  height: calc(100% + 49px);
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  flex-grow: 1;
  margin-top: -40px; /*conteiners errados*/
}

.no-teams {
  position: absolute;
  height: 49px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--c-text);
  font-size: 1.5rem;
  font-weight: 600;
}

.titulo {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--c-text);
  margin-bottom: 20px;
}

.inf {
  text-align: center;
  font-size: 1rem;
  color: var(--c-text);
}

.closeX {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--c-text);
}
</style>