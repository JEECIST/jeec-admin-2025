<template>
  <div class="wrapper">
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
        <img class="JEEC-Logo" :src="selectedRow.Logo" alt="JEEC Logo" />
          <div class="dashboard-title">
            <p class="dbType">{{ selectedRow.Type }}</p>
            <p class="dashboard-subtitle">{{ selectedRow.Subtitle }}</p>
          </div>
          <div class="dashboard-buttons">
            <button @click="editRow(selectedRow)" class="image-button">
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

const searchQuery = ref('');
const showDashboard = ref(false);
const selectedRow = ref(null);

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
</style>