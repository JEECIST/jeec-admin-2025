<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref } from 'vue';
import AddEventPopup from './AddEventPopup.vue';
import { onMounted } from 'vue';
import axios from 'axios';

const popupShow = ref(false);

const isModalOpened = ref(false);

const openModal = () => {
  isModalOpened.value = true;
};
const closeModal = () => {
  isModalOpened.value = false;
};

function isMobile() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  }
  else {
    return false;
  }
}

const datab = [
  {
    name: "JEEC 25",
    startdate: "05 05 2025, Monday",
    enddate: "09 05 2025, Friday",
    email: "coordination@jeec.ist",
    location: "TIC",
    cvstart: "01 05 2025, Thursday",
    cvend: "02 06 2025, Monday",
    cvaccstart: "20 05 2025, Tuesday",
    cvaccend: "24 06 2025, Tuesday",
    endgamedate: "Tired of making up dates",
    cvpurged: "No",
    facebook: "Facebook event",
    default: "Yes"
  },
  {
    name: "JEEC 25",
    startdate: "05 05 2025, Monday",
    enddate: "09 05 2025, Friday",
    email: "coordination@jeec.ist",
    location: "TIC",
    cvstart: "01 05 2025, Thursday",
    cvend: "02 06 2025, Monday",
    cvaccstart: "20 05 2025, Tuesday",
    cvaccend: "24 06 2025, Tuesday",
    endgamedate: "Tired of making up dates",
    cvpurged: "No",
    facebook: "Facebook event",
    default: "Yes"
  },
  {
    name: "JEEC 25",
    startdate: "05 05 2025, Monday",
    enddate: "09 05 2025, Friday",
    email: "coordination@jeec.ist",
    location: "TIC",
    cvstart: "01 05 2025, Thursday",
    cvend: "02 06 2025, Monday",
    cvaccstart: "20 05 2025, Tuesday",
    cvaccend: "24 06 2025, Tuesday",
    endgamedate: "Tired of making up dates",
    cvpurged: "No",
    facebook: "Facebook event",
    default: "Yes"
  },
  {
    name: "JEEC 25",
    startdate: "05 05 2025, Monday",
    enddate: "09 05 2025, Friday",
    email: "coordination@jeec.ist",
    location: "TIC",
    cvstart: "01 05 2025, Thursday",
    cvend: "02 06 2025, Monday",
    cvaccstart: "20 05 2025, Tuesday",
    cvaccend: "24 06 2025, Tuesday",
    endgamedate: "Tired of making up dates",
    cvpurged: "No",
    facebook: "Facebook event",
    default: "Yes"
  },
  {
    name: "JEEC 25",
    startdate: "05 05 2025, Monday",
    enddate: "09 05 2025, Friday",
    email: "coordination@jeec.ist",
    location: "TIC",
    cvstart: "01 05 2025, Thursday",
    cvend: "02 06 2025, Monday",
    cvaccstart: "20 05 2025, Tuesday",
    cvaccend: "24 06 2025, Tuesday",
    endgamedate: "Tired of making up dates",
    cvpurged: "No",
    facebook: "Facebook event",
    default: "Yes"
  },
  {
    name: "JEEC 25",
    startdate: "05 05 2025, Monday",
    enddate: "09 05 2025, Friday",
    email: "coordination@jeec.ist",
    location: "TIC",
    cvstart: "01 05 2025, Thursday",
    cvend: "02 06 2025, Monday",
    cvaccstart: "20 05 2025, Tuesday",
    cvaccend: "24 06 2025, Tuesday",
    endgamedate: "Tired of making up dates",
    cvpurged: "No",
    facebook: "Facebook event",
    default: "Yes"
  },

];

// const tablePref = {
//   name: "Name",
//   startdate: "Start date",
//   enddate: "End date",
//   email: "Email",
//   location: "Location",
//   cvstart: "CV's Submission Start",
//   cvend: "CV's Submission End",
//   cvaccstart: "CV's Access Start",
//   cvaccend: "CV's Access End",
//   endgamedate: "End Game Date",
//   cvpurged: "CV's purged",
//   facebook: "Facebook event",
//   default: "Default event"
// };

const tablePref = {
  name: "Name",
  start_date: "Start date",
  end_date: "End date",
  default: "Default event"
};

const message = ref();

const events = ref([]);

const selectedRow = ref([]);

function selectCallback(row) {
  selectedRow.value = row;
  console.log(selectedRow);
  popupShow.value = true;
}

onMounted(() => {
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/events/vue', {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  }).then(response => {
    console.log(response.data)
    events.value = response.data.events
  })
});


</script>

