<!-- falta meter parte "no speakers found" - ver codigo dos sponsors -->


<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import AddSpeakerPopup from './AddSpeakerPopup.vue';
import EditSpeakerPopup from './EditSpeakerPopup.vue';
import MobilePopup from './MobilePopup.vue';
import axios from 'axios';

const datab = ref([{
  id: null,
  name: null,
  company: null,
  country: null,
}])


const fetchData = () => {
    axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/speakerss',{auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }}).then((response)=>{
          const data = response.data
          datab.value = response.data.speakers[0]
          console.log(datab.value)
        })
}

onMounted(fetchData)

const tablePref = {
  id: "ID",
  name: "Name",
  type: "Type",
  company: "Company",
  country: "Country",
  responsible: "JEEC Responsible",
};

function selectCallback(row) {
  console.log(row)
  popupShow.value = true;
  openMobileModal();
}

const isMobile = ref();
function updateIsMobile() { isMobile.value = window.innerWidth <= 800; }
onMounted(() => { window.addEventListener('resize', updateIsMobile); });
onUnmounted(() => { window.removeEventListener('resize', updateIsMobile); });

const router = useRouter();

function goToSpeakerTypes() {
  router.push("/speakers/types");
}

const message = ref();

const popupShow = ref(false);
const descriptionShow = ref(false);
const isModalOpened = ref(false);
const isOtherModalOpened = ref(false);
const isMobileModalOpened = ref(false);

const closePopup = () => { popupShow.value = false; };
function showfunction() { descriptionShow.value = true; }
function closeDescription() { descriptionShow.value = false; }
const openModal = () => { isModalOpened.value = true; };
const closeModal = () => { isModalOpened.value = false; };
const openOtherModal = () => { isOtherModalOpened.value = true; };
const closeOtherModal = () => { isOtherModalOpened.value = false; };
const openMobileModal = () => { isMobileModalOpened.value = true; };
const closeMobileModal = () => { isMobileModalOpened.value = false; };

</script>

<template>
  <div class="desktop" v-if="!isMobile">
    <div class="wrapper">
      <div class="table">
        <div class="topbar">
          <form class="search-desktop">
            <label>
              <img src="../../assets/search.svg">
            </label>
            <input v-model="message" placeholder="Search for a speaker">
          </form>
          <div class="imsosickofdivs-desktop">
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
        <TheTable :data="datab" :tableHeaders="tablePref" :searchInput="message" @onRowSelect="selectCallback">
        </TheTable>
      </div>
      <div class="right-popup-placeholder" v-show="popupShow">
        <div class="close-wrapper">
          <button class="close" @click="closePopup">X</button>
        </div>
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
            <p class="text2">Global Team Technical Lead </p>
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
          <div class="topbar-wrapper">
            <div class="topthings">
              <form class="search-mobile">
                <label>
                  <img src="../../assets/search.svg">
                </label>
                <input v-model="message" placeholder="Search">
              </form>
              <div class="imsosickofdivs">
                <label for="evento" class="eventselect">Event</label>
                <select name="evento" placeholder="  " class="eventselect">
                  <option value="null" disabled selected hidden></option>
                  <option>hello</option>
                  <option>there</option>
                </select>
              </div>
            </div>
            <div class="topbtns">
              <button class="topbtn" @click="openModal">Add Speaker</button>
              <button @click="goToSpeakerTypes" class="topbtn">Speaker Types 〉</button>
            </div>
          </div>
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
        <TheTable :data="datab" :tableHeaders="tablePref" :searchInput="message" @onRowSelect="selectCallback">
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

/* form {
  display: flex;
  width: 70vw;
  background-color: var(--c-accent);
  line-height: 50px;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 10px;
  flex-grow: 0.7;
} */

.search-desktop {
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
  gap: 1vh;
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

.topbar,
.mobile-topbar {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.topbar-wrapper {
  width: 100vw;
}

.topbar-wrapper {
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

.imsosickofdivs {
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  width: 30vw;
}

.imsosickofdivs-desktop {
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  width: 8vw;
}

.imsosickofdivs-desktop>label {
  position: absolute;
  bottom: 100%;
}

.imsosickofdivs>label {
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
</style>
