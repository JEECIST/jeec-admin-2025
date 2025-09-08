<template>
    <div class="wrapper">
        <div class="table">
            <form>
                <div class="search_style">
                <label>
                    <img src="../../assets/search.svg">
                </label>
                <input v-model="message" placeholder="Search for a user" />
                </div>
            </form>
            <TheTable
            :data="eletrolink_activities"
            :tableHeaders="tablePref"
            :searchInput="message"
            @onRowSelect="selectCallback"
            @notFound="handleNotFound"
            />
            <div v-if="noResultsFound" class = "tableBackground">
                <p class="no-users-found">No Eletrolink registrations found</p>
            </div>
        </div>

        <div v-if="selectedRow" class="right-popup-placeholder">
            <button class="close-popup" @click="closeCardInfo">&times;</button>
            <div class="header">
            <p class="cardUsername">Eletrolink</p>
            </div>
            
            <img src="../../assets/JEEC.png" alt="Profile Image" class="pfp">
            <p class="cardUsername">{{ selectedRow.name }}</p>
            <p class="cardUseless">{{ selectedRow.location }}</p>
            <div class="cardActions">
                <!-- <button class="edit-button" @click="openEditUserPopup(selectedRow)"><img src="../../assets/pencil.svg"></button> -->
                <button class="edit-button" @click="openAnotherModal"><img src="../../assets/sheet.svg"></button>
                <!-- <button class="delete-button" @click="deleteUser(selectedRow.external_id)"><img src="../../assets/trash.svg"></button> -->
            </div>
            <div class="cardInfo">
                <div class = "cardInfoMember"> 
                <p class="cardInfoLabel">Day</p>
                <p class="cardInfoValue">{{ selectedRow.day }}</p>
                </div>

                <div class = "cardInfoMember"> 
                <p class="cardInfoLabel">Time</p>
                <p class="cardInfoValue">{{ selectedRow.time }}</p>
                </div>
                
                <div class = "cardInfoMember"> 
                <p class="cardInfoLabel">End Time</p>
                <p class="cardInfoValue">{{ selectedRow.end_time }}</p>
                </div>
            
                <div class = "cardInfoMember"> 
                <p class="cardInfoLabel">Company</p>
                <p class="cardInfoValue">{{ selectedRow.company }}</p>
                </div> 

                <!-- <div class = "cardInfoMember"> 
                <p class="cardInfoLabel">Registrations</p>
                <p class="cardInfoValue">{{ selectedRow.registrations }}</p>
                </div>  -->

                <div class = "cardInfoMember"> 
                <p class="cardInfoLabel">Event</p>
                <p class="cardInfoValue">{{ selectedRow.event }}</p>
                </div> 
            </div>
          </div>

          <div v-if="isAnotherModalOpened">
            <EletrolinkListPopUp :isOpen="isAnotherModalOpened" :activity="selectedRow" @modal-close="closeAnotherModal"></EletrolinkListPopUp>
          </div>
    </div>

    
</template>

<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import EletrolinkListPopUp from './EletrolinkListPopUp.vue';

const selectedRow = ref(null);

// const datab = ref([
//   {
//     id: "1",
//     time: "11:00, Saturday",
//     end_time: "11:20, Saturday",
//     company: "Galp"
//   },
//   {
//     id: "2",
//     time: "12:00, Saturday",
//     end_time: "12:20, Saturday",
//     company: "Celfinet"
//   },
// ]);
const isAnotherModalOpened = ref(false);
const openAnotherModal = () => { isAnotherModalOpened.value = true; };
const closeAnotherModal = () => { isAnotherModalOpened.value = false; };

const eletrolink_activities = ref([])

const tablePref = {
  id: "ID",
  day: "Day",
  time: "Time",
  end_time: "End Time",
  company: "Company"
};

function selectCallback(row) {
  selectedRow.value = {...row};
}

const noResultsFound = ref(false);
function handleNotFound(isEmpty) {
  noResultsFound.value = isEmpty;
}

function closeCardInfo(){
  selectedRow.value = null;
}

function fetchData(){
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL+'/eletrolink_activities', {auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }}).then(response => {
    console.log(response.data)
    eletrolink_activities.value = response.data.activities
  })
}

onMounted(fetchData)

</script>

<style scoped>

.wrapper {
  display: flex;
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
.cardUseless{
  color: gray;
  margin-bottom: 1rem;
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
  width: 100%;
}

.search_style > label > img {
  width: 20px;
  position: relative;
  top: 4px;
  left: 3px;
}

.search_style > input {
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


form > button {
  font-size: 1rem;
  font-weight: 500;
  border: none;
  background-color: var(--c-select);
  border-radius: 6px;
  color: var(--c-bg-light);
  cursor: pointer;
  padding: 0px 15px;
  height: 100%;
  width: 25%;
}

.router-link {
  font-size: 1rem;
  font-weight: 500;
  border: none;
  background-color: var(--c-select);
  border-radius: 6px;
  color: var(--c-bg-light);
  cursor: pointer;
  padding: 0px 15px;
  height: 100%;
  width: 25%;
  text-decoration: none; /* Remove underline */
}


.chevron{
  display: inline-block;
  width: 11px;
  height: 11px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-45deg);
  border-radius: 2px; 
}
/* Right Popup Placeholder */
.right-popup-placeholder {
  position: sticky;
  top: 0;
  right: 0;
  width: 23rem;
  height: 100%;
  border-radius: 1.5rem;
  background-color: #eef4fb;
  padding: 1.5rem;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);

}

