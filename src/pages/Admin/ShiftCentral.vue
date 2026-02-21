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

function goBack() {
  selectedShiftId.value = null;
}

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

    if (days.value.length == 0) {
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
  fetchData();
}

/* create shifts */
function createShifts(newShifts) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(newShifts)) { formData.append(key, value); }
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/create-shift', formData, {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
    }, headers: { 'Content-Type': 'multipart/form-data' },
  }).then(() => {
    fetchData();
  }).catch((error) => {
    console.log(error)
  })
  closeShiftsPopup();
}

/* shift (slot) selection */
const selectedShiftId = ref(null);

// Automatically finds the shift object whenever 'days' or 'selectedShiftId' changes
const selectedShift = computed(() => {
  if (!selectedShiftId.value || days.value.length === 0) return null;

  for (const day of days.value) {
    const foundShift = day.shifts.find(s => s.id === selectedShiftId.value);
    if (foundShift) return foundShift;
  }
  return null;
});

// Automatically finds the day object belonging to the selected shift
const selectedDay = computed(() => {
  if (!selectedShiftId.value || days.value.length === 0) return null;

  return days.value.find(day =>
    day.shifts.some(s => s.id === selectedShiftId.value)
  ) || null;
});

function selectSlot(shift, day) {
  // We only need to toggle the ID now
  if (selectedShiftId.value === shift.id) {
    selectedShiftId.value = null;
  } else {
    selectedShiftId.value = shift.id;
  }
}

function isSelected(shift) {
  return selectedShiftId.value === shift.id;
}

/* delete all shifts */
function deleteAll() {
  const formData = new FormData();

  if (!confirm("Are you sure you want to delete all days and shifts?")) {
    return;
  }

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
const removeRolePopupShow = ref(false);
const rolePopupShow = ref(false);
const descriptionShow = ref(false);
const newRoleName = ref("");
const newRoleDescription = ref("");
const addChoice = ref("thisShift");
const removeChoice = ref("thisShift");

function openRolePopup(shift) {
  selectedShift.value = shift;
  newRoleName.value = "";
  newRoleDescription.value = "";
  rolePopupShow.value = true;
}

function openRemoveRolePopup(role){
  selectedRoleForRemove.value = role;
  removeRolePopupShow.value = true;
}

function openDescription(role) {
  descriptionShow.value = true;
  selectedRole.value = role;
  description.value = selectedRole.description
}

function closeDescription() { descriptionShow.value = false; }

function closeRolePopup() {
  rolePopupShow.value = false;
  removeRolePopupShow.value = false;
  newRoleName.value = "";
  newRoleDescription.value = "";
  addChoice.value = "";
  removeChoice.value = "";
  selectedRoleForRemove.value = null;

  fetchData();
}

/* add new shift role */
function addNewRole(newRoleName, newRoleDescription, selectedShift, addChoice) {
  const formData = new FormData();
  formData.append("shift_id", selectedShift.id);
  formData.append("name", newRoleName);
  formData.append("description", newRoleDescription);
  formData.append("add_choice", addChoice);
  axios.post(`${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/new-shift-role`, formData, {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
    }, headers: { 'Content-Type': 'multipart/form-data' },
  }).then(() => {
    fetchData();
  }).catch((error) => {
    console.log(error)
  })
  closeRolePopup();
}

/* remove an existent role */
function removeRole(shift, role, removeChoice) {
  const formData = new FormData();
  formData.append("id", role.id);
  formData.append("remove_choice", removeChoice);

  if (!confirm("Are you sure you want to remove this role?")) {
    return;
  }


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
    closeRolePopup();
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
const selectedRoleForRemove = ref(null);

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
  fetchData();
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
    }, headers: { 'Content-Type': 'multipart/form-data' },
  }).then(() => {
    fetchData();
    closeCollabPopup();
  }).catch((error) => {
    if (error.response && error.response.data) {
      const data = error.response.data;

      if (data.failedUsers && data.failedUsers.length > 0) {

        const userNames = data.failedUsers.map(u => u.username).join(', ');

        alert(`${data.error}\n\nThe following users could not be added:\n${userNames}`);
      } else {
        alert("An unexpected error occurred: " + (data.error || error.message));
      }
    } else {
      console.error(error);
    }

    fetchData(); 
  })
}

