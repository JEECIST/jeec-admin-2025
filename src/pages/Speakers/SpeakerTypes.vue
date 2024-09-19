<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref } from 'vue';
import AddSpeakerTypePopup from './AddSpeakerTypePopup.vue';
import EditSpeakerTypePopup from './EditSpeakerTypePopup.vue';
import ListSpeakerTypePopup from './ListSpeakerTypePopup.vue';

const popupShow = ref(false);

const isModalOpened = ref(false);

const openModal = () => {
  isModalOpened.value = true;
};
const closeModal = () => {
  isModalOpened.value = false;
};

const isOtherModalOpened = ref(false);

const openOtherModal = () => {
  isOtherModalOpened.value = true;
};
const closeOtherModal = () => {
  isOtherModalOpened.value = false;
};

const isAnotherModalOpened = ref(false);

const openAnotherModal = () => {
  isAnotherModalOpened.value = true;
};
const closeAnotherModal = () => {
  isAnotherModalOpened.value = false;
};

function isMobile() {
   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     return true;
   }
   else {
    return false;
   }
}


const message = ref();

function selectCallback
(row) {
  console.log(row)
  popupShow.value = true;
}

const datab = [
  {
    name: "Main Speaker",
    priority:   "1",
    speakersnum: "5",
    meal: "Yes",
  },
  {
    name: "Discussion Panel",
    priority:   "2",
    speakersnum: "20",
    meal: "Yes",
  },
  {
    name: "Alumni",
    priority:   "3",
    speakersnum: "9",
    meal: "Yes",
  },
  {
    name: "Moderator",
    priority:   "2",
    speakersnum: "4",
    meal: "Yes",
  },

];

const tablePref = {
  name: "Name",
  priority: "Priority",
  speakersnum: "# Speakers",
  meal: "Included Meal"
};

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
          <input v-model="message" placeholder="Search for a user">
        </form>
      <button class="topbtn" @click="openModal">Add Type</button>
      <Transition name="fade" appear>
        <AddSpeakerTypePopup :isOpen="isModalOpened" @modal-close="closeModal"></AddSpeakerTypePopup>
      </Transition>
      <EditSpeakerTypePopup :isOpen="isOtherModalOpened" @modal-close="closeOtherModal"></EditSpeakerTypePopup>
      <ListSpeakerTypePopup :isOpen="isAnotherModalOpened" @modal-close="closeAnotherModal"></ListSpeakerTypePopup>
     </div>
      <TheTable
        :data="datab"
        :tableHeaders="tablePref"
        :searchInput="message"
        @onRowSelect="selectCallback"
      ></TheTable>
    </div>
    <div class="right-popup-placeholder" v-show="popupShow">
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
          <input v-model="message" placeholder="Search for a user">
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
      <TheTable
        :data="datab"
        :tableHeaders="tablePref"
        :searchInput="message"
        @onRowSelect="selectCallback"
      ></TheTable>
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
  margin-right: -7vw;
  overflow-x: hidden;
}

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
  padding-right: 3ch;
}


.mobile-topbar > form {
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

form > label > img {
  width: 20px;
  position: relative;
  top: 4px;
  left: 3px;
}

form > input {
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

form > input::placeholder {
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
    margin-left: 0vw;;
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

.topbar, .mobile-topbar {
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