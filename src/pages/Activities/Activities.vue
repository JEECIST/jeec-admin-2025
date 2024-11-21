//Por as dashboard do mesmo tamanho
//Fechar tudo com cruzes, pop ups e dashboards
//dashboard é popup em telemovel

<template>
  <div class="wrapper">
    <div class="no-events-message" v-if="tableData.length === 0">
      <p>No Event Days found</p>
    </div>
    <div class="table-with-buttons" v-if="tableData.length > 0">
      <div class="buttons">
        <button class="add-btn" @click="addPopUp">Add Activity</button>
        <button class="types-btn" @click="goToActivitiesTypes">Activity Types ></button>
      </div>
      <div class="table">
        <TheTable
          :data="tableData"
          :tableHeaders="headers"
          :searchInput="searchQuery"
          @onRowSelect="handleRowSelect"
        />
      </div>
    </div>
    <div class="dashboard" v-if="showDashboard">
      <div class="dashboard-header">
        <h1 class="dbWeekday">{{ selectedRow.Weekday }}</h1>
        <img class="JEEC-Logo" :src="selectedRow.Logo" alt="JEEC Logo" />
          <div class="dashboard-title">
            <p class="dbDate">{{ selectedRow.Date }}</p>
            <p class="dashboard-subtitle">Activities</p>
          </div>
          <div class="dashboard-buttons">
            <button @click="editRow(selectedRow)" class="image-button">
              <img src="../../assets/pencil.svg">
            </button>
            <button @click="goToActivitiesDay" class="image-button">
              <img src="../../assets/sheet.svg">
            </button>
            <button @click="deleteRow(selectedRow)" class="image-button">
              <img src="../../assets/trash.svg">
            </button>
          </div>
          <div class="dashboard-body">
            <div class="dashboard-paragraph">
              <h1>Activities</h1>
              <p>{{ selectedRow.NumberActivities }}</p>
            </div>
            <div class="dashboard-paragraph">
              <h1>JobFair</h1>
              <p>{{ selectedRow.NumberJobFair }}</p>
            </div>
          </div>
      </div>
    </div>
    <div class=" pop-up-overlay" v-if="showModal"> 
      <div class="pop-up">
      <form @submit.prevent="addNewActivity">
        <div class="form-group title-group">
          <h2>Add New Activity</h2>
        </div>
        
        <div class="form-group name-group">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" v-model="newActivity.name">
        </div>

        <div class="form-group activity-type-group">
            <label for="activity-type">Activity Type:</label>
            <select id="activity-type" name="activity-type" v-model="newActivity.type">
              <option value="" selected disabled hidden>Select Activity</option>
              <option value="Nhe">Nhe</option>
              <option value="Fixe">Fixe</option>
              <option value="Muito Louco">Muito Louco</option>
            </select>
        </div>

        <div class="form-group description-group">
            <label for="description">Description:</label>
            <textarea id="description" name="description" v-model="newActivity.description"></textarea>
        </div>

        <div class="form-group">
            <label for="day">Day:</label>
            <select id="day" name="day" v-model="newActivity.day">
              <option value="" selected disabled hidden>Select day</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
            </select>
        </div>

        <div class="form-group">
            <label for="start-time">Start Time:</label>
            <input type="text" id="start-time" name="start-time" v-model="newActivity.startTime">
        </div>

        <div class="form-group">
            <label for="end-time">End Time:</label>
            <input type="text" id="end-time" name="end-time" v-model="newActivity.endTime">
        </div>

        <div class="form-group">
            <label for="qr-code">End Time QR Codes:</label>
            <input type="text" id="qr-code" name="qr-code" v-model="newActivity.qrCode">
        </div>

        <div class="form-actions">
            <button type="submit" class="pop-up-add-btn">Add</button>
            <button type="button" class="pop-up-close-btn" @click="closePopUp">Close</button>
        </div>
      </form>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TheTable from '../../global-components/TheTable.vue';

const router = useRouter();
function goToActivitiesTypes() {
  router.push("/activities/types");
}

function goToActivitiesDay(){
  router.push("/activities/day");
}

const tableData = ref([
  { Date: '19-02-2024', Weekday: 'Monday',    NumberActivities: 8, NumberJobFair: 20, Logo: "src/assets/wrizz.jpg"},
  { Date: '20-02-2024', Weekday: 'Tuesday',   NumberActivities: 9, NumberJobFair: 20, Logo: "src/assets/wrizz.jpg"},
  { Date: '21-02-2024', Weekday: 'Wednesday', NumberActivities: 8, NumberJobFair: 20, Logo: "src/assets/wrizz.jpg"},
  { Date: '22-02-2024', Weekday: 'Thursday',  NumberActivities: 9, NumberJobFair: 20, Logo: "src/assets/wrizz.jpg"},
  { Date: '23-02-2024', Weekday: 'Friday',    NumberActivities: 8, NumberJobFair: 20, Logo: "src/assets/wrizz.jpg"},
]);

