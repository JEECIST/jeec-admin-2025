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
                :key="tableKey"
                
                @onRowSelect="selectCallback"
            ></TheTable>
            </div>
            <!-- Conditionally render the right popup placeholder -->
            <div v-if="selectedRow" class="right-popup-placeholder-overlay"></div>
            <div v-if="selectedRow" class="right-popup-placeholder">
                <div class="btn-cancel" @click="selectCallback(selectedRow.value)"> X </div>
                <div class="conteiner">
                    <div class="conteiner2">
                        <img src="../../assets/JEEC2024.png" alt="Profile Image" class="pimg">
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
                                <div class="info">{{ selectedRow.number }}</div>
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
                                <div class="title">Included Meal</div>
                                <div class="info">{{ selectedRow.meal }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
    <div v-if="showAddTierModal || showEditTierModal" class="modal-overlay">
        <form class="modal">
            <div class="btn-cancel" @click="closeModal()"> X </div>
            <button v-if="showAddTierModal" class="btn-primary" @click="addTier()">Add</button>
            <button v-if="showEditTierModal" class="btn-primary" @click="editTier()">Edit</button>

            <div class="modal-aux">
                <div class="header">
                    <h1 v-if="showAddTierModal">Add Tier</h1>
                    <h1 v-if="showEditTierModal">Edit Tier</h1>
                </div>
                <div class="body">
                    <div class="line">
                        <div class="element" id="name">
                            <label>Name</label>
                            <input type="text" required v-model="newTier.name">
                        </div>
                        <div class="element" id="priority">
                            <label>Priority</label>
                            <input type="text" required v-model="newTier.priority">
                        </div>
                    </div>
                    <div class="line">
                        <div class="element" id="meal">
                            <label>Included Meal</label>
                            <div class="line" style="width: 100%; margin-left: 10px; height: 40px;">
                                <label style="width: 50%;">
                                    <input class="with-gap" name="meal" type="radio" value="Yes" v-model="newTier.meal"/>
                                    <span style="margin-left: 10px;">Yes</span>
                                </label>
                                <label style="width: 50%;">
                                    <input class="with-gap" name="meal" type="radio" value="No" v-model="newTier.meal"/>
                                    <span style="margin-left: 10px;">No</span>
                                </label>
                            </div>
                        </div>
                        <div class="element" id="website">
                            <label>Show in Website</label>
                            <div class="line" style="width: 100%; margin-left: 10px; height: 40px;">
                                <label style="width: 50%;">
                                    <input class="with-gap" name="website" type="radio" value="Yes" v-model="newTier.website"/>
                                    <span style="margin-left: 10px;">Yes</span>
                                </label>
                                <label style="width: 50%;">
                                    <input class="with-gap" name="website" type="radio" value="No" v-model="newTier.website"/>
                                    <span style="margin-left: 10px;">No</span>
                                </label>
                            </div>
                        </div>
                        <div class="element" id="social">
                            <label>Social Media</label>
                            <div class="line" style="width: 100%; margin-left: 10px; height: 40px;">
                                <label style="width: 50%;">
                                    <input class="with-gap" name="social" type="radio" value="Yes" v-model="newTier.social"/>
                                    <span style="margin-left: 10px;">Yes</span>
                                </label>
                                <label style="width: 50%;">
                                    <input class="with-gap" name="social" type="radio" value="No" v-model="newTier.social"/>
                                    <span style="margin-left: 10px;">No</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="line">
                        <div class="element" id="canvas">
                            <label>Logo in Canvas</label>
                            <div class="line" style="width: 100%; margin-left: 10px; height: 40px;">
                                <label style="width: 50%;">
                                    <input class="with-gap" name="canvas" type="radio" value="Yes" v-model="newTier.canvas"/>
                                    <span style="margin-left: 10px;">Yes</span>
                                </label>
                                <label style="width: 50%;">
                                    <input class="with-gap" name="canvas" type="radio" value="No" v-model="newTier.canvas"/>
                                    <span style="margin-left: 10px;">No</span>
                                </label>
                            </div>
                        </div>
                        <div class="element" id="posters">
                            <label>Logo in Posters</label>
                            <div class="line" style="width: 100%; margin-left: 10px; height: 40px;">
                                <label style="width: 50%;">
                                    <input class="with-gap" name="poster" type="radio" value="Yes" v-model="newTier.poster"/>
                                    <span style="margin-left: 10px;">Yes</span>
                                </label>
                                <label style="width: 50%;">
                                    <input class="with-gap" name="poster" type="radio" value="No" v-model="newTier.poster"/>
                                    <span style="margin-left: 10px;">No</span>
                                </label>
                            </div>
                        </div>
                        <div class="element" id="video">
                            <label>Exclusive Video</label>
                            <div class="line" style="width: 100%; margin-left: 10px; height: 40px;">
                                <label style="width: 50%;">
                                    <input class="with-gap" name="video" type="radio" value="Yes" v-model="newTier.video"/>
                                    <span style="margin-left: 10px;">Yes</span>
                                </label>
                                <label style="width: 50%;">
                                    <input class="with-gap" name="video" type="radio" value="No" v-model="newTier.video"/>
                                    <span style="margin-left: 10px;">No</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="line">
                        <div class="element" id="teaser">
                            <label>Teaser</label>
                            <div class="line" style="width: 100%; margin-left: 10px; height: 40px;">
                                <label style="width: 50%;">
                                    <input class="with-gap" name="teaser" type="radio" value="Yes" v-model="newTier.teaser"/>
                                    <span style="margin-left: 10px;">Yes</span>
                                </label>
                                <label style="width: 50%;">
                                    <input class="with-gap" name="teaser" type="radio" value="No" v-model="newTier.teaser"/>
                                    <span style="margin-left: 10px;">No</span>
                                </label>
                            </div>
                        </div>
                        <div class="element" id="post">
                            <label>Exclusive Posts</label>
                            <div class="line" style="width: 100%; margin-left: 10px; height: 40px;">
                                <label style="width: 50%;">
                                    <input class="with-gap" name="post" type="radio" value="Yes" v-model="newTier.post"/>
                                    <span style="margin-left: 10px;">Yes</span>
                                </label>
                                <label style="width: 50%;">
                                    <input class="with-gap" name="post" type="radio" value="No" v-model="newTier.post"/>
                                    <span style="margin-left: 10px;">No</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div v-if="showTierCompaniesModal" class="modal-overlay">
        <div class="modal">
            <div class="btn-cancel" @click="showTierCompaniesModal = false"> X </div>
            <div class="modal-aux">
                <div class="header">
                    <h1>{{ selectedRow.name }} Companies</h1>
                </div>
                <div class="body">
                    <div class="div-grid">
                        <!-- Utiliza v-for para iterar sobre os dados dos indivíduos -->
                        <div v-for="company in companies.filter(company => company.tier_id === selectedRow.id)" :key="company.name" class="element">
                            <div class="compimg"></div>
                            {{ company.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import axios from 'axios';
import TheTable from '../../global-components/TheTable.vue';
import { ref, onMounted } from 'vue';

let tiers = ref([]);
let companies = ref([]);

const tableKey = ref(0);

const fetchTiers = async () => {
  axios
  .get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/tiers_vue',{auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  })
  .then((response)=>{
    const data = response.data

    tiers.value = data.tiers;
    companies.value = data.companies;

    console.log(tiers.value);
    console.log(companies.value);
  })
  .catch((error)=>{
    console.log(error);
  })
};

// Chamando a função assim que o componente for montado
onMounted(fetchTiers);


const message = ref('');
const showAddTierModal = ref(false);
const showEditTierModal = ref(false);
const showTierCompaniesModal = ref(false);
const newTier = ref({
    name: '',
    priority: '',
    website: 'No',
    social: 'No',
    canvas: 'No',
    poster: 'No',
    video: 'No',
    post: 'No',
    teaser: 'No',
    meal: 'No'
});

const selectedRow = ref(null);

const tablePref = {
    name: "Name",
    number: "# Companies",
    meal: "Included Meals"
};
  
function selectCallback(row) {
    if (selectedRow.value == row) {
        selectedRow.value = null;
    } else {
        selectedRow.value = row;
        console.log(selectedRow.value)
    }
}

function addTier() {

    const new_tier = new FormData();

    new_tier.append('name', newTier.value.name)
    new_tier.append('priority', newTier.value.priority)
    new_tier.append('website', newTier.value.website)
    new_tier.append('social', newTier.value.social)
    new_tier.append('canvas', newTier.value.canvas)
    new_tier.append('poster', newTier.value.poster)
    new_tier.append('video', newTier.value.video)
    new_tier.append('post', newTier.value.post)
    new_tier.append('teaser', newTier.value.teaser)
    new_tier.append('meal', newTier.value.meal)

    axios
    .post(import.meta.env.VITE_APP_JEEC_BRAIN_URL+'/tier/create',new_tier,{auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
    })
    .then(response => {
            this.error = response.data
        })

    setTimeout(fetchTiers, 100);

    closeModal();
}

function openEdit() {
    newTier.value.name = selectedRow.value.name;
    newTier.value.priority = selectedRow.value.priority;
    newTier.value.website = selectedRow.value.website;
    newTier.value.social = selectedRow.value.social;
    newTier.value.canvas = selectedRow.value.canvas;
    newTier.value.poster = selectedRow.value.poster;
    newTier.value.video = selectedRow.value.video;
    newTier.value.post = selectedRow.value.post;
    newTier.value.teaser = selectedRow.value.teaser;
    newTier.value.meal = selectedRow.value.meal;
    showEditTierModal.value = true;
}

function editTier() {

    const new_tier = new FormData();

    new_tier.append('name', newTier.value.name)
    new_tier.append('priority', newTier.value.priority)
    new_tier.append('website', newTier.value.website)
    new_tier.append('social', newTier.value.social)
    new_tier.append('canvas', newTier.value.canvas)
    new_tier.append('poster', newTier.value.poster)
    new_tier.append('video', newTier.value.video)
    new_tier.append('post', newTier.value.post)
    new_tier.append('teaser', newTier.value.teaser)
    new_tier.append('meal', newTier.value.meal)
    new_tier.append('external_id', selectedRow.value.external_id)

    axios
    .post(import.meta.env.VITE_APP_JEEC_BRAIN_URL+'/tier/update',new_tier,{auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
    })
    .then(response => {
            this.error = response.data
        })

    setTimeout(fetchTiers, 100);

    closeModal();

    selectedRow.value = null;
}

function removeTier(row) {

    const delete_tier = new FormData();

    delete_tier.append('external_id', selectedRow.value.external_id)

    axios
    .post(import.meta.env.VITE_APP_JEEC_BRAIN_URL+'/tier/delete',delete_tier,{auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
    })
    .then(response => {
            this.error = response.data
        })

    selectedRow.value = null;

    setTimeout(fetchTiers, 100);

};

function closeModal() {
    showAddTierModal.value = false;
    showEditTierModal.value = false;
    newTier.value = {
        name: '',
        priority: '',
        website: 'No',
        social: 'No',
        canvas: 'No',
        poster: 'No',
        video: 'No',
        post: 'No',
        teaser: 'No',
        meal: 'No'
    };
}

</script>

<style scoped>

@import './companies.css';

#name {
  width: 50%;
  padding-right: 20px;
}

#priority {
  width: 50%;
  padding-left: 20px;
}

#meal {
  width: 33%;
  padding-right: 10px;
}

#website {
  width: 33%;
  padding-left: 10px;
  padding-right: 10px;
}

#social {
  width: 33%;
  padding-left: 10px;
}

#canvas {
  width: 33%;
  padding-right: 10px;
}

#posters {
  width: 33%;
  padding-left: 10px;
  padding-right: 10px;
}

#video {
  width: 33%;
  padding-left: 10px;
}

#teaser {
  width: 33%;
  padding-right: 10px;
}

#post {
  width: 33%;
  padding-left: 10px;
  padding-right: 10px;
}

</style>