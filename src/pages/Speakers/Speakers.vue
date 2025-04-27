<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import AddSpeakerPopup from './AddSpeakerPopup.vue';
import EditSpeakerPopup from './EditSpeakerPopup.vue';
import MobilePopup from './MobilePopup.vue';
import axios from 'axios';

/* backend - frontend variables and functions */
const speaker = ref();
const events = ref([]);
const responsibles = ref([]);
const types = ref([]);
const datab = ref([]);
const datab_filtered = ref([]);
var speaker_image = ref(null);

/* initialize all data */
const fetchData = () => {
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/speakerss', {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  }).then((response) => {
    events.value = response.data.events
    responsibles.value = response.data.responsibles
    types.value = response.data.stypes
    datab.value = response.data.speakers[0] //meter id do evento
    datab_filtered.value = response.data.speakers[0] 
    console.log(types.value)
  }).catch((error) => {
    console.log(error)
  })
}
onMounted(fetchData)

/* fetch image to show on the popup when a speaker is selected */
function fetchSpeakerImage(speaker) {
  axios.post(`${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/getimagespeakerrrr`, {
    external_id: speaker.external_id,
  }, {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
    }
  }).then(response => {
    if (!response.data.error) {
      speaker_image.value = import.meta.env.VITE_APP_JEEC_BRAIN_URL.replace('/admin', '') + response.data.speaker_image;
      console.log("here")
      console.log(speaker_image)
    } else {
      console.log("Image error:", response.data.error);
    }
  }).catch(error => {
    console.log("Fetch speaker image failed", error);
  });
}

/* add a new speaker */
function addSpeaker(newSpeaker) {
  console.log(newSpeaker.speaker_image)
  const formData = new FormData();
  for (const [key, value] of Object.entries(newSpeaker)) { formData.append(key, value); }
  console.log(formData);
  axios.post(`${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/new-speaker-vue`, formData, {
    auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
    },  headers: { 'Content-Type': 'multipart/form-data' }, 
  }).then(() => {
    fetchData();
  }).catch((error) => {
    console.log(error)
  })
}

/* update an existing speaker */
function updateSpeaker(editedSpeaker) {
  const formData = new FormData();
  console.log(editedSpeaker);
  for (const [key, value] of Object.entries(editedSpeaker)) { formData.append(key, value); }
  
  axios.post( `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/edit-speaker-vue`, formData, {
    auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
    },  headers: { 'Content-Type': 'multipart/form-data' }, 
  }).then(() => {
    fetchData();
  }).catch((error) => {
    console.log(error)
  })
}

/* delete an existing speaker */
function deleteSpeaker(speaker) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(speaker)) { formData.append(key, value); }

    axios.post(`${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/speaker/delete`, formData, {
      auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY, 
      },
    }).then(() => {
      fetchData();
      closePopup(); })
}

/* table */
const tablePref = {
  id: "ID",
  name: "Name",
  speaker_type: "Type",
  company: "Company",
  country: "Country",
  responsible: "JEEC Responsible",
};

/* select a row */
function selectCallback(row) {
  console.log(row)
  speaker.value = row;
  fetchSpeakerImage(speaker.value);
  popupShow.value = true;
  if (isMobile.value) { openMobileModal(); }
}

/* filter table rows by event */
function filterEvent() {
  const selected = event_selecting.value;
  if (selected == 'all') { datab_filtered.value =  datab.value } 
  else { datab_filtered.value =  datab.value.filter(speaker => speaker.event_id === selected) }
}

/* mobile screen detection and adjustment */
const isMobile = ref(window.innerWidth <= 800);
function updateIsMobile() { isMobile.value = window.innerWidth <= 800; }
onMounted(() => { window.addEventListener('resize', updateIsMobile); });
onUnmounted(() => { window.removeEventListener('resize', updateIsMobile); });

/* speaker types page link */
const router = useRouter();
function goToSpeakerTypes() {
  router.push("/speakers/types");
}

/* initialization of frontend variables and functions */
const message = ref();
const event_selecting = ref();
const popupShow = ref(false);
const descriptionShow = ref(false);
const isModalOpened = ref(false);
const isOtherModalOpened = ref(false);
const isMobileModalOpened = ref(false);
const noSpeakers = ref(false);

