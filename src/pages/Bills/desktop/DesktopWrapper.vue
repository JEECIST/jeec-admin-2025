<script setup>
import TheTable from '../../../global-components/TheTable.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
<div class="desktop">
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

</template>
<style>
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
</style>