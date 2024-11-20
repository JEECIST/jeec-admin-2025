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
          <div :class="{'table-wrapper': true, 'hidden': showEditPopup || showAddPopup || showPopup}">
            <div class="scrollbar">
              <TheTable
                :data="filteredTeams"
                :tableHeaders="{ name: 'Name', event: 'Event', priority: 'Priority', members: 'Members' }"
                :searchInput="searchQuery"
                @onRowSelect="selectTeam"
              ></TheTable>
            </div>
          </div>

          <div v-if="showPopup" class="right-popup-placeholder">
            <div class="right-popup">
              <h2 class="titulo">JEEC 24</h2>
              <button class="closeX" @click="closePopup">&times;</button>
              <div class="popup-content">
                <div class="fotobola"></div>
                <h2 class="subtitulo">{{ selectedTeam.name }}</h2>
                <p class="sub-subtitulo">Team</p>
                <div class="display">
                  <button class="edit" @click="editButton">
                    <img src="/home/code/jeec-admin-2025/src/assets/pencil.svg" alt="Edit" />
                  </button>
                  <button class="edit" @click="TeamMembers">
                    <a href="/teams/members/externalid">
                      <img src="/home/code/jeec-admin-2025/src/assets/linkedin.svg" alt="Team" />
                    </a>
                  </button>
                  <button class="edit" @click="deleteTeam">
                    <img src="/home/code/jeec-admin-2025/src/assets/trash.svg" alt="Delete" />
                  </button>
                </div>
                <p class="descricao">Description:</p>
                <p class="inf1">{{ selectedTeam.description }}</p>
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

          <div v-if="showEditPopup" class="overlay">
            <div class="edit-popup">
              <div class="edit-popup-content">
                <h2>Edit Team</h2>
                <button key="closeX" class="closeX" @click="closeEditPopup">&times;</button>
                <div class="pos">
                  <form @submit.prevent="saveEdit">
                    <label for="name" class="Add-name">Name:
                      <input type="text" v-model="editTeam.name" id="name" required />
                    </label>
                    <label for="event" class="Add-name">Event:
                      <input type="text" v-model="editTeam.event" id="event" required />
                    </label>
                    <label for="priority" class="Add-name">Priority:
                      <input type="text" v-model="editTeam.priority" id="priority" required />
                    </label>
                    <label for="members" class="Add-name">Members:
                      <input type="text" v-model="editTeam.members" id="members" required />
                    </label>
                    <label for="description" class="Add-name">Description:
                      <input type="text" v-model="editTeam.description" id="description" required />
                    </label>
                    <button type="submit" class="add-team">Save</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div v-if="showAddPopup" class="overlay">
            <div class="edit-popup">
              <div class="edit-popup-content">
                <h2>Add Team</h2>
                <button key="closeX" class="closeX" @click="closeAddPopup">&times;</button>
                <form @submit.prevent="saveNewTeam"> 
                  <div class="primline">
                    <div class="Add-name">
                      <label for="name" class="">Name:</label>
                      <input type="text" v-model="newTeamName" id="name" required />
                    </div>
                    <div class="Add-event">
                      <label for="event" class="">Event:</label>
                      <select v-model="newTeamEvent" id="event">
                        <option v-for="event in events" :key="event.id" :value="event.name"> 
                          {{ event.name }}
                        </option>
                      </select>
                    </div>
                    <div class="Add-priority">
                      <label for="priority" class="">Priority:</label>
                      <input type="text" v-model="newTeamPriority" id="priority" required />
                    </div>
                  </div>
                  <div class="Description">
                      <label class="">Description:</label>
                      <input type="text" v-model="newTeamDescription" id="description" required />
                  </div>
                  <div class="primeline">
                    <div class="form-group">
                        <label class="custom-file-upload">
                          Picture:
                          <input type="file" @change="handleFileChange" class="file-input" ref="fileInput" style="display: none;" />
                          <div class="small-quadrado" @click="triggerFileInput">
                            <label class="centrado">{{ selectedFile ? selectedFile.name : 'No picture selected' }}</label>
                          </div>
                          <div class="ultline">
                            <button type="button" class="left-add">Add Picture</button>
                            <button type="submit" class="right-add">Add</button>
                        </div>
                        </label>
                        <span v-if="selectedFile">{{ selectedFile.name }}</span>
                    </div>
                  </div>
                </form>
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
        { id: 1, name: 'Team 1', event: 'Evento 1', priority: '100', members: '3', description: 'Description 1' },
        { id: 2, name: 'Team 2', event: 'Evento 2', priority: '100', members: '5', description: 'Description 2' },
        { id: 3, name: 'Team 3', event: 'Evento 3', priority: '100', members: '2', description: 'Description 3' },
        { id: 4, name: 'Team 4', event: 'Evento 1', priority: '100', members: '4', description: 'Description 4' },
        { id: 5, name: 'Team 5', event: 'Evento 2', priority: '100', members: '3', description: 'Description 5' },
        { id: 6, name: 'Team 6', event: 'Evento 3', priority: '100', members: '5', description: 'Description 6' },
        { id: 7, name: 'Team 7', event: 'Evento 1', priority: '100', members: '2', description: 'Description 7' },
        { id: 8, name: 'Team 8', event: 'Evento 2', priority: '100', members: '4', description: 'Description 8' },
        { id: 9, name: 'Team 9', event: 'Evento 3', priority: '100', members: '3', description: 'Description 9' },
        { id: 10, name: 'Team 7', event: 'Evento 1', priority: '100', members: '2', description: 'Description 10' },
        { id: 11, name: 'Team 8', event: 'Evento 2', priority: '100', members: '4', description: 'Description 11' },
        { id: 12, name: 'Team 9', event: 'Evento 3', priority: '100', members: '3', description: 'Description 12' },
        { id: 13, name: 'Team 7', event: 'Evento 1', priority: '100', members: '2', description: 'Description 13' },
        { id: 14, name: 'Team 8', event: 'Evento 2', priority: '100', members: '4', description: 'Description 14' },
        { id: 15, name: 'Team 9', event: 'Evento 3', priority: '100', members: '3', description: 'Description 15' },
        { id: 16, name: 'Team 7', event: 'Evento 1', priority: '100', members: '2', description: 'Description 16' },
        { id: 17, name: 'Team 8', event: 'Evento 2', priority: '100', members: '4', description: 'Description 17' },
        { id: 18, name: 'Team 9', event: 'Evento 3', priority: '100', members: '3', description: 'Description 18' },
        { id: 19, name: 'Team 7', event: 'Evento 1', priority: '100', members: '2', description: 'Description 19' },
        { id: 20, name: 'Team 8', event: 'Evento 2', priority: '100', members: '4', description: 'Description 20' },
        { id: 21, name: 'Team 9', event: 'Evento 3', priority: '100', members: '3', description: 'Description 21' },
        { id: 22, name: 'Team 7', event: 'Evento 1', priority: '100', members: '2', description: 'Description 22' },
        { id: 23, name: 'Team 8', event: 'Evento 2', priority: '100', members: '4', description: 'Description 23' },
        { id: 24, name: 'Team 9', event: 'Evento 3', priority: '100', members: '3', description: 'Description 24' },
        { id: 25, name: 'Team 7', event: 'Evento 1', priority: '100', members: '2', description: 'Description 25' },
        { id: 26, name: 'Team 8', event: 'Evento 2', priority: '100', members: '4', description: 'Description 26' },
        { id: 27, name: 'Team 9', event: 'Evento 3', priority: '100', members: '3', description: 'Description 27' },
      ],
      events: [
        { id: 1, name: 'Evento 1' },
        { id: 2, name: 'Evento 2' },
        { id: 3, name: 'Evento 3' },
      ],
      showPopup: false,
      showEditPopup: false,
      showAddPopup: false,
      selectedTeam: {},
      editTeam: {},
      newTeamName: '',
      newTeamEvent: '',
      newTeamPriority: '',
      newTeamDescription: '',
      selectedFile: null,
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
    },
    closePopupOnSearch() {
      this.showPopup = false;
    },
    editButton() {
      this.editTeam = { ...this.selectedTeam }; 
      this.showEditPopup = true;
    },
    saveEdit() {
      const index = this.teams.findIndex(team => team.id === this.editTeam.id);
      if (index !== -1) {
        this.teams.splice(index, 1, this.editTeam); 
        this.selectedTeam = { ...this.editTeam }; 
        this.showEditPopup = false;
        // Fechar o popup da direita se estiver no telemóvel
        if (window.innerWidth <= 768) {
          this.showPopup = false;
        }
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
      this.$router.push({ name: 'teams-members'}); 
    },
    openAddPopup() {
      this.showAddPopup = true;
    },
    closeAddPopup() {
      this.showAddPopup = false;
    },
    saveNewTeam() {
      const newTeam = {
        id: this.teams.length + 1,
        name: this.newTeamName,
        event: this.newTeamEvent,
        priority: this.newTeamPriority,
        members: this.newTeamMembers,
        description: this.newTeamDescription,
      };
      this.teams.push(newTeam);
      this.closeAddPopup(); 
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
  },
};
</script>

