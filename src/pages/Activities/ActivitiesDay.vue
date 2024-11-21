<template>
  <div class="wrapper" v-if="!isMobile()">
    <div class="no-events-message" v-if="tableDataActivities.length === 0 && tableDataJobFair.length === 0">
      <p>No Event Days found</p>
    </div>
    <div class="tables-with-title" v-if="tableDataActivities.length > 0 && tableDataJobFair.length > 0">
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
    <div class="dashboard" v-if="showDashboard">
      <div class="dashboard-header">
        <button @click="closeDashboard" class="close-btn">×</button>
        <img class="JEEC-Logo" :src="selectedRow.Logo" alt="JEEC Logo" />
          <div class="dashboard-title">
            <p class="dbType">{{ selectedRow.Type }}</p>
            <p class="dashboard-subtitle">{{ selectedRow.Subtitle }}</p>
          </div>
          <div class="dashboard-buttons">
            <button @click="addPopUp/*editRow(selectedRow)*/" class="image-button">
              <img src="../../assets/pencil.svg">
            </button>
            <button @click="deleteRow(selectedRow)" class="image-button">
              <img src="../../assets/trash.svg">
            </button>
          </div>
          <div class="dashboard-body">
            <div class="dashboard-paragraph">
              <div class="paragraph-item">
                <h1>Start Time</h1>
                <p>{{ selectedRow.StartTime }}</p>
              </div>
              <div class="paragraph-item">
                <h1>End Time</h1>
                <p>{{ selectedRow.EndTime }}</p>
              </div>
            </div>
            <div class="dashboard-paragraph">
              <div class="paragraph-item">
                <h1>Name</h1>
                <p>{{ selectedRow.Name }}</p>
              </div>
            </div>
            <div class="dashboard-paragraph">
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
  <div class="wrapper" v-if="isMobile()">
    <div class="no-events-message" v-if="tableDataActivities.length === 0 && tableDataJobFair.length === 0">
      <p>No Event Days found</p>
    </div>
    <div class="tables-with-title" v-if="tableDataActivities.length > 0 && tableDataJobFair.length > 0 && !showDashboard">
      <div class="title-activities">
        <h1>Activities</h1>
      </div>
      <div class="table-activities">
        <TheTable
          :data="MobileTableDataActivities"
          :tableHeaders="MobileHeadersActivities"
          :searchInput="searchQuery"
          @onRowSelect="handleRowSelect"
        />
      </div>
      <div class="title-job-fair">
        <h1>Job Fair</h1>
      </div>
      <div class="table-job-fair">
        <TheTable
          :data="MobileTableDataJobFair"
          :tableHeaders="MobileHeadersJobFair"
          :searchInput="searchQuery"
          @onRowSelect="handleRowSelect"
        />
      </div>
    </div>
    <div class="dashboard" v-if="showDashboard">
      <div class="dashboard-header">
        <button @click="closeDashboard" class="close-btn">×</button>
        <img class="JEEC-Logo" :src="selectedRow.Logo" alt="JEEC Logo" />
          <div class="dashboard-title">
            <p class="dbType">{{ selectedRow.Type }}</p>
            <p class="dashboard-subtitle">{{ selectedRow.Subtitle }}</p>
          </div>
          <div class="dashboard-buttons">
            <button @click="addPopUp/*editRow(selectedRow)*/" class="image-button">
              <img src="../../assets/pencil.svg">
            </button>
            <button @click="deleteRow(selectedRow)" class="image-button">
              <img src="../../assets/trash.svg">
            </button>
          </div>
          <div class="dashboard-body">
            <div class="dashboard-paragraph">
              <div class="paragraph-item">
                <h1>Start Time</h1>
                <p>{{ selectedRow.StartTime }}</p>
              </div>
              <div class="paragraph-item">
                <h1>End Time</h1>
                <p>{{ selectedRow.EndTime }}</p>
              </div>
            </div>
            <div class="dashboard-paragraph">
              <div class="paragraph-item">
                <h1>Name</h1>
                <p>{{ selectedRow.Name }}</p>
              </div>
            </div>
            <div class="dashboard-paragraph">
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
import { ref } from 'vue';
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

const headersActivities = ref ({
  ID: 'ID',
  StartTime: 'StartTime',
  EndTime: 'EndTime',
  Name: 'Name',
  Type: 'Type'
});