/* remove collaborators from a role */
function removeCollaborator(role, collaborator) {
  const formData = new FormData();
  formData.append("id", role.id);
  formData.append("user_id", collaborator.id);

  if (!confirm("Are you sure you want to remove this collaborator from this shift?")) {
    return;
  }


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
                <button @click="selectSlot(shift, day)"
                  :class="isSelected(shift) ? 'slot-selected' : 'slot-not-selected'">
                  <p>{{ shift.timeSlot }}</p>
                </button>
              </div>
            </div>
          </div>
          <button class="reset" @click="deleteAll()">Reset</button>
        </div>
      </div>

      <!-- shift editor view -->
      <div class="shift-editor" v-if="selectedShift">

        <!-- add role popup -->
        <div class="popup-mask" v-if="rolePopupShow">
          <div class="popup">
            <button class="close-popup" @click="closeRolePopup">X</button>
            <input v-model="newRoleName" placeholder="Enter New Role Name" class="search-input"
              @keyup.enter="addNewRole" />
            <input v-model="newRoleDescription" placeholder="Enter New Role Description" class="search-input"
              @keyup.enter="addNewRole" />

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
              <button class="add" @click="addNewRole(newRoleName, newRoleDescription, selectedShift, addChoice)">Add</button>
            </div>
          </div>
        </div>

        <div class="popup-mask" v-if="removeRolePopupShow">
          <div class="popup">
            <button class="close-popup" @click="closeRolePopup">X</button>
            <!-- role options -->
            <div class="check roleopt">
              <label class="radio-option">
                <input type="radio" name="roleoptions" v-model="removeChoice" :value="'allShifts'">
                <span>Remover role de todos os shifts</span>
              </label>

              <label class="radio-option">
                <input type="radio" name="roleoptions" v-model="removeChoice" :value="'thisShift'">
                <span>Remover apenas deste shift</span>
              </label>
            </div>
            <div class="btns">
              <button class="add" @click="removeRole(newRoleName, selectedRoleForRemove, removeChoice)">Remove</button>
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
                <Multiselect class="multiselect" v-model="selectedUsers" :options="users" :multiple="true"
                  :close-on-select="false" :clear-on-select="true" :preserve-search="true" label="username"
                  track-by="user" placeholder="Select..."></Multiselect>
              </div>
            </div>
            <div class="btns">
              <button class="add" @click="addCollaborator(selectedRoleForAdd, selectedUsers)">Add</button>
            </div>
          </div>
        </div>

        <!-- show role description popup -->
        <div class="popup-mask" v-if="descriptionShow">
          <div class="description">
            <p> {{ description }} </p>
            <button class="close-popup" @click="closeDescription">X</button>
          </div>
        </div>

        <!-- main page -->
        <div class="editor-wrap">

          <!-- daily shift table -->
          <div class="day">
            <button class="back-btn" @click="goBack">
              Back
            </button>
            <div class="weekday">
              <p>{{ selectedDay.name }}</p>
              <p>{{ selectedShift.weekDay }}</p>
            </div>
            <div v-for="shift in selectedDay.shifts" :key="shift.id" class="slot-scroll-container">
              <button @click="selectSlot(shift, selectedDay)"
                :class="isSelected(shift) ? 'slot-selected' : 'slot-not-selected'">
                <p>{{ shift.timeSlot }}</p>
              </button>
            </div>
          </div>

          <!-- roles and collaborators' view -->
          <div class="shift-name">

            <div class="top">
              <h1>{{ selectedDay.name }}</h1>
            </div>

            <!-- role -->
            <div v-for="role in selectedShift.roles" :key="role.id" class="role">
              <div class="shift-role-name">
                <button class="delete-btn" @click="openRemoveRolePopup(role)"> <img src="../../assets/trash.svg">
                </button>
                <button class="description-btn" @click="openDescription(role)"> <img src="../../assets/sheet.svg">
                </button>
                <h2>{{ role.name }}</h2>
              </div>
              <button class="add-btn" @click="openCollabPopup(role)">Add Collaborator</button>

              <!-- collaborators' cards -->
              <div class="collaborators-wrap">
                <div v-for="teamUser in role.teamUsers" :key="teamUser.id" class="collaborator">
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
                    <button class="delete-btn" @click="removeCollaborator(role, teamUser)"> <img
                        src="../../assets/trash.svg"> </button>
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
.back-btn {
  background-color: var(--c-accent);
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: Kumbh Sans;
}

.back-btn:hover {
  background-color: #509CDB;
}

.everything-wrap {
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.shift-table {
  height: 100%;
  width: 100%;
}

.week {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.wrap {
  display: flex;
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 1rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  /* justify-content: center; */
}

.day {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 0 0 auto;
  width: auto;
  height: 100%;
  padding-right: 1%;
  padding-left: 1%;
  overflow-y: auto;
  overflow-x: hidden;
}

.weekday {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.slot-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #509CDB;
  border-radius: 10px;
  border: none;
  height: 5.5vh;
  margin: 5px;
  width: 7vw;
}

.slot-not-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--c-accent);
  border-radius: 10px;
  border: none;
  height: 5.5vh;
  margin: 5px;
  width: 7vw;
}

.shift-editor {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 87vh;
  overflow: scroll;
  width: 100vw;
}

.editor-wrap {
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
}

.top {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 30vw;
}

.searchbar {
  display: flex;
  width: 20vw;
  height: 5vh;
  background-color: var(--c-accent);
  line-height: 30px;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  /* flex-grow: 0.7; */
  /* flex-shrink: 100; */
}

form>label>img {
  width: 20px;
  position: relative;
  top: 4px;
  left: 3px;
}

form>input {
  appearance: none;
  background: transparent;
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
  height: 50%;
  outline: none;
  padding: 0px 0px 0px 8px;
  width: 100%;
  text-overflow: ellipsis;
  justify-content: center;
}

form>input::placeholder {
  color: var(--c-ft-semi-light);
  justify-content: center;
  align-items: center;
}

.shift-name {
  margin-left: 1%;
  width: 50vw;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}

.shift-role-name {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  margin-bottom: 1%;

}

.shift-role-name>.delete-btn {
  width: 40px;
  height: 40px;
}

.shift-role-name>.description-btn {
  width: 40px;
  height: 40px;
}

.collaborators-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 3%;
  width: 65vw;
}

