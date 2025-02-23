<script setup>
import { defineProps, defineEmits, ref } from "vue";
import axios from "axios";

const props = defineProps({
  isOpen: Boolean,
});

const logo = ref(null);
const name = ref("");
const selectedType = ref("");
const description = ref("");
const amount = ref(null);
const cost = ref(null);
const link = ref("");
const amountPerDay = ref(null);
const lastUnits= ref(null);


const onLogoSelected = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            logo.value = reader.result; // Store the image data as a base64 URL
        };
        reader.readAsDataURL(file); // Convert file to a data URL
    }
};

function addPrize(name, desc, amount, link, selectedType, amountPerDay, lastUnits, cost) {

    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/add-prizes', {auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }, 
    name: name,
    description: desc,
    Type: selectedType,
    link: link,
    amount: amount,
    cost: cost,
    amountDay: amountPerDay,
    lastUnit: lastUnits,
    imgPath: logo.value

    }).then(response => {
        console.log(response)
        if (response.data == "Success"){
             
        }

    })

    // Need to Reset values


}

const emit = defineEmits(["modal-close"]);


function isMobile() {
   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     return true;
   }
   else {
    return false;
   }
}

</script>

<template>
    <div v-if="isOpen" class="modal-mask">
      <div class="desktop" v-if="!isMobile()">
        <div class="wrapper-wrapper">
        <div class="popup-wrapper" ref="target">
            <div class = "popupHeader">
                <h1>Add Prize</h1>
                <button id = "closeButton" @click.stop="emit('modal-close')">X</button>
            </div>
            <div class="stuff-inside">
            <div class="flex-1">
                <div class="flex-1-row-1">
                    <div class="labels" id="name">
                        <label for="name">Name</label>
                        <input type="text" placeholder="" id="name" v-model="name">
                    </div>
                    <div class="labels" id="type">
                        <label for="type">Type</label>
                        <select placeholder="" id="type" v-model="selectedType">
                            <option value="" disabled selected hidden>Select a type</option>
                            <option>CV</option>
                            <option>Individual</option>
                            <option>Squad</option>
                            <option>Shop</option>
                        </select>

                    </div>
                </div>
                <div class="flex-1-row-3">
                    <div class="labels" id="description">
                        <label for="description">Description</label>
                        <input type="text" placeholder="" id="description" v-model="description">
                    </div>
                </div>
            </div>
            <div class="flex-2">
                <div class="labels" id="chamucapic">
                    <label for="chamucapic">Image<!--Delicious Di.. ahm Chamuça Pick --></label>
                    <div class="blue-square" v-if="logo">
                        <!-- Display the selected image -->
                        <img :src="logo" alt="Logo" class="logo-image" />
                    </div>
                    <div class="blue-square" v-else>
                        <!-- Display this text when no logo is selected -->
                        <p>No image selected yet</p>
                    </div>
                    <!-- Hidden file input -->
                    <label for="logo-upload" class="custom-logo-label">Add new Image</label>
                    <input id="logo-upload" type="file" @change="onLogoSelected" class="coolbutton" accept="image/*" />

                </div>
                <div class="wrap-options">
                    <div id="main-options">
                        <div class="flex-1-row-1">
                            <div class="labels" id="amount">
                                <label for="amount">Amount</label>
                                <input type="number" placeholder="" id="amount" v-model="amount">
                            </div>
                        </div>
                        <div class="flex-1-row-1">
                            <div class="labels" id="link">
                                <label for="link">Link</label>
                                <input type="text" placeholder="" id="link" v-model="link">
                            </div>
                        </div>
                    </div>
                    <div v-if="selectedType == 'Shop'" id="shop-options">
                        <div class="flex-1-row-1">
                            <div class="labels" id="amount-per-day">
                                <label for="amount-per-day">Amount per day</label>
                                <input type="number" placeholder="" id="amount-per-day" v-model="amountPerDay">
                            </div>
                        </div>
                        <div class="flex-1-row-1">
                            <div class="labels" id="last-units">
                                <label for="last-units">Last units</label>
                                <input type="number" placeholder="" id="last-units" v-model="lastUnits">
                            </div>
                        </div>
                        <div class="flex-1-row-1">
                            <div class="labels" id="cost">
                                <label for="cost">Cost</label>
                                <input type="number" placeholder="" id="cost" v-model="cost">
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="btns">
            <button class="add" @click="addPrize(name, description, amount, link, selectedType, amountPerDay, lastUnits, cost)" @click.stop="emit('modal-close')">Add</button>
        </div>
        </div>
        </div>
      </div>


      <div class="mobile" v-else>
        <div class="mobile-wrapper-wrapper">
        <div class="popup-wrapper" ref="target">
            <h1>Add Prize</h1>
            <div class="stuff-inside">
            <div class="mobile-flex-1 popup-adjust">
                <div class="flex-1-row-1">
                    <div class="mobile-labels" id="name">
                        <label for="name">Name</label>
                        <input type="text" placeholder="" id="name">
                    </div>
                    <div class="mobile-labels" id="type">
                        <label for="type">Type</label>
                        <select placeholder="" id="type">
                            <option value="null" disabled selected hidden></option>
                            <option>type test</option>
                        </select>
                    </div>
                </div>
                <div class="flex-1-row-3">
                    <div class="mobile-labels" id="description">
                        <label for="description">Description</label>
                        <input type="text" placeholder="" id="description">
                    </div>
                </div>
            </div>
            <div class="mobile-flex-2">
                <div class="labels" id="chamucapic">
                    <label for="chamucapic">Image<!--Delicious Di.. ahm Chamuça Pick --></label>
                    <p class="prize-pic">
                        No image selected yet
                    </p>
                    <button id="coolbutton">Add New Image</button>
                </div>
                <div class="flex-1-row-1">
                    <div class="labels" id="amount">
                        <label for="amount">Amount</label>
                        <input type="text" placeholder="" id="amount">
                    </div>
                </div>
                <div class="flex-1-row-1">
                    <div class="labels" id="link">
                        <label for="link">Link</label>
                        <input type="text" placeholder="" id="link">
                    </div>
                </div>
            </div>
        </div>
        <div class="mobile-btns">
            <button class="mobile-add" @click.stop="emit('modal-close')">Add</button>
            <button class="mobile-add" @click.stop="emit('modal-close')">Cancel</button>
        </div>
        </div>
        </div>
      </div>
    </div>
