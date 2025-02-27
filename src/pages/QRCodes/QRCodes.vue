<template>
  <div class="wrapper">
    <div v-if="!QR_enable" class="table">
      <form>
        <div class="search_style">
          <label>
            <img src="../../assets/search.svg">
          </label>
          <input v-model="message" placeholder="Search for a user" />
        </div>
      </form>
      <TheTable :data="QR_Activities" :tableHeaders="tablePref" :searchInput="message" :buttons="tableButtons"
        @QrRead="activateReader" @onRowSelect="selectCallback">
      </TheTable>
    </div>
    <div class="scanner" v-if="QR_enable">
      <button @click="deactivateReader" class="closeQR-button">
        <img src="../../assets/CloseQR.png">
      </button>
      <div v-if="scanned_flag" class="scanned-pop-up">
        <p>Successfully added points to {{ student_username }}</p>
        <button @click="scannedPopUp">
          <img src="../../assets/check.svg">
        </button> 
      </div>
      <div v-if="error_flag" class="scanned-pop-up">
        <p>Failed to add points</p>
        <button @click="errorPopUp">
          <img src="../../assets/check.svg">
        </button> 
      </div>
      <QrcodeStream @decode="onDecode" @init="onInit" @error="onError"></QrcodeStream>
    </div>
  </div>
</template>

<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref, onMounted } from 'vue';
import qrImage from '../../assets/pages/qrcodes.svg';
import axios from 'axios';
import { QrcodeStream } from 'vue3-qrcode-reader';

const QR_Activities = ref([]);

const QR_enable = ref(false);
const scanned_flag = ref(false);
const error_flag = ref(false);
const student_username = ref("");

// const datab = ref([
//   {
//     id: "1",
//     name: "Workshop Delloite",
//     time: "11:00",
//     end_time: "12:00",
//     outra: "coisa aleatoria",
//   },
//   {
//     id: "2",
//     name: "Main Speaker - Wagas",
//     time: "12:00",
//     end_time: "13:00",
//     outra: "coisa aleatoria",
//   },
// ]);

const tablePref = {
  id: "ID",
  name: "Activity",
  time: "Start",
  end_time: "End",
};

const tableButtons = [{
  name: "QR Reader",
  eventName: "QrRead",
  icon: qrImage
}];

const selectedRow = ref(null);  // Track the selected row

function selectCallback(row) {
  selectedRow.value = row;  // Set the selected row
}

function activateReader() {
  console.log("Activating QR Reader");
  QR_enable.value = true;
};

function deactivateReader() {
  console.log("Deactivating QR Reader");
  QR_enable.value = false;
}

function scannedPopUp() {
  scanned_flag.value = false;
  student_username.value = "";
}

function errorPopUp() {
  error_flag.value = false;
}

function onDecode(student_external_id) {
  console.log("QR Code Content:", student_external_id);
  console.log("Activity:", selectedRow.value.external_id);
  let debug = "28a0b7f0-bb3a-4b91-b230-adce4e729eb8"; 
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/activitiesdashboard_vue/activity/activity_external_idistid', {
    student_external_id: debug,  
    activity_external_id: selectedRow.value.external_id,
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  })
  .then(response => {
    console.log(response.data);
    if (response.data.errorQR == "") {
      scanned_flag.value = true;
      student_username.value = response.data.student_username;
    }else{
      error_flag.value = true;
    }
  })
  .catch(error => {
    console.error("Error scanning QR Code:", error);
    error_flag.value = true;
  });
}


function onInit(promise) {
  promise.catch(error => {
    console.error("Could not initialize the QR scanner:", error);
  });
}

function onError(error) {
  console.error("QR  Scanner Error:", error);
}

onMounted(() => {
  console.log("QR codes")
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL+'/activities_vue_for_qr', {auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }}).then(response => {
    console.log(response.data)
    QR_Activities.value = response.data.activities
    console.log(QR_Activities)
  })
});

</script>

<style scoped>
.wrapper {
  /* display: flex; */
  position: relative;
  height: calc(100dvh - var(--header-height));
  padding: 5ch 3ch 3ch 3ch;
  overflow-y: hidden;
}

.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3ch;
  padding-right: 3ch;
}

form {
  display: flex;
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 3ch;
  padding-left: 1ch;
  border-radius: 10px;
}

.search_style {
  display: flex;
  background-color: var(--c-accent);
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 6px;
  width: 60%;
}

.search_style>label>img {
  width: 20px;
  position: relative;
  top: 4px;
  left: 3px;
}

.search_style>input {
  appearance: none;
  background-color: transparent;
  border: 0px;
  color: var(--c-ft-semi-light);
  font-style: inherit;
  font-variant: inherit;
  font-weight: inherit;
  font-stretch: inherit;
  line-height: inherit;
  font-family: inherit;
  font-size-adjust: inherit;
  font-kerning: inherit;
  font-optical-sizing: inherit;
  font-language-override: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  font-size: 1rem;
  height: 100%;
  outline: none;
  padding: 0px 0px 0px 8px;
  width: 100%;
}

.search_style input::placeholder {
  color: var(--c-ft-semi-light);
}

.scanner {
  max-width: 800px;
  height: 100%;
}

.closeQR-button {
  position: absolute;
  z-index: 1000;
  margin-top: 10px;
  margin-left: 10px;
  border: none;
  background: transparent;
}

.closeQR-button > img {
  height: 3vh;
  width: 3vh;
}

.scanned-pop-up {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  z-index: 1000;
  margin-top: 30vh;
  left: 0; 
  right: 0; 
  margin-inline: auto; 
  width: fit-content;
  background-color: var(--c-bg-light);
  border-radius: 10px;
  height: 10%;
  width: 50%;
  opacity: 80%;
}

.scanned-pop-up > button {
  border: none;
  border-radius: 10px;
  height: 2.5rem;
  width: 2.5rem;
  background-color: var(--c-select);
}
</style>
