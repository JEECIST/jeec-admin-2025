<script setup>
import { ref } from "vue";
import { isMobile } from "@utils/utils";
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
    <div v-if="props.isOpen" class="modal-mask">
        <div class="desktop" v-if="!isMobile()">
            <div class="wrapper-wrapper">
                <div class="popup-wrapper" ref="target">
                    <div class="popupHeader">
                        <h1>Add Bill</h1>
                        <button id="closeButton" @click.stop="emit('modal-close')">X</button>
                    </div>
                    <br>
                    <div class="stuff-inside">
                        <div class="flex-1">
                            <div class="flex-1-row-1">
                                <div class="labels" id="value">
                                    <label for="value">Value</label>
                                    <input required type="number" step="0.01" min="0"  placeholder="0.00"  id="value" v-model="value">
                                </div>
                                <div class="labels" id="date">
                                    <label for="date">Date</label>
                                    <input required type="date" name="date" id="date" v-model="date">
                                </div>
                            </div>
                            <div class="flex-1-row-1">
                                <div class="labels" id="shop">
                                    <label for="shop">Shop</label>
                                    <input required type="text" placeholder="" id="shop" v-model="shop">
                                </div>
                            </div>
                        </div>
                        <div class="flex-2">
                            <div class="flex-1-row-1">
                                <div class="labels" id="status">
                                    <label for="status">Status</label>
                                    <select required name="status" id="status" v-model="status">
                                        <option selected value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                            </div>
                            <div class="flex-1-row-1">
                                <div class="labels" id="is-paid">
                                    <label for="is-paid">Is Paid</label>

                                    <select required name="Is paid" id="is-paid" v-model="is_paid">
                                        <option selected value="No" >No</option>
                                        <option value="Yes">Yes</option>
                                    </select>
                                </div>
                            </div>
                            
                        </div>
                        <br>
                        <div class="flex-1">
                            <div class="flex-1-row-1">
                                <div class="labels" id="bill">
                                    <label for="bill">Bill<!--Delicious Di.. ahm Chamuça Pick --></label>
                                    <input type="file" name="bill" id="input-bill" accept="image/*" @change="handleFileChange">
                                </div> 
                            </div>
                       </div>
                    </div>
                    <div class="btns">
                        <button class="add" @click="submitAddBill" >Add</button>
                    </div>
                </div>
            </div>
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

.mobile-wrapper-wrapper {
    display: flex;
    justify-content: center;
    background-color: white;
    width: 94.5vw;
    height: 95%;
    position: absolute;
    top: 50%;
    left: 46.5%;
    translate: -50% -50%;
}

.prize-pic {
    width: 100%;
    /* height: 100%; */
}


.wrapper-wrapper {
    display: flex;
    justify-content: center;
    background-color: white;
    width: 60vw;
    height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    padding: 15px;
}

.popupHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-right: 3%;
}

#closeButton {
    width: 5%;
    background-color: transparent;
    font-size: 1.5em;
    padding: 10px;
    color: black;
    font-weight: bold;
    text-decoration: none;
    border: none;
    cursor: pointer;
}

h1 {
    margin-bottom: 2%;
    margin-top: 2%;
    color: #515151;
}

.popup-adjust {
    margin-right: 5% !important;
}


.flex-1,
h1 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 5%;
    margin-right: 15%;
    gap: 1.5vh;
}

.flex-1-row-1,
.flex-1-row-2,
.flex-1-row-3,
.flex-1-row-4,
.flex-1-row-5 {
    display: flex;
    flex-direction: row;
    width: 48vw;
    justify-content: space-between;
}

.mobile-flex-1>.flex-1-row-1 {
    display: flex;
    flex-direction: row;
    width: 80vw;
    justify-content: left;
    gap: 4vw;
}

.mobile-flex-1>.flex-1-row-2,
.flex-1-row-3,
.flex-1-row-4,
.flex-1-row-5 {
    display: flex;
    flex-direction: row;
    width: 80vw;
    justify-content: left;
    gap: 20vw;
}

