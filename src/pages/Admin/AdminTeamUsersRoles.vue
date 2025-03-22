<template>
  <div class="backdrop-mobile" v-if="cardDisplaying"></div>
  <div class="roles_container">
    <div class="roles_table" :class="{ 'hide-on-mobile': cardDisplaying }">
      <div class="header">
        <div class="search-container">
          <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
          </svg>
          <input 
            placeholder="Search for a use role" 
            class="search-bar" 
            v-model="searchQuery"
          />
        </div>
      <button class="button-add-roles" @click="showAddUserRole=true">Add Role</button>
      </div>
      <div class="table-container">
        <TheTable 
          :data="tableData"
          :tableHeaders="headers"
          :buttons="tableButtons"
          :searchInput="searchQuery"
          :isSelectable="true"
          @onRowSelect="handleRowSelect"
          @notFound="handleno_roles"
          class="table"
        />
      </div>
      <div class="no_roles" v-if=no_roles>No User Roles Found</div>
    </div>

    <div v-if="selectedRow" class="roles-card">
      <button @click="unselectRow" class="close-button-card">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="roles-card-header">
        <img class='roles-logo' :src="JEEC" alt="roles logo" />
        <div class="card-title">
          <p class="card-name">{{ selectedRow.name }}</p>
          <p class="card-subtitle">User Role</p>
        </div>
        <div class="card-buttons">
          <button @click="editRow(selectedRow)" class="icon-button">
            <img :src="pencilIcon" alt="edit" class="icon" />
          </button>
          <button @click="tooglelist" class="icon-button">
            <img :src="briefcaseIcon" alt="list of roless in tier" class="icon">
          </button>
          <button @click="deleteRow(selectedRow)" class="icon-button">
            <img :src="trashIcon" alt="delete" class="icon" />
          </button>

        </div>
        
      </div>
      <div class="roles-card-body">
        <div class="card-collumn">
          <div class="card-paragraph">
            <h1>Priority</h1>
            <p>{{ selectedRow.priority }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Activities</h1>
            <p>{{ selectedRow.activities }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Admin</h1>
            <p>{{ selectedRow.admin }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Bills</h1>
            <p>{{ selectedRow.bills }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Business</h1>
            <p>{{ selectedRow.business }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Shifts</h1>
            <p>{{ selectedRow.shifts }}</p>
          </div>
      </div>
      <div class="card-collumn">
          <div class="card-paragraph">
            <h1>Claim Prizes</h1>
            <p>{{ selectedRow.claim_prizes }}</p>
          </div>
          <div class="card-paragraph">
            <h1>QR codes</h1>
            <p>{{ selectedRow.qr_codes }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Speakers</h1>
            <p>{{ selectedRow.speakers }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Sponsors</h1>
            <p>{{ selectedRow.sponsors }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Student App</h1>
            <p>{{ selectedRow.student_app }}</p>
          </div>
          <div class="card-paragraph">
            <h1>Teams</h1>
            <p>{{ selectedRow.teams }}</p>
          </div>
      </div>
        
        
      </div>
    </div>

    <!-- Add User Role Pop up -->
    <div v-if="showAddUserRole" class="backdrop">
      <div class="tier-pop-up">
        <div class="header">
          <h1>Add User Role</h1>
          <button @click="showAddUserRole=false" class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f4f4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        </div>
        <form class="form">
          <div class="form-line">
            <div class="inputname">
              <label for="name">Name</label>
              <input type="text" v-model="name"/>
            </div>
            <div class="inputname">
              <label for="Priority">Priority</label>
              <input type="text" v-model="priority"/>
            </div>
          </div>
          <div class="form-columns">
            
            <div class="second-column">
                <div class="radio-label">
                  <label for="activities">Activities</label>
                  <div class="radio">
                    <input type="radio" id="activitiesYes" v-model="activities" :value="true"/>
                    <label for="activitiesYes">Yes</label>

                    <input type="radio" id="activitiesNo" v-model="activities" :value="false"/>
                    <label for="activitiesNo">No</label>
                  </div>
                </div>
                <div class="radio-label">
                  <label for="admin">Admin</label>
                  <div class="radio">
                    <input type="radio" id="adminYes" v-model="admin" :value="true"/>
                    <label for="adminYes">Yes</label>

                    <input type="radio" id="adminNo" v-model="admin" :value="false"/>
                    <label for="adminNo">No</label>
                  </div>
                </div>
                <div class="radio-label">
                  <label for="bills">Bills</label>
                  <div class="radio">
                    <input type="radio" id="billsYes" v-model="bills" :value="true"/>
                    <label for="billsYes">Yes</label>

                    <input type="radio" id="billsNo" v-model="bills" :value="false"/>
                    <label for="billsNo">No</label>
                  </div>
                </div>
                <div class="radio-label">
                  <label for="teams">Teams</label>
                  <div class="radio">
                    <input type="radio" id="teamsYes" v-model="teams" :value="true"/>
                    <label for="teamsYes">Yes</label>

                    <input type="radio" id="teamsNo" v-model="teams" :value="false"/>
                    <label for="teamsNo">No</label>
                  </div>
                </div>
            </div>
            <div class="second-column">
                <div class="radio-label">
                  <label for="business">Business</label>
                  <div class="radio">
                    <input type="radio" id="businessYes" v-model="business" :value="true"/>
                    <label for="businessYes">Yes</label>

                    <input type="radio" id="businessNo" v-model="business" :value="false"/>
                    <label for="businessNo">No</label>
                  </div>
                </div>
                <div class="radio-label">
                  <label for="claim_prizes">Claim Prizes</label>
                  <div class="radio">
                    <input type="radio" id="claim_prizesYes" v-model="claim_prizes" :value="true"/>
                    <label for="claim_prizesYes">Yes</label>

                    <input type="radio" id="claim_prizesNo" v-model="claim_prizes" :value="false"/>
                    <label for="claim_prizesNo">No</label>
                  </div>
                </div>
                <div class="radio-label">
                  <label for="qr_codes">QR Codes</label>
                  <div class="radio">
                    <input type="radio" id="qr_codesYes" v-model="qr_codes" :value="true"/>
                    <label for="qr_codesYes">Yes</label>

                    <input type="radio" id="qr_codesNo" v-model="qr_codes" :value="false"/>
                    <label for="qr_codesNo">No</label>
                  </div>
                </div>
                <div class="radio-label">
                  <label for="shifts">Shifts</label>
                  <div class="radio">
                    <input type="radio" id="shiftsYes" v-model="shifts" :value="true"/>
                    <label for="shiftsYes">Yes</label>

                    <input type="radio" id="shiftsNo" v-model="shifts" :value="false"/>
                    <label for="shiftsNo">No</label>
                  </div>
                </div>
            </div>
            <div class="second-column">
                <div class="radio-label">
                  <label for="speakers">Speakers</label>
                  <div class="radio">
                    <input type="radio" id="speakersYes" v-model="speakers" :value="true"/>
                    <label for="speakersYes">Yes</label>

                    <input type="radio" id="speakersNo" v-model="speakers" :value="false"/>
                    <label for="speakersNo">No</label>
                  </div>
                </div>
                <div class="radio-label">
                  <label for="sponsors">Sponsors</label>
                  <div class="radio">
                    <input type="radio" id="sponsorsYes" v-model="sponsors" :value="true"/>
                    <label for="sponsorsYes">Yes</label>

                    <input type="radio" id="sponsorsNo" v-model="sponsors" :value="false"/>
                    <label for="sponsorsNo">No</label>
                  </div>
                </div>
                
                <div class="radio-label">
                  <label for="student_app">Student App</label>
                  <div class="radio">
                    <input type="radio" id="student_appYes" v-model="student_app" :value="true"/>
                    <label for="student_appYes">Yes</label>

                    <input type="radio" id="student_appNo" v-model="student_app" :value="false"/>
                    <label for="student_appNo">No</label>
                  </div>
                </div>

            </div>
              
          </div>
        </form>
        <button class="button-add-pop-up" @click="addingUserRole">Add</button>
        
      </div>
    </div>

    <rolessList v-if="listroless" @close="tooglelist" :tier="selectedRow" />
    <EditrolesTier v-if="iseditrolestier" @close="editRow(selectedRow)" :rolesData="selectedRow" :isOpen="iseditroles"/>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TheTable from '../../global-components/TheTable.vue';
import pencilIcon from '../../assets/pencil.svg'
import trashIcon from '../../assets/trash.svg'
import JEEC from '../../assets/JEEC.png'
import briefcaseIcon from '../../assets/briefcase.svg'



const tableData = ref([]);

const fetchData = () => {
    axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/userss_roles',{auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }}).then((response)=>{
          const data = response.data
          tableData.value = response.data.roles
          console.log("User Roles",tableData.value)
        }).catch((error)=>{
          console.log(error)
        })
}

onMounted(fetchData)

const name = ref('');
const priority = ref('');
const activities = ref(null);
const admin = ref(null);
const bills = ref(null);
const business = ref(null);
const claim_prizes = ref(null);
const qr_codes = ref(null);
const speakers = ref(null);
const sponsors = ref(null);
const student_app = ref(null);
const teams = ref(null);
const shifts = ref(null);

function addingUserRole(e) {
  console.log('adding user role');
  e.preventDefault();

  const fd = new FormData();
  fd.append('name', name.value);
  fd.append('priority', priority.value);
  fd.append('activities', activities.value);
  fd.append('admin', admin.value);
  fd.append('bills', bills.value);
  fd.append('business', business.value);
  fd.append('claim_prizes', claim_prizes.value);
  fd.append('qr_codes', qr_codes.value);
  fd.append('speakers', speakers.value);
  fd.append('sponsors', sponsors.value);
  fd.append('student_app', student_app.value);
  fd.append('teams', teams.value);
  fd.append('shifts', shifts.value);

  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/userss_roles/add', fd, {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  }).then(response => {
    console.log('Response:', response);
    const error_response = response.data.error;
    console.log('Error response:', error_response);
    if (error_response == '') {
      console.log('User role added:', response.data);
      fetchData();
      showAddUserRole.value = false;
    } else {
      console.log('Error on adding sponsor tier:', error_response);
      alert('Error on adding sponsor tier: ' + error_response);
      console.log('Alert should have shown: Error on adding sponsor tier: ' + error_response);
    }
  }).catch(error => {
    console.error('Request failed:', error);
    alert('Request failed: ' + error.message);
    console.log('Alert should have shown: Request failed: ' + error.message);
  });
}

const showAddUserRole= ref(false);
const iseditrolestier= ref(false);
const listroless= ref(false);
const cardDisplaying = ref(false);


// Headers to map the data keys to table headers
const headers = {
  role: 'ID',
  name: 'Name',
  priority: 'Priority'
};

const tableButtons = '';
const no_roles = ref(false);


// Search query for filtering the rows
const searchQuery = ref('');
const selectedRow = ref(null);

// Event handler for row selection
function handleRowSelect(row) {
  cardDisplaying.value = true;
  selectedRow.value = row;
  console.log('Row selected:', row);
}

function handleno_roles(isEmpty){
  console.log('No roles found', isEmpty);
  no_roles.value = isEmpty;
}

function unselectRow() {
  cardDisplaying.value = false;
  selectedRow.value = null;
}

// Event handlers for button clicks
function editRow(row) {
  iseditrolestier.value= !iseditrolestier.value
  console.log(iseditrolestier.value)
  console.log('Edit button clicked for row:', row);
}



function tooglelist()
{
  listroless.value= !listroless.value
  console.log(listroless.value)
}

function deleteRow(row) {
  if (confirm('Are you sure you want to delete this roles tier?')) {
    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/delete_roles_tier', {
      tier_id: selectedRow.value.id
    }, {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
    }).then((response) => {
      console.log('roles tier deleted', response.data);
      unselectRow();
      fetchData();
    }).catch((error) => {
      console.log(error);
    });
  }
  console.log('Delete button clicked for row:', row);
}



</script>

<style scoped>

.roles_container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 15px 40px 15px 40px;
  gap: 15px;
}

.roles-card{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  padding: 10px 10px 10px 10px;
  align-self: flex-start;
  height: fit-content;
  max-height: 75vh;
  width: fit-content;
  min-width: 250px;
  max-width: 300px;
  background-color: var(--c-accent);
  border-radius: 10px;
  gap: 20px;
  z-index: 3;
}

.roles-card-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap:10px;
}

