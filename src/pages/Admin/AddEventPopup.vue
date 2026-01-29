<script setup>
import { defineProps, defineEmits, ref } from "vue";
import axios from "axios";

const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(["modal-close"]);

function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    }
    else {
        return false;
    }
}


const name = ref('');
const start_date = ref('');
const end_date = ref('');
const email = ref('');
const location = ref('');
const cv_submission_start = ref('');
const cv_submission_end = ref('');
const cv_access_start = ref('');
const cv_access_end = ref('');
const end_game = ref('');
const cvs_purged = ref(null);
const default_event = ref(null);
const facebook = ref('');


function AddEvent() {
    if (name.value && start_date.value && end_date.value && cv_submission_start.value && cv_submission_end.value && cv_access_start.value && cv_access_end.value && end_game.value) {
        
        console.log(start_date)
        axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/new-event-vue', {
            name: name.value,
            start_date: start_date.value,
            end_date: end_date.value,
            email: email.value,
            location: location.value,
            cvs_submission_start: cv_submission_start.value,
            cvs_submission_end: cv_submission_end.value,
            cvs_access_start: cv_access_start.value,
            cvs_access_end: cv_access_end.value,
            end_game: end_game.value,
            cvs_purged: cvs_purged.value,
            default_event: default_event.value,
            facebook: facebook.value },
            {auth: {
                username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
                password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
            }
        }).then(response => {
            console.log(response.data)
        })
        emit('modal-close')
    }
}

</script>

<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="desktop" v-if="!isMobile()">
            <div class="wrapper-wrapper">
                <div class="popup-wrapper" ref="target">
                    <h1>Add Event</h1>
                    <div class="stuff-inside">
                        <div class="flex-1">
                            <div class="flex-1-row-1">
                                <div class="labels" id="name">
                                    <label for="name">Name</label>
                                    <input v-model="name" type="text" placeholder="" id="name" required>
                                </div>
                                <div class="labels" id="startdate">
                                    <label for="startdate">Start date</label>
                                    <!-- <select placeholder="Choose Event" id="startdate">
                                        <option value="null" disabled selected hidden></option>
                                        <option>event test</option>
                                    </select> -->
                                    <input v-model="start_date" type="date" required />
                                </div>
                                <div class="labels" id="enddate">
                                    <label for="enddate">End date</label>
                                    <!-- <select placeholder="Choose Event" id="enddate">
                                        <option value="null" disabled selected hidden></option>
                                        <option>event test</option>
                                    </select> -->
                                    <input v-model="end_date" type="date" required />
                                </div>
                            </div>
                            <div class="flex-1-row-2">
                                <div class="labels" id="email">
                                    <label for="email">Email</label>
                                    <input v-model="email" type="text" placeholder="" id="email">
                                </div>
                                <div class="labels" id="location">
                                    <label for="location">Location</label>
                                    <input v-model="location" type="text" placeholder="" id="location">
                                </div>
                            </div>
                            <div class="flex-1-row-3">
                                <div class="labels" id="cvsubstart">
                                    <label for="cvsubstart">CV's submission start</label>
                                    <!-- <select placeholder="Choose Event" id="cvsubstart">
                                        <option value="null" disabled selected hidden></option>
                                        <option>event test</option>
                                    </select> -->
                                    <input v-model="cv_submission_start" type="date" required />
                                </div>
                                <div class="labels" id="cvsubend">
                                    <label for="cvsubend">CV's submission end</label>
                                    <!-- <select placeholder="Choose Event" id="cvsubend">
                                        <option value="null" disabled selected hidden></option>
                                        <option>event test</option>
                                    </select> -->
                                    <input v-model="cv_submission_end" type="date" required />
                                </div>
                                <div class="labels" id="cvaccstart">
                                    <label for="cvaccstart">CV's access start</label>
                                    <!-- <select placeholder="Choose Event" id="cvaccstart">
                                        <option value="null" disabled selected hidden></option>
                                        <option>event test</option>
                                    </select> -->
                                    <input v-model="cv_access_start" type="date" required />
                                </div>
                                <div class="labels" id="cvaccend">
                                    <label for="cvaccend">CV's access end</label>
                                    <!-- <select placeholder="Choose Event" id="cvaccend">
                                        <option value="null" disabled selected hidden></option>
                                        <option>event test</option>
                                    </select> -->
                                    <input v-model="cv_access_end" type="date" required />
                                </div>
                                <div class="labels" id="endgame">
                                    <label for="endgame">End game date</label>
                                    <!-- <select placeholder="Choose Event" id="endgame">
                                        <option value="null" disabled selected hidden></option>
                                        <option>event test</option>
                                    </select> -->
                                    <input v-model="end_game" type="date" required />
                                </div>
                            </div>
                            <div class="flex-1-row-4">
                                <div class="check" id="purged">
                                    <label for="purged">CV's purged</label>
                                    <div class="radios">
                                        <input v-model="cvs_purged" type="radio" name="puppy" :value="true"> Yes
                                        <input v-model="cvs_purged" type="radio" name="puppy" :value="false"> No
                                    </div>
                                </div>
                                <div class="labels" id="facebook">
                                    <label for="facebook">Facebook event</label>
                                    <input v-model="facebook" type="text" placeholder="" id="facebook">
                                </div>
                                <div class="check" id="default">
                                    <label for="default">Default event</label>
                                    <div class="radios">
                                        <input v-model="default_event" type="radio" name="bigbear" :value="true"> Yes
                                        <input v-model="default_event" type="radio" name="bigbear" :value="false"> No
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btns">
                        <button class="add" @click="AddEvent">Add</button>
                        <button class="add" @click.stop="emit('modal-close')">Cancel</button>
                    </div>
                </div>
            </div>
        </div>


        <div class="mobile" v-else>
            <div class="mobile-wrapper-wrapper">
                <div class="popup-wrapper" ref="target">
                    <h1>Add Speaker</h1>
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
    width: 94.5vw;
    height: 95%;
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
    height: 70vh;
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
    gap: 5vh;
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

.mobile-labels>#name {
    width: 50.085vw;
}

.mobile-labels>#event {
    width: 26vw;
}


.mobile-flex-1>.labels>#event {
    width: 60vw;
}

.mobile-labels>#biography {
    height: 20vh;
    width: 80vw;
}


.mobile-labels>#company {
    width: 38vw;
}

.mobile-labels>#position {
    width: 38vw;
}

.mobile-labels>#website {
    width: 38vw;
}

.mobile-labels>#country {
    width: 38vw;
}

.mobile-labels>#linkedin {
    width: 38vw;
}

.mobile-labels>#type {
    width: 38vw;
}

.labels>#email,
#location,
#name {
    width: 22vw;
}

.labels>#startdate,
#enddate {
    width: 9vw;
}

.labels>#cvsubstart,
#cvsubend,
#cvaccstart,
#cvaccend {
    width: 6vw;
}

.labels>#facebook {
    width: 24vw;
}

.check {
    display: flex;
    flex-direction: column;
    gap: 0.5vh;
    color: #515151;
    font-size: small;
}

.radios {
    display: flex;
    justify-content: left;
    gap: 1.3vw;
    align-items: center;
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
    margin-top: 7%;
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
</style>