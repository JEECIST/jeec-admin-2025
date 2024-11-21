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
                {{ event }}
              </option>
            </select>
          </div>
          <div class="buttons-div">
            <button type="button" @click="showAddCompanyModal = true">Add Company</button>
            <button type="button" @click="()=>$router.push('/business/companies/tiers')"> Company Tiers <span class = "chevron"> </span></button>
          </div>
        </form>
        <TheTable
          :data="companies.filter(companies => companies.event == selectedEvent)"
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
    <div class="modal">
      <div class="btn-cancel" @click="closeModal()"> X </div>
      <div class="header">
        <h1 v-if="showAddCompanyModal">Add Company</h1>
        <h1 v-if="showEditCompanyModal">Edit Company</h1>
      </div>
      <button v-if="showAddCompanyModal" class="btn-primary" @click="addCompany()">Add</button>
      <button v-if="showEditCompanyModal" class="btn-primary" @click="editCompany()">Edit</button>

      <form class="popup_form" >


        
      </form>

    </div>
  </div>

</template>

<script setup>
import axios from 'axios';
import TheTable from '../../global-components/TheTable.vue';
import { ref } from 'vue';
import { companies as companiesData, events as eventsData, days as daysData, tiers as tiersData, responsibles as responsiblesData } from './companies.js';

const message = ref('');
const showAddCompanyModal = ref(false);
const showEditCompanyModal = ref(false);
const newCompany = ref({
  id: '',
  name: '',
  tier: '',
  username: '',
  jeec: '', web: '',
  email: '',
  event: '',
  cv: '',
  password: '',
  img: '',
  days: '' 
});

const selectedRow = ref(null);
const selectedEvent = ref('JEEC25');

let companies = ref([...companiesData]); 
const events = ref([...eventsData]);
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

/*
if (tabela.offsetWidth > 400) {
  tablePref = {
    id: "ID",
    name: "Name",
    tier: "Tier",
    username: "Username",
    jeec: "JEEC Responsible"
  };
} else {
  tablePref = {
    //id: "ID",
    name: "Name",
    tier: "Tier",
    //username: "Username",
    jeec: "JEEC Responsible"
  };
}*/

function selectCallback(row) {
  if (selectedRow.value == row) {
    selectedRow.value = null;
  } else {
    selectedRow.value = row;
  }
}

function addCompany() {
  
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

</style>
