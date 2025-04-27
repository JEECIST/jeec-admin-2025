<!-- FEITO -->

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import EditSpeakerTypePopup from './EditSpeakerTypePopup.vue';
import ListSpeakerTypePopup from "./ListSpeakerTypePopup.vue";

const props = defineProps({
    isOpen: Boolean,
    stype: Object,
    speakers: Object,
});

const emit = defineEmits(["modal-close", "delete-type", "update-type"]);

/* update an existing speaker type */
function updateSpeakerType(editedSpeakerType) {
    emit("update-type", editedSpeakerType);
    emit("modal-close");
}

/* delete an existing speaker type */
function deleteSpeakerType(stype) {
    emit("delete-type", stype);
    emit("modal-close");
}

const isOtherModalOpened = ref(false);
const isAnotherModalOpened = ref(false);
const openOtherModal = () => { isOtherModalOpened.value = true; };
const closeOtherModal = () => { isOtherModalOpened.value = false; };
const openAnotherModal = () => { isAnotherModalOpened.value = true; };
const closeAnotherModal = () => { isAnotherModalOpened.value = false; };

</script>

<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="right-popup-placeholder-mobile">
            <div class="close-wrapper">
                <button class="close" @click.stop="emit('modal-close')">X</button>
            </div>
            <div class="items">
                <div class="speaker-photo">
                    <img src="../../assets/jeec25.png" alt="Insert Photo">
                </div>
                <h3 class="text1">{{ stype.name }}</h3>
                <p class="text2 title">Speaker Type</p>
                <div class="btns-row">
                    <ListSpeakerTypePopup :isOpen="isAnotherModalOpened" :stype="stype" @modal-close="closeAnotherModal"></ListSpeakerTypePopup>
                    <Transition name="fade" appear>
                        <EditSpeakerTypePopup :isOpen="isOtherModalOpened" :stype="stype" :speakers="speakers" @update-type="updateSpeakerType" @modal-close="closeOtherModal">
                        </EditSpeakerTypePopup>
                    </Transition>
                    <button class="btn" @click="openOtherModal"><img src="../../assets/pencil.svg"></button>
                    <button class="btn" @click="openAnotherModal"><img src="../../assets/mic.svg"></button>
                    <button class="btn" @click="deleteSpeakerType(stype)"><img src="../../assets/trash.svg"></button>
                </div>
                <div id="info">
                    <div class="row">
                        <div class="col item1">
                        <p>Priority</p>
                        <p class="text2">{{ stype.priority }}</p>
                        </div>
                        <div class="col item2">
                        <p># Speakers</p>
                        <p class="text2">{{ stype.num_speakers }}</p>
                        </div>
                        <div class="col item3">
                        <p>Show in Website</p>
                        <p class="text2">{{ stype.show_in_website ? 'Yes' : 'No' }}</p>
                        </div>
                        <div class="col item4">
                        <p>Social Media</p>
                        <p class="text2">{{ stype.social_media ? 'Yes' : 'No' }}</p>
                        </div>
                        <div class="col item5">
                        <p>Exclusive Video</p>
                        <p class="text2">{{ stype.exclusive_video ? 'Yes' : 'No' }}</p>
                        </div>
                        <div class="col item6">
                        <p>Exclusive Posts</p>
                        <p class="text2">{{ stype.exclusive_posts ? 'Yes' : 'No' }}</p>
                        </div>
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
    padding-bottom: 3%;

}

.items {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 6vh;
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
}

.title {
    font-size: larger;
    font-weight: 550;
}

.row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 30px;
    width: 300px;
    margin-left: 0px;
}

.col {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

#info {
    margin-left: 0vw;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 30px;
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