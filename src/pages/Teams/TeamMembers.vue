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
              placeholder="Search for a member" 
              class="searchbar" 
              v-model="searchQuery" 
              @input="closePopupOnSearch"
            />
          </div>
          <button class="add-team" @click="openAddPopup">Add Member</button>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="content-container">
          <div :class="{'table-wrapper': true, 'hidden': showEditPopup || showAddPopup || showPopup}">
            <div class="scrollbar">
              <TheTable
                :data="filteredMembers"
                :tableHeaders="{ name: 'Name', username: 'Username', userRole: 'User Role'}"
                :searchInput="searchQuery"
                @onRowSelect="selectMember"
              />
            </div>
          </div>

          <div v-if="showPopup" class="right-popup-placeholder">
            <div class="right-popup">
              <h2 class="titulo">
                {{ selectedMember.name }}
              </h2>
              <button class="closeX" @click="closePopup">&times;</button>
              <div class="popup-content">
                <div class="fotobola">
                  <img :src="image" />
                </div>
                <h2 class="subtitulo">{{ selectedMember.username }}</h2>
                <p class="sub-subtitulo">{{ selectedMember.userRole }}</p>
                <div class="display">
                  <button class="edit" @click="editButton">
                    <img src="../../assets/edit_btn.svg" alt="Edit" />
                  </button>
                  <button class="edit" @click="TeamMembers">
                    <a href="/user-shifts" target="_self">
                      <img src="../../assets/linkedin.svg" alt="Team" />
                    </a>
                  </button>
                  <button class="edit" @click="deleteMember(selectedMember.external_id)">
                    <img src="../../assets/trash.svg" alt="Delete" />
                  </button>
                </div>
                <p class="descricao">Email:</p>
                <p class="inf1">
                  {{ selectedMember.email }}
                </p>
                <p class="descricao">Linkedin:</p>
                <p class="inf1">
                  {{ selectedMember.linkedin_url }}
                </p>
                <div class="linha">
                  <p class="direita">User Role:</p>
                </div>
                <div class="linha">
                  <p class="opaco">{{ selectedMember.userRole }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="showEditPopup" class="overlay">
            <div class="edit-popup">
              <div class="edit-popup-content">
                <h2>Edit Member</h2>
                <button key="closeX" class="closeX" @click="closeEditPopup">&times;</button>
                <form @submit.prevent="saveEdit">
                  <div class="primline">
                    <div class="Add-priority">
                      <label for="name" class="">Name:</label>
                      <input type="text" v-model="editMember.name" id="name" required />
                    </div>
                    <div class="Add-priority">
                      <label for="username" class="">Username:</label>
                      <select v-model="editMember.username" id="username">
                        <option v-for="user in user_list" :key="user.id" :value="user.id"> 
                          {{ user.username }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="primline">
                    <div class="Add-priority">
                      <label for="email" class="">Email:</label>
                      <input type="text" v-model="editMember.email" id="email" required />
                    </div>
                    <div class="Add-priority">
                      <label for="linkedin" class="">Linkedin:</label>
                      <input type="text" v-model="editMember.linkedin_url" id="linkedin" required />
                    </div>
                  </div>
                  <div class="primeline">
                    <div class="form-group">
                      <label class="custom-file-upload">
                        Picture:
                        <input type="file" @change="handleFileChange" class="file-input" ref="fileInput" style="display: none;" />
                        <div class="small-quadrado" @click="triggerFileInput">
                          <label class="centrado">
                            No picture selected
                            <img :src="image" />
                          </label>
                        </div>
                        <div class="ultline">
                          <button type="button" class="left-add" @click="triggerFileInput">Change Picture</button>
                          <button type="submit" class="right-add">Save</button>
                        </div>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div v-if="showAddPopup" class="overlay">
            <div class="edit-popup">
              <div class="edit-popup-content">
                <h2>Add Member</h2>
                <button key="closeX" class="closeX" @click="closeAddPopup">&times;</button>
                <form @submit.prevent="saveNewMember"> 
                  <div class="primline">
                    <div class="Add-priority">
                      <label for="name" class="">Name:</label>
                      <input type="text" v-model="newMemberName" id="name" required />
                    </div>
                    <div class="Add-priority">
                      <label for="username" class="">Username:</label>
                      <select v-model="newMemberUserId" id="username">
                        <option v-for="user in user_list" :key="user.id" :value="user.id"> 
                          {{ user.username }}
                        </option>
                      </select>
                    </div>
                    <div class="Add-priority">
                      <label for="email" class="">Email:</label>
                      <input type="text" v-model="newMemberEmail" id="email" required />
                    </div>
                    <div class="Add-priority">
                      <label for="linkedin" class="">Linkedin:</label>
                      <input type="text" v-model="newMemberLinkedin" id="linkedin" required />
                    </div>
                  </div>
                  <div class="primeline">
                    <div class="form-group">
                      <label class="custom-file-upload">
                        Picture:
                        <form @submit.prevent="saveNewMember">
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-if="filteredMembers.length === 0" class="form">
      <label class="no-teams">No members found</label>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';
import TheTable from '../../global-components/TheTable.vue';

export default {
  name: 'Members',
  props: ["external_id"],
  components: {
    TheTable,
  },
  data() {
    return {
      selectedEvent: 'Select an event',
      searchQuery: '',
      members: [],
      showPopup: false,
      showEditPopup: false,
      showAddPopup: false,
      selectedMember: {},
      editMember: {},
      newMemberName: '',
      newMemberUserId: '',
      newMemberEmail: '',
      newMemberUserRole: '',
      newMemberShifts: '',
      newMemberIstId: '',
      newMemberLinkedin: '',
      newMemberBackground: false,
      selectedFile: null,
      image: null,
      selectedTeamId: null,
      user_list: [],
    };
  },
  computed: {
    filteredMembers() {
      return this.members.filter(member => 
        member.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  mounted() {
    this.fetchMembers();
  },
  methods: {
    fetchMembers() {
      axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/team/members', { external_id: this.external_id }, {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }).then(response => {
        const data = response.data;
        this.members = data.team.members.map(member => ({
          ...member,
          username: member.username || "N/A",
          userRole: member.userRole || "N/A",
          shifts: member.shifts || 0,
          email: member.email || "N/A",
          linkedin_url: member.linkedin_url || "N/A",
        }));
      });
    },
    saveNewMember() {
      const formData = new FormData();
      formData.append("name", this.newMemberName);
      formData.append("external_id", this.external_id);
      formData.append("user_id", this.newMemberUserId || "");
      formData.append("email", this.newMemberEmail);
      formData.append("linkedin_url", this.newMemberLinkedin || "");
      formData.append("background_bool", this.newMemberBackground ? "True" : "False");
      if (this.selectedFile) {
        formData.append("fd", this.selectedFile);
      }

      axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/team/new-member', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      })
      .then((response) => {
        const newMember = response.data;
        this.members.push({
          name: newMember.name || "N/A",
          image: newMember.image || null,
          email: newMember.email || "N/A",
          linkedin_url: newMember.linkedin_url || "N/A",
          external_id: newMember.external_id || "N/A",
        });
        this.fetchMembers();
        this.closeAddPopup();
      });
    },
    fetchMemberImage(external_id) {
      axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/getimagemember', 
        { member_external_id: external_id },
        {
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
          },
        }
      ).then(response => {
        this.image = import.meta.env.VITE_APP_JEEC_BRAIN_URL.replace('/admin', '') + response.data.image;
      });
    },
    handleEventChange() {
      console.log(this.selectedEvent);
    },
    selectMember(row) {
      this.selectedMember = row;
      this.showPopup = true;
      this.fetchMemberImage(row.external_id);
    },
    closePopup() {
      this.showPopup = false;
      this.selectedMember = {}; 
    },
    closePopupOnSearch() {
      this.showPopup = false;
    },
    editButton() {
      console.log(this.selectedMember);
      this.editMember = { ...this.selectedMember }; 
      this.showEditPopup = true;
    },
    saveEdit() {
      const formData = new FormData();
      formData.append("name", this.editMember.name);
      formData.append("external_id", this.external_id);
      formData.append("ist_id", this.editMember.ist_id || "");
      formData.append("email", this.editMember.email);
      formData.append("linkedin_url", this.editMember.linkedin_url || "");
      formData.append("background_bool", this.editMember.background_bool ? "True" : "False");
      formData.append("member_external_id", this.selectedMember.external_id);

      if (this.selectedFile) {
        formData.append("fd", this.selectedFile);
      }

      axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/team/update_team_member', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
      })
      .then(() => {
        this.fetchMembers();
        this.closeEditPopup();
        this.closePopup();
      });
    },
    closeEditPopup() {
      this.showEditPopup = false;
    },
    deleteMember(external_id) {
      axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/team/delete_team_member',
        {
          member_external_id: external_id,
          external_id: this.external_id,
        },
        {
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
          },
        }
      )
      .then(() => {
        this.members = this.members.filter(member => member.external_id !== external_id);
        this.fetchMembers();
        this.closePopup();
      });
    },
    TeamMembers() {
      console.log('Team Members');
    },
    openAddPopup() {
      this.showAddPopup = true;
      axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/team/get_users',
        {
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
          },
        }
      )
      .then((response) => {
        const users = response.data.users;
        this.user_list = users.map(user => ({
          id: user.id,
          username: user.username,
        }));
      });
      this.image = null;
    },
    closeAddPopup() {
      this.showAddPopup = false;
    },
    resetNewMemberForm() {
      this.newMemberName = '';
      this.newMemberUserId = null;
      this.newMemberEmail = '';
      this.newMemberUserRole = '';
      this.newMemberShifts = '';
      this.selectedFile = null;
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.image = URL.createObjectURL(this.selectedFile);
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
  height: 100%;
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
}