const closePopup = () => { popupShow.value = false; };
const openModal = () => { isModalOpened.value = true; };
const closeModal = () => { isModalOpened.value = false; };
const openOtherModal = () => { isOtherModalOpened.value = true; };
const closeOtherModal = () => { isOtherModalOpened.value = false; };
const openMobileModal = () => { isMobileModalOpened.value = true; };
const closeMobileModal = () => { isMobileModalOpened.value = false; };
function showfunction() { descriptionShow.value = true; }
function closeDescription() { descriptionShow.value = false; }

/* go to linkedin */
function openLinkedIn(event) {
  event.preventDefault();
  const url = speaker.value.linkedin_url;

  if (typeof url !== "string" || !url.startsWith("https://www.linkedin.com/") && !url.startsWith("https://linkedin.com/")) {
    console.log("Invalid LinkedIn Profile.");
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

/* handle no search results */
function noSearchResults(isEmpty) { noSpeakers.value = isEmpty; };
onMounted(noSearchResults)
</script>

<template>
  <div :class="{'desktop' : !isMobile, 'mobile' : isMobile}">
    <div :class="{'wrapper' : !isMobile, 'mobile-wrapper' : isMobile}">
      

      <!-- Table + Top Bar -->
      <div class="table">
        
        <!-- Desktop Only Section -->
        <div v-if="!isMobile" :class="{'navigation' : !isMobile, 'mobile-navigation' : isMobile}">
            <form class="searchbar">
              <label> <img src="../../assets/search.svg"> </label>
              <input v-model="message" placeholder="Search for a Speaker">
            </form>
            <div class="event">
              <label for="evento" class="eventselect">Event</label>
              <select name="evento" placeholder="  " class="eventselect"  v-model="event_selecting" @change="filterEvent">
                <option value="null" disabled selected hidden></option>
                <option value="all">All</option>
                <option v-for="event in events" :key="event.id" :value="event.id">{{ event.name }}</option>
              </select>
            </div>
            <button class="topbtn" @click="openModal">Add Speaker</button>
            <button @click="goToSpeakerTypes" class="topbtn">Speaker Types</button>
        </div>

        <!-- Mobile Only Section -->
        <div v-else :class="{'navigation' : !isMobile, 'mobile-navigation' : isMobile}">
          <div class="navigation-wrapper">
            <div class="topthings">
              <form class="search-mobile">
                <label> <img src="../../assets/search.svg"> </label>
                <input v-model="message" placeholder="Search">
              </form>
              <div class="event-mobile">
                <label for="evento" class="eventselect">Event</label>
                <select name="evento" placeholder="  " class="eventselect"  v-model="event_selecting" @change="filterEvent">
                  <option value="null" disabled selected hidden></option>
                  <option value="all">All</option>
                  <option v-for="event in events" :key="event.id" :value="event.id">{{ event.name }}</option>
                </select>
              </div>
            </div>
            <div class="topbtns">
              <button class="topbtn-mobile" @click="openModal">Add Speaker</button>
              <button @click="goToSpeakerTypes" class="topbtn-mobile">Speaker Types</button>
            </div>
          </div>
        </div>

        <!-- Common Section -->
        <AddSpeakerPopup :isOpen="isModalOpened" :events="events" :types="types" :responsibles="responsibles" @add-speaker="addSpeaker" @modal-close="closeModal"></AddSpeakerPopup>
        <EditSpeakerPopup :isOpen="isOtherModalOpened" :speaker="speaker" :events="events" :types="types" :responsibles="responsibles" @update-speaker="updateSpeaker" @modal-close="closeOtherModal"></EditSpeakerPopup>
        <div class="popup-mask" v-show="descriptionShow">
          <div :class="{'description' : !isMobile, 'description-mobile' : isMobile}" v-if="speaker">
            <p> {{ speaker.bio }} </p>
            <button :class="{'closedescription' : !isMobile, 'mobile-closedescription' : isMobile}" @click="closeDescription">X</button>
          </div>
        </div>
        <TheTable :data="datab_filtered" :tableHeaders="tablePref" :searchInput="message" @onRowSelect="selectCallback" @notFound="noSearchResults"></TheTable>
        <div class="no-speakers-wrap" v-if=noSpeakers>
          <div class="no-speakers" v-if=noSpeakers>No Speakers Found</div>
        </div>
      </div>
      
      <!-- Popup -->

      <!-- Mobile Only - Modal Popup -->
      <div v-if="isMobile">
        <MobilePopup :isOpen="isMobileModalOpened" :speaker="speaker" :events="events" :types="types" :responsibles="responsibles" :speaker_image="speaker_image" @delete-speaker="deleteSpeaker" @update-speaker="updateSpeaker" @modal-close="closeMobileModal"></MobilePopup>
      </div>

      <!-- Desktop Only - Right Side Popup -->
      <div v-else class="right-popup-placeholder" v-show="popupShow">
        <div class="close-wrapper">
          <button class="close" @click="closePopup">X</button>
        </div>
        <div class="items" v-if="speaker">
          <h1>{{ speaker.speaker_type }}</h1>
          <div class="speaker-photo">
            <img v-if="speaker_image" :src="speaker_image" alt="Speaker Photo" />
            <span v-else>Insert Speaker<br>Photo</span>
          </div>
          <h3 class="text1">{{ speaker.name }}</h3>
          <p class="text2 title">Speaker</p>
          <div class="btns-row">
            <button class="btn" @click="openOtherModal"> <img src="../../assets/pencil.svg"> </button>
            <button class="btn" @click="showfunction"> <img src="../../assets/sheet.svg"> </button>
            <button class="btn" @click="openLinkedIn"> <img src="../../assets/linkedin.svg"> </button>
            <button class="btn" @click="deleteSpeaker(speaker)"> <img src="../../assets/trash.svg"> </button>
          </div>
          <div id="info">
            <p>Company</p> <p class="text2">{{ speaker.company }}</p>
            <p>Position</p> <p class="text2">{{ speaker.position }}</p>
            <div class="row"> 
              <div class="col"> <p>Country</p> <p class="text2">{{ speaker.country }}</p> </div>
              <div class="col"> <p>Event</p> <p class="text2">{{ speaker.event_name }}</p> </div> 
            </div>
            <p>JEEC Responsible</p> <p class="text2">{{ speaker.responsible }}</p>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped>
.mobile-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  height: calc(100dvh - var(--header-height));
  padding: 3ch 1ch 1ch 1ch;
  margin-right: 0vw;
  overflow-x: hidden;
}

.wrapper {
  display: flex;
  position: relative;
  height: calc(100dvh - var(--header-height));
  padding: 5ch 3ch 3ch 3ch;
  overflow-y: hidden;
  gap: 3ch;
}

.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3ch;
}

