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
        
        <button type="button" @click="manageUserRoles">User Roles <span class = "chevron"> </span></button>
      </form>
      <TheTable
        :data="datab"
        :tableHeaders="tablePref"
        :searchInput="message"
        :buttons="tableButtons"
        @onRowSelect="selectCallback"
      ></TheTable>
    </div>
    
    <!-- Conditionally render the right popup placeholder -->
    <div v-if="selectedRow" class="popUpOverlay"></div>
      <div v-if="selectedRow" class="right-popup-placeholder">
        <button class="close-popup" @click="closeCardInfo">&times;</button>
        <div class="header">
          <p class="cardUsername">{{ selectedRow.role }}</p>
        </div>
        
          <img src="../../assets/wrizz.jpg" alt="Profile Image" class="pfp">
          <p class="cardUsername">{{ selectedRow.user }}</p>
          <p class="cardUseless">Team User</p>
          <div class="cardActions">
            <button class="edit-button"><img src="../../assets/pencil.svg"></button>
            <button class="delete-button"><img src="../../assets/trash.svg"></button>
          </div>
          <div class="cardInfo">
            <div class = "cardInfoMember"> 
              <p class="cardInfoLabel">Member</p>
              <p class="cardInfoValue">{{ selectedRow.name }}</p>
            </div>
              
            <div class = "cardInfoMember"> 
              <p class="cardInfoLabel">PASSWORD</p>
              <p> Placeholder for password from database</p>
            </div>

            
          </div>
        
    </div>

  </div>

  <!-- Modal Popup -->
  <div v-if="showAddUserModal" class="modal-overlay">
    <div class="modal">
      <button class="close-popup" @click="closeModal()">&times;</button>
      <h2>Add Team User</h2>
      
      <form class="popup_form" @submit.prevent="addUser">
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
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref } from 'vue';

const message = ref('');
const showAddUserModal = ref(false);
const newUser = ref({ username: '', role: '' });
const selectedRow = ref(null);  // Track the selected row

function selectCallback(row) {
  selectedRow.value = row;  // Set the selected row
  console.log('Selected Row:', row);
}

function addUser() {
  datab.value.push({ id: 1, user: newUser.value.username, role: newUser.value.role, name: newUser.value.username });
  closeModal();
}

function closeModal() {
  showAddUserModal.value = false;
  newUser.value = { username: '', role: '' };
}
function closeCardInfo(){
  selectedRow.value = null;
}
const datab = ref([
  {
    id: "1",
    user: "Deco",
    
    role: "Webdev",
    name: "André Santos the Feeble",
    day: "123"
  },
  {
    id: "2",
    user: "DD",
    
    role: "Webdev",
    name: "André Santos"
  },
]);

const tablePref = {
  id: "ID",
  user: "Username",
  name: "Member", 
  
  role: "Role"
};

function manageUserRoles() {
  console.log('User Roles button clicked');
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
.cardUseless{
  color: gray;
  margin-bottom: 1rem;
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
  width: 100%;
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
  padding: 0px 15px;
  height: 100%;
  width: 25%;
}


.chevron{
  display: inline-block;
  width: 11px;
  height: 11px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-45deg);
  border-radius: 2px; 
}
/* Right Popup Placeholder */
.right-popup-placeholder {
  position: sticky;
  top: 0;
  right: 0;
  width: 23rem;
  height: 100%;
  border-radius: 1.5rem;
  background-color: #eef4fb;
  padding: 1.5rem;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);

}

.right-popup-placeholder .header {
  text-align: center;
  margin-bottom: 10px;
}

.right-popup-placeholder .title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #444;
  margin-bottom: 10px;
}



.right-popup-placeholder .pfp {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin-bottom: 15px;
}

.right-popup-placeholder .cardUsername {
  font-size: 1.5rem ;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.right-popup-placeholder .cardRole {
  
  font-weight: 500;
  color: #777;
  margin-bottom: 20px;
}

.right-popup-placeholder .cardActions {
  display: flex;
  gap: 10px;
  
}

.right-popup-placeholder .edit-button,
.right-popup-placeholder .delete-button {
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  
}

.right-popup-placeholder .edit-button:hover,
.right-popup-placeholder .delete-button:hover {
  background-color: #f0f0f0;
}

.right-popup-placeholder .cardInfo {
  width: 100%;
  text-align: left;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.right-popup-placeholder .cardInfoLabel {
  font-size: 1.1rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 5px;
}

.right-popup-placeholder .cardInfoValue {
  font-size: 1.1rem;
  font-weight: 250;
  color: #333;
}

/* Modal styles */
.modal-overlay {
  position: absolute;
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
  margin: 1rem;
  max-width: 700px;
  width: 100%;
  /* min-height: 70%; */
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
}

.popup_form {
  
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 10px;
}

.modal-actions {
  
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  padding-top: 1rem;
  gap: 20px;
  width: 100%;
}

.modal h2 {
  padding-left: 8px;
  margin-top: 0;
  margin-bottom: 2%;
  font-size: 1.5rem;
  font-weight: 600;
}

.formUsername {
  width: 100%;
}

.formRole {
  
  justify-content: flex-start;
  align-self: flex-start;
  width: 60%;
}

/* Label Styling */
.popup,
.formRole label,
.formUsername label {
  display: block;
  margin-bottom: -1rem;
  padding: 0px;
  font-size: 1rem;
  font-weight: 500;
}

/* Input Styling */
.formRole input,
.formUsername input,
.formRole select,
.formUsername select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}

/* Button Styling */
.btnCancel,
.btn-primary {
  width: 15%;
  background-color: var(--c-select);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btnCancel:hover,
.btn-primary:hover {
  background-color: #002855;
}

.close-popup {
        display: block;
        position: absolute;
        top: 5px;
        right: 25px;
        background: none;
        border: none;
        font-size: 2.2rem;
        cursor: pointer;
        color: #333;
    }

@media (max-width: 768px) {
  .wrapper {
  display: flex;
  position: relative;
  height: calc(100dvh - var(--header-height));
  padding: 5ch 3ch 3ch 3ch;  
}
.popUpOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent gray */
    z-index: 500; /* Behind the popup */
}
  .table {
    width: 100%;
    padding-right: 1ch;
    gap: 1ch;
  }
  .right-popup-placeholder {
    position: fixed; /* Position the popup above the content */
    top: 50%; /* Vertically center */
    left: 43%; /* Horizontally center */
    transform: translate(-50%, -50%); /* Adjust the position to be truly centered */
    width: 90%; /* Adjust width to fit on smaller screens */
    height: calc(97dvh - var(--header-height)); /* Let the height adapt to content */
    background-color: #eef4fb; /* Add background for better visibility */
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000; /* Ensure it stays above other content */
  }


  .right-popup-placeholder .close-popup {
        display: block;
        position: absolute;
        top: 5px;
        right: 25px;
        background: none;
        border: none;
        font-size: 2.2rem;
        cursor: pointer;
        color: #333;
    }

  
  .btnCancel,
  .btn-primary {
    width: 5rem;
    background-color: var(--c-select);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  form > button {
    font-size: 1rem;
    font-weight: 500;
    border: none;
    background-color: var(--c-select);
    border-radius: 6px;
    color: var(--c-bg-light);
    cursor: pointer;
    width: 6rem;
    padding-right: 1rem;
    
  }

  .chevron{
    display: none;
  
  }
}
</style>