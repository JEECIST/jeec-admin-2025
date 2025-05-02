<template>
  <div class="wrapper">
    <div class="no-events" v-if="tableData.length === 0">
      <div class="buttons">
        <div class="event-label">
          <span class="event-label-text">Event</span>
          <select class="selection-box" v-model="eventselected" @change="fetchAllByEvent">
            <option value="" selected disabled hidden>Select Event</option>
            <option v-for="event in eventsNames" :key="event.id" :value="event.id">
              {{ event.name }}
            </option>
          </select>
        </div>
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
          <div class="event-label">
            <span class="event-label-text">Event</span>
          <select class="selection-box" v-model="eventselected" @change="fetchAllByEvent">
            <option value="" selected disabled hidden>Select Event</option>
            <option v-for="event in eventsNames" :key="event.id" :value="event.id">
              {{ event.name }}
            </option>
          </select>
          </div>
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
    <div class="right-popup" v-if="showDashboard" :class="{ 'mobile-popup': isMobile }">
      <div class="right-popup-header">
        <button @click="closeDashboard" class="close-btn">×</button>
        <h1 class="dbWeekday">{{ selectedRow.Weekday }}</h1>
        <img class="JEEC-Logo" :src="selectedRow.Logo" alt="JEEC Logo" />
          <div class="right-popup-title">
            <p class="dbDate">{{ selectedRow.Date }}</p>
            <p class="right-popup-subtitle">Activities</p>
          </div>
          <div class="right-popup-buttons">
            <button @click="goToActivitiesDay(selectedRow.Date, selectedRow.EventDay_External_ID, eventselected)" class="image-button">
              <img src="../../assets/sheet.svg" alt="Go to Activities Day">
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
            <multiselect
              v-model="newActivity.type"
              :options="activityTypesNames"
              :multiple="false"
              :close-on-select="true"
              :clearable="true"
              placeholder="Select type"
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
            v-model="newActivity.selectedDay"
            :options="tableData"
            :multiple="false"
            :close-on-select="true"
            :clearable="true"
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

        <div class="form-group">
            <label for="Registrations">Registrations:</label>
            <input type="text" id="registration" name="registration" v-model="newActivity.registrations_limit">
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
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';


const tableData = ref([]);

const eventsNames = ref([]);
const activityTypesNames = ref([]);
const companiesNames = ref([]);
const speakersNames = ref([]);
const volunteersNames = ref([]);
const defaultEventName = ref('');
const defaultEventId = ref('');
const eventselected = ref('');
const EventDays = ref([]);
const prizes = ref([]);

const fetchAllFromEventsDefault = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/activities/get_all_from_event_default`, {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    });

    eventsNames.value = response.data.all_events.map((event) => ({
      id: event.id,
      name: event.name,
    }));

    if (response.data.default_event) {
      defaultEventId.value = response.data.default_event.id;
      defaultEventName.value = response.data.default_event.name;

      eventselected.value = defaultEventId.value;

      await fetchAllByEvent();
    }
  } catch (error) {
    console.error("Error fetching all events:", error);

    if (error.response && error.response.data.error) {
      // alert(error.response.data.error);
    } else {
      alert("Failed to fetch events.");
    }
  }
};

const fetchAllByEvent = async () => {
  if (!eventselected.value) {
    console.error("Event parameter is missing.");
    alert("Please select an event.");
    return;
  }

  closeDashboard();

  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/activities/get_all_by_event`, {
      params: {
        event_id: eventselected.value,
      },
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    });

    tableData.value = response.data.event_days.map((eventDay) => ({
      EventDay_External_ID: eventDay.external_id,
      Date: new Date(eventDay.day).toLocaleDateString("en-GB"), // Formato DD/MM/YYYY
      Weekday: new Date(eventDay.day).toLocaleDateString("en-US", { weekday: "long" }),
      NumberActivities: eventDay.n_real_activities,
      NumberJobFair: eventDay.n_job_fair,
      Logo: "src/assets/JEEC2024.png",
    }))
    .sort((a, b) => {
      // Ordena as datas em ordem crescente
      const dateA = new Date(a.Date.split('/').reverse().join('-'));
      const dateB = new Date(b.Date.split('/').reverse().join('-'));
      return dateA - dateB;
    });

    EventDays.value = response.data.event_days.map((eventDay) => ({
        Date: new Date(eventDay.day).toLocaleDateString("en-GB"), // Formato DD/MM/YYYY
      }));

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
    console.error("Error fetching days for event:", error);

    if (error.response && error.response.data.error) {
      // alert(error.response.data.error);
    } else {
      alert("Failed to fetch event days.");
    }
  }
};