const headers = ref ({
  Date: 'Day',
  Weekday: 'Weekday',
  NumberActivities: '# Activities',
  NumberJobFair: '# Job Fair'
});

const searchQuery = ref('');
const showDashboard = ref(false);
const selectedRow = ref(null);

const showModal = ref(false); //Controla se o pop-up está visível
const newActivity = ref({ 
  name: '', 
  type: '', 
  description: '',
  day: '',
  startTime: '',
  endTime: '',
  qrCode: '' }); // Dados da nova atividade

function addPopUp() {
  showModal.value = true;
}

function closePopUp() {
  showModal.value = false;
  newActivity.value = { name: '', type: '', description: '' };
}

function addNewActivity() {
  if (!newActivity.value.name || !newActivity.value.type || !newActivity.value.description ||
      !newActivity.value.day || !newActivity.value.startTime || !newActivity.value.endTime || 
      !newActivity.value.qrCode) 
      {
        alert('Please fill out all fields.');
  } else {
    console.log('New Activity:', newActivity.value);
    closePopUp();
  }
}

function handleRowSelect(row) {
  console.log('Row selected:', row);
  selectedRow.value = row;
  showDashboard.value = true;
}

function editRow(row) {
  console.log('Edit button clicked for row:', row);
}

function deleteRow(row) {
  console.log('Delete button clicked for row:', row);
}
</script>


<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 5ch 3ch 3ch 3ch;
  overflow-y: hidden;
}

.no-events-message {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 2vw;
  color: #4F4F4F;
  background-color: #EBF6FF;
  font-weight: 500; 
}

.table-with-buttons{
  display: flex;
  flex-direction: column;
  width: 100%;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-bottom: 1.5rem;
  padding-right: 3ch;
}

button {
  padding: 0.8rem 0.6rem;
  border: none;
  background-color: #5a9bd5;
  color: white;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  font-family: 'Kumbh Sans', sans-serif;
  font-weight: 550;
}

button:hover {
  background-color: #4782c0;
}

.add-btn {
  background-color: #5a9bd5;
}

.types-btn {
  background-color: #5a9bd5;
}

.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3ch;
  padding-right: 3ch;
}

.dashboard {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 3vh 2.5vw;
  max-height: max-content;
  width: 25vw;
  background-color: var(--c-accent);
  border-radius: 2vh;
  gap: 2vh;
  min-height: 100%;
}

.dashboard-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5vw 1vw;
  gap:1vw;
}

.dbWeekday{
  text-transform: uppercase;
  font-size: 1.7vw;
}

.JEEC-Logo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
}

.dashboard-title{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:fit-content;
}

.dbDate{
  font-weight: 800;
  color: var(--c-ft-dark);
  font-size:1.5vw;
  margin-bottom: 5px;
}

.dashboard-subtitle{
  color: var(--c-ft-semi-light);
  font-size:1.1vw;
}

.dashboard-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5vw 1vw;
  gap: 1vw;
}

.image-button {
  background-color: var(--c-bg-light);
  border: none;
  border-radius: 20%;
  cursor: pointer;
  align-content: space-between;
  width:  2.5vw;
  height: 2.5vw;
  display: center;
  justify-content: center;
  padding: 1%;
}

.image {
  width: 2vw;
  height: 2vw;
  color: var(--c-ft-dark);
}

.dashboard-body{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  gap: 1.5vh;
}

.dashboard-body h1{
  color: var(--c-ft-dark);
  font-size: 0.9vw;
  font-weight: 700;
}

.dashboard-body p{
  font-size: 0.8vw;
  color: #A7A7A7;
}

.pop-up-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.pop-up {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 500px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

form {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
}

form label {
    display: block;
    margin-bottom: 5px; /* Espaço entre o rótulo e o input */
}

form input, form select, form textarea {
    width: 100%;
}

.form-group {
    display: flex;
    flex-direction: column;
    grid-column: span 2;
}

.title-group{
  grid-column: span 6;
}

.name-group {
    grid-column: span 3;
}

.activity-type-group {
    grid-column: span 3;
}

.description-group{
  grid-column: span 6;
}

.form-actions {
    grid-column: span 6;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}

.pop-up h2 {
  margin-bottom: 10px;
}

.pop-up input,
.pop-up select,
.pop-up textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.pop-up-add-btn {
  background-color: #152259;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pop-up-close-btn {
  background-color: #ccc;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pop-up-add-btn:hover {
  background-color: #4782c0;
}

.pop-up-close-btn:hover {
  background-color: #999;
}
</style>