.collaborator {
  display: flex;
  flex-direction: row;
  margin-bottom: 2%;
  align-items: center;
  padding: 0.5rem;
  border: 2px solid #509CDB;
  border-radius: 10px;
  width: auto;
  box-sizing: border-box;
  justify-content: space-between;
  align-content: space-between;
  gap: 15px;
}

.collaborator-photo {
  /* flex-shrink: 0; */
  height: 75px;
  width: 75px;
  background-color: #509CDB;
  border-radius: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: white;
  /* aspect-ratio: 1 / 1; */
}

.collaborator-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
}

.pfp {
  /* flex-shrink: 0; */
  height: 75px;
  width: 75px;
  background-color: #509CDB;
  border-radius: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: white;
  /* aspect-ratio: 1 / 1; */
}

.pfp img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
}

.collaborator-info {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 3%;
}

.collaborator-name,
.collaborator-info {
  width: max-content;

}

p {
  font-family: Kumbh Sans;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

h1 {
  margin-bottom: 2%;
}

h2 {
  margin-top: 1%;
  margin-bottom: 1%;
}

button:hover {
  cursor: pointer;
}

.delete-btn {
  height: 50px;
  width: 50px;
  align-items: center;
  vertical-align: middle;
  background-color: var(--c-accent);
  border-radius: 10px;
  border: none;
}

.delete-btn:hover {
  background-color: #509CDB;
}

.description-btn {
  height: 50px;
  width: 50px;
  align-items: center;
  vertical-align: middle;
  background-color: var(--c-accent);
  border-radius: 10px;
  border: none;
}

.description-btn:hover {
  background-color: #509CDB;
}

.description {
  display: flex;
  justify-content: center;
  background-color: white;
  width: 60vw;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border-radius: 15px;
  overflow-y: auto;
  overflow-x: hidden;
}

.description>p {
  display: flex;
  align-items: center;
  vertical-align: center;
  justify-content: center;
  padding: 3.5vw;
  font-weight: 500;
  font-size: large;
  color: (--c-ft-semi-light);
}

.close-btn {
  width: 200px;
  height: 5.5vh;
  background-color: var(--c-accent);
  border-radius: 10px;
  border: none;
  margin-top: 10px;
}

.close-btn:hover {
  background-color: #509CDB;
}

.add-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: var(--c-accent);
  border-radius: 10px;
  border: none;
  height: 40px;
  margin-bottom: 2%;
  width: 8vw;
}

.add-btn:hover {
  background-color: #509CDB;
}

.add-shifts-btn {
  font-size: x-large;
  font-weight: 500;
  color: var(--c-ft);
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: var(--c-accent);
  border-radius: 15px;
  border: none;
  height: 80px;
  margin-bottom: 2%;
  width: 15vw;
  position: absolute;
  top: 30%;
  left: 55%;
  translate: -50% -50%;
}

.add-shifts-btn:hover {
  background-color: #509CDB;
  color: white;
}

.reset {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: var(--c-accent);
  color: var(--c-ft);
  border-radius: 10px;
  border: none;
  height: 40px;
  margin-bottom: 2%;
  width: 20vw;
  font-weight: 500;
  font-size: large;
}

