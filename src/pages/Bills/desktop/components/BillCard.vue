<script setup>
import { ref } from 'vue';
import * as HttpAdmin from "@utils/http-admin"


const props = defineProps({
    selectedRowData: Object,
})

const emit = defineEmits(['delete-bill','toggle-update-modal'])

const openOtherModal = () => {
    isOtherModalOpened.value = true;
};

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

        <div id="info">
            <p>Value</p>
            <p class="text2">{{ props.selectedRowData.value }}</p>

            <p>Shop</p>
            <p class="text2">{{ props.selectedRowData.shop }}</p>

            <div class="row">
                <div class="col">
                    <p>Status</p>
                    <p class="text2">{{ props.selectedRowData.status }}</p>
                </div>
                <div class="col">
                    <p>Paid</p>
                    <p class="text2">{{ props.selectedRowData.is_paid }}</p>
                </div>
            </div>
        </div>

    </div>
</div>
</template>



<style scoped>
.popup-card {
  position: sticky;
  top: 0;
  right: 0;
  max-width: 400px;
  border-radius: 30px;
  background-color: var(--c-accent);
  height: 100%;
  padding: 20px 50px;
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
</style>