<style scoped>
.teams {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #FFFFFF;
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
  height: 100%;
}

.headerteams {
  display: flex;
  justify-content: space-between; 
  margin-bottom: 20px;
  transition: width 0.3s ease;
  gap: 1%;
}

.headerteams-shrink {
  width: calc(100% - 320px);
}

.searchteam {
  display: flex;
  position: relative;
  width: 100%;
  height: 49px;
  background-color: #EBF6FF;
  border-radius: 10px;
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
  padding-right: 5px;
}

.evento {
  display: flex;
  margin-left: 0;
}

.evento select {
  width: 100%; 
  height: 49px; 
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  padding: 1.5rem;
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
  height: 100%;
}

.table-wrapper-shrink {
  flex-grow: 0.7;
  width: calc(100% - 320px);
}

/* recurso */
.right-popup-placeholder {
  width: 300px;
  margin-left: 20px;
  border-radius: 10px;
  background-color: var(--c-accent);
  margin-top: -70px;
}

.right-popup {
  padding: 20px;
  position: relative; /* Ensure the close button is positioned relative to the popup */
}

.popup-content {
  padding: 2vh;
  padding-top: 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/*box de fundo não completa*/
.form {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--c-accent);
  height: calc(100% + 500rem);
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
  color: var(--c-text);
  margin-top: 6vh;
  font-weight: bold;
}

