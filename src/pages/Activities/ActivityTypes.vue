<template>
  <div class="activity_types">
    <div :class="['content', { 'shrink': selectedType }]">
      <div class="header">
        <div class="search-container">
          <img class="search-icon" src="../../assets/search.svg">
          <input type="text" placeholder="Search for an activity type" class="search-bar" v-model="searchQuery" />
        </div>
        <button class="btn_header" @click="popup_addtype">Add Type</button>
        <button class="btn_header" @click="goToLocations">Locations 〉</button>
      </div>
      <div class="table-container" v-if="filteredActivityType.length > 0">
        <TheTable :data="database_type" :tableHeaders="tableHeaders" :searchInput="searchQuery"
          @onRowSelect="selectType"></TheTable>
      </div>
      <div v-if="filteredActivityType.length === 0" class="no-act-type">
        No activity type found
      </div>
      <AddTypePopUp v-if="isaddtype" @close="popup_addtype"  @typeAdded="fetchData"></AddTypePopUp>
    </div>
    <div class="right-popup-placeholder" v-if="selectedType && filteredActivityType.length > 0">
      <button class="btn_close_rpp" @click="close_rpp">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f4f4f"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="items">
        <img class="popup-logo" src="../../assets/jeec25.png" alt="Profile Image">
        <div class="popup-type">{{ selectedType.name }}</div>
        <div class="popup-title">Activity Type</div>
        <div class="popup-btns">
          <button class="edit-btn" @click="popup_edittype">
            <img src="../../assets/pencil.svg">
          </button>
          <button class="edit-btn" @click="popup_sheet">
            <img src="../../assets/sheet.svg">
          </button>
          <button class="edit-btn" @click="delete_type(selectedType.name)">
            <img src="../../assets/trash.svg">
          </button>
        </div>
        <div class="info">
          <div class="col">
            <p>Priority</p>
            <div class="text"> {{ selectedType.priority }}</div>
            <p>Points</p>
            <div class="text"> {{ selectedType.points }}</div>
            <p>Show in Website</p>
            <div class="text">{{ selectedType.show_in_website ? "Yes" : "No" }} </div>
            <p>Esclusive Video</p>
            <div class="text">{{ selectedType.exclusive_videos ? "Yes" : "No" }} </div>
          </div>
          <div class="col">
            <p># Activities</p>
            <div class="text"> {{ selectedType.number_act ? selectedType.number_act : 0 }}</div>
            <p>Location</p>
            <div class="text"> {{ selectedType.location }}</div>
            <p>Show in Social Media</p>
            <div class="text">{{ selectedType.social_media ? "Yes" : "No" }} </div>
            <p>Esclusive Posts</p>
            <div class="text">{{ selectedType.exclusive_posts ? "Yes" : "No" }} </div>
          </div>
        </div>
      </div>
      <EditTypePopUp v-if="isedittype" :selectedType = "selectedType" @close="popup_edittype" @typeEdited = "updateSelectedType"></EditTypePopUp>
      <SheetPopUp v-if="issheet" :typeName="selectedType?.name" @close="popup_sheet"></SheetPopUp>
    </div>
  </div>
</template>


