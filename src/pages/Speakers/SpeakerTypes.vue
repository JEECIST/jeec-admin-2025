<!-- FEITO -->

<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import AddSpeakerTypePopup from './AddSpeakerTypePopup.vue';
import EditSpeakerTypePopup from './EditSpeakerTypePopup.vue';
import ListSpeakerTypePopup from './ListSpeakerTypePopup.vue';
import TypeMobilePopup from './TypeMobilePopup.vue';
import axios from 'axios';

/* backend - frontend variables and functions */
const stypes = ref([]);
const stype = ref([]);
const speakers = ref([]);
const datab = ref([]);

/* initialize all data */
const fetchData = () => {
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/speakerss', {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  }).then((response) => {
    stypes.value = response.data.stypes
    datab.value = response.data.stypes
    speakers.value = response.data.speakers
  }).catch((error) => {
    console.log(error)
  })
}
onMounted(fetchData)

/* add a new speaker type */
function addSpeakerType(newSpeakerType) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(newSpeakerType)) { formData.append(key, value); }
  axios.post(`${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/new-speaker-type-vue`, formData, {
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

/* update an existing speaker type */
function updateSpeakerType(editedSpeakerType) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(editedSpeakerType)) { formData.append(key, value); }
  
  axios.post( `${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/edit-speaker-type-vue`, formData, {
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

/* delete an existing speaker type */
function deleteSpeakerType(type) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(type)) { formData.append(key, value); }

    axios.post(`${import.meta.env.VITE_APP_JEEC_BRAIN_URL}/delete-speaker-type-vue`, formData, {
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
  name: "Name",
  priority: "Priority",
  num_speakers: "# Speakers",
  included_meal: "Included Meal"
};

/* select a row */
function selectCallback (row) {
  stype.value = row;
  popupShow.value = true;
  if (isMobile.value) { openMobileModal(); }
}

/* mobile screen detection and adjustment */
const isMobile = ref(window.innerWidth <= 800);
function updateIsMobile() { isMobile.value = window.innerWidth <= 800; }
onMounted(() => { window.addEventListener('resize', updateIsMobile); });
onUnmounted(() => { window.removeEventListener('resize', updateIsMobile); });

/* initialization of frontend variables and functions */
const popupShow = ref(false);
const isModalOpened = ref(false);
const isOtherModalOpened = ref(false);
const isAnotherModalOpened = ref(false);
const isMobileModalOpened = ref(false);
const noSpeakers = ref(false);

const closePopup = () => { popupShow.value = false; };
const openModal = () => { isModalOpened.value = true; };
const closeModal = () => { isModalOpened.value = false; };
const openOtherModal = () => { isOtherModalOpened.value = true; };
const closeOtherModal = () => { isOtherModalOpened.value = false; };
const openAnotherModal = () => { isAnotherModalOpened.value = true; };
const closeAnotherModal = () => { isAnotherModalOpened.value = false; };
const openMobileModal = () => { isMobileModalOpened.value = true; };
const closeMobileModal = () => { isMobileModalOpened.value = false; };

function noSearchResults(isEmpty) { noSpeakers.value = isEmpty; };
onMounted(noSearchResults)


const message = ref();

</script>

<template>
  <div :class="{'desktop' : !isMobile, 'mobile' : isMobile}">
    <div :class="{'wrapper' : !isMobile, 'mobile-wrapper' : isMobile}">

      <!-- Table + Top Bar -->
      <div class="table">

        <div :class="{'topbar' : !isMobile, 'mobile-topbar' : isMobile}">
          <form>
            <label>
              <img src="../../assets/search.svg">
            </label>
            <input v-model="message" :placeholder="isMobile ? 'Search' : 'Search for a Speaker Type'">
          </form>
          <button :class="{'topbtn' : !isMobile, 'mobile-topbtn' : isMobile}" @click="openModal">Add Type</button>

          <!-- Modals -->
          <AddSpeakerTypePopup :isOpen="isModalOpened" :speakers="speakers" @add-type="addSpeakerType" @modal-close="closeModal"></AddSpeakerTypePopup>
          <EditSpeakerTypePopup :isOpen="isOtherModalOpened" :stype="stype" :speakers="speakers" @update-type="updateSpeakerType" @modal-close="closeOtherModal"></EditSpeakerTypePopup>
          <ListSpeakerTypePopup :isOpen="isAnotherModalOpened" :stype="stype" @modal-close="closeAnotherModal"></ListSpeakerTypePopup>

        </div>
        <TheTable :data="datab" :tableHeaders="tablePref" :searchInput="message" @onRowSelect="selectCallback" @notFound="noSearchResults"></TheTable>
        <div class="no-speakers-wrap" v-if=noSpeakers>
          <div class="no-speakers" v-if=noSpeakers>No Speaker Types Found</div>
      </div>
      </div>

      <!-- Popup -->

      <!-- Mobile Only - Modal Popup -->
      <div v-if="isMobile">
        <TypeMobilePopup :isOpen="isMobileModalOpened" :stype="stype" :speakers="speakers" @delete-type="deleteSpeakerType" @update-type="updateSpeakerType" @modal-close="closeMobileModal"></TypeMobilePopup>
      </div>

      <!-- Desktop Only - Right Side Popup -->
      <div v-else class="right-popup-placeholder" v-show="popupShow">
        <div class="close-wrapper">
          <button class="close" @click="closePopup">X</button>
        </div>
        <div class="items">
          <div class="speaker-photo">
            <img src="../../assets/jeec25.png" alt="Insert Photo">
          </div>
          <h3 class="text1">{{ stype.name }}</h3>
          <p class="text2 title">Speaker Type</p>
          <div class="btns-row">
            <button class="btn" @click="openOtherModal"> <img src="../../assets/pencil.svg"> </button>
            <button class="btn" @click="openAnotherModal"> <img src="../../assets/mic.svg"> </button>
            <button class="btn" @click="deleteSpeakerType(stype)"> <img src="../../assets/trash.svg"> </button>
          </div>
          <div id="info">
            <div class="row">
              <div class="col item1">
                <p>Priority</p>
                <p class="text2">{{ stype.priority }}</p>
              </div>
              <div class="col item2">
                <p># Speakers</p>
                <p class="text2">{{ stype.num_speakers }}</p>
              </div>
              <div class="col item3">
                <p>Show in Website</p>
                <p class="text2">{{ stype.show_in_website ? 'Yes' : 'No' }}</p>
              </div>
              <div class="col item4">
                <p>Social Media</p>
                <p class="text2">{{ stype.social_media ? 'Yes' : 'No' }}</p>
              </div>
              <div class="col item5">
                <p>Exclusive Video</p>
                <p class="text2">{{ stype.exclusive_video ? 'Yes' : 'No' }}</p>
              </div>
              <div class="col item6">
                <p>Exclusive Posts</p>
                <p class="text2">{{ stype.exclusive_posts ? 'Yes' : 'No' }}</p>
              </div>
            </div>
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

.mobile-topbar>form {
  display: flex;
  width: 70%;
  background-color: var(--c-accent);
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 10px;
}

form {
  display: flex;
  width: 85%;
  background-color: var(--c-accent);
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 10px;
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
  border-radius: 30px;
  background-color: var(--c-accent);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.right-popup-placeholder-mobile {
  width: 94.5vw;
  height: 93vh;
  border-radius: 30px;
  background-color: var(--c-accent);
  margin-right: -0vw;

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
}

.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
  margin-top: 3vh;
  margin-bottom: 3vh;
}

.speaker-photo {
  height: 165px;
  width: 165px;
  background-color: var(--c-select);
  border-radius: 100%;
  display: flex;
  align-items: center;
  text-align: center;
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
  color: var(--c-ft-semi-light);
}

.title {
  font-size: larger;
  font-weight: 550;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 30px;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

#info {
  margin-left: 0vw;
  ;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 30px;
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
  padding: 12px;
  opacity: 60%;
  border-color: #8a8a8a;
  background-color: white;
}

.mobile-topbtn {
  background-color: var(--c-select);
  color: white;
  border: none;
  border-radius: 7px;
  align-items: center;
  height: 50px;
  width: 30%;
  font-weight: 500;
  font-size: small;
  cursor: pointer;
}

.topbtn {
  background-color: var(--c-select);
  color: white;
  border: none;
  border-radius: 7px;
  align-items: center;
  height: 50px;
  width: 15%;
  font-weight: 500;
  font-size: small;
  cursor: pointer;
}

.topbar,
.mobile-topbar {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

button {
  outline: none;
  border: none;
  cursor: pointer;
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