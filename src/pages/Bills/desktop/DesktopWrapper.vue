<script setup>
import TheTable from '../../../global-components/TheTable.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import TopBar from './components/TopBar.vue';
import BillCard from './components/BillCard.vue';

const popupShow = ref(false);
const message = ref('');
const selectedRow = ref({
    id: "",
    value: "",
    date: "",
    shop: "",
    status: "",
    is_paid: ""
});

const props = defineProps({
    table_data: Array
})


const tablePref = {
    id: "ID",
    value: "Value",
    date: "Date",
    shop: "Shop",
    status: "Status",
    is_paid: "Paid"
};





function selectCallback(row) {
    popupShow.value = true;
    selectedRow.value = row;
    console.log(selectedRow.value);
};

function isDataBEmpty(){
    return props.table_data.length === 0;
};

</script>


<template>
<div class="desktop">
    <div class="wrapper">
        <div class="table">
            <TopBar v-model="message"></TopBar>
        
            <div v-if="!isDataBEmpty()">
                <TheTable
                    :data="props.table_data"
                    :tableHeaders="tablePref"
                    :searchInput="message"
                    @onRowSelect="selectCallback"
                ></TheTable>
            </div>
        </div>
        <BillCard :selectedRowData="selectedRow" v-show="popupShow"></BillCard>

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