<script setup>
import TheTable from '../../../global-components/TheTable.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

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

<div class="mobile">
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