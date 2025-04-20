<template>
  <div class="wrapper">
    <div class="no-events-message" v-if="tableDataActivities.length === 0 && tableDataJobFair.length === 0">
      <p>No Event Days found</p>
    </div>
    <div class="left-container">
      <div class="tables-with-title" v-if="(tableDataActivities.length > 0 || tableDataJobFair.length > 0) && !(isMobile && showDashboard)">
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
    <div class="right-popup" v-if="showDashboard" :class="{ 'mobile-popup': isMobile }">
      <div class="right-popup-header">
        <button @click="closeDashboard" class="close-btn">×</button>
        <img class="JEEC-Logo" :src="selectedRow.Logo" alt="JEEC Logo" />
          <div class="right-popup-title">
            <p class="dbType">{{ selectedRow.Type }}</p>
            <p class="right-popup-subtitle">{{ selectedRow.Subtitle }}</p>
          </div>
          <div class="right-popup-buttons">
            <button @click="openEditPopUp" class="image-button">
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
                <p>{{ selectedRow.StartTime_show }}</p>
              </div>
              <div class="paragraph-item">
                <h1>End Time</h1>
                <p>{{ selectedRow.EndTime_show }}</p>
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
                <p>{{ selectedRow.EndTimeQR_show }}</p>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div class="pop-up-overlay" v-if="showModal"> 
      <div class="pop-up">
        <button @click="closePopUp" class="close-btn">×</button>
      <form>
        <div class="form-group title-group">
          <h2>Edit Activity</h2>
        </div>
        
        <div class="form-group name-group">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" v-model="newActivity.name">
        </div>

        <div class="form-group activity-type-group">
            <label for="activity-type">Activity Type:</label>
            <multiselect
                v-model="newActivity.type"
                :options="activityTypesNames"
                :multiple="false"
                :close-on-select="true"
                :clearable="false"
                placeholder="Select Activity"
                search-placeholder="Search..."
                label="name"
                track-by="external_id"
            >
            </multiselect>
        </div>

        <div class="form-group description-group">
            <label for="description">Description:</label>
            <input type="text" id="description" name="description" v-model="newActivity.description">
        </div>

        <div class="form-group">
            <label for="day">Day:</label>
            <multiselect
                v-model="newActivity.day"
                :options="EventDays"
                :multiple="false"
                :close-on-select="true"
                :clearable="false"
                placeholder="Select day"
                search-placeholder="Search..."
                label="Date"
                track-by="Date"
            >
            </multiselect>
        </div>

        <div class="form-group">
            <label for="start-time">Start Time:</label>
            <input type="time" id="start-time" name="start-time" v-model="newActivity.startTime">
        </div>

        <div class="form-group">
            <label for="end-time">End Time:</label>
            <input type="time" id="end-time" name="end-time" v-model="newActivity.endTime">
        </div>

        <div class="form-group">
            <label for="qr-code">End Time QR Codes:</label>
            <input type="time" id="qr-code" name="qr-code" v-model="newActivity.qrCode">
        </div>

        <div class="form-group">
          <label for="companies">Choose Companies:</label>
            <multiselect
              v-model="newActivity.companies"
              :options="companiesNames"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Select companies"
              search-placeholder="Search..."
              label="name"
              track-by="external_id"
            >
            </multiselect>
        </div>

        <div class="form-group">
          <label for="volunteers">Choose Volunteers:</label>
            <multiselect
              v-model="newActivity.volunteers"
              :options="volunteersNames"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Select volunteers"
              search-placeholder="Search..."
              label="name"
              track-by="id"
            >
            </multiselect>
        </div>

        <div class="form-group">
            <label for="speakers">Choose Speakers:</label>
            <multiselect
              v-model="newActivity.speakers"
              :options="speakersNames"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Select speakers"
              search-placeholder="Search..."
              label="name"
              track-by="external_id"
            >
            </multiselect>
        </div>

        <div class="form-group">
            <label for="prize">Choose Prize:</label>
            <multiselect
              v-model="newActivity.prize"
              :options="prizes"
              :multiple="false"
              :close-on-select="true"
              :clearable="true"
              placeholder="Select prize"
              label="name"
              track-by="external_id"
            >
            </multiselect>
        </div>

        <div class="form-actions">
            <button type="button" class="pop-up-add-btn" @click="editRow">Edit</button>
        </div>
      </form>
      </div>
    </div>
  </div>    
