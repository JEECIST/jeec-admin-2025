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
          <button class="add-team" @click="openAddPopup">Add Team</button>
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
              :selectedRowIndex="selectedRowIndex"
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
                  <button class="edit" @click="deleteTeam">
                    <img src="/home/code/jeec-admin-2025/src/assets/trash.svg" alt="Delete" />
                  </button>
                </div>
                <p class="descricao">Description:</p>
                <p class="inf1">A melhor e a que mais trabalha</p>
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

          <div v-if="showEditPopup" class="modal-overlay-add">
            <div class="edit-popup-content">
              <h2>Edit Team</h2>
              <form @submit.prevent="saveEdit" class="popup_form">
                <div class="name-event">
                  <div class="form-group">
                    <label for="editTeamName" class="labels">Name</label>
                    <input type="text" v-model="editTeam.name" id="editTeamName" required class="formUsername" />
                  </div>
                  <div class="form-group">
                    <label for="editTeamEvent" class="labels">Event</label>
                    <input type="text" v-model="editTeam.event" id="editTeamEvent" required class="formRole" />
                  </div>
                </div>
                <div class="form-group">
                  <label for="editTeamPriority" class="labels">Priority</label>
                  <input type="text" v-model="editTeam.priority" id="editTeamPriority" required class="formRole" />
                </div>
                <div class="form-group">
                  <label for="editTeamMembers" class="labels">Members</label>
                  <input type="text" v-model="editTeam.members" id="editTeamMembers" required class="formRole" />
                </div>
                <div class="modal-actions">
                  <button type="button" @click="closeEditPopup" class="add-team">Cancel</button>
                  <button type="submit" class="add-team">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredTeams.length === 0" class="form">
      <label class="no-teams">No teams found</label>
    </div>
  </div>

  <div v-if="showAddPopup" class="modal-overlay-add">
    <div class="edit-popup-content">
      <button class="closeX" @click="closePopup">&times;</button>
      <h2>Add Team</h2>
      <form @submit.prevent="saveNewTeam" class="popup_form">
        <div class="name-event">
          <div class="form-group">
            <label for="newTeamName" class="labels">Name</label>
            <input type="text" v-model="newTeamName" id="newTeamName" required class="formUsername" />
          </div>
          <div class="form-group">
            <label for="newTeamEvent" class="labels">Event</label>
            <input type="text" v-model="newTeamEvent" id="newTeamEvent" required class="formRole" />
          </div>
          <div class="form-group">
            <label for="newTeamPriority" class="labels">Priority</label>
            <input type="text" v-model="newTeamPriority" id="newTeamPriority" required class="formRole" />
          </div>
        </div>
        <div class="form-group">
          <label for="newTeamMembers" class="labels">Description</label>
          <input type="text" v-model="Description" id="newTeamMembers" required class="formRole" />
        </div>
        <div class="form-group">
          <label for="newTeamPicture" class="labels">Picture</label>
          <div class="small-quadrado"></div>
        </div>
        <div class="modal-actions">
          <label class="custom-file-upload">
            <input type="file" id="newTeamPicture" @change="handleFileChange"/>
            <span>Add Picture</span>
          </label>
          <span v-if="selectedFile">{{ selectedFile.name }}</span>
          <button type="submit" class="add">Add</button>
        </div>
      </form>
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
      showEditPopup: false,
      selectedTeam: {},
      editTeam: {},
      selectedRowIndex: null,
      showAddPopup: false,
      newTeamName: '',
      newTeamEvent: '',
      newTeamPriority: '',
      newTeamMembers: '',
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
    selectTeam(row, index) {
      this.selectedTeam = row;
      this.selectedRowIndex = index;
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
      this.selectedTeam = {};
      this.selectedRowIndex = null;
    },
    editButton() {
      this.editTeam = { ...this.selectedTeam };
      this.showEditPopup = true;
      this.showPopup = false;
    },
    saveEdit() {
      const index = this.teams.findIndex(team => team.id === this.editTeam.id);
      if (index !== -1) {
        this.teams.splice(index, 1, this.editTeam);
        this.selectedTeam = { ...this.editTeam };
        this.showEditPopup = false;
      }
    },
    closeEditPopup() {
      this.showEditPopup = false;
    },
    deleteTeam() {
      this.teams = this.teams.filter(team => team.id !== this.selectedTeam.id);
      this.closePopup();
    },
    TeamMembers() {
      console.log('Team Members');
    },
    openAddPopup() { 
      this.showAddPopup = true;
      console.log('Add Team');
    },
    closeAddPopup() {
      this.showAddPopup = false;
      console.log('Close Add Team Popup');
    },
    saveNewTeam() {
      const newTeam = {
        id: this.teams.length + 1,
        name: this.newTeamName,
        event: this.newTeamEvent,
        priority: this.newTeamPriority,
        members: this.newTeamMembers,
      };
      this.teams.push(newTeam);
      this.closeAddPopup();
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
  margin-top: 10px;
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
}

.edit-popup {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 50%;
  height: 70%;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
}

.edit-popup-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
} 

.edit-popup-content form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
}

.popup_form {
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.edit-popup h2 {
  margin-top: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.formUsername, .formRole {
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  padding: 0.5rem;
  margin-right: 10px;
  padding-left: 1.5rem;
}

.popup, .formRole label, .formUsername label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
}

.add-popup-name {
  display: block;
  margin-top: 1rem;
  font-weight: 500;
  font-size: 0.8rem;
  color: var(--c-text);
  opacity: 0.5;
}

.modal-overlay-add {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
}

.edit-popup-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 600px;
  height: auto; 
}

.name-event {
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
}

.add-teams {
  height: 49px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  background-color: darkblue;
  border-radius: 10px;
  color: white;
  padding: 0.5ch 3ch;
  cursor: pointer;
  outline: none;
  justify-content: flex-end;
}

.labels {
  display: flex;
  flex-direction: column;
  color: #515151;
  font-size: smaller;
  height: 100%;
  opacity: 0.8;
}

.add {
  background-color: #152259;
  color: white;
  border-radius: 5px;
  border: none;
  display: inline-block;
  margin-left: auto;
  width: 8.4vw;
  height: 40px;
  align-items: center;
  justify-content: center;
  gap: 10vh;
  cursor: pointer;
}

.custom-file-upload {
  position: relative;
  display: inline-block;
}

.custom-file-upload input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.custom-file-upload span {
  background-color: var(--c-select);
  color: white;
  border: none;
  border-radius: 4px;
  height: 40px;
  font-size: 1rem;
  padding: 0.5ch 3ch;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.small-quadrado {
  width: 20%;
  height: 100px;
  background-color: var(--c-accent);
  border-radius: 4px;
}

</style>