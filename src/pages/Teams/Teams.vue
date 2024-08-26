<template>
  <div class="teams">
    <div class="headerteams">
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

    <div v-if="filteredTeams.length === 0" class="form">
      <label class="no-teams">No teams found</label>
    </div>

    <TheTable
      :data="filteredTeams"
      :tableHeaders="tableHeaders"
      :buttons="tableButtons"
      :searchInput="searchQuery"
      @onRowSelect="selectTeam"
    />
  </div>
</template>

<script>
import TheTable from '../../global-components/TheTable.vue';

export default {
  data() {
    return {
      selectedEvent: 'Select an event',
      searchQuery: '',
      events: [
        { id: 1, name: '-' },
        { id: 2, name: 'Evento 1' },
        { id: 3, name: 'Evento 2' },
        { id: 4, name: 'Evento 3' },
      ],
      teams: [
        { id: 1, name: 'Team 1' },
        { id: 2, name: 'Team 2' },
        { id: 3, name: 'Team 3' },
      ],
    };
  },
  computed: {
    filteredTeams() {
      return this.teams.filter(team => 
        team.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    handleEventChange() {
      console.log(this.selectedEvent);
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

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--c-accent);
  height: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  flex-grow: 1;
}

.no-teams {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--c-text);
  font-size: 1.5rem;
  font-weight: 600;
}
</style>