</template>

<style scoped>

#chamucapic {
    max-width: 140%;
    margin-right: 10%;
}



.flex-2{
    gap: 0 !important;
}


.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.425);
}


input#description {
    text-indent: 1%;
    text-align: start;
    vertical-align: top;
}

label{
    font-size: 1rem;
    margin-bottom: 0.5%;
}

option{
    font-size: 1rem;
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


#shop-options{
    display: flex;
    flex-direction: row;
}


#main-options{
    display: flex;
    flex-direction: row;
}

#main-options > .flex-1-row-1{
    padding-bottom: 5%;
}

input{
    font-size: 1.2rem;
    font-weight: bolder;
    text-indent: 2%;
}

.prize-pic{
    width: 100%;
    /* height: 100%; */
}

.wrap-options{
    display: flex;
    flex-direction: column;
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
}

.popupHeader {
    display: flex;
    flex-direction: row;
    justify-content:space-between;
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

.popup-adjust{
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

.mobile-flex-1 > .flex-1-row-1 {
    display: flex;
    flex-direction: row;
    width: 80vw;
    justify-content: left;
    gap: 4vw;
}

.mobile-flex-1 > .flex-1-row-2,
.flex-1-row-3,
.flex-1-row-4,
.flex-1-row-5 {
    display: flex;
    flex-direction: row;
    width: 80vw;
    justify-content: left;
    gap: 20vw;
}

.mobile-flex-1 > .flex-1-row-5 {
    display: flex;
    flex-direction: row;
    width: 80vw;
    justify-content: left;
    gap: 20vw;
}

.mobile-wrapper-wrapper > .flex-1-row-2, .flex-1-row-3, .flex-1-row-4, .flex-1-row-5 {
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

select {
    border-style: solid;
    border-width: thin;
    border-radius: 5px;
    padding: 12px;
    color: #8a8a8a;
    background-color: white;
    height: 5vh;
}

.mobile-labels {
    display: flex;
    flex-direction: column;
    color: #515151;
    font-size: smaller;
    height: 100%;
}

.labels {
    display: flex;
    flex-direction: column;
    color: #515151;
    font-size: smaller;
    height: 100%;
}

.mobile-labels> #name {
    width: 50.085vw;
}

.mobile-labels > #event {
    width: 26vw;
}

.labels>#event {
    width: 13.32vw;
}

.mobile-flex-1 > .labels>#event {
    width: 60vw;
}

.mobile-labels > #description {
    height: 20vh;
    width: 80vw;
}

#description {
    height: 20vh;
    width: 48vw;
}

.mobile-labels > #type {
    width: 38vw;
}

.labels> #type {
    width: 22vw;
}

.flex-2, .mobile-flex-2 {
    display: flex;
    flex-direction: row;
    margin-right: 9vw;
    margin-left: 3vw;
    margin-top: 1.5vh;
    gap: 1.5vw;
    justify-content: space-between;

}

.mobile-flex-2 > #chamucapic {
    width: 20vw;
    height: 25vh;
}

.mobile-flex-2 > #companylogo {
    width: 20vw;
    height: 25vh;
}


.logo-image {
  width: 150px; /* Adjust as needed */
  height: 150px;
  object-fit: cover; /* Ensures the image is cropped instead of stretched */
  border-radius: 8px; /* Optional: for rounded corners */
}

#chamucapic,
#companylogo {
    width: 22vw;
    height: 22vh;
}


.mobile-flex-2 > #coolbutton {
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
    align-self: center;
  min-width: 100px;
  max-width: 150px;
  min-height: 30px;
  width: 27vh; 
  border: none;
  border-radius: 0.7vh;
  outline-color: var(--c-select);
  font-family: 'Kumbh Sans', sans-serif;
  font-size: 0.6em;
  font-weight: 500;
  color: #FFFFFF;
  background-color: var(--c-select);
  padding: 0.2vw 1vw;
  cursor: pointer;
}

.custom-logo-label {
  background-color: #152259;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  margin-top: 10px;
  align-self: center;
}

/* Hide the file input */
#logo-upload {
  display: none;
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

.labels>#name {
    width: 20vw;
}

.labels>#event {
    width: 13.32vw;
}

.labels > #link{
    width: 15vw;
}

.labels > #amount {
    width: 15vw;
}

</style>