const addNewActivity = async () => {
  if (!newActivity.value.name || !newActivity.value.type || !newActivity.value.description ||
      !newActivity.value.selectedDay || !newActivity.value.startTime || !newActivity.value.endTime || 
      !newActivity.value.qrCode) {
        alert('Please fill out all required fields.');
        return;
  }

  if (newActivity.value.startTime >= newActivity.value.endTime) {
    alert("Start Time must be earlier than End Time.");
    return;
  }

  if (newActivity.value.endTime >= newActivity.value.qrCode) {
    alert("End Time must be earlier than QR Code End Time.");
    return;
  }

  const { Date: selectedDate, NumberActivities, NumberJobFair, EventDay_External_ID } = newActivity.value.selectedDay;

  // Converte o formato do dia de DD/MM/YYYY para o formato YYYY MM DD
  const [dd, mm, yyyy] = selectedDate.split('/');
  const formattedDay = `${yyyy} ${mm} ${dd}`;

  const adjustedStartTime = newActivity.value.startTime;
  const adjustedEndTime = newActivity.value.endTime;
  const adjustedQRTime = newActivity.value.qrCode;

  // Converte os horários ajustados para o formato YYYY-MM-DD HH:MM
  const startTimeFormatted = `${formattedDay} ${adjustedStartTime}`;
  const endTimeFormatted = `${formattedDay} ${adjustedEndTime}`;
  const endTimeQRFormatted = `${formattedDay} ${adjustedQRTime}`;

  const payload = {
    name: newActivity.value.name,
    description: newActivity.value.description,
    day: formattedDay,
    time: startTimeFormatted,
    end_time: endTimeFormatted,
    qr_code: endTimeQRFormatted,
    activity_type_external_id: newActivity.value.type.external_id,
    event_id: eventselected.value,
    event_day_external_id: EventDay_External_ID,
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

  const limit = newActivity.value.registrations_limit;

  if (limit === '' || (!isNaN(limit) && String(limit).trim() !== '')) {
    payload.registrations_limit = limit === '' ? null : Number(limit);
  } else {
    alert("Limit is not a valid number");
    return;
  }


  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/add_activity_vue`,
      payload,
      {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
    });

    alert("Activity added successfully!");

    await fetchAllByEvent();

    closePopUp();
  } catch (error) {
    console.error('Error adding activity:', error);
    alert('Failed to add activity.');
  }
}

const router = useRouter();

function goToActivitiesTypes() {
  router.push("/activities/types");
}

function goToActivitiesDay(day, event_day_external_id, event_id_ref) {
  const event_id = event_id_ref;
  if (!day || !event_day_external_id || !event_id) {
    console.error("Missing required parameters: day or eventDayId or event ID");
    return;
  }

  // Converte o formato de DD/MM/YYYY para YYYY-MM-DD
  const [dd, mm, yyyy] = day.split('/');
  const formattedDay = `${yyyy}-${mm}-${dd}`;

  router.push({
    name: "activities-day",
    params: {
      day: formattedDay,
      event_day_external_id: event_day_external_id,
      event_id: event_id,
    },
  });
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

const showModal = ref(false);
const newActivity = ref({ 
  name: '', 
  type: '', 
  description: '',
  day: '',
  startTime: '',
  endTime: '',
  qrCode: '',
  companies: [],
  speakers: [], 
  volunteers: [],
  prize: '',
  registrations_limit: ''});

const isMobile = ref(false);

const updateIsMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 768px)').matches;
};

onMounted(() => {
  fetchAllFromEventsDefault();
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
  selectedRow.value = row;
  showDashboard.value = true;
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
  overflow: visible;
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
}

.selection-box{
  height: 100%;
  border: 1px solid #8A8A8A;
  border-radius: 4px;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  padding: 1px 1px;
  font-size: 1em;
  color: #8A8A8A;
  background-color: #FFFFFF;
  cursor: pointer;
  user-select: none;
}

.buttons {
  flex-direction: row;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-bottom: 1rem;
  height: 55px;
  align-items: flex-end;
  overflow: visible;
  align-items: bottom; 
  position: relative;
}

.event-label{
  flex-direction: column;
  display: flex;
  justify-content: flex-end;
  height: 115%;
}

.selection-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.selection-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
  text-align: left;
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
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

button:hover {
  background-color: #4782c0;
}

.add-btn {
  background-color: #5a9bd5;
  user-select: none;
}

.types-btn {
  background-color: #5a9bd5;
  user-select: none;
}

.table {
  flex-grow: 1;
  transition: flex-grow 0.3s ease;
  margin-top: 1vh;
  cursor: pointer;
  user-select: none;
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