.mobile-navigation>form {
  display: flex;
  width: 21%;
  background-color: var(--c-accent);
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 10px;
  flex-grow: 0.5;
}

button {
  outline: none;
  border: none;
  cursor: pointer;
}

p {
  color: black;
  font-weight: 500;
  font-size: small;
}

select {
  border-style: solid;
  border-width: thin;
  border-radius: 7px;
  height: 50px;
  opacity: 60%;
  border-color: #8a8a8a;
  background-color: white;
}

.searchbar {
  display: flex;
  width: 40vw;
  background-color: var(--c-accent);
  line-height: 50px;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 10px;
  flex-grow: 0.7;
  /* flex-shrink: 100; */
}

.search-mobile {
  display: flex;
  width: 70vw;
  background-color: var(--c-accent);
  line-height: 50px;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 10px;
  flex-grow: 0.7;
}

form>label>img {
  width: 20px;
  position: relative;
  top: 4px;
  left: 3px;
}

form>input {
  appearance: none;
  background: transparent;
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

form>input::placeholder {
  color: var(--c-ft-semi-light)
}

.right-popup-placeholder {
  position: sticky;
  top: 0;
  right: 0;
  width: 500px;
  height: 100%;
  border-radius: 30px;
  background-color: var(--c-accent);
  overflow-y: auto;
  overflow-x: hidden;
  text-overflow: ellipsis;
  padding-bottom: 3%;
}

.right-popup-placeholder-mobile {
  width: 94.5vw;
  height: 93vh;
  border-radius: 30px;
  background-color: var(--c-accent);
  margin-right: -0vw;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 3%;

}

.close-wrapper {
  display: flex;
  justify-content: right;
  margin-right: 2%;
}

.close {
  background-color: var(--c-accent);
  color: rgba(0, 0, 0, 0.710);
  font-size: large;
  font-weight: bolder;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  width: 2vw;
  height: 3.5vh;
  margin-top: 3%;
  margin-right: 2%;
  margin-bottom: -8%;
}

.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
  margin-top: 3vh;
}