.subtitulo {
  text-align: center;
  font-size: 1.25rem;
  color: var(--c-text);
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;
  font-weight: bold;
}

.sub-subtitulo {
  text-align: center;
  font-size: 1.2rem;
  color: var(--c-text);
  opacity: 0.5;
  margin-bottom: 2.75vh;
  margin-top: 1.25vh;
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
  margin-bottom: 3vh;
  margin-top: 3vh;
}

.display {
  display: flex;
  justify-content: space-between;
  gap: 1vh;
}

.descricao {
  width: 100%;
  font-size: 1rem;
  margin-top: 4vh;
  font-weight: bold;
  color: var(--c-text);
  margin-bottom: 0.5vh;
}

.direita {
  width: 100%;
  font-size: 1rem;
  color: var(--c-text);
  margin-top: 3vh;
  font-weight: bold;
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
  gap: 4vh;
}


.overlay {
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
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.edit-popup-content {
  display: flex;
  flex-direction: column;
}

.edit-popup-content h2 {
  margin-bottom: 20px;
}

.edit-popup-content form {
  display: flex;
  flex-direction: column;
}

.edit-popup-content form label {
  margin-bottom: 5px;
  width: 100%;
}

.edit-popup-content form input {
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
}

.edit-popup-content form button {
  margin-top: 10px;
}

.editpopup {
  font-size: 1rem;
  font-weight: bold;
  color: var(--c-text);
  margin-top: 10px;
  margin-bottom: 5px;
}

.scrollbar {
  overflow-y: auto;
  height: calc(100% - 21vh);
}

.primline {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 2.5%;
}

.Add-name, .Add-event, .Add-priority {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}

.Add-name input, .Add-priority input {
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
}

.Add-event {
  display: flex;
}

.Add-event select {
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  margin-bottom: 0;
}

.Description {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 15px;
}

.Description input {
  width: 100%;
  height: 70px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  padding: 1.5rem;
}

.custom-file-upload {
  position: relative;
  display: inline-block;
  width: 100%;
}

.pictbtn {
  background-color: var(--c-select);
  color: white;
  border: none;
  border-radius: 10px;
  height: 49px;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
}

.small-quadrado {
  max-width: 100%;
  width: 15vh;
  height: 15vh;
  background-color: var(--c-accent);
  border-radius: 5px;
  margin: 10px 0 10px 0;
}

.centrado {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 50%;
  font-size: 1rem;
  color: var(--c-text);
}

.form-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.primeline {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.ultline {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.left-add {
  background-color: var(--c-select);
  color: white;
  border-radius: 10px;
  border: none;
  height: 49px;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5ch 3ch;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-add {
  background-color: #152259;
  color: white;
  border-radius: 10px;
  border: none;
  height: 49px;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5ch 3ch;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pos {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.teams table {
  margin-bottom: 3ch;
}

@media (max-width: 768px) {

.headerteams {
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.searchteam {
  width: 100%;
  margin-bottom: 10px;
}

.evento {
  width: 100%;
  margin-bottom: 1vh;
}

.add-team {
  width: 100%;
}

.edit-popup {
  width: 90%;
  height: 65%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: auto;
}

.table-wrapper {
  padding-bottom: calc(5rem + 1vh);
}

.table-wrapper.hidden {
  display: none; 
}

.right-popup-placeholder {
  width: 100%;
  margin-left: 0;
  height: fit-content;
  margin-top: 0;
}
.right-popup {
  width: 90%;
  position: fixed;
  top: 8.5rem;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px;
  display: block;
  overflow: auto;
  background-color: var(--c-accent);
  border-radius: 10px;
}

.popup-content {
  width: 100%;
  height: auto;
}
}
</style>