const tableDataJobFair = ref([
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Type: "Job Fair", Logo: "/src/assets/wrizz.jpg"},
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Type: "Job Fair", Logo: "/src/assets/wrizz.jpg"},
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Type: "Job Fair", Logo: "/src/assets/wrizz.jpg"},
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Type: "Job Fair", Logo: "/src/assets/wrizz.jpg"},
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Type: "Job Fair", Logo: "/src/assets/wrizz.jpg"},
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Type: "Job Fair", Logo: "/src/assets/wrizz.jpg"},
]);

const headersJobFair = ref ({
  ID: 'ID',
  StartTime: 'StartTime',
  EndTime: 'EndTime',
  Name: 'Company',
  Type: 'Type'
});

const MobileTableDataActivities = ref([
  { ID: '3',  StartTime: '10:00',    EndTime: "11:00", Name: "Como transformar o caos em ordem", Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '42', StartTime: '11:00',    EndTime: "11:30", Name: "15/15 with Oracle",                Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '24', StartTime: '12:00',    EndTime: "13:30", Name: "Ética na Engenharia",              Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '36', StartTime: '14:00',    EndTime: "14:30", Name: "BLA BLA BLA",                      Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '12', StartTime: '14:30',    EndTime: "15:30", Name: "YAPPING YAPPING",                  Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '19', StartTime: '15:30',    EndTime: "16:00", Name: "YAPPING YAPPING YAPPING",          Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '40', StartTime: '16:00',    EndTime: "17:00", Name: "YAPPING YAPPING YAPPING YAPPING",  Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '7',  StartTime: '17:00',    EndTime: "18:30", Name: "YAPPING YAPPING YAPPING",          Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
  { ID: '29', StartTime: '18:30',    EndTime: "20:00", Name: "YAPPING YAPPING",                  Logo: "/src/assets/wrizz.jpg", Subtitle: "Activity"},
]);

const MobileHeadersActivities = ref ({
  ID: 'ID',
  StartTime: 'StartTime',
  EndTime: 'EndTime',
  Name: 'Name'
});

const MobileTableDataJobFair = ref([
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Logo: "/src/assets/wrizz.jpg"},
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Logo: "/src/assets/wrizz.jpg"},
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Logo: "/src/assets/wrizz.jpg"},
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Logo: "/src/assets/wrizz.jpg"},
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Logo: "/src/assets/wrizz.jpg"},
  { ID: '3', StartTime: '09:00', EndTime: "19:00", Name: "Pingo Doce", Logo: "/src/assets/wrizz.jpg"},
]);

const MobileHeadersJobFair = ref ({
  ID: 'ID',
  StartTime: 'StartTime',
  EndTime: 'EndTime',
  Name: 'Company'
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

function isMobile() {
   if(window.innerWidth <= 768) {
     return true;
   }
   else {
    return false;
   }
}

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
  flex-direction: row;
  position: relative;
  padding: 5ch 3ch 3ch 3ch;
  overflow-y: hidden;
  max-height: calc(100vh - var(--header-height));
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

.tables-with-title{
  display: flex;
  flex-direction: column;
  width: 100%;
 
  overflow-y: auto;
  padding-right: 1rem;
}

.tables-with-title::-webkit-scrollbar {
  display: none;
}

.title-activities, .title-job-fair{
  color: black;
  padding-bottom: 3vh;
}

.table-activities, .table-job-fair {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3ch;
  padding-bottom: 3vh;
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

.dashboard {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 3vh 2.5vw;
  max-height: 90dvh;
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

.close-btn:hover {
  color: #666;
  background-color: rgba(0, 0, 0, 0.1);
}

.JEEC-Logo {
  width: 15vw;
  max-width: 150px;
  height: auto;
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

.dbType{
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
  gap: 1vw;
}

.image-button {
  background-color: var(--c-bg-light);
  border: none;
  border-radius: 20%;
  cursor: pointer;
  width: 5vw;
  max-width: 35px;
  height: 5vw;
  max-height: 35px;
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

.dashboard-body{
  display: flex;
  flex-direction: column;
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

.dashboard-paragraph {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.paragraph-item {
  display: flex;
  flex-direction: column; /* Título em cima do subtítulo */
  justify-content: flex-start;
  align-items: flex-start; /* Alinha os textos à esquerda */
  gap: 0.5vh; /* Espaço entre título e subtítulo */
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

.pop-up-add-btn:hover {
  background-color: #4782c0;
}
</style>