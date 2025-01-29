<script setup>
import { ref } from 'vue';
import * as HttpAdmin from "@utils/http-admin"


const props = defineProps({
    selectedRowData: Object,
    popupShow: Boolean
})

const emit = defineEmits(['delete-bill','toggle-update-modal','close-modal'])


async function deleteBill(id) {
    const bill_id = id;
    const response = await HttpAdmin.POST("/delete-bill", {"id": bill_id})

    if(response.request.status != 200){
        alert("Something went wrong while trying to delete bill with id: " + bill_id);
    }
}

function downloadBillImage() {
    const bill_id = props.selectedRowData.id;
    HttpAdmin.GET( "/get-image-by-bill-id" , { params:{"id":bill_id}, responseType: 'blob', } ).then( (response) => {
        
        const url = window.URL.createObjectURL(new Blob([response.data], {type: 'image/png'}));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', "bill-" + bill_id + ".png")
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url);

    });
};


</script>

<template>

<div class="popup-card" > 
    <div class="items">
        <div class="close-row">
            <button class="close-btn" @click="emit('close-modal')">x</button>
        </div>   
        
        <div class="prize-photo">No Photo</div>

        <h3 class="text1">{{ props.selectedRowData.date }}</h3>
        <p class="text2 title">Bill</p>

        <div class="btns-row">
            <button class="btn" @click="emit('toggle-update-modal')">
                <img src="../../../../assets/pencil.svg">
            </button>
            <button class="btn" @click="downloadBillImage">
                <img src="../../../../assets/sheet.svg">
            </button>
            <button class="btn" @click="deleteBill(props.selectedRowData.id)" @click.stop="emit('delete-bill')">
                <img src="../../../../assets/trash.svg">
            </button>
        </div>

        <div class="grid-container">
            <div class="grid-item">
                <p class="">Value</p>
                <p class="text2">{{ props.selectedRowData.value }}</p>
            </div>
            <div class="grid-item">
                <p class="">Shop</p>
                <p class="text2">{{ props.selectedRowData.shop }}</p>
            </div>
            <div class="grid-item">
                <p class="">Status</p>
                <p class="text2">{{ props.selectedRowData.status }}</p>
            </div>
            <div class="grid-item">
                <p class="">Is Paid?</p>
                <p class="text2">{{ props.selectedRowData.is_paid }}</p>
            </div>
        </div>
    </div>
</div>
</template>



<style scoped>
.popup-card {
  position: sticky;
  margin-top: 10px;
  top: 0;
  right: 0;
  width: 100%;
  border-radius: 30px;
  background-color: var(--c-accent);
  height: auto;
  padding: 16px 10px;
}

.items {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.close-row{
    display: flex;
    flex-direction: row;
    justify-content:end ;
    width: 100%;
}

.close-btn{
    border-radius: 100%;
    width: 24px;
    height: 24px;
}

.prize-photo {
    height: 128px;
    width: 128px;
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

#info-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 1.3vh;
}
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: auto auto;    
    gap: 10px; /* Spacing between cells (optional) */
}

.grid-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 2px solid white;
    border-radius: 25px;
    height: auto; /* Fixed height for demo purposes */
    padding: 2px 8px;
    gap: 2px 4px;
}
.btns-row {
    display: flex;
    flex-direction: row;
    gap: 15px;
}

.btn {
    width: 28x;
    height: 28px;
    background: #FFFFFF;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

p {
    color: black;
    font-weight: 500;
    font-size: 1.0em;
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
</style>