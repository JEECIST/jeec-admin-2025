<script setup>
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  isOpen: Boolean,
});

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
                <h1>Add Prize to Shop</h1>
                <button id = "closeButton" @click.stop="emit('modal-close')">X</button>
            </div>
            <div class="stuff-inside">
            <div class="flex-1">
                <div class="flex-1-row-1">
                    <div class="labels" id="name">
                        <label for="name">Name</label>
                        <input type="text" placeholder="" id="name">
                    </div>
                </div>
            </div>
        </div>
        <div class="btns">
            <button class="add" @click.stop="emit('modal-close')">Add</button>
        </div>
        </div>
        </div>
      </div>


      <div class="mobile" v-else>
        <div class="mobile-wrapper-wrapper">
        <div class="popup-wrapper" ref="target">
            <h1>Add Prize to Shop</h1>
            <div class="stuff-inside">
            <div class="mobile-flex-1">
                <div class="flex-1-row-1">
                    <div class="mobile-labels" id="name">
                        <label for="name">Name</label>
                        <input type="text" placeholder="" id="name">
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

.popupHeader {
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    margin-right: 3%;
}

.wrapper-wrapper {
    display: flex;
    justify-content: center;
    background-color: white;
    width: 60vw;
    height: 25%;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
}

h1 {
    margin-bottom: 2%;
    margin-top: 2%;
    color: #515151;
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

#chamucapic,
#companylogo {
    width: 12.60vw;
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