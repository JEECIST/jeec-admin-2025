<script setup>
import { ref } from 'vue';

const props = defineProps({
    showAddCompanyModal:{
        type: Boolean,
    },
    showEditCompanyModal:{
        type: Boolean,
    },
    events:{
        type: Array,
    },
    tiers:{
        type: Array,
    },
    responsibles:{
        type: Array,
    },
});

const emits = defineEmits(['close-modal'])

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

function onLogoSelected(event){
  fileSelected.value = event.target.files[0].name;
  fileToUpload.value = event.target.files[0];
  logo_image.value = URL.createObjectURL(event.target.files[0]);
  newCompany.value.changeimg = 'Yes';
  console.log(fileSelected.value);
}


</script>

<template>
<div v-if="props.showAddCompanyModal || props.showEditCompanyModal" class="modal-overlay">
    <form class="modal">
      <div class="btn-cancel" @click="emits('close-modal')"> X </div>
      <button v-if="props.showAddCompanyModal" class="btn-primary" @click="addCompany()">Add</button>
      <button v-if="props.showEditCompanyModal" class="btn-primary" @click="editCompany()">Edit</button>

      <div class="modal-aux">
        <div class="header">
          <h1 v-if="props.showAddCompanyModal">Add Company</h1>
          <h1 v-if="props.showEditCompanyModal">Edit Company</h1>
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
                <input 
                    id="logo-upload"
                    name ="fileSelected" type="file" @change="onLogoSelected" class="button-add-logo" accept="image/*" />
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