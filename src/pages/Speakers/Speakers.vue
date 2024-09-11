<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AddSpeakerPopup from './AddSpeakerPopup.vue';

const isModalOpened = ref(false);

const openModal = () => {
  isModalOpened.value = true;
};
const closeModal = () => {
  isModalOpened.value = false;
};

const router = useRouter();

function goToSpeakerTypes() {
  router.push("/speakers/types");
}

const message = ref();

function selectCallback(row) {
  console.log(row)
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
<div class="wrapper">
    <div class="table">
      <div class="topbar">
      <form>
        <label>
          <img src="../../assets/search.svg">
        </label>
        <input v-model="message" placeholder="Search for a user">
      </form>
      <div class="imsosickofdivs">
      <label for="evento" class="eventselect">Event</label>
      <select name="evento" placeholder="  " class="eventselect">
                <option value="" disabled selected></option>
                <option>hello</option>
                <option>there</option>
            </select>
      </div>
     <button class="topbtn" @click="openModal">Add Speaker</button>
     <button @click="goToSpeakerTypes" class="topbtn">Speaker Types 〉</button>
     <AddSpeakerPopup :isOpen="isModalOpened" @modal-close="closeModal"></AddSpeakerPopup>
     </div>
      <TheTable
        :data="datab"
        :tableHeaders="tablePref"
        :searchInput="message"
        @onRowSelect="selectCallback"
      ></TheTable>
    </div>
    <div class="right-popup-placeholder">
        <div class="items">
        <h1>SPEAKER TYPE</h1>
        <div class="speaker-photo">Insert Speaker Photo</div>
        <h3 class="text1">Speaker Name</h3>
        <p class="text2 title">Speaker</p>
        <div class="btns-row">
            <div class="btn">
                <img src="../../assets/pencil.svg">
            </div>
            <div class="btn">
                <img src="../../assets/sheet.svg">
            </div>
            <div class="btn">
                <img src="../../assets/linkedin.svg">
            </div>
            <div class="btn">
                <img src="../../assets/trash.svg">
            </div>
        </div>
        <div id="info">
        <p>Company</p>
        <p class="text2">McDonald's</p>
        <p>Position</p>
        <p class="text2">Chicken Nugget Chef</p>
        <div class="row">
        <div class="col">
            <p>Country</p>
            <p class="text2">Land of Opportunities</p>           
        </div>
        <div class="col">
            <p>Event</p>
            <p class="text2">Donald Duck Birthday</p>
        </div>
        </div>
        <p>JEEC Responsible</p>
        <p class="text2">Afonso Vilela</p>
    </div>
    </div>
</div>
  </div>
</template>

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
  padding-right: 3ch;
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
    gap: 13px;
}

.col {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

#info {
    margin-left: 2vw;;
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

.topbar {
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
</style>
