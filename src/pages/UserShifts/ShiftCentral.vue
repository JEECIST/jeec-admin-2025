<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css';
import axios from "axios";

// BACKEND STRUCTURE:

// days --> day.name
//          day.week_day
//          day.shifts --> shift.id, 
//                         shift.weekDay, 
//                         shift.timeSlot, 
//                         shift.name, 
//                         shift.roles --> role.id, 
//                                         role.name, 
//                                         role.teamUsers --> teamUser.id, 
//                                                            teamUser.username, 
//                                                            teamUser.team


/* function normalizeStr(str) {
  if (typeof str !== 'string') {
    // Return an empty string if the input is not a string
    return '';
  }
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
} */

/* const rows = computed(() => {
  if (!props.data.length) 
    return []
  else
    var filter = props.data.filter(row => {
        return Object.values(row).some(
          cell => !props.searchInput || ((typeof cell === 'string')
            ? normalizeStr(role.name).includes(normalizeStr(props.searchInput))
            : normalizeStr(cell).toString(10).includes(normalizeStr(props.searchInput))
          ))
      })
      var isEmpty = false
      if (filter == 0)
      {
        isEmpty = true
        emit ('notFound', isEmpty)
        return []
      } 
      else{
        isEmpty = false
        emit ('notFound', isEmpty)
        return filter
      }
       
}) */

const days = ref([]);

/* fetch backend data */
const fetchData = () => {
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/shifts', {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
    }).then((response) => {
    days.value = response.data.days
    console.log("SHIFTS:", JSON.parse(JSON.stringify(response.data.days)));

    if(days.value.length == 0){
      noShifts.value = true;
    }
    else {
      noShifts.value = false;
    }

  }).catch((error) => {
    console.log(error)
  })
}
onMounted(fetchData)

/* SHIFTS MANAGEMENT * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const noShifts = ref(true);
const shiftsPopupShow = ref(false);
const newShifts = ref({
    date_start: null,
    date_end: null,
    time_start: null,
    time_end: null,
    slot_time: null,
});

/* popups */
function openShiftsPopup() { shiftsPopupShow.value = true; }

function closeShiftsPopup() {
  shiftsPopupShow.value = false;
  newShifts.value = null;
}

/* create shifts */
function createShifts(newShifts) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(newShifts)) { formData.append(key, value); }
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/create-shift', formData, {
    auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
    },  headers: { 'Content-Type': 'multipart/form-data' }, 
  }).then(() => {
    fetchData();
  }).catch((error) => {
    console.log(error)
  })
  closeShiftsPopup();
}

/* shift (slot) selection */
const selectedShift = ref(null);
const selectedDay = ref(null);

function selectSlot(shift, day) {
  if (selectedShift.value?.id === shift.id) {
    selectedShift.value = null;
    selectedDay.value = null;
  } else {
    selectedShift.value = shift;
    selectedDay.value = day;
  }
  return
}

function isSelected(shift) {
  return selectedShift.value?.id === shift.id;
}

/* delete all shifts */
function deleteAll() {
  const formData = new FormData();

  axios.delete(
    `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/shifts/delete`,
    {
      data: formData,
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  ).then(() => {
    fetchData();
  }).catch((error) => {
    console.error("Failed to delete shifts!:", error);
  });
}

/* ROLE MANAGEMENT * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* popups */
const rolePopupShow = ref(false);
const newRoleName = ref("");
const addChoice = ref("thisShift");

function openRolePopup(shift) {
  selectedShift.value = shift;
  newRoleName.value = "";
  rolePopupShow.value = true;
}

function closeRolePopup() {
  rolePopupShow.value = false;
  newRoleName.value = "";
  addChoice.value = "";
}

/* add new shift role */
function addNewRole(newRoleName, selectedShift, addChoice) {
  const formData = new FormData();
  formData.append("shift_id", selectedShift.id);
  formData.append("name", newRoleName);
  formData.append("add_choice", addChoice);
  axios.post(`${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/new-shift-role`, formData, {
    auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
    },  headers: { 'Content-Type': 'multipart/form-data' }, 
  }).then(() => {
    fetchData();
  }).catch((error) => {
    console.log(error)
  })
  closeRolePopup();
}

/* remove an existent role */
function removeRole(shift, role) {
  const formData = new FormData();
  formData.append("id", role.id);

  axios.delete(
    `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/shifts/role/delete`,
    {
      data: formData,
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  ).then(() => {
    fetchData();
  }).catch((error) => {
    console.error("Failed to delete role:", error);
  });
}

// function removeRole(shift, role) {
//   const idx = shift.roles.indexOf(role);
//   if (idx > -1) shift.roles.splice(idx, 1);
// }

/* COLLABORATORS MANAGEMENT * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const users = ref([]);

/* fetch user data */
const fetchTeamUsers = () => {
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/userss', {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
  }).then((response) => {
    users.value = response.data.users;
    console.log('COLLABORATORS:', response.data.users);
  }).catch((error) => {
    console.log(error)
  })
}