<script setup>
import axios from 'axios';
import { ref, computed, onMounted, onUnmounted, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import TheTable from '../../global-components/TheTable.vue';
import AddTypePopUp from './AddTypePopUp.vue';
import EditTypePopUp from './EditTypePopUp.vue';
import SheetPopUp from './SheetPopUp.vue';

const emit = defineEmits(['close'])

const database_type = ref([{
  name: null,
  event_id: null,
  priority: null,
  number_act: null,
  points: null,
  location: null,
  show_in_website: null,
  social_media: null,
  exclusive_posts: null,
  exclusive_videos: null
}])

const fetchData = () => {
  axios
    .get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/activities/typess', {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    })
    .then((response) => {
      const data = response.data;
      database_type.value = data.types.map((type) => ({
        name: type.name,
        event_id: type.event_id,
        priority: type.priority,
        number_act: type.activities ? type.activities.length : 0, // Contar atividades
        points: type.points,
        location: type.location,
        show_in_website: type.show_in_website,
        social_media: type.social_media,
        exclusive_posts: type.exclusive_posts,
        exclusive_videos: type.exclusive_videos,
      }));
    })
    .catch((error) => {
      console.error('Erro ao buscar os dados:', error);
    });
};

onMounted(fetchData)

const tableHeaders = computed(() => {
  if (isMobile.value) {
    return {
      name: "Name",
      number_act: "# Activities",
      location: "Location"
    };
  }
  return {
    name: "Name",
    priority: "Priority",
    number_act: "# Activities",
    points: "Points",
    location: "Location",
  };
});

const selectedType = ref();
const searchQuery = ref('');

function selectType(row) {
  selectedType.value = row;
}

function close_rpp() {
  selectedType.value = null;
}
function updateSelectedType(updatedType) {
  selectedType.value = null;
  fetchData();
}

const filteredActivityType = computed(() => {
  if (!searchQuery.value) {
    return database_type.value
  }

  const filtered = database_type.value.filter((activity) =>
    activity.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    activity.location.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  // Se não houver resultados na busca, limpar o selectedType
  if (filtered.length === 0) {
    selectedType.value = null;
  }

  if (isMobile.value) {
    // Mostrar apenas algumas informações no modo mobile
    return filtered.map(({ name, number_act, location }) => ({ name, number_act, location }));
  }

  return filtered;
});


const router = useRouter();
const isaddtype = ref(false);
const isedittype = ref(false);
const issheet = ref(false);


function goToLocations() {
  router.push("/activities/types/locations");
}

function popup_addtype() {
  isaddtype.value = !isaddtype.value;
}

function popup_edittype() {
  isedittype.value = !isedittype.value;

}

function popup_sheet() {
  issheet.value = !issheet.value;
}

function delete_type(name){
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + `/activities/types/delete_type`, {name: name}, {
        auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
    })
    .then(() => {
        fetchData();

        if (selectedType.value && selectedType.value.name === name) {
            selectedType.value = null;
        }
        //emit("close");
    })
    .catch(error => {
        console.error("Erro ao adicionar atividade:", error.response?.data || error);
    });
}

const isMobile = ref(false); // Declare o `isMobile` como uma referência reativa

const updateIsMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 768px)').matches; // Atualize a reatividade
};

onMounted(() => {
  updateIsMobile(); // Inicializa o valor de `isMobile` assim que o componente for montado
  window.addEventListener('resize', updateIsMobile); // Escute alterações no tamanho da tela
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile); // Limpe o listener quando o componente for desmontado
});


</script>

<style scoped>
.activity_types {
  display: flex;
  width: calc(200dvh - var(--sidebar-width));
  background: #FFFFFF;
  height: calc(100vh - var(--header-height));
  overflow: hidden;
  box-sizing: border-box;
  padding: 50px 3ch 3ch 3ch;
}

.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

.content.shrink {
  flex-grow: 0.7;
  width: calc(100% - 390px);
}

.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2vw;
  margin-bottom: 10px;
  color: #8A8A8A;
}

.search-container {
  display: flex;
  align-items: center;
  position: relative;
  min-width: 30%;
  height: 3.5rem;
  background-color: #EBF6FF;
  border-radius: 0.5rem;
  flex-grow: 1;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 1rem;
  height: 1.5rem;
  color: #8A8A8A;
}

.search-bar {
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem 0.5rem 3rem;
  border: none;
  border-radius: 0.5rem;
  outline-color: var(--c-select);
  color: #8A8A8A;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  background-color: #EBF6FF;
}

.btn_header {
  width: 9rem;
  height: 90%;
  align-self: center;
  border: none;
  border-radius: 0.5rem;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 0.3rem 1rem;
  cursor: pointer;
}

.table-container {
  flex-grow: 1;
  transition: flex-grow 0.3s ease;
  margin-top: 1vh;
  overflow-y: auto;
}

.no-act-type {
  width: 100%;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #4F4F4F;
  background-color: #EBF6FF;
  border-radius: 2vh;
  margin-top: 2vh;
}

.right-popup-placeholder {
  display: flex;
  flex-direction: column;
  height: calc(92vh - var(--header-height));
  width: 380px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: -10px;
  border-radius: 10px;
  background-color: var(--c-accent);
  overflow-y: auto;
}

.popup-logo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 15px;
}

.items {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10%;
}

.btn_close_rpp {
  align-self: flex-end;
  position: relative;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
}


.popup-type {
  color: rgb(32, 32, 32);
  font-size: x-large;
  font-weight: bold;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.popup-title {
  color: #4F4F4F;

}

.popup-btns {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.edit-btn {
  width: 36px;
  height: 36px;
  background: #FFFFFF;
  border-radius: 8px;
  border-color: #FFFFFF;
  cursor: pointer;
}

.info {
  display: flex;
  gap: 40px;
  margin-top: 1.3vh;
  margin-left: 2vh;
}

.col {
  display: flex;
  flex-direction: column;
  justify-self: flex-start;
  gap: 12px;
}


.text {
  font-size: small;
  color: #4F4F4F;
  max-width: 125px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

p {
  color: rgb(32, 32, 32);
  font-weight: bold;
  font-size: medium;
}
</style>