.card-tier{
  text-transform: uppercase;
  font-size: 1.6em;
}

.roles-logo {
  width: 10vw;
  height: 10vw;
  min-height: 80px;
  min-width: 80px;
  max-width: 180px;
  max-height: 180px;
  border-radius: 50%;
  object-fit: cover;
}

.card-title{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:fit-content;
}

.card-name{
  font-weight: 800;
  color: var(--c-ft-dark);
  font-size:1.3em;
}

.card-subtitle{
  color: var(--c-ft-semi-light);
  font-size:1em;
}

.card-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 30px;
  padding: 1px 1px;
  gap: 10px;
}

.roles-card-body{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 15px 15px 15px 15px;
  gap: 20px;

}

.card-paragraph{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.roles-card-body h1{
  color: var(--c-ft-dark);
  font-size: 0.8em;
  font-weight: 700;
}
.roles-card-body p{
  font-size: 0.7em;
  color: var(--c-ft-semi-light);
}

.card-collumn{
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.roles_table {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 75vh;
  width: 80%;
  min-width: 300px;
  overflow: hidden;
  flex-grow: 1;
  gap: 4px;
}

.table-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;
}

.table{
  width: 100%;
  height: 100%;
  font-size: 0.8em;
}

.no_roles{
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  color: var(--c-tf);
  background-color: var(--c-accent);
  font-weight: 600; 
}

.header {
  top:0;
  position: sticky;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: end;
  gap: 7px;
  color: #8A8A8A;
}

.search-container {
  display: flex;
  align-content: center;
  position: relative;
  min-height: 36px;
  min-width:200px;
  background-color: #EBF6FF; 
  border-radius: 4px; 
  flex-grow: 4;
  padding: 1px 1px 1px 1px;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  color: #8A8A8A;
}

.search-bar {
  height: 36px; 
  padding: 5px 5px 5px 24px;
  border-radius: 4px;
  border: none;
  outline-color: var(--c-select);
  color: #8A8A8A;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.7em;
  font-weight: 500;
  line-height: 2.67vh;
  background-color: #EBF6FF;
  flex-grow: 1;
}



.selection-box {
  width: 100%;
  height: 100%;
  border: 1px solid #8A8A8A;
  border-radius: 4px;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 1px 1px;
  font-size: 1em;
  color: #8A8A8A;
  background-color: #FFFFFF;
}

.button-add-roles {
  min-width: 70px;
  height: 36px; 
  border: none;
  border-radius: 4px;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.8em;
  font-weight: 400;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 4px 4px;
  cursor: pointer;
  flex-grow: 1;
}


.chevron-icon {
  height: 15px;
  width: 15px;
}

.icon-button {
  background-color: var(--c-bg-light);
  border: none;
  border-radius: 20%;
  cursor: pointer;
  align-content: space-between;
  width:  8vw;
  height: 8vw;
  min-width: 20px;
  min-height: 20px;
  max-height: 25px;
  max-width: 25px;
  display:flex;
  justify-content: center;
  align-items: center;
  padding: 2px 2px 2px 2px;
}

.icon {
  width: 6.5vw;
  height: 6.5vw;
  max-width: 25px;
  max-height: 15px;
  color: var(--c-ft-dark);
}

.close-button-card{
  z-index: 3;
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: -20px;
}

.backdrop{
  top:0;
  position: fixed;
  background: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  z-index: 3;
  align-content: center;
}


.tier-pop-up{
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 900px;
  overflow-y: auto;
  padding: 50px 50px 50px 50px;
  height: fit-content;
  max-height: 95vh;
  margin: 3vh auto;
  background-color: #ffff;
  font-size: 0.9em;
  color: var(--text-color);
  font-family: var(--font-family);
  z-index: 3;
  gap: 20px;
}

.header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}