.evento select {
  width: 100%; 
  height: 3rem; 
  border: 1px solid #ccc;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  outline: none;
  padding: 1.5rem;
  padding-left: 1.5rem;
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
  height: 94.5vh;
}

.table-wrapper {
  flex-grow: 1;
  flex-shrink: 1;
  transition: flex-grow 0.3s ease;
  height: 100%;
}

.table-wrapper-shrink {
  flex-grow: 0.7;
  width: calc(100% - 20rem);
}

/* recurso */
.right-popup-placeholder {
  height: calc(84vh - 3ch);
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

/*recurso*/
.form {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--c-accent);
  height: calc(100% + 500rem);
  overflow: hidden;
  position: relative;
  border-radius: 0.625rem;
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

.titulo {
  text-align: center;
  font-size: 2rem;
  color: var(--c-text);
  margin-top: 6vh;
  font-weight: bold;
}

.subtitulo {
  text-align: center;
  font-size: 1.5rem;
  color: var(--c-text);
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;
  font-weight: bold;
}

.sub-subtitulo {
  text-align: center;
  font-size: 1.1rem;
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
  margin-top: 0.625rem;
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
  top: 0.625rem;
  right: 0.625rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--c-text);
}

.edit {
  width: 2.25rem;
  height: 2.25rem;
  background: #FFFFFF;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
}

