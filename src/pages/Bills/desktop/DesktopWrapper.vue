<script setup>
import TheTable from '../../../global-components/TheTable.vue';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import * as httpAdmin from '@utils/http-admin';
import TopBar from './components/TopBar.vue';
import BillCard from './components/BillCard.vue';

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
<div v-if="loaded" class="desktop">
    <div class="wrapper">
        <div class="table">
            <TopBar v-model:message="message" v-model:table_data="table_data"></TopBar>
        
            <div v-if="!isDataBEmpty()">
                <TheTable
                    :data="filteredTableData"
                    :tableHeaders="tablePref"
                    :searchInput="message"
                    @onRowSelect="selectCallback"
                ></TheTable>
            </div>
        </div>
        <BillCard :selectedRowData="selectedRow" v-show="popupShow" @delete-bill="reloadPage"></BillCard>

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