</template>

<script setup>
import axios from 'axios';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import TheTable from '../../global-components/TheTable.vue';
import { useRoute } from 'vue-router';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

const route = useRoute();
const day = route.params.day;
const event_day_external_id = route.params.event_day_external_id;
const event_id = route.params.event_id;

const tableDataActivities = ref([]);

const activityTypesNames = ref([]);
const companiesNames = ref([]);
const speakersNames = ref([]);
const volunteersNames = ref([]);
const EventDays = ref([]);
const prizes = ref([]);

function formatTime(dateTimeString) {
  const timePart = dateTimeString.split(' ')[4]; 

  return timePart.substring(0, 5); // Retorna HH:MM
}

const fetchActivitiesByDay = async () => {
  if (!day) {
    console.error("Day parameter is missing.");
    alert("Day parameter is required.");
    return;
  }

  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/activities/get_activity_by_day`, {
      params: {
        day: day,
        event_id: event_id,
      },
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    });

    // Atualiza o tableDataJobFair com as atividades do tipo "Job Fair"
    tableDataJobFair.value = response.data.job_fair_activities.map((activity) => ({
      ID: activity.id,
      ExternalID: activity.external_id,
      Day: new Date(activity.day).toLocaleDateString("en-GB"), // Formato DD/MM/YYYY
      Description: activity.description,
      StartTime: activity.time,
      StartTime_show: formatTime(activity.time),
      EndTime: activity.end_time,
      EndTime_show: formatTime(activity.end_time),
      EndTimeQR: activity.end_time_qr_code,
      EndTimeQR_show: formatTime(activity.end_time_qr_code),
      Name: activity.name,
      Type: activity.activity_type.name,
      ActivityTypeExternalID: activity.activity_type.external_id,
      Logo: "/src/assets/JEEC2024.png",
      Subtitle: "Job Fair",
    }));

    // Atualiza o tableDataActivities com as outras atividades
    tableDataActivities.value = response.data.other_activities.map((activity) => ({
      ID: activity.id,
      ExternalID: activity.external_id,
      Day: new Date(activity.day).toLocaleDateString("en-GB"),
      Description: activity.description,
      StartTime: activity.time,
      StartTime_show: formatTime(activity.time),
      EndTime: activity.end_time,
      EndTime_show: formatTime(activity.end_time),
      EndTimeQR: activity.end_time_qr_code,
      EndTimeQR_show: formatTime(activity.end_time_qr_code),
      Name: activity.name,
      Type: activity.activity_type.name,
      ActivityTypeExternalID: activity.activity_type.external_id,
      Logo: "/src/assets/JEEC2024.png",
      Subtitle: "Activity",
    }));

    EventDays.value = response.data.default_event_days.map((eventDay) => ({
        Date: new Date(eventDay.day).toLocaleDateString("en-GB"),
    }))
    .sort((a, b) => {
      // Ordena as datas em ordem crescente
      const dateA = new Date(a.Date.split('/').reverse().join('-'));
      const dateB = new Date(b.Date.split('/').reverse().join('-'));
      return dateA - dateB;
    });

    speakersNames.value = response.data.speakers.map((speaker) => ({
        name: speaker.name,
        external_id: speaker.external_id,
    }));
    
    activityTypesNames.value = response.data.types.map((type) => ({
      name: type.name,
      external_id: type.external_id,
    }));

    companiesNames.value = response.data.companies.map((company) => ({
      name: company.name,
      external_id: company.external_id,
    }));

    volunteersNames.value = response.data.volunteers.map((volunteer) => ({
        name: volunteer.name,
        id: volunteer.id,
      }));

    prizes.value = response.data.prizes.map((prize) => ({
        name: prize.name,
        external_id: prize.external_id,
      }));

  } catch (error) {
    console.error("Error fetching activities by day:", error);
    if (error.response && error.response.data.error) {
      alert(error.response.data.error);
    } else {
      alert("Failed to fetch activities.");
    }
  }
};


const fetchActivitySpeakersCompaniesVolunteerPrize = async (activityExternalId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/activities/get_activity_SpeakersComapaniesVolunteersPrize`, {
      params: {
        activity_external_id: activityExternalId,
      },
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    });

    newActivity.value.companies = response.data.companies.map((company) => ({
      name: company.name,
      external_id: company.external_id,
    }));

    newActivity.value.speakers = response.data.speakers.map((speaker) => ({
      name: speaker.name,
      external_id: speaker.external_id,
    }));

    newActivity.value.volunteers = response.data.volunteers.map((volunteer) => ({
      name: volunteer.name,
      id: volunteer.id,
    }));

    newActivity.value.prize = response.data.prize.map((prize) => ({
      name: prize.name,
      external_id: prize.external_id,
    }));

  } catch (error) {
    console.error("Error fetching speakers, companies and volunteers for activity:", error);
    alert("Failed to fetch speakers, companies and volunteers for this activity.");
  }
};


