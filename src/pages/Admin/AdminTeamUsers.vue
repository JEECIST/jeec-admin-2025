<template>
  <div class="wrapper">
    <div class="table">
      <form>
        <div class="search_style">
          <label>
            <img src="../../assets/search.svg">
          </label>
          <input v-model="message" placeholder="Search for a user" />
        </div>
        <button type="button" @click="showAddUserModal = true">Add User</button>
        <button type="button" @click="manageUserRoles">User Roles</button>
      </form>
      <TheTable
        :data="datab"
        :toShow="tablePref"
        :searchInput="message"
        :buttons="tableButtons"
        @onRowSelect="selectCallback"
        @onBan="banCallback"
        @onHiEvent="console.log('hi')"
      ></TheTable>
    </div>
    <div class="right-popup-placeholder"></div>
  </div>

  <!-- Modal Popup -->
      <div v-if="showAddUserModal" class="modal-overlay">
        <div class="modal">
          <h2>Add Team User</h2>
          <form class = "popup_form" @submit.prevent="addUser">
            <div class="formUsername">
              <label for="username">Username</label>
              <input v-model="newUser.username" id="username" required />
            </div>
            <div class="formRole">
              <label for="role">Role</label>
              <select v-model="newUser.role" id="role" required>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <div class="modal-actions">
              <button type="submit" class="btn-primary">Add</button>                
              <button class="btnCancel"  @click=closeModal()>Cancel</button>
              
            </div>
          </form>
        </div>
      </div>
</template>

<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref } from 'vue';

const message = ref('');
const showAddUserModal = ref(false); // Reactive state for modal visibility
const newUser = ref({ username: '', role: '' }); // Reactive state for new user input

function banCallback(user) {
  console.log("banned " + user.name + "..... nah");
}

function selectCallback(row) {
  console.log(row);
}

function addUser() {
  datab.value.push({ user: newUser.value.username, role: newUser.value.role, name: newUser.value.username });
  closeModal();
}

function closeModal() {
  showAddUserModal.value = false;
  newUser.value = { username: '', role: '' }; // Reset form fields
}

const datab = ref([
  {
    user: "Deco",
    role: "Webdev",
    name: "André Santos the Feeble",
    day: "123"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos"
  },
  {
    user: "DD",
    role: "Webdev",
    name: "André Santos"
  },
]);

const tablePref = ["user", "name"];

const tableButtons = [
  {
    name: "Ban",
    icon: false,
    eventName: "onBan",
  },
  {
    name: "Hi",
    icon: false,
    eventName: "onHiEvent",
  }
];

function manageUserRoles() {
  console.log('User Roles button clicked');
  // Add your logic to manage user roles here
}
</script>

<style scoped>
.wrapper {
  display: flex;
  position: relative;
  height: calc(100dvh - var(--header-height));
  padding: 5ch 3ch 3ch 3ch;
  overflow-y: hidden;
}

.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3ch;
  padding-right: 3ch;
}

form {
  display: flex;
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 3ch;
  padding-left: 1ch;
  border-radius: 10px;
}

.search_style {
  display: flex;
  background-color: var(--c-accent);
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 6px;
  width: 60%;
}

.search_style > label > img {
  width: 20px;
  position: relative;
  top: 4px;
  left: 3px;
}

.search_style > input {
  appearance: none;
  background-color: transparent;
  border: 0px;
  color: var(--c-ft-semi-light);
  font-style: inherit;
  font-variant: inherit;
  font-weight: inherit;
  font-stretch: inherit;
  line-height: inherit;
  font-family: inherit;
  font-size-adjust: inherit;
  font-kerning: inherit;
  font-optical-sizing: inherit;
  font-language-override: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  font-size: 1rem;
  height: 100%;
  outline: none;
  padding: 0px 0px 0px 8px;
  width: 100%;
}

.search_style input::placeholder {
  color: var(--c-ft-semi-light);
}

form > button {
  font-size: 1rem;
  font-weight: 500;
  border: none;
  background-color: var(--c-select);
  border-radius: 6px;
  color: var(--c-bg-light);
  cursor: pointer;
  padding: 0.5ch 3ch;
  height: 100%;
}

.right-popup-placeholder {
  position: sticky;
  top: 0;
  right: 0;
  width: 500px;
  border-radius: 30px;
  background-color: var(--c-accent);
  height: 100%;
}
.popup_form{
  display: flex;
  flex-direction: column;
  gap:10px;
  
}
/* Modal styles */
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


.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 50%;
  height: 70%;
  display: flex;
  flex-direction: column;
  position: relative;
  
}

.modal-actions {
  margin-top: auto; /* Pushes the button to the bottom */
  display: flex;
  justify-content: flex-end; /* Aligns button to the right */
  padding-top: 1rem; /* Adds spacing above the button */
  gap:20px;
}
.modal h2 {
  margin-top: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.formUsername {
  
  width: 100%;
}
.formRole{
  justify-content: flex-start;
  width: 60%;
  
}
/*nametag */
.popup, .formRole label, .formUsername label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;  
  font-weight: 500;

}
/* Nao sei porque mas nao consigo meter os botoes alinhado a direita e a role alinhado a esquerda*/

.formRole input, .formUsername input, .formRole select, .formUsername select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  
}



.btnCancel, .btn-primary {
  background-color: var(--c-select);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
}


.btnCancel:hover, .btn-primary:hover {
  background-color: #002855;
}
</style>