.speaker-photo {
  height: 165px;
  width: 165px;
  background-color: var(--c-select);
  border-radius: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: white;
}

.speaker-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
}

.text1 {
  color: black;
  font-size: x-large;
}

.text2 {
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--c-ft-semi-light);
}

.title {
  font-size: larger;
  font-weight: 550;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 4.5vw;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 1vh;
  max-width: 55%;
}

#info {
  margin-left: -2.5vw;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 1.3vh;
  width: 60%;
}

.btns-row {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.btn {
  width: 36px;
  height: 36px;
  background: #FFFFFF;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.topbtn {
  background-color: var(--c-select);
  color: white;
  border: none;
  border-radius: 7px;
  align-items: center;
  height: 50px;
  font-weight: 500;
  font-size: small;
  flex-grow: 1;
  width: 10%;
  cursor: pointer;
}

.topbtn-mobile {
  background-color: var(--c-select);
  color: white;
  border: none;
  border-radius: 7px;
  align-items: center;
  height: 50px;
  font-weight: 500;
  font-size: small;
  flex-grow: 1;
  width: 10%;
  cursor: pointer;
}

.navigation,
.mobile-navigation {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.navigation-wrapper {
  width: 100vw;
}

.navigation-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.topthings {
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: space-between;
}

.topbtns {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.event-mobile {
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  width: 30vw;
}

.event {
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  width: 8vw;
}

.event>label {
  position: absolute;
  bottom: 100%;
}

.event-mobile>label {
  position: absolute;
  bottom: 100%;
}

.popup-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.425);
}

.description-mobile {
  display: flex;
  justify-content: left;
  background-color: white;
  width: 94.5vw;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 46.5%;
  translate: -50% -50%;
  border-radius: 15px;
}

.description-mobile>p {
  display: flex;
  align-items: center;
  vertical-align: center;
  justify-content: center;
  padding: 3.5vw;
  font-weight: 350;
  color: (--c-ft-semi-light);
}

.description {
  display: flex;
  justify-content: center;
  background-color: white;
  width: 60vw;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border-radius: 15px;
  overflow-y: auto;
  overflow-x: hidden;
}

.description>p {
  display: flex;
  align-items: center;
  vertical-align: center;
  justify-content: center;
  padding: 3.5vw;
  font-weight: 350;
  color: (--c-ft-semi-light);
}

.closedescription {
  background-color: #152259;
  color: white;
  border-radius: 5px;
  border: none;
  margin-right: 0.75vw;
  margin-top: 2%;
  margin-bottom: 2%;
  display: flex;
  margin-left: auto;
  width: 8.4vw;
  height: 3.5vh;
  align-items: center;
  justify-content: center;
  gap: 10vh;
  cursor: pointer;
  padding: 0.5vw;
}

.mobile-closedescription {
  background-color: #152259;
  color: white;
  border-radius: 5px;
  border: none;
  margin-right: 3vw;
  margin-top: 2%;
  margin-bottom: 2%;
  display: flex;
  margin-left: auto;
  width: 90vw;
  height: 3.5vh;
  align-items: center;
  justify-content: center;
  gap: 10vh;
  cursor: pointer;
  padding: 0.5vw;
}

.no-speakers-wrap {
  display: table;
  position: sticky;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: var(--c-accent);
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 3%;
  text-align: center;
  vertical-align: 0%;
  font-size: larger;
  font-weight: 500;
}

.no-speakers {
  display: table-cell;
  vertical-align: middle;
}
</style>
