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
              @input="closePopupOnSearch"
            />
          </div>
          <div class="evento">
            <label for="event" class="Add-event">
              <div class="nomes"></div>
            </label>
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
          <div class="table-wrapper">
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
              <h2 class="titulo">{{ selectedEvent }}</h2>
              <button class="closeX" @click="closePopup">&times;</button>
              <div class="popup-content">
                <div class="fotobola">
                  <img :src="image" />
                </div>
                <h2 class="subtitulo">{{ selectedTeam.name }}</h2>
                <p class="sub-subtitulo">Team</p>
                <div class="display">
                  <button class="edit" @click="editButton">
                    <img src="../../assets/edit_btn.svg" alt="Edit" />
                  </button>
                  <router-link :to="{ name: 'teams-members', params: { external_id: selectedTeam.external_id } }">
                    <button class="edit" @click="TeamMembers(selectedTeam.external_id)">
                      <img src="../../assets/linkedin.svg" alt="Team" />
                    </button>
                  </router-link>
                  <button class="edit" @click="deleteTeam(selectedTeam.external_id, selectedTeam.event)">
                    <img src="../../assets/trash.svg" alt="Delete" />
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
          <div v-if="showAddPopup" class="overlay">
            <div class="edit-popup">
              <div class="edit-popup-content">
                <h2>Add Team</h2>
                <button key="closeX" class="closeX" @click="closeAddPopup">&times;</button>
                <div class="primline">
                  <div class="Add-name">
                    <label for="name" class="nomes">Name:</label>
                    <input type="text" v-model="newTeamName" id="name" required />
                  </div>
                  <div class="Add-event">
                    <label for="event" class="nomes">Event:</label>
                    <select v-model="newTeamEvent" id="event">
                      <option v-for="event in events" :key="event.id" :value="event.id"> 
                        {{ event.name }}
                      </option>
                    </select>
                  </div>
                  <div class="Add-priority">
                    <label for="priority" class="nomes">Priority:</label>
                    <input type="text" v-model="newTeamPriority" id="priority" required />
                  </div>
                </div>
                <div class="Description">
                  <label class="nomes">Description:</label>
                  <input type="text" v-model="newTeamDescription" id="description" required />
                </div>
                <div class="primeline">
                  <div class="form-group">
                    <label class="custom-file-upload">
                      Picture:
                      <form @submit.prevent="saveNewTeam">
                          <input type="file" @change="handleFileChange" class="file-input" ref="fileInput" style="display: none;" />
                          <div class="small-quadrado" @click="triggerFileInput">
                            <label class="centrado">No picture selected</label>
                          </div>
                          <div class="ultline">
                            <button type="button" class="left-add" @click="triggerFileInput">Add Picture</button>
                            <button type="submit" class="right-add">Save</button>
                          </div>
                      </form>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showEditPopup" class="overlay">
            <div class="edit-popup">
              <div class="edit-popup-content">
                <h2>Edit Team</h2>
                <button key="closeX" class="closeX" @click="closeEditPopup">&times;</button>
                <div class="primline">
                  <div class="Add-name">
                    <label for="name" class="nomes">Name:</label>
                    <input type="text" v-model="editTeam.name" id="name" required />
                  </div>
                  <div class="Add-event">
                    <label for="event" class="nomes">Event:</label>
                    <select v-model="editTeam.event_id" id="event">
                      <option v-for="event in events" :key="event.id" :value="event.id"> 
                        {{ event.name }}
                      </option>
                    </select>
                  </div>
                  <div class="Add-priority">
                    <label for="priority" class="nomes">Priority:</label>
                    <input type="text" v-model="editTeam.priority" id="priority" required />
                  </div>
                </div>
                <div class="Description">
                  <label class="nomes">Description:</label>
                  <input type="text" v-model="editTeam.description" id="description" required />
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
                        <button type="button" class="left-add" @click="triggerFileInput">Add Picture</button>
                        <button @click="saveEdit(selectedTeam.external_id)" class="right-add">Save</button>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
      teams: [],
      events: [],
      searchQuery: '',
      selectedEvent: '',
      showPopup: false,
      showEditPopup: false,
      showAddPopup: false,
      selectedTeam: {},
      selectedPriority: '',
      selectedMembers: '',
      editTeam: {},
      newTeamName: '',
      newTeamEvent: '',
      newTeamPriority: '',
      newTeamDescription: '',
      newTeamMembers: '',
      imageUrl: '',
      selectedFile: null,
      filetoUpload: null,
      image: null,
    };
  },
  computed: {
    filteredTeams() {
      return this.teams.filter(team => {
        const matchesSearchQuery = team.name && team.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesSelectedEvent = this.selectedEvent ? (team.event && team.event.toLowerCase() === this.selectedEvent.toLowerCase()) : true;
        return matchesSearchQuery && matchesSelectedEvent;
      });
    },
  },
  mounted() {
    this.fetchTeams();
  },
  methods: {
    fetchTeams() {
      axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/teams-vue', {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }).then(response => {
        const data = response.data;
        this.teams = data.teams;
        this.events = data.events;
      });
    },
    TeamMembers(external_id) {
      this.$router.push({ name: 'teams-members', params: { external_id: external_id } });
    },
    handleEventChange() {
      console.log(this.selectedEvent);
    },
    fetchTeamImage(external_id) {
      axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/getimageteam', 
        { external_id: external_id },
        {
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
          },
        }
      ).then(response => {
        this.image = import.meta.env.VITE_APP_JEEC_BRAIN_URL.replace('/admin', '') + response.data.image;
        console.log(this.image);
      });
    },
    selectTeam(row) {
      this.selectedTeam = row;
      this.selectedEvent = row.event;
      this.selectedPriority = row.priority;
      this.selectedMembers = row.members;
      this.showPopup = true;
      this.fetchTeamImage(row.external_id);
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
    saveEdit(external_id) {
      const formData = new FormData();
      formData.append("name", this.editTeam.name);
      formData.append("description", this.editTeam.description);
      formData.append("website_priority", this.editTeam.priority);
      formData.append("event_name", this.editTeam.event);
      formData.append("external_id", external_id);
      if (this.selectedFile) {
        formData.append("fd", this.selectedFile);
      }
      axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/team/updateteam', formData,
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }).then((response) => {
        const updatedTeam = response.data;
        console.log(updatedTeam);
        this.teams.push ({
          ...updatedTeam,
          website_priority: this.editTeam.priority,
          description: this.editTeam.description,
        });
        this.fetchTeams();
        this.closeEditPopup();
        this.closePopup();
      });
    },
    openAddPopup() {
      this.showAddPopup = true;
    },
    closeAddPopup() {
      this.showAddPopup = false;
    },
    closeEditPopup() {
      this.showEditPopup = false;
    },
    saveNewTeam() {
      const formData = new FormData();
      formData.append("name", this.newTeamName);
      formData.append("description", this.newTeamDescription);
      formData.append("website_priority", this.newTeamPriority);
      formData.append("event_id", this.newTeamEvent);
      // formData.append("members", this.newTeamMembers);
      if (this.selectedFile) {
        formData.append("team_image", this.selectedFile);
      }
  
      axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/new-team-vue', formData ,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        } 
      }).then(response => {
        const newTeam = response.data;
        console.log(newTeam);
        this.teams.push({
          ...newTeam,
          priority: this.newTeamPriority,
          members: this.newTeamMembers,
          image: response.data.image,
        });
        this.fetchTeams();
        this.closeAddPopup();
        this.resetNewTeamForm();
      });
    },
    resetNewTeamForm() {
      this.newTeamName = '';
      this.newTeamEvent = '';
      this.newTeamPriority = '';
      this.newTeamDescription = '';
      this.newTeamMembers = '';
      this.selectedFile = null;
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    deleteTeam(external_id, event_name) {
      axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/team/delete', {
        external_id: external_id,
        event_name: event_name
      }, {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }).then(response => {
        this.teams = this.teams.filter(team => team.external_id !== external_id);
      });
      this.showPopup = false;
    },
  },
};
</script>

