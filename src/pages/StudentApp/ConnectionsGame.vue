<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref, onMounted, computed } from 'vue';
import axios from "axios"
import { useRouter } from 'vue-router';
import AddWordPopup from './newWordPopup.vue';
import EditWordPopup from './newEditWordPopup.vue';

const popupShow = ref(false);
const selectedRow = ref(null);
const isModalOpened = ref(false);
const noWords = ref(false);
const isOtherModalOpened = ref(false);

const selectedDay = ref("all");

const openModal = () => {
  isModalOpened.value = true;
};
const closeModal = () => {
  isModalOpened.value = false;
  getPrizes();
};

const dayOptions = computed(() => {
  const set = new Set(words.value.map(w => w.day).filter(v => v !== null && v !== undefined));
  return ["all", ...Array.from(set)];
});

const filteredWords = computed(() => {
  if (selectedDay.value === "all") return words.value;
  return words.value.filter(w => String(w.day) === String(selectedDay.value));
});


const openOtherModal = () => {
  isOtherModalOpened.value = true;
};

const closeOtherModal = () => {
  isOtherModalOpened.value = false;
  getPrizes();
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

function removeWord(row) {
  axios.post(
    import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/delete-word-connections',
    { day: row.day, word: row.word },
    {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
    }
  ).then(response => {
    if (response.data === "Success") getWords();
  })
}

function goToPrizeShop() {
  router.push("/student-app/prizes/shop");
}

function goToPrizeSpecial() {
  router.push("/student-app/prizes/special");
}

const message = ref();


function selectCallback(row) {
  popupShow.value = true;
  selectedRow.value = row

    

}


const words = ref([])


function CreateNewWords(){
  axios.post(
    import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/new-set-words-connections',
    {}, // body
    {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
    }
  ).then(() => {
    getWords(); // refresh table after creating
  })
}

function getWords(){
  axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/get-connection-words', {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  }).then(response => {
    words.value = response.data

    // if backend returns { error: ... }
    if (response.data?.error) {
      noWords.value = true
    } else {
      noWords.value = words.value.length === 0
    }
  }).catch(() => {
    noWords.value = true
  })
}


onMounted(() => {
  getWords();
});
 

function handleEmptyPrizes(isEmpty){
  noWords.value = isEmpty;
}


const tablePref = {
  day: "Day",
  category: "Category",
  word: "Word"
};

function deleteAllWords(){
  axios.delete(
    import.meta.env.VITE_APP_JEEC_BRAIN_URL + "/delete-all-connection-words",
    {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
    }
  ).then((res) => {
    console.log("Deleted:", res.data.deleted)
  })
}

</script>

<template>
<div class="desktop" v-if="!isMobile()">
  <button @click="CreateNewWords">VOU CRIAR PALAVRAS</button>
  <button @click="deleteAllWords">VOU ELIMINAR PALAVRAS</button>
  <div class="wrapper">
    <div class="table">
      <div class="topbar">
      <form>
        <label>
          <img src="../../assets/search.svg">
        </label>
        <input v-model="message" placeholder="Search for a word or category">
      </form>
    <div class="filter-box">
      <label>
        <img src="../../assets/search.svg" />
      </label>
      <select v-model="selectedDay">
        <option v-for="d in dayOptions" :key="d" :value="d">
          {{ d === "all" ? "All days" : `Day ${d}` }}
        </option>
      </select>
    </div>
      <button class="topbtn" @click="openModal">Add Word</button>
      <Transition name="fade" appear>
          <AddWordPopup :isOpen="isModalOpened" @modal-close="closeModal"></AddWordPopup>
      </Transition>
      <Transition name="fade" appear>
          <EditWordPopup v-if="isOtherModalOpened" :isOpen="isOtherModalOpened" :selectedRow="selectedRow" @modal-close="closeOtherModal"></EditWordPopup>
      </Transition>
      </div>
      
      <TheTable
        :data="filteredWords"
        :tableHeaders="tablePref"
        :searchInput="message"
        @onRowSelect="selectCallback"
        @notFound="handleEmptyPrizes"
        ></TheTable>

      <div class="nowords" v-if="noWords">No Words Found</div>
    </div>
      <div class="right-popup-placeholder" v-if="selectedRow">
          <div class="items">
            <h1>WORD</h1>
            <h3 class="text1">{{ selectedRow.word }}</h3>
            <div class="btns-row">
              <button class="btn" @click="openOtherModal()">
                  <img src="../../assets/pencil.svg">
              </button>
              <button class="btn" @click="removeWord(selectedRow)">
                  <img src="../../assets/trash.svg">
              </button>
            </div>
            <div id="info">
              <h3>Category</h3>
              <h3 class="text2">{{ selectedRow.category }}</h3>
            </div>
          </div>
        </div>
      </div>
</div>
</template>

<style scoped>

.filter-box {
  display: flex;
  width: 25%;
  background-color: var(--c-accent);
  height: 50px;
  line-height: 50px;
  align-items: center;
  gap: 1ch;
  padding-left: 1ch;
  border-radius: 10px;
}

.filter-box > label > img {
  width: 20px;
  position: relative;
  top: 4px;
  left: 3px;
}

.filter-box > select {
  appearance: none;
  background: transparent;
  border: 0;
  outline: none;
  height: 100%;
  width: 100%;
  font-size: 1rem;
  color: var(--c-ft-semi-light);
  cursor: pointer;
}

.prize-logo {
    height: 165px;
    width: 165px;
    background-color: var(--c-select);
    border-radius: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    color: white;
}

.prize-no-logo {
  width: 18vh;
  height: 18vh;
  min-height:100px;
  min-width: 100px;
  max-width: 150px;
  max-height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #888;
  font-size: 14px;
  text-align: center;
}

.nowords{
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  color: var(--c-tf);
  background-color: var(--c-accent);
  font-weight: 600; 
}

.no-chamuca-found{
  width: 85vw;
  height: 80vh;
  background-color: var(--c-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

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

.prize-photo {
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
  width: 30vw;
  height: 80%;
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
