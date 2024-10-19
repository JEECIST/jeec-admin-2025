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
            <h1>Edit Speaker</h1>
            <div class="stuff-inside">
            <div class="flex-1">
                <div class="flex-1-row-1">
                    <div class="labels" id="name">
                        <label for="name">Name</label>
                        <input type="text" placeholder="" id="name">
                    </div>
                    <div class="labels" id="event">
                        <label for="event">Event</label>
                        <select placeholder="Choose Event" id="event">
                            <option value="null" disabled selected hidden></option>
                            <option>event test</option>
                        </select>
                    </div>
                </div>
                <div class="flex-1-row-2">
                    <div class="labels" id="linkedin">
                        <label for="linkedin">LinkedIn</label>
                        <input type="text" placeholder="" id="linkedin">
                    </div>
                    <div class="labels" id="type">
                        <label for="type">Type</label>
                        <select placeholder="" id="type">
                            <option value="null" disabled selected hidden></option>
                            <option>type test</option>
                        </select>
                    </div>
                </div>
                <div class="flex-1-row-3">
                    <div class="labels" id="biography">
                        <label for="biography">Biography</label>
                        <input type="text" placeholder="" id="biography">
                    </div>
                </div>
                <div class="flex-1-row-4">
                    <div class="labels" id="company">
                        <label for="company">Company</label>
                        <input type="text" placeholder="" id="company">
                    </div>
                    <div class="labels" id="position">
                        <label for="position">Position</label>
                        <input type="text" placeholder="" id="position">
                    </div>
                </div>
                <div class="flex-1-row-5">
                    <div class="labels" id="website">
                        <label for="website">Company Website</label>
                        <input type="text" placeholder="" id="website">
                    </div>
                    <div class="labels" id="country">
                        <label for="country">Country</label>
                        <input type="text" placeholder="" id="country">
                    </div>
                </div>
            </div>
            <div class="flex-2">
                <div class="labels" id="speakerdickpic">
                    <label for="speakerdickpic">Speaker<!--Dick Pic --> Picture</label>
                    <p class="idk">
                        No picture selected yet<!-- Size too small please insert larger dick 🥺 -->
                    </p>
                    <button id="coolbutton">Add <!--Dic-->Pic</button>
                </div>
                <div class="labels" id="companylogo">
                    <label for="companylogo">Company Logo</label>
                    <p class="idk">
                        No logo selected yet
                    </p>
                    <button id="coolbutton">Add New Logo</button>
                </div>
                <div class="irresponsible">
                    <div class="labels" id="responsible">
                        <label for="responsible">JEEC Responsible</label>
                        <select id="responsible">
                            <option value="0" disabled selected hidden></option>
                            <option value="1">LARA</option>
                            <option value="2">ZE</option>
                            <option value="3">EMO LARA</option>
                            <option value="4">AFONSO VILELA</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="btns">
            <button class="add" @click.stop="emit('modal-close')">Add</button>
            <button class="add" @click.stop="emit('modal-close')">Cancel</button>
        </div>
        </div>
        </div>
      </div>


      <div class="mobile" v-else>
        <div class="mobile-wrapper-wrapper">
        <div class="popup-wrapper" ref="target">
            <h1>Edit Speaker</h1>
            <div class="stuff-inside">
            <div class="mobile-flex-1">
                <div class="flex-1-row-1">
                    <div class="mobile-labels" id="name">
                        <label for="name">Name</label>
                        <input type="text" placeholder="" id="name">
                    </div>
                    <div class="mobile-labels" id="event">
                        <label for="event">Event</label>
                        <select placeholder="Choose Event" id="event">
                            <option value="null" disabled selected hidden></option>
                            <option>event test</option>
                        </select>
                    </div>
                </div>
                <div class="flex-1-row-2">
                    <div class="mobile-labels" id="linkedin">
                        <label for="linkedin">LinkedIn</label>
                        <input type="text" placeholder="" id="linkedin">
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
                    <div class="mobile-labels" id="biography">
                        <label for="biography">Biography</label>
                        <input type="text" placeholder="" id="biography">
                    </div>
                </div>
                <div class="flex-1-row-4">
                    <div class="mobile-labels" id="company">
                        <label for="company">Company</label>
                        <input type="text" placeholder="" id="company">
                    </div>
                    <div class="mobile-labels" id="position">
                        <label for="position">Position</label>
                        <input type="text" placeholder="" id="position">
                    </div>
                </div>
                <div class="flex-1-row-5">
                    <div class="mobile-labels" id="website">
                        <label for="website">Company Website</label>
                        <input type="text" placeholder="" id="website">
                    </div>
                    <div class="mobile-labels" id="country">
                        <label for="country">Country</label>
                        <input type="text" placeholder="" id="country">
                    </div>
                </div>
            </div>
            <div class="mobile-flex-2">
                <div class="labels" id="speakerdickpic">
                    <label for="speakerdickpic">Speaker<!--Dick Pic --> Picture</label>
                    <p class="idk">
                        No picture selected yet<!-- Size too small please insert larger dick 🥺 -->
                    </p>
                    <button id="coolbutton">Add <!--Dic-->Pic</button>
                </div>
                <div class="labels" id="companylogo">
                    <label for="companylogo">Company Logo</label>
                    <p class="idk">
                        No logo selected yet
                    </p>
                    <button id="coolbutton">Add New Logo</button>
                </div>
                <div class="irresponsible">
                    <div class="labels" id="responsible">
                        <label for="responsible">JEEC Responsible</label>
                        <select id="responsible">
                            <option value="0" disabled selected hidden></option>
                            <option value="1">LARA</option>
                            <option value="2">ZE</option>
                            <option value="3">EMO LARA</option>
                            <option value="4">AFONSO VILELA</option>
                        </select>
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
    width: 90.5vw;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
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
    overflow-y: auto;
    overflow-x: hidden;
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

.mobile-labels > #biography {
    height: 20vh;
    width: 80vw;
}

#biography {
    height: 20vh;
    width: 48vw;
}

.mobile-labels > #company {
    width:  38vw;
}
.mobile-labels > #position {
    width: 38vw;
}
.mobile-labels > #website {
    width: 38vw;
}
.mobile-labels > #country {
    width: 38vw;
}
.mobile-labels > #linkedin {
    width: 38vw;
}
.mobile-labels > #type {
    width: 38vw;
}

.labels> #company,
#position,
#website,
#country,
#linkedin,
#type {
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

.mobile-flex-2 > #speakerdickpic {
    width: 20vw;
    height: 20vh;
}

.mobile-flex-2 > #companylogo {
    width: 20vw;
    height: 20vh;
}

#speakerdickpic,
#companylogo {
    width: 12.60vw;
    height: 22vh;
}

.mobile-flex-2 > .irresponsible {
    width: 15vw;
}

.irresponsible {
    width: 20.40vw;
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
    margin-right: -3%;
    margin-top: -6%;
    margin-bottom: 2%;
    display: flex;
    width: 16vw;
    height: 3.5vh;
    align-items: center;
    justify-content: center;
    gap: 20vw;
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
    /* gap: 20px; */
    margin-top: 4vh;
    justify-content: right;
    gap: 10%;
}

.labels>#name {
    width: 31.08vw;
}

.labels>#event {
    width: 13.32vw;
}

</style>