.mobile-flex-1>.flex-1-row-5 {
    display: flex;
    flex-direction: row;
    width: 80vw;
    justify-content: left;
    gap: 20vw;
}

.mobile-wrapper-wrapper>.flex-1-row-2,
.flex-1-row-3,
.flex-1-row-4,
.flex-1-row-5 {
    display: flex;
    flex-direction: row;
    width: 80vw;
    justify-content: left;
    gap: 4vw;
}

input {
    color: #515151;
    border-style: solid;
    border-width: thin;
    border-radius: 5px;
    outline: none;
    height: 5vh;
}

input[type="file" i] {
    border-style: none;
    align-items: center;
    align-content: center;
}

select {
    border-style: solid;
    border-width: thin;
    border-radius: 5px;
    color: #8a8a8a;
    background-color: white;
    height: 5vh;
    width: 15vw;
}

.mobile-labels {
    display: flex;
    flex-direction: column;
    color: #515151;
    foinput[type="file" i] {
    background-color: initial;
    border-color: initial;
    border-radius: initial;
}nt-size: smaller;
    height: 100%;
}

.labels {
    display: flex;
    flex-direction: column;
    color: #515151;
    font-size: smaller;
    height: 100%;
}

.mobile-labels>#value {
    width: 50.085vw;
}

.mobile-labels>#event {
    width: 26vw;
}

.labels>#event {
    width: 13.32vw;
}

.mobile-flex-1>.labels>#event {
    width: 60vw;
}

.mobile-labels>#shop {
    height: 20vh;
    width: 80vw;
}

#shop {
    width: 48vw;
}

.mobile-labels>#type {
    width: 38vw;
}

.labels>#type {
    width: 22vw;
}

.flex-2,
.mobile-flex-2 {
    display: flex;
    flex-direction: row;
    margin-right: 9vw;
    margin-left: 3vw;
    margin-top: 1.5vh;
    gap: 1.5vw;
    justify-content: space-between;

}

.mobile-flex-2>#chamucapic {
    width: 20vw;
    height: 25vh;
}

.mobile-flex-2>#companylogo {
    width: 20vw;
    height: 25vh;
}

#chamucapic,
#companylogo {
    width: 22vw;
    height: 22vh;
}


.mobile-flex-2>#coolbutton {
    background-color: #509cdb;
    color: white;
    border: none;
    border-radius: 5px;
    width: 8.4vw;
    height: 3.5vh;
    margin-top: 1vh;
    font-size: smaller;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    justify-content: center;
    cursor: pointer;
}

#coolbutton {
    background-color: #509cdb;
    color: white;
    border: none;
    border-radius: 5px;
    width: 10vw;
    height: 3.5vh;
    margin-top: 1vh;
    font-size: smaller;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    justify-content: center;
    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
}

p {
    display: flex;
    align-items: center;
    vertical-align: middle;
    justify-content: center;
    text-align: center;
    background-color: #ebf6ff;
    border: none;
    border-radius: 5px;
    height: 21vh;
}

.add {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    margin-right: 3vw;
    margin-top: 2%;
    margin-bottom: 2%;
    display: flex;
    width: 8.4vw;
    height: 3.5vh;
    align-items: center;
    justify-content: center;
    gap: 10vh;
    cursor: pointer;
}

.mobile-add {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    margin-right: 3vw;
    margin-top: 2%;
    margin-bottom: 2%;
    display: flex;
    width: 16vw;
    height: 3.5vh;
    align-items: center;
    justify-content: center;
    gap: 10vh;
    cursor: pointer;
}

.btns {
    width: 60vw;
    display: flex;
    gap: 20px;
    margin-top: 0vh;
    justify-content: right;
    gap: 0.1%;
}

.mobile-btns {
    width: 80vw;
    display: flex;
    gap: 20px;
    margin-top: 4vh;
    justify-content: right;
    gap: 0.1%;
}

.labels>input {
    padding-left: 10px;
}

.labels>#value {
    width: 20vw;
}

.labels>#event {
    width: 13.32vw;
}

.labels>#link {
    width: 15vw;
}

.labels>#approved {
    width: 15vw;
}

.labels>#date {
    width: 20vw;
}
</style>