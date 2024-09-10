<template>
  <div class="teams">
    <div class="wrapper">
      <div class="header-wrapper">
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
      </div>

      <div class="content-wrapper">
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
              <h2 class="titulo">JEEC25</h2>
              <button class="closeX" @click="closePopup">&times;</button>
              <div class="popup-content">
                <div class="fotobola"></div>
                <h2 class="subtitulo">Webdev</h2>
                <p class="sub-subtitulo">Team</p>
                <div class="display">
                  <button class="edit" @click="editButton">
                    <img src="/home/code/jeec-admin-2025/src/assets/pencil.svg" alt="Edit" />
                  </button>
                  <button class="edit" @click="TeamMembers">
                    <img src="/home/code/jeec-admin-2025/src/assets/linkedin.svg" alt="Team" />
                  </button>
                  <button class="edit" @click="Delete">
                    <img src="/home/code/jeec-admin-2025/src/assets/trash.svg" alt="Team" />
                  </button>
                </div>
                <p class="descricao">Description:</p>
                <p class="inf1">a melhor e a que mais trabalha</p>
                <div class="linha">
                  <p class="direita">Priority:</p>
                  <p class="direita">Members:</p>
                </div>
                <div class="linha">
                  <p class="opaco">{{ selectedTeam.priority }}</p>
                  <p class="opaco">{{ selectedTeam.members }}</p>
                </div>
              </div>
            </div>
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
      editButton: {},
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
    editButton() {
      this.editButton = true;
      console.log(this.editButton);
    },
    TeamMembers() {
      console.log('Team Members');
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

.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.header-wrapper {
  flex: 0 0 auto;
}

.content-wrapper {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.headerteams {
  display: flex;
  justify-content: space-between; 
  margin-bottom: 20px;
  transition: width 0.3s ease;
}

.headerteams-shrink {
  width: calc(100% - 320px); /* 300px for popup + 20px margin */
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
  margin-top: -70px;
}

.right-popup {
  padding: 20px;
  position: relative; /* Ensure the close button is positioned relative to the popup */
}

.popup-content {
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-top: 10px;
  font-weight: bold;
}

.subtitulo {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--c-text);
  margin-bottom: 10px;
  font-weight: bold;
}

.sub-subtitulo {
  text-align: center;
  font-size: 1.2rem;
  color: var(--c-text);
  opacity: 0.5;
  margin-bottom: 10px;
}

.inf {
  text-align: center;
  font-size: 1rem;
  color: var(--c-text);
  display: space-between;
  margin-top: 10px;
  opacity: 0.5;
}

.inf1 {
  width: 100%;
  font-size: 0.8rem;
  color: var(--c-text);
  opacity: 0.5;
  display: space-between;
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

.edit {
  width: 36px;
  height: 36px;
  background: #FFFFFF;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
}

.fotobola {
  width: 165px;
  height: 165px;
  background-color: #000000;
  border-radius: 50%;
  margin-bottom: 10px;
  margin-top: 0;
}

.display {
  display: flex;
  justify-content: space-between;
  gap: 5px;
}

.descricao {
  width: 100%;
  font-size: 1rem;
  margin-top: 20px;
  font-weight: bold;
  color: var(--c-text);
  margin-bottom: 5px;
}

.direita {
  width: 100%;
  font-size: 1rem;
  color: var(--c-text);
  margin-top: 10px;
  font-weight: bold;
  margin-bottom: 5px;
}

.opaco {
  width: 100%;
  font-size: 0.8rem;
  color: var(--c-text);
  margin-top: 5px;
  opacity: 0.5;
}

.linha {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

</style>