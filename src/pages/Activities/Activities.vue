<template>
  <div class="wrapper">
    <div class="no-events" v-if="tableData.length === 0">
      <div class="buttons">
          <button class="add-btn" @click="addPopUp">Add Activity</button>
          <button class="types-btn" @click="goToActivitiesTypes">Activity Types ></button>
      </div>
      <div class="no-events-message">
        <p>No Event Days found</p>
      </div>
    </div>
    <div class="left-container">
      <div class="table-with-buttons" v-if="tableData.length > 0 && !(isMobile && showDashboard)">
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
    </div>
    <div class="right-popup" v-if="showDashboard">
      <div class="right-popup-header">
        <button @click="closeDashboard" class="close-btn">×</button>
        <h1 class="dbWeekday">{{ selectedRow.Weekday }}</h1>
        <img class="JEEC-Logo" :src="selectedRow.Logo" alt="JEEC Logo" />
          <div class="right-popup-title">
            <p class="dbDate">{{ selectedRow.Date }}</p>
            <p class="right-popup-subtitle">Activities</p>
          </div>
          <div class="right-popup-buttons">
            <button @click="addPopUp/*editRow(selectedRow)*/" class="image-button">
              <img src="../../assets/pencil.svg">
            </button>
            <button @click="goToActivitiesDay" class="image-button">
              <img src="../../assets/sheet.svg">
            </button>
            <button @click="deleteRow(selectedRow)" class="image-button">
              <img src="../../assets/trash.svg">
            </button>
          </div>
          <div class="right-popup-body">
            <div class="right-popup-paragraph">
              <h1>Activities</h1>
              <p>{{ selectedRow.NumberActivities }}</p>
            </div>
            <div class="right-popup-paragraph">
              <h1>JobFair</h1>
              <p>{{ selectedRow.NumberJobFair }}</p>
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
              <option v-for="type in activityTypes" :key="type" :value="type">
                  git config --global pull.rebase false{{ type }}
              </option>
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

const tableData = ref([

]);

/*const fetchData = () => {
    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/activities_vue', {
          event_id:"31cd68cf-ac76-4ae5-b9f3-434988d2556f",
          username:"Rafa",
          start_date:"19-02-2025",
          end_date:"23-02-2025"
        },{
          auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }}).then((response)=>{
          const activities = response.data.real_activities;

          tableData.value = activities.map(activity => ({
            Date: activity.date, 
            Weekday: activity.weekday, 
            NumberActivities: activity.number_of_activities, 
            NumberJobFair: activity.number_of_job_fair,
            Logo: "src/assets/wrizz.jpg"
        }));
        console.log("Dados carregados:", tableData.value);
      }).catch(error => {
        console.error("Erro ao buscar os dados:", error);
    });
};*/

const activityTypes = ref([]);

const fetchActivityTypes = () => {
    axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/activities/typess', {
        auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }}).then((response) => {
        activityTypes.value = response.data.types; //Vetor com os tipos de atividades
      }).catch((error) => {
        console.error("Erro ao buscar tipos de atividades:", error);
    });
};


const fetchData = () => {
    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/activities_vue', {
          event_id:"31cd68cf-ac76-4ae5-b9f3-434988d2556f",
          username:"Rafa",
        },{
          auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }}).then((response)=>{
          const data = response.data
          console.log(data)
        })
}

const addNewActivity = async () => {
  if (!newActivity.value.name || !newActivity.value.type || !newActivity.value.description ||
      !newActivity.value.day || !newActivity.value.startTime || !newActivity.value.endTime || 
      !newActivity.value.qrCode) {
        alert('Please fill out all fields.');
        return;
  }

  try {
    const response = await axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/add_activity', {
      event_id: "31cd68cf-ac76-4ae5-b9f3-434988d2556f", // ID do evento
      day: newActivity.value.day, // Dia selecionado
      name: newActivity.value.name,
      type: newActivity.value.type,
      description: newActivity.value.description,
      start_time: newActivity.value.startTime,
      end_time: newActivity.value.endTime,
      qr_code: newActivity.value.qrCode
    }, {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
    });

    console.log('Activity added:', response.data);
    alert('Activity added successfully!');

    fetchData();

    closePopUp();
  } catch (error) {
    console.error('Error adding activity:', error);
    alert('Failed to add activity.');
  }
}

onMounted(() => {
    fetchData();
    fetchActivityTypes();
});

const router = useRouter();

function goToActivitiesTypes() {
  router.push("/activities/types");
}

function goToActivitiesDay(){
  router.push("/activities/day");
}

const headers = computed(() => {
  if (isMobile.value) {
    return {
      Date: 'Day',
      NumberActivities: '# Activities',
      NumberJobFair: '# Job Fair'
    };
  }

  return {
    Date: 'Day',
    Weekday: 'Weekday',
    NumberActivities: '# Activities',
    NumberJobFair: '# Job Fair'
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
.wrapper{
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

.no-events{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
}

.no-events-message{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 25px;
  color: #4F4F4F;
  background-color: #EBF6FF;
  font-weight: 500; 
  padding: 20px;
}

.table-with-buttons{
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
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
  flex-grow: 1;
  transition: flex-grow 0.3s ease;
  margin-top: 1vh;
}

.right-popup {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 3vh 2.5vw;
  height: 100%;
  width: 380px;
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
  font-size: 20px;
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

.dbWeekday{
  text-transform: uppercase;
  font-size: 20px;
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

.dbDate{
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
  flex-direction: row;
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
