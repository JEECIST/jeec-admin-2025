<script setup>
import TheTable from '../../global-components/TheTable.vue';
import AddBillPopup from './AddBillPopup.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { isMobile } from '@utils/utils';

const popupShow = ref(false);

const isModalOpened = ref(false);

const toggleModal = () => {  
  isModalOpened.value = !isModalOpened.value;
};

const isOtherModalOpened = ref(false);

const openOtherModal = () => {
  isOtherModalOpened.value = true;
};
const closeOtherModal = () => {
  isOtherModalOpened.value = false;
};


const router = useRouter();

const message = ref();


function selectCallback(row) {
  console.log("\nSPLIT\n");
  
  console.log(row)
  popupShow.value = true;
  console.log(selectedRowData.value);
  selectedRowData.value = row

  console.log(selectedRowData.value);
}

function isDataBEmpty(){
    return datab.length === 0;
}

const selectedRowData = ref({
  id: "",
  value: "",
  date: "",
  shop: "",
  status: "",
  is_paid: ""
})


const datab = [
  {
    id: "1",
    value: "1.50",
    date: "12-01-2024",
    shop: "Pingo Doce",
    status: "Approved",
    is_paid: "Yes"
  },
  {
    id: "2",
    value: "15.00",
    date: "22-01-2024",
    shop: "Social",
    status: "Rejected",
    is_paid: "No"

  },

];

const tablePref = {
  id: "ID",
  value: "Value",
  date: "Date",
  shop: "Shop",
  status: "Status",
  is_paid: "Paid"
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
        <input v-model="message" placeholder="Search for a bill">
      </form>

      <button class="topbtn" @click="toggleModal">Add Bill</button>
      <button class="topbtn" @click="">Refresh</button>
      <Transition name="fade" appear>
          <AddBillPopup :isOpen="isModalOpened" @modal-close="toggleModal"></AddBillPopup>
      </Transition>

      </div>
        <div v-if="!isDataBEmpty()">
            <TheTable
            :data="datab"
            :tableHeaders="tablePref"
            :searchInput="message"
            @onRowSelect="selectCallback"
            ></TheTable>
        </div>
      </div>
      <div class="right-popup-placeholder" v-show="popupShow">
          <div class="items">
            <div class="prize-photo">No Photo</div>
            <h3 class="text1">{{ selectedRowData.date }}</h3>
            <p class="text2 title">Bill</p>
            <div class="btns-row">
              <button class="btn" @click="openOtherModal">
                  <img src="../../assets/pencil.svg">
              </button>
              <button class="btn">
                  <img src="../../assets/sheet.svg">
              </button>
              <button class="btn">
                  <img src="../../assets/trash.svg">
              </button>
            </div>
            <div id="info">
              <p>Value</p>
              <p class="text2">{{ selectedRowData.value }}</p>

              <p>Shop</p>
              <p class="text2">{{ selectedRowData.shop }}</p>

              <div class="row">
                <div class="col">
                  <p>Status</p>
                  <p class="text2">{{ selectedRowData.status }}</p>
                </div>
                <div class="col">
                  <p>Paid</p>
                  <p class="text2">{{ selectedRowData.is_paid }}</p>
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
          <input v-model="message" placeholder="Search for a prize">
        </form>

        <div class="imsosickofdivs">
        <button class="topbtn" @click="toggleModal">Add Prize</button>
      <Transition name="fade" appear>
          <AddBillPopup :isOpen="isModalOpened" @modal-close="toggleModal"></AddBillPopup>
      </Transition>
      </div>
      <div class="right-popup-placeholder-mobile" v-show="popupShow">
          <div class="items">
            <h1>SHOP</h1>
            <div class="prize-photo">Insert PPPPPrize Photo</div>
            <h3 class="text1">Chamuça</h3>
            <p class="text2 title">Prize</p>
            <div class="btns-row">
              <button class="btn" @click="openOtherModal">
                  <img src="../../assets/pencil.svg">
              </button>
              <button class="btn">
                  <img src="../../assets/sheet.svg">
              </button>
              <button class="btn">
                  <img src="../../assets/trash.svg">
              </button>
            </div>
            <div id="info">
              <p>Description</p>
              <p class="text2">Vinda do ROSE STUPAA GOOAT</p>
              <div class="row">
                <div class="col">
                  <p>Initial Amount</p>
                  <p class="text2">69</p>
                </div>
                <div class="col">
                  <p>Current Amount</p>
                  <p class="text2">6</p>
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
</div>
</template>

<style scoped>

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
  justify-content: space-around;
  height: calc(100dvh - var(--header-height));
  padding: 5ch 3ch 3ch 3ch;
  overflow-y: hidden;
}

.table {
  display: flex;
  flex-direction: column;
  width: 75%;
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
