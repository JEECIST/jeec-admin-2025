<template>
  <div class="wrapper">
    <div class="no-events-message" v-if="tableDataActivities.length === 0 && tableDataJobFair.length === 0">
      <p>No Event Days found</p>
    </div>
    <div class="left-container">
      <div class="tables-with-title" v-if="tableDataActivities.length > 0 && tableDataJobFair.length > 0 && !(isMobile && showDashboard)">
        <div class="title-activities">
          <h1>Activities</h1>
        </div>
        <div class="table-activities">
          <TheTable
            :data="tableDataActivities"
            :tableHeaders="headersActivities"
            :searchInput="searchQuery"
            @onRowSelect="handleRowSelect"
          />
        </div>
        <div class="title-job-fair">
          <h1>Job Fair</h1>
        </div>
        <div class="table-job-fair">
          <TheTable
            :data="tableDataJobFair"
            :tableHeaders="headersJobFair"
            :searchInput="searchQuery"
            @onRowSelect="handleRowSelect"
          />
        </div>
      </div>
    </div>
    <div class="right-popup" v-if="showDashboard">
      <div class="right-popup-header">
        <button @click="closeDashboard" class="close-btn">×</button>
        <img class="JEEC-Logo" :src="selectedRow.Logo" alt="JEEC Logo" />
          <div class="right-popup-title">
            <p class="dbType">{{ selectedRow.Type }}</p>
            <p class="right-popup-subtitle">{{ selectedRow.Subtitle }}</p>
          </div>
          <div class="right-popup-buttons">
            <button @click="addPopUp/*editRow(selectedRow)*/" class="image-button">
              <img src="../../assets/pencil.svg">
            </button>
            <button @click="deleteRow(selectedRow)" class="image-button">
              <img src="../../assets/trash.svg">
            </button>
          </div>
          <div class="right-popup-body">
            <div class="right-popup-paragraph">
              <div class="paragraph-item">
                <h1>Start Time</h1>
                <p>{{ selectedRow.StartTime }}</p>
              </div>
              <div class="paragraph-item">
                <h1>End Time</h1>
                <p>{{ selectedRow.EndTime }}</p>
              </div>
            </div>
            <div class="right-popup-paragraph">
              <div class="paragraph-item">
                <h1>Name</h1>
                <p>{{ selectedRow.Name }}</p>
              </div>
            </div>
            <div class="right-popup-paragraph" v-if="!isMobile">
              <div class="paragraph-item">
                <h1>End Time QR Codes</h1>
                <p>{{ selectedRow.EndTime }}</p>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div class="pop-up-overlay" v-if="showModal"> 
      <div class="pop-up">
        <button @click="closePopUp" class="close-btn">×</button>
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
        </div>
      </form>
      </div>
    </div>
  </div>    
</template>

<script setup>
import axios from 'axios';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import TheTable from '../../global-components/TheTable.vue';


const tableDataActivities = ref([
  { ID: '3',  StartTime: '10:00',    EndTime: "11:00", Name: "Como transformar o caos em ordem", Type: "Workshop",        Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '42', StartTime: '11:00',    EndTime: "11:30", Name: "15/15 with Oracle",                Type: "15/15",           Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '24', StartTime: '12:00',    EndTime: "13:30", Name: "Ética na Engenharia",              Type: "Discussion Panel",Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '36', StartTime: '14:00',    EndTime: "14:30", Name: "BLA BLA BLA",                      Type: "15/15",           Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '12', StartTime: '14:30',    EndTime: "15:30", Name: "YAPPING YAPPING",                  Type: "Inside Talks",    Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '19', StartTime: '15:30',    EndTime: "16:00", Name: "YAPPING YAPPING YAPPING",          Type: "15/15",           Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '40', StartTime: '16:00',    EndTime: "17:00", Name: "YAPPING YAPPING YAPPING YAPPING",  Type: "Workshop",        Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '7',  StartTime: '17:00',    EndTime: "18:30", Name: "YAPPING YAPPING YAPPING",          Type: "Main Speaker",    Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '29', StartTime: '18:30',    EndTime: "20:00", Name: "YAPPING YAPPING",                  Type: "Alumni Talks",    Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
]);

const headersActivities = computed(() => {
  if (isMobile.value) {
    return {
      ID: 'ID',
      StartTime: 'StartTime',
      EndTime: 'EndTime',
      Name: 'Name',
      Type: 'Type'
    };
  }

  return {
    ID: 'ID',
    Name: 'Name',
    Type: 'Type'
  };
});

const tableDataJobFair = ref([
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Type: "Job Fair", Logo: "/src/assets/wrizz.jpg"},
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Type: "Job Fair", Logo: "/src/assets/wrizz.jpg"},
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Type: "Job Fair", Logo: "/src/assets/wrizz.jpg"},
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Type: "Job Fair", Logo: "/src/assets/wrizz.jpg"},
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Type: "Job Fair", Logo: "/src/assets/wrizz.jpg"},
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Type: "Job Fair", Logo: "/src/assets/wrizz.jpg"},
]);

