<script setup>
import TheTable from '../../global-components/TheTable.vue';
import { ref, computed } from 'vue';
import EditPrizePopup from './EditPrizeShopPopup.vue';
import AddPrizePopup from './AddPrizeShopPopup.vue';

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

function isMobile() {
   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     return true;
   }
   else {
    return false;
   }
}

const message = ref();

function selectCallback(row) {
  console.log(row)
  popupShow.value = true;
}

const datab = [
  {
    date:   "19/02",
    reward: ["Pack Duplo Vertigem", "EU TU ELE"],
    winner: "K",
  },
  {
    date:   "20/02",
    reward: ["E-Voucher", "LOL"],
    winner: "Y",
  },
  {
    date:   "21/02",
    reward: ["Pack Duplo Pura Adrenalina", "HEHE"],
    winner: null,
  },
  {
    date:   "22/02",
    reward: ["Pack STREET ART FOR ALL (Boost)", "JWAD"],
    winner: false,
  },
  {
    date:   "23/02",
    reward: ["Passeio golfinhos", "ASDSA"],
    winner: "",
  },
];

const processedData = computed(() =>
  datab.map((item) => ({
    ...item,
    hasWinner: !!item.winner,
  }))
);

const claimReward = (reward) => {
  alert(`Claiming reward: ${reward}`);
};


const tablePref = {
  date: "date",
  reward: "reward",
  winner: "winner",
};


const uniqueRewards = computed(() => {
  return [...new Set(datab.flatMap(item => item.reward))]; // Get unique rewards from the datab
});


</script>

<template>
<div id="rewards">
  <h2>Daily Rewards</h2>
  <div class="desktop" v-if="!isMobile()">
    <div class="wrapper">
        <div class="table">
          <div class="topbar">
          
          <label for="reward">Filter by Reward:</label>
            <select v-model="selectedReward" @change="filterRewards">
              <option value="">All Rewards</option>
              <option v-for="reward in uniqueRewards" :key="reward" :value="reward">{{ reward }}</option>
            </select>
        
          <Transition name="fade" appear>
              <AddPrizePopup :isOpen="isModalOpened" @modal-close="closeModal"></AddPrizePopup>
          </Transition>
          <Transition name="fade" appear>
              <EditPrizePopup :isOpen="isOtherModalOpened" @modal-close="closeOtherModal"></EditPrizePopup>
          </Transition>
          </div>
            <TheTable
              :data="processedData"
              :tableHeaders="tablePref"
              :searchInput="message"
              @onRowSelect="selectCallback"
            >
            <template #column-winner="{ row }">
              <div>
                <span v-if="row.hasWinner">{{ row.winner }}</span>
                <button v-else class="claim-btn">
                  Claim Reward
                </button>
              </div>
            </template>
          </TheTable>
          </div>
      </div>
    </div>



  <div class="mobile" v-else>
  <div class="mobile-wrapper">
      <div class="table">
        <TheTable
          :data="datab"
          :tableHeaders="tablePref"
          :searchInput="message"
          @onRowSelect="selectCallback"
        ></TheTable>
      </div>
    </div>
  </div>
</div>

<div id="rewards">
  <h2>Weekly Rewards</h2>
  <div class="desktop" v-if="!isMobile()">
    <div class="wrapper">
        <div class="table">
          <div class="topbar">
          <form>
            <label>
              <img src="../../assets/search.svg">
            </label>
            <input v-model="message" placeholder="Search for a prize">
          </form>
        
          <button class="topbtn" @click="openModal">Add Prize</button>
          <Transition name="fade" appear>
              <AddPrizePopup :isOpen="isModalOpened" @modal-close="closeModal"></AddPrizePopup>
          </Transition>
          <Transition name="fade" appear>
              <EditPrizePopup :isOpen="isOtherModalOpened" @modal-close="closeOtherModal"></EditPrizePopup>
          </Transition>
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



  <div class="mobile" v-else>
  <div class="mobile-wrapper">
      <div class="table">
        <TheTable
          :data="datab"
          :tableHeaders="tablePref"
          :searchInput="message"
          @onRowSelect="selectCallback"
        ></TheTable>
      </div>
    </div>
  </div>
</div>

<div id="rewards">
  <h2>CV Rewards</h2>
  <div class="desktop" v-if="!isMobile()">
    <div class="wrapper">
        <div class="table">
          <div class="topbar">
          <form>
            <label>
              <img src="../../assets/search.svg">
            </label>
            <input v-model="message" placeholder="Search for a prize">
          </form>
        
          <button class="topbtn" @click="openModal">Add Prize</button>
          <Transition name="fade" appear>
              <AddPrizePopup :isOpen="isModalOpened" @modal-close="closeModal"></AddPrizePopup>
          </Transition>
          <Transition name="fade" appear>
              <EditPrizePopup :isOpen="isOtherModalOpened" @modal-close="closeOtherModal"></EditPrizePopup>
          </Transition>
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



  <div class="mobile" v-else>
  <div class="mobile-wrapper">
      <div class="table">
        <TheTable
          :data="datab"
          :tableHeaders="tablePref"
          :searchInput="message"
          @onRowSelect="selectCallback"
        ></TheTable>
      </div>
    </div>
  </div>
</div>

<div id="rewards">
  <h2>Squad Rewards</h2>
  <div class="desktop" v-if="!isMobile()">
    <div class="wrapper">
        <div class="table">
          <div class="topbar">
          <form>
            <label>
              <img src="../../assets/search.svg">
            </label>
            <input v-model="message" placeholder="Search for a prize">
          </form>
        
          <button class="topbtn" @click="openModal">Add Prize</button>
          <Transition name="fade" appear>
              <AddPrizePopup :isOpen="isModalOpened" @modal-close="closeModal"></AddPrizePopup>
          </Transition>
          <Transition name="fade" appear>
              <EditPrizePopup :isOpen="isOtherModalOpened" @modal-close="closeOtherModal"></EditPrizePopup>
          </Transition>
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



  <div class="mobile" v-else>
  <div class="mobile-wrapper">
      <div class="table">
        <TheTable
          :data="datab"
          :tableHeaders="tablePref"
          :searchInput="message"
          @onRowSelect="selectCallback"
        ></TheTable>
      </div>
    </div>
  </div>
</div>

<div id="rewards">
  <h2>Individual Rewards</h2>
  <div class="desktop" v-if="!isMobile()">
    <div class="wrapper">
        <div class="table">
          <div class="topbar">
          <form>
            <label>
              <img src="../../assets/search.svg">
            </label>
            <input v-model="message" placeholder="Search for a prize">
          </form>
        
          <button class="topbtn" @click="openModal">Add Prize</button>
          <Transition name="fade" appear>
              <AddPrizePopup :isOpen="isModalOpened" @modal-close="closeModal"></AddPrizePopup>
          </Transition>
          <Transition name="fade" appear>
              <EditPrizePopup :isOpen="isOtherModalOpened" @modal-close="closeOtherModal"></EditPrizePopup>
          </Transition>
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



  <div class="mobile" v-else>
  <div class="mobile-wrapper">
      <div class="table">
        <TheTable
          :data="datab"
          :tableHeaders="tablePref"
          :searchInput="message"
          @onRowSelect="selectCallback"
        ></TheTable>
      </div>
    </div>
  </div>
</div>

</template>


<style scoped>

.desktop{
  width: 75%;
}

#rewards > h2 {

  font-weight: bold;
  font-size: 2rem;
}

#rewards {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
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
