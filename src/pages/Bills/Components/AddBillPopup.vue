<script setup>
import { ref } from 'vue';

import * as HttpAdmin from "@utils/http-admin";

const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(["modal-close","modal-submit"]);

async function submitAddBill(e) {
    const formData = new FormData();
    formData.append("bill_image_binary", bill_image_binary.value);
    formData.append("is_paid", is_paid.value);
    formData.append("status", status.value);
    formData.append("shop", shop.value);
    formData.append("date", date.value);
    formData.append("value", value.value);
    

    const response = await HttpAdmin.POST("/insert-bill", formData);
    if(response.request.status != 200){ 
        alert("Someting went wrong when creating a new bill...")
    }
    emit('modal-close');
    emit('modal-submit');
};

function handleFileChange(e) {
    const file = e.target.files[0];
    
    if (file){
        bill_image_binary.value = file;
    };
    
}

let value = ref();
let date = ref();
let shop = ref();
let status = ref();
let is_paid = ref();
let bill_image_binary = ref();


</script>



<template>
<div class="modal-mask" v-if="props.isOpen"> 
    <div class="popup">
        <form class="form">
            <h3>Add bill</h3>
            <br>
            <div class="form-grid">
                <div class="form-item">
                    <label for="value">Value</label>
                    <input required type="number" step="0.01" min="0"  placeholder="0.00"  id="value" v-model="value">
                </div>
                
                <div class="form-item">
                    <label for="date">Date</label>
                    <input required type="date" name="date" id="date" v-model="date">
                </div>
                
                <div class="form-item">
                    <label for="shop">Shop</label>
                    <input required type="text" placeholder="" id="shop" v-model="shop">
                </div>
                
                <div class="form-item">
                    <label for="status">Status</label>
                    <select required name="status" id="status" v-model="status">
                        <option selected value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                
                <div class="form-item">
                    <label for="is-paid">Is Paid</label>
                    <select required name="Is paid" id="is-paid" v-model="is_paid">
                        <option selected value="No" >No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
                
                <div class="form-item">
                    <label for="bill">Bill</label>
                    <input type="file" name="bill" id="input-bill" accept="image/*" @change="handleFileChange">
                </div>
            </div> 
            <div class="form-actions">
                <button class="close" type="button" @click.stop="emit('modal-close')">Close</button>
                <button class="submit" type="submit" @click="submitAddBill">Submit</button>
            </div>
        </form>
    </div>
</div>
</template>



<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.425);
}

.popup{
    max-width: 900px;
    position: absolute;
    top: 50%;
    left: 61.5%;
    translate: -50% -50%;
    width: 80%;
    background-color: white;
    border-radius: 12px;
    padding: 1rem 1.5rem;
}

.form-grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem 4rem;
}

.form-item{
    display: grid;
    grid-template-columns: 1fr 1fr;
    
    label{
        font-size: 1rem;
    }
    
    input{
        color: #515151;
        border-style: solid;
        border-width: thin;
        border-radius: 5px;
        outline: none;
        padding: 0.2rem 1rem;
        border-radius: 4px;
    }
    select{
        padding: 0.2rem 1rem;
        border-radius: 4px;
    }
    input[type='file']{
        padding: 0.2rem 0;
        border: none;
    }
}



.form-actions{
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
    width: 100%;
    button{
        outline: none;
        font-size: 0.8rem;
        padding: 8px;
        border-radius: 4px;    
    }
    button.submit{
         background-color: #509cdb;
        color: aliceblue;
    }
}

.form-action :first-child{
    margin-right: auto;
}

@media (max-width: 768px) {
    .popup{
        left: 50%;
    }
    
    .form-grid{
        grid-template-columns: 1fr;
        gap: 1.2rem;
    }
    
    .form-actions{
        justify-content: space-between;
        
        button{
            font-size: 1rem;
        }
    }
}

</style>