const headersJobFair = computed(() => {
  if (isMobile.value) {
    return {
      ID: 'ID',
      Name: 'Company',
      Type: 'Type'
    };
  }

  return {
    ID: 'ID',
    StartTime: 'StartTime',
    EndTime: 'EndTime',
    Name: 'Company',
    Type: 'Type'
  };
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
  qrCode: '' });

const isMobile = ref(false);

const updateIsMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 768px)').matches;
};

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});

function closeDashboard() {
  showDashboard.value = false;
}

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
</script>


<style scoped>
.wrapper {
  display: flex;
  box-sizing: border-box;
  padding: 5ch 3ch 3ch 3ch;
  overflow-y: hidden;
  width: calc(200dvh - var(--sidebar-width));
  height: calc(100vh - var(--header-height));
  background: #FFFFFF;
}

.left-container{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

.no-events-message {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 25px;
  color: #4F4F4F;
  background-color: #EBF6FF;
  font-weight: 500; 
}

.tables-with-title{
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
}

.tables-with-title::-webkit-scrollbar {
  display: none;
}

.title-activities, .title-job-fair{
  color: black;
  padding-bottom: 3vh;
}

.table-activities, .table-job-fair {
  flex-grow: 1;
  transition: flex-grow 0.3s ease;
  margin-top: 1vh;
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

.right-popup {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 3vh 2.5vw;
  height: 100%;
  width: 400px;
  margin-left: 20px;
  margin-right: 0px;
  margin-top: -1px;
  border-radius: 10px;
  background-color: var(--c-accent);
  gap: 2vh;
  overflow-y: auto;
}

.right-popup-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5vw 1vw;
  gap: 5%;
}

.close-btn {
  position: absolute;
  top: 2%;
  right: 2%;
  background: none;
  border: none;
  font-size: 1.5vw;
  color: #333;
  cursor: pointer;
  font-weight: bold;
  z-index: 999;
  padding: 0em;
  border-radius: 50%;
  width: 3vw;
  height: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-btn:hover,
.close-btn:focus {
  color: #666;
  background-color: transparent;
}

.JEEC-Logo {
  width: 150px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
}

.right-popup-title{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:fit-content;
}

.dbType{
  font-weight: 800;
  color: var(--c-ft-dark);
  font-size: 20px;
  margin-bottom: 5px;
}

.right-popup-subtitle{
  color: var(--c-ft-semi-light);
  font-size: 15px;
}

.right-popup-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1%;
  gap: 5%;
}

.image-button {
  background-color: var(--c-bg-light);
  border: none;
  border-radius: 20%;
  cursor: pointer;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.image {
  width: 80%;
  height: auto;
  object-fit: contain;
}

.right-popup-body{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  gap: 1vh;
}

.right-popup-body h1{
  color: var(--c-ft-dark);
  font-size: 14px;
  font-weight: 700;
}

.right-popup-body p{
  font-size: 14px;
  color: #A7A7A7;
}

.right-popup-paragraph {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.paragraph-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5vh;
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
  position: relative;
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

.pop-up .close-btn {
  font-size: 2vw;
}

form {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
}

form label {
    display: block;
    margin-bottom: 5px;
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

.pop-up-add-btn:hover {
  background-color: #4782c0;
}
</style>