.right-popup-placeholder .header {
  text-align: center;
  margin-bottom: 10px;
}

.right-popup-placeholder .title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #444;
  margin-bottom: 10px;
}



.right-popup-placeholder .pfp {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin-bottom: 15px;
}

.right-popup-placeholder .cardUsername {
  font-size: 1.5rem ;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.right-popup-placeholder .cardRole {
  
  font-weight: 500;
  color: #777;
  margin-bottom: 20px;
}

.right-popup-placeholder .cardActions {
  display: flex;
  gap: 10px;
  
}

.right-popup-placeholder .edit-button,
.right-popup-placeholder .delete-button {
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  
}

.right-popup-placeholder .edit-button:hover,
.right-popup-placeholder .delete-button:hover {
  background-color: #f0f0f0;
}

.right-popup-placeholder .cardInfo {
  width: 100%;
  text-align: left;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.right-popup-placeholder .cardInfoLabel {
  font-size: 1.1rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 5px;
}

.right-popup-placeholder .cardInfoValue {
  font-size: 1.1rem;
  font-weight: 250;
  color: #333;
}

/* Modal styles */
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
}

.modal {
  background: white;
  padding: 2rem;
  margin: 1rem;
  max-width: 700px;
  width: 100%;
  /* min-height: 70%; */
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
}

.popup_form {
  
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 10px;
}

.modal-actions {
  
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  padding-top: 1rem;
  gap: 20px;
  width: 100%;
}

.modal h2 {
  padding-left: 8px;
  margin-top: 0;
  margin-bottom: 2%;
  font-size: 1.5rem;
  font-weight: 600;
}

.formUsername {
  width: 100%;
}

.formRole {
  
  justify-content: flex-start;
  align-self: flex-start;
  width: 60%;
}

/* Label Styling */
.popup,
.formRole label,
.formUsername label {
  display: block;
  margin-bottom: -1rem;
  padding: 0px;
  font-size: 1rem;
  font-weight: 500;
}

/* Input Styling */
.formRole input,
.formUsername input,
.formRole select,
.formUsername select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}

/* Button Styling */
.btnCancel,
.btn-primary {
  width: 15%;
  background-color: var(--c-select);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btnCancel:hover,
.btn-primary:hover {
  background-color: #002855;
}

.close-popup {
        display: block;
        position: absolute;
        top: 5px;
        right: 25px;
        background: none;
        border: none;
        font-size: 2.2rem;
        cursor: pointer;
        color: #333;
    }

.tableBackground {
  background-color: var(--c-accent);
  border-radius: 6px;
  min-height: 70%;
  
  display: flex;
  justify-content: center;  /* Centers horizontally */
  align-items: center;  /* Centers vertically */
}

.no-users-found {
  font-weight: 700;
  text-align: center;
  font-size: 1.2rem;
  color: darkgray;
}


@media (max-width: 768px) {
  .wrapper {
  display: flex;
  position: relative;
  height: calc(100dvh - var(--header-height));
  padding: 5ch 3ch 3ch 3ch;  
}
.popUpOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 500; 
}
  .table {
    width: 100%;
    padding-right: 1ch;
    gap: 1ch;
  }
  .right-popup-placeholder {
    position: fixed; 
    top: 50%; 
    left: 43%;
    transform: translate(-50%, -50%);
    width: 90%; 
    height: calc(97dvh - var(--header-height)); 
    background-color: #eef4fb; 
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000; 
  }


  .right-popup-placeholder .close-popup {
        display: block;
        position: absolute;
        top: 5px;
        right: 25px;
        background: none;
        border: none;
        font-size: 2.2rem;
        cursor: pointer;
        color: #333;
    }

  
  .btnCancel,
  .btn-primary {
    width: 5rem;
    background-color: var(--c-select);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  form > button {
    font-size: 1rem;
    font-weight: 500;
    border: none;
    background-color: var(--c-select);
    border-radius: 6px;
    color: var(--c-bg-light);
    cursor: pointer;
    width: 6rem;
    padding-right: 1rem;
    
  }

  .router-link {
    font-size: 1rem;
    font-weight: 500;
    border: none;
    background-color: var(--c-select);
    border-radius: 6px;
    color: var(--c-bg-light);
    cursor: pointer;
    width: 6rem;
    padding-right: 1rem;
    text-decoration: none; /* Remove underline */
    
  }

  .chevron{
    display: none;
  
  }
  .no-users-found {
  text-align: center;
  font-size: 1.2rem;
  color: gray;
  margin-top: 20px;
}

}

</style>