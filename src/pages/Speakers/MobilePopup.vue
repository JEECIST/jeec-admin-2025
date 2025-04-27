<script setup>
import { defineProps, defineEmits, ref } from "vue";
import EditSpeakerPopup from './EditSpeakerPopup.vue';

const props = defineProps({
    isOpen: Boolean,
    speaker: Object,
    events: Object,
    types: Object,
    responsibles: Object,
    speaker_image: String,
});

const emit = defineEmits(["modal-close", "delete-speaker", "update-speaker"]);

/* update an existing speaker */
function updateSpeaker(editedSpeaker) {
    emit("update-speaker", editedSpeaker);
    emit("modal-close");
}

/* delete an existing speaker */
function deleteSpeaker(speaker) {
    emit("delete-speaker", speaker);
    emit("modal-close");
}

/* go to linkedin */
function openLinkedIn(speaker) {
  const url = speaker.linkedin_url;

  if (typeof url !== "string" || !url.startsWith("https://www.linkedin.com/") && !url.startsWith("https://linkedin.com/")) {
    console.log("Invalid LinkedIn Profile.");
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

const isOtherModalOpened = ref(false);
const descriptionShow = ref(false);
const openOtherModal = () => { isOtherModalOpened.value = true; };
const closeOtherModal = () => { isOtherModalOpened.value = false; };
function showfunction() { descriptionShow.value = true; }
function closeDescription() { descriptionShow.value = false; }

</script>

<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="right-popup-placeholder-mobile">
            <div class="close-wrapper">
                <button class="close" @click.stop="emit('modal-close')">X</button>
            </div>
            <div class="items">
                <h1>{{ speaker.speaker_type }}</h1>
                <div class="speaker-photo">
                    <img :src="speaker_image" alt="Insert Speaker Photo">
                </div>
                <h3 class="text1">{{ speaker.name }}</h3>
                <p class="text2 title">Speaker</p>
                <div class="btns-row">
                    <EditSpeakerPopup :isOpen="isOtherModalOpened" :speaker="speaker" :events="events" :types="types" :responsibles="responsibles" @update-speaker="updateSpeaker" @modal-close="closeOtherModal"></EditSpeakerPopup>
                    <button class="btn" @click="openOtherModal"><img src="../../assets/pencil.svg"></button>
                    <button class="btn" @click="showfunction"><img src="../../assets/sheet.svg"></button>
                    <div class="popup-mask" v-show="descriptionShow">
                        <div class="description-mobile">
                            <p>{{ speaker.bio }}</p>
                            <button class="mobile-closedescription" @click="closeDescription">X</button>
                        </div>
                    </div>
                    <button class="btn" @click="openLinkedIn(speaker)"><img src="../../assets/linkedin.svg"></button>
                    <button class="btn" @click="deleteSpeaker(speaker)"><img src="../../assets/trash.svg"></button>
                </div>
                <div id="info">
                    <p>Company</p><p class="text2">{{ speaker.company }}</p>
                    <p class="need-a-class">Position</p><p class="text2">{{ speaker.position }}</p>
                    <div class="row">
                        <div class="col">
                            <p class="need-a-class">Country</p><p class="text2">{{ speaker.country }}</p>
                        </div>
                        <div class="col">
                            <p class="need-a-class">Event</p><p class="text2">{{ speaker.event_name }}</p>
                        </div>
                    </div>
                    <p class="need-a-class">JEEC Responsible</p><p class="text2" id="last-one">{{ speaker.responsible }}</p>
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

.right-popup-placeholder-mobile {
    width: 350px;
    height: 80vh;
    border-radius: 30px;
    background-color: var(--c-accent);
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    overflow-y: auto;
    overflow-x: hidden;
    text-overflow: ellipsis;
    padding-bottom: 3%;

}

.items {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 4vh;
}

.speaker-photo {
    height: 165px;
    width: 165px;
    background-color: var(--c-select);
    border-radius: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    color: white;

}

.speaker-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
}

.text1 {
    color: black;
    font-size: x-large;
}

.text2 {
    color: var(--c-ft-semi-light);
    overflow-x: hidden;
    text-overflow: ellipsis;
}

.title {
    font-size: larger;
    font-weight: 550;
}

.row {
    display: flex;
    flex-direction: row;
    gap: 10vw;
    margin-top: 5%;
}

.col {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 40%;
}

#info {
    width: 75%;
    margin-left: 0vw;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 1.3vh;
    overflow-x: hidden;
    text-overflow: ellipsis;
}

.need-a-class{
    margin-top: 6%;
}

#last-one {
    margin-bottom: 16%;
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

button {
    outline: none;
    border: none;
    cursor: pointer;
}

.popup-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.425);
}

.description-mobile {
    display: flex;
    justify-content: left;
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

.description-mobile>p {
    display: flex;
    padding: 3vw;
    font-weight: 350;
    color: (--c-ft-semi-light);
    width: 100%;
    margin-top: 20%;
    overflow-wrap: anywhere;
    overflow-y: scroll;
}

.mobile-closedescription {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    margin-right: 3vw;
    margin-top: 2%;
    margin-bottom: 2%;
    display: flex;
    margin-left: auto;
    width: 10%;
    height: 3.5vh;
    align-items: center;
    justify-content: center;
    gap: 10vh;
    cursor: pointer;
    padding: 0.5vw;
}

.close-wrapper {
  display: flex;
  justify-content: right;
  margin-right: 2%;
}

.close {
  background-color: var(--c-accent);
  color: rgba(0, 0, 0, 0.710);
  font-size: large;
  font-weight: bolder;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  width: 2vw;
  height: 3.5vh;
  margin-top: 3%;
  margin-right: 2%;
  margin-bottom: -8%;
}

</style>