.close-button{
  z-index: 3;
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  margin-right: -8px;
}

.tier-pop-up h1{
  font-size: 2em;
}


.form{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 30px;
}

.form-line{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  width: 100%;
}


.radio{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.7em;
  gap: 10px;
  width: fit-content;
  padding-left: 10px;
}

.radio-label{
  display: flex;
  flex-direction: column;
  gap:10px;
}

input[type="radio"] {
    /* Adjust size directly using viewport width without calc */
    transform: scale(1 + 0.02 * (2vh)); /* Adjust size based on viewport width */
    margin: 5px; /* Margin based on viewport width */
}

.form-columns{
  min-height: 200px;
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width:100%;
  gap: 20px;
}

.second-column{
  display:flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-grow: 1;
  gap: 20px;
}

.inputname{
  min-height: 60px;
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  max-width: 500px;
  gap:1vh; 
}

.inputname input{
  padding: 0.5vh 1vw 0.5vh 1vw;
  border: 1px solid #8A8A8A;
  border-radius: 1vh;
  outline-color: var(--c-ft-semi-light);
  color: var(--c-ft-semi-light);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.9em;
  font-weight: 500;
  line-height: 2.67vh;
  flex-grow: 3;
}

.event-filter{
  display: flex;
  flex-direction: column;
  width:fit-content;
  gap:1vh;
}

