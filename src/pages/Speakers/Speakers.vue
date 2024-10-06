<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AddSpeakerPopup from './AddSpeakerPopup.vue';
import EditSpeakerPopup from './EditSpeakerPopup.vue';
import MobilePopup from './MobilePopup.vue';

const popupShow = ref(false);
const descriptionShow = ref(false);

function showfunction() {
  descriptionShow.value=true;
}

function closeDescription() {
  descriptionShow.value=false;
}

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

const isMobileModalOpened = ref(false);

const closeMobileModal = () => {
  isModalOpened.value = false;
};

function isMobile() {
   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     return true;
   }
   else {
    return false;
   }
}

const router = useRouter();

function goToSpeakerTypes() {
  router.push("/speakers/types");
}

const message = ref();

function selectCallback(row) {
  console.log(row)
  popupShow.value = true;
  isMobileModalOpened.value = true;
}

const datab = [
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },
  {
    id:   "69",
    type: "Main Speaker",
    name: "Waqas SJ.",
    company: "Intel",
    country: "Germany",
    responsible: "Francisco Rosa",
  },

];

const tablePref = {
  id: "ID",
  name: "Name",
  type: "Type",
  company: "Company",
  country: "Country",
  responsible: "JEEC Responsible",
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
        <input v-model="message" placeholder="Search for a speaker">
      </form>
      <div class="imsosickofdivs">
      <label for="evento" class="eventselect">Event</label>
      <select name="evento" placeholder="  " class="eventselect">
                <option value="null" disabled selected hidden></option>
                <option>hello</option>
                <option>there</option>
            </select>
      </div>
     <button class="topbtn" @click="openModal">Add Speaker</button>
     <button @click="goToSpeakerTypes" class="topbtn">Speaker Types 〉</button>
     <Transition name="fade" appear>
        <AddSpeakerPopup :isOpen="isModalOpened" @modal-close="closeModal"></AddSpeakerPopup>
     </Transition>
     <Transition name="fade" appear>
        <EditSpeakerPopup :isOpen="isOtherModalOpened" @modal-close="closeOtherModal"></EditSpeakerPopup>
     </Transition>
     <div class="popup-mask" v-show="descriptionShow">
     <div class="description">
       <p>
        description of speaker Once upon a time there was a lovely 
        princess. But she had an enchantment 
        upon her of a fearful sort which could 
        only be broken by love's first kiss. 
        She was locked away in a castle guarded 
        by a terrible fire-breathing dragon. 
        Many brave knights had attempted to 
        free her from this dreadful prison, 
        but non prevailed. She waited in the 
        dragon's keep in the highest room of 
        the tallest tower for her true love 
        and true love's first kiss. (laughs) 
        Like that's ever gonna happen. What 
        a load of - (toilet flush)
 
        Allstar - by Smashmouth begins to play. Shrek goes about his 
        day. While in a nearby town, the villagers get together to go 
        after the ogre.
       </p>
       <button class="closedescription" @click="closeDescription">X</button>
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
    <div class="right-popup-placeholder" v-show="popupShow">
        <div class="items">
          <h1>SPEAKER TYPE</h1>
          <div class="speaker-photo">Insert Speaker Photo</div>
          <h3 class="text1">Speaker Name</h3>
          <p class="text2 title">Speaker</p>
          <div class="btns-row">
            <button class="btn" @click="openOtherModal">
                <img src="../../assets/pencil.svg">
            </button>
            <button class="btn" @click="showfunction">
                <img src="../../assets/sheet.svg">
            </button>
            <button class="btn">
                <img src="../../assets/linkedin.svg">
            </button>
            <button class="btn">
                <img src="../../assets/trash.svg">
            </button>
          </div>
          <div id="info">
            <p>Company</p>
            <p class="text2">Intel</p>
            <p>Position</p>
            <p class="text2">Global Team Technical Lead</p>
            <div class="row">
              <div class="col">
                <p>Country</p>
                <p class="text2">Germany</p>           
              </div>
              <div class="col">
                <p>Event</p>
                <p class="text2">JEEC 24</p>
              </div>
            </div>
            <p>JEEC Responsible</p>
            <p class="text2">Francisco Rosa</p>
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
        <input v-model="message" placeholder="Search for a speaker">
      </form>
      <div class="imsosickofdivs">
      <label for="evento" class="eventselect">Event</label>
      <select name="evento" placeholder="  " class="eventselect">
                <option value="null" disabled selected hidden></option>
                <option>hello</option>
                <option>there</option>
            </select>
      </div>
     <button class="topbtn" @click="openModal">Add Speaker</button>
     <button @click="goToSpeakerTypes" class="topbtn">Speaker Types 〉</button>
     <Transition name="fade" appear>
        <AddSpeakerPopup :isOpen="isModalOpened" @modal-close="closeModal"></AddSpeakerPopup>
     </Transition>
     <Transition name="fade" appear>
        <EditSpeakerPopup :isOpen="isOtherModalOpened" @modal-close="closeOtherModal"></EditSpeakerPopup>
     </Transition>
     <Transition name="fade" appear>
        <MobilePopup :isOpen="isMobileModalOpened" @modal-close="closeMobileModal"></MobilePopup>
     </Transition>
     <div class="popup-mask" v-show="descriptionShow">
     <div class="description-mobile">
       <p>
        description of speaker Once upon a time there was a lovely 
        princess. But she had an enchantment 
        upon her of a fearful sort which could 
        only be broken by love's first kiss. 
        She was locked away in a castle guarded 
        by a terrible fire-breathing dragon. 
        Many brave knights had attempted to 
        free her from this dreadful prison, 
        but non prevailed. She waited in the 
        dragon's keep in the highest room of 
        the tallest tower for her true love 
        and true love's first kiss. (laughs) 
        Like that's ever gonna happen. What 
        a load of - (toilet flush)
 
        Allstar - by Smashmouth begins to play. Shrek goes about his 
        day. While in a nearby town, the villagers get together to go 
        after the ogre.
       </p>
       <button class="mobile-closedescription" @click="closeDescription">X</button>
     </div>
     </div>
     </div>
     <div class="right-popup-placeholder-mobile" v-show="popupShow">
        <div class="items">
          <h1>SPEAKER TYPE</h1>
          <div class="speaker-photo">Insert Speaker Photo</div>
          <h3 class="text1">Speaker Name</h3>
          <p class="text2 title">Speaker</p>
          <div class="btns-row">
            <button class="btn" @click="openOtherModal">
                <img src="../../assets/pencil.svg">
            </button>
            <button class="btn" @click="showfunction">
                <img src="../../assets/sheet.svg">
            </button>
            <button class="btn">
                <img src="../../assets/linkedin.svg">
            </button>
            <button class="btn">
                <img src="../../assets/trash.svg">
            </button>
          </div>
          <div id="info">
            <p>Company</p>
            <p class="text2">Intel</p>
            <p>Position</p>
            <p class="text2">Global Team Technical Lead</p>
            <div class="row">
              <div class="col">
                <p>Country</p>
                <p class="text2">Germany</p>           
              </div>
              <div class="col">
                <p>Event</p>
                <p class="text2">JEEC 24</p>
              </div>
            </div>
            <p>JEEC Responsible</p>
            <p class="text2">Francisco Rosa</p>
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
  padding-right: 0ch;
}

.mobile-topbar > form {
  display: flex;
  width: 21%;
  background-color: var(--c-accent);
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 10px;
  flex-grow: 0.7;
}

form {
  display: flex;
  width: 60%;
  background-color: var(--c-accent);
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 10px;
  flex-grow: 0.7;
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
    margin-top: 7vh;
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
    display: flex;
    flex-direction: row;
    gap: 3.5vw;
}

.col {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

#info {
    margin-left: -2.5vw;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 1.3vh;
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

.topbar, .mobile-topbar {
    display: flex;
    flex-direction: row;
    gap: 15px;
}

.imsosickofdivs {
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
    width: 10%;
}

.imsosickofdivs > label {
  position: absolute;
  bottom: 100%;
}

button {
  outline: none;
  border: none;
  cursor: pointer;
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

.description-mobile > p {
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
}

.description > p {
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

</style>