/* popups */
const collabPopupShow = ref(false);
const selectedUsers = ref([]);
const selectedRoleForAdd = ref(null);

function openCollabPopup(role) {
  collabPopupShow.value = true;
  selectedRoleForAdd.value = role;
  selectedUsers.value = [];
  fetchTeamUsers();
}

function closeCollabPopup() {
  collabPopupShow.value = false;
  selectedRoleForAdd.value = null;
  selectedUsers.value = [];
}

/* assign team users (collaborators) */
function addCollaborator(role, users) {
  const formData = new FormData();
  formData.append("shift_id", selectedShift.value.id);
  formData.append("role_id", role.id);

  users.forEach(user => {
    formData.append("users[]", user.user);
    console.log(user.user);
  });

  axios.post(`${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/new-role-user`, formData, {
    auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
    },  headers: { 'Content-Type': 'multipart/form-data' }, 
  }).then(() => {
    fetchData();
  }).catch((error) => {
    console.log(error)
  })
  closeCollabPopup();
}

/* remove collaborators from a role */
function removeCollaborator(role, collaborator) {
  const formData = new FormData();
  formData.append("id", role.id);
  formData.append("user_id", collaborator.id);

  axios.delete(
    `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/shifts/role/user/delete`,
    {
      data: formData,
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  ).then(() => {
    fetchData();
  }).catch((error) => {
    console.error("Failed to remove collaborator:", error);
  });
}

// function removeCollaborator(role, collaborator) {
//   const idx = role.teamUsers.indexOf(collaborator);
//   if (idx > -1) role.teamUsers.splice(idx, 1);
// }

const message = ref();
</script>

<!-- # # # # # # # # # # # # # # # # # # # #   TEMPLATE   # # # # # # # # # # # # # # # # # # # # -->

<template>
  <div class="everything-wrap">

    <!-- no shifts view -->
    <div class="create-shifts-btn" v-if="noShifts">
      <button class="add-shifts-btn" @click="openShiftsPopup()">
        <p>Create Shifts</p>
      </button>
    </div>

    <!-- add shifts popup -->
      <div class="popup-mask" v-if="shiftsPopupShow">
        <div class="shifts-popup">
          <div class="header">
            <h1>Create Shifts</h1>
            <button class="close-shifts-popup" @click="closeShiftsPopup">X</button>
          </div>
          <div class="elements">
            <div>
              <div class="first-row">
                <!-- From -->
                <div class="labels" id="date_start">
                  <label for="date_start">From (Start Day)</label>
                  <input type="date" v-model="newShifts.date_start" id="date_start">
                </div>

                <!-- To -->
                <div class="labels" id="date_end">
                  <label for="date_end">To (End Day)</label>
                  <input type="date" v-model="newShifts.date_end" id="date_end">
                </div>

                <!-- Starting at -->
                <div class="labels" id="time_start">
                  <label for="time_start">Starting at (Hour)</label>
                  <input type="time" v-model="newShifts.time_start" id="time_start">
                </div>

                <!-- Ending at -->
                <div class="labels" id="time_end">
                  <label for="time_end">Ending at (Hour)</label>
                  <input type="time" v-model="newShifts.time_end" id="time_end">
                </div>
              </div>
                  
              <div class="second-row">
                <!-- Time Interval -->
                <div class="labels" id="slot_time">
                  <label for="slot_time">Time Interval (Individual Slot Time in MINUTES!!!)</label>
                  <input type="number" v-model="newShifts.slot_time" id="slot_time">
                </div>

                <div class="btns-shifts">
                  <button class="add-shifts" @click="createShifts(newShifts)">Create Shifts</button>
                </div>                      
              </div>
            </div>
          </div>
        </div>
      </div>

    <!-- full schedule view -->
    <div>
      <div class="shift-table" v-if="!noShifts && !selectedShift">
        <div class="week">
            <div class="wrap">
                <div v-for="day in days" :key="day.week_day" class="day">
                <div class="weekday">
                    <p>{{ day.name }}</p>
                    <p>{{ day.week_day }}</p>
                </div>
                <div v-for="shift in day.shifts" :key="shift.id" class="slot-scroll-container">
                    <button @click="selectSlot(shift, day)" :class="isSelected(shift) ? 'slot-selected' : 'slot-not-selected'">
                        <p>{{ shift.timeSlot }}</p>
                    </button>
                </div>
                </div>
            </div>
            <button class="reset" @click="deleteAll()" >Reset</button>
        </div>
      </div>

      <!-- shift editor view -->
      <div class="shift-editor" v-if="selectedShift">

        <!-- add role popup -->
        <div class="popup-mask" v-if="rolePopupShow">
          <div class="popup">
            <button class="close-popup" @click="closeRolePopup">X</button>
            <input v-model="newRoleName" placeholder="Enter New Role Name" class="search-input" @keyup.enter="addNewRole" />

            <!-- role options -->
             <div class="check roleopt">
                <label class="radio-option">
                  <input type="radio" name="roleoptions" v-model="addChoice" :value="'allShifts'">
                  <span>Adicionar a todos os shifts</span>
                </label>

                <label class="radio-option">
                  <input type="radio" name="roleoptions" v-model="addChoice" :value="'dayShifts'">
                  <span>Adicionar a todos os shifts deste dia</span>
                </label>

                <label class="radio-option">
                  <input type="radio" name="roleoptions" v-model="addChoice" :value="'hourShifts'">
                  <span>Adicionar a todos os shifts a esta hora</span>
                </label>

                <label class="radio-option">
                  <input type="radio" name="roleoptions" v-model="addChoice" :value="'thisShift'">
                  <span>Adicionar apenas a este shift</span>
                </label>
              </div>

            <div class="btns">
              <button class="add" @click="addNewRole(newRoleName, selectedShift, addChoice)">Add</button>
            </div>
          </div>
        </div>

        <!-- add collaborator popup -->
        <div class="popup-mask" v-if="collabPopupShow">
          <div class="collab-popup">
            <button class="close-popup" @click="closeCollabPopup">X</button>
            <div class="select-wrap">
              <div class="labels" id="teamUser">
                <label for="teamUser">Select a JEEC Collaborator</label>
                <Multiselect
                  class="multiselect"
                  v-model="selectedUsers"
                  :options="users"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="true"
                  :preserve-search="true"
                  label="username"
                  track-by="user"
                  placeholder="Select..."
                ></Multiselect>
              </div>
            </div>
            <div class="btns">
              <button class="add" @click="addCollaborator(selectedRoleForAdd, selectedUsers)">Add</button>
            </div>
          </div>
        </div>

        <!-- main page -->
        <div class="editor-wrap">

          <!-- daily shift table -->
          <div class="day">
            <div class="weekday">
              <p>{{ selectedDay.name }}</p>
              <p>{{ selectedShift.weekDay }}</p>
            </div>
            <div v-for="shift in selectedDay.shifts" :key="shift.id" class="slot-scroll-container">
              <button @click="selectSlot(shift, selectedDay)" :class="isSelected(shift) ? 'slot-selected' : 'slot-not-selected'">
                <p>{{ shift.timeSlot }}</p>
              </button>
            </div>
            <button class="close-btn" @click="selectSlot(selectedShift, selectedDay)">Go to full schedule ></button>
          </div>

          <!-- roles and collaborators' view -->
          <div class="shift-name"> 
            <div class="top">
            <h1>{{ selectedDay.name }}</h1>
            <form class="searchbar">
                <label> <img src="../../assets/search.svg"> </label>
                <input v-model="message" placeholder="Search for Roles or Users">
            </form>
            </div> 

            <!-- role -->
            <div v-for="role in selectedShift.roles" :key="role.id" class="role">
              <div class="shift-role-name">
                <button class="delete-btn" @click="removeRole(selectedShift, role)"> <img src="../../assets/trash.svg"> </button>
                <h2 >{{ role.name }}</h2>
              </div>
              <button class="add-btn" @click="openCollabPopup(role)" >Add Collaborator</button>

              <!-- collaborators' cards -->
              <div class="collaborators-wrap">
                <div v-for="teamUser in role.teamUsers" :key="teamUser.id" class="collaborator" >
                  <div class="collaborator-photo">
                    <img src="../../assets/jeec25.png" alt="Profile Image" class="pfp">

                    <!-- users don't have photos (in the backend model) for now... -->
                    <!-- <img v-if="collaborator_image" :src="collaborator_image" alt="Collaborator Photo" />
                    <span v-else><img src="../../assets/jeec25.png" alt="Profile Image" class="pfp"><br></span> -->
                  </div>
                  <div class="collaborator-info">
                    <div class="collaborator-name">{{ teamUser.username }}</div>
                    <div class="collaborator-team">{{ teamUser.team }}</div>
                  </div>
                  <div class="delete-btn-wrap"> 
                    <button class="delete-btn" @click="removeCollaborator(role, teamUser)"> <img src="../../assets/trash.svg"> </button>
                  </div>
                </div>
              </div>

            </div>

            <button class="add-btn" @click="openRolePopup(selectedShift)">New Shift Role</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

@import './ShiftCentral.css';

</style>