<!-- FEITO -->

<script setup>
import { defineProps, defineEmits, ref, watch, onMounted, onUnmounted } from "vue";

/* variables from 'SpeakerTypes' page */
const props = defineProps({
    isOpen: Boolean,
    stype: Object,
    speakers: Array,
});

const emit = defineEmits(["modal-close", "update-type"]);

const editedSpeakerType = ref({});

/* show unedited speaker type details on the popup when opened */
watch( () => props.stype, (newSpeakerType) => {
    if (newSpeakerType) { editedSpeakerType.value = { ...newSpeakerType }; }},
  { immediate: true });

/* update - go to updateSpeakerType function on 'SpeakerTypes' page */
function saveChanges() {
  console.log("saving changes");
  emit("update-type", editedSpeakerType.value);
  emit("modal-close");
}

/* mobile screen detection and adjustment */
const isMobile = ref();
function updateIsMobile() { isMobile.value = window.innerWidth <= 800; }
onMounted(() => { 
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile); });
onUnmounted(() => { window.removeEventListener('resize', updateIsMobile); });
</script>

<template>
    <div v-if="isOpen" class="modal-mask">
        <div :class="{'desktop' : !isMobile, 'mobile' : isMobile}">
            <div :class="{'wrapper' : !isMobile, 'mobile-wrapper' : isMobile}">
                <div class="popup-wrapper">
                    <div class="ihatedivs">
                        <div class="header">
                            <h1>Edit Speaker Type</h1>
                            <button :class="{'close' : !isMobile, 'mobile-close' : isMobile}" @click.stop="emit('modal-close')">X</button>
                        </div>
                        <div class="flex-1">
                            <div :class="{'flex-1-row-1' : !isMobile, 'mobile-flex-1-row-1' : isMobile}">

                                <!-- name -->
                                <div class="labels" id="name">
                                    <label for="name">Name</label>
                                    <input type="text" v-model="editedSpeakerType.name" id="name">
                                </div>

                                <!-- priority -->
                                <div class="labels" id="priority">
                                    <label for="priority">Priority</label>
                                    <input type="text" v-model="editedSpeakerType.priority" id="priority">
                                </div>
                            </div>
                            <div :class="{'flex-1-row-2' : !isMobile, 'mobile-flex-1-row-2' : isMobile}">

                                <!-- show in website -->
                                <div class="check" id="website">
                                    <label for="website">Show in Website</label>
                                    <div class="radios">
                                        <input type="radio" name="perfectpuppy" id="website-yes" v-model="editedSpeakerType.show_in_website" :value="true">
                                        <label for="website-yes">Yes</label>

                                        <input type="radio" name="perfectpuppy" id="website-no" v-model="editedSpeakerType.show_in_website" :value="false">
                                        <label for="website-no">No</label>
                                    </div>
                                </div>

                                <!-- social media -->
                                <div class="check" id="socials">
                                    <label for="socials">Social Media</label>
                                    <div class="radios">
                                        <input type="radio" name="bigbear" id="socials-yes" v-model="editedSpeakerType.social_media" :value="true">
                                        <label for="socials-yes">Yes</label>

                                        <input type="radio" name="bigbear" id="socials-no" v-model="editedSpeakerType.social_media" :value="false">
                                        <label for="socials-no">No</label>
                                    </div>
                                </div>

                                <!-- exclusive video -->
                                <div class="check" id="video">
                                    <label for="video">Exclusive Video</label>
                                    <div class="radios">
                                        <input type="radio" name="dancingduck" id="video-yes" v-model="editedSpeakerType.exclusive_video" :value="true">
                                        <label for="video-yes">Yes</label>

                                        <input type="radio" name="dancingduck" id="video-no" v-model="editedSpeakerType.exclusive_video" :value="false">
                                        <label for="video-no">No</label>
                                    </div>
                                </div>
                            </div>
                            <div :class="{'flex-1-row-3' : !isMobile, 'mobile-flex-1-row-3' : isMobile}">

                                <!-- exclusive posts -->
                                <div class="check" id="post">
                                    <label for="post">Exclusive Posts</label>
                                    <div class="radios">
                                        <input type="radio" name="cutecat" id="post-yes" v-model="editedSpeakerType.exclusive_posts" :value="true">
                                        <label for="post-yes">Yes</label>

                                        <input type="radio" name="cutecat" id="post-no" v-model="editedSpeakerType.exclusive_posts" :value="false">
                                        <label for="post-no">No</label>
                                    </div>
                                </div>

                                <!-- included meal -->
                                <div class="check" id="meal">
                                    <label for="meal">Included Meal</label>
                                    <div class="radios">
                                        <input type="radio" name="lazylion" id="meal-yes" v-model="editedSpeakerType.included_meal" :value="true">
                                        <label for="meal-yes">Yes</label>

                                        <input type="radio" name="lazylion" id="meal-no" v-model="editedSpeakerType.included_meal" :value="false">
                                        <label for="meal-no">No</label>
                                    </div>
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
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 15px;
}

.mobile-wrapper {
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

.popup-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.flex-1,
h1 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 5%;
    margin-right: 15%;
    gap: 1.5vh;
    margin-bottom: 3%;
    margin-top: 6%;
    color: #515151;
}

.flex-1-row-1 {
    display: flex;
    flex-direction: row;
    width: 48vw;
    justify-content: space-between;
}

.flex-1-row-2,
.flex-1-row-3 {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: left;
    gap: 10vw;
    margin-top: 3%;
}

.mobile-flex-1-row-1 {
    display: flex;
    flex-direction: row;
    width: 84.5%;
    justify-content: space-between;
}

.mobile-flex-1-row-2,
.mobile-flex-1-row-3 {
    display: flex;
    flex-direction: column;
    justify-content: left;
    gap: 10vw;
    margin-top: 3%;
}

input {
    color: #515151;
    border-style: solid;
    border-width: thin;
    border-radius: 5px;
    outline: none;
    height: 5vh;
}

.labels {
    display: flex;
    flex-direction: column;
    color: #515151;
    font-size: small;
    height: 100%;
}

.mobile-flex-1-row-1>.labels>#name,
#priority {
    width: 90%;
}

.labels>#name,
#priority {
    width: 22vw;
}

.radios {
    display: flex;
    justify-content: left;
    gap: 1.3vw;
    align-items: center;
}

.check {
    display: flex;
    flex-direction: column;
    gap: 0.5vh;
    color: #515151;
    font-size: small;
    min-width: 5px;
}

.add {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    margin-top: 2%;
    margin-bottom: 2%;
    width: 8.4vw;
    height: 3.5vh;
    gap: 20vh;
    cursor: pointer;
}

.mobile-add {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    margin-top: 2%;
    margin-bottom: 4%;
    margin-right: -11%;
    display: flex;
    width: 16vw;
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
    margin-bottom: 3%;
    margin-top: 2%;
    margin-right: 2%;
}

.mobile-close {
    background-color: #152259;
    color: white;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    width: 9.5vw;
    height: 3.5vh;
    margin-top: 4%;
    margin-right: 2%;
}

.btns {
    display: flex;
    margin-right: 8%;
    margin-top: 8vh;
    justify-content: right;
    gap: 0.1%;
}

.mobile-btns {
    width: 80%;
    display: flex;
    justify-content: right;
    gap: 4%;
}

</style>