<style scoped>
.teams {
  display: flex;
  flex-direction: column;
  width: calc(100vw - var(--sidebar-width));
  background: #FFFFFF;
  overflow: hidden;
  box-sizing: border-box;
  padding: 3rem 3ch 3ch 3ch;
}

.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 81vh;
}

.header-wrapper {
  flex: 0 0 auto;
}

.content-wrapper {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  height: 0;
}

.headerteams {
  display: flex;
  justify-content: space-between; 
  margin-bottom: 1.25rem;
  transition: width 0.3s ease;
  gap: 1%;
}

.headerteams-shrink {
  width: calc(100% - 20rem); 
}

.searchteam {
  display: flex;
  position: relative;
  width: 100%;
  height: 3rem;
  background-color: #EBF6FF;
  border-radius: 0.625rem;
}

.searchicon {
  position: absolute;
  top: 50%;
  left: 1.25rem;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: #8A8A8A;
}

.searchbar {
  width: 100%;
  height: 100%;
  padding-left: 2.5rem;
  border: none;
  background-color: #EBF6FF;
  border-radius: 0.625rem;
  outline: none;
  padding-right: 0.3125rem;
}

.evento {
  display: flex;
  margin-left: 0;
  width: 10%;
}

.evento select {
  width: 100%; 
  height: 3rem; 
  border: 1px solid #ccc;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  outline: none;
  padding-left: 1ch;
}

.add-team {
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  background-color: var(--c-select);
  border-radius: 0.625rem;
  color: white;
  padding: 0.5ch 3ch;
  cursor: pointer;
  outline: none;
}

.content-container {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  flex-shrink: 1;
}

.table-wrapper {
  flex-grow: 1;
  flex-shrink: 1;
  transition: flex-grow 0.3s ease;
  height: 94.5vh;
}

.table-wrapper-shrink {
  flex-grow: 0.7;
  width: calc(100% - 20rem);
}

/* recurso */
.right-popup-placeholder {
  height: 81.1vh;
  width: 18.75rem;
  margin-left: 1.25rem;
  border-radius: 0.625rem;
  background-color: var(--c-accent);
  margin-top: -4.375rem;
}

.right-popup {
  padding: 1.25rem;
  position: relative;
}

.popup-content {
  padding: 2vh;
  padding-top: 1vh;
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.fotobola img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
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
  gap: 2ch;
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
  padding-left: 2ch;
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
  padding-left: 1ch;
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
  margin-top: 2ch;
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
  max-width: 31%;
  height: 15vh;
  background-color: var(--c-accent);
  border-radius: 5px;
  margin-top: 1ch;
}

.centrado {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 50%;
  font-size: 1rem;
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
  margin-top: 1.5ch;
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

.nomes {
  margin-bottom: 0.5rem;
}

.Add-events {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

:global(html, body) {
  overflow: hidden;
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