<template>
  <div class="desktop" v-if="!isMobile()">
    <div class="wrapper">
      <div class="table">
        <div class="topbar">
          <form>
            <label>
              <img src="../../assets/search.svg">
            </label>
            <input v-model="message" placeholder="Search for an event">
          </form>
          <button class="topbtn" @click="openModal">Add Event</button>
          <Transition name="fade" appear>
            <AddEventPopup :isOpen="isModalOpened" @modal-close="closeModal"></AddEventPopup>
          </Transition>
        </div>
        <TheTable :data="events" :tableHeaders="tablePref" :searchInput="message" @onRowSelect="selectCallback">
        </TheTable>
      </div>
      <div class="right-popup-placeholder" v-show="popupShow">
        <div class="items">
          <div class="speaker-photo">Insert Event Photo</div>
          <h3 class="text1">{{ selectedRow.name }}</h3>
          <p class="text2 title">{{ selectedRow.location }}</p>
          <div class="btns-row">
            <button class="btn" @click="openOtherModal">
              <img src="../../assets/pencil.svg">
            </button>
            <button class="btn">
              <img src="../../assets/trash.svg">
            </button>
          </div>
          <div id="info">
            <div class="row">
              
              <!-- <div class="col item2">
            <p># Speakers</p>
            <p class="text2">9</p>
        </div> -->
              <div class="col item3">
                <p>Start Date</p>
                <p class="text2">{{ selectedRow.end_date }}</p>
              </div>
              <div class="col item3">
                <p>End Date</p>
                <p class="text2">{{ selectedRow.start_date }}</p>
              </div>
              <div class="col item3">
                <p>CV's Start Submission</p>
                <p class="text2">{{ selectedRow.cvs_submission_start }}</p>
              </div>
              <div class="col item3">
                <p>CV's End Submission</p>
                <p class="text2">{{ selectedRow.cvs_submission_end }}</p>
              </div>
              <div class="col item3">
                <p>CV's Start Access</p>
                <p class="text2">{{ selectedRow.cvs_access_start }}</p>
              </div>
              <div class="col item3">
                <p>CV's End Access</p>
                <p class="text2">{{ selectedRow.cvs_access_end }}</p>
              </div>
              <div class="col item3">
                <p>End Game Date</p>
                <p class="text2">{{ selectedRow.end_game_day }}</p>
              </div>
              <div class="col item3">
                <p>Default Event</p>
                <p class="text2">{{ selectedRow.default }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



  <div class="mobile" v-else>
    <div class="mobile-wrapper">
      <div class="table">
        <div class="mobile-topbar">
          <form>
            <label>
              <img src="../../assets/search.svg">
            </label>
            <input v-model="message" placeholder="Search for an event">
          </form>
          <button class="mobile-topbtn" @click="openModal">Add Type</button>
          <Transition name="fade" appear>
            <AddSpeakerTypePopup :isOpen="isModalOpened" @modal-close="closeModal"></AddSpeakerTypePopup>
          </Transition>
          <EditSpeakerTypePopup :isOpen="isOtherModalOpened" @modal-close="closeOtherModal"></EditSpeakerTypePopup>
          <ListSpeakerTypePopup :isOpen="isAnotherModalOpened" @modal-close="closeAnotherModal"></ListSpeakerTypePopup>
        </div>
        <div class="right-popup-placeholder-mobile" v-show="popupShow">
          <div class="items">
            <div class="speaker-photo">Insert Speaker Photo</div>
            <h3 class="text1">Speaker Type</h3>
            <p class="text2 title">Speaker Type</p>
            <div class="btns-row">
              <button class="btn" @click="openOtherModal">
                <img src="../../assets/pencil.svg">
              </button>
              <button class="btn" @click="openAnotherModal">
                <img src="../../assets/mic.svg">
              </button>
              <button class="btn">
                <img src="../../assets/trash.svg">
              </button>
            </div>
            <div id="info">
              <div class="row">
                <div class="col item1">
                  <p>Priority</p>
                  <p class="text2">3</p>
                </div>
                <div class="col item2">
                  <p># Speakers</p>
                  <p class="text2">9</p>
                </div>
                <div class="col item3">
                  <p>Show in Website</p>
                  <p class="text2">Yes</p>
                </div>
                <div class="col item4">
                  <p>Social Media</p>
                  <p class="text2">Yes</p>
                </div>
                <div class="col item5">
                  <p>Exclusive Video</p>
                  <p class="text2">No</p>
                </div>
                <div class="col item6">
                  <p>Exclusive Posts</p>
                  <p class="text2">No</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TheTable :data="events" :tableHeaders="tablePref" :searchInput="message" @onRowSelect="selectCallback">
        </TheTable>
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
}

.right-popup-placeholder-mobile {
  width: 94.5vw;
  height: 93vh;
  border-radius: 30px;
  background-color: var(--c-accent);
  margin-right: -0vw;

}

.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 10vh;
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
  width: 300px;
  margin-left: 0px;
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
</style>