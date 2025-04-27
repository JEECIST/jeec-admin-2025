<script setup>
import { defineProps, defineEmits, ref, watch, onMounted, onUnmounted } from "vue";

/* variables from 'Speakers' page */
const props = defineProps({
  isOpen: Boolean,
  speaker: Object,
  events: Object,
  types: Object,
  responsibles: Object,
});

const emit = defineEmits(["modal-close", "update-speaker"]);

const editedSpeaker = ref({});

/* show unedited speaker details on the popup when opened */
watch(() => props.speaker, (newSpeaker) => {
  if (newSpeaker) {
    editedSpeaker.value = { ...newSpeaker };
  }
}, { immediate: true });

function saveChanges() {
  if (!editedSpeaker.value.speaker_image && props.speaker.speaker_image) {
    editedSpeaker.value.speaker_image = props.speaker.speaker_image;
  }

  if (!editedSpeaker.value.company_logo && props.speaker.company_logo) {
    editedSpeaker.value.company_logo = props.speaker.company_logo;
  }
  emit("update-speaker", editedSpeaker.value);
  emit("modal-close");
}

/* image and logo logic */
const speakerImageInput = ref(null);
const companyLogoInput = ref(null);
const imgFileName = ref(null);
const logoFileName = ref(null);

const s_image = ref(null);
const c_logo = ref(null);

function triggerFileInput() {
  speakerImageInput.value.click();
}

function triggerLogoInput() {
  companyLogoInput.value.click();
}

function speakerImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    imgFileName.value = file.name;
    editedSpeaker.value.speaker_image = file;
    s_image.value = URL.createObjectURL(file);
  }
}

function companyLogoUpload(event) {
  const file = event.target.files[0];
  if (file) {
    logoFileName.value = file.name;
    editedSpeaker.value.company_logo = file;
    c_logo.value = URL.createObjectURL(file);
  }
}

/* mobile screen detection and adjustment */
const isMobile = ref(window.innerWidth <= 800);
function updateIsMobile() { isMobile.value = window.innerWidth <= 800; }
onMounted(() => { 
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile); console.log(editedSpeaker)});
onUnmounted(() => { window.removeEventListener('resize', updateIsMobile); });
</script>