.selection-box {
  min-height: 35px;
  width: 20vw;
  min-width: 100px;
  border: 1px solid var(--c-ft-semi-light);
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 0.5vh 0.5vw;
  font-size: 0.9em;
  color: var(--c-ft-semi-light);
  background-color: #FFFFFF;
  flex-grow: 1;
}

.inputdescription{
  display: flex;
  flex-direction: column;
  width: 77vw;
  gap:1vh;
}

.description{
  height: 11vh;
  padding: 1vh 1vw 1vh 1vw;
  border: 1px solid #8A8A8A;
  border-radius: 1vh;
  outline-color: var(--c-ft-semi-light);
  color: var(--c-ft-semi-light);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.8em;
  font-weight: 500;
  line-height: 2.6vh;
  flex-grow: 3;
}


/* Hide the file input */
#logo-upload {
  display: none;
}

/* Style the custom label as a button */
.custom-logo-label {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  margin-top: 10px;
  align-self: center;
}


.blue-square{
  display: flex;
  flex-grow: 3;
  min-width: 100px;
  min-height: 100px;
  max-height: 150px;
  max-width: 150px;
  height: 27vh;
  width: 27vh;
  background-color: var(--c-accent);
  border-radius: 1vh;
  justify-content: center;
}
.blue-square p{
  justify-self: center;
  align-self: center;
  font-weight: 400;
  font-size: 0.8em;
  color:var(--c-ft-semi-light);
}

