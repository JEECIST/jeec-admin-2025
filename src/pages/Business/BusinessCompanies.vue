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
            <select class="select" v-model="selectedEvent">
              <option v-for="event in events">
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
      </div>
      <!-- Conditionally render the right popup placeholder -->
      <div v-if="selectedRow" class="right-popup-placeholder-overlay"></div>
      <div v-if="selectedRow" class="right-popup-placeholder">
        <div class="btn-cancel" @click="selectCallback(selectedRow.value)"> X </div>
        <div class="conteiner">
          <div class="conteiner2">
            <h1>{{ selectedRow.tier }}</h1>
            <img :src=selectedRow.tier alt="Profile Image" class="pimg">
            <h2>{{ selectedRow.name }}</h2>
            <p>Company</p>
            <div class="butoes">
              <button class="edit-button" @click="openEdit()">
                <img src="./imagens/edit.svg"/>
              </button>
              <button class="web-button" @click="irParaSite(selectedRow.web)">
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
                <div class="info">{{ selectedRow.jeec }}</div>
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
                <div class="info">{{ selectedRow.cv }}</div>
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
              <select class="sele" v-model="newCompany.event" required>
                <option v-for="event in events">
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
              <label>Logo</label>
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
                  <select class="sele" v-model="newCompany.tier" required>
                    <option v-for="tier in tiers">
                      {{ tier.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="line">
                <div class="element" id="jeec">
                  <label>JEEC Responsible</label>
                  <select class="sele" v-model="newCompany.jeec">
                    <option v-for="resp in resps">
                      {{ resp }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="line">
                <div class="element" id="days">
                  <label>Job Fair Days</label>
                  <select class="sele" v-model="newCompany.days">
                    <option v-for="day in jobdays">
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
import {days as daysData, tiers as tiersData, responsibles as responsiblesData } from './companies.js';

let companies = ref([]); 
const events = ref([]);

const fetchCompanies = async () => {
  console.log("Teste")
  axios
  .get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/companies_vue',{auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  })
  .then((response)=>{

    const data = response.data;

    events.value = data.events;
    companies.value = data.companies

    console.log("Company:", companies.value);

  })
  .catch((error)=>{
    console.log(error)
  })
};

// Chamando a função assim que o componente for montado
onMounted(fetchCompanies);

const message = ref('');
const showAddCompanyModal = ref(false);
const showEditCompanyModal = ref(false);
const newCompany = ref({
  name: '',
  tier: '',
  username: '',
  email: '',
  event: '',
  cv: 'No',
  website: '',
});

const selectedRow = ref(null);
const selectedEvent = ref('teste');

const days = ref([...daysData]); 
const tiers = ref([...tiersData]);
const responsibles = ref([...responsiblesData]); 

const tablePref = {
  //id: "ID",
  name: "Name",
  tier: "Tier",
  //username: "Username",
  jeec: "JEEC Responsible"
};

function selectCallback(row) {
  if (selectedRow.value == row) {
    selectedRow.value = null;
  } else {
    selectedRow.value = row;
  }
}

function addCompany() {
  
  const new_company = new FormData();

  new_company.append('name', newCompany.value.name)
  new_company.append('tier', newCompany.value.tier)
  new_company.append('username', newCompany.value.username)
  new_company.append('email', newCompany.value.email)
  new_company.append('event', newCompany.value.event)
  new_company.append('cv', newCompany.value.cv)
  new_company.append('link', newCompany.value.website)

  axios
  .post(import.meta.env.VITE_APP_JEEC_BRAIN_URL+'/new-company-vue',new_company,{auth: {
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
  newCompany.value.id = selectedRow.value.id;
  newCompany.value.name = selectedRow.value.name;
  newCompany.value.tier = selectedRow.value.tier;
  newCompany.value.username = selectedRow.value.username;
  newCompany.value.jeec = selectedRow.value.jeec;
  newCompany.value.web = selectedRow.value.web;
  newCompany.value.email = selectedRow.value.email;
  newCompany.value.event = selectedRow.value.event;
  newCompany.value.cv = selectedRow.value.cv;
  newCompany.value.password = selectedRow.value.password;
  newCompany.value.img = selectedRow.value.img;
  newCompany.value.days = selectedRow.value.days;
  showEditCompanyModal.value = true;
}

function editCompany() {
  selectedRow.value.id = newCompany.value.id;
  selectedRow.value.name = newCompany.value.name;
  selectedRow.value.tier = newCompany.value.tier;
  selectedRow.value.username = newCompany.value.username;
  selectedRow.value.jeec = newCompany.value.jeec;
  selectedRow.value.web = newCompany.value.web;
  selectedRow.value.email = newCompany.value.email;
  selectedRow.value.event = newCompany.value.event;
  selectedRow.value.cv = newCompany.value.cv;
  selectedRow.value.password = newCompany.value.password;
  selectedRow.value.img = newCompany.value.img;
  selectedRow.value.days = newCompany.value.days;
  console.log("botao edit");
  closeModal();
}

function removeCompany(row) {
  companies = companies.filter(companies => companies !== row);
};

function irParaSite(site) {
  window.open(site, '_blank');
}

function irParaBills() {
  
}

function closeModal() {
  showAddCompanyModal.value = false;
  showEditCompanyModal.value = false;
  newCompany.value = { name: '', event: '', email: '', web: '', username: '', cv: '', tier: '', jeec: '', img: '', days: '' };
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
