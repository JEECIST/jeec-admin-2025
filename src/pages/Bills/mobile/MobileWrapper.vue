<script setup>
import TheTable from '../../../global-components/TheTable.vue';
import { computed, onMounted, ref } from 'vue';
import * as httpAdmin from '@utils/http-admin';
import TopBar from './components/TopBar.vue';
import BillCard from './components/BillCard.vue';
import AddBillPopup from '../components/AddBillPopup.vue';
import EditBillPopup from '../components/EditBillPopup.vue';

const popupShow = ref(false);
const message = ref('');
const table_data = ref();
const selectedRow = ref({
    id: "",
    value: "",
    date: "",
    shop: "",
    status: "",
    is_paid: ""
});

const loaded = ref(false);
const filteredTableData = computed(() => 
    table_data.value.map(({bill_image_binary, ...rest}) => rest) 
);



const isAddModalOpened = ref(false);
const toggleAddModal = (e) => {  
    isAddModalOpened.value = !isAddModalOpened.value;
};


const isUpdateModalOpened = ref(false);
const toggleUpdateModal = (e) => {  
    isUpdateModalOpened.value = !isUpdateModalOpened.value;
};

const tablePref = {
    id: "ID",
    value: "Value",
    date: "Date",
    shop: "Shop",
    status: "Status",
    is_paid: "Paid"
};

async function getBills(){
    const response = await httpAdmin.GET('/bills');
    table_data.value = await response.data.bills;
    loaded.value=true; 
}

function reloadPage(){
    sessionStorage.setItem('message', message.value);
    location.reload();
}

function selectCallback(row) {
    popupShow.value = true;
    selectedRow.value = row;
    console.log(selectedRow.value);
};

function closePopup(){
  if(popupShow.value){
    popupShow.value = false;
  }  
}

function isDataBEmpty(){
    return table_data.length === 0;
};

onMounted(() => {
    getBills()
    
    const savedMessage = sessionStorage.getItem('message');
    if( savedMessage !== null){
        message.value = savedMessage;
    }
});
</script>


<template>
<div v-if="loaded" class="mobile">
    <div class="wrapper">
        <div class="table">
            <TopBar 
                v-model:message="message" 
                v-model:table_data="table_data"
                @refresh-bills="getBills"
                @toggle-add-modal="toggleAddModal"
            ></TopBar>
        
            <div v-if="!isDataBEmpty()">
                <TheTable v-show="!popupShow"
                    :data="filteredTableData"
                    :tableHeaders="tablePref"
                    :searchInput="message"
                    @onRowSelect="selectCallback"
                ></TheTable>
            </div>
            <div v-else>
                <h3>No data...</h3>
            </div>
            
            <BillCard 
                :selectedRowData="selectedRow"
                :popupShow="popupShow" 
                v-show="popupShow" 
                @delete-bill="reloadPage"
                @toggle-update-modal="toggleUpdateModal"
                @close-modal="closePopup"
            ></BillCard>
            
        </div>
        
       
        <Transition appear>
            <AddBillPopup :isOpen="isAddModalOpened" @modal-submit="reloadPage" @modal-close="toggleAddModal"></AddBillPopup>
        </Transition>
        
        <Transition appear>
            <EditBillPopup :isOpen="isUpdateModalOpened" :bill_data="selectedRow" @modal-update="reloadPage" @modal-close="toggleUpdateModal"></EditBillPopup>
        </Transition>
    </div>
</div>
</template>



<style scoped>
.wrapper {
  display: flex;
  position: relative;
  justify-content: space-around;
  height: calc(100dvh - var(--header-height));
  padding: 3ch 0ch;
  overflow-y: hidden;
}

.table {
  display: flex;
  flex-direction: column;
  width: 90%;
}
</style>