/* Style the image to fit within the blue square */
.logo-image {
  max-width: 100%;
  max-height: 100%;
}

.button-add-logo {
  align-self: center;
  min-width: 100px;
  max-width: 150px;
  min-height: 30px;
  width: 27vh; 
  border: none;
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.6em;
  font-weight: 500;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 0.2vw 1vw;
  cursor: pointer;
}

.selection-box-jeec {
  min-height: 35px;
  width: 100%; 
  border: 1px solid var(--c-ft-semi-light);
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 0.5vh 0.5vw;
  font-size: 0.8em;
  color: var(--c-ft-semi-light);
  background-color: #FFFFFF;
}

.inputjeec{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap:1vh;
}

.inputtier{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap:1vh;
}

.selection-box-tier {
  min-height: 35px;
  width: 100%;
  border: 1px solid var(--c-ft-semi-light);
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 0.5vh 0.5vw;
  font-size: 0.8em;
  color: var(--c-ft-semi-light);
  background-color: #FFFFFF;
}

.button-add-pop-up {
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 1.1em;
  font-weight: 500;
  color: #FFFFFF;
  background-color: #152259;
  padding: 8px 5px 8px 5px;
  cursor: pointer;
  align-self: flex-end;
}


@media (max-width: 700px) {

  .hide-on-mobile {
    display: none;
    background: rgba(0,0,0,0.5);
  }

  .backdrop-mobile{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
  }
  
  .container {
    flex-direction: column; /* Stack the elements vertically */
  }

  .roles_table {
    max-height: 700px;
    height: 78vh;
  }

  .roles-card {
    position: absolute; /* Position the roles card absolutely */
    top: 120px; /* Position the roles card 50px below the center */
    width: 90vw; /* Set the width to 100% */
    max-width: fit-content;
    max-height: 600px;
    height: 80vh; /* Set the height to 100% */
  }
  .roles-card-body h1{
    font-size: 1em;
  }
  .roles-card-body p{
    font-size: 0.9em;
  }

  .card-name{
    font-size:1.9em;
  }

  .card-subtitle{
    font-size:1.3em;
  }

  .card-tier{
    font-size: 1.9em;
  }

  .roles-logo {
    width: 40vw;
    height: 40vw;
    max-width: 150px;
    max-height: 150px;
    border-radius: 50%;
    object-fit: cover;
  }

  .icon-button {
    max-height: 40px;
    max-width: 40px;
  }

  .icon {
    max-width: 35px;
    max-height: 20px;
  }

  .tier-pop-up{
    padding: 50px 30px 50px 30px;
  }
  .second-column{
    align-content: center;
    width: fit-content;
    font-size: 1em;
  }

}


  
</style>