function openEditPopUp() {
  if (!selectedRow.value || !selectedRow.value.ID) {
    alert("No activity selected to edit.");
    return;
  }

  // Encontra o external_id correspondente ao nome do tipo de atividade
  const selectedActivityType = activityTypesNames.value.find(
    (type) => type.name === selectedRow.value.Type
  );

  fetchActivitySpeakersCompaniesVolunteerPrize(selectedRow.value.ExternalID);

  newActivity.value = {
    name: selectedRow.value.Name,
    type: activityTypesNames.value.find(type => type.external_id === selectedRow.value.ActivityTypeExternalID),
    description: selectedRow.value.Description,
    day: EventDays.value.find(d => d.Date === selectedRow.value.Day),
    originalDay: selectedRow.value.Day,
    startTime: selectedRow.value.StartTime_show,
    endTime: selectedRow.value.EndTime_show, 
    qrCode: selectedRow.value.EndTimeQR_show,
    companies: [],
    speakers: [],
    volunteers: [],
    prize: ''
  };

  showModal.value = true;
}


const editRow = async () => {
  if (!selectedRow.value || !selectedRow.value.ID) {
    alert("No activity selected to edit.");
    return;
  }

  if (!newActivity.value.name || !newActivity.value.type || !newActivity.value.day || 
      !newActivity.value.startTime || !newActivity.value.endTime) {
    alert("Please fill out all required fields.");
    return;
  }

  // Verifica se os horários estão em ordem
  if (newActivity.value.startTime >= newActivity.value.endTime) {
    alert("Start Time must be earlier than End Time.");
    return;
  }

  if (newActivity.value.endTime >= newActivity.value.qrCode) {
    alert("End Time must be earlier than QR Code End Time.");
    return;
  }

  // Converte o formato do dia de DD/MM/YYYY para o formato YYYY MM DD
  const [dd, mm, yyyy] = newActivity.value.day.Date.split('/');
  const formattedDay = `${yyyy} ${mm} ${dd}`;

  const [originalDD, originalMM, originalYYYY] = newActivity.value.originalDay.split('/');
  const originalFormattedDay = `${originalYYYY} ${originalMM} ${originalDD}`;

  const adjustedStartTime = newActivity.value.startTime;
  const adjustedEndTime = newActivity.value.endTime;
  const adjustedQRTime = newActivity.value.qrCode;

  // Converte os horários ajustados para o formato YYYY-MM-DD HH:MM
  const startTimeFormatted = `${formattedDay} ${adjustedStartTime}`;
  const endTimeFormatted = `${formattedDay} ${adjustedEndTime}`;
  const endTimeQRFormatted = `${formattedDay} ${adjustedQRTime}`;

  const selectedActivityType = activityTypesNames.value.find(
    (type) => type.name === selectedRow.value.Type
  );

  const payload = {
    activity_external_id: selectedRow.value.ExternalID,
    name: newActivity.value.name,
    activity_type_external_id_old: selectedRow.value.ActivityTypeExternalID,
    activity_type_external_id_new: newActivity.value.type.external_id,
    description: newActivity.value.description,
    day: formattedDay,
    original_day: originalFormattedDay,
    time: startTimeFormatted,
    end_time: endTimeFormatted,
    qr_code: endTimeQRFormatted,
    event_day_external_id: event_day_external_id
  };

  // Adiciona os campos opcionais apenas se estiverem preenchidos
  if (Array.isArray(newActivity.value.companies) && newActivity.value.companies.length > 0) {
    payload.company_external_ids = newActivity.value.companies.map((company) => company.external_id);
  }

  if (Array.isArray(newActivity.value.speakers) && newActivity.value.speakers.length > 0) {
    payload.speaker_external_ids = newActivity.value.speakers.map((speaker) => speaker.external_id);
  }

  if (Array.isArray(newActivity.value.volunteers) && newActivity.value.volunteers.length > 0) {
    payload.volunteer_ids = newActivity.value.volunteers.map((volunteer) => volunteer.id);
  }

  if (newActivity.value.prize && newActivity.value.prize.external_id) {
    payload.prize_external_id = newActivity.value.prize.external_id;
  }

  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/edit_activity`,
      payload,
      {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
    });

    alert("Activity updated successfully!");

    fetchActivitiesByDay();
    closeDashboard();
  } catch (error) {
    console.error("Error updating activity:", error);
    alert("Failed to update activity.");
  }
};


const deleteRow = async (selectedRow) => {
  if (!selectedRow || !selectedRow.ExternalID) {
    alert("No activity selected to delete.");
    return;
  }

  if (confirm(`Are you sure you want to delete activity: ${selectedRow.Name}?`)) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/activity/deletee`,
        {
          activity_external_id: selectedRow.ExternalID,
          event_day_external_id: event_day_external_id,
          activity_type_external_id: selectedRow.ActivityTypeExternalID,
        },
        {
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
          },
        }
      );

      if (response.status === 204) {
        tableDataActivities.value = tableDataActivities.value.filter(
          (activity) => activity.ExternalID !== selectedRow.ExternalID
        );

        fetchActivitiesByDay();
        closeDashboard();
        alert("Activity deleted successfully!");
      } else {
        alert("Failed to delete activity.");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      alert("Failed to delete activity.");
    }
  }
};