.fotobola {
  width: 10.3125rem;
  height: 10.3125rem;
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
  margin-top: 3vh;
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
  margin-top: 0.3125rem;
  opacity: 0.5;
}

.linha {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2.5rem;
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
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 60%;
}

.edit-popup-content {
  display: flex;
  flex-direction: column;
}

.edit-popup-content h2 {
  margin-bottom: 1.25rem;
}

.edit-popup-content form {
  display: flex;
  flex-direction: column;
}

.edit-popup-content form label {
  margin-bottom: 0.3125rem;
  width: 100%;
}

.edit-popup-content form input {
  margin-bottom: 0.625rem;
  padding: 0.3125rem;
  width: 100%;
}

.edit-popup-content form button {
  margin-top: 0.625rem;
}

.scrollbar {
  overflow-y: auto;
  height: calc(100% - 21vh);
}

.primline {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.Add-event, .Add-priority {
  display: flex;
  flex-direction: column;
  margin-top: 0.9375rem;
  width: 20em;
}

.Add-priority input {
  width: 20em;
  height: 2.5rem;
  border: 1px solid #ccc;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  outline: none;
}

.Add-priority > select {
  height: 2.5rem;
  border: 1px solid #ccc;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  outline: none;
}

.Add-event {
  display: flex;
}

.Add-event select {
  width: 100%;
  height: 2.5rem;
  border: 1px solid #ccc;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  outline: none;
  margin-bottom: 0;
}

.Description {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 0.9375rem;
}

.Description input {
  width: 100%;
  height: 4.375rem;
  border: 1px solid #ccc;
  border-radius: 0.625rem;
  font-size: 0.875rem;
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
  border-radius: 0.625rem;
  height: 3rem;
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
  border-radius: 0.3125rem;
  margin: 0.625rem 0 0.625rem 0;
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
  border-radius: 0.625rem;
  border: none;
  height: 3rem;
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
  border-radius: 0.625rem;
  border: none;
  height: 3rem;
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
  padding-bottom: 5rem;
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