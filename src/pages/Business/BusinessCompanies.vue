<template>
  <div class="wrapper">
    <div class="wrapper-sec">
      <div class="table">
        <form>
          <div class="first-div">
            <div class="search_style">
              <label>
                <img src="../../assets/search.svg">
              </label>
              <input v-model="message" placeholder="Search for a company" />
            </div>
            <select class="select" v-model="selectedEvent" @change="change_event($event.target.value)">
              <option v-for="event in events" :key="event.id" :value="event.id">
                {{ event.name }}
              </option>
            </select>
          </div>
          <div class="buttons-div">
            <button type="button" @click="showAddCompanyModal = true">Add Company</button>
            <button type="button" @click="()=>$router.push('/business/companies/tiers')"> Company Tiers <span class = "chevron"> </span></button>
          </div>
        </form>
        <TheTable
          :data="companies"
          :tableHeaders="tablePref"
          :searchInput="message"
          
          @onRowSelect="selectCallback"
        ></TheTable>
        <div class="nocompanies" v-if=noCompanies>No Companies Found</div>
      </div>
      <!-- Conditionally render the right popup placeholder -->
      <div v-if="selectedRow" class="right-popup-placeholder-overlay"></div>
      <div v-if="selectedRow" class="right-popup-placeholder">
        <div class="btn-cancel" @click="resetCallback()"> X </div>
        <div class="conteiner">
          <div class="conteiner2">
            <h1>{{ selectedRow.tier.name }}</h1>
            <img :src="logo_image" alt="Profile Image" class="pimg">
            <h2>{{ selectedRow.name }}</h2>
            <p>Company</p>
            <div class="butoes">
              <button class="edit-button" @click="openEdit()">
                <img src="./imagens/edit.svg"/>
              </button>
              <button class="web-button" @click="irParaSite(selectedRow.website)">
                <img src="./imagens/web.svg"/>
              </button>
              <button class="bill-button" @click="irParaBills()">
                <img src="./imagens/bills.svg"/>
              </button>
              <button class="delete-button" @click="removeCompany(selectedRow)">
                <img src="./imagens/delete.svg"/>
              </button>
            </div>
            <div class="line">
              <div class="box">
                <div class="title">Email</div>
                <div class="info">{{ selectedRow.email }}</div>
              </div>
            </div>
            <div class="line">
              <div class="box">
                <div class="title">Username</div>
                <div class="info">{{ selectedRow.username }}</div>
              </div>
              <div class="box">
                <div class="title">Password</div>
                <div class="info">{{ selectedRow.password }}</div>
              </div>
            </div>
            <div class="line">
              <div class="box">
                <div class="title">JEEC Responsible</div>
                <div class="info">{{ selectedRow.responsible }}</div>
              </div>
            </div>
            <div class="line">
              <div class="box">
                <div class="title">Tier</div>
                <div class="info">{{ selectedRow.tier }}</div>
              </div>
              <div class="box">
                <div class="title">Event</div>
                <div class="info">{{ selectedRow.event }}</div>
              </div>
              <div class="box">
                <div class="title">CV Access</div>
                <div class="info">{{ selectedRow.cvs_access }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showAddCompanyModal || showEditCompanyModal" class="modal-overlay">
    <form class="modal">
      <div class="btn-cancel" @click="closeModal()"> X </div>
      <button v-if="showAddCompanyModal" class="btn-primary" @click="addCompany()">Add</button>
      <button v-if="showEditCompanyModal" class="btn-primary" @click="editCompany()">Edit</button>

      <div class="modal-aux">
        <div class="header">
          <h1 v-if="showAddCompanyModal">Add Company</h1>
          <h1 v-if="showEditCompanyModal">Edit Company</h1>
        </div>
        <div class="body">
          <div class="line">
            <div class="element" id="name">
              <label>Name</label>
              <input type="text" required v-model="newCompany.name">
            </div>
            <div class="element" id="event">
              <label>Event</label>
              <select class="sele" v-model="newCompany.event_id" required>
                <option v-for="event in events" :key="event.id" :value="event.id">
                  {{ event.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="line">
            <div class="element" id="email">
              <label>Email</label>
              <input type="text" required v-model="newCompany.email">
            </div>
            <div class="element" id="website">
              <label>Website</label>
              <input type="text" required v-model="newCompany.website">
            </div>
          </div>
          <div class="line">
            <div class="direita">
              <div class="logo">
                <label>Logo</label>
                <div class="blue-square" v-if="logo_image">
                  <!-- Display the selected image -->
                  <img :src="logo_image" alt="Logo" class="logo-image" />
                </div>
                <div class="blue-square" v-else>
                  <!-- Display this text when no logo is selected -->
                  <p>No logo selected yet</p>
                </div>
                <!-- Hidden file input -->
                <label for="logo-upload" class="custom-logo-label">Add new Logo</label>
                <input id="logo-upload" name ="fileSelected" type="file" @change="onLogoSelected" class="button-add-logo" accept="image/*" />
              </div>
            </div>
            <div class="esquerda">
              <div class="line">
                <div class="element" id="username">
                  <label>Username</label>
                  <input type="text" required v-model="newCompany.username">
                </div>
              </div>
              <div class="line">
                <div class="element" id="cv">
                  <label>CV acess</label>
                  <div class="line" style="width: 100%; margin-left: 10px; height: 40px;">
                    <label style="width: 50%;">
                      <input class="with-gap" name="cvs_access" type="radio" value="True" v-model="newCompany.cv"/>
                      <span style="margin-left: 5px;">Yes</span>
                    </label>
                    <label style="width: 50%;">
                      <input class="with-gap" name="cvs_access" type="radio" value="False" checked v-model="newCompany.cv"/>
                      <span style="margin-left: 5px;">No</span>
                    </label>
                  </div>
                </div>
                <div class="element" id="tier">
                  <label>Tier</label>
                  <select class="sele" v-model="newCompany.tier_id" required>
                    <option v-for="tier in tiers" :key="tier.id" :value="tier.id">
                      {{ tier.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="line">
                <div class="element" id="jeec">
                  <label>JEEC Responsible</label>
                  <select class="sele" v-model="newCompany.responsible_id" required>
                    <option v-for="responsible in responsibles" :key="responsible.id" :value="responsible.id">
                      {{ responsible.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="line">
                <div class="element" id="days">
                  <label>Job Fair Days</label>
                  <select class="sele" v-model="newCompany.days">
                    <option v-for="day in days">
                      {{ day }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>

</template>

<script setup>
import axios from 'axios';
import TheTable from '../../global-components/TheTable.vue';
import { ref, onMounted } from 'vue';

let companies = ref([]);
let filteredCompanies = ref([]);
const events = ref([]);
const tiers = ref([]);
const responsibles = ref([]);
const default_event_id = ref();
let selectedEvent = ref(null);
const selectedRow = ref(null);

let noCompanies = ref();

let logo_image = ref('')

let fileSelected = ref(null);
let fileToUpload = ref(null);

const fetchCompanies = () => {
  axios
  .post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/companies_vue',{
    event_id: selectedEvent.value
  },{auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  })
  .then((response)=>{

    const data = response.data;

    companies.value = data.companies;
    events.value = data.events;
    tiers.value = data.tiers;
    responsibles.value = data.responsibles;

    default_event_id.value = data.default_event_id;

    selectedEvent = default_event_id.value.id;

    // filterByEvent();
  })
  .catch((error)=>{
    console.log(error);
  })
};

function change_event(event) {
  axios
  .post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/companies_vue',{
    event_id: event
  },{auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  })
  .then((response)=>{

    const data = response.data;

    companies.value = data.companies;
    events.value = data.events;
    tiers.value = data.tiers;
    responsibles.value = data.responsibles;

    default_event_id.value = data.default_event_id;

    // filterByEvent();
  })
  .catch((error)=>{
    console.log(error);
  })
}

function fetchCompanyImage() {
  const f = new FormData();
  f.append('external_id', selectedRow.value.external_id)

  axios
  .post(import.meta.env.VITE_APP_JEEC_BRAIN_URL+'/company/image',f,{auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      },responseType: 'blob'
  })
  .then((response) => {
    // Verifica se a resposta contém dados
    if (response.data) {
      // Cria uma URL de objeto a partir do Blob e armazena em 'logo_image'
      fileToUpload.value = response.data;
      logo_image.value = URL.createObjectURL(response.data);
    } else {
      console.error('Imagem não encontrada');
    }
  })
  .catch((error) => {
    // Lida com erros, por exemplo, se a requisição falhar
    console.error('Erro ao carregar imagem:', error);
  });
}

// Chamando a função assim que o componente for montado
onMounted(fetchCompanies);

const message = ref('');
const showAddCompanyModal = ref(false);
const showEditCompanyModal = ref(false);
const newCompany = ref({
  name: '',
  event_id: '',
  email: '',
  website: '',
  username: '',
  cv: 'No',
  tier_id: '',
  responsible_id: '',
  days: '',
  image: '',
  changeimg: 'No',
  external_id: '',
});

const days = ["2025-08-15", "2025-08-16", "2025-08-17", "2025-08-18", "2025-08-19", "2025-08-20"];

const tablePref = {
  id: "ID",
  name: "Name",
  tier: "Tier",
  //username: "Username",
  responsible: "JEEC Responsible"
};

function selectCallback(row) {
  if (selectedRow.value == row) {
    resetCallback();
  } else {
    selectedRow.value = row;
    fetchCompanyImage();
  }
}

function resetCallback() {
  selectedRow.value = null;
  logo_image.value = '';
  fileToUpload.value = '';
}

function addCompany() {
  
  const new_company = new FormData();

  new_company.append('name', newCompany.value.name)
  new_company.append('event_id', newCompany.value.event_id)
  new_company.append('email', newCompany.value.email)
  new_company.append('website', newCompany.value.website)
  new_company.append('username', newCompany.value.username)
  new_company.append('cv', newCompany.value.cv)
  new_company.append('tier_id', newCompany.value.tier_id)
  new_company.append('responsible_id', newCompany.value.responsible_id)
  new_company.append('days', newCompany.value.days)
  if (fileToUpload.value) new_company.append('image', fileToUpload.value)

  axios
  .post(import.meta.env.VITE_APP_JEEC_BRAIN_URL+'/company/create',new_company,{auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
  })
  .then(response => {
          this.error = response.data
      })

  setTimeout(fetchCompanies, 100);

  closeModal();
}

function openEdit() {
  newCompany.value.name = selectedRow.value.name;
  newCompany.value.event_id = selectedRow.value.event_id;
  newCompany.value.email = selectedRow.value.email;
  newCompany.value.website = selectedRow.value.website;
  newCompany.value.username = selectedRow.value.username;
  newCompany.value.cv = selectedRow.value.cv;
  newCompany.value.tier_id = selectedRow.value.tier_id;
  newCompany.value.responsible_id = selectedRow.value.responsible_id;
  newCompany.value.days = selectedRow.value.days;
  newCompany.value.image = selectedRow.value.image;
  newCompany.value.external_id = selectedRow.value.external_id;
  newCompany.value.changeimg = 'No';
  showEditCompanyModal.value = true;
}

function editCompany() {
  const update_company = new FormData();

  update_company.append('name', newCompany.value.name)
  update_company.append('event_id', newCompany.value.event_id)
  update_company.append('email', newCompany.value.email)
  update_company.append('website', newCompany.value.website)
  update_company.append('username', newCompany.value.username)
  update_company.append('cv', newCompany.value.cv)
  update_company.append('tier_id', newCompany.value.tier_id)
  update_company.append('responsible_id', newCompany.value.responsible_id)
  update_company.append('days', newCompany.value.days)
  update_company.append('external_id', newCompany.value.external_id)
  update_company.append('image', fileToUpload.value)
  update_company.append('changeimg', newCompany.value.changeimg)

  axios
  .post(import.meta.env.VITE_APP_JEEC_BRAIN_URL+'/company/update',update_company,{auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
  })
  .then(response => {
          this.error = response.data
      })

  setTimeout(fetchCompanies, 100);

  closeModal();
}

function removeCompany(row) {

  const delete_company = new FormData();

  delete_company.append('external_id', selectedRow.value.external_id)

  axios
  .post(import.meta.env.VITE_APP_JEEC_BRAIN_URL+'/company/delete',delete_company,{auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
  })
  .then(response => {
          this.error = response.data
      })

  resetCallback();

  setTimeout(fetchCompanies, 100);

};

function filterByEvent() {
  filteredCompanies.value = companies.value.filter(company => company.event_id == selectedEvent);
  console.log(filteredCompanies)
  console.log(companies)

  if (filteredCompanies.value.length === 0) {
    noCompanies = true; // Se o array estiver vazio, a flag é true
  } else {
    noCompanies = false; // Caso contrário, a flag é false
  }
}

function onLogoSelected(event){
  fileSelected.value = event.target.files[0].name;
  fileToUpload.value = event.target.files[0];
  logo_image.value = URL.createObjectURL(event.target.files[0]);
  newCompany.value.changeimg = 'Yes';
}

function irParaSite(site) {
  window.open(site, '_blank');
}

function irParaBills() {
  
}

function closeModal() {
  showAddCompanyModal.value = false;
  showEditCompanyModal.value = false;
  newCompany.value = {
    name: '',
    event_id: '',
    email: '',
    website: '',
    username: '',
    cv: 'No',
    tier_id: '',
    responsible_id: '',
    days: '',
    image: '',
    changeimg: 'No',
  };

  resetCallback();
}

</script>

<style scoped>

@import './companies.css';

#name {
  width: 70%;
  margin-right: 20px;
}

#event {
  width: 30%;
  margin-left: 20px;
}

#email {
  width: 50%;
  margin-right: 20px;
}

#website {
  width: 50%;
  margin-left: 20px;
}

#username {
  width: 100%;
}

#cv {
  width: 50%;
  margin-right: 20px;
}

#tier {
  width: 100%;
  margin-left: 20px;
}

#jeec {
  width: 100%;
}

#days {
  width: 60%;
}

</style>