const headersActivities = computed(() => {
  if (isMobile.value) {
    return {
      ID: 'ID',
      Name: 'Name',
      Type: 'Type'
    };
  }
  
  return {
    ID: 'ID',
    StartTime_show: 'StartTime',
    EndTime_show: 'EndTime',
    Name: 'Name',
    Type: 'Type'
  };
});

const tableDataJobFair = ref([]);

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
    StartTime_show: 'StartTime',
    EndTime_show: 'EndTime',
    Name: 'Company',
    Type: 'Type'
  };
});

const searchQuery = ref('');
const showDashboard = ref(false);
const selectedRow = ref(null);

const showModal = ref(false);
const newActivity = ref({ 
  name: '', 
  type: '', 
  description: '',
  day: '',
  originalDay: '',
  startTime: '',
  endTime: '',
  qrCode: '',
  companies: [],
  speakers: [], 
  volunteers: '',
  prize: '' });

const isMobile = ref(false);

const updateIsMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 768px)').matches;
};

onMounted(() => {
  fetchActivitiesByDay();
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});

function closeDashboard() {
  showDashboard.value = false;
  closePopUp();
}

function closePopUp() {
  showModal.value = false;
  newActivity.value = { name: '', type: '', description: '' };
}

function handleRowSelect(row) {
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
  cursor: pointer;
  user-select: none;
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
  width: 320px;
  margin-left: 20px;
  margin-right: 0px;
  margin-top: -1px;
  border-radius: 10px;
  background-color: var(--c-accent);
  gap: 2vh;
  overflow-y: auto;
  user-select: none;
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
  font-size: 25px;
  color: #333;
  cursor: pointer;
  font-weight: bold;
  z-index: 999;
  padding: 0em;
  border-radius: 50%;
  width: 4vw;
  height: 4vw;
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
  width: 70vw;
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

::v-deep(.multiselect__option--selected) {
  background-color: #5a9bd5 !important;
  color: white !important;
}

::v-deep(.multiselect__tag) {
  background-color: #5a9bd5 !important;
  color: white !important;
  border: none !important;
  border-radius: 4px;
}

::v-deep(.multiselect__input) {
  font-size: 14px !important;
  color: #333;
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
  font-size: 18px;
}

.pop-up-add-btn {
  background-color: #152259;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pop-up-add-btn:hover {
  background-color: #4782c0;
}

.pop-up input[type="text"] {
  font-size: 14px !important;
  color: #333 !important;
  padding: 8px 12px !important;
  border: 1px solid #ccc !important;
  border-radius: 4px !important;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  height: 40px !important;
  min-height: 40px !important;
  box-sizing: border-box !important;
  line-height: 1.5 !important;
}

.pop-up input[type="time"] {
  font-size: 14px !important;
  color: #333 !important;
  padding: 8px 12px !important;
  border: 1px solid #ccc !important;
  border-radius: 4px !important;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  height: 40px !important;
  min-height: 40px !important;
  box-sizing: border-box !important;
  line-height: 1.5 !important;
}

.pop-up input:focus {
  border-color: #5a9bd5 !important;
  outline: 0 !important;
  box-shadow: 0 0 0 0.2rem rgba(90, 155, 213, 0.25) !important;
}

.form-group label {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  font-weight: 600;
}

::v-deep(.multiselect__input) {
  font-size: 14px !important;
  color: #333 !important;
  padding: 8px 0 !important;
}

::v-deep(.multiselect__tags) {
  min-height: 40px !important;
  padding: 8px 40px 0 12px !important;
  border: 1px solid #ccc !important;
  display: flex !important;
  align-items: center !important;
}

::v-deep(.multiselect__single) {
  font-size: 14px !important;
  color: #333 !important;
  margin-bottom: 8px !important;
}

@media (max-width: 768px) {
  .wrapper {
    padding: 2ch;
    width: 100%;
    overflow-x: hidden;
  }

  .right-popup.mobile-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
    width: 85%;
    max-width: 380px;
    height: 75vh;
    margin: 0;
    z-index: 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    padding: 20px;
  }

  .pop-up-overlay {
    align-items: flex-start;
    padding-top: 5vh;
    padding-bottom: 5vh;
    overflow-y: auto;
  }

  .pop-up {
    width: 80%;
    max-width: 90%;
    padding: 15px;
  }

  form {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .form-group {
    grid-column: span 1;
    min-width: 0;
  }

  .title-group,
  .description-group,
  .form-actions {
    grid-column: 1 / -1;
  }

  /* Telas muito pequenas - 1 coluna */
  @media (max-width: 480px) {
    form {
      grid-template-columns: 1fr;
    }

    .pop-up .close-btn {
      height: 4vw;
      width: 7vw;
    }
  }

  .mobile-popup .JEEC-Logo {
    width: 100px;
  }

  .mobile-popup .close-btn {
    width: 30px;
    height: 30px;
    font-size: 24px;
  }

  .mobile-popup .right-popup-body {
    padding-bottom: 20px;
  }

  .mobile-popup .dbType {
    font-size: 18px;
  }

  /* Botões em coluna */
  .form-actions {
    flex-direction: column;
    gap: 10px;
  }

  .pop-up-add-btn {
    width: 100%;
    padding: 12px;
  }
}
</style>