.reset:hover {
  background-color: #509CDB;
  color: white;
}

/* popups */

.popup-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.425);
}

.popup {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 60vw;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border-radius: 15px;
  overflow-y: auto;
  overflow-x: hidden;
}

.collab-popup {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  width: 60vw;
  height: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border-radius: 15px;
  overflow-y: auto;
  overflow-x: hidden;
}

.shifts-popup {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  width: 60vw;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border-radius: 15px;
  overflow-y: auto;
  overflow-x: hidden;
}

.popup>p {
  display: flex;
  align-items: center;
  vertical-align: center;
  justify-content: center;
  padding: 3.5vw;
  font-weight: 500;
  font-size: large;
  color: (--c-ft-semi-light);
}

.close-popup {
  background-color: var(--c-accent);
  border-radius: 5px;
  border: none;
  margin-right: 2%;
  margin-top: 2%;
  margin-bottom: 2%;
  display: flex;
  margin-left: auto;
  width: 3.0vw;
  height: 3.5vh;
  align-items: center;
  justify-content: center;
  gap: 10vh;
  cursor: pointer;
  padding: 0.5vw;
}

.close-shifts-popup {
  background-color: var(--c-accent);
  border-radius: 5px;
  border: none;
  margin-right: 2%;
  margin-bottom: 2%;
  display: flex;
  margin-left: auto;
  width: 3.0vw;
  height: 3.5vh;
  align-items: center;
  justify-content: center;
  gap: 10vh;
  cursor: pointer;
  padding: 0.5vw;
}

.close-popup:hover {
  background-color: #509CDB;
}

.close-shifts-popup:hover {
  background-color: #509CDB;
}

.search-input {
  border-style: solid;
  border-width: thin;
  border-radius: 5px;
  padding: 12px;
  color: #8a8a8a;
  background-color: white;
  height: 5vh;
  width: 60%;
}

.check.roleopt {
  display: flex;
  flex-direction: column;
  color: #515151;
  font-size: small;
  justify-content: flex-start;
}

.radio-option {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  justify-content: flex-start;
}

.radio-option input[type="radio"] {
  cursor: pointer;
}

.collaborator-option {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.collaborator-option:hover {
  background-color: #f0f6ff;
}

.add {
  background-color: var(--c-accent);
  border-radius: 5px;
  border: none;
  margin-top: 2%;
  margin-bottom: 2%;
  display: flex;
  width: 8.4vw;
  height: 3.5vh;
  align-items: center;
  justify-content: center;
  gap: 10vh;
  cursor: pointer;
}

.add-shifts {
  background-color: var(--c-accent);
  border-radius: 5px;
  border: none;
  margin-top: 4%;
  margin-bottom: 2%;
  display: flex;
  width: 12vw;
  height: 5vh;
  align-items: center;
  justify-content: center;
  gap: 10vh;
  cursor: pointer;
}

.add:hover {
  background-color: #509CDB;
}

.add-shifts:hover {
  background-color: #509CDB;
}

.btns {
  width: 60vw;
  display: flex;
  gap: 20px;
  margin-top: 0vh;
  justify-content: center;
  gap: 0.1%;
}

.btns-shifts {
  margin-top: 4vh;
}

.labels {
  display: flex;
  flex-direction: column;
  color: #515151;
  font-size: medium;
  height: 100%;
  margin-bottom: 5%;
}

.select-wrap {
  width: 80%;
}

/* select {
  border-style: solid;
  border-width: thin;
  border-radius: 5px;
  padding: 12px;
  color: #8a8a8a;
  background-color: white;
  height: 5vh;
} */

.multiselect {
  /* border-style: solid;
  border-width: thin;
  border-radius: 5px; */
  padding: 12px;
  color: #8a8a8a;
  background-color: white;
  height: 6vh;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  margin-top: 4%;
  margin-bottom: 1%;
}

/* .labels {
  display: flex;
  flex-direction: column;
  color: #515151;
  font-size: smaller;
  height: 100%;
  width: 10vw;
} */

.labels>#slot_time {
  width: 30vw;
}

.labels>#time_start {
  width: 10vw;
}

.labels>#time_end {
  width: 10vw;
}

.labels>#date_start {
  width: 10vw;
}

.labels>#date_end {
  width: 10vw;
}

.first-row,
.second-row {
  display: flex;
  flex-direction: row;
  width: 53vw;
  justify-content: space-between;
}

input {
  color: #515151;
  border-style: solid;
  border-width: thin;
  border-radius: 5px;
  outline: none;
  height: 5vh;
  /* margin-top: 4%; */
}
</style>