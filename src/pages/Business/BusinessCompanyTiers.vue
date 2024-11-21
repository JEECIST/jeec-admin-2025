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
                    <input v-model="message" placeholder="Search for a company tier" />
                </div>
                </div>
                <div class="buttons-div">
                <button type="button" @click="showAddTierModal = true">Add Tier</button>
                </div>
            </form>
            <TheTable
                :data="tiers"
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
                        <img :src=selectedRow.tier alt="Profile Image" class="pimg">
                        <h2>{{ selectedRow.name }}</h2>
                        <p>Company Tier</p>
                        <div class="butoes">
                            <button class="edit-button" @click="openEdit()">
                                <img src="./imagens/edit.svg"/>
                            </button>
                            <button class="web-button" @click="showTierCompaniesModal = true">
                                <img src="./imagens/companies.svg"/>
                            </button>
                            <button class="delete-button" @click="removeTier(selectedRow)">
                                <img src="./imagens/delete.svg"/>
                            </button>
                        </div>
                        <div class="line">
                            <div class="box">
                                <div class="title">Priority</div>
                                <div class="info">{{ selectedRow.priority }}</div>
                            </div>
                            <div class="box">
                                <div class="title"># Companies</div>
                                <div class="info">{{ selectedRow.cnumber }}</div>
                            </div>
                        </div>
                        <div class="line">
                            <div class="box">
                                <div class="title">Show in Website</div>
                                <div class="info">{{ selectedRow.website }}</div>
                            </div>
                            <div class="box">
                                <div class="title">Social Media</div>
                                <div class="info">{{ selectedRow.social }}</div>
                            </div>
                        </div>
                        <div class="line">
                            <div class="box">
                                <div class="title">Logo in Canvas</div>
                                <div class="info">{{ selectedRow.canvas }}</div>
                            </div>
                            <div class="box">
                                <div class="title">Logo in Posters</div>
                                <div class="info">{{ selectedRow.poster }}</div>
                            </div>
                        </div>
                        <div class="line">
                            <div class="box">
                                <div class="title">Exclusive Video</div>
                                <div class="info">{{ selectedRow.video }}</div>
                            </div>
                            <div class="box">
                                <div class="title">Teaser</div>
                                <div class="info">{{ selectedRow.teaser }}</div>
                            </div>
                        </div>
                        <div class="line">
                            <div class="box">
                                <div class="title">Exclusive Posts</div>
                                <div class="info">{{ selectedRow.post }}</div>
                            </div>
                            <div class="box">
                                <div class="title">Included Medal</div>
                                <div class="info">{{ selectedRow.medal }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
    <div v-if="showAddTierModal || showEditTierModal" class="modal-overlay">
        <div class="modal">
            <div class="btn-cancel" @click="closeModal()"> X </div>
            <div class="header">
                <h1 v-if="showAddTierModal">Add Tier</h1>
                <h1 v-if="showEditTierModal">Edit Tier</h1>
            </div>
            <button v-if="showAddTierModal" class="btn-primary" @click="addTier()">Add</button>
            <button v-if="showEditTierModal" class="btn-primary" @click="editTier()">Edit</button>


        </div>
    </div>
    <div v-if="showTierCompaniesModal" class="modal-overlay">
        <div class="modal">
            <div class="btn-cancel" @click="showTierCompaniesModal = false"> X </div>
            <div class="header">
                <h1>{{ selectedRow.name }} Companies</h1>
            </div>
            <div class="conteiner">
                <div class="div-grid">
                    <!-- Utiliza v-for para iterar sobre os dados dos indivíduos -->
                    <div v-for="company in companies.filter(companies => companies.tier == selectedRow.name)" :key="index" class="element">
                        <div class="compimg"></div>
                        {{ company.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref } from 'vue';
import { companies as companiesData, tiers as tiersData } from './companies.js';

const message = ref('');
const showAddTierModal = ref(false);
const showEditTierModal = ref(false);
const showTierCompaniesModal = ref(false);
const newTier = ref({
    name: '',
    priority: '',
    cnumber: '',
    medal: '',
    website: '',
    social: '',
    canvas: '',
    poster: '',
    video: '',
    teaser: '',
    post: ''
});

const selectedRow = ref(null);

const companies = ref([...companiesData]); 
const tiers = ref([...tiersData]);

const tablePref = {
    name: "Name",
    cnumber: "# Companies",
    medal: "Included Medals"
};
  
function selectCallback(row) {
    if (selectedRow.value == row) {
        selectedRow.value = null;
    } else {
        selectedRow.value = row;
    }
}

function addTier() {
  
  closeModal();
}

function openEdit() {
    newTier.value.id = selectedRow.value.id;
    newTier.value.name = selectedRow.value.name;
    newTier.value.tier = selectedRow.value.tier;
    newTier.value.username = selectedRow.value.username;
    newTier.value.jeec = selectedRow.value.jeec;
    newTier.value.web = selectedRow.value.web;
    newTier.value.email = selectedRow.value.email;
    newTier.value.event = selectedRow.value.event;
    newTier.value.cv = selectedRow.value.cv;
    newTier.value.password = selectedRow.value.password;
    newTier.value.img = selectedRow.value.img;
    newTier.value.days = selectedRow.value.days;
    showEditTierModal.value = true;
}

function editTier() {
    selectedRow.value.id = newTier.value.id;
    selectedRow.value.name = newTier.value.name;
    selectedRow.value.tier = newTier.value.tier;
    selectedRow.value.username = newTier.value.username;
    selectedRow.value.jeec = newTier.value.jeec;
    selectedRow.value.web = newTier.value.web;
    selectedRow.value.email = newTier.value.email;
    selectedRow.value.event = newTier.value.event;
    selectedRow.value.cv = newTier.value.cv;
    selectedRow.value.password = newTier.value.password;
    selectedRow.value.img = newTier.value.img;
    selectedRow.value.days = newTier.value.days;
    closeModal();
}

function removeTier(row) {
    
};

function closeModal() {
    showAddTierModal.value = false;
    showEditTierModal.value = false;
    newTier.value = { name: '', prioriry: '', cnumber: '', medal: '', website: '', social: '', canvas: '', poster: '', video: '', teaser: '', post: '' };
}

</script>

<style scoped>

@import './companies.css';

</style>