<template>
    <div v-if="isOpen" class="modal-mask">
      <div :class="{'desktop' : !isMobile, 'mobile' : isMobile}">
        <div :class="{'wrapper' : !isMobile, 'mobile-wrapper-wrapper' : isMobile}">
        <div :class="{'popup-wrapper' : !isMobile, 'mobile-popup-wrapper' : isMobile}" ref="target">
            <div class="header">
                <h1>Edit Speaker</h1>
                <button :class="{'close' : !isMobile, 'mobile-close' : isMobile}" @click.stop="emit('modal-close')">X</button>
            </div>
            <div class="elements">
            <div :class="{'flex-1' : !isMobile, 'mobile-flex-1' : isMobile}">
                <div class="flex-1-row-1">

                    <!-- name -->
                    <div :class="{'labels' : !isMobile, 'mobile-labels' : isMobile}" id="name">
                        <label for="name">Name</label>
                        <input type="text" v-model="editedSpeaker.name" id="name">
                    </div>

                    <!-- event -->
                    <div :class="{'labels' : !isMobile, 'mobile-labels' : isMobile}" id="event">
                        <label for="event">Event</label>
                        <select v-model="editedSpeaker.event_id" id="event">
                            <option value="null" disabled selected hidden></option>
                            <option v-for="event in events" :key="event.id" :value="event.id">{{ event.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="flex-1-row-2">

                    <!-- linkedin -->
                    <div :class="{'labels' : !isMobile, 'mobile-labels' : isMobile}" id="linkedin">
                        <label for="linkedin">LinkedIn</label>
                        <input type="text" v-model="editedSpeaker.linkedin_url" id="linkedin">
                    </div>

                    <!-- type -->
                    <div :class="{'labels' : !isMobile, 'mobile-labels' : isMobile}" id="type">
                        <label for="type">Type</label>
                        <select v-model="editedSpeaker.type_id" id="type">
                            <option value="null" disabled selected hidden></option>
                            <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="flex-1-row-3">

                    <!-- biography -->
                    <div :class="{'labels' : !isMobile, 'mobile-labels' : isMobile}" id="biography">
                        <label for="biography">Biography</label>
                        <input type="text" v-model="editedSpeaker.bio" id="biography">
                    </div>
                </div>
                <div class="flex-1-row-4">

                    <!-- company -->
                    <div :class="{'labels' : !isMobile, 'mobile-labels' : isMobile}" id="company">
                        <label for="company">Company</label>
                        <input type="text" v-model="editedSpeaker.company" id="company">
                    </div>

                    <!-- position -->
                    <div :class="{'labels' : !isMobile, 'mobile-labels' : isMobile}" id="position">
                        <label for="position">Position</label>
                        <input type="text" v-model="editedSpeaker.position" id="position">
                    </div>
                </div>
                <div class="flex-1-row-5">

                    <!-- website -->
                    <div :class="{'labels' : !isMobile, 'mobile-labels' : isMobile}" id="website">
                        <label for="website">Company Website</label>
                        <input type="text" v-model="editedSpeaker.company_link" id="website">
                    </div>

                    <!-- country -->
                    <div :class="{'labels' : !isMobile, 'mobile-labels' : isMobile}" id="country">
                        <label for="country">Country</label>
                        <input type="text" v-model="editedSpeaker.country" id="country">
                    </div>
                </div>
            </div>
            <div :class="{'flex-2' : !isMobile, 'mobile-flex-2' : isMobile}">

                <!-- speaker picture -->
                <div :class="{'labels' : !isMobile, 'mobile-labels' : isMobile}" id="speakerpic">
                    <label for="speakerpic">Speaker Picture</label>
                    <img v-if="s_image" :src="s_image">
                    <p v-else class="picplaceholder">No picture selected yet</p>
                    <input type="file" ref="speakerImageInput" @change="speakerImageUpload" accept="image/*" hidden>
                    <button id="coolbutton" @click="triggerFileInput">Add Speaker Pic</button>
                </div>

                <!-- company logo -->
                <div :class="{'labels' : !isMobile, 'mobile-labels' : isMobile}" id="companylogo">
                    <label for="companylogo">Company Logo</label>
                    <img v-if="c_logo" :src="c_logo">
                    <p v-else class="picplaceholder">No logo selected yet</p>
                    <input type="file" ref="companyLogoInput" @change="companyLogoUpload" accept="image/*" hidden>
                    <button id="coolbutton" @click="triggerLogoInput">Add New Logo</button>
                </div>

                <!-- responsible -->
                <div class="irresponsible">
                    <div :class="{'labels' : !isMobile, 'mobile-labels' : isMobile}" id="responsible">
                        <label for="responsible">JEEC Responsible</label>
                        <select v-model="editedSpeaker.responsible_id" id="responsible">
                            <option value="null" disabled selected hidden></option>
                            <option v-for="responsible in responsibles" :key="responsible.id" :value="responsible.id">{{ responsible.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div :class="{'btns' : !isMobile, 'mobile-btns' : isMobile}">
            <button :class="{'add' : !isMobile, 'mobile-add' : isMobile}" @click.stop="saveChanges">Save</button>
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
    width: 100%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 15px;
}

.mobile-popup-wrapper {
    margin-left: 5%;
    margin-right: 5%;
}

.wrapper {
    display: flex;
    justify-content: center;
    background-color: white;
    width: 60vw;
    height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: 15px;
    overflow-y: auto;
    overflow-x: hidden;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

.flex-1 > .flex-1-row-5 {
    display: flex;
    flex-direction: row;
    width: 48vw;
    justify-content: space-between;
}

.flex-1 > .flex-1-row-4 {
    display: flex;
    flex-direction: row;
    width: 48vw;
    justify-content: space-between;
}

.flex-1 > .flex-1-row-3 {
    display: flex;
    flex-direction: row;
    width: 48vw;
    justify-content: space-between;
}

.flex-1 > .flex-1-row-2 {
    display: flex;
    flex-direction: row;
    width: 48vw;
    justify-content: space-between;
}

.flex-1 > .flex-1-row-1 {
    display: flex;
    flex-direction: row;
    width: 48vw;
    justify-content: space-between;
}

.mobile-flex-1 > .flex-1-row-1 {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: left;
    gap: 4vw;
}

.mobile-flex-1 > .flex-1-row-4 {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: left;
    gap: 4vw;
}

.mobile-flex-1 > .flex-1-row-5 {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: left;
    gap: 4vw;
}

.mobile-flex-1 > .flex-1-row-3 {
    display: flex;
    width: 100%;
    justify-content: left;
    gap: 4vw;
}

.mobile-flex-1 > .flex-1-row-2 {
    width: 100%;
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
    width: 100%;
}

.mobile-labels > #event {
    width: 100%;
}

.labels>#event {
    width: 13.32vw;
}

.mobile-labels > #biography {
    height: 20vh;
    width: 312px;
}

.labels > #biography {
    height: 20vh;
    width: 48vw;
}

.mobile-labels > #company {
    width:  100%;
}
.mobile-labels > #position {
    width: 100%;
}
.mobile-labels > #website {
    width: 100%;
}
.mobile-labels > #country {
    width: 100%;
}
.mobile-labels > #linkedin {
    width: 100%;
}
.mobile-labels > #type {
    width: 100%;
}

.labels > #company {
    width: 22vw;
}

.labels > #position {
    width: 22vw;
}

.labels > #website {
    width: 22vw;
}

.labels > #country {
    width: 22vw;
}

.labels > #linkedin {
    width: 22vw;
}

.labels > #type {
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

.mobile-flex-2 {
    width: 100%;
    margin-left: 0%;
    margin-right: 0%;
    justify-content: left;
    gap: 6%;
}

.mobile-flex-2 > #speakerpic {
    width: 30%;
    height: 22vh;
}

.mobile-flex-2 > #companylogo {
    width: 30%;
    height: 22vh;
}

.flex-2 > #speakerpic,
.flex-2 > #companylogo {
    width: 12.60vw;
    height: 22vh;
}

#speakerpic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.mobile-flex-2>.irresponsible {
    width: 15vw;
}

.flex-2 > .irresponsible {
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
    width: 100%;
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

.close {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    width: 2vw;
    height: 3.5vh;
    margin-bottom: 2%;
    margin-top: 2%;
    margin-right: 2%;
}

.mobile-close {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    width: 10%;
    height: 3.5vh;
    margin-top: 4%;
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
    width: 100%;
    display: flex;
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